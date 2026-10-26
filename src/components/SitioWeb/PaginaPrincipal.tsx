import React from 'react';
import { 
  Scale, Shield, BookOpen, Clock, MapPin, Phone, 
  Mail, ArrowRight, ExternalLink, Calculator, CheckCircle2, 
  FileText, Users, Award, Landmark, ChevronRight
} from 'lucide-react';

interface PaginaPrincipalProps {
  onAbrirReservarCita: () => void;
  onAbrirLoginClientes: () => void;
  onAbrirLoginIntranet: () => void;
  onAbrirCalculadoraLegal?: () => void;
}

export const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({
  onAbrirReservarCita,
  onAbrirLoginClientes,
  onAbrirLoginIntranet,
}) => {
  return (
    <div className="font-sans text-neutral-900 bg-[#FAF9F6]">
      
      {/* =========================================================
          1. HERO EDITORIAL Y MANIFIESTO
         ========================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-neutral-200/90 shadow-2xs text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-neutral-950" />
              <span>Firma Jurídica Boutique • Guayaquil, Ecuador</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-neutral-950 tracking-tight leading-[1.12] font-normal">
              Rigor técnico, litigio estratégico y defensa <span className="italic font-normal">en servicio del derecho.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl">
              ACTIO LEGIS consolida una práctica forense de alta exigencia procesal, patrocinando causas penales de complejidad, controversias societarias y arbitraje bajo estándares de estricta reserva y excelencia técnica.
            </p>

            {/* Botones de Acción del Hero */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onAbrirReservarCita}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Agendar Consulta Confidencial</span>
                <ArrowRight className="w-4 h-4 text-neutral-300" />
              </button>

              <button
                type="button"
                onClick={onAbrirLoginClientes}
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 text-xs uppercase tracking-[0.15em] font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Seguimiento de Causas</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

          </div>

          {/* Cifras y Pilares Institucionales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-neutral-200/80">
            <div>
              <div className="font-serif text-3xl font-bold text-neutral-950">20+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">Años de Trayectoria</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-neutral-950">100%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">Rigor Procesal</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-neutral-950">SATJE</div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">Sincronización Judicial</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-neutral-950">Boutique</div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">Atención Personalizada</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          2. PROPÓSITO & FILOSOFÍA DE LA FIRMA
         ========================================================= */}
      <section id="proposito" className="py-20 md:py-28 border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Filosofía de Litigio
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 leading-tight">
                No ejercemos el derecho en masa. Asumimos casos con compromiso de fondo.
              </h2>
            </div>

            <div className="md:col-span-8 space-y-6 text-sm text-neutral-600 font-light leading-relaxed">
              <p>
                En un entorno jurídico donde predomina la sobrecarga y la delegación descuidada, ACTIO LEGIS nace para restituir la dignidad del ejercicio forense: cada causa es analizada personalmente por sus socios, formulando teorías del caso sostenidas en dogmática penal sólida y recopilación probatoria exhaustiva.
              </p>
              <p>
                Nuestra premisa es la transparencia total hacia el cliente: información en tiempo real sin tecnicismos engañosos, análisis honesto de probabilidades procesales y una defensa técnica inquebrantable en estrados judiciales y tribunales arbitrales.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          3. SOCIOS PRINCIPALES: DIEGO TAPIA & MARCELA DUNN
         ========================================================= */}
      <section id="socios" className="py-20 md:py-28 border-b border-neutral-200/80">
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
            
            {/* Tarjeta Dr. Diego Tapia */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Socio Principal</span>
                <h3 className="text-2xl font-serif font-bold text-neutral-950">Dr. Diego Tapia</h3>
                <p className="text-xs font-mono text-neutral-500">Litigio Penal Estratégico & Delitos Económicos</p>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Abogado litigante con más de dos décadas de trayectoria en el patrocinio de causas penales complejas, defensa técnica ante la Fiscalía General del Estado y diseño de estrategias preventivas de responsabilidad corporativa.
              </p>
              <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-mono">
                contacto@actiolegisec.com • Guayaquil
              </div>
            </div>

            {/* Tarjeta Marcela Dunn */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 shadow-xs space-y-6">
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

      {/* =========================================================
          4. PRÁCTICAS JURÍDICAS
         ========================================================= */}
      <section id="practica" className="py-20 md:py-28 border-b border-neutral-200/80 bg-white">
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
            
            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <Shield className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Litigio Penal & Delitos Económicos</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Defensa y acusación particular en delitos contra la administración pública, lavado de activos, defraudación tributaria y societaria.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <Scale className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Derecho Societario & Mercantil</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Conflictos entre socios, disolución judicial de compañías, impugnación de actas y controversias contractuales mercantiles.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <Landmark className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Contencioso Administrativo & Tributario</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Impugnación de actos administrativos, glosas de Contraloría y reclamaciones ante el Servicio de Rentas Internas (SRI).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <FileText className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Litigio Civil & Bienes Inmuebles</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Prescripción adquisitiva de dominio, saneamiento de títulos prediales, reivindicación y controversias contractuales civiles.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <Users className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Arbitraje & Mediación</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Representación técnica ante las cámaras de comercio y centros de arbitraje de Guayaquil y Quito bajo reglas CIAC / UNCITRAL.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/50 space-y-3">
              <Award className="w-5 h-5 text-neutral-950" />
              <h4 className="font-serif font-bold text-base text-neutral-950">Compliance & Gestión de Riesgo Penal</h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Manuales de cumplimiento, debida diligencia de contrapartes y blindaje normativo para directorios y grupos corporativos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          5. EDITORIAL JURÍDICO & CRITERIOS TÉCNICOS
         ========================================================= */}
      <section id="editorial" className="py-20 md:py-28 border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Doctrina & Análisis
              </span>
              <h2 className="text-3xl font-serif font-bold text-neutral-950 mt-1">
                Editorial Jurídico ACTIO LEGIS
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm font-light">
              Apuntes breves sobre jurisprudencia de la Corte Nacional de Justicia y tendencias procesales en Ecuador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <article className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
              <span className="text-[10px] font-mono text-neutral-400">Octubre 2026 • Derecho Penal Económico</span>
              <h4 className="font-serif font-bold text-base text-neutral-950">
                La carga dinámica de la prueba en investigaciones por presuntos delitos contables
              </h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Análisis de las recientes resoluciones de casación respecto al derecho a la no autoincriminación en peritajes tributarios.
              </p>
            </article>

            <article className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
              <span className="text-[10px] font-mono text-neutral-400">Septiembre 2026 • Litigio Civil</span>
              <h4 className="font-serif font-bold text-base text-neutral-950">
                El cómputo de términos fatales en citaciones por boletas fijadas
              </h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Puntos críticos en el COGEP que previenen la nulidad insaneable de todo lo actuado en juicios ordinarios.
              </p>
            </article>

            <article className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
              <span className="text-[10px] font-mono text-neutral-400">Agosto 2026 • Societario</span>
              <h4 className="font-serif font-bold text-base text-neutral-950">
                Responsabilidad solidaria de administradores de S.A.S. en disolución
              </h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Límites legales y defensas procesales frente a reclamaciones de acreedores y entidades de control.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* =========================================================
          6. SECCIÓN DE CONTACTO Y ATENCIÓN (LIMPIA, CLARA Y ELEGANTE)
         ========================================================= */}
      <section id="contacto" className="py-20 md:py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold">
                <Shield className="w-3.5 h-3.5 text-neutral-900" />
                <span>Atención Confidencial</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-snug">
                Confíe su causa a una defensa rigurosa.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica en nuestras oficinas de Puerto Santa Ana o por vía telemática.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={onAbrirReservarCita}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center cursor-pointer"
              >
                Solicitar Reunión en Despacho
              </button>
              <button
                type="button"
                onClick={onAbrirLoginClientes}
                className="px-5 py-3.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-2xs"
              >
                Portal Clientes
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          7. PIE DE PÁGINA EDITORIAL APROBADO (BLANCO / MARFIL)
         ========================================================= */}
      <footer className="bg-white text-neutral-900 border-t border-neutral-200/80 py-16 px-6 text-xs">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Columna 1: Logo Oficial Tipo Placa y Misión */}
            <div className="space-y-4 md:col-span-1">
              <div className="relative inline-block select-none py-1">
                <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
                <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center">
                  <span className="font-black text-sm tracking-[0.12em] leading-tight font-sans">
                    ACTIO
                  </span>
                  <span className="font-black text-sm tracking-[0.12em] leading-tight font-sans">
                    LEGIS
                  </span>
                </div>
              </div>

              <div className="text-[8.5px] uppercase tracking-[0.25em] font-medium font-sans text-neutral-500">
                en servicio del derecho
              </div>

              <p className="text-neutral-500 text-xs leading-relaxed pt-1">
                Firma jurídica boutique en Guayaquil. Litigio penal estratégico, rigor procesal y defensa técnica en servicio del derecho.
              </p>
              
              <div className="flex items-center gap-2 text-[11px] text-neutral-800 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                <span>Puerto Santa Ana & Malecón, Guayaquil</span>
              </div>
            </div>

            {/* Columna 2: Línea Institucional */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Línea Institucional
              </h4>
              <ul className="space-y-2 text-neutral-500">
                <li>
                  <a href="#proposito" className="hover:text-neutral-950 transition-colors">
                    Propósito & Manifiesto
                  </a>
                </li>
                <li>
                  <a href="#socios" className="hover:text-neutral-950 transition-colors">
                    Socios: Diego Tapia & Marcela Dunn
                  </a>
                </li>
                <li>
                  <a href="#practica" className="hover:text-neutral-950 transition-colors">
                    Defensa Penal & Prácticas
                  </a>
                </li>
                <li>
                  <a href="#editorial" className="hover:text-neutral-950 transition-colors">
                    Editorial Jurídico ACTIO LEGIS
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Plataformas Privadas */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Plataforma Privada
              </h4>
              <ul className="space-y-2 text-neutral-500">
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirLoginClientes}
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Portal Clientes (Causas & Pagos)
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirLoginIntranet}
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Intranet de Litigantes
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirReservarCita}
                    className="text-neutral-950 font-medium hover:underline text-left cursor-pointer"
                  >
                    Agendar Consulta Confidencial
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
              </ul>
            </div>

            {/* Columna 4: Atención en Guayaquil */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Atención Guayaquil
              </h4>
              <div className="space-y-2 text-neutral-500 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span className="font-medium text-neutral-800">+593 (4) 259-8800</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span>contacto@actiolegisec.com</span>
                </div>
                <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                  Lunes a Viernes: 08:30 – 18:30 <br />
                  Urgencias en materia penal 24/7
                </p>
              </div>
            </div>

          </div>

          {/* Sub-pie inferior */}
          <div className="pt-8 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <p>© {new Date().getFullYear()} ACTIO LEGIS. Todos los derechos reservados. Guayaquil, Ecuador.</p>
            <div className="flex items-center gap-4">
              <span>Firma Electrónica Válida</span>
              <span>•</span>
              <span>Sincronización SATJE</span>
              <span>•</span>
              <button 
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-neutral-900 font-medium hover:underline cursor-pointer"
              >
                Subir al inicio ↑
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
