import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { SatjeBuscadorModal } from './components/EstudioJuridico/SatjeBuscadorModal';
import { ModuloExpedientes } from './components/ModuloExpedientes';
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
import { PaginaPrincipal } from './components/SitioWeb/PaginaPrincipal';
import { ReservarCitaModal } from './components/SitioWeb/ReservarCitaModal';

export default function App() {
  const [usuarios, setUsuarios] = useState<UsuarioEstudio[]>(() => StorageService.getUsuarios());

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

  const [expedientes, setExpedientes] = useState<Expediente[]>(() => StorageService.getExpedientes());
  const [clientes, setClientes] = useState<Cliente[]>(() => StorageService.getClientes());
  const [mensajes, setMensajes] = useState<MensajeConsulta[]>(() => StorageService.getMensajes());
  const [citas, setCitas] = useState<CitaLegal[]>(() => StorageService.getCitas());
  const [honorarios, setHonorarios] = useState<PagoHonorario[]>(() => StorageService.getHonorarios());
  const [cuotasProgramadas, setCuotasProgramadas] = useState<CuotaProgramada[]>(() => StorageService.getCuotasProgramadas());
  const [gastos, setGastos] = useState<GastoCliente[]>(() => StorageService.getGastos());
  const [escritos, setEscritos] = useState<EscritoFirmaDigital[]>(() => StorageService.getEscritos());
  const [eventosInternos, setEventosInternos] = useState<EventoCalendarioInterno[]>(() => StorageService.getEventosInternos());

  const [vistaPrincipal, setVistaPrincipal] = useState<'sitio-web' | 'intranet' | 'cliente'>('sitio-web');
  const [tabActiva, setTabActiva] = useState<string>('expedientes');

  const [modalLoginAbierto, setModalLoginAbierto] = useState(false);
  const [loginTabInicial, setLoginTabInicial] = useState<'estudio' | 'cliente'>('cliente');
  const [modalReservarCitaAbierto, setModalReservarCitaAbierto] = useState(false);
  const [modalSatjeAbierto, setModalSatjeAbierto] = useState(false);
  const [modalNuevoExpedienteAbierto, setModalNuevoExpedienteAbierto] = useState(false);
  const [modalCalculadoraAbierto, setModalCalculadoraAbierto] = useState(false);

  const usuarioActivoEstudio: UsuarioEstudio =
    usuarios.find(
      (u) =>
        u.id === sesion.usuarioEstudioId ||
        u.email.toLowerCase() === sesion.emailOIdentificacion.toLowerCase()
    ) || usuarios[0];

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

  const handleAgregarEventoInterno = (evento: EventoCalendarioInterno) => {
    const actualizados = StorageService.agregarEventoInterno(evento);
    setEventosInternos(actualizados);
  };

  const handleEliminarEventoInterno = (id: string) => {
    const actualizados = StorageService.eliminarEventoInterno(id);
    setEventosInternos(actualizados);
  };

  const handleGuardarNuevoExpediente = (nuevo: Expediente) => {
    const actualizados = StorageService.agregarExpediente(nuevo);
    setExpedientes(actualizados);
  };

  const handleActualizarExpediente = (actualizado: Expediente) => {
    const lista = StorageService.actualizarExpediente(actualizado);
    setExpedientes(lista);
  };

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

  const handleAgregarCliente = (nuevo: Cliente) => {
    const actualizados = StorageService.agregarCliente(nuevo);
    setClientes(actualizados);
  };

  const handleAgregarCuotaProgramada = (cuota: CuotaProgramada) => {
    const actualizados = StorageService.agregarCuotaProgramada(cuota);
    setCuotasProgramadas(actualizados);
  };

  const handleMarcarCuotaPagada = (cuotaId: string, comprobante: string) => {
    const actualizados = StorageService.marcarCuotaPagada(cuotaId, comprobante);
    setCuotasProgramadas(actualizados);
  };

  const handleAgregarGasto = (gasto: GastoCliente) => {
    const actualizados = StorageService.agregarGasto(gasto);
    setGastos(actualizados);
  };

  const handleMarcarGastoReembolsado = (gastoId: string) => {
    const actualizados = StorageService.marcarGastoReembolsado(gastoId);
    setGastos(actualizados);
  };

  const handleAgregarEscrito = (escrito: EscritoFirmaDigital) => {
    const actualizados = StorageService.agregarEscrito(escrito);
    setEscritos(actualizados);
  };

  const handleFirmarEscrito = (escritoId: string, firmaInfo: EscritoFirmaDigital['firmaInfo']) => {
    const actualizados = StorageService.firmarEscrito(escritoId, firmaInfo);
    setEscritos(actualizados);
  };

  const handleEnviarMensajeCliente = (msg: MensajeConsulta) => {
    const actualizados = StorageService.agregarMensaje(msg);
    setMensajes(actualizados);
  };

  const handleResponderMensajeEstudio = (mensajeId: string, autor: string, contenido: string) => {
    const actualizados = StorageService.responderMensaje(mensajeId, autor, contenido, 'estudio');
    setMensajes(actualizados);
  };

  const handleAgregarCita = (cita: CitaLegal) => {
    const actualizados = StorageService.agregarCita(cita);
    setCitas(actualizados);
  };

  const handleActualizarEstadoCita = (citaId: string, nuevoEstado: CitaLegal['estado']) => {
    const actualizados = StorageService.actualizarEstadoCita(citaId, nuevoEstado);
    setCitas(actualizados);
  };

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

  const clienteActivo =
    sesion.tipo === 'cliente'
      ? clientes.find((c) => c.id === sesion.clienteId || c.codigoAcceso === sesion.codigoAcceso) || clientes[0]
      : null;

  const totalMensajesPendientes = mensajes.filter((m) => m.estado === 'Pendiente').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 font-sans antialiased">
      
      {/* Barra de Navegación (visible únicamente en Intranet y Portal Clientes) */}
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
      />

      {/* Contenedor Principal */}
      <main className="flex-1 w-full">
        {vistaPrincipal === 'sitio-web' ? (
          <PaginaPrincipal
            onAbrirReservarCita={() => setModalReservarCitaAbierto(true)}
            onAbrirLoginClientes={() => handleAbrirLoginConTab('cliente')}
            onAbrirLoginIntranet={() => handleAbrirLoginConTab('estudio')}
            onAbrirCalculadoraLegal={() => setModalCalculadoraAbierto(true)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {sesion.tipo === 'estudio' ? (
              <>
                {tabActiva === 'expedientes' && <ModuloExpedientes />}

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
          </div>
        )}
      </main>

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
