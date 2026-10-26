import React from 'react';

interface ActioLegisLogoProps {
  variant?: 'black' | 'white';
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ActioLegisLogo: React.FC<ActioLegisLogoProps> = ({
  variant = 'black',
  showSlogan = true,
  size = 'md',
  className = '',
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-neutral-900';
  const subColor = isWhite ? 'text-neutral-400' : 'text-neutral-500';
  const strokeColor = isWhite ? '#FFFFFF' : '#111111';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg tracking-[0.22em]',
    lg: 'text-2xl tracking-[0.25em]',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Isotipo Geométrico Concéntrico Oficial (Bocetos Actio Legis) */}
      <svg
        className={`${iconSizes[size]} shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Capa Exterior */}
        <rect x="6" y="6" width="88" height="88" stroke={strokeColor} strokeWidth="7" />
        {/* Capa Media */}
        <rect x="22" y="22" width="56" height="56" stroke={strokeColor} strokeWidth="6" />
        {/* Núcleo Interior */}
        <rect x="38" y="38" width="24" height="24" stroke={strokeColor} strokeWidth="5.5" />
      </svg>

      {/* Bloque Tipográfico Editorial */}
      <div className="flex flex-col">
        <span className={`font-black uppercase leading-tight font-sans ${textColor} ${titleSizes[size]}`}>
          ACTIO LEGIS
        </span>
        {showSlogan && (
          <span className={`text-[9px] uppercase tracking-[0.28em] font-medium font-sans mt-0.5 ${subColor}`}>
            en servicio del derecho
          </span>
        )}
      </div>
    </div>
  );
};
