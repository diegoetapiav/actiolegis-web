import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, ArrowRight, 
  ArrowUp, ChevronRight, Lock, User, LogOut, Clock, Landmark, 
  Users, Bot, BookOpen, HeartHandshake, UserCheck, Settings, 
  Bell, AlertCircle 
} from 'lucide-react';

// IMPORTACIÓN DE NUESTROS MÓDULOS EN SRC/COMPONENTS/
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginModal, UsuarioSistema, RolUsuario } from './components/LoginModal';
import { ModuloExpedientes, ExpedienteInterno } from './components/ModuloExpedientes';

export interface NotificacionAuditoria {
  id: string;
  fecha: string;
  usuario: string;
  accion: string;
  modulo: string;
}

export interface ArticuloEditorial {
  id: string;
  titulo: string;
  categoria: string;
  resumen: string;
  autor: string;
  estado: 'publicado' | 'pendiente_aprobacion';
  fecha: string;
}

const USUARIOS_BASE: UsuarioSistema[] = [
  { id: 'usr-admin', nombre: 'Abg. Diego Tapia Vicuña, Mgs.', correo: 'diego.tapia@actiolegisec.com', rol: 'admin', activo: true },
  { id: 'usr-abg', nombre: 'Abg. Marcela Dunn-Ortega, Mgs.', correo: 'marceladunnortega@actiolegisec.com', rol: 'abogado', activo: true },
  { id: 'usr-asis', nombre: 'Lcda. María Elena Castro', correo: 'mcastro@actiolegisec.com', rol: 'asistente', activo: true },
  { id: 'usr-pas', nombre: 'Carlos Mendoza', correo: 'cmendoza@actiolegisec.com', rol: 'pasante', activo: true },
  { id: 'usr-cli-1', nombre: 'Inmobiliaria del Valle S.A.S.', correo: 'contacto@inmovalle.com', rol: 'cliente', codigoCliente: 'ACTIO-00001', claveAcceso: 'cliente123', activo: true },
];

const CASOS_BASE: ExpedienteInterno[] = [
  {
    id: 'exp-1',
    numProceso: '17230-2024-00482',
    materia: 'CIVIL Y MERCANTIL',
    tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
    cliente: 'Inmobiliaria del Valle S.A.S.',
    contraparte: 'Herederos de Juan Carlos Peñaherrera y Otros',
    unidadJudicial: 'Unidad Judicial Civil de Guayaquil',
    abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs.',
    etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
    porcentaje: 65,
    proximaFechaClave: '2026-10-18',
    proximasAcciones: 'Entrega de informe pericial técnico y preparación de alegatos orales.',
    honorariosFijados: '$ 12,500.00 USD',
    gastosRegistrados: '$ 1,240.00 USD',
    actuaciones: [
      {
        id: 'act-1',
        fecha: '2026-10-08 11:20',
        titulo: 'Concesión de término fatal para informe pericial',
        resumenParaCliente: 'El Juez ordenó al perito técnico la entrega formal de la planimetría del terreno en 10 días para continuar a juicio.',
        detectadoPorIA: false
      }
    ]
  },
  {
    id: 'exp-2',
    numProceso: '09281-2025-01129',
    materia: 'ACTIVOS PENAL',
    tipoProceso: 'Investigación Previa por Presunto Delito Económico',
    cliente: 'Inmobiliaria del Valle S.A.S.',
    contraparte: 'Fiscalía General del Estado',
    unidadJudicial: 'Fiscalía Provincial del Guayas',
    abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs. & Abg. Marcela Dunn-Ortega, Mgs.',
    etapaProcesalActual: 'Calificación & Diligencias Previas',
    porcentaje: 35,
    proximaFechaClave: '2026-11-05',
    proximasAcciones: 'Revisión y descargo de peritaje contable en sede fiscal.',
    honorariosFijados: '$ 18,000.00 USD',
    gastosRegistrados: '$ 2,150.00 USD',
    actuaciones: [
      {
        id: 'act-3',
        fecha: '2026-10-01 15:00',
        titulo: 'Recepción de versión libre y voluntaria',
        resumenParaCliente: 'Se compareció con la defensa técnica aportando libros contables que certifican la licitud patrimonial.',
        detectadoPorIA: false
      }
    ]
  }
];

const ARTICULOS_BASE: ArticuloEditorial[] = [
  {
    id: 'art-1',
    titulo: 'La carga probatoria en peritajes contables durante la investigación previa',
    categoria: 'Derecho Penal Económico',
    resumen: 'Estudio sobre las garantías constitucionales frente a los requerimientos fiscales y los límites a la autoincriminación en peritajes patrimoniales.',
    autor: 'Abg. Diego Tapia Vicuña, Mgs.',
    estado: 'publicado',
    fecha: 'Octubre 2026'
  },
  {
    id: 'art-2',
    titulo: 'Cómputo estricto de términos en citaciones por boletas fijadas',
    categoria: 'Litigio Civil & COGEP',
    resumen: 'Análisis de nulidades procesales recurrentes en juicios ordinarios de prescripción extraordinaria adquisitiva de dominio.',
    autor: 'Abg. Marcela Dunn-Ortega, Mgs.',
    estado: 'publicado',
    fecha: 'Septiembre 2026'
  }
];

const NOTIFICACIONES_BASE: NotificacionAuditoria[] = [
  { id: 'not-1', fecha: '2026-10-27 08:30', usuario: 'Abg. Marcela Dunn-Ortega, Mgs.', accion: 'Registró nuevo expediente 09281-2025-01129', modulo: 'Intranet Litigios' },
  { id: 'not-2', fecha: '2026-10-26 16:45', usuario: 'Lcda. María Elena Castro (Asistente)', accion: 'Subió comprobante a Drive > GASTOS DE CLIENTES > Inmobiliaria del Valle S.A.S.', modulo: 'Gestión Gastos' },
  { id: 'not-3', fecha: '2026-10-25 11:10', usuario: 'Abg. Diego Tapia Vicuña, Mgs.', accion: 'Aprobó publicación en línea editorial', modulo: 'Consola CMS' }
];

export default function App() {
  const [vista, setVista] = useState<'sitio-web' | 'editorial' | 'equipo' | 'cliente' | 'intranet' | 'admin-console'>('sitio-web');
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'gastos' | 'editorial-borradores'>('expedientes');
  const [modalIngreso, setModalIngreso] = useState<'intranet' | 'cliente' | 'admin' | null>(null);

  const [usuarioSesion, setUsuarioSesion] = useState<UsuarioSistema | null>(null);
  const [usuariosSistema, setUsuariosSistema] = useState<UsuarioSistema[]>(USUARIOS_BASE);
  const [expedientes, setExpedientes] = useState<ExpedienteInterno[]>(CASOS_BASE);
  const [articulos, setArticulos] = useState<ArticuloEditorial[]>(ARTICULOS_BASE);
  const [notificaciones, setNotificaciones] = useState<NotificacionAuditoria[]>(NOTIFICACIONES_BASE);

  // Formulario CMS Admin
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevoRol, setNuevoRol] = useState<RolUsuario>('abogado');

  const registrarAuditoria = (usuario: string, accion: string, modulo: string) => {
    const nuevaNotif: NotificacionAuditoria = {
      id: `not-${Date.now()}`,
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuario,
      accion,
      modulo
    };
    setNotificaciones(prev => [nuevaNotif, ...prev]);
  };

  const handleLoginExitoso = (usuario: UsuarioSistema, vistaDestino: 'intranet' | 'cliente' | 'admin-console') => {
    setUsuarioSesion(usuario);
    setModalIngreso(null);
    setVista(vistaDestino);
    registrarAuditoria(usuario.nombre, `Inicio de sesión en módulo ${vistaDestino}`, 'Autenticación');
  };

  const handleCrearUsuarioCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoCorreo) return;

    if (nuevoRol === 'cliente') {
      const numClientes = usuariosSistema.filter(u => u.rol === 'cliente').length + 1;
      const codigoSecuencial = `ACTIO-${String(numClientes).padStart(5, '0')}`;

      const nuevoCliente: UsuarioSistema = {
        id: `usr-cli-${Date.now()}`,
        nombre: nuevoNombre,
        correo: nuevoCorreo,
        rol: 'cliente',
        codigoCliente: codigoSecuencial,
        claveAcceso: 'cliente123',
        activo: true
      };
      setUsuariosSistema(prev => [...prev, nuevoCliente]);
      registrarAuditoria(usuarioSesion?.nombre || 'Administrador', `Registró cliente ${nuevoNombre} con código ${codigoSecuencial}`, 'Consola Clientes');
      alert(`Cliente registrado con éxito.\nCódigo generado: ${codigoSecuencial}`);
    } else {
      const nUsr: UsuarioSistema = {
        id: `usr-${Date.now()}`,
        nombre: nuevoNombre,
        correo: nuevoCorreo.trim().toLowerCase(),
        rol: nuevoRol,
        claveAcceso: 'actio2026',
        activo: true
      };
      setUsuariosSistema(prev => [...prev, nUsr]);
      registrarAuditoria(usuarioSesion?.nombre || 'Administrador', `Añadió integrante ${nuevoNombre} como ${nuevoRol.toUpperCase()}`, 'Consola CMS');
    }

    setNuevoNombre('');
    setNuevoCorreo('');
  };

  const handleAprobarArticulo = (artId: string) => {
    setArticulos(prev => prev.map(a => a.id === artId ? { ...a, estado: 'publicado' } : a));
    registrarAuditoria(usuarioSesion?.nombre || 'Administrador', `Aprobó y publicó artículo en línea editorial`, 'Consola CMS');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* 1. HEADER MODULAR */}
      <Navbar 
        vista={vista}
        setVista={setVista}
        usuarioSesion={usuarioSesion}
        onLogout={() => { setUsuarioSesion(null); setVista('sitio-web'); }}
        onAbrirModal={(tipo) => setModalIngreso(tipo)}
      />

      {/* 2. VISTA SITIO WEB PRINCIPAL */}
      {vista === 'sitio-web' && (
        <main>
          {/* HERO */}
          <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 border-b border-neutral-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-50 border border-neutral-200 shadow-2xs text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-8 mx-auto">
                <span className="w-2 h-2 rounded-full bg-neutral-950" />
                <span>Despacho de litigantes • Guayaquil, Ecuador</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-neutral-950 tracking-tight leading-[1.15] font-normal max-w-3xl mx-auto">
                Rigor técnico, litigio estratégico y defensa <span className="italic font-normal text-[#E2D9C8]">en servicio del derecho.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mt-6">
                ACTIO LEGIS consolida una práctica jurídica de alta exigencia procesal, patrocinando juicios y trámites judiciales o administrativos, manejo de casos de complejidad y controversias de distintas índoles bajo estándares de estricta reserva y ética profesional.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-7 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Agende una consulta</span>
                  <ArrowRight className="w-4 h-4 text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => setModalIngreso('cliente')}
                  className="px-7 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Portal de Clientes</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </div>
          </section>

          {/* PROPÓSITO (#281F26) */}
          <section id="proposito" className="py-20 md:py-28 border-b border-neutral-800 bg-[#281F26] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#CBD5E1] font-semibold">Filosofía de Litigio</span>  
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">No ejercemos el derecho en masa. Asumimos causas con compromiso de fondo.</h2>
                </div>
                <div className="md:col-span-8 space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
                  <p>En un entorno sobrecargado por trámites delegados, ACTIO LEGIS ejerce el patrocinio con la devoción técnica que amerita: cada proceso es dirigido personalmente, formulando teorías de cada caso, procurando la más sólida recopilación probatoria para obtener el resultado esperado.</p>
                  <p>Nuestra premisa es la transparencia procesal: información en tiempo real sin tecnicismos, análisis honesto de probabilidades procesales y una defensa técnica inquebrantable en estrados.</p>
                </div>
              </div>
            </div>
          </section>

          {/* NUESTRO EQUIPO */}
          <section id="socios" className="py-20 md:py-28 border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">Nuestro Equipo</span>
                <h2 className="text-3xl font-serif font-bold text-neutral-950">Liderazgo & Criterio Jurídico</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Socio Fundador</span>
                  <h3 className="text-2xl font-serif font-bold text-neutral-950">Abg. Diego Tapia Vicuña, Mgs.</h3>
                  <p className="text-xs font-mono text-neutral-500">Litigio en área penal y práctica civil</p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">Abogado litigante con más de dos décadas de trayectoria en el patrocinio de causas complejas y defensa ante las judicaturas del Estado.</p>
                </div>

                <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Socia Fundadora</span>
                  <h3 className="text-2xl font-serif font-bold text-neutral-950">Abg. Marcela Dunn-Ortega, Mgs.</h3>
                  <p className="text-xs font-mono text-neutral-500">Litigio en prevención de género y área penal</p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">Especialista en estructuración fiduciaria, resolución prejudicial de controversias societarias y litigio en prevención de género.</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button type="button" onClick={() => setVista('equipo')} className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer font-semibold">
                  <span>Ver el resto del equipo</span>
                  <ArrowRight className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            </div>
          </section>

          {/* CONTACTO */}
          <section id="contacto" className="py-20 md:py-24 bg-white border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold">
                    <Shield className="w-3.5 h-3.5 text-neutral-900" />
                    <span>Atención Confidencial</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-snug">Confíe su causa a una defensa rigurosa.</h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica.</p>
                </div>

                <button type="button" onClick={() => alert('Para coordinar su cita en despacho, contáctenos al +593 4 6005080 o al correo info@actiolegisec.com')} className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer">
                  Agende su consulta
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 3. VISTA INTRANET MODULAR */}
      {vista === 'intranet' && (
        <ModuloExpedientes 
          expedientes={expedientes}
          setExpedientes={setExpedientes}
          usuarioSesion={usuarioSesion}
          tabIntranet={tabIntranet}
          setTabIntranet={setTabIntranet}
          onRegistrarAuditoria={registrarAuditoria}
        />
      )}

      {/* 4. VISTA CONSOLA CMS ADMINISTRADOR */}
      {vista === 'admin-console' && usuarioSesion?.rol === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="bg-neutral-950 text-white rounded-3xl p-8 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-800 text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Super Administrador • diego.tapia@actiolegisec.com</span>
            </div>
            <h1 className="text-3xl font-serif font-bold">Consola de Control Total de la Firma</h1>
            <p className="text-xs text-neutral-400 mt-1">Gestión directa de usuarios, permisos, causas, clientes y contenidos sin depender de GitHub.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-xs">
                <h3 className="text-sm font-mono uppercase font-bold text-neutral-950 flex items-center gap-2">
                  <Users className="w-4 h-4 text-neutral-900" />
                  <span>Nómina de Usuarios & Clientes ({usuariosSistema.length})</span>
                </h3>

                <form onSubmit={handleCrearUsuarioCMS} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                  <span className="text-xs font-mono font-bold text-neutral-900 block">Registrar Nuevo Integrante o Cliente</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input type="text" placeholder="Nombre completo" required value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} className="bg-white border border-neutral-300 rounded-lg p-2 text-xs" />
                    <input type="email" placeholder="correo@ejemplo.com" required value={nuevoCorreo} onChange={e => setNuevoCorreo(e.target.value)} className="bg-white border border-neutral-300 rounded-lg p-2 text-xs" />
                    <select value={nuevoRol} onChange={e => setNuevoRol(e.target.value as RolUsuario)} className="bg-white border border-neutral-300 rounded-lg p-2 text-xs font-mono">
                      <option value="abogado">1. Abogado (Fuerte)</option>
                      <option value="asistente">2. Asistente</option>
                      <option value="pasante">3. Pasante</option>
                      <option value="cliente">4. Cliente (Genera Código ACTIO-XXXXX)</option>
                    </select>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-neutral-950 text-white text-xs rounded-lg font-semibold cursor-pointer">Registrar en Sistema</button>
                </form>

                <div className="space-y-2">
                  {usuariosSistema.map(usr => (
                    <div key={usr.id} className="p-3 border border-neutral-200 rounded-xl flex items-center justify-between text-xs bg-white">
                      <div>
                        <div className="font-bold text-neutral-900">{usr.nombre}</div>
                        <div className="text-neutral-500 font-mono text-[11px]">{usr.correo} {usr.codigoCliente && `• Código: ${usr.codigoCliente}`}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md font-mono text-[10px] uppercase font-bold ${usr.rol === 'admin' ? 'bg-purple-100 text-purple-900' : usr.rol === 'abogado' ? 'bg-blue-100 text-blue-900' : usr.rol === 'cliente' ? 'bg-amber-100 text-amber-900' : 'bg-neutral-100 text-neutral-800'}`}>
                        {usr.rol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-mono uppercase font-bold text-neutral-950 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neutral-900" />
                  <span>Centro de Auditoría & Actividades ({notificaciones.length})</span>
                </h3>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {notificaciones.map(not => (
                    <div key={not.id} className="p-3 border border-neutral-200 rounded-xl text-xs space-y-1 bg-neutral-50">
                      <div className="flex justify-between font-mono text-[10px] text-neutral-400">
                        <span>{not.fecha}</span>
                        <span className="font-bold text-neutral-700">{not.modulo}</span>
                      </div>
                      <div className="font-semibold text-neutral-900">{not.usuario}</div>
                      <p className="text-neutral-600">{not.accion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. VISTA PORTAL DE CLIENTES */}
      {vista === 'cliente' && usuarioSesion?.rol === 'cliente' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-[11px] font-mono text-neutral-600">Código Confidencial: {usuarioSesion.codigoCliente}</span>
              <h1 className="text-2xl font-serif text-neutral-950 font-normal mt-1">Bienvenido/a, <span className="font-semibold">{usuarioSesion.nombre}</span></h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-3">
              {expedientes.map((caso) => (
                <div key={caso.id} className="rounded-2xl p-5 border bg-white shadow-2xs">
                  <span className="font-mono text-xs font-bold text-neutral-900">{caso.numProceso}</span>
                  <h3 className="font-serif font-semibold text-neutral-950 text-sm mt-1">{caso.tipoProceso}</h3>
                </div>
              ))}
            </div>

            <div className="lg:col-span-8 rounded-3xl border border-neutral-200 p-6 bg-white space-y-4">
              <h2 className="text-xl font-serif font-bold text-neutral-950">{expedientes[0]?.tipoProceso}</h2>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2 font-mono">
                <div>Etapa Procesal: <strong>{expedientes[0]?.etapaProcesalActual}</strong></div>
                <div>Próxima Fecha Clave: <strong>{expedientes[0]?.proximaFechaClave}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. VISTA EDITORIAL PÚBLICA */}
      {vista === 'editorial' && (
        <main className="py-16 md:py-24 bg-neutral-50/50 min-h-[80vh]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="border-b border-neutral-200 pb-10 space-y-4 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral-950 tracking-tight">Criterios jurídicos & Doctrina</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulos.filter(a => a.estado === 'publicado').map(art => (
                <article key={art.id} className="bg-white p-7 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">{art.fecha} • {art.categoria}</span>
                  <h3 className="font-serif font-bold text-xl text-neutral-950 leading-snug">{art.titulo}</h3>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">{art.resumen}</p>
                  <span className="text-[11px] font-mono text-neutral-400 block pt-2">Por: {art.autor}</span>
                </article>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* 7. VISTA EQUIPO DE ABOGADOS */}
      {vista === 'equipo' && (
        <main className="py-16 md:py-24 bg-neutral-50/50 min-h-[80vh]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="border-b border-neutral-200 pb-10 space-y-4 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral-950 tracking-tight">Nuestro Equipo & Consultores</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Socio Fundador</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">Abg. Diego Tapia Vicuña, Mgs.</h3>
                <p className="text-xs font-mono text-neutral-500">Litigio en área penal y práctica civil</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Socia Fundadora</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">Abg. Marcela Dunn-Ortega, Mgs.</h3>
                <p className="text-xs font-mono text-neutral-500">Litigio en prevención de género y área penal</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 8. FOOTER MODULAR */}
      <Footer 
        setVista={setVista}
        onAbrirModal={(tipo) => setModalIngreso(tipo)}
      />

      {/* 9. VENTANAS MODALES MODULARES */}
      <LoginModal 
        modalIngreso={modalIngreso}
        onClose={() => setModalIngreso(null)}
        usuariosSistema={usuariosSistema}
        onLoginExitoso={handleLoginExitoso}
      />

    </div>
  );
}
