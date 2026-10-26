import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Shield, 
  Scale, 
  BookOpen, 
  ChevronRight, 
  FileText, 
  Lock,
  MessageSquare,
  User,
  LogOut
} from 'lucide-react';
import { LoginModal } from './components/LoginModal';
import { ClienteCasosView } from './components/PortalCliente/ClienteCasosView';
import { ClienteConsultasView } from './components/PortalCliente/ClienteConsultasView';
import type { Cliente, ExpedienteJudicial } from './types/legal';

// ==========================================
// COMPONENTE: PÁGINA PRINCIPAL EDITORIAL
// ==========================================
interface PaginaPrincipalProps {
  onAbrirReservarCita: () => void;
  onAbrirLoginClientes: () => void;
  onAbrirLoginIntranet: () => void;
}

const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({
  onAbrirReservarCita,
  onAbrirLoginClientes,
  onAbrirLoginIntranet,
}) => {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<number | null>(null);

  const articulosEditorial = [
    {
      id: 1,
      volumen: "Vol. IV • Ensayo Procesal",
      titulo: "La excepcionalidad de la prisión preventiva frente al principio de presunción de inocencia",
      autor: "Diego Tapia, Ab.",
      rol: "Socio Director • Litigio Penal",
      fecha: "Octubre 2026",
      lectura: "6 min de lectura",
      resumen: "Un examen dogmático a la luz de los recientes precedentes de la Corte Constitucional del Ecuador sobre la debida motivación en medidas cautelares de orden penal.",
      contenidoCompleto: "El arraigo procesal y la necesidad cautelar deben responder a estándares probatorios de rigurosidad técnica incuestionable. La privación de libertad nunca puede configurarse como una pena anticipada sin lesionar la garantía sustancial del debido proceso.",
      categoria: "Derecho Penal & Garantías"
    },
    {
      id: 2,
      volumen: "Vol. III • Derechos Fundamentales",
      titulo: "Victimología y contención humana: El deber ético en la defensa técnica de personas vulnerables",
      autor: "Marcela Dunn, Ab.",
      rol: "Socia Directora • Derechos Humanos",
      fecha: "Septiembre 2026",
      lectura: "5 min de lectura",
      resumen: "El litigio de vanguardia no solo exige destreza en audiencia oral, sino la protección irrestricta de la dignidad de las partes ante la revictimización judicial.",
      contenidoCompleto: "Comprender la vivencia de quien atraviesa un conflicto penal es el primer paso hacia una tutela judicial efectiva. El derecho pierde su sentido cuando se desconecta de la sensibilidad humana.",
      categoria: "Derechos Humanos"
    },
    {
      id: 3,
      volumen: "Vol. II • Jurisprudencia",
      titulo: "Rigor procesal y trazabilidad probatoria en litigios corporativos de alta cuantía",
      autor: "Equipo Editorial Actio Legis",
      rol: "Comité de Estudios Jurídicos",
      fecha: "Agosto 2026",
      lectura: "4 min de lectura",
      resumen: "Criterios técnicos para la preservación de la cadena de custodia documental y electrónica en controversias patrimoniales complejas.",
      contenidoCompleto: "La incorporación oportuna y pulcra de los medios de prueba define el éxito en casación y segunda instancia. La preparación de la teoría del caso exige metodología científica.",
      categoria: "Litigio Estratégico"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">

      {/* =========================================================
          BARRA DE NAVEGACIÓN ÚNICA CON SLOGAN OFICIAL
         ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Oficial con relieve y Slogan */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer select-none flex flex-col"
          >
            <div className="relative inline-block w-fit">
              <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
              <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center">
                <span className="font-black text-xs tracking-[0.12em] leading-tight font-sans">
                  ACTIO
                </span>
                <span className="font-black text-xs tracking-[0.12em] leading-tight font-sans">
                  LEGIS
                </span>
              </div>
            </div>
            <span className="text-[7.5px] uppercase tracking-[0.24em] font-semibold text-neutral-600 mt-2.5">
              en servicio del derecho
            </span>
          </div>

          {/* Menú de Navegación Editorial */}
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-medium tracking-wider uppercase text-neutral-600">
            <a href="#proposito" className="hover:text-neutral-950 transition-colors">Propósito</a>
            <a href="#socios" className="hover:text-neutral-950 transition-colors">Socios</a>
            <a href="#practica" className="hover:text-neutral-950 transition-colors">Áreas</a>
            <a href="#editorial" className="hover:text-neutral-950 transition-colors">Editorial</a>
            <a href="#contacto" className="hover:text-neutral-950 transition-colors">Contacto</a>
          </nav>

          {/* Botones de Acción */}
          <div className="flex items-center gap-4">
            <button
              onClick={onAbrirLoginClientes}
              className="text-[12px] font-semibold text-neutral-700 hover:text-neutral-950 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Portal Clientes</span>
            </button>

            <button
              onClick={onAbrirLoginIntranet}
              className="text-[12px] font-semibold text-neutral-700 hover:text-neutral-950 transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
              <span>Intranet</span>
            </button>

            <button
              onClick={onAbrirReservarCita}
              className="text-[12px] font-medium px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full transition-all shadow-sm cursor-pointer"
            >
              Consultar Causa
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================
          HERO SECTION EDITORIAL & MINIMALISTA
         ========================================================= */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 border-b border-neutral-200/70 bg-gradient-to-b from-white to-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-[11px] font-medium tracking-widest uppercase text-neutral-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            Estudio Jurídico Boutique • Guayaquil
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-neutral-950 leading-[1.08] mb-8">
            Litigio penal estratégico y rigor procesal inquebrantable.
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Dirigido por Diego Tapia y Marcela Dunn. Construimos una defensa de alto estándar que fusiona la profundidad dogmática con la protección sensible de la dignidad humana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onAbrirReservarCita}
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
            >
              <span>Agendar Evaluación Confidencial</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            </button>

            <a
              href="#editorial"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-medium rounded-full border border-neutral-300 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-neutral-500" />
              <span>Explorar Nuestro Editorial</span>
            </a>
          </div>

          <div className="mt-16 pt-10 border-t border-neutral-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">Especialidad</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">Defensa Penal y Delitos Complejos</div>
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">Jurisdicción</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">Guayaquil & Cobertura Nacional</div>
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">Compromiso</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">En Servicio del Derecho</div>
            </div>
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">Transparencia</div>
              <div className="text-sm font-medium text-neutral-900 mt-1">Seguimiento SATJE en Vivo</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROPÓSITO: "NUESTRA HUELLA EN EL SISTEMA JURÍDICO"
         ========================================================= */}
      <section id="proposito" className="py-24 border-b border-neutral-200/70 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 mb-4">
            Manifiesto & Propósito
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-serif text-neutral-950 leading-snug mb-8">
            «Actio Legis es nuestra huella en el sistema jurídico: defender los derechos fundamentales desde la más rigurosa técnica legal.»
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-neutral-600 text-sm leading-relaxed">
            <p>
              Rechazamos la abogacía masificada y el sensacionalismo procesal. Nos concentramos en un número selecto de casos donde la libertad, el honor o el patrimonio de nuestros patrocinados exigen una estrategia construida a la medida, con fundamentación dogmática intachable ante los tribunales.
            </p>
            <p>
              Creemos firmemente que la credibilidad de una firma se fundamenta en su capacidad de generar pensamiento jurídico propio. Por ello, transformamos nuestra experiencia en audiencia en doctrina accesible a través de nuestro editorial independiente.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SOCIOS DIRECTORES: TAPIA & DUNN
         ========================================================= */}
      <section id="socios" className="py-24 border-b border-neutral-200/70 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              Dirección de la Firma
            </span>
            <h2 className="text-3xl font-serif text-neutral-950 mt-2">
              Liderazgo & Visión Jurídica
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              El balance entre la precisión dogmática y la comprensión sensible de la causa humana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Diego Tapia */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-serif text-xl mb-6">
                  DT
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  Socio Director • Litigio Estratégico
                </div>
                <h3 className="text-2xl font-serif text-neutral-950 font-bold mb-4">
                  Diego Tapia, Ab.
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Especializado en litigio penal económico, dogmática procesal y recursos de casación. Su enfoque combina la filosofía del derecho con una meticulosa construcción de la teoría del caso en audiencias complejas.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Tribunales Penales & Sala Constitucional</span>
                <span className="text-neutral-900 font-medium">Guayaquil, EC</span>
              </div>
            </div>

            {/* Marcela Dunn */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center font-serif text-xl mb-6">
                  MD
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  Socia Directora • Derechos Humanos
                </div>
                <h3 className="text-2xl font-serif text-neutral-950 font-bold mb-4">
                  Marcela Dunn, Ab.
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Dedicada a la protección de garantías fundamentales, defensa de personas vulnerables y tutela constitucional. Su práctica aporta una visión empática, centrada en la dignidad del cliente y el impacto social de la resolución.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Garantías Jurisdiccionales & Familia</span>
                <span className="text-neutral-900 font-medium">Guayaquil, EC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ÁREAS DE PRÁCTICA
         ========================================================= */}
      <section id="practica" className="py-24 border-b border-neutral-200/70 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
              Servicios Procesales
            </span>
            <h2 className="text-3xl font-serif text-neutral-950 mt-2">
              Patrocinio de Alto Desempeño
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-xl border border-neutral-200 hover:border-neutral-900 transition-colors">
              <Shield className="w-6 h-6 text-neutral-900 mb-4" />
              <h3 className="text-lg font-serif font-bold text-neutral-950 mb-2">
                Derecho Penal & Compliance
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Patrocinio activo en investigaciones previas, audiencias de juicio y apelaciones en delitos patrimoniales, contra la administración pública y libertades individuales.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-neutral-200 hover:border-neutral-900 transition-colors">
              <Scale className="w-6 h-6 text-neutral-900 mb-4" />
              <h3 className="text-lg font-serif font-bold text-neutral-950 mb-2">
                Acciones Constitucionales
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Interposición de Acciones de Protección, Hábeas Corpus y medidas cautelares urgentes ante vulneraciones graves a los derechos fundamentales.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-neutral-200 hover:border-neutral-900 transition-colors">
              <FileText className="w-6 h-6 text-neutral-900 mb-4" />
              <h3 className="text-lg font-serif font-bold text-neutral-950 mb-2">
                Litigio Civil & Societario
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Resolución de controversias contractuales, ejecución de títulos, controversias sucesorias complejas y disputas entre socios comerciales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EL EDITORIAL JURÍDICO ACTIO LEGIS
         ========================================================= */}
      <section id="editorial" className="py-24 border-b border-neutral-200/70 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                Línea Editorial
              </span>
              <h2 className="text-3xl font-serif text-neutral-950 mt-2">
                Editorial Jurídico Actio Legis
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Doctrina, análisis crítico de fallos y divulgación en servicio de los Derechos Humanos.
              </p>
            </div>
            
            <div className="text-xs font-mono text-neutral-500">
              Edición Cuatrimestral • Año 2026
            </div>
          </div>

          <div className="space-y-6">
            {articulosEditorial.map((art) => (
              <article 
                key={art.id}
                onClick={() => setArticuloSeleccionado(articuloSeleccionado === art.id ? null : art.id)}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 hover:border-neutral-400 transition-all cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400 mb-3">
                  <span className="text-neutral-900 font-semibold">{art.volumen}</span>
                  <span>{art.fecha} • {art.lectura}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-950 hover:text-neutral-700 transition-colors mb-3">
                  {art.titulo}
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {art.resumen}
                </p>

                {articuloSeleccionado === art.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 text-sm text-neutral-700 bg-neutral-50 p-4 rounded-xl leading-relaxed italic">
                    «{art.contenidoCompleto}»
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 text-xs text-neutral-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-900 font-semibold">{art.autor}</span>
                    <span>—</span>
                    <span>{art.rol}</span>
                  </div>
                  
                  <span className="text-neutral-900 underline underline-offset-4 flex items-center gap-1">
                    {articuloSeleccionado === art.id ? 'Contraer' : 'Leer ensayo completo'}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${articuloSeleccionado === art.id ? 'rotate-90' : ''}`} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BANNER INFERIOR EXACTO (CAPTURA SOLICITADA)
         ========================================================= */}
      <section id="contacto" className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          {/* Círculo con la balanza */}
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Scale className="w-5 h-5 text-white" />
          </div>

          {/* Título principal */}
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight mb-6">
            Confíe su causa a una defensa rigurosa.
          </h2>

          {/* Subtítulo */}
          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica.
          </p>

          {/* Botones de acción centrados */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={onAbrirReservarCita}
              className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-950 font-semibold text-sm rounded-full hover:bg-neutral-100 transition-all cursor-pointer shadow-sm"
            >
              Solicitar Reunión en Despacho
            </button>
            <button
              onClick={onAbrirLoginIntranet}
              className="text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              ACCESO INTRANET ABOGADOS
            </button>
          </div>

          {/* Pie de 3 columnas con división superior */}
          <div className="pt-12 border-t border-neutral-800 grid sm:grid-cols-3 gap-8 text-left text-xs text-neutral-400">
            <div>
              <div className="text-white font-medium mb-1.5 text-sm">Oficinas Principales</div>
              <p className="leading-relaxed">Puerto Santa Ana & Av. Malecón Simón Bolívar, Guayaquil, Ecuador.</p>
            </div>
            <div>
              <div className="text-white font-medium mb-1.5 text-sm">Contacto Telefónico</div>
              <p className="leading-relaxed">+593 (4) 259-8800 • Atención a urgencias procesales 24/7</p>
            </div>
            <div>
              <div className="text-white font-medium mb-1.5 text-sm">Despacho Digital</div>
              <p className="leading-relaxed">contacto@actiolegisec.com • Sincronización SATJE en tiempo real</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL CON ENRUTAMIENTO
// ==========================================
const DEFAULT_CLIENTE: Cliente = {
  id: 'cli-01',
  nombre: 'Consorcio Nobis / Representación Corporativa',
  email: 'legal@nobis.com.ec',
  telefono: '+593 99 999 9999',
  identificacion: '0990000000001',
  tipo: 'empresa'
};

const DEFAULT_EXPEDIENTES: ExpedienteJudicial[] = [
  {
    id: 'exp-01',
    numeroCaso: '09332-2023-01824',
    titulo: 'Acción de Protección Constitucional - Vulneración al Debido Proceso',
    materia: 'Constitucional',
    unidadJudicial: 'Unidad Judicial Sur de Garantías Penales de Guayaquil',
    juez: 'Dra. María Elena Carrión',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2023-11-14',
    ultimaActualizacion: '2026-10-22',
    estado: 'en_tramite',
    etapaProcesal: 'audiencia',
    cuantia: 'Inestimable',
    porcentajeCompletado: 65,
    descripcion: 'Demanda de acción de protección en tutela de derechos constitucionales y seguridad jurídica.',
    actuaciones: [
      {
        id: 'act-01',
        fecha: '2026-10-22',
        titulo: 'Convocatoria a Audiencia Evaluatoria y Preparatoria',
        descripcion: 'El juzgado convoca a las partes procesales a comparecer telemáticamente.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'El juzgado fijó fecha oficial para la audiencia. El equipo legal cuenta con la contestación y prueba lista.'
      }
    ]
  },
  {
    id: 'exp-02',
    numeroCaso: '17203-2024-00412',
    titulo: 'Contencioso Administrativo - Impugnación de Acto Determinativo',
    materia: 'Contencioso Administrativo',
    unidadJudicial: 'Tribunal Distrital de lo Contencioso Administrativo con sede en Quito',
    juez: 'Dr. Gonzalo Zambrano P.',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2024-02-10',
    ultimaActualizacion: '2026-10-15',
    estado: 'en_tramite',
    etapaProcesal: 'pruebas',
    cuantia: '$ 184,500.00 USD',
    porcentajeCompletado: 45,
    descripcion: 'Demanda de plena jurisdicción impugnando resoluciones de glosa tributaria.',
    actuaciones: [
      {
        id: 'act-02',
        fecha: '2026-10-15',
        titulo: 'Apertura del Término Probatorio de 30 Días',
        descripcion: 'Se confiere término común para dictámenes contables periciales.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'Fase de peritaje contable abierta para sustentar el descargo financiero.'
      }
    ]
  },
  {
    id: 'exp-03',
    numeroCaso: '09281-2024-03190',
    titulo: 'Juicio Ordinario Mercantil - Incumplimiento de Contrato de Suministro',
    materia: 'Civil y Mercantil',
    unidadJudicial: 'Unidad Judicial Civil de Samborondón',
    juez: 'Abg. Roberto Morales F.',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2024-05-02',
    ultimaActualizacion: '2026-10-10',
    estado: 'en_tramite',
    etapaProcesal: 'citacion',
    cuantia: '$ 92,300.00 USD',
    porcentajeCompletado: 25,
    descripcion: 'Demanda de indemnización por daños derivados de contrato comercial.',
    actuaciones: [
      {
        id: 'act-03',
        fecha: '2026-10-10',
        titulo: 'Citación Efectiva a la Contraparte',
        descripcion: 'Citación legal cumplida a través de la oficina de citaciones.',
        tipo: 'citacion',
        esHitoImportante: true,
        interpretacionSencilla: 'La contraparte fue formalmente notificada del proceso.'
      }
    ]
  },
  {
    id: 'exp-04',
    numeroCaso: '09100-2023-08711',
    titulo: 'Arbitraje Comercial - Conflicto Societario y Rendición de Cuentas',
    materia: 'Arbitraje y Mediación',
    unidadJudicial: 'Centro de Arbitraje de la Cámara de Comercio',
    juez: 'Tribunal Arbitral',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2023-08-19',
    ultimaActualizacion: '2026-10-01',
    estado: 'en_tramite',
    etapaProcesal: 'demanda',
    cuantia: '$ 320,000.00 USD',
    porcentajeCompletado: 15,
    descripcion: 'Controversia arbitral vinculante para liquidación de haberes sociales.',
    actuaciones: [
      {
        id: 'act-04',
        fecha: '2026-10-01',
        titulo: 'Instalación Oficial del Tribunal Arbitral',
        descripcion: 'Posesión solemne de los árbitros dirimentes y calendario procesal.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'El tribunal arbitral quedó posesionado y el calendario procesal fijado.'
      }
    ]
  }
];

export function App() {
  const [vistaActual, setVistaActual] = useState<'inicio' | 'cliente-casos' | 'cliente-consultas'>('inicio');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [clienteActivo, setClienteActivo] = useState<Cliente | null>(null);
  const [expedientes, setExpedientes] = useState<ExpedienteJudicial[]>(DEFAULT_EXPEDIENTES);

  useEffect(() => {
    try {
      const storedCliente = localStorage.getItem('actiolegis_cliente_activo');
      if (storedCliente) {
        setClienteActivo(JSON.parse(storedCliente));
      }
      const storedExpedientes = localStorage.getItem('actiolegis_expedientes');
      if (storedExpedientes) {
        const parsed = JSON.parse(storedExpedientes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExpedientes(parsed);
        }
      }
    } catch {
      setClienteActivo(DEFAULT_CLIENTE);
    }
  }, []);

  const handleLoginSuccess = (clienteData: Cliente) => {
    const seguro: Cliente = {
      id: clienteData?.id || DEFAULT_CLIENTE.id,
      nombre: clienteData?.nombre || DEFAULT_CLIENTE.nombre,
      email: clienteData?.email || DEFAULT_CLIENTE.email,
      telefono: clienteData?.telefono || DEFAULT_CLIENTE.telefono,
      identificacion: clienteData?.identificacion || DEFAULT_CLIENTE.identificacion,
      tipo: clienteData?.tipo || 'empresa'
    };
    setClienteActivo(seguro);
    try {
      localStorage.setItem('actiolegis_cliente_activo', JSON.stringify(seguro));
    } catch {
      // Ignorar error de cuota en almacenamiento local
    }
    setVistaActual('cliente-casos');
  };

  const handleCerrarSesion = () => {
    setClienteActivo(null);
    try {
      localStorage.removeItem('actiolegis_cliente_activo');
    } catch {
      // Ignorar error de cuota en almacenamiento local
    }
    setVistaActual('inicio');
  };

  const expedientesFiltrados = expedientes.filter((exp) => {
    if (!clienteActivo) return true;
    const clienteNombreActual = String(clienteActivo?.nombre || '').toLowerCase().trim();
    const clienteExpediente = String(exp?.cliente || '').toLowerCase().trim();
    if (!clienteNombreActual || !clienteExpediente) return true;
    return clienteExpediente.includes(clienteNombreActual) || clienteNombreActual.includes(clienteExpediente);
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 flex flex-col font-sans">
      {clienteActivo ? (
        /* VISTA DE USUARIO AUTENTICADO: PORTAL CLIENTES */
        <div className="min-h-screen flex flex-col">
          {/* Barra Superior del Portal */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              
              <div 
                onClick={() => setVistaActual('cliente-casos')}
                className="cursor-pointer select-none flex flex-col"
              >
                <div className="relative inline-block w-fit">
                  <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
                  <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center">
                    <span className="font-black text-xs tracking-[0.12em] leading-tight font-sans">ACTIO</span>
                    <span className="font-black text-xs tracking-[0.12em] leading-tight font-sans">LEGIS</span>
                  </div>
                </div>
                <span className="text-[7.5px] uppercase tracking-[0.24em] font-semibold text-neutral-600 mt-2.5">
                  portal de clientes
                </span>
              </div>

              <nav className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setVistaActual('cliente-casos')}
                  className={`text-xs font-medium px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    vistaActual === 'cliente-casos' 
                      ? 'bg-neutral-900 text-white shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Mis Procesos
                </button>

                <button
                  onClick={() => setVistaActual('cliente-consultas')}
                  className={`text-xs font-medium px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    vistaActual === 'cliente-consultas' 
                      ? 'bg-neutral-900 text-white shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultas al Abogado
                </button>

                <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

                <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-medium max-w-[140px] truncate">{clienteActivo.nombre}</span>
                </div>

                <button
                  onClick={handleCerrarSesion}
                  title="Cerrar Sesión"
                  className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </nav>
            </div>
          </header>

          {/* Contenido del Portal de Clientes */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {vistaActual === 'cliente-casos' ? (
              <ClienteCasosView 
                cliente={clienteActivo} 
                expedientes={expedientesFiltrados.length > 0 ? expedientesFiltrados : DEFAULT_EXPEDIENTES} 
              />
            ) : (
              <ClienteConsultasView 
                cliente={clienteActivo} 
                expedientes={expedientesFiltrados.length > 0 ? expedientesFiltrados : DEFAULT_EXPEDIENTES} 
              />
            )}
          </main>
        </div>
      ) : (
        /* VISTA PRINCIPAL PÚBLICA EDITORIAL */
        <PaginaPrincipal 
          onAbrirReservarCita={() => {
            const seccionContacto = document.getElementById('contacto');
            if (seccionContacto) {
              seccionContacto.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onAbrirLoginClientes={() => setIsLoginModalOpen(true)}
          onAbrirLoginIntranet={() => setIsLoginModalOpen(true)}
        />
      )}

      {/* Modal de Inicio de Sesión */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
