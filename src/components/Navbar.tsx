import React from 'react';
import { Lock, UserCheck, Shield } from 'lucide-react';
import { ActioLegisLogo } from './Brand/ActioLegisLogo';
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
  // Cuando se está en la intranet o portal cliente, se mantiene la barra interna de gestión
  if (vistaActual !== 'sitio-web') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logotipo Oficial */}
        <div 
          onClick={() => {
            onCambiarVistaPrincipal('sitio-web');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer"
        >
          <ActioLegisLogo size="sm" showSlogan={false} />
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
