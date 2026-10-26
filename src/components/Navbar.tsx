import React from 'react';
import { SesionUsuario } from '../services/storageService';
import { 
  FileText, DollarSign, Calendar, MessageSquare, 
  ArrowLeft, LogOut, Shield, Users, Receipt, Briefcase 
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
  onAbrirSatje?: () => void;
  totalMensajesPendientes?: number;
  paleta?: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  sesion,
  tabActiva,
  onCambiarTab,
  vistaActual,
  onCambiarVistaPrincipal,
  onCerrarSesion,
  totalMensajesPendientes = 0,
}) => {
  // En la portada pública, la navegación la maneja la cabecera editorial de PaginaPrincipal
  if (vistaActual === 'sitio-web') {
    return null;
  }

  const esEstudio = vistaActual === 'intranet';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Identidad de la Barra Interna */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => onCambiarVistaPrincipal('sitio-web')}
            className="cursor-pointer select-none flex items-center gap-2 group"
          >
            <div className="relative inline-block">
              <div className="absolute -right-1 -bottom-1 w-full h-full border-b-[2px] border-r-[2px] border-neutral-950" />
              <div className="relative px-2 py-0.5 bg-neutral-950 text-white flex flex-col items-center">
                <span className="font-black text-[9px] tracking-wider leading-none">ACTIO</span>
                <span className="font-black text-[9px] tracking-wider leading-none">LEGIS</span>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 group-hover:text-neutral-950 transition-colors hidden sm:inline">
              {esEstudio ? 'Intranet Jurídica' : 'Portal de Clientes'}
            </span>
          </div>

          {/* Menú de pestañas según el perfil activo */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {esEstudio ? (
              <>
                <button
                  onClick={() => onCambiarTab('expedientes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'expedientes' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Expedientes</span>
                </button>

                <button
                  onClick={() => onCambiarTab('citas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'citas' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Agenda & Citas</span>
                </button>

                <button
                  onClick={() => onCambiarTab('honorarios')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'honorarios' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Honorarios</span>
                </button>

                <button
                  onClick={() => onCambiarTab('mensajes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer relative ${
                    tabActiva === 'mensajes' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Consultas</span>
                  {totalMensajesPendientes > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
                  )}
                </button>

                <button
                  onClick={() => onCambiarTab('clientes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'clientes' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Clientes</span>
                </button>
              </>
            ) : (
              /* Menú del Portal de Clientes */
              <>
                <button
                  onClick={() => onCambiarTab('cliente-casos')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'cliente-casos' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mis Causas</span>
                </button>

                <button
                  onClick={() => onCambiarTab('cliente-citas')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'cliente-citas' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Cita</span>
                </button>

                <button
                  onClick={() => onCambiarTab('cliente-honorarios')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'cliente-honorarios' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Estado de Cuenta</span>
                </button>

                <button
                  onClick={() => onCambiarTab('cliente-consultas')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabActiva === 'cliente-consultas' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Consultar al Abogado</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Salir y Regreso a la Portada */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onCambiarVistaPrincipal('sitio-web')}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sitio Web</span>
          </button>

          <button
            onClick={onCerrarSesion}
            className="text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-neutral-500" />
            <span>Salir</span>
          </button>
        </div>

      </div>
    </header>
  );
};
