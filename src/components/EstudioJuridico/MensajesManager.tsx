import React, { useState } from 'react';
import { 
  MessageSquare, Send, CheckCheck, Clock, User, Reply, FolderGit2, 
  Mail, ShieldCheck, ShieldAlert, Lock, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { MensajeConsulta, UsuarioEstudio, Cliente } from '../../types/legal';

interface MensajesManagerProps {
  mensajes: MensajeConsulta[];
  clientes?: Cliente[];
  usuarioActivo: UsuarioEstudio;
  onResponderMensaje: (mensajeId: string, autor: string, contenido: string) => void;
}

export const MensajesManager: React.FC<MensajesManagerProps> = ({
  mensajes,
  clientes = [],
  usuarioActivo,
  onResponderMensaje,
}) => {
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<MensajeConsulta | null>(
    mensajes[0] || null
  );
  const [respuestaTexto, setRespuestaTexto] = useState('');

  // Validación de permisos según el reglamento estricto de ACTIO LEGIS:
  // 1. info@actiolegisec.com NO puede responder correos (solo registro).
  // 2. Abogados Socios pueden responder todo.
  // 3. Abogados Asociados solo a clientes asignados a ellos.
  // 4. Pasantes, Asistentes y Administrativo no tienen autorización para responder.

  const esBuzonInfo = usuarioActivo.email === 'info@actiolegisec.com';
  const esSocio = usuarioActivo.rol === 'Abogado Socio';
  const esAsociado = usuarioActivo.rol === 'Abogado Asociado';

  const clienteDelMensaje = clientes.find((c) => c.id === mensajeSeleccionado?.clienteId);
  const clienteAsignadoAEsteAsociado =
    esAsociado &&
    (clienteDelMensaje?.abogadoAsignadoId === usuarioActivo.id ||
      clienteDelMensaje?.abogadoAsignadoNombre === usuarioActivo.nombre ||
      mensajeSeleccionado?.abogadoAsignadoId === usuarioActivo.id);

  const puedeResponderEsteMensaje =
    !esBuzonInfo &&
    (esSocio || (esAsociado && clienteAsignadoAEsteAsociado));

  const handleEnviarRespuesta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensajeSeleccionado || !respuestaTexto.trim()) return;

    if (!puedeResponderEsteMensaje) {
      alert('Su cuenta o rol no tiene autorización para responder a esta consulta.');
      return;
    }

    onResponderMensaje(mensajeSeleccionado.id, usuarioActivo.nombre, respuestaTexto.trim());
    setRespuestaTexto('');

    // Actualizar mensaje seleccionado localmente
    const msgActualizado = {
      ...mensajeSeleccionado,
      estado: 'Respondida' as const,
      respuestas: [
        ...(mensajeSeleccionado.respuestas || []),
        {
          id: `resp-${Date.now()}`,
          autorNombre: usuarioActivo.nombre,
          remitente: 'estudio' as const,
          fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
          contenido: respuestaTexto.trim(),
        },
      ],
    };
    setMensajeSeleccionado(msgActualizado);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono">
            ESTUDIO JURÍDICO ACTIO LEGIS
          </span>
          <span className="text-xs text-slate-400">· Canal Institucional de Consultas</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Bandeja de Consultas de Clientes & Correos Institucionales
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Preguntas enviadas por clientes patrocinados. Distribuidas automáticamente a diego.tapia@actiolegisec.com, info@actiolegisec.com y abogado responsable.
        </p>
      </div>

      {/* Banner de Estado del Usuario Actual */}
      <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <User className="w-4 h-4 text-slate-500" />
          <span>
            Conectado como: <strong>{usuarioActivo.nombre}</strong> ({usuarioActivo.rol}) ·{' '}
            <span className="font-mono text-slate-600">{usuarioActivo.email}</span>
          </span>
        </div>

        {esBuzonInfo ? (
          <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
            <Lock className="w-3 h-3" />
            info@actiolegisec.com: Solo Registro (No responde correos)
          </span>
        ) : esSocio ? (
          <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Socio Director: Habilitado para responder todas las consultas
          </span>
        ) : esAsociado ? (
          <span className="text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Asociado: Habilitado solo para responder a sus clientes asignados
          </span>
        ) : (
          <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Rol sin facultades para emitir criterio jurídico
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Lista de Consultas */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Consultas Recibidas ({mensajes.length})</span>
            <span>{mensajes.filter((m) => m.estado === 'Pendiente').length} pendientes</span>
          </div>

          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {mensajes.map((msg) => {
              const esSeleccionado = mensajeSeleccionado?.id === msg.id;
              const esPendiente = msg.estado === 'Pendiente';

              return (
                <div
                  key={msg.id}
                  onClick={() => setMensajeSeleccionado(msg)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    esSeleccionado
                      ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                      {msg.clienteNombre}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        esPendiente
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {msg.estado}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
                    {msg.asunto}
                  </h4>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {msg.contenido}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 mt-2 font-mono">
                    <span>{msg.numeroCausa || 'Consulta General'}</span>
                    <span>{msg.fechaEnvio}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Conversación y Respuesta */}
        <div className="lg:col-span-7">
          {mensajeSeleccionado ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
              {/* Encabezado del mensaje */}
              <div className="pb-4 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{mensajeSeleccionado.asunto}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        mensajeSeleccionado.estado === 'Pendiente'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {mensajeSeleccionado.estado}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{mensajeSeleccionado.fechaEnvio}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      Cliente: <strong>{mensajeSeleccionado.clienteNombre}</strong>
                    </span>
                  </div>
                  {mensajeSeleccionado.numeroCausa && (
                    <div className="flex items-center gap-1.5 text-indigo-700 font-mono font-medium">
                      <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Causa SATJE: {mensajeSeleccionado.numeroCausa}</span>
                    </div>
                  )}
                </div>

                {/* Notificación a correos institucionales */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>Correos institucionales notificados en el ingreso:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-500 pt-0.5">
                    <span className="px-2 py-0.5 bg-white rounded border border-slate-200">
                      diego.tapia@actiolegisec.com (Socio)
                    </span>
                    <span className="px-2 py-0.5 bg-white rounded border border-slate-200">
                      info@actiolegisec.com (Registro)
                    </span>
                    <span className="px-2 py-0.5 bg-white rounded border border-slate-200">
                      andres.bolanos@actiolegisec.com (Asignado)
                    </span>
                  </div>
                </div>
              </div>

              {/* Mensaje original del cliente */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Consulta formulada por el cliente:</span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {mensajeSeleccionado.fechaEnvio}
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {mensajeSeleccionado.contenido}
                </p>
              </div>

              {/* Hilo de Respuestas del Despacho */}
              {mensajeSeleccionado.respuestas && mensajeSeleccionado.respuestas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Respuestas Emitidas por Actio Legis:
                  </span>
                  {mensajeSeleccionado.respuestas.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5 ml-4"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCheck className="w-3.5 h-3.5 text-amber-600" />
                          {r.autorNombre}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">{r.fecha}</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {r.contenido}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario de Respuesta con Verificación de Permisos */}
              <div className="pt-4 border-t border-slate-100">
                {esBuzonInfo ? (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Respuesta Bloqueada para info@actiolegisec.com:</strong>
                      <p className="text-[11px] text-rose-700 mt-0.5">
                        Por reglamentación del estudio, la cuenta institucional <strong>info@actiolegisec.com</strong> es de uso exclusivo para registro y auditoría. Para responder a este cliente, inicie sesión con una cuenta de Abogado Socio (Diego Tapia / Marela Dunn) o Abogado Asociado asignado.
                      </p>
                    </div>
                  </div>
                ) : !puedeResponderEsteMensaje ? (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Permiso de Respuesta Restringido:</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        {esAsociado
                          ? `Como Abogado Asociado (${usuarioActivo.nombre}), solo puede responder a consultas de clientes asignados formalmente a su patrocinio. Este cliente pertenece a otro abogado o está bajo dirección de los Socios.`
                          : `Su rol profesional (${usuarioActivo.rol}) no tiene autorización para emitir respuestas o asesoría jurídica formal a clientes.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEnviarRespuesta} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        Responder Consulta Jurídica como {usuarioActivo.nombre}
                      </label>
                      <span className="text-[10px] text-amber-700 font-mono font-semibold">
                        Notificará al cliente en su portal
                      </span>
                    </div>

                    <textarea
                      required
                      rows={4}
                      value={respuestaTexto}
                      onChange={(e) => setRespuestaTexto(e.target.value)}
                      placeholder="Redacte la respuesta institucional clara para el cliente..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        La respuesta quedará registrada bajo su firma profesional.
                      </span>

                      <button
                        type="submit"
                        className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        Emitir Respuesta Institucional
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">Seleccione una consulta</p>
              <p className="text-[11px] text-slate-400">
                Haga clic en una consulta del panel izquierdo para leer y responder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
