import React, { useState } from 'react';
import { PaletaRevista, PALETAS_REVISTA, crearPaletaPersonalizada } from '../../types/paletasRevista';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';
import { 
  Palette, Sparkles, Check, ChevronDown, ChevronUp, 
  Type, Sliders, X, RefreshCw, Wand2, Eye
} from 'lucide-react';

interface SelectorPaletaRevistaProps {
  paletaActiva: PaletaRevista;
  onSeleccionarPaleta: (paleta: PaletaRevista) => void;
  tamanoTexto: 'normal' | 'grande';
  onCambiarTamanoTexto: (tamano: 'normal' | 'grande') => void;
}

export const SelectorPaletaRevista: React.FC<SelectorPaletaRevistaProps> = ({
  paletaActiva,
  onSeleccionarPaleta,
  tamanoTexto,
  onCambiarTamanoTexto,
}) => {
  const [modalPersonalizarAbierto, setModalPersonalizarAbierto] = useState(false);
  
  // Estados para el editor de paleta personalizada
  const [hexPrimario, setHexPrimario] = useState(paletaActiva.hexPrimario || '#EA580C');
  const [hexAcento, setHexAcento] = useState(paletaActiva.hexAcento || '#F59E0B');
  const [hexFondo, setHexFondo] = useState(paletaActiva.hexFondo || '#FAF6F0');
  const [hexOscuro, setHexOscuro] = useState(paletaActiva.hexOscuro || '#0A0D14');

  const aplicarPersonalizada = () => {
    const nueva = crearPaletaPersonalizada(
      hexPrimario,
      hexAcento,
      hexFondo,
      hexOscuro,
      'Paleta Personalizada'
    );
    onSeleccionarPaleta(nueva);
    try {
      localStorage.setItem('actio_legis_paleta_guardada', JSON.stringify(nueva));
    } catch {
      // Ignorar
    }
    setModalPersonalizarAbierto(false);
  };

  const seleccionarYGuardar = (p: PaletaRevista) => {
    onSeleccionarPaleta(p);
    setHexPrimario(p.hexPrimario);
    setHexAcento(p.hexAcento);
    setHexFondo(p.hexFondo);
    setHexOscuro(p.hexOscuro);
    try {
      localStorage.setItem('actio_legis_paleta_guardada', JSON.stringify(p));
    } catch {
      // Ignorar
    }
  };

  return (
    <>
      <div className="bg-white border-b border-slate-200/90 shadow-xs relative z-30 transition-all">
        {/* Barra horizontal en cabecera del sitio web */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Título de Línea Gráfica */}
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-black text-white text-xs shadow-xs">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 font-display">
                    Paleta Revista Web:
                  </span>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.2 rounded-md border border-orange-200">
                    {paletaActiva.nombre.split(' (')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Accesos directos a las 6 paletas de revista */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {PALETAS_REVISTA.map((paleta) => {
                const estaActiva = paleta.id === paletaActiva.id;
                return (
                  <button
                    key={paleta.id}
                    onClick={() => seleccionarYGuardar(paleta)}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      estaActiva
                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs ring-2 ring-offset-1 ring-slate-950'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                    title={paleta.descripcion}
                  >
                    {/* Swatches circulares */}
                    <div className="flex items-center -space-x-1">
                      {paleta.swatchColores.slice(0, 3).map((c, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-full border border-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium hidden lg:inline">
                      {paleta.nombre.split(' (')[0].split(' & ')[0]}
                    </span>
                    {estaActiva && (
                      <Check className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    )}
                  </button>
                );
              })}

              {/* Botón para Abrir Editor de Colores Personalizados (#HEX) */}
              <button
                onClick={() => setModalPersonalizarAbierto(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 shadow-xs transition-all cursor-pointer border border-amber-400/60"
                title="Ingresa tus códigos hexadecimales exactos (#HEX) o usa cuentagotas"
              >
                <Sliders className="w-3 h-3 text-slate-950" />
                <span className="text-[11px]">Personalizar #HEX</span>
              </button>

              {/* Tamaño de Texto para Accesibilidad */}
              <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
              <button
                onClick={() => onCambiarTamanoTexto(tamanoTexto === 'normal' ? 'grande' : 'normal')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                  tamanoTexto === 'grande'
                    ? 'bg-amber-500 text-slate-950 border-amber-600'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title="Aumentar tamaño de texto para adultos mayores"
              >
                <Type className="w-3 h-3" />
                <span>{tamanoTexto === 'grande' ? 'Texto A+' : 'Texto Normal'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE PERSONALIZACIÓN DE CÓDIGOS DE COLOR HEXADECIMALES */}
      {modalPersonalizarAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black text-amber-400 flex items-center justify-center shadow-md">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-display text-slate-900">
                    Personalizar Paleta de Colores
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ingresa los colores exactos de tu paleta o selecciónalos con el cuentagotas
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalPersonalizarAbierto(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Previsualización del Logo Oficial B&N con la paleta elegida */}
            <div 
              className="p-5 rounded-2xl border flex items-center justify-between shadow-xs transition-colors"
              style={{ backgroundColor: hexFondo, borderColor: hexPrimario }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                  Coherencia de Marca
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Logo Oficial en Blanco y Negro
                </span>
              </div>
              <div className="p-2 bg-black rounded-xl border border-white/20 shadow-md">
                <ActioLegisLogo variant="white" size="xs" />
              </div>
            </div>

            {/* Inputs de Colores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Color Primario */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                  <span>Color Primario (Titulares & Botones)</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: hexPrimario }} />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hexPrimario}
                    onChange={(e) => setHexPrimario(e.target.value)}
                    className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={hexPrimario}
                    onChange={(e) => setHexPrimario(e.target.value)}
                    placeholder="#EA580C"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* 2. Color de Acento */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                  <span>Color de Acento (Detalles & Citas)</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: hexAcento }} />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hexAcento}
                    onChange={(e) => setHexAcento(e.target.value)}
                    className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={hexAcento}
                    onChange={(e) => setHexAcento(e.target.value)}
                    placeholder="#F59E0B"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* 3. Color de Fondo */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                  <span>Color de Fondo (Papel de Revista)</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: hexFondo }} />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hexFondo}
                    onChange={(e) => setHexFondo(e.target.value)}
                    className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={hexFondo}
                    onChange={(e) => setHexFondo(e.target.value)}
                    placeholder="#FAF6F0"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              {/* 4. Color Oscuro Base */}
              <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                  <span>Color Oscuro (Cintillo & Marcos)</span>
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: hexOscuro }} />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={hexOscuro}
                    onChange={(e) => setHexOscuro(e.target.value)}
                    className="w-9 h-9 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={hexOscuro}
                    onChange={(e) => setHexOscuro(e.target.value)}
                    placeholder="#0A0D14"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Presets Rápidos dentro del Modal */}
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                O elegir entre combinaciones recomendadas:
              </span>
              <div className="flex flex-wrap gap-2">
                {PALETAS_REVISTA.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setHexPrimario(p.hexPrimario);
                      setHexAcento(p.hexAcento);
                      setHexFondo(p.hexFondo);
                      setHexOscuro(p.hexOscuro);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hexPrimario }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.hexAcento }} />
                    <span>{p.nombre.split(' (')[0].split(' & ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones de Guardar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setModalPersonalizarAbierto(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={aplicarPersonalizada}
                className="px-6 py-2.5 bg-slate-950 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2 border border-slate-800"
              >
                <Check className="w-4 h-4 text-amber-400" />
                <span>Aplicar a Toda la Página Web</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
