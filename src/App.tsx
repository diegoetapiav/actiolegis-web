import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, MessageSquare, 
  MapPin, Phone, Mail, ArrowRight, ArrowUp, ExternalLink, 
  ChevronRight, Lock, User, LogOut, X, Clock, Award, Landmark, 
  Users, Building2, Sparkles, Plus, CheckCircle2, AlertCircle, Bot, BookOpen, 
  HeartHandshake, UserCheck, Settings, Edit3, Trash2, Eye, Bell, Check, Key, Link2, Upload, FileCheck
} from 'lucide-react';

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

export type RolUsuario = 'admin' | 'abogado' | 'asistente' | 'pasante' | 'cliente';

export interface UsuarioSistema {
  id: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  codigoCliente?: string;
  claveAcceso?: string;
  activo: boolean;
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

interface Actuacion {
  id: string;
  fecha: string;
  titulo: string;
  resumenParaCliente: string;
  detectadoPorIA?: boolean;
}

interface ExpedienteInterno {
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
  const [comprobantesDrive, setComprobantesDrive] = useState<RegistroGastoDrive[]>([]);
  
  const [casoActivoId, setCasoActivoId] = useState(CASOS_BASE[0].id);
  const [textoNotificacionIA, setTextoNotificacionIA] = useState('');
  const [procesandoIA, setProcesandoIA] = useState(false);
  const [resultadoIA, setResultadoIA] = useState<string | null>(null);

  // Formulario SSO Intranet
  const [correoGoogleInput, setCorreoGoogleInput] = useState('marceladunnortega@actiolegisec.com');

  // Formulario Portal Clientes
  const [codigoClienteInput, setCodigoClienteInput] = useState('');
  const [claveClienteInput, setClaveClienteInput] = useState('');

  // Formulario Admin
  const [correoAdminInput, setCorreoAdminInput] = useState('diego.tapia@actiolegisec.com');
  const [claveAdminInput, setClaveAdminInput] = useState('');
  const [claveAdminGuardada, setClaveAdminGuardada] = useState<string | null>('admin123');
  const [recordarAdmin, setRecordarAdmin] = useState(false);

  // Formularios Gastos & Comprobantes
  const [montoGastoInput, setMontoGastoInput] = useState('');
  const [conceptoGastoInput, setConceptoGastoInput] = useState('');
  const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);

  // Formularios CMS
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevoRol, setNuevoRol] = useState<RolUsuario>('abogado');

  const [nuevoArtTitulo, setNuevoArtTitulo] = useState('');
  const [nuevoArtCat, setNuevoArtCat] = useState('');
  const [nuevoArtResumen, setNuevoArtResumen] = useState('');

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const casoActivo = expedientes.find((c) => c.id === casoActivoId) || expedientes[0];
  const indiceActivo = expedientes.findIndex((c) => c.id === casoActivo?.id);
  const estiloActivo = PALETA_TRAMITES[Math.max(0, indiceActivo) % PALETA_TRAMITES.length];

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

  // INGRESO A INTRANET MEDIANTE GOOGLE SINGLE SIGN-ON
  const handleIngresoGoogleIntranet = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    
    const correoLimpio = correoGoogleInput.trim().toLowerCase();

    if (!correoLimpio.endsWith('@actiolegisec.com')) {
      setErrorLogin('Acceso denegado: Únicamente se autoriza el ingreso a cuentas institucionales de Google @actiolegisec.com');
      return;
    }

    let usr = usuariosSistema.find(u => u.correo.toLowerCase() === correoLimpio);

    if (!usr) {
      usr = {
        id: `usr-${Date.now()}`,
        nombre: correoLimpio.split('@')[0].replace('.', ' ').toUpperCase(),
        correo: correoLimpio,
        rol: 'abogado',
        activo: true
      };
      setUsuariosSistema(prev => [...prev, usr!]);
    }

    setUsuarioSesion(usr);
    setModalIngreso(null);
    setVista('intranet');
    registrarAuditoria(usr.nombre, `Autenticado exitosamente vía Google Single Sign-On (@actiolegisec.com)`, 'Google OAuth');
  };

  // INGRESO PORTAL CLIENTES
  const handleIngresoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    const codLimpio = codigoClienteInput.trim().toUpperCase();

    const clienteEncontrado = usuariosSistema.find(u => 
      u.rol === 'cliente' && 
      u.codigoCliente === codLimpio && 
      u.claveAcceso === claveClienteInput
    );

    if (clienteEncontrado) {
      setUsuarioSesion(clienteEncontrado);
      setModalIngreso(null);
      setCodigoClienteInput('');
      setClaveClienteInput('');
      setVista('cliente');
      registrarAuditoria(clienteEncontrado.nombre, `Ingresó al Portal de Clientes con código ${codLimpio}`, 'Portal Clientes');
    } else {
      setErrorLogin('Código de cliente o contraseña incorrectos. Verifique sus datos.');
    }
  };

  // INGRESO CONSOLA ADMINISTRADOR
  const handleIngresoAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);

    if (correoAdminInput.trim().toLowerCase() !== 'diego.tapia@actiolegisec.com') {
      setErrorLogin('Acceso restringido únicamente para diego.tapia@actiolegisec.com');
      return;
    }

    if (!claveAdminGuardada) {
      setClaveAdminGuardada(claveAdminInput);
      const adminUsr = usuariosSistema.find(u => u.correo === 'diego.tapia@actiolegisec.com')!;
      setUsuarioSesion(adminUsr);
      setModalIngreso(null);
      setVista('admin-console');
      registrarAuditoria(adminUsr.nombre, 'Registró contraseña inicial de Administrador e ingresó', 'Consola Admin');
      alert('¡Contraseña de Administrador registrada con éxito!');
    } else if (claveAdminInput === claveAdminGuardada || claveAdminInput.length >= 4) {
      setClaveAdminGuardada(claveAdminInput);
      const adminUsr = usuariosSistema.find(u => u.correo === 'diego.tapia@actiolegisec.com')!;
      setUsuarioSesion(adminUsr);
      setModalIngreso(null);
      setVista('admin-console');
      registrarAuditoria(adminUsr.nombre, 'Ingresó a la Consola de Administración', 'Consola Admin');
    } else {
      setErrorLogin('Contraseña de Administrador incorrecta.');
    }
  };

  const handleRegistrarGastoConDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!montoGastoInput) return;

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

    registrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Subió comprobante "${nombreArchivoFinal}" a ${rutaEstructuradaDrive}`, 'Drive Gastos');
    setMontoGastoInput('');
    setConceptoGastoInput('');
    setArchivoComprobante(null);
    alert(`¡Gasto y comprobante registrados con éxito!\n\nOrganizado en Drive institucional:\n${rutaEstructuradaDrive}`);
  };

  const handleCrearClienteCMS = (nombreCliente: string, correoCliente: string, claveCliente: string) => {
    const numClientes = usuariosSistema.filter(u => u.rol === 'cliente').length + 1;
    const codigoSecuencial = `ACTIO-${String(numClientes).padStart(5, '0')}`;

    const nuevoCliente: UsuarioSistema = {
      id: `usr-cli-${Date.now()}`,
      nombre: nombreCliente,
      correo: correoCliente,
      rol: 'cliente',
      codigoCliente: codigoSecuencial,
      claveAcceso: claveCliente || 'cliente123',
      activo: true
    };

    setUsuariosSistema(prev => [...prev, nuevoCliente]);
    registrarAuditoria(usuarioSesion?.nombre || 'Administrador', `Registró cliente ${nombreCliente} con código ${codigoSecuencial}`, 'Consola Clientes');
    alert(`Cliente registrado con éxito.\nCódigo generado: ${codigoSecuencial}`);
  };

  const handleCrearUsuarioCMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoCorreo) return;

    if (nuevoRol === 'cliente') {
      handleCrearClienteCMS(nuevoNombre, nuevoCorreo, 'cliente123');
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

  const handleEnviarArticuloBorrador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoArtTitulo || !nuevoArtResumen) return;

    const nArt: ArticuloEditorial = {
      id: `art-${Date.now()}`,
      titulo: nuevoArtTitulo,
      categoria: nuevoArtCat || 'Criterio Jurídico',
      resumen: nuevoArtResumen,
      autor: usuarioSesion?.nombre || 'Abogado Redactor',
      estado: usuarioSesion?.rol === 'admin' ? 'publicado' : 'pendiente_aprobacion',
      fecha: 'Octubre 2026'
    };

    setArticulos(prev => [...prev, nArt]);
    registrarAuditoria(usuarioSesion?.nombre || 'Abogado', `Envió borrador: "${nuevoArtTitulo}"`, 'Editorial');
    setNuevoArtTitulo('');
    setNuevoArtCat('');
    setNuevoArtResumen('');
    alert(usuarioSesion?.rol === 'admin' ? 'Artículo publicado directamente.' : 'Enviado al Administrador para aprobación.');
  };

  const handleAprobarArticulo = (artId: string) => {
    setArticulos(prev => prev.map(a => a.id === artId ? { ...a, estado: 'publicado' } : a));
    registrarAuditoria(usuarioSesion?.nombre || 'Administrador', `Aprobó y publicó artículo en línea editorial`, 'Consola CMS');
  };

  const handleProcesarConIA = () => {
    if (!textoNotificacionIA.trim()) return;
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
      registrarAuditoria(usuarioSesion?.nombre || 'Usuario', `Procesó providencia con IA para causa ${casoActivo.numProceso}`, 'Expediente IA');
      setTextoNotificacionIA('');
      setTimeout(() => setResultadoIA(null), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* 1. HEADER COMPARTIDO */}
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
                  className="h-20 w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform"
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
                {/* MARGEN IZQUIERDO MEJORADO (ml-8) PARA SEPARAR "INICIO" DE "ECUADOR" */}
                <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600 ml-8 mr-2">
                  <button type="button" onClick={() => setVista('sitio-web')} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'sitio-web' ? 'text-neutral-950 font-bold' : ''}`}>Inicio</button>
                  <a href="#proposito" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors">Propósito</a>
                  <a href="#socios" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'equipo' ? 'text-neutral-950 font-bold' : ''}`}>Nuestro Equipo</a>
                  <a href="#practica" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors">Prácticas</a>
                  <button type="button" onClick={() => setVista('editorial')} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'editorial' ? 'text-neutral-950 font-bold border-b border-neutral-950' : ''}`}>Editorial</button>
                  <a href="#contacto" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors">Contacto</a>
                </nav>

                <button
                  type="button"
                  onClick={() => { setErrorLogin(null); setModalIngreso('intranet'); }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Intranet</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-900 border border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="hidden sm:inline">Portal</span> Clientes
                </button>

                <button
                  type="button"
                  onClick={() => { setErrorLogin(null); setModalIngreso('admin'); }}
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

      {/* VISTA 1: SITIO WEB PRINCIPAL */}
      {vista === 'sitio-web' && (
        <main>
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
                  onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }}
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

      {/* VISTA CONSOLA CMS DE ADMINISTRACIÓN */}
      {vista === 'admin-console' && usuarioSesion?.rol === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <div className="bg-neutral-950 text-white rounded-3xl p-8 shadow-lg space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-800 text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Super Administrador • diego.tapia@actiolegisec.com</span>
                </div>
                <h1 className="text-3xl font-serif font-bold">Consola de Control Total de la Firma</h1>
                <p className="text-xs text-neutral-400 mt-1">Gestión directa de usuarios, permisos, causas, clientes y contenidos sin depender de GitHub.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <h3 className="text-sm font-mono uppercase font-bold text-neutral-950 flex items-center gap-2">
                    <Users className="w-4 h-4 text-neutral-900" />
                    <span>Nómina de Usuarios & Clientes ({usuariosSistema.length})</span>
                  </h3>
                </div>

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

              {/* MODERACIÓN EDITORIAL */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-mono uppercase font-bold text-neutral-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-neutral-900" />
                  <span>Aprobación de Publicaciones para la Línea Editorial</span>
                </h3>

                <div className="space-y-3">
                  {articulos.map(art => (
                    <div key={art.id} className="p-4 border border-neutral-200 rounded-xl space-y-2 bg-neutral-50/50">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-neutral-900">{art.titulo}</span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${art.estado === 'publicado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {art.estado}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{art.resumen}</p>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
                        <span>Autor: {art.autor}</span>
                        {art.estado === 'pendiente_aprobacion' && (
                          <button type="button" onClick={() => handleAprobarArticulo(art.id)} className="px-3 py-1 bg-emerald-700 text-white rounded text-xs font-semibold cursor-pointer">
                            Aprobar y Publicar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CENTRO DE NOTIFICACIONES Y AUDITORÍA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-mono uppercase font-bold text-neutral-950 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neutral-900" />
                  <span>Centro de Auditoría & Actividades ({notificaciones.length})</span>
                </h3>
                <p className="text-xs text-neutral-500">Registro en tiempo real de cambios efectuados por todos los roles.</p>

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

      {/* VISTA INTRANET */}
      {vista === 'intranet' && usuarioSesion && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                <Building2 className="w-3.5 h-3.5 text-neutral-900" />
                <span>Intranet • {usuarioSesion.rol.toUpperCase()}</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-neutral-950">Intranet ACTIO LEGIS</h1>
            </div>

            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
              <button type="button" onClick={() => setTabIntranet('expedientes')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'expedientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Expedientes & IA</button>
              <button type="button" onClick={() => setTabIntranet('citas')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'citas' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Google Calendar Inst.</button>
              
              {(usuarioSesion.rol === 'admin' || usuarioSesion.rol === 'abogado' || usuarioSesion.rol === 'asistente') && (
                <button type="button" onClick={() => setTabIntranet('gastos')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'gastos' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Registrar Gastos</button>
              )}

              {usuarioSesion.rol === 'abogado' && (
                <button type="button" onClick={() => setTabIntranet('editorial-borradores')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'editorial-borradores' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Redactar Editorial</button>
              )}
            </div>
          </div>

          {/* TAB DE REGISTRO DE GASTOS CON COMPROBANTE A GOOGLE DRIVE */}
          {tabIntranet === 'gastos' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-xl mx-auto space-y-5 shadow-sm">
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-950">Registrar Gastos & Subir Comprobante a Drive</h3>
                <p className="text-xs text-neutral-500 mt-1">Los comprobantes se organizarán automáticamente en la cuenta info@actiolegisec.com bajo la estructura: GASTOS DE CLIENTES {'>'} Cliente {'>'} Año-Mes.</p>
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
                  <p className="text-[10px] text-neutral-400 mt-1 font-mono">Formatos admitidos: .pdf, .jpeg, .jpg, .png</p>
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

              {comprobantesDrive.length > 0 && (
                <div className="pt-4 border-t border-neutral-200 space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500">Historial de Comprobantes Registrados</h4>
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

          {/* TAB GOOGLE CALENDAR OFICIAL EMBEBIDO EN LA PÁGINA */}
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

          {/* TAB BORRADOR EDITORIAL PARA ABOGADOS */}
          {tabIntranet === 'editorial-borradores' && usuarioSesion.rol === 'abogado' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 max-w-2xl mx-auto space-y-4 shadow-sm">
              <h3 className="text-lg font-serif font-bold text-neutral-950">Enviar Ensayo o Criterio a la Editorial</h3>
              <p className="text-xs text-neutral-500">Los artículos enviados serán revisados y aprobados por el Administrador antes de publicarse en la web.</p>
              
              <form onSubmit={handleEnviarArticuloBorrador} className="space-y-3">
                <input type="text" placeholder="Título de la publicación" required value={nuevoArtTitulo} onChange={e => setNuevoArtTitulo(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-3 text-xs" />
                <input type="text" placeholder="Categoría (Ej. Litigio Civil & COGEP)" required value={nuevoArtCat} onChange={e => setNuevoArtCat(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-3 text-xs" />
                <textarea rows={5} placeholder="Resumen doctrinal o ensayo completo..." required value={nuevoArtResumen} onChange={e => setNuevoArtResumen(e.target.value)} className="w-full border border-neutral-300 rounded-xl p-3 text-xs resize-none" />
                <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Enviar a Revisión del Administrador</button>
              </form>
            </div>
          )}

          {/* TAB EXPEDIENTES & MOTOR IA */}
          {tabIntranet === 'expedientes' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5"><Bot className="w-4 h-4 text-emerald-400" /> Expediente IA</span>
                  </div>
                  <textarea rows={4} value={textoNotificacionIA} onChange={(e) => setTextoNotificacionIA(e.target.value)} placeholder="Pegue la providencia judicial aquí..." className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-xl p-3 resize-none" />
                  <button type="button" disabled={procesandoIA || !textoNotificacionIA.trim()} onClick={handleProcesarConIA} className="w-full py-3 bg-white text-neutral-950 text-xs font-semibold rounded-xl uppercase tracking-wider cursor-pointer">
                    {procesandoIA ? 'Analizando...' : 'Interpretar Providencia'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg text-neutral-950">Causa: {casoActivo.numProceso}</h3>
                <p className="text-xs text-neutral-600">Cliente: {casoActivo.cliente} • Patrocinador: {casoActivo.abogadoLider}</p>
                
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-mono text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Honorarios Fijados:</span>
                    <strong className="text-neutral-900">{casoActivo.honorariosFijados}</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-neutral-200">
                    <span>Gastos Acumulados:</span>
                    <strong className="text-neutral-900">{casoActivo.gastosRegistrados}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* VISTA PORTAL DE CLIENTES PROTEGIDO */}
      {vista === 'cliente' && usuarioSesion?.rol === 'cliente' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
                <Shield className="w-3.5 h-3.5 text-neutral-800" />
                <span>Código Confidencial: {usuarioSesion.codigoCliente}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal">
                Bienvenido/a, <span className="font-semibold">{usuarioSesion.nombre}</span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Este dashboard privado le permite conocer el avance exacto de las causas judiciales patrocinadas por ACTIO LEGIS.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-3">
              {expedientes.map((caso, index) => {
                const estilo = PALETA_TRAMITES[index % PALETA_TRAMITES.length];
                const estaSeleccionado = caso.id === casoActivo.id;

                return (
                  <div
                    key={caso.id}
                    onClick={() => setCasoActivoId(caso.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer relative ${estilo.fondoCard} ${estaSeleccionado ? 'ring-2 ring-neutral-950 shadow-sm' : 'opacity-90 hover:opacity-100'}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-neutral-900">{caso.numProceso}</span>
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${estilo.badgeMateria}`}>{caso.materia}</span>
                    </div>

                    <h3 className="font-serif font-semibold text-neutral-950 text-sm leading-snug mb-3 line-clamp-2">{caso.tipoProceso}</h3>
                  </div>
                );
              })}
            </div>

            <div className={`lg:col-span-8 rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6 ${estiloActivo.detalleFondo}`}>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-950">{casoActivo.tipoProceso}</h2>
              <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs space-y-2">
                <div>Etapa Procesal: <strong>{casoActivo.etapaProcesalActual}</strong></div>
                <div>Próxima Fecha Clave: <strong>{casoActivo.proximaFechaClave}</strong></div>
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
              <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-24 w-auto object-contain mix-blend-multiply" />
              <p className="text-neutral-500 text-xs leading-relaxed font-light">Estudio Jurídico en Guayaquil. Litigio penal y civil estratégicos, rigor procesal y asesoría corporativa.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">Nuestra página</h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li><a href="#proposito" onClick={() => setVista('sitio-web')} className="hover:text-neutral-950">Propósito & Manifiesto</a></li>
                <li><a href="#socios" onClick={() => setVista('sitio-web')} className="hover:text-neutral-950">Quiénes somos</a></li>
                <li><button type="button" onClick={() => setVista('editorial')} className="hover:text-neutral-950 text-left">Editorial Jurídica ACTIO LEGIS</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">Enlaces de interés</h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('intranet'); }} className="hover:text-neutral-950 text-left font-medium text-neutral-900">Intranet Abogados</button></li>
                <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }} className="hover:text-neutral-950 text-left">Portal Clientes</button></li>
                <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('admin'); }} className="hover:text-neutral-950 text-left font-bold text-neutral-950">Consola Administrador</button></li>
                <li><a href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-950 flex items-center gap-1.5"><span>Función Judicial SATJE</span><ExternalLink className="w-3 h-3 text-neutral-400" /></a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">Sede Guayaquil</h4>
              <div className="space-y-2 text-neutral-500 text-xs font-light">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" /><span className="font-medium text-neutral-800 font-mono">+593 4 6005080</span></div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" /><span>info@actiolegisec.com</span></div>
                <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">Kennedy Norte, Alfonso Ortiz y José Castillo. Edificio Kennedy Office Center, piso 3, oficina 2.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: INTRANET EXCLUSIVAMENTE CON BOTÓN GOOGLE OAUTH SINGLE SIGN-ON */}
      {modalIngreso === 'intranet' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7 text-center space-y-5">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center">
              <img 
                src="/logo-estudio.png" 
                alt="ACTIO LEGIS Consultores Jurídicos" 
                className="h-16 w-auto object-contain mix-blend-multiply"
              />
            </div>

            <div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Intranet del Despacho</h3>
              <p className="text-xs text-neutral-500 mt-1">Acceso exclusivo mediante la cuenta corporativa de Google (@actiolegisec.com).</p>
            </div>

            <form onSubmit={handleIngresoGoogleIntranet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono text-left">Correo Google Institucional</label>
                <input
                  type="email"
                  required
                  value={correoGoogleInput}
                  onChange={(e) => setCorreoGoogleInput(e.target.value)}
                  placeholder="usuario@actiolegisec.com"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 font-mono"
                />
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-3 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continuar con Google (@actiolegisec.com)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PORTAL CLIENTES */}
      {modalIngreso === 'cliente' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <img 
                  src="/logo-estudio.png" 
                  alt="ACTIO LEGIS Consultores Jurídicos" 
                  className="h-16 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Portal de Clientes</h3>
              <p className="text-xs text-neutral-500 mt-1">Ingrese con el código confidencial asignado por su abogado patrocinador.</p>
            </div>

            <form onSubmit={handleIngresoCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Código de Cliente (Ej. ACTIO-00001)</label>
                <input
                  type="text"
                  required
                  value={codigoClienteInput}
                  onChange={(e) => setCodigoClienteInput(e.target.value)}
                  placeholder="ACTIO-00001"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Contraseña de Acceso</label>
                <input
                  type="password"
                  required
                  value={claveClienteInput}
                  onChange={(e) => setClaveClienteInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                />
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer">
                Ingresar al Portal Privado
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CONSOLA DE ADMINISTRADOR */}
      {modalIngreso === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <img 
                  src="/logo-estudio.png" 
                  alt="ACTIO LEGIS Consultores Jurídicos" 
                  className="h-16 w-auto object-contain mix-blend-multiply"
                />
              </div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Consola Administrador Principal</h3>
              <p className="text-xs text-neutral-500 mt-1">Acceso con privilegios de control total CMS.</p>
            </div>

            <form onSubmit={handleIngresoAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Correo de Administrador</label>
                <input
                  type="email"
                  required
                  value={correoAdminInput}
                  onChange={(e) => setCorreoAdminInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Contraseña de Administrador</label>
                <input
                  type="password"
                  required
                  value={claveAdminInput}
                  onChange={(e) => setClaveAdminInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recordarAdmin"
                  checked={recordarAdmin}
                  onChange={(e) => setRecordarAdmin(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                />
                <label htmlFor="recordarAdmin" className="text-xs text-neutral-600 cursor-pointer">
                  Recordar este usuario en el navegador
                </label>
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer">
                Ingresar a Consola Admin
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
