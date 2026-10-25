import { 
  Cliente, Expediente, MensajeConsulta, CitaLegal, PagoHonorario, 
  CuotaProgramada, GastoCliente, EscritoFirmaDigital, UsuarioEstudio, 
  EventoCalendarioInterno, RolUsuarioEstudio 
} from '../types/legal';
import { 
  CLIENTES_INICIALES, 
  EXPEDIENTES_INICIALES, 
  MENSAJES_INICIALES, 
  CITAS_INICIALES, 
  HONORARIOS_INICIALES,
  CUOTAS_PROGRAMADAS_INICIALES,
  GASTOS_CLIENTES_INICIALES,
  ESCRITOS_INICIALES,
  USUARIOS_ESTUDIO,
  EVENTOS_CALENDARIO_INTERNO_INICIALES
} from '../data/mockLegalData';

const STORAGE_KEYS = {
  EXPEDIENTES: 'actio_legis_expedientes',
  CLIENTES: 'actio_legis_clientes',
  MENSAJES: 'actio_legis_mensajes',
  CITAS: 'actio_legis_citas',
  HONORARIOS: 'actio_legis_honorarios',
  CUOTAS_PROGRAMADAS: 'actio_legis_cuotas_programadas',
  GASTOS: 'actio_legis_gastos',
  ESCRITOS: 'actio_legis_escritos',
  USUARIOS: 'actio_legis_usuarios',
  EVENTOS_INTERNOS: 'actio_legis_eventos_internos',
  SESION: 'actio_legis_sesion_activa',
};

export interface SesionUsuario {
  tipo: 'estudio' | 'cliente';
  usuarioEstudioId?: string;
  clienteId?: string;
  nombre: string;
  emailOIdentificacion: string;
  codigoAcceso?: string;
  rol?: RolUsuarioEstudio;
  puedeResponderConsultas?: boolean;
}

export const StorageService = {
  getUsuarios(): UsuarioEstudio[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USUARIOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(USUARIOS_ESTUDIO));
      return USUARIOS_ESTUDIO;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return USUARIOS_ESTUDIO;
    }
  },

  saveUsuarios(usuarios: UsuarioEstudio[]): void {
    localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
  },

  agregarUsuario(usuario: UsuarioEstudio): UsuarioEstudio[] {
    const todos = this.getUsuarios();
    const actualizados = [usuario, ...todos];
    this.saveUsuarios(actualizados);
    return actualizados;
  },

  actualizarUsuario(usuario: UsuarioEstudio): UsuarioEstudio[] {
    const todos = this.getUsuarios();
    const actualizados = todos.map((u) => (u.id === usuario.id ? usuario : u));
    this.saveUsuarios(actualizados);
    return actualizados;
  },

  eliminarUsuario(usuarioId: string): UsuarioEstudio[] {
    const todos = this.getUsuarios();
    const actualizados = todos.filter((u) => u.id !== usuarioId);
    this.saveUsuarios(actualizados);
    return actualizados;
  },

  getEventosInternos(): EventoCalendarioInterno[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTOS_INTERNOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EVENTOS_INTERNOS, JSON.stringify(EVENTOS_CALENDARIO_INTERNO_INICIALES));
      return EVENTOS_CALENDARIO_INTERNO_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return EVENTOS_CALENDARIO_INTERNO_INICIALES;
    }
  },

  saveEventosInternos(eventos: EventoCalendarioInterno[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTOS_INTERNOS, JSON.stringify(eventos));
  },

  agregarEventoInterno(evento: EventoCalendarioInterno): EventoCalendarioInterno[] {
    const todos = this.getEventosInternos();
    const actualizados = [evento, ...todos];
    this.saveEventosInternos(actualizados);
    return actualizados;
  },

  eliminarEventoInterno(eventoId: string): EventoCalendarioInterno[] {
    const todos = this.getEventosInternos();
    const actualizados = todos.filter((e) => e.id !== eventoId);
    this.saveEventosInternos(actualizados);
    return actualizados;
  },

  getExpedientes(): Expediente[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPEDIENTES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EXPEDIENTES, JSON.stringify(EXPEDIENTES_INICIALES));
      return EXPEDIENTES_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return EXPEDIENTES_INICIALES;
    }
  },

  saveExpedientes(expedientes: Expediente[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPEDIENTES, JSON.stringify(expedientes));
  },

  agregarExpediente(nuevo: Expediente): Expediente[] {
    const todos = this.getExpedientes();
    const actualizados = [nuevo, ...todos];
    this.saveExpedientes(actualizados);
    return actualizados;
  },

  actualizarExpediente(expediente: Expediente): Expediente[] {
    const todos = this.getExpedientes();
    const actualizados = todos.map((e) => (e.id === expediente.id ? expediente : e));
    this.saveExpedientes(actualizados);
    return actualizados;
  },

  eliminarExpediente(expedienteId: string): Expediente[] {
    const todos = this.getExpedientes();
    const actualizados = todos.filter((e) => e.id !== expedienteId);
    this.saveExpedientes(actualizados);
    return actualizados;
  },

  getClientes(): Cliente[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(CLIENTES_INICIALES));
      return CLIENTES_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return CLIENTES_INICIALES;
    }
  },

  saveClientes(clientes: Cliente[]): void {
    localStorage.setItem(STORAGE_KEYS.CLIENTES, JSON.stringify(clientes));
  },

  agregarCliente(cliente: Cliente): Cliente[] {
    const todos = this.getClientes();
    const actualizados = [cliente, ...todos];
    this.saveClientes(actualizados);
    return actualizados;
  },

  getCuotasProgramadas(): CuotaProgramada[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUOTAS_PROGRAMADAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUOTAS_PROGRAMADAS, JSON.stringify(CUOTAS_PROGRAMADAS_INICIALES));
      return CUOTAS_PROGRAMADAS_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return CUOTAS_PROGRAMADAS_INICIALES;
    }
  },

  saveCuotasProgramadas(cuotas: CuotaProgramada[]): void {
    localStorage.setItem(STORAGE_KEYS.CUOTAS_PROGRAMADAS, JSON.stringify(cuotas));
  },

  agregarCuotaProgramada(cuota: CuotaProgramada): CuotaProgramada[] {
    const todos = this.getCuotasProgramadas();
    const actualizados = [cuota, ...todos];
    this.saveCuotasProgramadas(actualizados);
    return actualizados;
  },

  marcarCuotaPagada(cuotaId: string, numeroComprobante: string): CuotaProgramada[] {
    const todos = this.getCuotasProgramadas();
    const actualizados = todos.map((c) =>
      c.id === cuotaId
        ? {
            ...c,
            estado: 'Pagado' as const,
            fechaPagoRealizado: new Date().toISOString().split('T')[0],
            numeroComprobante,
          }
        : c
    );
    this.saveCuotasProgramadas(actualizados);
    return actualizados;
  },

  getGastos(): GastoCliente[] {
    const raw = localStorage.getItem(STORAGE_KEYS.GASTOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.GASTOS, JSON.stringify(GASTOS_CLIENTES_INICIALES));
      return GASTOS_CLIENTES_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return GASTOS_CLIENTES_INICIALES;
    }
  },

  saveGastos(gastos: GastoCliente[]): void {
    localStorage.setItem(STORAGE_KEYS.GASTOS, JSON.stringify(gastos));
  },

  agregarGasto(gasto: GastoCliente): GastoCliente[] {
    const todos = this.getGastos();
    const actualizados = [gasto, ...todos];
    this.saveGastos(actualizados);
    return actualizados;
  },

  marcarGastoReembolsado(gastoId: string): GastoCliente[] {
    const todos = this.getGastos();
    const actualizados = todos.map((g) =>
      g.id === gastoId
        ? {
            ...g,
            reembolsadoPorCliente: true,
            fechaReembolso: new Date().toISOString().split('T')[0],
          }
        : g
    );
    this.saveGastos(actualizados);
    return actualizados;
  },

  getEscritos(): EscritoFirmaDigital[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ESCRITOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ESCRITOS, JSON.stringify(ESCRITOS_INICIALES));
      return ESCRITOS_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return ESCRITOS_INICIALES;
    }
  },

  saveEscritos(escritos: EscritoFirmaDigital[]): void {
    localStorage.setItem(STORAGE_KEYS.ESCRITOS, JSON.stringify(escritos));
  },

  agregarEscrito(escrito: EscritoFirmaDigital): EscritoFirmaDigital[] {
    const todos = this.getEscritos();
    const actualizados = [escrito, ...todos];
    this.saveEscritos(actualizados);
    return actualizados;
  },

  firmarEscrito(escritoId: string, firmaInfo: EscritoFirmaDigital['firmaInfo']): EscritoFirmaDigital[] {
    const todos = this.getEscritos();
    const actualizados = todos.map((e) =>
      e.id === escritoId
        ? {
            ...e,
            firmado: true,
            firmaInfo,
          }
        : e
    );
    this.saveEscritos(actualizados);
    return actualizados;
  },

  getMensajes(): MensajeConsulta[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MENSAJES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MENSAJES, JSON.stringify(MENSAJES_INICIALES));
      return MENSAJES_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return MENSAJES_INICIALES;
    }
  },

  saveMensajes(mensajes: MensajeConsulta[]): void {
    localStorage.setItem(STORAGE_KEYS.MENSAJES, JSON.stringify(mensajes));
  },

  agregarMensaje(msg: MensajeConsulta): MensajeConsulta[] {
    const todos = this.getMensajes();
    const actualizados = [msg, ...todos];
    this.saveMensajes(actualizados);
    return actualizados;
  },

  responderMensaje(mensajeId: string, autorNombre: string, contenido: string, remitente: 'cliente' | 'estudio'): MensajeConsulta[] {
    const todos = this.getMensajes();
    const actualizados = todos.map((m) => {
      if (m.id === mensajeId) {
        const respuestas = m.respuestas || [];
        respuestas.push({
          id: `resp-${Date.now()}`,
          autorNombre,
          remitente,
          fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
          contenido,
        });
        return {
          ...m,
          respuestas,
          estado: remitente === 'estudio' ? ('Respondida' as const) : ('Pendiente' as const),
          leido: remitente === 'estudio',
        };
      }
      return m;
    });
    this.saveMensajes(actualizados);
    return actualizados;
  },

  getCitas(): CitaLegal[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CITAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CITAS, JSON.stringify(CITAS_INICIALES));
      return CITAS_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return CITAS_INICIALES;
    }
  },

  saveCitas(citas: CitaLegal[]): void {
    localStorage.setItem(STORAGE_KEYS.CITAS, JSON.stringify(citas));
  },

  agregarCita(cita: CitaLegal): CitaLegal[] {
    const todos = this.getCitas();
    const actualizados = [cita, ...todos];
    this.saveCitas(actualizados);
    return actualizados;
  },

  actualizarEstadoCita(citaId: string, nuevoEstado: CitaLegal['estado']): CitaLegal[] {
    const todos = this.getCitas();
    const actualizados = todos.map((c) => (c.id === citaId ? { ...c, estado: nuevoEstado } : c));
    this.saveCitas(actualizados);
    return actualizados;
  },

  getHonorarios(): PagoHonorario[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HONORARIOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HONORARIOS, JSON.stringify(HONORARIOS_INICIALES));
      return HONORARIOS_INICIALES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return HONORARIOS_INICIALES;
    }
  },

  saveHonorarios(honorarios: PagoHonorario[]): void {
    localStorage.setItem(STORAGE_KEYS.HONORARIOS, JSON.stringify(honorarios));
  },

  agregarHonorario(pago: PagoHonorario): PagoHonorario[] {
    const todos = this.getHonorarios();
    const actualizados = [pago, ...todos];
    this.saveHonorarios(actualizados);
    return actualizados;
  },

  actualizarEstadoHonorario(pagoId: string, nuevoEstado: 'Pagado' | 'Pendiente' | 'Vencido'): PagoHonorario[] {
    const todos = this.getHonorarios();
    const actualizados = todos.map((p) => (p.id === pagoId ? { ...p, estado: nuevoEstado } : p));
    this.saveHonorarios(actualizados);
    return actualizados;
  },

  getSesion(): SesionUsuario | null {
    const raw = localStorage.getItem(STORAGE_KEYS.SESION);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  saveSesion(sesion: SesionUsuario | null): void {
    if (!sesion) {
      localStorage.removeItem(STORAGE_KEYS.SESION);
    } else {
      localStorage.setItem(STORAGE_KEYS.SESION, JSON.stringify(sesion));
    }
  },

  reiniciarDatos(): void {
    localStorage.removeItem(STORAGE_KEYS.EXPEDIENTES);
    localStorage.removeItem(STORAGE_KEYS.CLIENTES);
    localStorage.removeItem(STORAGE_KEYS.MENSAJES);
    localStorage.removeItem(STORAGE_KEYS.CITAS);
    localStorage.removeItem(STORAGE_KEYS.HONORARIOS);
    localStorage.removeItem(STORAGE_KEYS.CUOTAS_PROGRAMADAS);
    localStorage.removeItem(STORAGE_KEYS.GASTOS);
    localStorage.removeItem(STORAGE_KEYS.ESCRITOS);
    localStorage.removeItem(STORAGE_KEYS.USUARIOS);
    localStorage.removeItem(STORAGE_KEYS.EVENTOS_INTERNOS);
    localStorage.removeItem(STORAGE_KEYS.SESION);
  },
};
