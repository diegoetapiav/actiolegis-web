import React from 'react';

interface ActioLegisLogoProps {
  variant?: 'black' | 'white';
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ActioLegisLogo: React.FC<ActioLegisLogoProps> = ({
  variant = 'black',
  showSlogan = false,
  size = 'md',
  className = '',
}) => {
  const isWhite = variant === 'white';
  const blockFill = isWhite ? '#FFFFFF' : '#111111';
  const textFill = isWhite ? '#111111' : '#FFFFFF';
  const shadowFill = isWhite ? '#E5E5E5' : '#111111';

  // Dimensiones según el tamaño solicitado
  const dims = {
    sm: { width: 110, height: 48 },
    md: { width: 140, height: 60 },
    lg: { width: 180, height: 78 },
  }[size];

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Logotipo Vectorial Oficial Idéntico al Boceto Seleccionado */}
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 240 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Sombra angular exterior (derecha e inferior) */}
        <path
          d="M205 15 H216 V88 H12 V78 H205 Z"
          fill={shadowFill}
        />

        {/* Bloque principal rectangular */}
        <rect
          x="10"
          y="10"
          width="190"
          height="65"
          fill={blockFill}
        />

        {/* Tipografía Oficial en Bloque 'ACTIO LEGIS' */}
        <text
          x="105"
          y="39"
          fill={textFill}
          fontSize="26"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="4"
          textAnchor="middle"
        >
          ACTIO
        </text>

        <text
          x="105"
          y="64"
          fill={textFill}
          fontSize="26"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="4"
          textAnchor="middle"
        >
          LEGIS
        </text>
      </svg>

      {/* Slogan institucional opcional */}
      {showSlogan && (
        <span 
          className={`text-[8px] uppercase tracking-[0.28em] font-medium font-sans mt-1 ${
            isWhite ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          en servicio del derecho
        </span>
      )}
    </div>
  );
};
