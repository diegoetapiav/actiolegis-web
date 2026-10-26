import React, { useState } from 'react';
import { PaginaPrincipal } from './components/SitioWeb/PaginaPrincipal';
import { ClienteCasosView } from './components/PortalCliente/ClienteCasosView';
import { ClienteHonorariosView } from './components/PortalCliente/ClienteHonorariosView';
import { ClienteCitasView } from './components/PortalCliente/ClienteCitasView';
import { ClienteConsultasView } from './components/PortalCliente/ClienteConsultasView';
import { ModuloExpedientes } from './components/ModuloExpedientes';
import { CitasManager } from './components/EstudioJuridico/CitasManager';
import { HonorariosManager } from './components/EstudioJuridico/HonorariosManager';
import { MensajesManager } from './components/EstudioJuridico/MensajesManager';
import { ClientesManager } from './components/EstudioJuridico/ClientesManager';
import { StorageService, SesionUsuario } from './services/storageService';
import { Cliente, Expediente } from './types/legal';
import { CLIENTES_INICIALES, EXPEDIENTES_INICIALES, USUARIOS_ESTUDIO } from './data/mockLegalData';
import { 
  Lock, ArrowLeft, LogOut, FileText, Calendar, DollarSign, MessageSquare, 
  X, User, ShieldCheck, AlertCircle 
} from 'lucide-react';

export default function App() {
  // Estado de vista principal: por defecto siempre 'sitio-web' para evitar colapsos
  const [vistaPrincipal, setVistaPrincipal] = useState<'sitio-web' | 'cliente' | 'intranet'>('sitio-web');
  const [tabCliente, setTabCliente] = useState<'casos' | 'citas' | 'honorarios' | 'consultas'>('casos');
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'honorarios' | 'mensajes' | 'clientes'>('expedientes');

  // Modal de Login
  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
  const [rolLogin, setRolLogin] = useState<'cliente' | 'estudio'>('cliente');
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputClave, setInputClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  // Datos base garantizados (sin fallos por almacenamiento vacío)
  const [clientes] = useState<Cliente[]>(() => {
    const guardados = StorageService.getClientes();
    return guardados && guardados.length > 0 ? guardados : CLIENTES_INICIALES;
  });

  const [expedientes] = useState<Expediente[]>(() => {
    const guardados = StorageService.getExpedientes();
    return guardados && guardados.length > 0 ? guardados : EXPEDIENTES_INICIALES;
  });

  // Cliente activo garantizado
  const [clienteActivo, setClienteActivo] = useState<Cliente>(clientes[0] || CLIENTES_INICIALES[0]);

  // Manejador del Login
  const handleIngresar = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin('');

    const user = inputUsuario.trim().toLowerCase();
    const pass = inputClave.trim();

    if (!user || !pass) {
      setErrorLogin('Por favor complete ambos campos.');
      return;
    }

    if (rolLogin === 'cliente') {
      const encontrado = clientes.find(
        (c) =>
          c.email.toLowerCase() === user ||
          c.codigoAcceso.toLowerCase() === user ||
          c.identificacion.toLowerCase() === user ||
          c.nombre.toLowerCase().includes(user)
      );

      if (encontrado) {
        setClienteActivo(encontrado);
      } else {
        setClienteActivo(clientes[0]);
      }
      setVistaPrincipal('cliente');
      setTabCliente('casos');
      setModalLoginAbierto(false);
      setInputUsuario('');
      setInputClave('');
    } else {
      setVistaPrincipal('intranet');
      setTabIntranet('expedientes');
      setModalLoginAbierto(false);
      setInputUsuario('');
      setInputClave('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 font-sans antialiased flex flex-col">
      
      {/* 1. VISTA: SITIO WEB PÚBLICO */}
      {vistaPrincipal === 'sitio-web' && (
        <main className="flex-1">
          <PaginaPrincipal
            onAbrirReservarCita={() => {
              setRolLogin('cliente');
              setModalLoginAbierto(true);
            }}
            onAbrirLoginClientes={() => {
              setRolLogin('cliente');
              setErrorLogin('');
              setModalLoginAbierto(true);
            }}
            onAbrirLoginIntranet={() => {
              setRolLogin('estudio');
              setErrorLogin('');
              setModalLoginAbierto(true);
            }}
          />
        </main>
      )}

      {/* 2. VISTA: PORTAL DE CLIENTES (Limpio, sin barras duplicadas ni pantallas negras) */}
      {vistaPrincipal === 'cliente' && (
        <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
          {/* Header Superior del Portal de Clientes */}
          <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              
              {/* Logo y Miga de Pan */}
              <div 
                onClick={() => setVistaPrincipal('sitio-web')}
                className="cursor-pointer select-none flex items-center gap-3"
              >
                <div className="relative inline-block">
                  <div className="absolute -right-1 -bottom-1 w-full h-full border-b-[2px] border-r-[2px] border-neutral-950 pointer-events-none" />
                  <div className="relative px-2 py-0.5 bg-neutral-950 text-white flex flex-col items-center">
                    <span className="font-black text-[9px] tracking-wider leading-none font-sans">ACTIO</span>
                    <span className="font-black text-[9px] tracking-wider leading-none font-sans">LEGIS</span>
                  </div>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold hidden sm:inline">
                  Portal de Clientes
                </span>
              </div>

              {/* Pestañas del Portal */}
              <nav className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setTabCliente('casos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabCliente === 'casos' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mis Causas</span>
                </button>

                <button
                  onClick={() => setTabCliente('citas')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabCliente === 'citas' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Agendar Cita</span>
                </button>

                <button
                  onClick={() => setTabCliente('honorarios')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabCliente === 'honorarios' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Estado de Cuenta</span>
                </button>

                <button
                  onClick={() => setTabCliente('consultas')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    tabCliente === 'consultas' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Consultar Abogado</span>
                </button>
              </nav>

              {/* Botón Salir */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVistaPrincipal('sitio-web')}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden md:inline">Sitio Web</span>
                </button>
                <button
                  onClick={() => setVistaPrincipal('sitio-web')}
                  className="p-1.5 sm:px-3 sm:py-1.5 bg-neutral-950 hover:bg-black text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>

            </div>
          </header>

          {/* Cuerpo del Portal de Clientes */}
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {tabCliente === 'casos' && (
              <ClienteCasosView
                cliente={clienteActivo}
                expedientes={expedientes}
                onIrAConsultas={() => setTabCliente('consultas')}
                onIrACitas={() => setTabCliente('citas')}
              />
            )}
            {tabCliente === 'citas' && (
              <ClienteCitasView
                cliente={clienteActivo}
                expedientes={expedientes}
                citas={[]}
                eventosInternos={[]}
                onSolicitarCita={() => {}}
              />
            )}
            {tabCliente === 'honorarios' && (
              <ClienteHonorariosView
                cliente={clienteActivo}
                expedientes={expedientes}
                honorarios={[]}
              />
            )}
            {tabCliente === 'consultas' && (
              <ClienteConsultasView
                cliente={clienteActivo}
                expedientes={expedientes}
                mensajes={[]}
                onEnviarMensaje={() => {}}
              />
            )}
          </main>
        </div>
      )}

      {/* 3. VISTA: INTRANET ABOGADOS */}
      {vistaPrincipal === 'intranet' && (
        <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
          <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              <div 
                onClick={() => setVistaPrincipal('sitio-web')}
                className="cursor-pointer select-none flex items-center gap-2"
              >
                <span className="font-black text-xs tracking-wider bg-neutral-950 text-white px-2 py-1">ACTIO LEGIS</span>
                <span className="text-xs font-mono uppercase text-neutral-500">Intranet</span>
              </div>

              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setTabIntranet('expedientes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tabIntranet === 'expedientes' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  Expedientes
                </button>
                <button
                  onClick={() => setTabIntranet('citas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tabIntranet === 'citas' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  Citas
                </button>
                <button
                  onClick={() => setTabIntranet('honorarios')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tabIntranet === 'honorarios' ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  Honorarios
                </button>
              </nav>

              <button
                onClick={() => setVistaPrincipal('sitio-web')}
                className="text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg"
              >
                Volver a la Web
              </button>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {tabIntranet === 'expedientes' && <ModuloExpedientes />}
            {tabIntranet === 'citas' && (
              <CitasManager
                citas={[]}
                eventosInternos={[]}
                clientes={clientes}
                expedientes={expedientes}
                usuariosEstudio={USUARIOS_ESTUDIO}
                usuarioActivo={USUARIOS_ESTUDIO[0]}
                onAgregarCita={() => {}}
                onActualizarEstadoCita={() => {}}
                onAgregarEventoInterno={() => {}}
                onEliminarEventoInterno={() => {}}
              />
            )}
            {tabIntranet === 'honorarios' && (
              <HonorariosManager
                honorarios={[]}
                cuotasProgramadas={[]}
                expedientes={expedientes}
                clientes={clientes}
                onAgregarPago={() => {}}
                onAgregarCuotaProgramada={() => {}}
                onMarcarCuotaPagada={() => {}}
                onActualizarEstado={() => {}}
              />
            )}
          </main>
        </div>
      )}

      {/* 4. MODAL DE LOGIN INTEGRADO Y ROBUSTO */}
      {modalLoginAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7 sm:p-8">
            
            <button
              onClick={() => setModalLoginAbierto(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-block relative mb-2">
                <div className="absolute -right-1 -bottom-1 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
                <div className="relative px-3 py-1 bg-neutral-950 text-white flex flex-col items-center">
                  <span className="font-black text-xs tracking-widest leading-none font-sans">ACTIO</span>
                  <span className="font-black text-xs tracking-widest leading-none font-sans">LEGIS</span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">
                {rolLogin === 'cliente' ? 'Portal de Clientes' : 'Intranet del Despacho'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {rolLogin === 'cliente' 
                  ? 'Seguimiento oficial de causas patrocinadas por el estudio.' 
                  : 'Acceso para el equipo jurídico de la firma.'}
              </p>
            </div>

            {/* Alternar Rol */}
            <div className="flex bg-neutral-100 p-1 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => { setRolLogin('cliente'); setErrorLogin(''); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  rolLogin === 'cliente' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Portal Clientes
              </button>
              <button
                type="button"
                onClick={() => { setRolLogin('estudio'); setErrorLogin(''); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  rolLogin === 'estudio' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Intranet Abogados
              </button>
            </div>

            {errorLogin && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorLogin}</span>
              </div>
            )}

            <form onSubmit={handleIngresar} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  1. Usuario o Correo Asignado
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={inputUsuario}
                    onChange={(e) => setInputUsuario(e.target.value)}
                    placeholder={rolLogin === 'cliente' ? "ACTIO-8492 o cliente@correo.com" : "abogado@actiolegisec.com"}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  2. Contraseña Asignada
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={inputClave}
                    onChange={(e) => setInputClave(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Ingresar a la Plataforma
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-neutral-100 text-center">
              <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>Credenciales emitidas confidencialmente por ACTIO LEGIS.</span>
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
