import React from 'react';

export interface ActioLegisLogoProps {
  /**
   * 'standard': Caja negra con texto blanco y marco negro exterior (fondos claros)
   * 'inverted-dark': Caja negra con texto blanco y marco blanco exterior (fondos oscuros)
   * 'white': Caja blanca con texto negro y marco blanco exterior (fondos oscuros)
   * 'monochrome': Hereda currentColor
   */
  variant?: 'standard' | 'inverted-dark' | 'white' | 'monochrome';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const ActioLegisLogo: React.FC<ActioLegisLogoProps> = ({
  variant = 'standard',
  size = 'md',
  showSubtitle = false,
  subtitleText = 'ESTUDIO JURÍDICO',
  className = '',
}) => {
  // Dimensiones del isotipo SVG según escala
  const sizeMap = {
    xs: { width: 34, height: 28, textScale: 'text-[9px]' },
    sm: { width: 48, height: 40, textScale: 'text-[11px]' },
    md: { width: 68, height: 56, textScale: 'text-xs' },
    lg: { width: 100, height: 82, textScale: 'text-sm' },
    xl: { width: 140, height: 115, textScale: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Definir colores según variante
  let boxFill = '#000000';
  let textFill = '#FFFFFF';
  let frameStroke = '#000000';

  if (variant === 'inverted-dark') {
    boxFill = '#0A0D14';
    textFill = '#FFFFFF';
    frameStroke = '#FFFFFF';
  } else if (variant === 'white') {
    boxFill = '#FFFFFF';
    textFill = '#000000';
    frameStroke = '#FFFFFF';
  } else if (variant === 'monochrome') {
    boxFill = 'currentColor';
    textFill = 'var(--bg-contrast, #FFFFFF)';
    frameStroke = 'currentColor';
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Isotipo vectorial fiel al boceto arquitectónico oficial de ACTIO LEGIS */}
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 170 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
        aria-label="Logo ACTIO LEGIS"
        role="img"
      >
        {/* Marco arquitectónico exterior L (Shadow frame / bracket angular inferior y derecho) */}
        {/* Línea horizontal inferior offset + Línea vertical derecha offset */}
        <path
          d="M 12 130 H 162 V 12"
          stroke={frameStroke}
          strokeWidth="9"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Caja sólida central rectangular */}
        <rect
          x="2"
          y="2"
          width="144"
          height="114"
          fill={boxFill}
          rx="0.5"
        />

        {/* Borde sutil si la caja es negra sobre fondo oscuro para destacar la silueta */}
        {variant === 'inverted-dark' && (
          <rect
            x="2"
            y="2"
            width="144"
            height="114"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            fill="none"
          />
        )}

        {/* Tipografía ACTIO LEGIS geométrica en bloque de alto peso */}
        {/* Línea 1: ACTIO */}
        <text
          x="74"
          y="49"
          fill={textFill}
          fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="37"
          letterSpacing="1.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          ACTIO
        </text>

        {/* Línea 2: LEGIS */}
        <text
          x="74"
          y="89"
          fill={textFill}
          fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="900"
          fontSize="37"
          letterSpacing="1.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          LEGIS
        </text>
      </svg>

      {/* Subtítulo o texto complementario opcional */}
      {showSubtitle && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-widest font-display uppercase ${
              variant === 'white' || variant === 'inverted-dark' ? 'text-white' : 'text-slate-950'
            } ${currentSize.textScale}`}
          >
            {subtitleText}
          </span>
          <span className="text-[10px] tracking-wider text-slate-400 font-mono mt-0.5 uppercase">
            Quito · Ecuador
          </span>
        </div>
      )}
    </div>
  );
};

export default ActioLegisLogo;
