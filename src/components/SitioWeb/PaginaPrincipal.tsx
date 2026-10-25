import React from 'react';
import { BannerGuayaquil } from './BannerGuayaquil';
import { QuienesSomosSeccion } from './QuienesSomosSeccion';
import { BlogNovedadesSeccion } from './BlogNovedadesSeccion';
import { NoticiasJudicialesSeccion } from './NoticiasJudicialesSeccion';
import { RedesSocialesHub } from './RedesSocialesHub';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  Scale, ShieldCheck, Calendar, Users, 
  KeyRound, ArrowRight, Phone, MessageSquare, 
  MapPin, Clock, ExternalLink, Sparkles, Flame,
  CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';
import { INFO_QUIENES_SOMOS } from '../../data/sitioWebData';

interface PaginaPrincipalProps {
  onAbrirReservarCita: () => void;
  onAbrirLoginClientes: () => void;
  onAbrirLoginIntranet: () => void;
  onAbrirCalculadoraLegal: () => void;
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const PaginaPrincipal: React.FC<PaginaPrincipalProps> = ({
  onAbrirReservarCita,
  onAbrirLoginClientes,
  onAbrirLoginIntranet,
  onAbrirCalculadoraLegal,
  paleta,
  tamanoTexto,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. BANNER FOTOS DE GUAYAQUIL CON BOTONES CLAVE DE ACCIÓN Y ESTILO PORTADA DE REVISTA */}
      <BannerGuayaquil
        onAbrirReservarCita={onAbrirReservarCita}
        onAbrirLoginClientes={onAbrirLoginClientes}
        onAbrirLoginIntranet={onAbrirLoginIntranet}
        onIrAQuienesSomos={() => scrollToSection('quienes-somos')}
        paleta={paleta}
        tamanoTexto={tamanoTexto}
      />

      {/* 2. BARRA DE ACCESOS RÁPIDOS DESTACADOS TIPO MAGAZINE CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
        {/* Card 1: Reservar Cita / Contáctenos */}
        <button
          onClick={onAbrirReservarCita}
          style={{ 
            background: `linear-gradient(135deg, ${paleta.hexAcento}, ${paleta.hexPrimario})`,
            borderColor: `${paleta.hexAcento}90`
          }}
          className={`p-5 text-slate-950 font-black rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group cursor-pointer border ${paleta.tokens.cardBorderHover}`}
        >
          <div className="text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-90 block font-bold">
              Atención Directa
            </span>
            <span className={`font-black ${tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              Reservar Cita
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 text-slate-950" />
          </div>
        </button>

        {/* Card 2: Ingreso Clientes */}
        <button
          onClick={onAbrirLoginClientes}
          className="p-5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
              Expedientes & SATJE
            </span>
            <span className={`font-black text-slate-900 ${tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              Ingreso Clientes
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </button>

        {/* Card 3: Quiénes Somos */}
        <button
          onClick={() => scrollToSection('quienes-somos')}
          className="p-5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-bold">
              Sede Guayaquil
            </span>
            <span className={`font-black text-slate-900 ${tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              Quiénes Somos
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
        </button>

        {/* Card 4: Ingreso Intranet */}
        <button
          onClick={onAbrirLoginIntranet}
          style={{ borderColor: `${paleta.hexAcento}50` }}
          className="p-5 bg-slate-950 hover:bg-black text-white rounded-3xl shadow-lg transition-all flex items-center justify-between group cursor-pointer border"
        >
          <div className="text-left">
            <span 
              className="text-[10px] uppercase font-mono tracking-wider block font-bold"
              style={{ color: paleta.hexAcento }}
            >
              Equipo Litigante
            </span>
            <span 
              className={`font-black ${tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
              style={{ color: paleta.hexAcento }}
            >
              Ingreso Intranet
            </span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <KeyRound className="w-5 h-5" style={{ color: paleta.hexAcento }} />
          </div>
        </button>
      </div>

      {/* 3. RESEÑA DE QUIÉNES SOMOS & ÁREAS DE PRÁCTICA */}
      <QuienesSomosSeccion 
        onReservarCita={onAbrirReservarCita} 
        paleta={paleta}
        tamanoTexto={tamanoTexto}
      />

      {/* 4. BLOG DE NOVEDADES JURÍDICAS */}
      <BlogNovedadesSeccion 
        onReservarCita={onAbrirReservarCita} 
        paleta={paleta}
        tamanoTexto={tamanoTexto}
      />

      {/* 5. NOTICIAS DEL SISTEMA JUDICIAL ECUATORIANO (https://www.funcionjudicial.gob.ec/) */}
      <NoticiasJudicialesSeccion 
        paleta={paleta}
        tamanoTexto={tamanoTexto}
      />

      {/* 6. NOVEDADES EN REDES SOCIALES OFICIALES (CJ, CNJ, CCE) */}
      <RedesSocialesHub 
        paleta={paleta}
        tamanoTexto={tamanoTexto}
      />

      {/* 7. BANNER FINAL DE ACCIÓN INTERACTIVA CON GRADIENTE EDITORIAL */}
      <div 
        className="rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 text-center relative overflow-hidden my-12"
        style={{ background: `linear-gradient(135deg, ${paleta.hexOscuro}, #0f172a, ${paleta.hexPrimario}35)` }}
      >
        <div className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none ${paleta.tokens.heroGlow}`} />
        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold font-mono"
            style={{ backgroundColor: `${paleta.hexAcento}20`, borderColor: `${paleta.hexAcento}40`, color: paleta.hexAcento }}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>EXCELENCIA EN CADA ACTUACIÓN JUDICIAL</span>
          </div>

          <h3 className={`font-black font-display ${tamanoTexto === 'grande' ? 'text-2xl sm:text-5xl' : 'text-2xl sm:text-4xl'}`}>
            ¿Listo para llevar tu causa con la solidez de ACTIO LEGIS?
          </h3>

          <p className={`text-slate-300 leading-relaxed ${tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
            Agenda una cita con nuestros socios en nuestra sede de Guayaquil o inicia sesión en el portal de clientes para revisar el avance de tus procesos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onAbrirReservarCita}
              style={{ background: `linear-gradient(135deg, ${paleta.hexAcento}, ${paleta.hexPrimario})` }}
              className="px-6 py-3.5 text-slate-950 font-black rounded-2xl shadow-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Reservar Cita / Contáctenos</span>
            </button>

            <button
              onClick={onAbrirLoginClientes}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>Ingreso Clientes</span>
            </button>

            <button
              onClick={onAbrirLoginIntranet}
              className="px-6 py-3.5 bg-slate-950 hover:bg-black text-amber-300 font-bold rounded-2xl border border-amber-500/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Ingreso Intranet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
