import React, { useState } from 'react';
import { NOTICIAS_JUDICIALES, NoticiaJudicial } from '../../data/sitioWebData';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  Building2, ExternalLink, Calendar, ShieldCheck, 
  ArrowRight, FileText, CheckCircle, Scale, AlertCircle,
  X, Landmark, Newspaper
} from 'lucide-react';

interface NoticiasJudicialesSeccionProps {
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const NoticiasJudicialesSeccion: React.FC<NoticiasJudicialesSeccionProps> = ({
  paleta,
  tamanoTexto
}) => {
  const [noticiaModal, setNoticiaModal] = useState<NoticiaJudicial | null>(null);

  return (
    <section id="noticias-judiciales" className="py-12 sm:py-16 scroll-mt-20">
      {/* Encabezado con Rótulo Periodístico Institucional */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 border ${paleta.tokens.highlightBadge}`}>
            <Landmark className="w-3.5 h-3.5" />
            <span>SISTEMA JUDICIAL ECUATORIANO • GACETA OFICIAL</span>
          </div>
          <h2 className={`font-black font-display text-slate-900 tracking-tight ${
            tamanoTexto === 'grande' ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}>
            Noticias y Resoluciones de la Función Judicial
          </h2>
          <p className={`text-slate-600 mt-2 max-w-2xl leading-relaxed ${
            tamanoTexto === 'grande' ? 'text-lg' : 'text-base'
          }`}>
            Actualizaciones oficiales del Consejo de la Judicatura, Corte Nacional de Justicia y Corte Constitucional del Ecuador.
          </p>
        </div>

        {/* Enlace directo a funcionjudicial.gob.ec */}
        <a
          href="https://www.funcionjudicial.gob.ec/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-2xl transition-all shadow-xs hover:shadow group w-fit cursor-pointer hover:border-slate-400"
        >
          <span>Portal Oficial funcionjudicial.gob.ec</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: paleta.hexPrimario }} />
        </a>
      </div>

      {/* Grid de Noticias Judiciales con Estilo Editorial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {NOTICIAS_JUDICIALES.map((noticia) => (
          <div
            key={noticia.id}
            className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row group ${paleta.tokens.cardBorderHover}`}
          >
            {/* Imagen Lateral con Ribbon de Entidad */}
            <div className="sm:w-5/12 h-52 sm:h-auto relative overflow-hidden bg-slate-900 shrink-0">
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50" />
              <div 
                className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-white/10 font-mono shadow-md"
                style={{ color: paleta.hexAcento }}
              >
                {noticia.badge}
              </div>
            </div>

            {/* Contenido de la Noticia */}
            <div className="p-6 sm:w-7/12 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="font-bold text-slate-700">{noticia.entidad}</span>
                  <span>{noticia.fecha}</span>
                </div>

                <h3 className={`font-black text-slate-900 leading-snug transition-colors mb-2 ${
                  tamanoTexto === 'grande' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}>
                  {noticia.titulo}
                </h3>

                <p className={`text-slate-600 leading-relaxed line-clamp-3 ${
                  tamanoTexto === 'grande' ? 'text-sm' : 'text-xs sm:text-sm'
                }`}>
                  {noticia.resumen}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[130px] font-mono">
                  {noticia.fuente}
                </span>

                <button
                  onClick={() => setNoticiaModal(noticia)}
                  style={{ color: paleta.hexPrimario }}
                  className="inline-flex items-center gap-1.5 text-xs font-black group-hover:translate-x-1 transition-all cursor-pointer hover:opacity-80"
                >
                  <span>Ver Resolución</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detallado de Noticia Judicial */}
      {noticiaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-2 border"
                  style={{ backgroundColor: `${paleta.hexPrimario}15`, color: paleta.hexPrimario, borderColor: `${paleta.hexPrimario}30` }}
                >
                  {noticiaModal.entidad}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight font-display">
                  {noticiaModal.titulo}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Fecha: {noticiaModal.fecha} • Fuente: {noticiaModal.fuente}
                </p>
              </div>
              <button
                onClick={() => setNoticiaModal(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-56">
              <img
                src={noticiaModal.imagen}
                alt={noticiaModal.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                {noticiaModal.resumen}
              </p>
              <p>
                {noticiaModal.contenido}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <a
                href={noticiaModal.urlFuente}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>Consultar Fuente Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setNoticiaModal(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
