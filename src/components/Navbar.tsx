import React, { useState } from 'react';
import { 
  ShieldCheck, LogOut, ExternalLink, Calendar, MessageSquare, 
  CreditCard, FolderGit2, Users, Lock, FileText, Receipt, 
  Scale, Globe, Menu, X, Sparkles, ChevronDown, Phone, KeyRound
} from 'lucide-react';
import { SesionUsuario } from '../services/storageService';
import { ActioLegisLogo } from './Brand/ActioLegisLogo';
import { PaletaRevista } from '../types/paletasRevista';

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
  paleta?: PaletaRevista;
}

export const Navbar: React.FC<NavbarProps> = ({
  sesion,
  tabActiva,
  onCambiarTab,
  vistaActual,
  onCambiarVistaPrincipal,
  onAbrirLogin,
  onAbrirLoginConTab,
  onAbrirReservarCita,
  onCerrarSesion,
  onAbrirSatje,
  totalMensajesPendientes = 0,
  paleta,
}) => {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const esEstudio = sesion.tipo === 'estudio';
  const rol = sesion.rol || 'Abogado Socio';

  const esSocio = rol === 'Abogado Socio';
  const esAsociado = rol === 'Abogado Asociado';
  const esPasante = rol === 'Pasante';
  const esAsistente = rol === 'Asistente';
  const esAdministrativo = rol === 'Administrativo';

  const scrollToSection = (id: string) => {
    if (vistaActual !== 'sitio-web') {
      onCambiarVistaPrincipal('sitio-web');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuMovilAbierto(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl transition-all">
      {/* Cintillo Superior Informativo */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            <span className="font-bold tracking-wider uppercase text-white font-display">
              ACTIO LEGIS
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-300 font-sans">
              Estudio Jurídico & Litigio Estratégico • Guayaquil, Ecuador
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a 
              href="tel:+59342598800" 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>(04) 259-8800</span>
            </a>
            <span className="hidden md:inline text-slate-700">·</span>
            <button
              onClick={() => onCambiarVistaPrincipal(vistaActual === 'sitio-web' ? (esEstudio ? 'intranet' : 'cliente') : 'sitio-web')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>
                {vistaActual === 'sitio-web' 
                  ? (esEstudio ? 'Ir a Intranet Despacho →' : 'Ir a Portal Clientes →')
                  : 'Ver Sitio Web Principal'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Oficial de ACTIO LEGIS */}
          <div 
            onClick={() => onCambiarVistaPrincipal('sitio-web')}
            className="flex items-center gap-3.5 shrink-0 cursor-pointer group"
          >
            <div className="p-1 bg-black rounded-lg border border-white/20 group-hover:border-amber-400/50 transition-colors">
              <ActioLegisLogo variant="white" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white font-display">
                  ACTIO LEGIS
                </span>
                {vistaActual !== 'sitio-web' && (
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono border ${
                    vistaActual === 'intranet' 
                      ? 'bg-amber-400/10 text-amber-300 border-amber-400/30' 
                      : 'bg-blue-400/10 text-blue-300 border-blue-400/30'
                  }`}>
                    {vistaActual === 'intranet' ? 'Intranet Despacho' : 'Portal Cliente'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-sans mt-0.5">
                Estudio Jurídico · Guayaquil, Ecuador
              </p>
            </div>
          </div>

          {/* Navegación según el Modo Actual (Sitio Web vs Intranet vs Portal Cliente) */}
          {vistaActual === 'sitio-web' ? (
            /* ================= NAVEGACIÓN SITIO WEB PÚBLICO ================= */
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('quienes-somos')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => scrollToSection('blog-novedades')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('noticias-judiciales')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Noticias Judiciales
              </button>
              <button
                onClick={() => scrollToSection('redes-oficiales')}
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Redes Oficiales
              </button>
            </nav>
          ) : (
            /* ================= NAVEGACIÓN INTERNA INTRANET / PORTAL CLIENTE ================= */
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold overflow-x-auto py-1">
              <button
                onClick={() => onCambiarVistaPrincipal('sitio-web')}
                className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer mr-1"
                title="Volver a la página web principal de la firma"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Sitio Web</span>
              </button>

              {vistaActual === 'intranet' ? (
                <>
                  {!esAdministrativo && (
                    <button
                      onClick={() => onCambiarTab('expedientes')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        tabActiva === 'expedientes'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      Causas & Trámites
                    </button>
                  )}

                  {!esAdministrativo && (
                    <button
                      onClick={onAbrirSatje}
                      className="px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800 flex items-center gap-1.5 whitespace-nowrap border border-slate-700 font-bold cursor-pointer"
                      title="Conexión en línea con la Función Judicial del Ecuador"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      SATJE
                    </button>
                  )}

                  {(esSocio || esAsociado || esAsistente) && (
                    <button
                      onClick={() => onCambiarTab('casillero')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        tabActiva === 'casillero'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Casillero & Firma
                    </button>
                  )}

                  {!esPasante && (
                    <button
                      onClick={() => onCambiarTab('gastos')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        tabActiva === 'gastos'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      Gastos & Scans
                    </button>
                  )}

                  {(esSocio || esAsociado || esAdministrativo) && (
                    <button
                      onClick={() => onCambiarTab('honorarios')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        tabActiva === 'honorarios'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Honorarios
                    </button>
                  )}

                  {(esSocio || esAsociado || esAsistente) && (
                    <button
                      onClick={() => onCambiarTab('citas')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        tabActiva === 'citas'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Agenda & Audiencias
                    </button>
                  )}

                  {(esSocio || esAsociado) && (
                    <button
                      onClick={() => onCambiarTab('mensajes')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 relative whitespace-nowrap cursor-pointer ${
                        tabActiva === 'mensajes'
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Consultas
                      {totalMensajesPendientes > 0 && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => onCambiarTab('clientes')}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      tabActiva === 'clientes'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    Clientes
                  </button>

                  {esSocio && (
                    <button
                      onClick={() => onCambiarTab('equipo')}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap border cursor-pointer ${
                        tabActiva === 'equipo'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow'
                          : 'text-slate-200 hover:bg-slate-800 border-slate-700'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Equipo
                    </button>
                  )}
                </>
              ) : (
                /* Tabs del Cliente */
                <>
                  <button
                    onClick={() => onCambiarTab('cliente-casos')}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      tabActiva === 'cliente-casos'
                        ? 'bg-blue-600 text-white font-bold shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    Mis Procesos
                  </button>

                  <button
                    onClick={() => onCambiarTab('cliente-citas')}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      tabActiva === 'cliente-citas'
                        ? 'bg-blue-600 text-white font-bold shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Agendar Cita
                  </button>

                  <button
                    onClick={() => onCambiarTab('cliente-honorarios')}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      tabActiva === 'cliente-honorarios'
                        ? 'bg-blue-600 text-white font-bold shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Estado de Honorarios
                  </button>

                  <button
                    onClick={() => onCambiarTab('cliente-consultas')}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      tabActiva === 'cliente-consultas'
                        ? 'bg-blue-600 text-white font-bold shadow'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Preguntar al Estudio
                  </button>
                </>
              )}
            </nav>
          )}

          {/* BOTONES DE ACCIÓN PRINCIPALES */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {vistaActual === 'sitio-web' ? (
              <>
                {/* 1. Reservar Cita / Contáctenos */}
                <button
                  onClick={onAbrirReservarCita}
                  style={paleta ? { background: `linear-gradient(135deg, ${paleta.hexAcento}, ${paleta.hexPrimario})` } : undefined}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-slate-950" />
                  <span>Reservar Cita</span>
                </button>

                {/* 2. Ingreso Clientes */}
                <button
                  onClick={() => onAbrirLoginConTab('cliente')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Ingreso</span> Clientes
                </button>

                {/* 3. Ingreso Intranet */}
                <button
                  onClick={() => onAbrirLoginConTab('estudio')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-950 hover:bg-black text-amber-300 font-semibold text-xs rounded-xl border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Ingreso</span> Intranet
                </button>
              </>
            ) : (
              /* Acciones dentro de Intranet o Portal Clientes */
              <>
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-white truncate max-w-[170px] font-sans">
                    {sesion.nombre}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    {esEstudio ? rol : `Código: ${sesion.codigoAcceso}`}
                  </div>
                </div>

                <button
                  onClick={onAbrirLogin}
                  className="px-3 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Cambiar usuario o tipo de acceso"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Cambiar</span>
                </button>

                <button
                  onClick={onCerrarSesion}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
                  title="Cerrar Sesión Actio Legis"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Menú Móvil Botón */}
            <button
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
            >
              {menuMovilAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {menuMovilAbierto && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                onCambiarVistaPrincipal('sitio-web');
                setMenuMovilAbierto(false);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                vistaActual === 'sitio-web' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Sitio Web</span>
            </button>
            <button
              onClick={() => {
                onCambiarVistaPrincipal(esEstudio ? 'intranet' : 'cliente');
                setMenuMovilAbierto(false);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                vistaActual !== 'sitio-web' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{esEstudio ? 'Intranet' : 'Portal Cliente'}</span>
            </button>
          </div>

          {vistaActual === 'sitio-web' ? (
            <div className="space-y-2 text-sm font-semibold">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMenuMovilAbierto(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('quienes-somos')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => scrollToSection('blog-novedades')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
              >
                Blog de Novedades
              </button>
              <button
                onClick={() => scrollToSection('noticias-judiciales')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
              >
                Noticias Judiciales (funcionjudicial.gob.ec)
              </button>
              <button
                onClick={() => scrollToSection('redes-oficiales')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-slate-200"
              >
                Canales Oficiales en Redes
              </button>
              <button
                onClick={() => {
                  onAbrirReservarCita();
                  setMenuMovilAbierto(false);
                }}
                className="w-full py-2.5 px-4 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase"
              >
                Reservar Cita / Contáctenos
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <p className="text-xs text-slate-400 px-2 py-1 font-mono">
                Sesión: {sesion.nombre} ({sesion.rol})
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
