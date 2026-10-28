import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, MessageSquare, 
  MapPin, Phone, Mail, ArrowRight, ArrowUp, ExternalLink, 
  ChevronRight, Lock, User, LogOut, X, Clock, Award, Landmark, 
  Users, Building2, Sparkles, Plus, CheckCircle2, AlertCircle, Bot, BookOpen, 
  HeartHandshake, UserCheck, Settings, Upload, FileCheck, ShieldCheck, Bell
} from 'lucide-react';

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
    proximaFechaClave: '2026-10-28',
    proximasAcciones: 'Entrega de informe pericial técnico y preparación de alegatos orales.',
    honorariosFijados: '$ 3,500.00 USD',
    gastosRegistrados: '$ 450.00 USD',
    actuaciones: [
      {
        id: 'act-1',
        fecha: '2026-10-18',
        titulo: 'Providencia Judicial Notificada',
        resumenParaCliente: 'El Juez ordenó la práctica de la inspección judicial en el predio para la siguiente semana.',
        detectadoPorIA: false
      },
      {
        id: 'act-2',
        fecha: '2026-10-05',
        titulo: 'Informe Pericial Incorporado',
        resumenParaCliente: 'El perito acreditado rinde su informe técnico favorable sobre el terreno.',
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
    honorariosFijados: '$ 2,800.00 USD',
    gastosRegistrados: '$ 200.00 USD',
    actuaciones: [
      {
        id: 'act-3',
        fecha: '2026-10-12',
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
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'gastos' | 'editorial-borradores' | 'clientes'>('expedientes');
  const [modalIngreso, setModalIngreso] = useState<'intranet' | 'cliente' | 'admin' | null>(null);

  const [usuarioSesion, setUsuarioSesion] = useState<UsuarioSistema | null>(null);
  const [usuariosSistema, setUsuariosSistema] = useState<UsuarioSistema[]>(USUARIOS_BASE);
  const [expedientes, setExpedientes] = useState<ExpedienteInterno[]>(CASOS_BASE);
  const [articulos, setArticulos] = useState<ArticuloEditorial[]>(ARTICULOS_BASE);
  const [notificaciones, setNotificaciones] = useState<NotificacionAuditoria[]>(NOTIFICACIONES_BASE);

  const [causaSeleccionadaId, setCausaSeleccionadaId] = useState<string>('exp-1');

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

  const casoClienteActivo = expedientes.find(c => c.id === causaSeleccionadaId) || expedientes[0];

  const honorariosTotales = 3500;
  const honorariosPagados = 2400;
  const porcentajeHonorarios = Math.round((honorariosPagados / honorariosTotales) * 100);

  const gastosTotales = 450;
  const gastosCubiertos = 350;
  const porcentajeGastos = Math.round((gastosCubiertos / gastosTotales) * 100);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">
          
          <div 
            onClick={() => setVista('sitio-web')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="flex flex-col items-start pb-0.5">
              {vista === 'editorial' ? (
                <div className="flex flex-col items-start">
                  <div className="relative inline-block py-0.5">
                    <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
                    <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                      <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">ACTIO</span>
                      <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">LEGIS</span>
                    </div>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-500 font-mono mt-3 font-semibold">
                    en servicio del derecho
                  </span>
                </div>
              ) : (
                <img 
                  src="/logo-estudio.png" 
                  alt="ACTIO LEGIS Consultores Jurídicos" 
                  className="h-20 w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform cursor-pointer"
                />
              )}
            </div>

            <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
              <span className="font-serif text-xs font-bold tracking-tight text-neutral-950">
                {vista === 'editorial' ? 'Editorial Jurídico' : 'Estudio Jurídico'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                Guayaquil • Ecuador
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {vista === 'sitio-web' || vista === 'editorial' || vista === 'equipo' ? (
              <>
                <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600 ml-8 mr-2">
                  <button type="button" onClick={() => setVista('sitio-web')} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'sitio-web' ? 'text-neutral-950 font-bold' : ''}`}>Inicio</button>
                  <a href="#proposito" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">Propósito</a>
                  <a href="#socios" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'equipo' ? 'text-neutral-950 font-bold' : ''}`}>Nuestro Equipo</a>
                  <a href="#practica" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">Prácticas</a>
                  <button type="button" onClick={() => setVista('editorial')} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'editorial' ? 'text-neutral-950 font-bold border-b border-neutral-950' : ''}`}>Editorial</button>
                  <a href="#contacto" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">Contacto</a>
                </nav>

                <button
                  type="button"
                  onClick={() => setModalIngreso('intranet')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Intranet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalIngreso('cliente')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-900 border border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="hidden sm:inline">Portal</span> Clientes
                </button>

                <button
                  type="button"
                  onClick={() => setModalIngreso('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-950 hover:bg-black transition-all cursor-pointer shadow-2xs"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="hidden md:inline">Consola</span> Admin
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {usuarioSesion?.rol === 'admin' && (
                  <button
                    type="button"
                    onClick={() => setVista('admin-console')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${vista === 'admin-console' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Consola CMS</span>
                  </button>
                )}

                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-semibold text-neutral-900">{usuarioSesion?.nombre}</span>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold">{usuarioSesion?.rol}</span>
                </div>

                <button
                  type="button"
                  onClick={() => { setUsuarioSesion(null); setVista('sitio-web'); }}
                  className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5 text-neutral-600" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* PORTADA PRINCIPAL */}
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

          {/* PROPÓSITO */}
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
                <p className="text-xs sm:text-sm text-neutral-600 font-light">
                  Trayectoria académica y práctica de litigio en las judicaturas del Ecuador.
                </p>
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

          {/* PRÁCTICAS */}
          <section id="practica" className="py-20 md:py-28 border-b border-neutral-200 bg-neutral-50/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="max-w-xl mb-14 space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                  Áreas de Ejercicio
                </span>
                <h2 className="text-3xl font-serif font-bold text-neutral-950">
                  Patrocinio de Alta Complejidad
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Shield className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Litigio Penal & Delitos Económicos</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Defensa y acusación particular en delitos contra la administración pública, lavado de activos y defraudación societaria.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <FileText className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Derecho Civil</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Prescripción extraordinaria de dominio, saneamiento predial, contratos de trascendencia patrimonial y acciones ordinarias.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Scale className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Derecho Societario & Mercantil</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Conflictos entre accionistas, disolución judicial, impugnación de asambleas y litigios contractuales complejos.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <HeartHandshake className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Derecho de Menores y Menores Infractores</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Defensa técnica especializada en juzgados de la niñez, adolescencia y medidas socioeducativas en materia penal juvenil.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <UserCheck className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Prevención en Violencia de Género</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Patrocinio, medidas de protección inmediatas y protocolos institucionales de prevención de violencia de género.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Landmark className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Contencioso Administrativo & Tributario</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Impugnación de resoluciones administrativas, defensas ante la Contraloría General del Estado y litigios tributarios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EDITORIAL PREVIEW */}
          <section id="editorial-preview" className="py-20 md:py-28 border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Criterios jurídicos
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-neutral-950 mt-1">
                    Publicaciones Recientes
                  </h2>
                </div>
                
                <button
                  type="button"
                  onClick={() => setVista('editorial')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0"
                >
                  <span>Ir a Editorial Completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articulos.slice(0, 3).map(art => (
                  <article key={art.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
                    <span className="text-[10px] font-mono text-neutral-400">{art.fecha} • {art.categoria}</span>
                    <h4 className="font-serif font-bold text-base text-neutral-950">{art.titulo}</h4>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed">{art.resumen}</p>
                  </article>
                ))}
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

      {/* VISTA INTRANET MODULAR */}
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

      {/* VISTA CONSOLA CMS ADMINISTRADOR */}
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

      {/* VISTA PORTAL DE CLIENTES (DIRECTA EN SATJE BUSQUEDA) */}
      {vista === 'cliente' && usuarioSesion?.rol === 'cliente' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* CABECERA CON BIENVENIDA Y SATJE BUSQUEDA */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700"/>
                <span>Portal del Cliente • Código Confidencial: {usuarioSesion.codigoCliente}</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-neutral-950">
                Bienvenido/a, <span className="underline decoration-neutral-300">{usuarioSesion.nombre}</span>
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Plataforma de seguimiento en vivo de causas judiciales y estado de cuenta patrocinado por ACTIO LEGIS.
              </p>
            </div>

            <a 
              href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#281F26] hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-xs"
            >
              <Scale className="w-4 h-4 text-neutral-300"/>
              <span>Consultar Causa en SATJE</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400"/>
            </a>
          </div>

          {/* CUERPO PRINCIPAL DEL PORTAL */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                  Causas Patrocinadas ({expedientes.length})
                </span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  En Trámite
                </span>
              </div>

              <div className="space-y-2">
                {expedientes.map((caso) => {
                  const esSeleccionado = caso.id === casoClienteActivo.id;
                  return (
                    <div 
                      key={caso.id} 
                      onClick={() => setCausaSeleccionadaId(caso.id)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        esSeleccionado 
                          ? 'border-neutral-950 bg-[#FAF9F6] shadow-2xs font-semibold' 
                          : 'border-neutral-200 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 mb-1">
                        <span>Juicio No: {caso.numProceso}</span>
                        <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${esSeleccionado ? 'rotate-90 text-neutral-950' : ''}`} />
                      </div>
                      <div className="font-serif font-bold text-neutral-950 text-xs leading-snug line-clamp-2">
                        {caso.tipoProceso}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TARJETA 1 */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
                <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                      Proceso Judicial Seleccionado
                    </span>
                    <h2 className="text-xl font-serif font-bold text-neutral-950">
                      {casoClienteActivo?.tipoProceso}
                    </h2>
                    <span className="text-xs font-mono text-neutral-600 block mt-1">
                      Causa Judicial No: <strong>{casoClienteActivo?.numProceso}</strong>
                    </span>
                  </div>

                  <a 
                    href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-semibold rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-all cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5 text-neutral-600"/>
                    <span>Ver Movimientos SATJE</span>
                    <ExternalLink className="w-3 h-3 text-neutral-500"/>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-700">
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Etapa Procesal Actual:</span>
                    <strong className="text-neutral-950 font-serif text-sm block">{casoClienteActivo?.etapaProcesalActual}</strong>
                  </div>

                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Próxima Fecha Clave:</span>
                    <strong className="text-neutral-950 font-mono text-sm block">{casoClienteActivo?.proximaFechaClave}</strong>
                  </div>
                </div>
              </div>

              {/* TARJETA 2 */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-5">
                <div className="border-b border-neutral-200 pb-2">
                  <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-neutral-900"/>
                    <span>Estado Financiero & Reembolso de Gastos</span>
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">
                    Transparencia de valores convenidos, cancelados y gastos operacionales abonados.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-700 font-bold">Honorarios Profesionales Convenidos:</span>
                      <span className="text-neutral-950 font-bold">${honorariosPagados} / ${honorariosTotales} USD ({porcentajeHonorarios}%)</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                      <div 
                        className="h-full bg-neutral-950 rounded-full transition-all duration-700" 
                        style={{ width: `${porcentajeHonorarios}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-700 font-bold">Gastos Operacionales & Peritajes:</span>
                      <span className="text-emerald-900 font-bold">${gastosCubiertos} / ${gastosTotales} USD ({porcentajeGastos}%)</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                      <div 
                        className="h-full bg-emerald-700 rounded-full transition-all duration-700" 
                        style={{ width: `${porcentajeGastos}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* TARJETA 3 */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
                <div className="border-b border-neutral-200 pb-2 flex justify-between items-center">
                  <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-neutral-900"/>
                    <span>Línea de Tiempo Procesal</span>
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Resumen Ejecutivo</span>
                </div>

                <div className="space-y-3">
                  {casoClienteActivo?.actuaciones && casoClienteActivo.actuaciones.length > 0 ? (
                    casoClienteActivo.actuaciones.map((act) => (
                      <div key={act.id} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200 space-y-1 text-xs">
                        <div className="flex justify-between items-center font-mono text-[11px] text-neutral-500">
                          <strong className="text-neutral-950 font-serif text-sm">{act.titulo}</strong>
                          <span>{act.fecha}</span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed font-sans mt-1">
                          {act.resumenParaCliente}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center font-mono text-xs text-neutral-400 bg-[#FAF9F6] rounded-xl border border-neutral-200">
                      No existen actuaciones procesales registradas recientemente para este expediente.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VISTA EDITORIAL PÚBLICA */}
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

      {/* VISTA EQUIPO DE ABOGADOS */}
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

      {/* FOOTER */}
      <footer className="bg-white text-neutral-900 border-t border-neutral-200 py-16 px-6 text-xs font-sans">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            <div className="space-y-4 md:col-span-1">
              <img 
                src="/logo-estudio.png" 
                alt="ACTIO LEGIS Consultores Jurídicos" 
                className="h-24 w-auto object-contain mix-blend-multiply cursor-pointer"
                onClick={() => setVista('sitio-web')}
              />
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                Estudio Jurídico en Guayaquil. Litigio penal y civil estratégicos, rigor procesal y asesoría corporativa.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Nuestra página
              </h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li>
                  <a 
                    href="#proposito" 
                    onClick={() => setVista('sitio-web')} 
                    className="hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    Propósito & Manifiesto
                  </a>
                </li>
                <li>
                  <a 
                    href="#socios" 
                    onClick={() => setVista('sitio-web')} 
                    className="hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    Quiénes somos
                  </a>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setVista('editorial')} 
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Editorial Jurídica ACTIO LEGIS
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Enlaces de interés
              </h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li>
                  <button 
                    type="button" 
                    onClick={() => setModalIngreso('intranet')} 
                    className="hover:text-neutral-950 transition-colors text-left font-medium text-neutral-900 cursor-pointer"
                  >
                    Intranet Abogados
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setModalIngreso('cliente')} 
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Portal Clientes
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => setModalIngreso('admin')} 
                    className="hover:text-neutral-950 transition-colors text-left font-bold text-neutral-950 cursor-pointer"
                  >
                    Consola Administrador
                  </button>
                </li>
                <li>
                  <a 
                    href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-neutral-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Función Judicial SATJE</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Sede Guayaquil
              </h4>
              <div className="space-y-2 text-neutral-500 text-xs font-light">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span className="font-medium text-neutral-800 font-mono">+593 4 6005080</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span>info@actiolegisec.com</span>
                </div>
                <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                  Kennedy Norte, Alfonso Ortiz y José Castillo. Edificio Kennedy Office Center, piso 3, oficina 2.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
            <p>© {new Date().getFullYear()} ACTIO LEGIS. Todos los derechos reservados. Guayaquil, Ecuador.</p>
            <button 
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-neutral-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Subir al inicio</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL LOGIN */}
      <LoginModal 
        modalIngreso={modalIngreso}
        onClose={() => setModalIngreso(null)}
        usuariosSistema={usuariosSistema}
        onLoginExitoso={handleLoginExitoso}
      />

    </div>
  );
}
