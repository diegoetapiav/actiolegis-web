import React, { useState } from 'react';
import { 
  Calendar, Plus, Clock, Video, MapPin, CheckCircle, XCircle, 
  User, Phone, Check, ShieldAlert, AlertTriangle, ExternalLink, 
  Lock, CalendarDays, Scale, Eye, Trash2
} from 'lucide-react';
import { CitaLegal, Cliente, Expediente, EventoCalendarioInterno, UsuarioEstudio } from '../../types/legal';

interface CitasManagerProps {
  citas: CitaLegal[];
  eventosInternos: EventoCalendarioInterno[];
  clientes: Cliente[];
  expedientes: Expediente[];
  usuariosEstudio: UsuarioEstudio[];
  usuarioActivo: UsuarioEstudio;
  onAgregarCita: (cita: CitaLegal) => void;
  onActualizarEstadoCita: (citaId: string, nuevoEstado: CitaLegal['estado']) => void;
  onAgregarEventoInterno: (evento: EventoCalendarioInterno) => void;
  onEliminarEventoInterno: (eventoId: string) => void;
}

export const CitasManager: React.FC<CitasManagerProps> = ({
  citas,
  eventosInternos,
  clientes,
  expedientes,
  usuariosEstudio,
  usuarioActivo,
  onAgregarCita,
  onActualizarEstadoCita,
  onAgregarEventoInterno,
  onEliminarEventoInterno,
}) => {
  const [tabAgenda, setTabAgenda] = useState<'clientes' | 'interno'>('clientes');
  const [mostrarModalNuevaCita, setMostrarModalNuevaCita] = useState(false);
  const [mostrarModalNuevoEventoInterno, setMostrarModalNuevoEventoInterno] = useState(false);
  const [filtroModalidad, setFiltroModalidad] = useState<string>('todas');

  // Formulario Nueva Cita Cliente
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [expedienteId, setExpedienteId] = useState(expedientes[0]?.id || '');
  const [fechaCita, setFechaCita] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [horaCita, setHoraCita] = useState('10:00');
  const [modalidadCita, setModalidadCita] = useState<CitaLegal['modalidad']>(
    'Videollamada Zoom / Meet'
  );
  const [motivoCita, setMotivoCita] = useState('');
  const [abogadoAsignado, setAbogadoAsignado] = useState(usuarioActivo.nombre);

  // Formulario Evento Interno de Abogados
  const [eventoTitulo, setEventoTitulo] = useState('');
  const [eventoTipo, setEventoTipo] = useState<EventoCalendarioInterno['tipo']>('Audiencia Judicial');
  const [eventoFecha, setEventoFecha] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [eventoHoraInicio, setEventoHoraInicio] = useState('09:00');
  const [eventoHoraFin, setEventoHoraFin] = useState('11:00');
  const [eventoAbogado, setEventoAbogado] = useState(usuarioActivo.nombre);
  const [eventoCausa, setEventoCausa] = useState(expedientes[0]?.numeroCausa || '');
  const [eventoLugar, setEventoLugar] = useState('Sala de Audiencias - Complejo Judicial Norte (Quito)');
  const [eventoNotas, setEventoNotas] = useState('');
  const [bloqueaDisponibilidad, setBloqueaDisponibilidad] = useState(true);

  const URL_CALENDLY = 'https://calendly.com/app/scheduling/meeting_types/user/me';

  const puedeEditarCalendario =
    usuarioActivo.rol === 'Abogado Socio' ||
    usuarioActivo.rol === 'Abogado Asociado' ||
    usuarioActivo.rol === 'Asistente';

  const citasFiltradas = citas.filter((c) => {
    if (filtroModalidad === 'todas') return true;
    return c.modalidad.toLowerCase().includes(filtroModalidad.toLowerCase());
  });

  const handleCrearCitaCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const clienteObj = clientes.find((c) => c.id === clienteId);
    const expObj = expedientes.find((e) => e.id === expedienteId);

    const nueva: CitaLegal = {
      id: `cita-man-${Date.now()}`,
      clienteId: clienteObj?.id || 'cli-general',
      clienteNombre: clienteObj?.nombre || 'Cliente General',
      expedienteId: expObj?.id,
      numeroCausa: expObj?.numeroCausa,
      fecha: fechaCita,
      hora: horaCita,
      duracionMinutos: 45,
      modalidad: modalidadCita,
      motivo: motivoCita.trim() || 'Consulta sobre estado del proceso judicial',
      abogadoAsignado,
      estado: 'Confirmada',
      enlaceReunion: modalidadCita.includes('Videollamada')
        ? 'https://meet.google.com/actio-legis-reunion'
        : undefined,
      lugar: modalidadCita.includes('Presencial')
        ? 'Sede Actio Legis - Av. 12 de Octubre y Lincoln, Edif. Mirage, Quito'
        : undefined,
    };

    onAgregarCita(nueva);
    setMostrarModalNuevaCita(false);
    setMotivoCita('');
  };

  const handleCrearEventoInterno = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventoTitulo.trim()) return;

    const nuevo: EventoCalendarioInterno = {
      id: `ev-int-${Date.now()}`,
      abogadoId: usuarioActivo.id,
      abogadoNombre: eventoAbogado,
      titulo: eventoTitulo.trim(),
      tipo: eventoTipo,
      fecha: eventoFecha,
      horaInicio: eventoHoraInicio,
      horaFin: eventoHoraFin,
      bloqueaDisponibilidadExterna: bloqueaDisponibilidad,
      numeroCausa: eventoCausa,
      lugar: eventoLugar,
      notasConfidenciales: eventoNotas,
    };

    onAgregarEventoInterno(nuevo);
    setMostrarModalNuevoEventoInterno(false);
    setEventoTitulo('');
    setEventoNotas('');
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Sistema Dual de Agenda & Audiencias</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">
            Calendario Dual: Audiencias Internas & Citas de Clientes
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Gestión interna de audiencias judiciales que bloquean automáticamente la disponibilidad externa en Calendly y el portal de clientes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={URL_CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-white hover:bg-black hover:text-white text-black border-1.5 border-black font-bold text-xs transition-all flex items-center gap-2 actio-shadow-sm"
            title="Abrir enlace de gestión de citas en Calendly"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Calendly Oficial
          </a>

          {tabAgenda === 'clientes' ? (
            <button
              onClick={() => setMostrarModalNuevaCita(true)}
              className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-white" />
              Agendar Cita con Cliente
            </button>
          ) : (
            <button
              onClick={() => setMostrarModalNuevoEventoInterno(true)}
              className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <Plus className="w-4 h-4 text-white" />
              Programar Audiencia Interna
            </button>
          )}
        </div>
      </div>

      {/* Selector de Pestañas de Agenda Arquitectónicas */}
      <div className="flex gap-2">
        <button
          onClick={() => setTabAgenda('clientes')}
          className={`py-2.5 px-4 font-bold text-xs transition-all flex items-center gap-2 border ${
            tabAgenda === 'clientes'
              ? 'bg-black text-white border-black actio-shadow-sm'
              : 'bg-white text-slate-700 border-slate-300 hover:border-black'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Agenda de Citas con Clientes ({citas.length})
        </button>

        <button
          onClick={() => setTabAgenda('interno')}
          className={`py-2.5 px-4 font-bold text-xs transition-all flex items-center gap-2 border ${
            tabAgenda === 'interno'
              ? 'bg-black text-white border-black actio-shadow-sm'
              : 'bg-white text-slate-700 border-slate-300 hover:border-black'
          }`}
        >
          <Scale className="w-4 h-4" />
          Calendario Interno de Audiencias & Diligencias ({eventosInternos.length})
          <span className="text-[10px] px-1.5 py-0.2 bg-white text-black font-mono font-bold border border-black">
            Bloquea Horarios
          </span>
        </button>
      </div>

      {/* Contenido: Tab 1 - Citas Clientes */}
      {tabAgenda === 'clientes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Solicitudes desde el Portal de Clientes y agendamientos confirmados de la firma
            </span>
            <div className="flex items-center gap-2">
              <label className="font-medium text-slate-600">Modalidad:</label>
              <select
                value={filtroModalidad}
                onChange={(e) => setFiltroModalidad(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
              >
                <option value="todas">Todas las modalidades</option>
                <option value="Videollamada">Videollamada</option>
                <option value="Presencial">Presencial en Despacho</option>
                <option value="Telefónica">Llamada Telefónica</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citasFiltradas.map((cita) => {
              const esPendiente = cita.estado === 'Pendiente de Aprobación';
              const esVirtual = cita.modalidad.includes('Videollamada');

              return (
                <div
                  key={cita.id}
                  className={`p-5 rounded-xl border bg-white shadow-2xs space-y-3 transition-all ${
                    esPendiente ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        cita.estado === 'Confirmada'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : esPendiente
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cita.estado}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cita.hora}</span>
                      <span className="text-[10px] text-slate-400">({cita.duracionMinutos} min)</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">{cita.motivo}</h3>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{cita.clienteNombre}</span>
                    </div>
                    {cita.numeroCausa && (
                      <div className="font-mono text-[10px] text-indigo-600 mt-0.5">
                        Causa: {cita.numeroCausa}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800 font-mono">{cita.fecha}</span>
                      <span className="text-slate-400 text-[11px]">· {cita.abogadoAsignado}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      {esVirtual ? (
                        <Video className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      <span className="truncate">{cita.modalidad}</span>
                    </div>

                    {cita.enlaceReunion && (
                      <a
                        href={cita.enlaceReunion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 pt-1 font-mono"
                      >
                        🔗 {cita.enlaceReunion}
                      </a>
                    )}
                  </div>

                  {esPendiente && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onActualizarEstadoCita(cita.id, 'Confirmada')}
                        className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Confirmar Cita
                      </button>
                      <button
                        onClick={() => onActualizarEstadoCita(cita.id, 'Cancelada')}
                        className="py-1.5 px-3 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contenido: Tab 2 - Calendario Interno de Audiencias y Diligencias */}
      {tabAgenda === 'interno' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Bloqueo de Disponibilidad Externa Activo:</strong>
                <p className="text-[11px] text-amber-900 mt-0.5">
                  Las audiencias y diligencias registradas en este panel son de carácter confidencial interno. Los clientes no ven los detalles de las causas de otros patrocinados, pero el horario queda automáticamente reservado en el portal externo y en el enlace de Calendly para evitar solapamientos.
                </p>
              </div>
            </div>

            <button
              onClick={() => setMostrarModalNuevoEventoInterno(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
            >
              + Agregar Audiencia
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventosInternos.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                    {ev.tipo}
                  </span>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Horario Bloqueado
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{ev.titulo}</h3>
                  <div className="text-[11px] text-slate-600 font-medium mt-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.abogadoNombre}</span>
                  </div>
                  {ev.numeroCausa && (
                    <div className="font-mono text-[10px] text-indigo-700 mt-0.5">
                      Causa SATJE: {ev.numeroCausa}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ev.fecha}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-700 font-mono font-bold">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{ev.horaInicio} - {ev.horaFin}</span>
                    </div>
                  </div>

                  {ev.lugar && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ev.lugar}</span>
                    </div>
                  )}

                  {ev.notasConfidenciales && (
                    <div className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-600 italic">
                      "{ev.notasConfidenciales}"
                    </div>
                  )}
                </div>

                {puedeEditarCalendario && (
                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => onEliminarEventoInterno(ev.id)}
                      className="text-[11px] text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 transition-colors"
                      title="Eliminar evento del calendario interno"
                    >
                      <Trash2 className="w-3 h-3" />
                      Liberar Horario
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Nueva Cita Cliente */}
      {mostrarModalNuevaCita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-700/50 overflow-hidden text-slate-900">
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <h3 className="text-sm font-bold tracking-tight">Agendar Cita con Cliente</h3>
              <button
                onClick={() => setMostrarModalNuevaCita(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCrearCitaCliente} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente</label>
                <select
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} ({c.codigoAcceso})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Causa / Expediente (Opcional)
                </label>
                <select
                  value={expedienteId}
                  onChange={(e) => setExpedienteId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="">Ninguno / Consulta General</option>
                  {expedientes.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.numeroCausa} - {e.titulo.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={fechaCita}
                    onChange={(e) => setFechaCita(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={horaCita}
                    onChange={(e) => setHoraCita(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Modalidad</label>
                  <select
                    value={modalidadCita}
                    onChange={(e) => setModalidadCita(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Videollamada Zoom / Meet">Videollamada Google Meet / Zoom</option>
                    <option value="Presencial en Despacho">Presencial en Despacho Actio Legis</option>
                    <option value="Llamada Telefónica">Llamada Telefónica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Abogado Responsable
                  </label>
                  <select
                    value={abogadoAsignado}
                    onChange={(e) => setAbogadoAsignado(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {usuariosEstudio
                      .filter((u) => u.rol === 'Abogado Socio' || u.rol === 'Abogado Asociado')
                      .map((u) => (
                        <option key={u.id} value={u.nombre}>
                          {u.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Motivo o Asunto a Tratar
                </label>
                <textarea
                  rows={2}
                  required
                  value={motivoCita}
                  onChange={(e) => setMotivoCita(e.target.value)}
                  placeholder="Ej: Preparación de declaración testimonial y revisión de pruebas..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setMostrarModalNuevaCita(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                >
                  Confirmar y Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nuevo Evento Interno (Audiencia/Diligencia) */}
      {mostrarModalNuevoEventoInterno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-700/50 overflow-hidden text-slate-900">
            <div className="px-6 py-4 bg-amber-950 text-white flex items-center justify-between border-b border-amber-900">
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  Programar Audiencia / Diligencia Judicial Interna
                </h3>
                <p className="text-[11px] text-amber-300">
                  Ocupa automáticamente la disponibilidad externa en Calendly y Portal Cliente
                </p>
              </div>
              <button
                onClick={() => setMostrarModalNuevoEventoInterno(false)}
                className="text-amber-300 hover:text-white p-1 rounded text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCrearEventoInterno} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título de la Diligencia / Audiencia
                </label>
                <input
                  type="text"
                  required
                  value={eventoTitulo}
                  onChange={(e) => setEventoTitulo(e.target.value)}
                  placeholder="Ej: Audiencia de Juicio Laboral - Sala 302"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Evento</label>
                  <select
                    value={eventoTipo}
                    onChange={(e) => setEventoTipo(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Audiencia Judicial">Audiencia Judicial (SATJE)</option>
                    <option value="Diligencia Pericial">Diligencia Pericial</option>
                    <option value="Inspección Judicial">Inspección Judicial</option>
                    <option value="Diligencia Notarial">Diligencia Notarial</option>
                    <option value="Reunión de Socios">Reunión de Socios / Estrategia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Abogado Convocado
                  </label>
                  <select
                    value={eventoAbogado}
                    onChange={(e) => setEventoAbogado(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {usuariosEstudio
                      .filter((u) => u.rol === 'Abogado Socio' || u.rol === 'Abogado Asociado')
                      .map((u) => (
                        <option key={u.id} value={u.nombre}>
                          {u.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={eventoFecha}
                    onChange={(e) => setEventoFecha(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    required
                    value={eventoHoraInicio}
                    onChange={(e) => setEventoHoraInicio(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    required
                    value={eventoHoraFin}
                    onChange={(e) => setEventoHoraFin(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Causa Judicial Vinculada
                  </label>
                  <input
                    type="text"
                    value={eventoCausa}
                    onChange={(e) => setEventoCausa(e.target.value)}
                    placeholder="17230-2024-00482"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lugar / Sala / Enlace
                  </label>
                  <input
                    type="text"
                    value={eventoLugar}
                    onChange={(e) => setEventoLugar(e.target.value)}
                    placeholder="Complejo Judicial / Zoom Judicatura"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notas Confidenciales del Despacho
                </label>
                <textarea
                  rows={2}
                  value={eventoNotas}
                  onChange={(e) => setEventoNotas(e.target.value)}
                  placeholder="Estrategia procesal previa, pruebas a presentar..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkBloquea"
                  checked={bloqueaDisponibilidad}
                  onChange={(e) => setBloqueaDisponibilidad(e.target.checked)}
                  className="rounded border-amber-400 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="chkBloquea" className="text-xs text-amber-900 font-medium">
                  Bloquear este espacio de tiempo para clientes en el Calendario Externo (Calendly)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setMostrarModalNuevoEventoInterno(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                >
                  Guardar Audiencia & Bloquear Horario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
