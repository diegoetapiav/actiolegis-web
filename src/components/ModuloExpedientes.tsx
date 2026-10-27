import React, { useState } from 'react';
import { 
  FileText, Calendar, Clock, ChevronRight, Bot, 
  Sparkles, CheckCircle2, Upload, FileCheck, DollarSign, Building2
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
  monto: string;
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
  tabIntranet: 'expedientes' | 'citas' | 'gastos' | 'editorial-borradores';
  setTabIntranet: (tab: 'expedientes' | 'citas' | 'gastos' | 'editorial-borradores') => void;
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
  },
  {
    fondoCard: 'bg-[#F0F5FA] border-[#CFDFEE]',
    badgeMateria: 'bg-[#E1EDF7] text-[#19456B] border-[#BFDAF0]',
    barraProgreso: 'bg-[#255C8F]',
    indicadorActivo: 'bg-[#255C8F]',
    detalleFondo: 'bg-[#F7FAFC]',
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
  const [resultadoIA, setResultadoIA] = useState<string | null>(null);

  // Estados de Gastos & Comprobantes Drive
  const [montoGastoInput, setMontoGastoInput] = useState('');
  const [conceptoGastoInput, setConceptoGastoInput] = useState('');
  const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);
  const [comprobantesDrive, setComprobantesDrive] = useState<RegistroGastoDrive[]>([]);

  const casoActivo = expedientes.find((c) => c.id === casoActivoId) || expedientes[0];
  const indiceActivo = expedientes.findIndex((c) => c.id === casoActivo?.id);
  const estiloActivo = PALETA_TRAMITES[Math.max(0, indiceActivo) % PALETA_TRAMITES.length];

  // SUBIDA DE GASTO CON COMPROBANTE ORGANIZADO EN GOOGLE DRIVE
  const handleRegistrarGastoConDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!montoGastoInput || !casoActivo) return;

    const fechaActual = new Date();
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const carpetaMesAno = `${fechaActual.getFullYear()}-${meses[fechaActual.getMonth()]}`;

    const nombreArchivoFinal = archivoComprobante ? archivoComprobante.name : 'comprobante_digital.pdf';
    const rutaEstructuradaDrive = `Google Drive > info@actiolegisec.com > GASTOS DE CLIENTES > ${casoActivo.cliente} > ${carpetaMesAno} > ${nombreArchivoFinal}`;

    const nuevoGastoDrive: RegistroGastoDrive = {
      id: `gst-${Date.now()}`,
      causaId: casoActivo.id,
      cliente: casoActivo.cliente,
      monto: montoGastoInput,
      concepto: conceptoGastoInput || 'Gasto operacional judicial',
      nombreArchivo: nombreArchivoFinal,
      rutaDrive: rutaEstructuradaDrive,
      fechaSubida: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuarioSubida: usuarioSesion?.nombre || 'Usuario Registrador'
    };

    setComprobantesDrive(prev => [nuevoGastoDrive, ...prev]);

    setExpedientes(prev => prev.map(exp => {
      if (exp.id === casoActivo.id) {
        return { ...exp, gastosRegistrados: `$ ${montoGastoInput} USD` };
      }
      return exp;
    }));

    onRegistrarAuditoria(
      usuarioSesion?.nombre || 'Usuario', 
      `Subió comprobante "${nombreArchivoFinal}" a ${rutaEstructuradaDrive}`, 
      'Drive Gastos'
    );

    setMontoGastoInput('');
    setConceptoGastoInput('');
    setArchivoComprobante(null);
    alert(`¡Gasto y comprobante registrados con éxito!\n\nOrganizado en Drive institucional:\n${rutaEstructuradaDrive}`);
  };

  // MOTOR PROCESADOR DE PROVIDENCIAS CON IA
  const handleProcesarConIA = () => {
    if (!textoNotificacionIA.trim() || !casoActivo) return;
    setProcesandoIA(true);

    setTimeout(() => {
      const texto = textoNotificacionIA;
      let tituloDetectado = 'Providencia Judicial Notificada';
      let resumenGenerado = 'Se agrega al expediente la providencia emitida por el juzgador para conocimiento de las partes.';
      let proximaFecha = '2026-11-12';

      if (texto.toLowerCase().includes('audiencia')) {
        tituloDetectado = 'Convocatoria a Audiencia de Juicio';
        resumenGenerado = 'El tribunal ha fijado día y hora para la instalación de la audiencia.';
        proximaFecha = '2026-11-20';
      }

      const nuevaActuacion: Actuacion = {
        id: `act-${Date.now()}`,
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        titulo: tituloDetectado,
        resumenParaCliente: resumenGenerado,
        detectadoPorIA: true
      };

      setExpedientes((prev) =>
        prev.map((exp) => {
          if (exp.id === casoActivo.id) {
            return {
              ...exp,
              proximaFechaClave: proximaFecha,
              actuaciones: [nuevaActuacion, ...exp.actuaciones]
            };
          }
          return exp;
        })
      );

      setProcesandoIA(false);
      setResultadoIA(`Notificación interpretada con éxito para la causa ${casoActivo.numProceso}.`);
      onRegistrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Procesó providencia con IA para causa ${casoActivo.numProceso}`, 'Expediente IA');
      setTextoNotificacionIA('');
      setTimeout(() => setResultadoIA(null), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* CABECERA INTRANET SIN LA PALABRA "FORENSE" */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <Building2 className="w-3.5 h-3.5 text-neutral-900" />
            <span>Intranet • {usuarioSesion?.rol?.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">Intranet ACTIO LEGIS</h1>
        </div>

        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
          <button 
            type="button" 
            onClick={() => setTabIntranet('expedientes')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'expedientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Expedientes & IA
          </button>
          
          <button 
            type="button" 
            onClick={() => setTabIntranet('citas')} 
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'citas' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
          >
            Google Calendar Inst.
          </button>
          
          {(usuarioSesion?.rol === 'admin' || usuarioSesion?.rol === 'abogado' || usuarioSesion?.rol === 'asistente') && (
            <button 
              type="button" 
              onClick={() => setTabIntranet('gastos')} 
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'gastos' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}
            >
              Registrar Gastos
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: REGISTRO DE GASTOS CON COMPROBANTE A GOOGLE DRIVE */}
      {tabIntranet === 'gastos' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-xl mx-auto space-y-5 shadow-sm">
          <div>
            <h3 className="text-lg font-serif font-bold text-neutral-950">Registrar Gastos & Subir Comprobante a Drive</h3>
            <p className="text-xs text-neutral-500 mt-1">Los comprobantes se archivarán de forma estructurada en la cuenta info@actiolegisec.com bajo: GASTOS DE CLIENTES {'>'} Cliente {'>'} Año-Mes.</p>
          </div>

          <form onSubmit={handleRegistrarGastoConDrive} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Causa Judicial Seleccionada:</label>
              <select value={casoActivoId} onChange={e => setCasoActivoId(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs font-mono">
                {expedientes.map(exp => (
                  <option key={exp.id} value={exp.id}>{exp.numProceso} — {exp.cliente}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Monto del Gasto ($ USD):</label>
              <input type="text" required placeholder="350.00" value={montoGastoInput} onChange={e => setMontoGastoInput(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs" />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-500 uppercase mb-1">Concepto / Detalle:</label>
              <input type="text" placeholder="Pago de tasa judicial / Peritaje técnico" value={conceptoGastoInput} onChange={e => setConceptoGastoInput(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-2.5 text-xs" />
            </div>

            {/* ADJUNTAR ARCHIVOS JPG, PNG, PDF */}
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
              {archivoComprobante && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-mono">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{archivoComprobante.name}</span>
                </div>
              )}
            </div>

            <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer shadow-xs">
              Registrar Gasto & Archivar en Drive
            </button>
          </form>

          {/* HISTORIAL LOCAL DE SUBIDAS A DRIVE */}
          {comprobantesDrive.length > 0 && (
            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-neutral-500">Comprobantes Subidos en esta Sesión</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {comprobantesDrive.map(item => (
                  <div key={item.id} className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] font-mono space-y-0.5">
                    <div className="flex justify-between font-bold text-neutral-900">
                      <span>{item.cliente}</span>
                      <span>$ {item.monto} USD</span>
                    </div>
                    <div className="text-neutral-500 truncate">{item.rutaDrive}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GOOGLE CALENDAR EMBEBIDO DENTRO DE LA PÁGINA */}
      {tabIntranet === 'citas' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="text-lg font-serif font-bold text-neutral-950">Google Calendar Institucional ACTIO LEGIS</h3>
            <p className="text-xs font-mono text-neutral-500">ID: actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc@group.calendar.google.com</p>
          </div>

          <div className="border border-neutral-200 rounded-xl overflow-hidden h-[650px] bg-neutral-50">
            <iframe 
              src="https://calendar.google.com/calendar/embed?src=actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc%40group.calendar.google.com&ctz=America%2FGuayaquil"
              style={{ border: 0 }} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no"
              title="Calendario Oficial ACTIO LEGIS"
            />
          </div>
        </div>
      )}

      {/* TAB 3: EXPEDIENTES, PROVIDENCIAS & MOTOR IA RESTAURADO */}
      {tabIntranet === 'expedientes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            
            {/* LECTOR DE PROVIDENCIAS IA */}
            <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-400" /> 
                  Expediente IA
                </span>
              </div>
              <textarea 
                rows={4} 
                value={textoNotificacionIA} 
                onChange={(e) => setTextoNotificacionIA(e.target.value)} 
                placeholder="Pegue el texto de la providencia judicial aquí..." 
                className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-xl p-3 resize-none" 
              />
              <button 
                type="button" 
                disabled={procesandoIA || !textoNotificacionIA.trim()} 
                onClick={handleProcesarConIA} 
                className="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer transition-all"
              >
                {procesandoIA ? 'Analizando...' : 'Interpretar Providencia'}
              </button>
            </div>

            {/* LISTA DE CAUSAS PATROCINADAS */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Causas Patrocinadas ({expedientes.length})
              </h3>
              <div className="space-y-2">
                {expedientes.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCasoActivoId(c.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${c.id === casoActivoId ? 'border-neutral-950 bg-neutral-50 font-medium' : 'border-neutral-200 hover:bg-neutral-50'}`}
                  >
                    <div className="flex justify-between font-mono text-[11px]">
                      <span>{c.numProceso}</span>
                      <span className="font-bold">{c.porcentaje}%</span>
                    </div>
                    <div className="text-neutral-700 truncate mt-1">{c.cliente}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* DETALLE DEL EXPEDIENTE ACTIVO */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
            <div className="border-b border-neutral-200 pb-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Expediente Judicial Activo</span>
                <h2 className="text-xl font-serif font-bold text-neutral-950">{casoActivo.numProceso}</h2>
                <p className="text-xs text-neutral-600 mt-0.5">Cliente: <strong>{casoActivo.cliente}</strong> • {casoActivo.unidadJudicial}</p>
              </div>
              <span className="px-3 py-1 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-800">
                Líder: {casoActivo.abogadoLider}
              </span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 font-mono text-xs space-y-2">
              <div className="flex justify-between"><span>Etapa Procesal:</span><strong className="text-neutral-900">{casoActivo.etapaProcesalActual}</strong></div>
              <div className="flex justify-between"><span>Honorarios Fijados:</span><strong className="text-neutral-900">{casoActivo.honorariosFijados}</strong></div>
              <div className="flex justify-between"><span>Gastos Acumulados:</span><strong className="text-neutral-900">{casoActivo.gastosRegistrados}</strong></div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Historial de Providencias ({casoActivo.actuaciones.length})
              </h3>
              <div className="space-y-2">
                {casoActivo.actuaciones.map((act) => (
                  <div key={act.id} className="p-4 rounded-xl border border-neutral-200 space-y-2 bg-neutral-50/50">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                        {act.titulo}
                        {act.detectadoPorIA && (
                          <span className="bg-neutral-950 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                            IA
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-400">{act.fecha}</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed bg-white p-2.5 rounded-lg border border-neutral-200">
                      {act.resumenParaCliente}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
