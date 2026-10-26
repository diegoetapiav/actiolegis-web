import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, MessageSquare, 
  MapPin, Phone, Mail, ArrowRight, ArrowUp, ExternalLink, 
  ChevronRight, Lock, User, LogOut, X, Clock, Award, Landmark, 
  Users, Building2, Sparkles, Plus, CheckCircle2, AlertCircle, Bot
} from 'lucide-react';

// Paleta suave aprobada para el portal de clientes
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
  actuaciones: Actuacion[];
}

const CASOS_BASE: ExpedienteInterno[] = [
  {
    id: 'exp-1',
    numProceso: '17230-2024-00482',
    materia: 'CIVIL Y MERCANTIL',
    tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
    cliente: 'Inmobiliaria del Valle S.A.S.',
    contraparte: 'Herederos de Juan Carlos Peñaherrera y Otros',
    unidadJudicial: 'Unidad Judicial Civil de Guayaquil',
    abogadoLider: 'Dr. Diego Tapia',
    etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
    porcentaje: 65,
    proximaFechaClave: '2026-10-18',
    proximasAcciones: 'Entrega de informe pericial técnico y preparación de alegatos orales.',
    actuaciones: [
      {
        id: 'act-1',
        fecha: '2026-10-08 11:20',
        titulo: 'Concesión de término fatal para informe pericial',
        resumenParaCliente: 'El Juez ordenó al perito técnico la entrega formal de la planimetría del terreno en 10 días para continuar a juicio.',
        detectadoPorIA: false
      },
      {
        id: 'act-2',
        fecha: '2026-09-14 09:15',
        titulo: 'Calificación de la demanda y auto de sustanciación',
        resumenParaCliente: 'La demanda cumplió formalidades legales y el juzgado ordenó citar a los demandados.',
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
    abogadoLider: 'Dr. Diego Tapia & Marcela Dunn',
    etapaProcesalActual: 'Calificación & Diligencias Previas',
    porcentaje: 35,
    proximaFechaClave: '2026-11-05',
    proximasAcciones: 'Revisión y descargo de peritaje contable en sede fiscal.',
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

export default function App() {
  const [vista, setVista] = useState<'sitio-web' | 'cliente' | 'intranet'>('sitio-web');
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'honorarios'>('expedientes');
  const [modalLogin, setModalLogin] = useState(false);
  const [rolLogin, setRolLogin] = useState<'cliente' | 'estudio'>('cliente');
  
  const [expedientes, setExpedientes] = useState<ExpedienteInterno[]>(CASOS_BASE);
  const [casoActivoId, setCasoActivoId] = useState(CASOS_BASE[0].id);
  
  // Estados para el Módulo de Notificaciones IA
  const [textoNotificacionIA, setTextoNotificacionIA] = useState('');
  const [procesandoIA, setProcesandoIA] = useState(false);
  const [resultadoIA, setResultadoIA] = useState<string | null>(null);

  // Estados Formulario de Login
  const [inputUser, setInputUser] = useState('');
  const [inputPass, setInputPass] = useState('');

  const casoActivo = expedientes.find((c) => c.id === casoActivoId) || expedientes[0];
  const indiceActivo = expedientes.findIndex((c) => c.id === casoActivo?.id);
  const estiloActivo = PALETA_TRAMITES[Math.max(0, indiceActivo) % PALETA_TRAMITES.length];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLogin(false);
    if (rolLogin === 'cliente') {
      setVista('cliente');
    } else {
      setVista('intranet');
      setTabIntranet('expedientes');
    }
  };

  // Motor del Expediente IA: analiza el texto pegado del SATJE o Fiscalía
  const handleProcesarConIA = () => {
    if (!textoNotificacionIA.trim()) return;
    setProcesandoIA(true);

    setTimeout(() => {
      // Detección heurística de patrones jurídicos en Ecuador
      const texto = textoNotificacionIA;
      let tituloDetectado = 'Providencia Judicial Notificada';
      let resumenGenerado = 'Se agrega al expediente la providencia emitida por el juzgador para conocimiento de las partes.';
      let proximaFecha = '2026-11-12';

      if (texto.toLowerCase().includes('audiencia')) {
        tituloDetectado = 'Convocatoria a Audiencia de Juicio';
        resumenGenerado = 'El tribunal ha fijado día y hora para la instalación de la audiencia. Se requiere comparecencia de la defensa técnica.';
        proximaFecha = '2026-11-20';
      } else if (texto.toLowerCase().includes('perit') || texto.toLowerCase().includes('informe')) {
        tituloDetectado = 'Disposición de Informe Pericial Técnico';
        resumenGenerado = 'El juzgador otorga término fatal para la presentación del informe pericial y observaciones técnicas.';
        proximaFecha = '2026-11-10';
      } else if (texto.toLowerCase().includes('sentencia') || texto.toLowerCase().includes('resoluci')) {
        tituloDetectado = 'Emisión de Sentencia / Resolución';
        resumenGenerado = 'El juzgado emite resolución de mérito. Se inicia el cómputo de términos para recursos procesales.';
      }

      const nuevaActuacion: Actuacion = {
        id: `act-${Date.now()}`,
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        titulo: tituloDetectado,
        resumenParaCliente: resumenGenerado,
        detectadoPorIA: true
      };

      // Actualizar el expediente activo con la nueva providencia y fecha
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
      setResultadoIA(`¡Notificación interpretada con éxito! Se agendó automáticamente: "${tituloDetectado}" para la causa ${casoActivo.numProceso}.`);
      setTextoNotificacionIA('');
      setTimeout(() => setResultadoIA(null), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* 1. HEADER EDITORIAL (CON BOTONES DE PORTAL E INTRANET) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGOTIPO CON SLOGAN DESPEGADO DE LA PLACA */}
          <div 
            onClick={() => setVista('sitio-web')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="flex flex-col items-start pb-0.5">
              <div className="relative inline-block py-0.5">
                <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                  <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">ACTIO</span>
                  <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">LEGIS</span>
                </div>
              </div>
              
              <span className="text-[7.5px] uppercase tracking-[0.28em] text-neutral-500 font-mono mt-2.5 font-semibold">
                en servicio del derecho
              </span>
            </div>

            <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
              <span className="font-serif text-xs font-bold tracking-tight text-neutral-950">
                Estudio Jurídico & Litigio
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                Guayaquil • Ecuador
              </span>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          {vista === 'sitio-web' ? (
            <div className="flex items-center gap-3 sm:gap-5">
              <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600">
                <a href="#proposito" className="hover:text-neutral-950 transition-colors">Propósito</a>
                <a href="#socios" className="hover:text-neutral-950 transition-colors">Socios</a>
                <a href="#practica" className="hover:text-neutral-950 transition-colors">Prácticas</a>
                <a href="#editorial" className="hover:text-neutral-950 transition-colors">Editorial</a>
                <a href="#contacto" className="hover:text-neutral-950 transition-colors">Contacto</a>
              </nav>

              <button
                type="button"
                onClick={() => { setRolLogin('cliente'); setModalLogin(true); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Portal</span> Clientes
              </button>

              <button
                type="button"
                onClick={() => { setRolLogin('estudio'); setModalLogin(true); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Intranet</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                <span>Agendar Cita</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVista('sitio-web')}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Volver al Sitio Web</span>
              </button>
              <button
                type="button"
                onClick={() => setVista('sitio-web')}
                className="p-2 sm:px-3.5 sm:py-2 bg-neutral-950 hover:bg-black text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-neutral-300" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          )}

        </div>
      </header>

      {/* =========================================================
          VISTA 1: SITIO WEB PÚBLICO
         ========================================================= */}
      {vista === 'sitio-web' && (
        <main>
          {/* HERO CENTRADO */}
          <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 border-b border-neutral-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-50 border border-neutral-200 shadow-2xs text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-8 mx-auto">
                <span className="w-2 h-2 rounded-full bg-neutral-950" />
                <span>Firma Forense Boutique • Guayaquil, Ecuador</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-neutral-950 tracking-tight leading-[1.15] font-normal max-w-3xl mx-auto">
                Rigor técnico, litigio estratégico y defensa <span className="italic font-normal">en servicio del derecho.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mt-6">
                ACTIO LEGIS consolida una práctica forense de alta exigencia procesal, patrocinando causas penales de complejidad, civiles y controversias societarias bajo estándares de estricta reserva y ética profesional.
              </p>

              {/* Botones Centrados */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('contacto');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Agendar Consulta Confidencial</span>
                  <ArrowRight className="w-4 h-4 text-neutral-300" />
                </button>

                <button
                  type="button"
                  onClick={() => { setRolLogin('cliente'); setModalLogin(true); }}
                  className="px-7 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Portal de Clientes</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

            </div>
          </section>

          {/* PROPÓSITO */}
          <section id="proposito" className="py-20 md:py-28 border-b border-neutral-200 bg-neutral-50/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Filosofía de Litigio
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 leading-tight">
                    No ejercemos el derecho en masa. Asumimos causas con compromiso de fondo.
                  </h2>
                </div>
                <div className="md:col-span-8 space-y-6 text-sm text-neutral-600 font-light leading-relaxed">
                  <p>
                    En un entorno forense sobrecargado por trámites delegados, ACTIO LEGIS ejerce el patrocinio con la devoción técnica que amerita: cada proceso es dirigido personalmente por sus socios directores, formulando teorías del caso sostenidas en dogmática penal sólida y recopilación probatoria rigurosa.
                  </p>
                  <p>
                    Nuestra premisa es la transparencia procesal: información en tiempo real sin tecnicismos engañosos, análisis honesto de probabilidades procesales y una defensa técnica inquebrantable en estrados judiciales y tribunales arbitrales.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SOCIOS */}
          <section id="socios" className="py-20 md:py-28 border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                  Socios Directores
                </span>
                <h2 className="text-3xl font-serif font-bold text-neutral-950">
                  Liderazgo Forense & Criterio Jurídico
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-light">
                  Trayectoria académica y práctica de litigio penal estratégico en las judicaturas del Ecuador.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Socio Principal</span>
                    <h3 className="text-2xl font-serif font-bold text-neutral-950">Dr. Diego Tapia</h3>
                    <p className="text-xs font-mono text-neutral-500">Litigio Penal Estratégico & Delitos Económicos</p>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    Abogado litigante con más de dos décadas de trayectoria en el patrocinio de causas penales complejas, defensa ante la Fiscalía General del Estado y diseño de estrategias de prevención de responsabilidad penal empresarial.
                  </p>
                  <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-mono">
                    contacto@actiolegisec.com • Guayaquil
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Socia Directora</span>
                    <h3 className="text-2xl font-serif font-bold text-neutral-950">Ab. Marcela Dunn</h3>
                    <p className="text-xs font-mono text-neutral-500">Derecho Corporativo, Cumplimiento & Litigio Civil</p>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    Especialista en estructuración fiduciaria, resolución prejudicial de controversias societarias y patrocinio judicial en litigios patrimoniales y mercantiles ante cortes provinciales y centros de arbitraje.
                  </p>
                  <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-mono">
                    mdunn@actiolegisec.com • Guayaquil
                  </div>
                </div>
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
                  <Scale className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Derecho Societario & Mercantil</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Conflictos entre accionistas, disolución judicial, impugnación de asambleas y litigios contractuales complejos.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Landmark className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Contencioso Administrativo & Tributario</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Impugnación de resoluciones administrativas, defensas ante la Contraloría General del Estado y litigios tributarios.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <FileText className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Litigio Civil & Bienes Inmuebles</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Prescripción extraordinaria de dominio, saneamiento de títulos prediales y controversias sobre derechos reales.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Users className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Arbitraje Comercial & Mediación</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Representación técnica ante las cámaras de comercio y centros de arbitraje de Guayaquil y Quito.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 bg-white space-y-3">
                  <Award className="w-5 h-5 text-neutral-950" />
                  <h4 className="font-serif font-bold text-base text-neutral-950">Compliance & Gestión Penal Preventiva</h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Manuales de cumplimiento, debida diligencia de contrapartes y mitigación de riesgo penal de la persona jurídica.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EDITORIAL */}
          <section id="editorial" className="py-20 md:py-28 border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Doctrina & Criterios
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-neutral-950 mt-1">
                    Editorial Jurídico ACTIO LEGIS
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 max-w-sm font-light">
                  Análisis sobre jurisprudencia vinculante de la Corte Nacional de Justicia y tendencias procesales en Ecuador.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
                  <span className="text-[10px] font-mono text-neutral-400">Octubre 2026 • Penal Económico</span>
                  <h4 className="font-serif font-bold text-base text-neutral-950">
                    La carga probatoria en peritajes contables durante la investigación previa
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Garantías constitucionales frente a requerimientos fiscales y límites a la autoincriminación tributaria.
                  </p>
                </article>

                <article className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
                  <span className="text-[10px] font-mono text-neutral-400">Septiembre 2026 • Litigio Civil</span>
                  <h4 className="font-serif font-bold text-base text-neutral-950">
                    Cómputo estricto de términos en citaciones por boletas fijadas
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Puntos críticos en el COGEP para evitar nulidades procesales en juicios ordinarios de prescripción predial.
                  </p>
                </article>

                <article className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-3">
                  <span className="text-[10px] font-mono text-neutral-400">Agosto 2026 • Societario</span>
                  <h4 className="font-serif font-bold text-base text-neutral-950">
                    Responsabilidad patrimonial de accionistas y administradores en S.A.S.
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Límites legales al levantamiento del velo societario frente a reclamaciones de terceros y acreedores.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* CONTACTO: DIRECCIÓN EXACTA KENNEDY NORTE */}
          <section id="contacto" className="py-20 md:py-24 bg-white border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold">
                    <Shield className="w-3.5 h-3.5 text-neutral-900" />
                    <span>Atención Confidencial</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-snug">
                    Confíe su causa a una defensa rigurosa.
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica en nuestras oficinas de Kennedy Norte, Guayaquil, o por vía telemática.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      alert('Para coordinar su cita en despacho, contáctenos al +593 (4) 6005080 o al correo info@actiolegisec.com');
                    }}
                    className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center cursor-pointer"
                  >
                    Solicitar Reunión en Despacho
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRolLogin('cliente'); setModalLogin(true); }}
                    className="px-5 py-3.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-2xs"
                  >
                    Portal Clientes
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-white text-neutral-900 border-t border-neutral-200 py-16 px-6 text-xs font-sans">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                
                {/* Columna 1 */}
                <div className="space-y-4 md:col-span-1">
                  <div className="flex flex-col items-start select-none py-1">
                    <div className="relative inline-block py-0.5">
                      <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
                      <div className="relative px-4 py-2 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                        <span className="font-black text-sm tracking-[0.18em] leading-tight font-sans">ACTIO</span>
                        <span className="font-black text-sm tracking-[0.18em] leading-tight font-sans">LEGIS</span>
                      </div>
                    </div>
                    <span className="text-[8.5px] uppercase tracking-[0.28em] font-medium font-sans text-neutral-500 mt-2.5">
                      en servicio del derecho
                    </span>
                  </div>

                  <p className="text-neutral-500 text-xs leading-relaxed pt-1 font-light">
                    Firma jurídica boutique en Guayaquil. Litigio penal y civil estratégicos, rigor procesal y asesoría corporativa en servicio del derecho.
                  </p>
                  
                  <div className="flex items-start gap-2 text-[11px] text-neutral-800 font-mono pt-1 leading-snug">
                    <MapPin className="w-3.5 h-3.5 text-neutral-950 shrink-0 mt-0.5" />
                    <span>Kennedy Norte, Alfonso Ortiz y José Castillo. Edificio Kennedy Office Center, piso 3, oficina 2. Guayaquil, Ecuador.</span>
                  </div>
                </div>

                {/* Columna 2 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                    Línea Forense
                  </h4>
                  <ul className="space-y-2 text-neutral-500 font-light">
                    <li><a href="#proposito" className="hover:text-neutral-950 transition-colors">Propósito & Manifiesto</a></li>
                    <li><a href="#socios" className="hover:text-neutral-950 transition-colors">Socios: Dr. Diego Tapia & Marcela Dunn</a></li>
                    <li><a href="#practica" className="hover:text-neutral-950 transition-colors">Defensa Penal Económica & Fraude</a></li>
                    <li><a href="#practica" className="hover:text-neutral-950 transition-colors">Controversias Societarias</a></li>
                    <li><a href="#editorial" className="hover:text-neutral-950 transition-colors">Editorial Jurídico ACTIO LEGIS</a></li>
                  </ul>
                </div>

                {/* Columna 3: Accesos */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                    Plataforma Privada
                  </h4>
                  <ul className="space-y-2 text-neutral-500 font-light">
                    <li>
                      <button 
                        type="button"
                        onClick={() => { setRolLogin('cliente'); setModalLogin(true); }}
                        className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                      >
                        Portal Clientes (Causas & Pagos)
                      </button>
                    </li>
                    <li>
                      <button 
                        type="button"
                        onClick={() => { setRolLogin('estudio'); setModalLogin(true); }}
                        className="hover:text-neutral-950 transition-colors text-left cursor-pointer font-medium text-neutral-900"
                      >
                        Intranet del Despacho (Expediente IA)
                      </button>
                    </li>
                    <li>
                      <a 
                        href="https://www.funcionjudicial.gob.ec/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-neutral-950 transition-colors flex items-center gap-1.5"
                      >
                        <span>Función Judicial SATJE</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400" />
                      </a>
                    </li>
                    <li>
                      <span className="text-[11px] text-neutral-400 block pt-1 font-mono">
                        Sincronización SATJE en tiempo real
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Columna 4 */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                    Sede Guayaquil
                  </h4>
                  <div className="space-y-2 text-neutral-500 text-xs font-light">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                      <span className="font-medium text-neutral-800 font-mono">+593 (4) 259-8800</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                      <span>info@actiolegisec.com</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                      Lunes a Viernes: 08:45 – 18:30 <br />
                      Urgencias en penales falgrantes: 24/7
                    </p>
                    <div className="pt-2 text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                      Kennedy Norte • Guayaquil, Ecuador
                    </div>
                  </div>
                </div>

              </div>

             {/* Sub-pie */}
              <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
                <p>© {new Date().getFullYear()} ACTIO LEGIS. Todos los derechos reservados. Guayaquil, Ecuador.</p>
                <div className="flex items-center gap-4">
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

            </div>
          </footer>
        </main>
      )}

      {/* =========================================================
          VISTA 2: PORTAL DE CLIENTES
         ========================================================= */}
      {vista === 'cliente' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
                <Shield className="w-3.5 h-3.5 text-neutral-800" />
                <span>Código Confidencial: ACTIO-8492</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal">
                Bienvenido/a, <span className="font-semibold">Inmobiliaria del Valle S.A.S.</span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Este dashboard le permitirá enterarse de las causas judiciales, trámites administrativos o investigaciones patrocinados por ACTIO LEGIS. Cualquier información adicional, no dude en contactar a su abogado patrocinador.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => alert('Cita solicitada. El despacho confirmará la hora a la brevedad.')}
                className="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-neutral-300" />
                <span>Agendar Cita</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  Mis Causas Patrocinadas ({expedientes.length})
                </h2>
                <span className="text-[11px] text-neutral-400">Seleccione para ver detalle</span>
              </div>

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
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {caso.numProceso}
                      </span>
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${estilo.badgeMateria}`}>
                        {caso.materia}
                      </span>
                    </div>

                    <h3 className="font-serif font-semibold text-neutral-950 text-sm leading-snug mb-3 line-clamp-2">
                      {caso.tipoProceso}
                    </h3>

                    <div className="pt-2.5 border-t border-neutral-900/10 space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-neutral-700 font-medium">{caso.etapaProcesalActual}</span>
                        <span className="font-mono font-bold text-neutral-900">{caso.porcentaje}%</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-neutral-900/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${estilo.barraProgreso}`}
                          style={{ width: `${caso.porcentaje}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        Próxima: {caso.proximaFechaClave}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${estaSeleccionado ? 'rotate-90 text-neutral-950' : 'text-neutral-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`lg:col-span-8 rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6 ${estiloActivo.detalleFondo}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${estiloActivo.indicadorActivo}`} />
                    <span className="text-xs font-mono font-bold text-neutral-600">
                      Causa Judicial: {casoActivo.numProceso}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${estiloActivo.badgeMateria}`}>
                      {casoActivo.materia}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-950">
                    {casoActivo.tipoProceso}
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    Demandante: <strong className="text-neutral-900 font-medium">{casoActivo.cliente}</strong> • Contraparte: <strong className="text-neutral-900 font-medium">{casoActivo.contraparte}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Etapa Procesal Actual
                    </div>
                    <div className="text-sm sm:text-base font-serif font-semibold text-neutral-950 mt-0.5">
                      {casoActivo.etapaProcesalActual}
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {casoActivo.porcentaje}% Completado
                  </span>
                </div>

                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${estiloActivo.barraProgreso}`}
                    style={{ width: `${casoActivo.porcentaje}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1 text-[11px]">
                  <div className="font-medium text-neutral-900">1. Demanda</div>
                  <div className="font-medium text-neutral-900">2. Citación</div>
                  <div className="font-bold text-neutral-950">3. Pruebas</div>
                  <div className="text-neutral-400">4. Sentencia</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-neutral-200 text-xs">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Juzgado / Unidad</div>
                  <div className="font-medium text-neutral-900 mt-0.5">{casoActivo.unidadJudicial}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Contraparte</div>
                  <div className="font-medium text-neutral-900 mt-0.5">{casoActivo.contraparte}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Abogado Patrocinador</div>
                  <div className="font-semibold text-neutral-900 mt-0.5">{casoActivo.abogadoLider} • ACTIO LEGIS</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-neutral-900" />
                  <span>Historial de Providencias & Resoluciones</span>
                </h3>

                {casoActivo.actuaciones.map((act) => (
                  <div key={act.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-neutral-900 font-serif text-sm flex items-center gap-1.5">
                        {act.titulo}
                        {act.detectadoPorIA && (
                          <span className="bg-neutral-900 text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> IA
                          </span>
                        )}
                      </span>
                      <span className="text-neutral-400 font-mono text-[11px]">{act.fecha}</span>
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-700 leading-relaxed flex items-start gap-2">
                      <span className="text-neutral-900 font-bold shrink-0">📌 ¿Qué significa?:</span>
                      <span>{act.resumenParaCliente}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          VISTA 3: INTRANET DE LITIGANTES & EXPEDIENTE IA
         ========================================================= */}
      {vista === 'intranet' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Barra Superior Intranet */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                <Building2 className="w-3.5 h-3.5 text-neutral-900" />
                <span>Despacho Jurídico • Intranet Forense</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-neutral-950">
                Panel de Control de Litigantes
              </h1>
            </div>

            {/* Pestañas de la Intranet */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTabIntranet('expedientes')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tabIntranet === 'expedientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Expedientes & IA
              </button>
              <button
                type="button"
                onClick={() => setTabIntranet('citas')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tabIntranet === 'citas' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Citas & Audiencias
              </button>
              <button
                type="button"
                onClick={() => setTabIntranet('honorarios')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tabIntranet === 'honorarios' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Honorarios
              </button>
            </div>
          </div>

          {/* TAB 1: EXPEDIENTES & MOTOR DE IA JUDICIAL */}
          {tabIntranet === 'expedientes' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Lado Izquierdo: Lector y Agendador Automático con IA */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <span>Expediente IA • Lector Forense</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Activo
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    Pegue directamente el texto de la providencia judicial o notificación SATJE. La IA extraerá los términos fatales, actualizará la causa y redactará la explicación para el cliente.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Causa a Actualizar:
                    </label>
                    <select
                      value={casoActivoId}
                      onChange={(e) => setCasoActivoId(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 text-white text-xs rounded-xl p-2.5 focus:outline-none focus:border-neutral-400 font-mono"
                    >
                      {expedientes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.numProceso} — {c.cliente}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Texto de la Providencia o Notificación:
                    </label>
                    <textarea
                      rows={5}
                      value={textoNotificacionIA}
                      onChange={(e) => setTextoNotificacionIA(e.target.value)}
                      placeholder="Pegue aquí el texto: 'VISTOS: Agréguese al expediente el informe pericial presentado... Se convoca a audiencia de juicio el día 20 de noviembre...'"
                      className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs rounded-xl p-3 focus:outline-none focus:border-neutral-400 font-sans leading-relaxed resize-none"
                    />
                  </div>

                  {resultadoIA && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 rounded-xl text-xs flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resultadoIA}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={procesandoIA || !textoNotificacionIA.trim()}
                    onClick={handleProcesarConIA}
                    className="w-full py-3 bg-white hover:bg-neutral-100 disabled:opacity-50 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                    <span>{procesandoIA ? 'Analizando con IA...' : 'Interpretar y Agendar Causa'}</span>
                  </button>
                </div>

                {/* Resumen de causas en despacho */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    Causas Patrocinadas ({expedientes.length})
                  </h3>
                  <div className="space-y-2">
                    {expedientes.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setCasoActivoId(c.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          c.id === casoActivoId ? 'border-neutral-950 bg-neutral-50 font-medium' : 'border-neutral-200 hover:bg-neutral-50'
                        }`}
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

              {/* Lado Derecho: Ficha del Expediente Activo */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
                <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                      Expediente Judicial Activo
                    </span>
                    <h2 className="text-xl font-serif font-bold text-neutral-950">
                      {casoActivo.numProceso}
                    </h2>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Cliente: <strong>{casoActivo.cliente}</strong> • {casoActivo.unidadJudicial}
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-neutral-100 rounded-lg text-xs font-mono text-neutral-800">
                    Líder: {casoActivo.abogadoLider}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Etapa Procesal</span>
                    <strong className="text-neutral-900 mt-0.5 block">{casoActivo.etapaProcesalActual}</strong>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">Próxima Fecha Clave</span>
                    <strong className="text-neutral-900 mt-0.5 block">{casoActivo.proximaFechaClave}</strong>
                  </div>
                </div>

                {/* Actuaciones con etiqueta IA */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center justify-between">
                    <span>Actuaciones del Proceso ({casoActivo.actuaciones.length})</span>
                    <span className="text-[10px] text-neutral-400">Actualizado en tiempo real</span>
                  </h3>

                  <div className="space-y-3">
                    {casoActivo.actuaciones.map((act) => (
                      <div key={act.id} className="p-4 rounded-xl border border-neutral-200 space-y-2 bg-neutral-50/50">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                            {act.titulo}
                            {act.detectadoPorIA && (
                              <span className="bg-neutral-950 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                                Agendado por IA
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

          {/* TAB 2: CITAS & AUDIENCIAS */}
          {tabIntranet === 'citas' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-4">
              <Calendar className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-neutral-950">Agenda Forense y Audiencias</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Próximas comparecencias en la Corte Provincial del Guayas y reuniones en Kennedy Office Center.
              </p>
              <div className="max-w-xl mx-auto space-y-2 text-left pt-4">
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-neutral-900 block">Audiencia de Juicio Ordinario</span>
                    <span className="text-neutral-500">Causa: 17230-2024-00482 • Inmobiliaria del Valle</span>
                  </div>
                  <span className="font-mono text-neutral-800 bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                    18 Octubre • 10:30
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HONORARIOS */}
          {tabIntranet === 'honorarios' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-4">
              <DollarSign className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-neutral-950">Gestión de Honorarios y Contratos</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Control de contratos de patrocinio profesional, cuotas de éxito y facturación electrónica.
              </p>
            </div>
          )}

        </div>
      )}

      {/* =========================================================
          MODAL DE LOGIN COMPARTIDO (CLIENTE O ABOGADO)
         ========================================================= */}
      {modalLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
            <button
              onClick={() => setModalLogin(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-block relative mb-2">
                <div className="absolute -right-1 -bottom-1 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
                <div className="relative px-3 py-1 bg-neutral-950 text-white flex flex-col items-center">
                  <span className="font-black text-xs tracking-widest leading-none font-sans">ACTIO</span>
                  <span className="font-black text-xs tracking-widest leading-none font-sans">LEGIS</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">
                {rolLogin === 'cliente' ? 'Portal de Clientes' : 'Intranet del Despacho'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {rolLogin === 'cliente' 
                  ? 'Seguimiento oficial de causas patrocinadas.' 
                  : 'Acceso para el equipo jurídico de ACTIO LEGIS.'}
              </p>
            </div>

            {/* Alternar Rol */}
            <div className="flex bg-neutral-100 p-1 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setRolLogin('cliente')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  rolLogin === 'cliente' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Portal Clientes
              </button>
              <button
                type="button"
                onClick={() => setRolLogin('estudio')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  rolLogin === 'estudio' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Intranet Abogados
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Usuario o Correo
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={inputUser}
                    onChange={(e) => setInputUser(e.target.value)}
                    placeholder={rolLogin === 'cliente' ? "ACTIO-8492 o cliente@correo.com" : "diego.tapia@actiolegisec.com"}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Ingresar a la Plataforma
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
