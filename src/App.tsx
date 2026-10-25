import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { SatjeBuscadorModal } from './components/EstudioJuridico/SatjeBuscadorModal';
import { ModuloExpedientes } from './ModuloExpedientes';
import { HonorariosManager } from './components/EstudioJuridico/HonorariosManager';
import { CitasManager } from './components/EstudioJuridico/CitasManager';
import { MensajesManager } from './components/EstudioJuridico/MensajesManager';
import { ClientesManager } from './components/EstudioJuridico/ClientesManager';
import { CasilleroEscritosManager } from './components/EstudioJuridico/CasilleroEscritosManager';
import { GastosManager } from './components/EstudioJuridico/GastosManager';
import { EquipoSociosManager } from './components/EstudioJuridico/EquipoSociosManager';
import { NuevoExpedienteModal } from './components/NuevoExpedienteModal';
import { CalculadoraLegalModal } from './components/CalculadoraLegalModal';

import { ClienteCasosView } from './components/PortalCliente/ClienteCasosView';
import { ClienteHonorariosView } from './components/PortalCliente/ClienteHonorariosView';
import { ClienteCitasView } from './components/PortalCliente/ClienteCitasView';
import { ClienteConsultasView } from './components/PortalCliente/ClienteConsultasView';

import { StorageService, SesionUsuario } from './services/storageService';
import { 
  Expediente, Cliente, MensajeConsulta, CitaLegal, PagoHonorario, 
  CuotaProgramada, GastoCliente, EscritoFirmaDigital, CausaSatjeBusqueda, 
  TipoActuacion, UsuarioEstudio, EventoCalendarioInterno 
} from './types/legal';
import { USUARIOS_ESTUDIO } from './data/mockLegalData';
import { Calculator, RotateCcw, ShieldCheck, Scale, ExternalLink, Calendar, MapPin, Phone, Mail, Globe, ArrowUp } from 'lucide-react';
import { ActioLegisLogo } from './components/Brand/ActioLegisLogo';
import { PaginaPrincipal } from './components/SitioWeb/PaginaPrincipal';
import { ReservarCitaModal } from './components/SitioWeb/ReservarCitaModal';
import { SelectorPaletaRevista } from './components/SitioWeb/SelectorPaletaRevista';
import { PaletaRevista, PALETAS_REVISTA } from './types/paletasRevista';

export default function App() {
  // Estado de Usuarios del Despacho
  const [usuarios, setUsuarios] = useState<UsuarioEstudio[]>(() => StorageService.getUsuarios());

  // Estado de Sesión (por defecto inicia con el Dr. Diego Tapia, Socio Director de ACTIO LEGIS)
  const [sesion, setSesion] = useState<SesionUsuario>(() => {
    const guardada = StorageService.getSesion();
    if (guardada) return guardada;
    return {
      tipo: 'estudio',
      usuarioEstudioId: USUARIOS_ESTUDIO[0].id,
      nombre: USUARIOS_ESTUDIO[0].nombre,
      emailOIdentificacion: USUARIOS_ESTUDIO[0].email,
      rol: USUARIOS_ESTUDIO[0].rol,
      puedeResponderConsultas: USUARIOS_ESTUDIO[0].puedeResponderConsultas,
    };
  });

  // Datos principales
  const [expedientes, setExpedientes] = useState<Expediente[]>(() => StorageService.getExpedientes());
  const [clientes, setClientes] = useState<Cliente[]>(() => StorageService.getClientes());
  const [mensajes, setMensajes] = useState<MensajeConsulta[]>(() => StorageService.getMensajes());
  const [citas, setCitas] = useState<CitaLegal[]>(() => StorageService.getCitas());
  const [honorarios, setHonorarios] = useState<PagoHonorario[]>(() => StorageService.getHonorarios());
  const [cuotasProgramadas, setCuotasProgramadas] = useState<CuotaProgramada[]>(() => StorageService.getCuotasProgramadas());
  const [gastos, setGastos] = useState<GastoCliente[]>(() => StorageService.getGastos());
  const [escritos, setEscritos] = useState<EscritoFirmaDigital[]>(() => StorageService.getEscritos());
  const [eventosInternos, setEventosInternos] = useState<EventoCalendarioInterno[]>(() => StorageService.getEventosInternos());

  // Vista Principal: Inicia en el Sitio Web Público de ACTIO LEGIS, con acceso a Intranet y Portal Clientes
  const [vistaPrincipal, setVistaPrincipal] = useState<'sitio-web' | 'intranet' | 'cliente'>('sitio-web');

  // Paleta Cromática de Revista Web Activa (para jugar con las combinaciones que combinan con el logo B&N)
  const [paletaActiva, setPaletaActiva] = useState<PaletaRevista>(() => {
    try {
      const guardada = localStorage.getItem('actio_legis_paleta_guardada');
      if (guardada) {
        return JSON.parse(guardada);
      }
    } catch {
      // Ignorar error de parsing
    }
    return PALETAS_REVISTA[0];
  });

  // Sincronizar variables CSS cuando cambia la paleta activa
  useEffect(() => {
    if (paletaActiva) {
      document.documentElement.style.setProperty('--paleta-primario', paletaActiva.hexPrimario);
      document.documentElement.style.setProperty('--paleta-acento', paletaActiva.hexAcento);
      document.documentElement.style.setProperty('--paleta-fondo', paletaActiva.hexFondo);
      document.documentElement.style.setProperty('--paleta-oscuro', paletaActiva.hexOscuro);
    }
  }, [paletaActiva]);

  // Accesibilidad y confort visual para jóvenes adultos y adultos mayores (escala tipográfica)
  const [tamanoTexto, setTamanoTexto] = useState<'normal' | 'grande'>('normal');

  // Navegación interna (para cuando se está en la intranet o portal de cliente)
  const [tabActiva, setTabActiva] = useState<string>('expedientes');

  // Modales
  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
  const [loginTabInicial, setLoginTabInicial] = useState<'estudio' | 'cliente'>('cliente');
  const [modalReservarCitaAbierto, setModalReservarCitaAbierto] = useState(false);
  const [modalSatjeAbierto, setModalSatjeAbierto] = useState(false);
  const [modalNuevoExpedienteAbierto, setModalNuevoExpedienteAbierto] = useState(false);
  const [modalCalculadoraAbierto, setModalCalculadoraAbierto] = useState(false);

  // Usuario activo en el despacho
  const usuarioActivoEstudio: UsuarioEstudio =
    usuarios.find(
      (u) =>
        u.id === sesion.usuarioEstudioId ||
        u.email.toLowerCase() === sesion.emailOIdentificacion.toLowerCase()
    ) || usuarios[0];

  // Sincronizar tab al cambiar de tipo de sesión o rol
  useEffect(() => {
    if (sesion.tipo === 'estudio') {
      if (tabActiva.startsWith('cliente-')) {
        setTabActiva(usuarioActivoEstudio.rol === 'Administrativo' ? 'gastos' : 'expedientes');
      } else if (usuarioActivoEstudio.rol === 'Administrativo' && tabActiva === 'expedientes') {
        setTabActiva('gastos');
      }
    } else {
      if (!tabActiva.startsWith('cliente-')) {
        setTabActiva('cliente-casos');
      }
    }
    StorageService.saveSesion(sesion);
  }, [sesion, usuarioActivoEstudio.rol]);

  // Handlers para Usuarios del Estudio (Administrado por Socios)
  const handleAgregarUsuario = (nuevo: UsuarioEstudio) => {
    const actualizados = StorageService.agregarUsuario(nuevo);
    setUsuarios(actualizados);
  };

  const handleActualizarUsuario = (u: UsuarioEstudio) => {
    const actualizados = StorageService.actualizarUsuario(u);
    setUsuarios(actualizados);
  };

  const handleEliminarUsuario = (id: string) => {
    const actualizados = StorageService.eliminarUsuario(id);
    setUsuarios(actualizados);
  };

  const handleCambiarUsuarioSesion = (u: UsuarioEstudio) => {
    const nuevaSesion: SesionUsuario = {
      tipo: 'estudio',
      usuarioEstudioId: u.id,
      nombre: u.nombre,
      emailOIdentificacion: u.email,
      rol: u.rol,
      puedeResponderConsultas: u.puedeResponderConsultas,
    };
    setSesion(nuevaSesion);
    if (u.rol === 'Administrativo') {
      setTabActiva('gastos');
    }
  };

  // Handlers para Calendario Interno de Audiencias
  const handleAgregarEventoInterno = (evento: EventoCalendarioInterno) => {
    const actualizados = StorageService.agregarEventoInterno(evento);
    setEventosInternos(actualizados);
  };

  const handleEliminarEventoInterno = (id: string) => {
    const actualizados = StorageService.eliminarEventoInterno(id);
    setEventosInternos(actualizados);
  };

  // Handlers para Expedientes
  const handleGuardarNuevoExpediente = (nuevo: Expediente) => {
    const actualizados = StorageService.agregarExpediente(nuevo);
    setExpedientes(actualizados);
  };

  const handleActualizarExpediente = (actualizado: Expediente) => {
    const lista = StorageService.actualizarExpediente(actualizado);
    setExpedientes(lista);
  };

  // Handlers SATJE
  const handleImportarCausaSatje = (nuevoExp: Expediente) => {
    const actualizados = StorageService.agregarExpediente(nuevoExp);
    setExpedientes(actualizados);
  };

  const handleSincronizarCausaExistente = (expedienteId: string, causaSatje: CausaSatjeBusqueda) => {
    const expExistente = expedientes.find((e) => e.id === expedienteId);
    if (!expExistente) return;

    const nuevasActuaciones = causaSatje.actuaciones.map((act, index) => {
      let tipoAct: TipoActuacion = 'Providencia Judicial';
      if (act.tipo.includes('SENTENCIA')) tipoAct = 'Sentencia / Auto Resolutorio';
      else if (act.tipo.includes('AUDIENCIA')) tipoAct = 'Audiencia Realizada';
      else if (act.tipo.includes('ESCRITO')) tipoAct = 'Escrito Presentado';

      return {
        id: `act-satje-sync-${index}-${Date.now()}`,
        fecha: act.fecha,
        tipo: tipoAct,
        titulo: act.titulo,
        resumen: act.detalle,
        resumenParaCliente: `Actuación oficial en juzgado: ${act.titulo.toLowerCase()}.`,
        foja: act.foja,
        abogado: 'Sistema Judicial SATJE',
        origenSatje: true,
      };
    });

    const expActualizado: Expediente = {
      ...expExistente,
      ultimaSincronizacionSatje: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actuaciones: [...nuevasActuaciones, ...expExistente.actuaciones.filter((a) => !a.origenSatje)],
    };

    handleActualizarExpediente(expActualizado);
  };

  // Handlers para Clientes
  const handleAgregarCliente = (nuevo: Cliente) => {
    const actualizados = StorageService.agregarCliente(nuevo);
    setClientes(actualizados);
  };

  // Handlers para Cuotas Programadas de la Diferencia
  const handleAgregarCuotaProgramada = (cuota: CuotaProgramada) => {
    const actualizados = StorageService.agregarCuotaProgramada(cuota);
    setCuotasProgramadas(actualizados);
  };

  const handleMarcarCuotaPagada = (cuotaId: string, comprobante: string) => {
    const actualizados = StorageService.marcarCuotaPagada(cuotaId, comprobante);
    setCuotasProgramadas(actualizados);
  };

  // Handlers para Gastos Procesales
  const handleAgregarGasto = (gasto: GastoCliente) => {
    const actualizados = StorageService.agregarGasto(gasto);
    setGastos(actualizados);
  };

  const handleMarcarGastoReembolsado = (gastoId: string) => {
    const actualizados = StorageService.marcarGastoReembolsado(gastoId);
    setGastos(actualizados);
  };

  // Handlers para Escritos y Firma Digital
  const handleAgregarEscrito = (escrito: EscritoFirmaDigital) => {
    const actualizados = StorageService.agregarEscrito(escrito);
    setEscritos(actualizados);
  };

  const handleFirmarEscrito = (escritoId: string, firmaInfo: EscritoFirmaDigital['firmaInfo']) => {
    const actualizados = StorageService.firmarEscrito(escritoId, firmaInfo);
    setEscritos(actualizados);
  };

  // Handlers para Mensajes
  const handleEnviarMensajeCliente = (msg: MensajeConsulta) => {
    const actualizados = StorageService.agregarMensaje(msg);
    setMensajes(actualizados);
  };

  const handleResponderMensajeEstudio = (mensajeId: string, autor: string, contenido: string) => {
    const actualizados = StorageService.responderMensaje(mensajeId, autor, contenido, 'estudio');
    setMensajes(actualizados);
  };

  // Handlers para Citas
  const handleAgregarCita = (cita: CitaLegal) => {
    const actualizados = StorageService.agregarCita(cita);
    setCitas(actualizados);
  };

  const handleActualizarEstadoCita = (citaId: string, nuevoEstado: CitaLegal['estado']) => {
    const actualizados = StorageService.actualizarEstadoCita(citaId, nuevoEstado);
    setCitas(actualizados);
  };

  // Handlers para Honorarios
  const handleAgregarHonorario = (pago: PagoHonorario) => {
    const actualizados = StorageService.agregarHonorario(pago);
    setHonorarios(actualizados);
  };

  const handleActualizarEstadoHonorario = (
    pagoId: string,
    nuevoEstado: 'Pagado' | 'Pendiente' | 'Vencido'
  ) => {
    const actualizados = StorageService.actualizarEstadoHonorario(pagoId, nuevoEstado);
    setHonorarios(actualizados);
  };

  // Sesión y Auth
  const handleLogin = (nuevaSesion: SesionUsuario) => {
    setSesion(nuevaSesion);
    setVistaPrincipal(nuevaSesion.tipo === 'estudio' ? 'intranet' : 'cliente');
  };

  const handleAbrirLoginConTab = (tab: 'estudio' | 'cliente') => {
    setLoginTabInicial(tab);
    setModalLoginAbierto(true);
  };

  const handleCerrarSesion = () => {
    setVistaPrincipal('sitio-web');
    setModalLoginAbierto(true);
  };

  const handleReiniciarDatos = () => {
    if (confirm('¿Desea restaurar los datos iniciales originales de ACTIO LEGIS?')) {
      StorageService.reiniciarDatos();
      setExpedientes(StorageService.getExpedientes());
      setClientes(StorageService.getClientes());
      setMensajes(StorageService.getMensajes());
      setCitas(StorageService.getCitas());
      setHonorarios(StorageService.getHonorarios());
      setCuotasProgramadas(StorageService.getCuotasProgramadas());
      setGastos(StorageService.getGastos());
      setEscritos(StorageService.getEscritos());
      setUsuarios(StorageService.getUsuarios());
      setEventosInternos(StorageService.getEventosInternos());
    }
  };

  const clienteActivo =
    sesion.tipo === 'cliente'
      ? clientes.find((c) => c.id === sesion.clienteId || c.codigoAcceso === sesion.codigoAcceso) || clientes[0]
      : null;

  const totalMensajesPendientes = mensajes.filter((m) => m.estado === 'Pendiente').length;

  return (
    <div 
      className="min-h-screen flex flex-col text-slate-900 font-sans transition-colors duration-300"
      style={{ backgroundColor: paletaActiva.hexFondo }}
    >
      {/* Barra de Navegación Principal Institucional ACTIO LEGIS */}
      <Navbar
        sesion={sesion}
        tabActiva={tabActiva}
        onCambiarTab={setTabActiva}
        vistaActual={vistaPrincipal}
        onCambiarVistaPrincipal={setVistaPrincipal}
        onAbrirLogin={() => handleAbrirLoginConTab(sesion.tipo === 'estudio' ? 'estudio' : 'cliente')}
        onAbrirLoginConTab={handleAbrirLoginConTab}
        onAbrirReservarCita={() => setModalReservarCitaAbierto(true)}
        onCerrarSesion={handleCerrarSesion}
        onAbrirSatje={() => setModalSatjeAbierto(true)}
        totalMensajesPendientes={totalMensajesPendientes}
        paleta={paletaActiva}
      />

      {/* Selector de Paletas Cromáticas Interactivas de Revista Web (Para jugar con los colores que combinan con el logo B&N) */}
      {vistaPrincipal === 'sitio-web' && (
        <SelectorPaletaRevista
          paletaActiva={paletaActiva}
          onSeleccionarPaleta={setPaletaActiva}
          tamanoTexto={tamanoTexto}
          onCambiarTamanoTexto={setTamanoTexto}
        />
      )}

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {vistaPrincipal === 'sitio-web' ? (
          // ==================== PÁGINA WEB PÚBLICA PRINCIPAL ACTIO LEGIS ====================
          <PaginaPrincipal
            onAbrirReservarCita={() => setModalReservarCitaAbierto(true)}
            onAbrirLoginClientes={() => handleAbrirLoginConTab('cliente')}
            onAbrirLoginIntranet={() => handleAbrirLoginConTab('estudio')}
            onAbrirCalculadoraLegal={() => setModalCalculadoraAbierto(true)}
            paleta={paletaActiva}
            tamanoTexto={tamanoTexto}
          />
        ) : (
          // ==================== INTRANET / PORTAL PRIVADO ====================
          <>
            {/* Barra de contexto interna con botón de regreso al sitio web */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${vistaPrincipal === 'intranet' ? 'bg-amber-400' : 'bg-blue-500'}`} />
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">
                    {vistaPrincipal === 'intranet' ? 'Intranet del Despacho • ACTIO LEGIS' : 'Portal de Clientes • Causas & Consultas'}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    {sesion.nombre} • {sesion.rol || 'Cliente Registrado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVistaPrincipal('sitio-web')}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Volver al Sitio Web Principal</span>
                </button>
                <button
                  onClick={() => handleAbrirLoginConTab(vistaPrincipal === 'intranet' ? 'cliente' : 'estudio')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Cambiar Rol
                </button>
              </div>
            </div>

            {sesion.tipo === 'estudio' ? (
              // ==================== VISTAS INTERNAS ESTUDIO JURÍDICO ====================
              <>
                {tabActiva === 'expedientes' && (
                  <ExpedientesManager
                    expedientes={expedientes}
                    clientes={clientes}
                    usuarioActivo={usuarioActivoEstudio}
                    onAbrirNuevoExpediente={() => setModalNuevoExpedienteAbierto(true)}
                    onAbrirSatje={() => setModalSatjeAbierto(true)}
                    onActualizarExpediente={handleActualizarExpediente}
                  />
                )}

                {tabActiva === 'casillero' && (
                  <CasilleroEscritosManager
                    escritos={escritos}
                    expedientes={expedientes}
                    usuarioActivo={usuarioActivoEstudio}
                    onAgregarEscrito={handleAgregarEscrito}
                    onFirmarEscrito={handleFirmarEscrito}
                  />
                )}

                {tabActiva === 'gastos' && (
                  <GastosManager
                    gastos={gastos}
                    clientes={clientes}
                    expedientes={expedientes}
                    onAgregarGasto={handleAgregarGasto}
                    onMarcarReembolsado={handleMarcarGastoReembolsado}
                    abogadoNombre={usuarioActivoEstudio.nombre}
                  />
                )}

                {tabActiva === 'honorarios' && (
                  <HonorariosManager
                    honorarios={honorarios}
                    cuotasProgramadas={cuotasProgramadas}
                    expedientes={expedientes}
                    clientes={clientes}
                    onAgregarPago={handleAgregarHonorario}
                    onAgregarCuotaProgramada={handleAgregarCuotaProgramada}
                    onMarcarCuotaPagada={handleMarcarCuotaPagada}
                    onActualizarEstado={handleActualizarEstadoHonorario}
                  />
                )}

                {tabActiva === 'citas' && (
                  <CitasManager
                    citas={citas}
                    eventosInternos={eventosInternos}
                    clientes={clientes}
                    expedientes={expedientes}
                    usuariosEstudio={usuarios}
                    usuarioActivo={usuarioActivoEstudio}
                    onAgregarCita={handleAgregarCita}
                    onActualizarEstadoCita={handleActualizarEstadoCita}
                    onAgregarEventoInterno={handleAgregarEventoInterno}
                    onEliminarEventoInterno={handleEliminarEventoInterno}
                  />
                )}

                {tabActiva === 'mensajes' && (
                  <MensajesManager
                    mensajes={mensajes}
                    clientes={clientes}
                    usuarioActivo={usuarioActivoEstudio}
                    onResponderMensaje={handleResponderMensajeEstudio}
                  />
                )}

                {tabActiva === 'clientes' && (
                  <ClientesManager
                    clientes={clientes}
                    expedientes={expedientes}
                    onAgregarCliente={handleAgregarCliente}
                  />
                )}

                {tabActiva === 'equipo' && (
                  <EquipoSociosManager
                    usuarios={usuarios}
                    usuarioActivo={usuarioActivoEstudio}
                    onAgregarUsuario={handleAgregarUsuario}
                    onActualizarUsuario={handleActualizarUsuario}
                    onEliminarUsuario={handleEliminarUsuario}
                    onCambiarUsuarioSesion={handleCambiarUsuarioSesion}
                  />
                )}
              </>
            ) : (
              // ==================== VISTAS PORTAL PRIVADO CLIENTE ====================
              clienteActivo && (
                <>
                  {tabActiva === 'cliente-casos' && (
                    <ClienteCasosView
                      cliente={clienteActivo}
                      expedientes={expedientes}
                      onIrAConsultas={() => setTabActiva('cliente-consultas')}
                      onIrACitas={() => setTabActiva('cliente-citas')}
                    />
                  )}

                  {tabActiva === 'cliente-citas' && (
                    <ClienteCitasView
                      cliente={clienteActivo}
                      expedientes={expedientes}
                      citas={citas}
                      eventosInternos={eventosInternos}
                      onSolicitarCita={handleAgregarCita}
                    />
                  )}

                  {tabActiva === 'cliente-honorarios' && (
                    <ClienteHonorariosView
                      cliente={clienteActivo}
                      expedientes={expedientes}
                      honorarios={honorarios}
                    />
                  )}

                  {tabActiva === 'cliente-consultas' && (
                    <ClienteConsultasView
                      cliente={clienteActivo}
                      expedientes={expedientes}
                      mensajes={mensajes}
                      onEnviarMensaje={handleEnviarMensajeCliente}
                    />
                  )}
                </>
              )
            )}
          </>
        )}
      </main>

      {/* Pie de Página Institucional ACTIO LEGIS • Guayaquil, Ecuador */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna 1: Firma y Logo */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-black rounded-lg border border-white/20">
                  <ActioLegisLogo variant="white" size="xs" />
                </div>
                <span className="font-extrabold text-white text-base font-display">
                  ACTIO LEGIS
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Estudio Jurídico de alto rendimiento en Guayaquil. Litigio estratégico, rigor procesal y seguimiento tecnológico en tiempo real.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-400 pt-1 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>Puerto Santa Ana & Malecón, Guayaquil</span>
              </div>
            </div>

            {/* Columna 2: Navegación del Sitio */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-amber-400">
                Página Web
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button 
                    onClick={() => {
                      setVistaPrincipal('sitio-web');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Inicio & Galería Guayaquil
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setVistaPrincipal('sitio-web');
                      setTimeout(() => {
                        document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Quiénes Somos & Socios
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setVistaPrincipal('sitio-web');
                      setTimeout(() => {
                        document.getElementById('blog-novedades')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Blog de Novedades Jurídicas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setVistaPrincipal('sitio-web');
                      setTimeout(() => {
                        document.getElementById('noticias-judiciales')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Noticias Función Judicial
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setVistaPrincipal('sitio-web');
                      setTimeout(() => {
                        document.getElementById('redes-oficiales')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Canales en Redes Oficiales
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 3: Accesos y Plataforma */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-amber-400">
                Plataforma Privada
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button 
                    onClick={() => handleAbrirLoginConTab('cliente')}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Ingreso Clientes (Causas & Pagos)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleAbrirLoginConTab('estudio')}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Ingreso Intranet (Equipo Legal)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalReservarCitaAbierto(true)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-amber-300 font-semibold"
                  >
                    <span>Reservar Cita / Consulta en Línea</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setModalCalculadoraAbierto(true)}
                    className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Calculadora Arancelaria & Términos</span>
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.funcionjudicial.gob.ec/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Portal Función Judicial Oficial</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 4: Contacto Directo */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono text-amber-400">
                Atención Guayaquil
              </h4>
              <div className="space-y-2 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+593 (4) 259-8800</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>contacto@actiolegisec.com</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Horario: Lun a Vie 08:30 - 18:30 <br />
                  Urgencias procesales 24/7
                </p>
                <button
                  onClick={handleReiniciarDatos}
                  className="mt-2 text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar datos demo</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} ACTIO LEGIS - Estudio Jurídico. Todos los derechos reservados. Guayaquil, Ecuador.</p>
            <div className="flex items-center gap-4">
              <span>Sincronización SATJE Activa</span>
              <span>•</span>
              <span>Firma Electrónica Válida</span>
              <span>•</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Subir</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modales Globales */}
      <LoginModal
        isOpen={modalLoginAbierto}
        onClose={() => setModalLoginAbierto(false)}
        onLogin={handleLogin}
        tabInicial={loginTabInicial}
      />

      <ReservarCitaModal
        isOpen={modalReservarCitaAbierto}
        onCerrar={() => setModalReservarCitaAbierto(false)}
        onConfirmarCita={handleAgregarCita}
      />

      <SatjeBuscadorModal
        isOpen={modalSatjeAbierto}
        onClose={() => setModalSatjeAbierto(false)}
        clientes={clientes}
        expedientesExistentes={expedientes}
        onImportarCausa={handleImportarCausaSatje}
        onSincronizarCausaExistente={handleSincronizarCausaExistente}
      />

      <NuevoExpedienteModal
        isOpen={modalNuevoExpedienteAbierto}
        onClose={() => setModalNuevoExpedienteAbierto(false)}
        clientes={clientes}
        onGuardar={handleGuardarNuevoExpediente}
      />

      <CalculadoraLegalModal
        isOpen={modalCalculadoraAbierto}
        onClose={() => setModalCalculadoraAbierto(false)}
      />
    </div>
  );
}
