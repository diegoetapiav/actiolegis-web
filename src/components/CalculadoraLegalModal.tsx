import React, { useState } from 'react';
import { X, Calculator, DollarSign, Calendar, Clock, BookOpen, Check } from 'lucide-react';
import { calcularLiquidacionLaboral, calcularTerminoProcesal, calcularInteresLegal } from '../utils/calculadoraLegal';

interface CalculadoraLegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculadoraLegalModal: React.FC<CalculadoraLegalModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'laboral' | 'terminos' | 'intereses'>('laboral');

  // Estado Laboral
  const [sueldo, setSueldo] = useState<number>(850);
  const [fechaIngreso, setFechaIngreso] = useState('2021-03-01');
  const [fechaSalida, setFechaSalida] = useState('2024-09-15');
  const [tipoTerminacion, setTipoTerminacion] = useState<'despido_intempestivo' | 'desahucio_trabajador' | 'acuerdo_partes'>('despido_intempestivo');
  const [diasVacaciones, setDiasVacaciones] = useState<number>(12);

  // Estado Términos
  const [fechaNotificacion, setFechaNotificacion] = useState('2026-10-12');
  const [diasTermino, setDiasTermino] = useState<number>(5);

  // Estado Intereses
  const [capital, setCapital] = useState<number>(15000);
  const [tasaAnual, setTasaAnual] = useState<number>(9.85);
  const [diasMora, setDiasMora] = useState<number>(180);

  if (!isOpen) return null;

  const resultadoLaboral = calcularLiquidacionLaboral({
    remuneracionMensual: Number(sueldo),
    fechaIngreso,
    fechaSalida,
    tipoTerminacion,
    diasVacacionesPendientes: Number(diasVacaciones),
  });

  const resultadoTerminos = calcularTerminoProcesal({
    fechaNotificacion,
    diasTermino: Number(diasTermino),
  });

  const resultadoIntereses = calcularInteresLegal({
    capital: Number(capital),
    tasaAnualPorcentaje: Number(tasaAnual),
    diasMora: Number(diasMora),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base text-white">Calculadora Jurídica Especializada</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de calculadora */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setTab('laboral')}
            className={`py-2 rounded-lg transition-colors ${
              tab === 'laboral' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Liquidación Laboral (C.T.)
          </button>
          <button
            onClick={() => setTab('terminos')}
            className={`py-2 rounded-lg transition-colors ${
              tab === 'terminos' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Términos Procesales (Días Hábiles)
          </button>
          <button
            onClick={() => setTab('intereses')}
            className={`py-2 rounded-lg transition-colors ${
              tab === 'intereses' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Intereses Legales y Moratorios
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'laboral' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Última Remuneración Mensual ($ USD)
                  </label>
                  <input
                    type="number"
                    value={sueldo}
                    onChange={(e) => setSueldo(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tipo de Terminación
                  </label>
                  <select
                    value={tipoTerminacion}
                    onChange={(e) => setTipoTerminacion(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="despido_intempestivo">Despido Intempestivo (Art. 188 y 185)</option>
                    <option value="desahucio_trabajador">Desahucio solicitado por trabajador (Art. 185)</option>
                    <option value="acuerdo_partes">Acuerdo entre las partes / Acta de finiquito</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Ingreso</label>
                  <input
                    type="date"
                    value={fechaIngreso}
                    onChange={(e) => setFechaIngreso(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha de Salida</label>
                  <input
                    type="date"
                    value={fechaSalida}
                    onChange={(e) => setFechaSalida(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Resultado Laboral */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Total Liquidación Estimada:</span>
                  <span className="text-xl font-bold font-mono text-emerald-600 tabular-nums">
                    ${resultadoLaboral.totalLiquidacion.toLocaleString()} USD
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Indemnización por Despido Intempestivo (Art. 188 C.T.):</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ${resultadoLaboral.indemnizacionDespido.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonificación por Desahucio (Art. 185 C.T.):</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ${resultadoLaboral.bonificacionDesahucio.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Décimo Tercero Proporcional:</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ${resultadoLaboral.decimoTerceroProporcional.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Décimo Cuarto Proporcional:</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ${resultadoLaboral.decimoCuartoProporcional.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vacaciones no gozadas:</span>
                    <span className="font-mono font-semibold text-slate-900">
                      ${resultadoLaboral.vacacionesNoGozadas.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-200">
                  Tiempo de servicio computado: {resultadoLaboral.aniosServicio} año(s) y {resultadoLaboral.fraccionMeses} mes(es).
                </div>
              </div>
            </div>
          )}

          {tab === 'terminos' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Notificación Judicial
                  </label>
                  <input
                    type="date"
                    value={fechaNotificacion}
                    onChange={(e) => setFechaNotificacion(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Días Término (Hábiles)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={diasTermino}
                    onChange={(e) => setDiasTermino(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Fecha Límite Fatal de Vencimiento:</span>
                  <span className="text-base font-bold font-mono text-rose-600">
                    {resultadoTerminos.fechaVencimiento}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>Inicio del cómputo: {resultadoTerminos.fechaInicioComputo} (día hábil siguiente).</div>
                  <div>Días calendario totales transcurridos: {resultadoTerminos.diasCalendarioTranscurridos} días (excluyendo fines de semana).</div>
                </div>
              </div>
            </div>
          )}

          {tab === 'intereses' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Capital ($ USD)</label>
                  <input
                    type="number"
                    value={capital}
                    onChange={(e) => setCapital(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tasa Anual (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Días de Mora</label>
                  <input
                    type="number"
                    value={diasMora}
                    onChange={(e) => setDiasMora(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Monto Total Liquidado con Intereses:</span>
                  <span className="text-xl font-bold font-mono text-emerald-600">
                    ${resultadoIntereses.montoTotal.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Interés generado:</span>
                  <span className="font-mono font-bold">${resultadoIntereses.interesGenerado.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
