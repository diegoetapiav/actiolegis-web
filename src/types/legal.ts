export type MateriaLegal = 
  | 'Civil y Mercantil'
  | 'Laboral'
  | 'Societario y Corporativo'
  | 'Penal'
  | 'Constitucional'
  | 'Tributario y Aduanero'
  | 'Contencioso Administrativo'
  | 'Trámite Notarial y Registral'
  | 'Familia y Niñez';

export type EtapaProcesal = 
  | 'Fase Previa / Trámite Administrativo'
  | 'Sin Etapa Asignada (Apertura de Expediente)'
  | 'Calificación de Demanda'
  | 'Citación Judicial'
  | 'Término para Contestar'
  | 'Audiencia Preliminar'
  | 'Fase Probatoria'
  | 'Audiencia de Juicio'
  | 'Sentencia de Primera Instancia'
  | 'Recurso de Apelación'
  | 'Casación'
  | 'Ejecución / Mandamiento de Pago'
  | 'Concluido / Archivado';

export type TipoActuacion = 
  | 'Providencia Judicial'
  | 'Notificación Electrónica'
  | 'Escrito Presentado'
  | 'Audiencia Realizada'
  | 'Informe Pericial'
  | 'Sentencia / Auto Resolutorio'
  | 'Razón Notarial'
  | 'Resolución Administrativa';

export type RolUsuarioEstudio = 
  | 'Abogado Socio'
  | 'Abogado Asociado'
  | 'Pasante'
  | 'Asistente'
  | 'Administrativo';

export interface UsuarioEstudio {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuarioEstudio;
  tarifaHora: number;
  cedula: string;
  matriculaForo?: string;
  entidadCertificadoraFirma?: string;
  puedeResponderConsultas: boolean; // info@actiolegisec.com = false
  puedeFirmarEscritos: boolean; // Solo Socios y Asociados por cuenta propia
  activo: boolean;
  telefono?: string;
  departamento?: string;
}

export interface ActuacionJudicial {
  id: string;
  fecha: string;
  tipo: TipoActuacion;
  titulo: string;
  resumen: string;
  resumenParaCliente?: string;
  foja?: string;
  abogado: string;
  documentoUrl?: string;
  origenSatje?: boolean;
}

export interface CuotaProgramada {
  id: string;
  clienteId: string;
  clienteNombre: string;
  expedienteId: string;
  numeroCausa: string;
  numeroCuota: number;
  totalCuotas: number;
  descripcion: string;
  monto: number;
  fechaVencimiento: string; // YYYY-MM-DD
  estado: 'Pendiente' | 'Pagado' | 'Vencido';
  fechaPagoRealizado?: string;
  numeroComprobante?: string;
  observaciones?: string;
}

export interface GastoCliente {
  id: string;
  clienteId: string;
  clienteNombre: string;
  expedienteId: string;
  numeroCausa: string;
  concepto: string;
  monto: number;
  fecha: string;
  numeroComprobanteFactura: string;
  proveedor: string;
  tipoComprobante: 'Factura Electrónica' | 'Tasa Judicial Judicatura' | 'Recibo Notarial' | 'Honorario Peritaje';
  comprobanteArchivoUrl?: string;
  comprobanteNombreArchivo?: string;
  reembolsadoPorCliente: boolean;
  fechaReembolso?: string;
  registradoPor: string;
}

export interface EventoCalendarioInterno {
  id: string;
  abogadoId: string;
  abogadoNombre: string;
  titulo: string; // Ej: "Audiencia de Juicio Laboral - Sala 4 Zoom"
  tipo: 'Audiencia Judicial' | 'Diligencia Pericial' | 'Inspección Judicial' | 'Reunión de Socios' | 'Diligencia Notarial';
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:mm
  horaFin: string; // HH:mm
  bloqueaDisponibilidadExterna: boolean;
  expedienteId?: string;
  numeroCausa?: string;
  lugar?: string;
  notasConfidenciales?: string;
}

export interface Expediente {
  id: string;
  numeroCausa: string; // Ej: 17230-2024-00482
  tipoProceso: 'Juicio Judicial' | 'Trámite Administrativo' | 'Trámite Notarial / Societario';
  titulo: string;
  materia: MateriaLegal;
  etapa?: EtapaProcesal | string;
  estado: 'En Trámite' | 'Audiencia Fijada' | 'En Término Fatal' | 'Sentencia Favorable' | 'En Apelación' | 'Concluido';
  clienteId: string;
  clienteNombre: string;
  clienteCodigoAcceso: string;
  contraparte: string;
  abogadoResponsable: string;
  abogadoResponsableId?: string;
  judicatura: string;
  salaTribunal?: string;
  juezPonente?: string;
  cuantia: number;
  honorariosPactados: number;
  honorariosCobrados: number;
  fechaInicio: string;
  proximoTermino?: string;
  descripcionTermino?: string;
  resumenCaso: string;
  actuaciones: ActuacionJudicial[];
  ultimaSincronizacionSatje?: string;
  enlaceSatje?: string;
}

export interface Cliente {
  id: string;
  codigoAcceso: string;
  tipo: 'Persona Jurídica' | 'Persona Natural';
  nombre: string;
  identificacion: string;
  representanteLegal?: string;
  email: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  fechaRegistro: string;
  notasInternas?: string;
  abogadoAsignadoId?: string;
  abogadoAsignadoNombre?: string;
}

export interface MensajeConsulta {
  id: string;
  expedienteId?: string;
  numeroCausa?: string;
  clienteId: string;
  clienteNombre: string;
  remitente: 'cliente' | 'estudio';
  autorNombre: string;
  asunto: string;
  contenido: string;
  fechaEnvio: string;
  leido: boolean;
  estado: 'Pendiente' | 'Respondida' | 'En Revisión';
  abogadoAsignadoId?: string;
  notificadoA?: string[]; // Correos que recibieron la alerta
  respuestas?: {
    id: string;
    autorNombre: string;
    remitente: 'cliente' | 'estudio';
    fecha: string;
    contenido: string;
  }[];
}

export interface CitaLegal {
  id: string;
  clienteId: string;
  clienteNombre: string;
  expedienteId?: string;
  numeroCausa?: string;
  fecha: string;
  hora: string;
  duracionMinutos: number;
  modalidad: 'Presencial en Despacho' | 'Videollamada Zoom / Meet' | 'Llamada Telefónica';
  motivo: string;
  abogadoAsignado: string;
  abogadoAsignadoId?: string;
  estado: 'Confirmada' | 'Pendiente de Aprobación' | 'Realizada' | 'Cancelada';
  enlaceReunion?: string;
  lugar?: string;
  notasEstudio?: string;
  origenCalendly?: boolean;
}

export interface PagoHonorario {
  id: string;
  expedienteId: string;
  numeroCausa: string;
  clienteId: string;
  clienteNombre: string;
  concepto: string;
  monto: number;
  fecha: string;
  formaPago: 'Transferencia Bancaria' | 'Cheque' | 'Efectivo' | 'Tarjeta de Crédito';
  numeroComprobante: string;
  estado: 'Pagado' | 'Pendiente' | 'Vencido';
  fechaVencimiento?: string;
}

export interface CausaSatjeBusqueda {
  numeroCausa: string;
  fechaIngreso: string;
  infraccionDelitoAccion: string;
  materia: string;
  tipoAccion: string;
  judicatura: string;
  juezPonente: string;
  actorOfendido: string;
  demandadoProcesado: string;
  estadoActual: string;
  actuaciones: {
    fecha: string;
    tipo: string;
    titulo: string;
    detalle: string;
    foja: string;
  }[];
}

export interface EscritoFirmaDigital {
  id: string;
  expedienteId: string;
  numeroCausa: string;
  titulo: string;
  materia: string;
  tipoEscrito: 'Contestación a la Demanda' | 'Anuncio de Prueba / Impugnación' | 'Recurso de Apelación' | 'Solicitud de Copias y Casillero' | 'Memorial General';
  contenidoTexto: string;
  fechaGeneracion: string;
  firmado: boolean;
  autorizadoPorAbogado?: string; // Para asistentes
  firmaInfo?: {
    titular: string;
    cedulaAbogado: string;
    entidadCertificadora: string;
    fechaFirma: string;
    hashFirmaSha256: string;
    selloTiempo: string;
  };
  destinoVentanilla: 'Ventanilla Virtual SATJE' | 'Casillero Judicial e-Satje' | 'Corte Constitucional ESACC';
}
