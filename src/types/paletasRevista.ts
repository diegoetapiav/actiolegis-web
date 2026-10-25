export interface PaletaRevista {
  id: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  swatchColores: string[]; // Muestra visual de los 5 tonos
  hexPrimario: string;
  hexAcento: string;
  hexFondo: string;
  hexOscuro: string;
  tokens: {
    bgBody: string;
    bgNavbarCintillo: string;
    primaryText: string;
    primaryBg: string;
    primaryBorder: string;
    primaryGradient: string;
    accentBg: string;
    accentText: string;
    accentBorder: string;
    accentGradient: string;
    highlightBadge: string;
    editorialPill: string;
    cardBorderHover: string;
    heroGradientOverlay: string;
    heroGlow: string;
    quoteBorder: string;
    ribbonColor: string;
  };
}

export const PALETAS_REVISTA: PaletaRevista[] = [
  {
    id: 'terracota-editorial',
    nombre: 'Terracota & Ámbar (Revista de Vanguardia)',
    tagline: 'Estilo editorial de alta gama, cálido, audaz y contemporáneo',
    descripcion: 'Terracota quemado (#EA580C) con Oro Ámbar (#F59E0B), Papel Marfil (#FAF6F0) y Negro Carbón. Destaca con fuerza sobre el logo blanco y negro, creando un estilo de revista jurídica sofisticado y magnético.',
    swatchColores: ['#0A0D14', '#EA580C', '#F59E0B', '#FAF6F0', '#FFFFFF'],
    hexPrimario: '#EA580C',
    hexAcento: '#F59E0B',
    hexFondo: '#FAF6F0',
    hexOscuro: '#0A0D14',
    tokens: {
      bgBody: 'bg-[#FAF6F0]',
      bgNavbarCintillo: 'bg-[#0E0A08]',
      primaryText: 'text-orange-600',
      primaryBg: 'bg-orange-600 hover:bg-orange-700',
      primaryBorder: 'border-orange-600',
      primaryGradient: 'from-orange-600 via-amber-600 to-orange-700',
      accentBg: 'bg-amber-500 hover:bg-amber-400',
      accentText: 'text-amber-600',
      accentBorder: 'border-amber-400',
      accentGradient: 'from-orange-500 via-amber-500 to-yellow-500',
      highlightBadge: 'bg-orange-50 text-orange-800 border-orange-200',
      editorialPill: 'bg-amber-50 text-amber-900 border-amber-200',
      cardBorderHover: 'hover:border-orange-500 hover:shadow-orange-500/15',
      heroGradientOverlay: 'from-[#0E0A08]/95 via-orange-950/70 to-transparent',
      heroGlow: 'bg-orange-500/25',
      quoteBorder: 'border-orange-500',
      ribbonColor: 'bg-orange-600 text-white',
    }
  },
  {
    id: 'guayaquil-celeste-sol',
    nombre: 'Guayaquil Celeste & Sol (Identidad del Puerto)',
    tagline: 'Inspirado en la bandera y luz de Guayaquil con tecnología digital',
    descripcion: 'Azul Celeste Guayaquileño (#0284C7) combinado con Amarillo Solar (#FACC15), Azul Océano (#0369A1) y Negro Arquitectónico.',
    swatchColores: ['#0A1128', '#0284C7', '#FACC15', '#E0F2FE', '#FFFFFF'],
    hexPrimario: '#0284C7',
    hexAcento: '#FACC15',
    hexFondo: '#F0F9FF',
    hexOscuro: '#0A1128',
    tokens: {
      bgBody: 'bg-[#F0F9FF]/50',
      bgNavbarCintillo: 'bg-[#0A1128]',
      primaryText: 'text-sky-600',
      primaryBg: 'bg-sky-600 hover:bg-sky-700',
      primaryBorder: 'border-sky-500',
      primaryGradient: 'from-sky-600 via-cyan-600 to-blue-700',
      accentBg: 'bg-yellow-400 hover:bg-yellow-300',
      accentText: 'text-amber-600',
      accentBorder: 'border-yellow-400',
      accentGradient: 'from-yellow-400 via-amber-400 to-orange-400',
      highlightBadge: 'bg-sky-50 text-sky-800 border-sky-200',
      editorialPill: 'bg-yellow-50 text-yellow-900 border-yellow-200',
      cardBorderHover: 'hover:border-sky-400 hover:shadow-sky-500/15',
      heroGradientOverlay: 'from-[#0A1128]/95 via-sky-950/70 to-transparent',
      heroGlow: 'bg-sky-400/25',
      quoteBorder: 'border-yellow-400',
      ribbonColor: 'bg-sky-600 text-white',
    }
  },
  {
    id: 'tribuna-borgona',
    nombre: 'Borgoña & Oro Imperial (Harvard Law / The Economist)',
    tagline: 'Poder, solemnidad y elegancia editorial centenaria',
    descripcion: 'Vino Tinto / Borgoña (#9F1239) con Oro Viejo Imperial (#D97706) y Negro Carbón. Altísima sofisticación que inspira respeto instantáneo.',
    swatchColores: ['#12080D', '#9F1239', '#D97706', '#FAF7F5', '#FFFFFF'],
    hexPrimario: '#9F1239',
    hexAcento: '#D97706',
    hexFondo: '#FAF7F5',
    hexOscuro: '#12080D',
    tokens: {
      bgBody: 'bg-[#FAF7F5]',
      bgNavbarCintillo: 'bg-[#180B10]',
      primaryText: 'text-rose-700',
      primaryBg: 'bg-rose-700 hover:bg-rose-800',
      primaryBorder: 'border-rose-700',
      primaryGradient: 'from-rose-800 via-rose-700 to-pink-900',
      accentBg: 'bg-amber-600 hover:bg-amber-500',
      accentText: 'text-amber-700',
      accentBorder: 'border-amber-500',
      accentGradient: 'from-amber-600 via-amber-500 to-yellow-600',
      highlightBadge: 'bg-rose-50 text-rose-800 border-rose-200',
      editorialPill: 'bg-amber-50 text-amber-800 border-amber-200',
      cardBorderHover: 'hover:border-rose-600 hover:shadow-rose-600/15',
      heroGradientOverlay: 'from-[#180B10]/95 via-rose-950/70 to-transparent',
      heroGlow: 'bg-rose-600/20',
      quoteBorder: 'border-rose-700',
      ribbonColor: 'bg-rose-700 text-white',
    }
  },
  {
    id: 'cobalto-mandarina',
    nombre: 'Cobalto Eléctrico & Mandarina (Revista Tech / Dinámica)',
    tagline: 'Impacto visual electrizante para nuevas generaciones',
    descripcion: 'Azul Cobalto Eléctrico (#2563EB) con Mandarina Neón (#F97316) y Negro Profundo. Genera contraste inmediato y altísima legibilidad.',
    swatchColores: ['#050814', '#2563EB', '#F97316', '#F8FAFC', '#FFFFFF'],
    hexPrimario: '#2563EB',
    hexAcento: '#F97316',
    hexFondo: '#F8FAFC',
    hexOscuro: '#050814',
    tokens: {
      bgBody: 'bg-[#F8FAFC]',
      bgNavbarCintillo: 'bg-[#050814]',
      primaryText: 'text-blue-600',
      primaryBg: 'bg-blue-600 hover:bg-blue-700',
      primaryBorder: 'border-blue-600',
      primaryGradient: 'from-blue-600 via-indigo-600 to-blue-800',
      accentBg: 'bg-orange-500 hover:bg-orange-400',
      accentText: 'text-orange-600',
      accentBorder: 'border-orange-400',
      accentGradient: 'from-orange-500 via-amber-500 to-yellow-400',
      highlightBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      editorialPill: 'bg-orange-50 text-orange-800 border-orange-200',
      cardBorderHover: 'hover:border-blue-500 hover:shadow-blue-500/15',
      heroGradientOverlay: 'from-[#050814]/95 via-blue-950/70 to-transparent',
      heroGlow: 'bg-blue-500/20',
      quoteBorder: 'border-orange-500',
      ribbonColor: 'bg-blue-600 text-white',
    }
  },
  {
    id: 'esmeralda-citrino',
    nombre: 'Magistratura Esmeralda (Jade & Citrino)',
    tagline: 'Fuerza ética, transparencia judicial y modernidad serena',
    descripcion: 'Verde Esmeralda (#047857) con Oro Citrino (#F59E0B) y Blanco Marfil. Estética noble, fresca y de gran equilibrio visual.',
    swatchColores: ['#081711', '#047857', '#F59E0B', '#F2FAF5', '#FFFFFF'],
    hexPrimario: '#047857',
    hexAcento: '#F59E0B',
    hexFondo: '#F2FAF5',
    hexOscuro: '#081711',
    tokens: {
      bgBody: 'bg-[#F2FAF5]/60',
      bgNavbarCintillo: 'bg-[#081711]',
      primaryText: 'text-emerald-700',
      primaryBg: 'bg-emerald-700 hover:bg-emerald-800',
      primaryBorder: 'border-emerald-600',
      primaryGradient: 'from-emerald-700 via-teal-700 to-emerald-900',
      accentBg: 'bg-amber-500 hover:bg-amber-400',
      accentText: 'text-amber-600',
      accentBorder: 'border-amber-400',
      accentGradient: 'from-amber-500 via-amber-400 to-yellow-500',
      highlightBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      editorialPill: 'bg-amber-50 text-amber-800 border-amber-200',
      cardBorderHover: 'hover:border-emerald-500 hover:shadow-emerald-500/15',
      heroGradientOverlay: 'from-[#081711]/95 via-emerald-950/70 to-transparent',
      heroGlow: 'bg-emerald-500/20',
      quoteBorder: 'border-emerald-600',
      ribbonColor: 'bg-emerald-700 text-white',
    }
  },
  {
    id: 'monocromo-oro-real',
    nombre: 'Monocromo Élite & Oro Real (Arquitectónico Puro)',
    tagline: 'Negro puro, blanco mármol y acentos en pan de oro',
    descripcion: 'Máxima coherencia con el logo arquitectónico: Blanco y Negro con un solo acento radiante en Oro Puro (#D4AF37).',
    swatchColores: ['#000000', '#D4AF37', '#1F2937', '#F9FAFB', '#FFFFFF'],
    hexPrimario: '#111827',
    hexAcento: '#D4AF37',
    hexFondo: '#F9FAFB',
    hexOscuro: '#000000',
    tokens: {
      bgBody: 'bg-[#F9FAFB]',
      bgNavbarCintillo: 'bg-[#000000]',
      primaryText: 'text-slate-900',
      primaryBg: 'bg-slate-950 hover:bg-black',
      primaryBorder: 'border-slate-900',
      primaryGradient: 'from-slate-950 via-slate-900 to-black',
      accentBg: 'bg-amber-500 hover:bg-amber-400',
      accentText: 'text-amber-500',
      accentBorder: 'border-amber-400',
      accentGradient: 'from-amber-400 via-yellow-500 to-amber-600',
      highlightBadge: 'bg-slate-100 text-slate-900 border-slate-300',
      editorialPill: 'bg-amber-50 text-amber-900 border-amber-300',
      cardBorderHover: 'hover:border-amber-400 hover:shadow-amber-500/15',
      heroGradientOverlay: 'from-black/95 via-slate-950/75 to-transparent',
      heroGlow: 'bg-amber-400/20',
      quoteBorder: 'border-amber-400',
      ribbonColor: 'bg-slate-950 text-white',
    }
  }
];

// Función utilitaria para crear una paleta personalizada con códigos hexadecimales exactos
export function crearPaletaPersonalizada(
  hexPrimario: string,
  hexAcento: string,
  hexFondo: string = '#FAF8F5',
  hexOscuro: string = '#0A0D14',
  nombre: string = 'Mi Paleta Personalizada'
): PaletaRevista {
  return {
    id: 'personalizada-usuario',
    nombre,
    tagline: 'Paleta configurada con tus colores exactos',
    descripcion: `Colores personalizados: Primario ${hexPrimario}, Acento ${hexAcento}, Fondo ${hexFondo}, Base ${hexOscuro}.`,
    swatchColores: [hexOscuro, hexPrimario, hexAcento, hexFondo, '#FFFFFF'],
    hexPrimario,
    hexAcento,
    hexFondo,
    hexOscuro,
    tokens: {
      bgBody: 'bg-slate-50',
      bgNavbarCintillo: 'bg-slate-950',
      primaryText: 'text-orange-600',
      primaryBg: 'bg-slate-900 hover:bg-black',
      primaryBorder: 'border-orange-600',
      primaryGradient: 'from-orange-600 to-amber-600',
      accentBg: 'bg-amber-500 hover:bg-amber-400',
      accentText: 'text-amber-600',
      accentBorder: 'border-amber-400',
      accentGradient: 'from-orange-500 to-amber-400',
      highlightBadge: 'bg-orange-50 text-orange-800 border-orange-200',
      editorialPill: 'bg-amber-50 text-amber-900 border-amber-200',
      cardBorderHover: 'hover:border-orange-500 hover:shadow-orange-500/15',
      heroGradientOverlay: 'from-slate-950/95 via-slate-900/70 to-transparent',
      heroGlow: 'bg-orange-500/25',
      quoteBorder: 'border-orange-500',
      ribbonColor: 'bg-orange-600 text-white',
    }
  };
}
