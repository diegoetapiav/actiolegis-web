import React, { useState } from 'react';
import { Cliente, Expediente, MensajeConsulta } from '../../types/legal';
import { MessageSquare, Send, Clock, User, Shield, CheckCircle2 } from 'lucide-react';

interface ClienteConsultasViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  mensajes: MensajeConsulta[];
  onEnviarMensaje: (msg: MensajeConsulta) => void;
}

export const ClienteConsultasView: React.FC<ClienteConsultasViewProps> = ({
  cliente,
  expedientes,
  mensajes,
  onEnviarMensaje,
}) => {
  const [asunto, setAsunto] = useState('');
  const [expedienteSeleccionadoId, setExpedienteSeleccionadoId] = useState(
    expedientes[0]?.id || ''
  );
  const [contenido, setContenido] = useState('');
  const [enviadoExito, setEnviadoExito] = useState(false);

  // Filtrar los mensajes de este cliente
  const misMensajes = mensajes.filter(
    (m) =>
      m.clienteId === cliente.id ||
      m.remitente.toLowerCase().includes(cliente.nombre.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asunto.trim() || !contenido.trim()) return;

    const nuevoMensaje: MensajeConsulta = {
      id: `msg-${Date.now()}`,
      clienteId: cliente.id,
      expedienteId: expedienteSeleccionadoId || undefined,
      remitente: cliente.nombre,
      tipoRemitente: 'cliente',
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      asunto: asunto.trim(),
      contenido: contenido.trim(),
      estado: 'Pendiente',
      respuestas: [],
    };

    onEnviarMensaje(nuevoMensaje);
    setAsunto('');
    setContenido('');
    setEnviadoExito(true);
    setTimeout(() => setEnviadoExito(false), 4000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Cabecera de la sección */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
          <MessageSquare className="w-4 h-4 text-neutral-900" />
          <span>Canal Privado de Comunicación</span>
        </div>
        <h2 className="text-2xl font-serif font-bold text-neutral-950">
          Consultas Directas con su Abogado
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          Plantee inquietudes jurídicas sobre sus expedientes. Su equipo legal revisará y responderá con prontitud técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario de nueva consulta */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-xs">
          <h3 className="font-serif font-bold text-neutral-950 text-base mb-4">
            Redactar Nueva Consulta
          </h3>

          {enviadoExito && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Su consulta ha sido enviada al despacho exitosamente.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
                Expediente o Causa Relacionada
              </label>
              <select
                value={expedienteSeleccionadoId}
                onChange={(e) => setExpedienteSeleccionadoId(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-neutral-950"
              >
                <option value="">Consulta General (Sin causa específica)</option>
                {expedientes.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.numProceso} — {exp.tipoProceso}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
                Asunto de la Consulta
              </label>
              <input
                type="text"
                required
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="ej. Duda sobre la fecha de audiencia"
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-neutral-950"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1">
                Detalle del Mensaje
              </label>
              <textarea
                required
                rows={4}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escriba aquí los detalles de su inquietud..."
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-neutral-950 leading-relaxed resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Consulta</span>
            </button>
          </form>
        </div>

        {/* Historial de consultas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Historial de Mensajes ({misMensajes.length})
            </h3>
          </div>

          {misMensajes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-xs text-neutral-500">
              No registra consultas previas. Utilice el formulario lateral para comunicarse con su abogado patrocinador.
            </div>
          ) : (
            <div className="space-y-3">
              {misMensajes.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-2.5">
                    <div>
                      <span className="font-serif font-bold text-neutral-950 text-sm">
                        {msg.asunto}
                      </span>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{msg.fecha}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md border ${
                        msg.estado === 'Respondido'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {msg.estado}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    {msg.contenido}
                  </p>

                  {/* Respuestas del equipo legal */}
                  {msg.respuestas && msg.respuestas.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-neutral-100">
                      {msg.respuestas.map((resp, i) => (
                        <div
                          key={i}
                          className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/80 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-900">
                            <span className="flex items-center gap-1.5">
                              <Shield className="w-3 h-3 text-neutral-700" />
                              {resp.autor} • ACTIO LEGIS
                            </span>
                            <span className="text-neutral-400 font-mono text-[10px]">
                              {resp.fecha}
                            </span>
                          </div>
                          <p className="text-neutral-600 leading-relaxed pt-1">
                            {resp.contenido}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
