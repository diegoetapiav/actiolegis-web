import React from 'react';
import { Lock, Shield } from 'lucide-react';
import { SesionUsuario } from '../services/storageService';

interface NavbarProps {
  sesion: SesionUsuario;
  tabActiva: string;
  onCambiarTab: (tab: string) => void;
  vistaActual: 'sitio-web' | 'intranet' | 'cliente';
  onCambiarVistaPrincipal: (vista: 'sitio-web' | 'intranet' | 'cliente') => void;
  onAbrirLogin: () => void;
  onAbrirLoginConTab: (tab: 'estudio' | 'cliente') => void;
  onAbrirReservarCita: () => void;
  onCerrarSesion: () => void;
  onAbrirSatje?: () => void;
  totalMensajesPendientes?: number;
  paleta?: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  vistaActual,
  onCambiarVistaPrincipal,
  onAbrirLoginConTab,
  onAbrirReservarCita,
}) => {
  if (vistaActual !== 'sitio-web') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO OFICIAL DEFINITIVO: BLOQUE CON SOMBRA EN ESCUADRA */}
        <div 
          onClick={() => {
            onCambiarVistaPrincipal('sitio-web');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer select-none py-1"
        >
          <div className="relative inline-block">
            {/* Sombra / Escuadra posterior */}
            <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
            
            {/* Bloque principal negro con tipografía en blanco */}
            <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center">
              <span className="font-black text-sm tracking-[0.12em] leading-tight font-sans">
                ACTIO
              </span>
              <span className="font-black text-sm tracking-[0.12em] leading-tight font-sans">
                LEGIS
              </span>
            </div>
          </div>
        </div>

        {/* Menú de Navegación Editorial */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] font-medium tracking-wider uppercase text-neutral-600">
          <a href="#proposito" className="hover:text-neutral-950 transition-colors">Propósito</a>
          <a href="#socios" className="hover:text-neutral-950 transition-colors">Socios</a>
          <a href="#practica" className="hover:text-neutral-950 transition-colors">Áreas</a>
          <a href="#editorial" className="hover:text-neutral-950 transition-colors">Editorial</a>
          <a href="#contacto" className="hover:text-neutral-950 transition-colors">Contacto</a>
        </nav>

        {/* Accesos a Plataforma y Consulta */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onAbrirLoginConTab('cliente')}
            className="text-[12px] font-semibold text-neutral-600 hover:text-neutral-950 transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Portal Clientes</span>
          </button>

          <button
            onClick={() => onAbrirLoginConTab('estudio')}
            className="text-[12px] font-semibold text-neutral-600 hover:text-neutral-950 transition-colors hidden sm:flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-neutral-400" />
            <span>Intranet</span>
          </button>

          <button
            onClick={onAbrirReservarCita}
            className="text-[12px] font-medium px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full transition-all shadow-sm"
          >
            Consultar Causa
          </button>
        </div>

      </div>
    </header>
  );
};
