import React, { useState, useEffect } from 'react';
import { FOTOS_GUAYAQUIL, FotoGuayaquil } from '../../data/sitioWebData';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  ChevronLeft, ChevronRight, MapPin, Calendar, 
  Users, KeyRound, Sparkles, PhoneCall, ShieldCheck,
  Newspaper, ArrowUpRight, Flame
} from 'lucide-react';

interface BannerGuayaquilProps {
  onAbrirReservarCita: () => void;
  onAbrirLoginClientes: () => void;
  onAbrirLoginIntranet: () => void;
  onIrAQuienesSomos: () => void;
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const BannerGuayaquil: React.FC<BannerGuayaquilProps> = ({
  onAbrirReservarCita,
  onAbrirLoginClientes,
  onAbrirLoginIntranet,
  onIrAQuienesSomos,
  paleta,
  tamanoTexto,
}) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play de las fotos de Guayaquil cada 6 segundos
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % FOTOS_GUAYAQUIL.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const fotoActual: FotoGuayaquil = FOTOS_GUAYAQUIL[indiceActual];

  const siguiente = () => {
    setIndiceActual((prev) => (prev + 1) % FOTOS_GUAYAQUIL.length);
  };

  const anterior = () => {
    setIndiceActual((prev) => (prev - 1 + FOTOS_GUAYAQUIL.length) % FOTOS_GUAYAQUIL.length);
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/30 bg-slate-950 mb-10 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Marquesina Superior Estilo Revista de Alta Gama */}
      <div className="bg-black/90 border-b border-white/10 px-4 py-2 flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-300">
        <div className="flex items-center gap-2">
          <span 
            className="px-2 py-0.5 rounded font-black text-[10px] uppercase text-white shadow-xs"
            style={{ backgroundColor: paleta.hexPrimario }}
          >
            PORTADA CENTRAL
          </span>
          <span className="font-semibold text-white">EDICIÓN GUAYAQUIL • LITIGIO ESTRATÉGICO & INTRANET</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Guayaquil, Ecuador</span>
          </span>
          <span>•</span>
          <span className="text-amber-300 font-bold">24/7 Monitoreo SATJE</span>
        </div>
      </div>

      {/* Imagen de Fondo con Transición y Overlays de Gradiente */}
      <div className="relative h-[530px] sm:h-[590px] lg:h-[640px] w-full overflow-hidden">
        {FOTOS_GUAYAQUIL.map((foto, index) => (
          <div
            key={foto.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === indiceActual ? 'opacity-100 scale-105 transition-transform duration-10000' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          >
            <img
              src={foto.url}
              alt={foto.titulo}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Gradientes dinámicos adaptados según la paleta seleccionada */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${paleta.tokens.heroGlow}`} />

        {/* Badge de Ubicación Guayaquil en Vivo */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-semibold text-slate-100 shadow-xl">
          <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>{fotoActual.lugar}</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* Etiqueta del Lugar y Controles de Carousel Superiores */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
          <span className="hidden sm:inline-block bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
            {fotoActual.tag}
          </span>
          <div className="flex items-center gap-1 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-xl">
            <button
              onClick={anterior}
              aria-label="Foto anterior de Guayaquil"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs px-2 font-mono text-slate-200 font-bold">
              {indiceActual + 1} / {FOTOS_GUAYAQUIL.length}
            </span>
            <button
              onClick={siguiente}
              aria-label="Siguiente foto de Guayaquil"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido Principal del Hero Banner con Tratamiento Editorial de Revista */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-14 max-w-4xl">
          {/* Logo Oficial ACTIO LEGIS destacado con su marco arquitectónico */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="p-1.5 bg-black rounded-xl backdrop-blur-sm border border-white/25 shadow-2xl">
              <ActioLegisLogo variant="white" size="xs" />
            </div>
            <div>
              <div 
                className="flex items-center gap-2 text-xs font-black uppercase tracking-wider"
                style={{ color: paleta.hexAcento }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ESTUDIO JURÍDICO & LITIGIO ESTRATÉGICO EN GUAYAQUIL</span>
              </div>
              <span className="text-[11px] text-slate-300 font-mono">
                Tribunales Provinciales • Corte Nacional • Corte Constitucional
              </span>
            </div>
          </div>

          {/* Titular Editorial Audaz */}
          <h1 className={`font-black font-display tracking-tight text-white leading-tight mb-4 drop-shadow-lg ${
            tamanoTexto === 'grande' ? 'text-3xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-5xl lg:text-5xl'
          }`}>
            Defensa implacable. <br className="hidden sm:inline" />
            <span 
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, #ffffff, #f8fafc, ${paleta.hexAcento})` }}
            >
              Justicia ágil para la nueva era.
            </span>
          </h1>

          <p className={`text-slate-200 max-w-2xl font-normal leading-relaxed mb-7 drop-shadow-md ${
            tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
          }`}>
            Patrocinio de vanguardia en Guayaquil y tribunales del Ecuador. Unimos doctrina de alto nivel ante la Corte Nacional y Corte Constitucional con seguimiento digital del SATJE en tiempo real.
          </p>

          {/* BOTONES PRINCIPALES DE ACCIÓN LLAMATIVOS Y AMIGABLES */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            {/* 1. Reservar Cita / Contáctenos */}
            <button
              onClick={onAbrirReservarCita}
              style={{ background: `linear-gradient(135deg, ${paleta.hexAcento}, ${paleta.hexPrimario})` }}
              className={`group relative flex items-center gap-2.5 px-6 py-4 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                tamanoTexto === 'grande' ? 'text-base' : 'text-sm'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Reservar Cita / Contáctenos</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* 2. Ingreso Clientes */}
            <button
              onClick={onAbrirLoginClientes}
              className={`flex items-center gap-2 px-5 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl backdrop-blur-md border border-white/25 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                tamanoTexto === 'grande' ? 'text-base' : 'text-sm'
              }`}
            >
              <Users className="w-4 h-4 text-sky-300" />
              <span>Ingreso Clientes</span>
            </button>

            {/* 3. Quiénes Somos */}
            <button
              onClick={onIrAQuienesSomos}
              className={`flex items-center gap-2 px-5 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-100 hover:text-white font-bold rounded-2xl backdrop-blur-md border border-white/15 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                tamanoTexto === 'grande' ? 'text-base' : 'text-sm'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Quiénes Somos</span>
            </button>

            {/* 4. Ingreso Intranet (Equipo ACTIO LEGIS) */}
            <button
              onClick={onAbrirLoginIntranet}
              style={{ borderColor: `${paleta.hexAcento}80`, color: paleta.hexAcento }}
              className={`flex items-center gap-2 px-5 py-4 bg-slate-950/95 hover:bg-black font-bold rounded-2xl border shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                tamanoTexto === 'grande' ? 'text-base' : 'text-sm'
              }`}
            >
              <KeyRound className="w-4 h-4" style={{ color: paleta.hexAcento }} />
              <span>Ingreso Intranet</span>
            </button>
          </div>
        </div>

        {/* Indicadores de Miniaturas de las Fotos de Guayaquil */}
        <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-xl">
          {FOTOS_GUAYAQUIL.map((foto, idx) => (
            <button
              key={foto.id}
              onClick={() => setIndiceActual(idx)}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                idx === indiceActual
                  ? 'ring-2 ring-amber-400 scale-105 shadow-md w-14 h-10'
                  : 'opacity-50 hover:opacity-90 w-11 h-9'
              }`}
              title={foto.titulo}
            >
              <img src={foto.url} alt={foto.titulo} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
