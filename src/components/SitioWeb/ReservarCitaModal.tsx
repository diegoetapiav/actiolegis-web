import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, MapPin, Video, Phone, 
  User, Mail, FileText, CheckCircle2, MessageSquare, 
  Sparkles, ShieldCheck
} from 'lucide-react';
import { CitaLegal, MateriaLegal } from '../../types/legal';

interface ReservarCitaModalProps {
  isOpen: boolean;
  onCerrar: () => void;
  onConfirmarCita: (cita: CitaLegal) => void;
}

export const ReservarCitaModal: React.FC<ReservarCitaModalProps> = ({
  isOpen,
  onCerrar,
  onConfirmarCita
}) => {
  const [paso, setPaso] = useState<'formulario' | 'exito'>('formulario');

  // Estados del Formulario
  const [modalidad, setModalidad] = useState<CitaLegal['modalidad']>('Presencial en Despacho');
  const [materia, setMateria] = useState<MateriaLegal>('Civil y Mercantil');
  const [abogado, setAbogado] = useState('Dr. Diego Tapia');
  const [fecha, setFecha] = useState(() => {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return manana.toISOString().split('T')[0];
  });
  const [hora, setHora] = useState('10:00');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');

  const [citaCreada, setCitaCreada] = useState<CitaLegal | null>(null);

  // Reiniciar estado cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPaso('formulario');
    }
  }, [isOpen]);

  // Si no está abierto, NO renderizar nada (evita bloquear la página web)
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCliente.trim() || !telefono.trim() || !motivo.trim()) {
      alert('Por favor complete su nombre, teléfono y motivo de consulta.');
      return;
    }

    const lugarDetalle = modalidad === 'Presencial en Despacho'
      ? 'Sede ACTIO LEGIS - Malecón Simón Bolívar y 9 de Octubre, Guayaquil'
      : modalidad === 'Videollamada Zoom / Meet'
      ? 'Enlace Zoom Corporativo ACTIO LEGIS (se enviará a su WhatsApp y correo)'
      : 'Llamada telefónica directa del abogado al número indicado';

    const nuevaCita: CitaLegal = {
      id: `cita-web-${Date.now()}`,
      clienteId: 'cliente-web-nuevo',
      clienteNombre: nombreCliente.trim(),
      fecha,
      hora,
      duracionMinutos: 45,
      modalidad,
      motivo: `[Materia: ${materia}] ${motivo.trim()}`,
      abogadoAsignado: abogado,
      estado: 'Confirmada',
      lugar: lugarDetalle,
      enlaceReunion: modalidad === 'Videollamada Zoom / Meet' ? 'https://meet.google.com/actio-legis-gye' : undefined,
      notasEstudio: `Contacto: ${telefono} | Email: ${email || 'No indicado'} | Materia: ${materia}`
    };

    onConfirmarCita(nuevaCita);
    setCitaCreada(nuevaCita);
    setPaso('exito');
  };

  const abrirWhatsappConfirmacion = () => {
    if (!citaCreada) return;
    const texto = encodeURIComponent(
      `Hola ACTIO LEGIS, acabo de solicitar una cita legal en su página web:\n` +
      `👤 Nombre: ${citaCreada.clienteNombre}\n` +
      `📅 Fecha: ${citaCreada.fecha} a las ${citaCreada.hora}\n` +
      `⚖️ Abogado: ${citaCreada.abogadoAsignado}\n` +
      `📍 Modalidad: ${citaCreada.modalidad}\n` +
      `Desearía reconfirmar la disponibilidad de la reunión.`
    );
    window.open(`https://wa.me/593998245510?text=${texto}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Cabecera */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
                ATENCIÓN INMEDIATA • GUAYAQUIL
              </span>
              <h3 className="text-lg font-bold font-display">
                {paso === 'formulario' ? 'Reservar Cita / Consulta Jurídica' : '¡Cita Registrada con Éxito!'}
              </h3>
            </div>
          </div>

          <button
            onClick={onCerrar}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {paso === 'formulario' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm">
            {/* Modalidad de la Consulta */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Modalidad de la Reunión
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Presencial en Despacho', label: 'Presencial', sub: 'Oficina Guayaquil', icon: MapPin },
                  { id: 'Videollamada Zoom / Meet', label: 'Virtual', sub: 'Zoom / Meet', icon: Video },
                  { id: 'Llamada Telefónica', label: 'Telefónica', sub: 'Llamada directa', icon: Phone }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSel = modalidad === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setModalidad(item.id as CitaLegal['modalidad'])}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSel 
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-4 h-4 ${isSel ? 'text-blue-600' : 'text-slate-400'}`} />
                        {isSel && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </div>
                      <span className={`text-xs font-bold ${isSel ? 'text-blue-900' : 'text-slate-800'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Materia y Abogado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Materia Legal
                </label>
                <select
                  value={materia}
                  onChange={(e) => setMateria(e.target.value as MateriaLegal)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Civil y Mercantil">Civil, Mercantil y Contratos</option>
                  <option value="Constitucional">Constitucional y Garantías</option>
                  <option value="Laboral">Laboral Corporativo</option>
                  <option value="Penal">Penal Económico</option>
                  <option value="Tránsito">Tránsito y Siniestros</option>
                  <option value="Inquilinato">Inquilinato y Bienes Raíces</option>
                  <option value="Familia y Niñez">Familia y Alimentos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Abogado Preferente
                </label>
                <select
                  value={abogado}
                  onChange={(e) => setAbogado(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Dr. Diego Tapia">Dr. Diego Tapia (Socio Procesal)</option>
                  <option value="Abg. María José Intriago">Abg. María José Intriago (Socia Corporativo)</option>
                  <option value="Abg. Carlos Benítez">Abg. Carlos Benítez (Litigio Penal)</option>
                  <option value="Primer Abogado Disponible">Primer Abogado Disponible</option>
                </select>
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Fecha Deseada
                </label>
                <input
                  type="date"
                  value={fecha}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Horario
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:30">02:30 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:30">05:30 PM</option>
                </select>
              </div>
            </div>

            {/* Datos Personales */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo / Razón Social
                </label>
                <input
                  type="text"
                  placeholder="Ej. Ing. Roberto Mendoza o Corporación Alianza"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="099 123 4567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Breve Descripción del Asunto o Consulta *
                </label>
                <textarea
                  rows={2}
                  placeholder="Explícanos brevemente la causa, contrato, notificación judicial o duda para preparar la sesión..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Garantía de Confidencialidad */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Consulta protegida por estricto secreto profesional del abogado conforme a la ley ecuatoriana.</span>
            </div>

            {/* Botón de Enviar */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                Confirmar Reserva de Cita
              </button>
            </div>
          </form>
        ) : (
          /* Pantalla de Éxito */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold font-display text-slate-900 mb-2">
                ¡Tu cita ha sido agendada con éxito!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Hemos reservado tu espacio en la agenda de <strong>{citaCreada?.abogadoAsignado}</strong> para el <strong>{citaCreada?.fecha} a las {citaCreada?.hora}</strong> ({citaCreada?.modalidad}).
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Asunto:</span>
                <span className="font-semibold text-slate-800">{citaCreada?.motivo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ubicación / Modalidad:</span>
                <span className="font-semibold text-slate-800">{citaCreada?.lugar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estado en Intranet:</span>
                <span className="font-semibold text-emerald-600">Sincronizada con el equipo</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={abrirWhatsappConfirmacion}
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar por WhatsApp Inmediato</span>
              </button>

              <button
                onClick={onCerrar}
                className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Cerrar y Ver Sitio Web
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
