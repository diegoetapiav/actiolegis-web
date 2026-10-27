import React, { useState } from 'react';
import { 
  FileText, Calendar, Clock, ChevronRight, Bot, 
  Sparkles, Upload, FileCheck, DollarSign, Building2,
  Users, Plus, Trash2, BookOpen, CheckCircle2, RefreshCw
} from 'lucide-react';
import { UsuarioSistema } from './LoginModal';

interface Actuacion {
  id: string;
  fecha: string;
  titulo: string;
  resumenParaCliente: string;
  detectadoPorIA?: boolean;
}

export interface ExpedienteInterno {
  id: string;
  numProceso: string;
  materia: string;
  tipoProceso: string;
  cliente: string;
  contraparte: string;
  unidadJudicial: string;
  abogadoLider: string;
  etapaProcesalActual: string;
  porcentaje: number;
  proximaFechaClave: string;
  proximasAcciones: string;
  honorariosFijados?: string;
  gastosRegistrados?: string;
  actuaciones: Actuacion[];
}

export interface RegistroGastoDrive {
  id: string;
  causaId: string;
  cliente: string;
  monto: number;
  estado: 'Pendiente' | 'Reembolsado' | 'Pagado';
  concepto: string;
  nombreArchivo: string;
  rutaDrive: string;
  fechaSubida: string;
  usuarioSubida: string;
}

interface ModuloExpedientesProps {
  expedientes: ExpedienteInterno[];
  setExpedientes: React.Dispatch<React.SetStateAction<ExpedienteInterno[]>>;
  usuarioSesion: UsuarioSistema | null;
  tabIntranet: 'expedientes' | 'citas' | 'gastos' | 'editorial-borradores' | 'clientes';
  setTabIntranet: (tab: 'expedientes' | 'citas' | 'gastos' | 'editorial-borradores' | 'clientes') => void;
  onRegistrarAuditoria: (usuario: string, accion: string, modulo: string) => void;
}

const PALETA_TRAMITES = [
  {
    fondoCard: 'bg-[#F2F7F4] border-[#D1E3D8]',
    badgeMateria: 'bg-[#E1EFE7] text-[#1B4D33] border-[#C2DFCF]',
    barraProgreso: 'bg-[#2E6B4A]',
    indicadorActivo: 'bg-[#2E6B4A]',
    detalleFondo: 'bg-[#FAFBF9]',
  },
  {
    fondoCard: 'bg-[#FAF6EE] border-[#EADFCB]',
    badgeMateria: 'bg-[#F3EBD8] text-[#5C4217] border-[#DFCBB0]',
    barraProgreso: 'bg-[#8C6424]',
    indicadorActivo: 'bg-[#8C6424]',
    detalleFondo: 'bg-[#FCFBF8]',
  }
];

export const ModuloExpedientes: React.FC<ModuloExpedientesProps> = ({
  expedientes,
  setExpedientes,
  usuarioSesion,
  tabIntranet,
  setTabIntranet,
  onRegistrarAuditoria
}) => {
  const [casoActivoId, setCasoActivoId] = useState(expedientes[0]?.id || 'exp-1');
  const [textoNotificacionIA, setTextoNotificacionIA] = useState('');
  const [procesandoIA, setProcesandoIA] = useState(false);

  // Estados Gastos & Barra de Progreso
  const [montoGastoInput, setMontoGastoInput] = useState('');
  const [conceptoGastoInput, setConceptoGastoInput] = useState('');
  const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);
  
  const [comprobantesDrive, setComprobantesDrive] = useState<RegistroGastoDrive[]>([
    {
      id: 'gst-1',
      causaId: 'exp-1',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      monto: 350,
      estado: 'Pagado',
      concepto: 'Pago de peritaje técnico',
      nombreArchivo: 'factura_perito.pdf',
      rutaDrive: 'Drive > info@actiolegisec.com > GASTOS DE CLIENTES > Inmobiliaria del Valle S.A.S. > 2026-Octubre > factura_perito.pdf',
      fechaSubida: '2026-10-15 10:30',
      usuarioSubida: 'Lcda. María Elena Castro'
    },
    {
      id: 'gst-2',
      causaId: 'exp-1',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      monto: 150,
      estado: 'Pendiente',
      concepto: 'Tasa judicial COGEP',
      nombreArchivo: 'recibo_tasa.jpg',
      rutaDrive: 'Drive > info@actiolegisec.com > GASTOS DE CLIENTES > Inmobiliaria del Valle S.A.S. > 2026-Octubre > recibo_tasa.jpg',
      fechaSubida: '2026-10-20 14:10',
      usuarioSubida: 'Abg. Marcela Dunn-Ortega'
    }
  ]);

  // Directorio de Clientes (Admin / Abogado)
  const [listaClientes, setListaClientes] = useState<{ id: string; nombre: string; correo: string; codigo: string }[]>([
    { id: 'cli-1', nombre: 'Inmobiliaria del Valle S.A.S.', correo: 'contacto@inmovalle.com', codigo: 'ACTIO-00001' },
    { id: 'cli-2', nombre: 'Corporación Mercantil GYE', correo: 'legal@corpmec.ec', codigo: 'ACTIO-00002' }
  ]);
  const [nuevoNombreCliente, setNuevoNombreCliente] = useState('');
  const [nuevoCorreoCliente, setNuevoCorreoCliente] = useState('');

  // Borradores Editorial
  const [tituloArticulo, setTituloArticulo] = useState('');
  const [resumenArticulo, setResumenArticulo] = useState('');

  const casoActivo = expedientes.find((c) => c.id === casoActivoId) || expedientes[0];

  // Cálculo de Barra de Gastos vs. Reembolsados
  const totalGastos = comprobantesDrive.reduce((acc, curr) => acc + curr.monto, 0);
  const totalReembolsados = comprobantesDrive.filter(g => g.estado === 'Pagado' || g.estado === 'Reembolsado').reduce((acc, curr) => acc + curr.monto, 0);
  const porcentajeReembolsado = totalGastos > 0 ? Math.round((totalReembolsados / totalGastos) * 100) : 0;

  const handleRegistrarGastoConDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!montoGastoInput || !casoActivo) return;

    const montoNum = parseFloat(montoGastoInput) || 0;
    const fechaActual = new Date();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const carpetaMesAno = `${fechaActual.getFullYear()}-${meses[fechaActual.getMonth()]}`;

    const nombreArchivoFinal = archivoComprobante ? archivoComprobante.name : 'comprobante_digital.pdf';
    const rutaEstructuradaDrive = `Drive > info@actiolegisec.com > GASTOS DE CLIENTES > ${casoActivo.cliente} > ${carpetaMesAno} > ${nombreArchivoFinal}`;

    const nuevoGastoDrive: RegistroGastoDrive = {
      id: `gst-${Date.now()}`,
      causaId: casoActivo.id,
      cliente: casoActivo.cliente,
      monto: montoNum,
      estado: 'Pendiente',
      concepto: conceptoGastoInput || 'Gasto operacional judicial',
      nombreArchivo: nombreArchivoFinal,
      rutaDrive: rutaEstructuradaDrive,
      fechaSubida: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuarioSubida: usuarioSesion?.nombre || 'Usuario Registrador'
    };

    setComprobantesDrive(prev => [nuevoGastoDrive, ...prev]);
    onRegistrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Subió comprobante "${nombreArchivoFinal}" a ${rutaEstructuradaDrive}`, 'Drive Gastos');

    setMontoGastoInput('');
    setConceptoGastoInput('');
    setArchivoComprobante(null);
    alert(`Gasto y comprobante registrados en Drive:\n${rutaEstructuradaDrive}`);
  };

  const handleCrearClienteDirectorio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreCliente || !nuevoCorreoCliente) return;

    const codSecuencial = `ACTIO-${String(listaClientes.length + 1).padStart(5, '0')}`;
    const nCli = {
      id: `cli-${Date.now()}`,
      nombre: nuevoNombreCliente,
      correo: nuevoCorreoCliente,
      codigo: codSecuencial
    };

    setListaClientes(prev => [...prev, nCli]);
    onRegistrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Creó cliente ${nuevoNombreCliente} (${codSecuencial})`, 'Gestión Clientes');
    setNuevoNombreCliente('');
    setNuevoCorreoCliente('');
  };

  const handleBorrarCliente = (id: string, nombre: string) => {
    if (confirm(`¿Desea eliminar de la base de datos al cliente "${nombre}"?`)) {
      setListaClientes(prev => prev.filter(c => c.id !== id));
      onRegistrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Eliminó cliente ${nombre}`, 'Gestión Clientes');
    }
  };

  const handleEnviarEditorial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloArticulo || !resumenArticulo) return;

    onRegistrarAuditoria(usuarioSesion?.nombre || 'Abogado', `Redactó y envió ensayo: "${tituloArticulo}"`, 'Línea Editorial');
    setTituloArticulo('');
    setResumenArticulo('');
    alert('Borrador enviado con éxito a la Consola del Administrador para aprobación.');
  };

  const handleProcesarConIA = () => {
    if (!textoNotificacionIA.trim() || !casoActivo) return;
    setProcesandoIA(true);

    setTimeout(() => {
      const nuevaActuacion: Actuacion = {
        id: `act-${Date.now()}`,
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        titulo: 'Providencia Judicial Notificada',
        resumenParaCliente: 'El juzgado emite providencia de término para conocimiento de las partes.',
        detectadoPorIA: true
      };

      setExpedientes((prev) =>
        prev.map((exp) => exp.id === casoActivo.id ? { ...exp, actuaciones: [nuevaActuacion, ...exp.actuaciones] } : exp)
      );

      setProcesandoIA(false);
      onRegistrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Procesó providencia para causa ${casoActivo.numProceso}`, 'Expediente IA');
      setTextoNotificacionIA('');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* CABECERA INTRANET */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <Building2 className="w-3.5 h-3.5 text-neutral-900" />
            <span>Intranet • {usuarioSesion?.rol?.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">Intranet ACTIO LEGIS</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-neutral-100 p-1 rounded-xl">
          <button 
            type="button" 
            onClick={() => setTabIntranet('expedientes')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'expedientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Expedientes & IA
          </button>

          <button 
            type="button" 
            onClick={() => setTabIntranet('clientes')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'clientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Directorio Clientes
          </button>
          
          <button 
            type="button" 
            onClick={() => setTabIntranet('citas')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'citas' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Google Calendar Inst.
          </button>
          
          <button 
            type="button" 
            onClick={() => setTabIntranet('gastos')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'gastos' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Registrar Gastos
          </button>

          {(usuarioSesion?.rol === 'admin' || usuarioSesion?.rol === 'abogado') && (
            <button 
              type="button" 
              onClick={() => setTabIntranet('editorial-borradores')} 
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'editorial-borradores' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
            >
              Redactar Editorial
            </button>
          )}
        </div>
      </div>

      {/* TAB: DIRECTORIO DE CLIENTES (ADMIN & ABOGADOS) */}
      {tabIntranet === 'clientes' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-neutral-950 flex items-center gap-2">
                <Users className="w-5 h-5 text-neutral-900" />
                <span>Gestión & Directorio de Clientes</span>
              </h3>
              <p className="text-xs text-neutral-500">Registro de firmas y personas patrocinadas con asignación automática de código ACTIO-XXXXX.</p>
            </div>
          </div>

          <form onSubmit={handleCrearClienteDirectorio} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
            <span className="text-xs font-mono font-bold text-neutral-900 block">Registrar Nuevo Cliente</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Razón social o Nombre del Cliente" required value={nuevoNombreCliente} onChange={e => setNuevoNombreCliente(e.target.value)} className="bg-white border border-neutral-300 rounded-lg p-2.5 text-xs" />
              <input type="email" placeholder="correo@cliente.com" required value={nuevoCorreoCliente} onChange={e => setNuevoCorreoCliente(e.target.value)} className="bg-white border border-neutral-300 rounded-lg p-2.5 text-xs" />
            </div>
            <button type="submit" className="px-4 py-2 bg-neutral-950 text-white text-xs rounded-lg font-semibold cursor-pointer">Registrar Cliente & Generar Código</button>
          </form>

          <div className="space-y-2">
            {listaClientes.map(cli => (
              <div key={cli.id} className="p-4 border border-neutral-200 rounded-xl flex items-center justify-between text-xs bg-white">
                <div>
                  <div className="font-bold text-neutral-900">{cli.nombre}</div>
                  <div className="text-neutral-500 font-mono text-[11px]">{cli.correo} • Código Confidencial: <strong className="text-neutral-900">{cli.codigo}</strong></div>
                </div>
                <button type="button" onClick={() => handleBorrarCliente(cli.id, cli.nombre)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: REDACTAR BORRADOR EDITORIAL */}
      {tabIntranet === 'editorial-borradores' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-2xl mx-auto space-y-4 shadow-sm">
          <h3 className="text-lg font-serif font-bold text-neutral-950 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neutral-900" />
            <span>Redactar Criterio para la Editorial</span>
          </h3>
          <p className="text-xs text-neutral-500">Los ensayos serán enviados a revisión del Administrador antes de su publicación pública.</p>

          <form onSubmit={handleEnviarEditorial} className="space-y-3">
            <input type="text" placeholder="Título del artículo" required value={tituloArticulo} onChange={e => setTituloArticulo(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-3 text-xs" />
            <textarea rows={6} placeholder="Escriba el ensayo o criterio jurídico aquí..." required value={resumenArticulo} onChange={e => setResumenArticulo(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-3 text-xs resize-none" />
            <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer">Enviar a Revisión de la Administración</button>
          </form>
        </div>
      )}

      {/* TAB: GASTOS CON BARRA DE PROGRESO DE REEMBOLSOS */}
      {tabIntranet === 'gastos' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-2xl mx-auto space-y-6 shadow-sm">
          <div>
            <h3 className="text-lg font-serif font-bold text-neutral-950">Registro de Gastos & Comprobantes Drive</h3>
            <p className="text-xs text-neutral-500 mt-1">Archivado automático en info@actiolegisec.com en la carpeta GASTOS DE CLIENTES.</p>
          </div>

          {/* BARRA DE PROGRESO: GASTOS VS REEMBOLSADOS */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span>Estado de Reembolsos de Gastos:</span>
              <span>${totalReembolsados} / ${totalGastos} USD ({porcentajeReembolsado}%)</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-700 transition-all duration-500" style={{ width: `${porcentajeReembolsado}%` }} />
            </div>
          </div>

          <form onSubmit={handleRegistrarGastoConDrive} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Causa Seleccionada:</label>
              <select value={casoActivoId} onChange={e => setCasoActivoId(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs font-mono">
                {expedientes.map(exp => (
                  <option key={exp.id} value={exp.id}>{exp.numProceso} — {exp.cliente}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Monto ($ USD):</label>
              <input type="number" required placeholder="350.00" value={montoGastoInput} onChange={e => setMontoGastoInput(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs" />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Concepto:</label>
              <input type="text" placeholder="Tasa judicial / Peritaje" value={conceptoGastoInput} onChange={e => setConceptoGastoInput(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs" />
            </div>

            <div className="border-2 border-dashed border-neutral-300 hover:border-neutral-950 rounded-xl p-4 text-center transition-all bg-neutral-50">
              <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
              <label className="block text-xs font-semibold text-neutral-800 cursor-pointer">
                <span>Adjuntar Comprobante (JPEG, PNG, PDF)</span>
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  onChange={(e) => setArchivoComprobante(e.target.files?.[0] || null)}
                  className="hidden" 
                />
              </label>
            </div>

            <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer">Registrar Gasto en Drive</button>
          </form>
        </div>
      )}

      {/* TAB: GOOGLE CALENDAR OFICIAL INTEGRADOR */}
      {tabIntranet === 'citas' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-sm w-full">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <div>
              <h3 className="text-lg font-serif font-bold text-neutral-950">Google Calendar Institucional ACTIO LEGIS</h3>
              <p className="text-xs font-mono text-neutral-500">ID: actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc@group.calendar.google.com</p>
            </div>
          </div>

          <div className="w-full border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50 h-[650px]">
            <iframe 
              src="https://calendar.google.com/calendar/embed?src=actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc%40group.calendar.google.com&ctz=America%2FGuayaquil"
              style={{ border: 0 }} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no"
              title="Google Calendar ACTIO LEGIS"
            />
          </div>
        </div>
      )}

      {/* TAB: EXPEDIENTES & MOTOR IA */}
      {tabIntranet === 'expedientes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase text-neutral-300 flex items-center gap-1.5"><Bot className="w-4 h-4 text-emerald-400" /> Expediente IA</span>
              <textarea rows={4} value={textoNotificacionIA} onChange={(e) => setTextoNotificacionIA(e.target.value)} placeholder="Pegue la providencia judicial aquí..." className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-xl p-3 resize-none" />
              <button type="button" disabled={procesandoIA || !textoNotificacionIA.trim()} onClick={handleProcesarConIA} className="w-full py-3 bg-white text-neutral-950 text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer">
                {procesandoIA ? 'Analizando...' : 'Interpretar Providencia'}
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">Causas Patrocinadas ({expedientes.length})</h3>
              <div className="space-y-2">
                {expedientes.map((c) => (
                  <div key={c.id} onClick={() => setCasoActivoId(c.id)} className={`p-3 rounded-xl border text-xs cursor-pointer ${c.id === casoActivoId ? 'border-neutral-950 bg-neutral-50 font-medium' : 'border-neutral-200'}`}>
                    <div className="flex justify-between font-mono text-[11px]"><span>{c.numProceso}</span><span className="font-bold">{c.porcentaje}%</span></div>
                    <div className="text-neutral-700 truncate mt-1">{c.cliente}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
            <div className="border-b border-neutral-200 pb-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Expediente Activo</span>
                <h2 className="text-xl font-serif font-bold text-neutral-950">{casoActivo.numProceso}</h2>
                <p className="text-xs text-neutral-600 mt-0.5">Cliente: <strong>{casoActivo.cliente}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 font-mono text-xs space-y-2">
              <div className="flex justify-between"><span>Etapa Procesal:</span><strong className="text-neutral-900">{casoActivo.etapaProcesalActual}</strong></div>
              <div className="flex justify-between"><span>Honorarios Fijados:</span><strong className="text-neutral-900">{casoActivo.honorariosFijados}</strong></div>
              <div className="flex justify-between"><span>Gastos Acumulados:</span><strong className="text-neutral-900">{casoActivo.gastosRegistrados}</strong></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
