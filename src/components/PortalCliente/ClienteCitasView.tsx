import React, { useState } from 'react';
import { 
  Calendar, Clock, Video, MapPin, Plus, CheckCircle2, AlertCircle, 
  ArrowRight, ExternalLink, ShieldCheck, Lock, AlertTriangle, Scale 
} from 'lucide-react';
import { Cliente, Expediente, CitaLegal, EventoCalendarioInterno } from '../../types/legal';

interface ClienteCitasViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  citas: CitaLegal[];
  eventosInternos?: EventoCalendarioInterno[];
  onSolicitarCita: (cita: CitaLegal) => void;
}

export const ClienteCitasView: React.FC<ClienteCitasViewProps> = ({
  cliente,
  expedientes,
  citas,
  eventosInternos = [],
  onSolicitarCita,
}) => {
  const misCitas = citas.filter((c) => c.clienteId === cliente.id);
  const misExpedientes = expedientes.filter((e) => e.clienteId === cliente.id);

  const URL_CALENDLY = 'https://calendly.com/app/scheduling/meeting_types/user/me';

  // Formulario de Reserva
  const [fecha, setFecha] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [hora, setHora] = useState('15:00');
  const [modalidad, setModalidad] = useState<CitaLegal['modalidad']>('Videollamada Zoom / Meet');
  const [expedienteId, setExpedienteId] = useState(misExpedientes[0]?.id || '');
  const [motivo, setMotivo] = useState('');
  const [enviadoExito, setEnviadoExito] = useState(false);

  // Verificación de disponibilidad contra el Calendario Interno de Audiencias
  const eventoConflicto = eventosInternos.find((ev) => {
    if (!ev.bloqueaDisponibilidadExterna) return false;
    if (ev.fecha !== fecha) return false;

    // Verificar solapamiento de horas (ej: hora = "10:00", ev: "09:00" a "11:00")
    const [hSel, mSel] = hora.split(':').map(Number);
    const minSel = hSel * 60 + mSel;

    const [hIni, mIni] = ev.horaInicio.split(':').map(Number);
    const minIni = hIni * 60 + mIni;

    const [hFin, mFin] = ev.horaFin.split(':').map(Number);
    const minFin = hFin * 60 + mFin;

    // Cita estimada de 45 min
    const minSelFin = minSel + 45;

    return minSel < minFin && minSelFin > minIni;
  });

  const horarioEstaBloqueado = Boolean(eventoConflicto);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (horarioEstaBloqueado) {
      alert('El horario seleccionado no está disponible debido a una audiencia judicial del despacho. Por favor seleccione otro horario.');
      return;
    }

    const expObj = misExpedientes.find((e) => e.id === expedienteId);

    const nuevaCita: CitaLegal = {
      id: `cita-cli-${Date.now()}`,
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      expedienteId: expObj?.id,
      numeroCausa: expObj?.numeroCausa,
      fecha,
      hora,
      duracionMinutos: 45,
      modalidad,
      motivo: motivo.trim() || 'Consulta sobre el avance del proceso judicial',
      abogadoAsignado: expObj?.abogadoResponsable || 'Dr. Diego Tapia',
      estado: 'Pendiente de Aprobación',
      enlaceReunion: modalidad.includes('Videollamada') ? 'https://meet.google.com/actio-legis-cita' : undefined,
      lugar: modalidad.includes('Presencial')
        ? 'Oficinas Actio Legis - Av. 12 de Octubre y Lincoln, Edif. Mirage, Quito'
        : undefined,
    };

    onSolicitarCita(nuevaCita);
    setEnviadoExito(true);
    setMotivo('');
    setTimeout(() => setEnviadoExito(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono">
            ESTUDIO JURÍDICO ACTIO LEGIS
          </span>
          <span className="text-xs text-slate-400">· Portal Privado de Clientes</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Agendamiento de Citas con sus Abogados Patrocinadores
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Reserve sesiones virtuales o presenciales para coordinar la estrategia jurídica y resolver dudas de sus causas.
        </p>
      </div>

      {/* Banner de Integración Calendly Oficial */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900 to-slate-950 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 font-mono">
              Agendamiento Automatizado vía Calendly
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">
            ¿Prefiere agendar directamente en nuestro Calendly Institucional?
          </h3>
          <p className="text-xs text-indigo-200/90 leading-relaxed max-w-2xl">
            Acceda a la disponibilidad en tiempo real de los abogados de Actio Legis para coordinar videoconferencias inmediatas en Google Meet o Zoom.
          </p>
        </div>

        <a
          href={URL_CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Agendar en Calendly Oficial
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formulario de Solicitud de Cita con Verificador de Audiencias Internas */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Solicitud Directa en Plataforma</h2>
            </div>
            <span className="text-[10px] text-slate-500 font-mono font-bold">Modo Consultivo</span>
          </div>

          {enviadoExito && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ¡Su cita fue registrada exitosamente! El despacho de Actio Legis le enviará la confirmación y enlace.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Juicio / Trámite a Tratar
              </label>
              <select
                value={expedienteId}
                onChange={(e) => setExpedienteId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="">Consulta legal general (Sin causa específica)</option>
                {misExpedientes.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.numeroCausa} - {e.titulo.substring(0, 32)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha Sugerida</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hora Deseada</label>
                <input
                  type="time"
                  required
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            {/* Verificador de Disponibilidad contra Agenda Interna de Audiencias */}
            {horarioEstaBloqueado ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Horario no disponible:</strong>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    Los abogados de Actio Legis tienen programada una audiencia judicial o diligencia en este horario ({fecha} a las {hora}). Por favor seleccione otro horario o consulte en Calendly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[11px]">
                  Horario verificado: Disponible en la agenda del despacho.
                </span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Modalidad de Reunión</label>
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Videollamada Zoom / Meet">Videollamada por Google Meet / Zoom</option>
                <option value="Presencial en Despacho">Presencial en Despacho (Quito, Av. 12 de Octubre)</option>
                <option value="Llamada Telefónica">Llamada Telefónica Directa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ¿Qué tema o duda desea revisar con su abogado?
              </label>
              <textarea
                required
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej: Deseo revisar las preguntas previas a la audiencia de juicio..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={horarioEstaBloqueado}
              className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs ${
                horarioEstaBloqueado
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {horarioEstaBloqueado ? 'Seleccione otro horario libre' : 'Enviar Solicitud de Cita al Estudio'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Lista de Citas Solicitadas y Confirmadas */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Mis Citas y Reuniones Programadas ({misCitas.length})
          </h2>

          <div className="space-y-3">
            {misCitas.map((cita) => {
              const esConfirmada = cita.estado === 'Confirmada';
              const esVirtual = cita.modalidad.includes('Videollamada');

              return (
                <div
                  key={cita.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        esConfirmada
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {cita.estado}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cita.hora}</span>
                      <span className="text-[11px] text-slate-400">({cita.duracionMinutos} min)</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{cita.motivo}</h3>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Abogado Asignado: <span className="font-semibold text-slate-700">{cita.abogadoAsignado}</span>
                    </div>
                    {cita.numeroCausa && (
                      <div className="font-mono text-[10px] text-indigo-700 mt-0.5">
                        Causa: {cita.numeroCausa}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-mono font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cita.fecha}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-600">
                      {esVirtual ? (
                        <Video className="w-3.5 h-3.5 text-indigo-500" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>{cita.modalidad}</span>
                    </div>
                  </div>

                  {esConfirmada && cita.enlaceReunion && (
                    <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-between text-xs">
                      <span className="text-indigo-900 font-medium">Enlace de Videollamada:</span>
                      <a
                        href={cita.enlaceReunion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Unirse a Reunión
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {misCitas.length === 0 && (
              <div className="p-10 text-center bg-white rounded-xl border border-dashed border-slate-200">
                <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-700">No tiene citas agendadas aún</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Utilice el formulario de la izquierda o el botón de Calendly para programar su cita.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
