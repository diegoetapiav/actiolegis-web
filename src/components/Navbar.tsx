import React from 'react';
import { SesionUsuario } from '../services/storageService';
import { 
  Scale, Shield, User, LogOut, Calendar, MessageSquare, 
  ExternalLink, ChevronRight, FileText, ArrowLeft, Building2
} from 'lucide-react';

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
  onAbrirSatje: () => void;
  totalMensajesPendientes?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  sesion,
  tabActiva,
  onCambiarTab,
  vistaActual,
  onCambiarVistaPrincipal,
  onAbrirLoginConTab,
  onAbrirReservarCita,
  onCerrarSesion,
  onAbrirSatje,
  totalMensajesPendientes = 0,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO OFICIAL ACTIO LEGIS (TIPO PLACA EDITORIAL) */}
        <div 
          onClick={() => onCambiarVistaPrincipal('sitio-web')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="relative inline-block py-1">
            <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
              <span className="font-black text-xs tracking-[0.18em] leading-tight font-sans">ACTIO</span>
              <span className="font-black text-xs tracking-[0.18em] leading-tight font-sans">LEGIS</span>
            </div>
          </div>

          <div className="flex flex-col border-l border-neutral-200 pl-3">
            <span className="font-serif text-sm font-bold tracking-tight text-neutral-950">
              Estudio Jurídico & Litigio
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.24em] text-neutral-400 font-mono">
              Guayaquil • Ecuador
            </span>
          </div>
        </div>

        {/* NAVEGACIÓN EN SITIO WEB PÚBLICO */}
        {vistaActual === 'sitio-web' && (
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600">
            <a href="#proposito" className="hover:text-neutral-950 transition-colors">
              Propósito
            </a>
            <a href="#socios" className="hover:text-neutral-950 transition-colors">
              Socios
            </a>
            <a href="#practica" className="hover:text-neutral-950 transition-colors">
              Práctica Penal
            </a>
            <a href="#editorial" className="hover:text-neutral-950 transition-colors">
              Editorial
            </a>
            <a href="#contacto" className="hover:text-neutral-950 transition-colors">
              Contacto
            </a>
          </nav>
        )}

        {/* BOTONES DE ACCIÓN DERECHA */}
        <div className="flex items-center gap-3">
          {vistaActual === 'sitio-web' ? (
            <>
              {/* Acceso Clientes */}
              <button
                type="button"
                onClick={() => onAbrirLoginConTab('cliente')}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100/90 hover:bg-neutral-200/90 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span>Portal Clientes</span>
              </button>

              {/* Acceso Intranet Abogados */}
              <button
                type="button"
                onClick={() => onAbrirLoginConTab('estudio')}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Intranet Litigantes</span>
              </button>

              {/* Botón Principal Agendar Consulta */}
              <button
                type="button"
                onClick={onAbrirReservarCita}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-black text-white text-xs font-semibold tracking-wide shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                <span>Agendar Consulta</span>
              </button>
            </>
          ) : (
            /* BOTONES CUANDO ESTÁ DENTRO DEL PORTAL O INTRANET */
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onCambiarVistaPrincipal('sitio-web')}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden sm:inline">Volver al Sitio Web</span>
              </button>

              <button
                type="button"
                onClick={onCerrarSesion}
                className="p-2 sm:px-3.5 sm:py-2 bg-neutral-950 hover:bg-black text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-neutral-300" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
