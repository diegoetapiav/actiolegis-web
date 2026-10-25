import React, { useState } from 'react';
import { ARTICULOS_BLOG, ArticuloBlog } from '../../data/sitioWebData';
import { PaletaRevista } from '../../types/paletasRevista';
import { 
  BookOpen, Clock, Calendar, User, Tag, 
  ArrowRight, X, Share2, Sparkles, Search, MessageSquare,
  Newspaper, CheckCircle2, Bookmark
} from 'lucide-react';

interface BlogNovedadesSeccionProps {
  onReservarCita: () => void;
  paleta: PaletaRevista;
  tamanoTexto: 'normal' | 'grande';
}

export const BlogNovedadesSeccion: React.FC<BlogNovedadesSeccionProps> = ({ 
  onReservarCita,
  paleta,
  tamanoTexto,
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [articuloLectura, setArticuloLectura] = useState<ArticuloBlog | null>(null);

  const categorias = ['Todas', 'Derecho Procesal', 'Societario & Negocios', 'Protección de Datos'];

  const articulosFiltrados = ARTICULOS_BLOG.filter((art) => {
    const coincideCat = categoriaSeleccionada === 'Todas' || art.categoria === categoriaSeleccionada;
    const coincideBusqueda = 
      art.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      art.extracto.toLowerCase().includes(busqueda.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(busqueda.toLowerCase()));
    return coincideCat && coincideBusqueda;
  });

  return (
    <section id="blog-novedades" className="py-12 sm:py-16 scroll-mt-20">
      {/* Encabezado Estilo Revista */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 border ${paleta.tokens.editorialPill}`}>
            <Newspaper className="w-3.5 h-3.5" />
            <span>BLOG DE NOVEDADES • CRITERIO JURÍDICO & TRIBUNA</span>
          </div>
          <h2 className={`font-black font-display text-slate-900 tracking-tight ${
            tamanoTexto === 'grande' ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}>
            Análisis, jurisprudencia y tendencias del derecho ecuatoriano
          </h2>
          <p className={`text-slate-600 mt-2 max-w-2xl leading-relaxed ${
            tamanoTexto === 'grande' ? 'text-lg' : 'text-base'
          }`}>
            Artículos redactados por los abogados de ACTIO LEGIS para orientar a empresarios, ciudadanos y la comunidad jurídica de Guayaquil.
          </p>
        </div>

        {/* Buscador Rápido de Artículos */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tema, COGEP, SATJE, casación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Filtros de Categoría con Estilo Pestañas de Revista */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        {categorias.map((cat) => {
          const seleccionada = categoriaSeleccionada === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                seleccionada
                  ? 'bg-slate-950 text-white shadow-md ring-2 ring-slate-900 ring-offset-1'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid de Artículos de Revista con Portadas Vibrantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articulosFiltrados.map((articulo) => (
          <article
            key={articulo.id}
            className={`bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group ${paleta.tokens.cardBorderHover}`}
          >
            {/* Imagen de Cabecera con Badge de Categoría */}
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src={articulo.imagen}
                alt={articulo.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
              
              <div 
                className="absolute top-3.5 left-3.5 bg-slate-950/90 backdrop-blur-md text-xs font-black px-3 py-1 rounded-xl border border-white/10 shadow-lg"
                style={{ color: paleta.hexAcento }}
              >
                {articulo.categoria}
              </div>

              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-slate-200 text-[11px] font-mono px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" style={{ color: paleta.hexAcento }} />
                <span>{articulo.tiempoLectura}</span>
              </div>
            </div>

            {/* Contenido Editorial del Artículo */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                  <span>{articulo.fecha}</span>
                  <span className="text-slate-300">ACTIO LEGIS BLOG</span>
                </div>

                <h3 className={`font-black text-slate-900 leading-snug transition-colors mb-3 ${
                  tamanoTexto === 'grande' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                }`}>
                  {articulo.titulo}
                </h3>

                <p className={`text-slate-600 leading-relaxed line-clamp-3 ${
                  tamanoTexto === 'grande' ? 'text-sm' : 'text-xs sm:text-sm'
                }`}>
                  {articulo.extracto}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={articulo.avatarAutor}
                    alt={articulo.autor}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-800 leading-tight">
                      {articulo.autor}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {articulo.cargoAutor}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setArticuloLectura(articulo)}
                  style={{ backgroundColor: `${paleta.hexPrimario}15`, color: paleta.hexPrimario }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-900 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Leer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de Lectura Enriquecido */}
      {articuloLectura && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header del Modal */}
            <div className="relative h-64 overflow-hidden bg-slate-900">
              <img
                src={articuloLectura.imagen}
                alt={articuloLectura.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setArticuloLectura(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase font-mono mb-2">
                  {articuloLectura.categoria}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight font-display">
                  {articuloLectura.titulo}
                </h2>
              </div>
            </div>

            {/* Metadatos y Autor */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={articuloLectura.avatarAutor}
                    alt={articuloLectura.autor}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-900"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {articuloLectura.autor}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      {articuloLectura.cargoAutor} • {articuloLectura.fecha}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{articuloLectura.tiempoLectura} de lectura</span>
                  </span>
                </div>
              </div>

              {/* Párrafos del artículo */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                {articuloLectura.contenidoCompleto.map((parrafo, i) => (
                  <p key={i} className="text-justify">
                    {parrafo}
                  </p>
                ))}
              </div>

              {/* Tags del Artículo */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {articuloLectura.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Llamado a la Acción para Cita Legal */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm">¿Deseas consultar este tema con el autor?</h4>
                  <p className="text-xs text-slate-400">Reserva una sesión jurídica presencial en Guayaquil o virtual.</p>
                </div>
                <button
                  onClick={() => {
                    setArticuloLectura(null);
                    onReservarCita();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r ${paleta.tokens.accentGradient} text-slate-950 shrink-0 cursor-pointer`}
                >
                  Reservar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
