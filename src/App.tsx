import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, MessageSquare, 
  MapPin, Phone, Mail, ArrowRight, ArrowUp, ExternalLink, 
  ChevronRight, Lock, User, LogOut, X, Clock, Award, Landmark, 
  Users, Building2, Sparkles, Plus, CheckCircle2, AlertCircle, Bot, BookOpen
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
  const [vista, setVista] = useState<'sitio-web' | 'editorial' | 'cliente' | 'intranet'>('sitio-web');
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'honorarios'>('expedientes');
  const [modalLogin, setModalLogin] = useState(false);
  const [rolLogin, setRolLogin] = useState<'cliente' | 'estudio'>('cliente');

  const [expedientes, setExpedientes] = useState<ExpedienteInterno[]>(CASOS_BASE);
  const [casoActivoId, setCasoActivoId] = useState(CASOS_BASE[0].id);
  
  const [textoNotificacionIA, setTextoNotificacionIA] = useState('');
  const [procesandoIA, setProcesandoIA] = useState(false);
  const [resultadoIA, setResultadoIA] = useState<string | null>(null);

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
      
      {/* 1. HEADER COMPARTIDO (Fondo Blanco Puro y mezcla transparente en Logo) */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">
          
          {/* LOGOTIPO DINÁMICO */}
          <div 
            onClick={() => setVista('sitio-web')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="flex flex-col items-start pb-0.5">
              {vista === 'editorial' ? (
                /* LOGO DE LA EDITORIAL: Placa Sólida 3D Negra */
                <div className="relative inline-block py-0.5">
                  <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
                  <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                    <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">ACTIO</span>
                    <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">LEGIS</span>
                  </div>
                </div>
              ) : (
                /* LOGO DEL ESTUDIO JURÍDICO (Sin marco recortado) */
                <img 
                  src="/logo-estudio.png" 
                  alt="ACTIO LEGIS Consultores Jurídicos" 
                  className="h-20 w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform"
                />
              )}

              <span className="text-[7.5px] uppercase tracking-[0.28em] text-neutral-500 font-mono mt-1 font-semibold">
                en servicio del derecho
              </span>
            </div>

            <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
              <span className="font-serif text-xs font-bold tracking-tight text-neutral-950">
                {vista === 'editorial' ? 'Editorial Jurídico' : 'Estudio Jurídico & Litigio'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                Guayaquil • Ecuador
              </span>
            </div>
          </div>

          {/* NAVEGACIÓN PRINCIPAL */}
          <div className="flex items-center gap-3 sm:gap-5">
            <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600">
              <button 
                type="button" 
                onClick={() => setVista('sitio-web')} 
                className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'sitio-web' ? 'text-neutral-950 font-bold' : ''}`}
              >
                Inicio
              </button>
              <a 
                href="#proposito" 
                onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} 
                className="hover:text-neutral-950 transition-colors"
              >
                Propósito
              </a>
              <a 
                href="#socios" 
                onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} 
                className="hover:text-neutral-950 transition-colors"
              >
                Socios
              </a>
              <a 
                href="#practica" 
                onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} 
                className="hover:text-neutral-950 transition-colors"
              >
                Prácticas
              </a>
              
              <button 
                type="button" 
                onClick={() => setVista('editorial')} 
                className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'editorial' ? 'text-neutral-950 font-bold border-b border-neutral-950' : ''}`}
              >
                Editorial
              </button>

              <a 
                href="#contacto" 
                onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} 
                className="hover:text-neutral-950 transition-colors"
              >
                Contacto
              </a>
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

            {vista !== 'sitio-web' && (
              <button
                type="button"
                onClick={() => setVista('sitio-web')}
                className="px-3.5 py-2 bg-neutral-950 text-white text-xs font-medium rounded-xl hover:bg-black transition-all cursor-pointer"
              >
                Volver
              </button>
            )}
          </div>

        </div>
      </header>

      {/* =========================================================
          VISTA 1: SITIO WEB PRINCIPAL
         ========================================================= */}
      {vista === 'sitio-web' && (
        <main>
          {/* HERO */}
          <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 border-b border-neutral-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-50 border border-neutral-200 shadow-2xs text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-8 mx-auto">
                <span className="w-2 h-2 rounded-full bg-neutral-950" />
                <span>Firma Forense Boutique • Guayaquil, Ecuador</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-neutral-950 tracking-tight leading-[1.15] font-normal max-w-3xl mx-auto">
                Rigor técnico, litigio estratégico y defensa <span className="italic font-normal text-[#E2D9C8]">en servicio del derecho.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto mt-6">
                ACTIO LEGIS consolida una práctica forense de alta exigencia procesal, patrocinando causas penales de complejidad, civiles y controversias societarias bajo estándares de estricta reserva y ética profesional.
              </p>

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

          {/* PROPÓSITO: FRANJA GRIS BERENJENA (#281F26) */}
          <section id="proposito" className="py-20 md:py-28 border-b border-neutral-800 bg-[#281F26] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#CBD5E1] font-semibold">
                    Filosofía de Litigio
                  </span>  
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                    No ejercemos el derecho en masa. Asumimos causas con compromiso de fondo.
                  </h2>
                </div>
                <div className="md:col-span-8 space-y-6 text-sm text-neutral-300 font-light leading-relaxed">
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
                    info@actiolegisec.com • Guayaquil
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
              </div>
            </div>
          </section>

          {/* EDITORIAL (VISTA PREVIA) */}
          <section id="editorial-preview" className="py-20 md:py-28 border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                    Doctrina & Criterios
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

          {/* CONTACTO */}
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
                    Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica en nuestras oficinas de Kennedy Norte, Guayaquil.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => alert('Para coordinar su cita en despacho, contáctenos al +593 4 6005080 o al correo info@actiolegisec.com')}
                    className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center cursor-pointer"
                  >
                    Solicitar Reunión en Despacho
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================
          VISTA 2: EDITORIAL JURÍDICO (PÁGINA DEDICADA)
         ========================================================= */}
      {vista === 'editorial' && (
        <main className="py-16 md:py-24 bg-neutral-50/50 min-h-[80vh]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            
            <div className="border-b border-neutral-200 pb-10 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-[0.2em]">
                <BookOpen className="w-3 h-3 text-neutral-300" />
                <span>Editorial Jurídico ACTIO LEGIS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral-950 tracking-tight">
                Doctrina, Criterios & Jurisprudencia
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 max-w-3xl font-light leading-relaxed">
                Plataforma de análisis académico y técnico sobre la jurisprudencia vinculante de la Corte Nacional de Justicia, reformas procesales y tendencias en el litigio penal, civil y comercial en Ecuador.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white p-7 rounded-3xl border border-neutral-200 shadow-xs space-y-4 hover:border-neutral-400 transition-all">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Octubre 2026 • Derecho Penal Económico</span>
                <h3 className="font-serif font-bold text-xl text-neutral-950 leading-snug">
                  La carga probatoria en peritajes contables durante la investigación previa
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Estudio sobre las garantías constitucionales frente a los requerimientos fiscales y los límites a la autoincriminación en peritajes patrimoniales.
                </p>
                <button type="button" onClick={() => alert('Lectura de ensayo completo.')} className="text-xs font-semibold text-neutral-950 hover:underline flex items-center gap-1">
                  <span>Leer Ensayo Completo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </article>

              <article className="bg-white p-7 rounded-3xl border border-neutral-200 shadow-xs space-y-4 hover:border-neutral-400 transition-all">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Septiembre 2026 • Litigio Civil & COGEP</span>
                <h3 className="font-serif font-bold text-xl text-neutral-950 leading-snug">
                  Cómputo estricto de términos en citaciones por boletas fijadas
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Análisis de nulidades procesales recurrentes en juicios ordinarios de prescripción extraordinaria adquisitiva de dominio.
                </p>
                <button type="button" onClick={() => alert('Lectura de ensayo completo.')} className="text-xs font-semibold text-neutral-950 hover:underline flex items-center gap-1">
                  <span>Leer Ensayo Completo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </article>

              <article className="bg-white p-7 rounded-3xl border border-neutral-200 shadow-xs space-y-4 hover:border-neutral-400 transition-all">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Agosto 2026 • Derecho Societario</span>
                <h3 className="font-serif font-bold text-xl text-neutral-950 leading-snug">
                  Responsabilidad patrimonial de accionistas y administradores en S.A.S.
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Límites legales y criterios jurisprudenciales sobre el levantamiento del velo societario ante controversias con acreedores.
                </p>
                <button type="button" onClick={() => alert('Lectura de ensayo completo.')} className="text-xs font-semibold text-neutral-950 hover:underline flex items-center gap-1">
                  <span>Leer Ensayo Completo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </article>
            </div>

          </div>
        </main>
      )}

      {/* FOOTER COMPARTIDO (Logo del Estudio con fusión limpia) */}
      <footer className="bg-white text-neutral-900 border-t border-neutral-200 py-16 px-6 text-xs font-sans">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            <div className="space-y-4 md:col-span-1">
              <div className="flex flex-col items-start select-none py-1">
                {/* LOGO DEL ESTUDIO EN EL FOOTER (Sin marco recortado) */}
                <img 
                  src="/logo-estudio.png" 
                  alt="ACTIO LEGIS Consultores Jurídicos" 
                  className="h-24 w-auto object-contain mix-blend-multiply"
                />
                <span className="text-[8.5px] uppercase tracking-[0.28em] font-medium font-sans text-neutral-500 mt-2">
                  en servicio del derecho
                </span>
              </div>

              <p className="text-neutral-500 text-xs leading-relaxed pt-1 font-light">
                Firma jurídica boutique en Guayaquil. Litigio penal y civil estratégicos, rigor procesal y asesoría corporativa.
              </p>
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
          </div>
        </div>
      </footer>

    </div>
  );
}
