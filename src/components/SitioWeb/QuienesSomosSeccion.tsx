import React from 'react';
import { INFO_QUIENES_SOMOS } from '../../data/sitioWebData';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  Scale, Cpu, CheckCircle2, Sparkles, MapPin, 
  Mail, Phone, Award, Shield, ArrowRight, BookOpen, Clock,
  Quote, Check, Building2
} from 'lucide-react';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';

interface QuienesSomosSeccionProps {
  onReservarCita: () => void;
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const QuienesSomosSeccion: React.FC<QuienesSomosSeccionProps> = ({ 
  onReservarCita,
  paleta,
  tamanoTexto
}) => {
  return (
    <section id="quienes-somos" className="py-12 sm:py-16 scroll-mt-20">
      {/* Encabezado de Sección con Rótulo Editorial */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 border ${paleta.tokens.highlightBadge}`}>
          <Shield className="w-3.5 h-3.5" />
          <span>QUIÉNES SOMOS • REPORTAJE ESPECIAL FIRMA GUAYAQUIL</span>
        </div>
        <h2 className={`font-black font-display text-slate-900 tracking-tight mb-4 ${
          tamanoTexto === 'grande' ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
        }`}>
          Defensa jurídica de élite con la cercanía y agilidad que mereces
        </h2>
        <p className={`text-slate-600 leading-relaxed ${
          tamanoTexto === 'grande' ? 'text-lg' : 'text-base sm:text-lg'
        }`}>
          En <span className="font-bold text-slate-900">ACTIO LEGIS</span> reinventamos el ejercicio del derecho en Guayaquil. Dejamos atrás las carpetas polvorientas y la burocracia opaca para ofrecerte patrocinio implacable, tecnología procesal en tiempo real y honorarios transparentes.
        </p>
      </div>

      {/* Los 4 Pilares de la Firma con Estilo Tarjetas de Revista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {INFO_QUIENES_SOMOS.pilares.map((pilar, idx) => {
          const iconos = [Scale, Cpu, CheckCircle2, Sparkles];
          const Icono = iconos[idx % iconos.length];
          const colores = [
            'text-blue-600 bg-blue-50 border-blue-200',
            'text-amber-600 bg-amber-50 border-amber-200',
            'text-emerald-600 bg-emerald-50 border-emerald-200',
            'text-rose-600 bg-rose-50 border-rose-200'
          ];
          return (
            <div
              key={pilar.titulo}
              className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden ${paleta.tokens.cardBorderHover}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-900 via-amber-500 to-blue-600 opacity-80" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colores[idx % colores.length]} group-hover:scale-110 transition-transform`}>
                <Icono className="w-6 h-6" />
              </div>
              <h3 className={`font-black text-slate-900 mb-2 transition-colors ${
                tamanoTexto === 'grande' ? 'text-lg' : 'text-base'
              }`}>
                {pilar.titulo}
              </h3>
              <p className={`text-slate-600 leading-relaxed ${
                tamanoTexto === 'grande' ? 'text-sm' : 'text-xs sm:text-sm'
              }`}>
                {pilar.descripcion}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Reseña de la Firma y Ciudad de Guayaquil con Contraste y Cita Editorial */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white mb-16 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${paleta.tokens.heroGlow}`} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <ActioLegisLogo variant="white" size="xs" />
              <span className="text-amber-400 text-xs font-black uppercase tracking-wider font-mono">
                {INFO_QUIENES_SOMOS.ciudadSede}
              </span>
            </div>
            <h3 className={`font-black font-display text-white mb-4 ${
              tamanoTexto === 'grande' ? 'text-2xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}>
              Litigio con propósito en el principal puerto económico del país
            </h3>
            <p className={`text-slate-200 leading-relaxed mb-6 ${
              tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}>
              Nuestra sede se ubica estratégicamente en el corazón de Guayaquil, a pocos minutos del Palacio de Justicia y los Complejos Judiciales Florida Norte y Valdivia. Brindamos asesoría ágil a empresarios, familias y profesionales que buscan resultados contundentes y comunicación sin rodeos.
            </p>
            
            {/* Estadísticas de la Revista */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-amber-400 font-display">+15</span>
                <span className="text-xs text-slate-300 font-medium">Años de trayectoria procesal</span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-white font-display">94.8%</span>
                <span className="text-xs text-slate-300 font-medium">Tasa de resoluciones favorables</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-3xl sm:text-4xl font-black text-emerald-400 font-display">24/7</span>
                <span className="text-xs text-slate-300 font-medium">Alertas SATJE en tiempo real</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Quote className="w-6 h-6 shrink-0 opacity-80" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Manifiesto Editorial
              </span>
            </div>
            <p className="text-slate-100 text-sm sm:text-base italic leading-relaxed">
              «El derecho no debe ser una barrera incomprensible sino un instrumento de certeza. Cada causa que asumimos es defendida con la misma pasión y rigor técnico que pondríamos en la nuestra propia.»
            </p>
            <div className="pt-2 text-right">
              <span className="block font-bold text-white text-xs">Socios Directores</span>
              <span className="text-[11px] text-amber-300 font-mono">ACTIO LEGIS Guayaquil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Socios Principales (Perfiles de Revista) */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">
            <span>EQUIPO DE SOCIOS LITIGANTES</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Liderazgo jurídico con visión contemporánea
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {INFO_QUIENES_SOMOS.socios.map((socio) => (
            <div
              key={socio.nombre}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={socio.imagen}
                    alt={socio.nombre}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-900 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span 
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold mb-1"
                      style={{ backgroundColor: paleta.hexOscuro, color: paleta.hexAcento }}
                    >
                      {socio.cargo}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl font-display">
                      {socio.nombre}
                    </h4>
                    <p 
                      className="text-xs font-semibold mt-0.5"
                      style={{ color: paleta.hexPrimario }}
                    >
                      {socio.especialidad}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {socio.resena}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {socio.email}
                </span>
                <button
                  onClick={onReservarCita}
                  style={{ color: paleta.hexPrimario }}
                  className="inline-flex items-center gap-1 text-xs font-bold group-hover:translate-x-1 transition-all cursor-pointer hover:opacity-80"
                >
                  <span>Agendar Cita</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Áreas de Práctica con Etiquetas Dinámicas de Revista */}
      <div 
        className="text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800"
        style={{ background: `linear-gradient(135deg, ${paleta.hexOscuro}, #0f172a)` }}
      >
        <div className="max-w-3xl mb-8">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
            style={{ backgroundColor: `${paleta.hexAcento}20`, color: paleta.hexAcento, borderColor: `${paleta.hexAcento}40` }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ESPECIALIDADES DE LITIGIO EN GUAYAQUIL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
            Áreas de práctica y patrocinio estratégico
          </h3>
          <p className="text-slate-300 text-sm mt-2">
            Soluciones adaptadas a litigios complejos, negociaciones de alto calibre y prevención de contingencias legales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INFO_QUIENES_SOMOS.areasPractica.map((area) => (
            <div
              key={area.nombre}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                  {area.nombre}
                </h4>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {area.descripcion}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Atención presencial en Guayaquil y audiencias telemáticas en todo el país.</span>
          </div>
          <button
            onClick={onReservarCita}
            className={`px-5 py-3 rounded-xl font-extrabold text-xs bg-gradient-to-r ${paleta.tokens.accentGradient} text-slate-950 shadow-md hover:shadow-lg transition-all cursor-pointer`}
          >
            Consultar con un Especialista
          </button>
        </div>
      </div>
    </section>
  );
};
