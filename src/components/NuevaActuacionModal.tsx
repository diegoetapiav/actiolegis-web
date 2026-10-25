import React, { useState } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { ActuacionJudicial, TipoActuacion } from '../types/legal';

interface NuevaActuacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroCausa: string;
  abogadoDefecto: string;
  onGuardar: (actuacion: ActuacionJudicial) => void;
}

export const NuevaActuacionModal: React.FC<NuevaActuacionModalProps> = ({
  isOpen,
  onClose,
  numeroCausa,
  abogadoDefecto,
  onGuardar,
}) => {
  const [tipo, setTipo] = useState<TipoActuacion>('Providencia Judicial');
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [resumenParaCliente, setResumenParaCliente] = useState('');
  const [foja, setFoja] = useState('');
  const [abogado, setAbogado] = useState(abogadoDefecto || 'Dr. Diego Tapia');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nueva: ActuacionJudicial = {
      id: `act-${Date.now()}`,
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tipo,
      titulo: titulo.trim(),
      resumen: resumen.trim(),
      resumenParaCliente: resumenParaCliente.trim() || resumen.trim(),
      foja: foja.trim() || undefined,
      abogado: abogado.trim(),
    };
    onGuardar(nueva);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-base text-white">Registrar Actuación Procesal</h2>
              <p className="text-xs text-slate-300 font-mono">Causa: {numeroCausa}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Actuación
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoActuacion)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Providencia Judicial">Providencia Judicial</option>
                <option value="Notificación Electrónica">Notificación Electrónica</option>
                <option value="Escrito Presentado">Escrito Presentado</option>
                <option value="Audiencia Realizada">Audiencia Realizada</option>
                <option value="Informe Pericial">Informe Pericial</option>
                <option value="Sentencia / Auto Resolutorio">Sentencia / Auto Resolutorio</option>
                <option value="Resolución Administrativa">Resolución Administrativa</option>
                <option value="Razón Notarial">Razón Notarial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Foja del Expediente (Opcional)
              </label>
              <input
                type="text"
                value={foja}
                onChange={(e) => setFoja(e.target.value)}
                placeholder="Ej: Fs. 152-154"
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Título o Resumen de la Actuación
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Providencia disponiendo término de prueba"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contenido Judicial / Texto de la Providencia o Escrito
            </label>
            <textarea
              required
              rows={3}
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
              placeholder="VISTOS: Agréguese a los autos el escrito... Se concede término..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Explicación en lenguaje claro para el Cliente (Visible en su portal)
            </label>
            <textarea
              rows={2}
              value={resumenParaCliente}
              onChange={(e) => setResumenParaCliente(e.target.value)}
              placeholder="Ej: El Juez ordenó abrir el periodo para presentar testimonios en 10 días."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-amber-50/30"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Permite que su cliente entienda el avance de su causa sin tecnicismos complejos.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              Guardar Actuación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
