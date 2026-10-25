import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, Clock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { Cliente, Expediente, MensajeConsulta } from '../../types/legal';

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
  const misMensajes = mensajes.filter((m) => m.clienteId === cliente.id);
  const misExpedientes = expedientes.filter((e) => e.clienteId === cliente.id);

  const [asunto, setAsunto] = useState('');
  const [contenido, setContenido] = useState('');
  const [expedienteId, setExpedienteId] = useState(misExpedientes[0]?.id || '');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    const expObj = misExpedientes.find((e) => e.id === expedienteId);

    const correosDestino = [
      'diego.tapia@actiolegisec.com',
      'info@actiolegisec.com',
      expObj?.abogadoResponsable === 'Abg. Andrés Bolaños' 
        ? 'andres.bolanos@actiolegisec.com' 
        : (expObj?.abogadoResponsable === 'Dra. Marela Dunn' ? 'marela.dunn@actiolegisec.com' : 'diego.tapia@actiolegisec.com')
    ];

    const nuevo: MensajeConsulta = {
      id: `msg-cli-${Date.now()}`,
      expedienteId: expObj?.id,
      numeroCausa: expObj?.numeroCausa,
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      remitente: 'cliente',
      autorNombre: cliente.nombre,
      asunto: asunto.trim(),
      contenido: contenido.trim(),
      fechaEnvio: new Date().toISOString().replace('T', ' ').substring(0, 16),
      leido: false,
      estado: 'Pendiente',
      notificadoA: correosDestino,
      respuestas: [],
    };

    onEnviarMensaje(nuevo);
    setAsunto('');
    setContenido('');
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Canal Directo de Consultas con el Estudio Jurídico
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Comuníquese con sus abogados patrocinadores de Actio Legis para resolver dudas sobre sus casos y trámites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formulario para enviar pregunta */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Enviar Pregunta o Consulta</h2>
          </div>

          {enviado && (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1 font-medium">
              <div className="flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>¡Consulta enviada al Despacho Actio Legis!</span>
              </div>
              <p className="text-[11px] text-emerald-700 pl-6">
                Recibida y distribuida a los correos institucionales del estudio: diego.tapia@actiolegisec.com, info@actiolegisec.com y abogado patrocinador.
              </p>
            </div>
          )}

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <span className="font-semibold block text-slate-800">Canal institucional de atención:</span>
            <p className="text-[10px] text-slate-500">
              Las consultas ingresadas por este formulario son notificadas a los correos institucionales de Actio Legis (diego.tapia@actiolegisec.com, info@actiolegisec.com y abogado asignado) bajo secreto profesional.
            </p>
          </div>

          <form onSubmit={handleEnviar} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Juicio / Trámite Relacionado
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Asunto de la Consulta
              </label>
              <input
                type="text"
                required
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ej: Duda sobre fecha de audiencia o entrega de documentos"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mensaje / Detalle de la Pregunta
              </label>
              <textarea
                required
                rows={4}
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escriba su consulta claramente para que los abogados puedan responderle..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              Enviar Consulta al Despacho
            </button>
          </form>
        </div>

        {/* Historial de Preguntas y Respuestas */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Historial de Consultas Realizadas ({misMensajes.length})
          </h2>

          <div className="space-y-4">
            {misMensajes.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      msg.estado === 'Respondida'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {msg.estado}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{msg.fechaEnvio}</span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900">{msg.asunto}</h3>
                  {msg.numeroCausa && (
                    <div className="text-[10px] font-mono text-indigo-600 mt-0.5">
                      Causa: {msg.numeroCausa}
                    </div>
                  )}
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    &ldquo;{msg.contenido}&rdquo;
                  </p>
                </div>

                {/* Respuestas del Estudio Jurídico */}
                {msg.respuestas && msg.respuestas.length > 0 ? (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-bold text-indigo-900 block">
                      Respuesta del Abogado:
                    </span>
                    {msg.respuestas.map((r) => (
                      <div
                        key={r.id}
                        className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-slate-800 leading-relaxed space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px] text-indigo-950 font-semibold">
                          <span>{r.autorNombre} (Actio Legis)</span>
                          <span className="font-mono text-[10px] text-slate-400">{r.fecha}</span>
                        </div>
                        <p>{r.contenido}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-700 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Esperando respuesta del abogado a cargo...</span>
                  </div>
                )}
              </div>
            ))}

            {misMensajes.length === 0 && (
              <div className="p-10 text-center bg-white rounded-xl border border-dashed border-slate-200">
                <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-700">No ha realizado consultas aún</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Escriba sus dudas en el formulario para comunicarse con su abogado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
