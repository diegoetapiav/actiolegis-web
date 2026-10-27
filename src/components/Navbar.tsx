import React from 'react';
import { User, Building2, Settings, LogOut } from 'lucide-react';
import { UsuarioSistema } from './LoginModal';

interface NavbarProps {
  vista: 'sitio-web' | 'editorial' | 'equipo' | 'cliente' | 'intranet' | 'admin-console';
  setVista: (vista: 'sitio-web' | 'editorial' | 'equipo' | 'cliente' | 'intranet' | 'admin-console') => void;
  usuarioSesion: UsuarioSistema | null;
  onLogout: () => void;
  onAbrirModal: (tipo: 'intranet' | 'cliente' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  vista,
  setVista,
  usuarioSesion,
  onLogout,
  onAbrirModal
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">
        
        {/* LOGO INSTITUCIONAL O EDITORIAL */}
        <div 
          onClick={() => setVista('sitio-web')}
          className="flex items-center gap-3.5 cursor-pointer select-none group"
        >
          <div className="flex flex-col items-start pb-0.5">
            {vista === 'editorial' ? (
              <div className="flex flex-col items-start">
                <div className="relative inline-block py-0.5">
                  <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
                  <div className="relative px-3.5 py-1.5 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                    <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">ACTIO</span>
                    <span className="font-black text-xs tracking-[0.2em] leading-tight font-sans">LEGIS</span>
                  </div>
                </div>
                <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-500 font-mono mt-3 font-semibold">
                  en servicio del derecho
                </span>
              </div>
            ) : (
              <img 
                src="/logo-estudio.png" 
                alt="ACTIO LEGIS Consultores Jurídicos" 
                className="h-20 w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform cursor-pointer"
              />
            )}
          </div>

          <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
            <span className="font-serif text-xs font-bold tracking-tight text-neutral-950">
              {vista === 'editorial' ? 'Editorial Jurídico' : 'Estudio Jurídico'}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
              Guayaquil • Ecuador
            </span>
          </div>
        </div>

        {/* NAVEGACIÓN Y ACCESOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {vista === 'sitio-web' || vista === 'editorial' || vista === 'equipo' ? (
            <>
              {/* NAVEGACIÓN CON MARGEN ml-8 QUE SEPARA "INICIO" DE "ECUADOR" */}
              <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600 ml-8 mr-2">
                <button 
                  type="button" 
                  onClick={() => setVista('sitio-web')} 
                  className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'sitio-web' ? 'text-neutral-950 font-bold' : ''}`}
                >
                  Inicio
                </button>
                <a href="#proposito" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">
                  Propósito
                </a>
                <a href="#socios" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'equipo' ? 'text-neutral-950 font-bold' : ''}`}>
                  Nuestro Equipo
                </a>
                <a href="#practica" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">
                  Prácticas
                </a>
                <button 
                  type="button" 
                  onClick={() => setVista('editorial')} 
                  className={`hover:text-neutral-950 transition-colors cursor-pointer ${vista === 'editorial' ? 'text-neutral-950 font-bold border-b border-neutral-950' : ''}`}
                >
                  Editorial
                </button>
                <a href="#contacto" onClick={() => { if (vista !== 'sitio-web') setVista('sitio-web'); }} className="hover:text-neutral-950 transition-colors cursor-pointer">
                  Contacto
                </a>
              </nav>

              {/* BOTONES CON CURSOR POINTER */}
              <button
                type="button"
                onClick={() => onAbrirModal('intranet')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer shadow-2xs"
              >
                <Building2 className="w-3.5 h-3.5 text-neutral-600" />
                <span>Intranet</span>
              </button>

              <button
                type="button"
                onClick={() => onAbrirModal('cliente')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-900 border border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-neutral-700" />
                <span className="hidden sm:inline">Portal</span> Clientes
              </button>

              <button
                type="button"
                onClick={() => onAbrirModal('admin')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-950 hover:bg-black transition-all cursor-pointer shadow-2xs"
              >
                <Settings className="w-3.5 h-3.5 text-neutral-300" />
                <span className="hidden md:inline">Consola</span> Admin
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {usuarioSesion?.rol === 'admin' && (
                <button
                  type="button"
                  onClick={() => setVista('admin-console')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${vista === 'admin-console' ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Consola CMS</span>
                </button>
              )}

              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-neutral-900">{usuarioSesion?.nombre}</span>
                <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold">{usuarioSesion?.rol}</span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-neutral-600" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
