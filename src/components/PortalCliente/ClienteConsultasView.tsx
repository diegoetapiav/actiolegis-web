import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  User,
  Shield,
  HelpCircle
} from 'lucide-react';
import type { ExpedienteJudicial, Cliente } from '../../types/legal';

interface Props {
  cliente: Cliente;
  expedientes: ExpedienteJudicial[];
}

interface MensajeConsulta {
  id: string;
  expedienteId?: string;
  expedienteNumero?: string;
  asunto: string;
  mensaje: string;
  fechaEnvio: string;
  estado: 'enviado' | 'en_revision' | 'respondido';
  respuesta?: {
    abogado: string;
    mensaje: string;
    fechaRespuesta: string;
  };
}

export const ClienteConsultasView: React.FC<Props> = ({ cliente, expedientes }) => {
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState<string>('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviadoExito, setEnviadoExito] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  // Historial de consultas precargado con opción de persistencia local
  const [consultas, setConsultas] = useState<MensajeConsulta[]>([
    {
      id: 'cons-1',
      expedienteId: expedientes[0]?.id || 'exp-01',
      expedienteNumero: expedientes[0]?.numeroCaso || '09332-2023-01824',
      asunto: 'Consulta sobre término de prueba testimonial',
      mensaje: 'Estimado Dr., quisiera saber si se requiere que preparemos algún documento adicional para los testigos de la audiencia.',
      fechaEnvio: '2026-10-20 10:15',
      estado: 'respondido',
      respuesta: {
        abogado: 'Abg. Diego E. Tapia V.',
        mensaje: 'Estimado/a cliente, los documentos ya reposan en el expediente judicial. Solo coordinaremos una sesión previa de preparación 48 horas antes.',
        fechaRespuesta: '2026-10-20 15:40'
      }
    },
    {
      id: 'cons-2',
      expedienteId: expedientes[1]?.id || 'exp-02',
      expedienteNumero: expedientes[1]?.numeroCaso || '17203-2024-00412',
      asunto: 'Certificación de cumplimiento en liquidación',
      mensaje: 'Buenos días. Adjunto la constancia de pago para que sea ingresada al juzgado respectivo.',
      fechaEnvio: '2026-10-24 09:30',
      estado: 'en_revision'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion('');

    if (!asunto.trim() || !mensaje.trim()) {
      setErrorValidacion('Por favor, complete el asunto y el mensaje de su consulta.');
      return;
    }

    const expRelacionado = expedientes.find(exp => exp.id === expedienteSeleccionado);

    const nuevaConsulta: MensajeConsulta = {
      id: `cons-${Date.now()}`,
      expedienteId: expedienteSeleccionado || undefined,
      expedienteNumero: expRelacionado?.numeroCaso || 'Consulta General',
      asunto: asunto.trim(),
      mensaje: mensaje.trim(),
      fechaEnvio: new Date().toISOString().slice(0, 16).replace('T', ' '),
      estado: 'enviado'
    };

    setConsultas([nuevaConsulta, ...consultas]);
    setAsunto('');
    setMensaje('');
    setExpedienteSeleccionado('');
    setEnviadoExito(true);

    setTimeout(() => {
      setEnviadoExito(false);
    }, 4500);
  };

  const getBadgeEstado = (estado: MensajeConsulta['estado']) => {
    switch (estado) {
      case 'respondido':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Respondido
          </span>
        );
      case 'en_revision':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            En revisión
          </span>
        );
      case 'enviado':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Send className="w-3.5 h-3.5 text-blue-600" />
            Enviado al despacho
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Encabezado Institucional */}
      <div className="border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-neutral-100 rounded-xl text-neutral-800">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
              Canal Directo de Consultas Legales
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Comuníquese directamente con su equipo patrocinador de ACTIO LEGIS.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario de Nueva Consulta */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm">
          <h2 className="text-base font-medium text-neutral-900 mb-1 flex items-center gap-2">
            <Send className="w-4 h-4 text-neutral-700" />
            Redactar Consulta
          </h2>
          <p className="text-xs text-neutral-500 mb-5">
            Su mensaje será remitido directamente al abogado a cargo de su trámite.
          </p>

          {enviadoExito && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-800 text-xs leading-relaxed animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Mensaje enviado exitosamente.</span> Su abogado patrocinador revisará su requerimiento a la brevedad.
              </div>
            </div>
          )}

          {errorValidacion && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorValidacion}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="expediente" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Vincular a Proceso o Causa (Opcional)
              </label>
              <select
                id="expediente"
                value={expedienteSeleccionado}
                onChange={(e) => setExpedienteSeleccionado(e.target.value)}
                className="w-full text-xs rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors"
              >
                <option value="">-- Consulta general no vinculada a juicio --</option>
                {expedientes.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.numeroCaso} - {exp.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="asunto" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Asunto del requerimiento *
              </label>
              <input
                id="asunto"
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ej. Duda sobre la fecha de audiencia"
                className="w-full text-xs rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-xs font-medium text-neutral-700 mb-1.5">
                Mensaje o consulta detallada *
              </label>
              <textarea
                id="mensaje"
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Detalle sus inquietudes o proporcione la información requerida por su abogado..."
                className="w-full text-xs rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar Consulta al Despacho
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 flex items-start gap-2.5 text-[11px] text-neutral-500 leading-relaxed">
            <Shield className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <span>
              Toda comunicación cursada por este canal se encuentra protegida por el secreto profesional y confidencialidad abogado-cliente.
            </span>
          </div>
        </div>

        {/* Historial de Respuestas y Consultas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-base font-medium text-neutral-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-700" />
              Historial de Comunicaciones
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              {consultas.length} {consultas.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>

          {consultas.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-neutral-200/80 text-center">
              <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-neutral-700">No hay consultas registradas</p>
              <p className="text-xs text-neutral-500 mt-1">
                Puede formular su primera consulta utilizando el formulario de la izquierda.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultas.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm space-y-4 transition-all hover:border-neutral-300"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-semibold text-neutral-900">
                          {item.asunto}
                        </span>
                        {getBadgeEstado(item.estado)}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                        <span className="flex items-center gap-1 font-mono">
                          <FileText className="w-3 h-3 text-neutral-400" />
                          {item.expedienteNumero}
                        </span>
                        <span>•</span>
                        <span>{item.fechaEnvio}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cuerpo de la consulta del cliente */}
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-700 leading-relaxed">
                    <p className="font-medium text-neutral-500 text-[11px] mb-1 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      Consulta enviada por usted:
                    </p>
                    <p className="whitespace-pre-wrap">{item.mensaje}</p>
                  </div>

                  {/* Respuesta del Despacho (si existe) */}
                  {item.respuesta ? (
                    <div className="ml-3 pl-3 border-l-2 border-emerald-500/50 space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-600" />
                          {item.respuesta.abogado}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {item.respuesta.fechaRespuesta}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed bg-emerald-50/40 rounded-xl p-3 border border-emerald-100/60 whitespace-pre-wrap">
                        {item.respuesta.mensaje}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-400 italic flex items-center gap-1.5 pt-1">
                      <Clock className="w-3 h-3" />
                      Pendiente de contestación por parte del abogado patrocinador.
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
