import React, { useState } from 'react';
import { CANALES_OFICIALES, NOVEDADES_REDES, PostRedSocial } from '../../data/sitioWebData';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  Share2, ExternalLink, Heart, Repeat, Eye, 
  CheckCircle, Play, Sparkles, MessageCircle, Radio
} from 'lucide-react';

interface RedesSocialesHubProps {
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const RedesSocialesHub: React.FC<RedesSocialesHubProps> = ({
  paleta,
  tamanoTexto
}) => {
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<string>('Todas');

  const entidades = ['Todas', 'Consejo de la Judicatura', 'Corte Nacional de Justicia', 'Corte Constitucional del Ecuador'];

  const postsFiltrados = NOVEDADES_REDES.filter((post) => {
    if (entidadSeleccionada === 'Todas') return true;
    return post.entidad === entidadSeleccionada;
  });

  return (
    <section id="redes-oficiales" className="py-12 sm:py-16 scroll-mt-20">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 border ${paleta.tokens.editorialPill}`}>
            <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>PULSO DIGITAL EN VIVO • CANALES OFICIALES DE LA JUDICATURA</span>
          </div>
          <h2 className={`font-black font-display text-slate-900 tracking-tight ${
            tamanoTexto === 'grande' ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}>
            Novedades en Redes del Ecosistema Judicial
          </h2>
          <p className={`text-slate-600 mt-2 max-w-2xl leading-relaxed ${
            tamanoTexto === 'grande' ? 'text-lg' : 'text-base'
          }`}>
            Sigue las cuentas verificadas oficiales del Consejo de la Judicatura, Corte Nacional y Corte Constitucional en Twitter/X, Facebook, YouTube e Instagram.
          </p>
        </div>
      </div>

      {/* Tarjetas de Canales Oficiales con Enlaces Directos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CANALES_OFICIALES.map((canal) => (
          <div
            key={canal.siglas}
            className={`bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${paleta.tokens.cardBorderHover}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="font-mono text-xs font-black px-2.5 py-1 rounded-md border"
                  style={{ backgroundColor: `${paleta.hexPrimario}15`, color: paleta.hexPrimario, borderColor: `${paleta.hexPrimario}30` }}
                >
                  {canal.siglas}
                </span>
                <a
                  href={canal.sitioWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-900 text-xs flex items-center gap-1 font-semibold"
                >
                  <span>Portal Web</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <h3 className="font-black text-slate-900 text-base mb-2">
                {canal.entidad}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {canal.descripcion}
              </p>
            </div>

            {/* Iconos de Redes con Enlaces Reales */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              {canal.canales.x && (
                <a
                  href={canal.canales.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter) Oficial"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-black hover:text-white rounded-xl text-xs font-bold text-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <span className="font-mono font-black">𝕏</span>
                  <span>Twitter</span>
                </a>
              )}

              {canal.canales.facebook && (
                <a
                  href={canal.canales.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook Oficial"
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold text-blue-700 transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                </a>
              )}

              {canal.canales.youtube && (
                <a
                  href={canal.canales.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Canal YouTube Oficial"
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold text-red-700 transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>YouTube</span>
                </a>
              )}

              {canal.canales.instagram && (
                <a
                  href={canal.canales.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram Oficial"
                  className="px-3 py-1.5 bg-pink-50 hover:bg-pink-600 hover:text-white rounded-xl text-xs font-bold text-pink-700 transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filtro de Entidades para los Posts */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {entidades.map((ent) => (
          <button
            key={ent}
            onClick={() => setEntidadSeleccionada(ent)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              entidadSeleccionada === ent
                ? 'bg-slate-950 text-white shadow-md ring-2 ring-slate-900 ring-offset-1'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {ent}
          </button>
        ))}
      </div>

      {/* Grid de Posts / Comunicados en Redes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsFiltrados.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${paleta.tokens.cardBorderHover}`}
          >
            <div>
              {/* Header del Post */}
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.entidad}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-xs truncate">
                      {post.entidad}
                    </span>
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>{post.handle}</span>
                    <span>•</span>
                    <span>{post.fecha}</span>
                  </div>
                </div>

                <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-black">
                  {post.red.toUpperCase()}
                </span>
              </div>

              {/* Texto del Comunicado */}
              <p className={`text-slate-800 leading-relaxed mb-4 ${
                tamanoTexto === 'grande' ? 'text-sm' : 'text-xs sm:text-sm'
              }`}>
                {post.texto}
              </p>

              {/* Multimedia si existe */}
              {post.multimedia && (
                <div className="rounded-2xl overflow-hidden mb-4 border border-slate-200">
                  <img
                    src={post.multimedia.url}
                    alt="Multimedia comunicado"
                    className="w-full h-40 object-cover"
                  />
                  {post.multimedia.caption && (
                    <div className="p-2.5 bg-slate-50 text-[11px] text-slate-600 font-medium">
                      {post.multimedia.caption}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Interacciones y Enlace Oficial */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                {post.interacciones.likes && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>{post.interacciones.likes}</span>
                  </span>
                )}
                {post.interacciones.reposts && (
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{post.interacciones.reposts}</span>
                  </span>
                )}
              </div>

              <a
                href={post.linkOficial}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Ver Publicación</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
