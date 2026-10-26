import React, { useState } from 'react';
import { 
  ArrowUpRight, Shield, Scale, BookOpen, Clock, 
  MapPin, Phone, Mail, ChevronRight, Lock, UserCheck, 
  Award, FileText, CheckCircle2 
} from 'lucide-react';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';

interface PaginaPrincipalProps {
  onAbrirReservarCita: () => void;
  onAbrirLoginClientes: () => void;
  onAbrirLoginIntranet: () => void;
  onAbrirCalculadoraLegal?: () => void;
  paleta?: any;
  tamanoTexto?: 'normal' | 'grande';
}

export const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({
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
          1. BARRA SUPERIOR SUBTIL (BRAND STATEMENT & ACCESOS)
         ========================================================= */}
      <div className="border-b border-neutral-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <ActioLegisLogo size="sm" showSlogan={true} />
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide uppercase text-neutral-600">
              <a href="#proposito" className="hover:text-neutral-950 transition-colors">Propósito</a>
              <a href="#socios" className="hover:text-neutral-950 transition-colors">Socios</a>
              <a href="#practica" className="hover:text-neutral-950 transition-colors">Áreas</a>
              <a href="#editorial" className="hover:text-neutral-950 transition-colors">Editorial</a>
              <a href="#contacto" className="hover:text-neutral-950 transition-colors">Contacto</a>
            </nav>

            <div className="flex items-center gap-3 border-l border-neutral-200 pl-6">
              <button
                onClick={onAbrirLoginClientes}
                className="text-xs font-semibold px-3 py-1.5 text-neutral-700 hover:text-neutral-950 transition-all flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Portal Clientes</span>
              </button>

              <button
                onClick={onAbrirReservarCita}
                className="text-xs font-semibold px-4 py-2 bg-neutral-900 hover:bg-black text-white rounded-full transition-all tracking-wide"
              >
                Consultar Causa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. HERO SECTION EDITORIAL & MINIMALISTA
         ========================================================= */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-36 border-b border-neutral-200/70 bg-gradient-to-b from-white to-[#FAF9F6]">
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
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-black text-white text-sm font-medium rounded-full transition-all flex items-center justify-center gap-2 group shadow-sm"
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
          3. PROPÓSITO: "NUESTRA HUELLA EN EL SISTEMA JURÍDICO"
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
          4. SOCIOS DIRECTORES: TAPIA & DUNN
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
            {/* Socio 1: Diego Tapia */}
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

            {/* Socia 2: Marcela Dunn */}
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
          5. ÁREAS DE PRÁCTICA (CON ENFOQUE EN DERECHO PENAL)
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
          6. EL EDITORIAL JURÍDICO ACTIO LEGIS (DIFERENCIADOR CLAVE)
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
          7. CIERRE & AGENDAMIENTO DIRECTO
         ========================================================= */}
      <section id="contacto" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Scale className="w-5 h-5 text-white" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight mb-6">
            Confíe su causa a una defensa rigurosa.
          </h2>

          <p className="text-neutral-400 text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onAbrirReservarCita}
              className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-950 font-semibold text-sm rounded-full hover:bg-neutral-100 transition-all"
            >
              Solicitar Reunión en Despacho
            </button>
            <button
              onClick={onAbrirLoginIntranet}
              className="w-full sm:w-auto px-6 py-4 bg-transparent text-neutral-400 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors"
            >
              Acceso Intranet Abogados
            </button>
          </div>

          <div className="pt-12 border-t border-neutral-800 grid sm:grid-cols-3 gap-6 text-left text-xs text-neutral-400">
            <div>
              <div className="text-white font-medium mb-1">Oficinas Principales</div>
              <p>Puerto Santa Ana & Av. Malecón Simón Bolívar, Guayaquil, Ecuador.</p>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Contacto Telefónico</div>
              <p>+593 (4) 259-8800 • Atención a urgencias procesales 24/7</p>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Despacho Digital</div>
              <p>contacto@actiolegisec.com • Sincronización SATJE en tiempo real</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
