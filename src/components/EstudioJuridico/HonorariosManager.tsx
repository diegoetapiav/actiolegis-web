import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, Plus, CheckCircle2, Clock, AlertCircle, FileText, 
  Calendar, User, ChevronRight, Check, AlertTriangle, ArrowRight
} from 'lucide-react';
import { PagoHonorario, Expediente, Cliente, CuotaProgramada } from '../../types/legal';

interface HonorariosManagerProps {
  honorarios: PagoHonorario[];
  cuotasProgramadas: CuotaProgramada[];
  expedientes: Expediente[];
  clientes: Cliente[];
  onAgregarPago: (pago: PagoHonorario) => void;
  onAgregarCuotaProgramada: (cuota: CuotaProgramada) => void;
  onMarcarCuotaPagada: (cuotaId: string, comprobante: string) => void;
  onActualizarEstado: (pagoId: string, nuevoEstado: 'Pagado' | 'Pendiente' | 'Vencido') => void;
}

export const HonorariosManager: React.FC<HonorariosManagerProps> = ({
  honorarios,
  cuotasProgramadas,
  expedientes,
  clientes,
  onAgregarPago,
  onAgregarCuotaProgramada,
  onMarcarCuotaPagada,
  onActualizarEstado,
}) => {
  const [seccionActiva, setSeccionActiva] = useState<'clientes_diferencia' | 'calendario_cuotas' | 'historial_recibos'>('clientes_diferencia');
  const [mostrarModalNuevoPago, setMostrarModalNuevoPago] = useState(false);
  const [mostrarModalNuevaCuota, setMostrarModalNuevaCuota] = useState(false);
  const [filtroCliente, setFiltroCliente] = useState<string>('todos');

  // Cálculos globales
  const totalCobrado = honorarios
    .filter((h) => h.estado === 'Pagado')
    .reduce((acc, h) => acc + h.monto, 0);

  const totalPactado = expedientes.reduce((acc, e) => acc + e.honorariosPactados, 0);
  const totalDiferenciaPorCobrar = Math.max(0, totalPactado - totalCobrado);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Control Financiero & Honorarios</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">
            Honorarios Pactados, Pagados y Calendario de la Diferencia
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Supervisión interna de honorarios por cliente, pagos realizados y fechas programadas para el cobro de la diferencia.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMostrarModalNuevaCuota(true)}
            className="px-3.5 py-2 bg-white hover:bg-black hover:text-white text-black border-1.5 border-black font-bold text-xs transition-all flex items-center gap-2 actio-shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            Programar Fecha de Diferencia
          </button>

          <button
            onClick={() => setMostrarModalNuevoPago(true)}
            className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Plus className="w-4 h-4 text-white" />
            Registrar Pago Realizado
          </button>
        </div>
      </div>

      {/* Tarjetas de Resumen Financiero Arquitectónicas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Total Honorarios Contratados</span>
          <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums font-display">
            ${totalPactado.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-slate-400">Total convenido en causas activas</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-700 block uppercase tracking-wider font-mono">Total Efectivamente Cobrado</span>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1 tabular-nums font-display">
            ${totalCobrado.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-slate-400">Anticipos y cuotas canceladas</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-rose-700 block uppercase tracking-wider font-mono">Diferencia Total por Cobrar</span>
          <div className="text-2xl font-black font-mono text-rose-700 mt-1 tabular-nums font-display">
            ${totalDiferenciaPorCobrar.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-slate-400">Con fechas de pago programadas</span>
        </div>
      </div>

      {/* Selector de Pestañas Internas */}
      <div className="flex border-b border-slate-200 gap-1 text-xs font-bold">
        <button
          onClick={() => setSeccionActiva('clientes_diferencia')}
          className={`py-2.5 px-4 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
            seccionActiva === 'clientes_diferencia'
              ? 'border-slate-900 text-slate-900 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4 text-amber-600" />
          Clientes, Honorarios & Fechas de Diferencia
        </button>

        <button
          onClick={() => setSeccionActiva('calendario_cuotas')}
          className={`py-2.5 px-4 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
            seccionActiva === 'calendario_cuotas'
              ? 'border-slate-900 text-slate-900 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-indigo-600" />
          Calendario de Vencimientos de la Diferencia ({cuotasProgramadas.filter(c => c.estado === 'Pendiente').length})
        </button>

        <button
          onClick={() => setSeccionActiva('historial_recibos')}
          className={`py-2.5 px-4 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
            seccionActiva === 'historial_recibos'
              ? 'border-slate-900 text-slate-900 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-slate-600" />
          Historial de Pagos y Comprobantes ({honorarios.length})
        </button>
      </div>

      {/* 1. SECCIÓN: CLIENTES, HONORARIOS PACTADOS, PAGADOS Y FECHAS DE LA DIFERENCIA */}
      {seccionActiva === 'clientes_diferencia' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {clientes.map((cliente) => {
              const causasCliente = expedientes.filter((e) => e.clienteId === cliente.id);
              const pactadoCliente = causasCliente.reduce((acc, c) => acc + c.honorariosPactados, 0);
              const pagadoCliente = honorarios
                .filter((h) => h.clienteId === cliente.id && h.estado === 'Pagado')
                .reduce((acc, h) => acc + h.monto, 0);
              const diferenciaCliente = Math.max(0, pactadoCliente - pagadoCliente);

              const cuotasDelCliente = cuotasProgramadas.filter((c) => c.clienteId === cliente.id);
              const cuotasPendientes = cuotasDelCliente.filter((c) => c.estado === 'Pendiente');

              return (
                <div
                  key={cliente.id}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">{cliente.nombre}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {cliente.codigoAcceso}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        RUC / Cédula: <span className="font-mono font-semibold">{cliente.identificacion}</span> · {cliente.telefono}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-sans">Pactado</span>
                        <span className="font-bold text-slate-900 text-sm">
                          ${pactadoCliente.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-700 block uppercase font-sans">Pagado</span>
                        <span className="font-bold text-emerald-600 text-sm">
                          ${pagadoCliente.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-amber-700 block uppercase font-sans">Diferencia Pendiente</span>
                        <span className="font-bold text-amber-600 text-sm">
                          ${diferenciaCliente.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Programación de Fechas en que se debe Pagar la Diferencia */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        Fechas en que se debe Pagar la Diferencia:
                      </span>
                    </div>

                    <div className="space-y-2">
                      {cuotasDelCliente.map((cuota) => (
                        <div
                          key={cuota.id}
                          className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{cuota.descripcion}</span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.2 rounded ${
                                  cuota.estado === 'Pagado'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {cuota.estado}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Causa: {cuota.numeroCausa} {cuota.observaciones ? `· ${cuota.observaciones}` : ''}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block">Fecha de Pago:</span>
                              <span className="font-mono font-bold text-indigo-900">
                                {cuota.fechaVencimiento}
                              </span>
                            </div>

                            <div className="text-right font-mono font-bold text-slate-900">
                              ${cuota.monto.toLocaleString()} USD
                            </div>

                            {cuota.estado === 'Pendiente' ? (
                              <button
                                onClick={() => {
                                  const ref = prompt('Ingrese el número de comprobante o referencia bancaria:', 'TRANS-BCE-');
                                  if (ref) onMarcarCuotaPagada(cuota.id, ref);
                                }}
                                className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                              >
                                Registrar Cobro
                              </button>
                            ) : (
                              <span className="text-[10px] text-emerald-700 font-mono">
                                Pagado el {cuota.fechaPagoRealizado}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}

                      {cuotasDelCliente.length === 0 && (
                        <div className="text-xs text-slate-400 italic p-2 bg-slate-50 rounded-lg">
                          No hay fechas de cuotas programadas para este cliente aún. Puede programarlas arriba con el botón &quot;Programar Fecha de Diferencia&quot;.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SECCIÓN: CALENDARIO DE VENCIMIENTOS DE LA DIFERENCIA */}
      {seccionActiva === 'calendario_cuotas' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Cronograma General de Fechas para Pago de la Diferencia
            </span>
            <span className="text-xs text-slate-400">
              Orden cronológico de vencimiento
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Fecha de Pago</th>
                  <th className="px-4 py-3">Cliente / Causa</th>
                  <th className="px-4 py-3">Concepto de la Diferencia</th>
                  <th className="px-4 py-3 text-right">Monto Diferencia</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                  <th className="px-4 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cuotasProgramadas.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-indigo-900">
                      {c.fechaVencimiento}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{c.clienteNombre}</div>
                      <div className="font-mono text-[11px] text-slate-500">{c.numeroCausa}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="text-slate-800">{c.descripcion}</div>
                    </td>

                    <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                      ${c.monto.toLocaleString()} USD
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          c.estado === 'Pagado'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {c.estado}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      {c.estado === 'Pendiente' ? (
                        <button
                          onClick={() => {
                            const ref = prompt('Ingrese el comprobante de pago:', 'TRANS-');
                            if (ref) onMarcarCuotaPagada(c.id, ref);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200"
                        >
                          Marcar Cobrado
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Cobrado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. SECCIÓN: HISTORIAL DE PAGOS REALIZADOS */}
      {seccionActiva === 'historial_recibos' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Historial de Pagos Efectuados y Recibos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Cliente / Causa</th>
                  <th className="px-4 py-3">Concepto</th>
                  <th className="px-4 py-3 text-right">Monto (USD)</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Forma de Pago / Comprobante</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {honorarios.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-900">{p.clienteNombre}</div>
                      <div className="font-mono text-[11px] text-slate-500">{p.numeroCausa}</div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-800 font-medium">{p.concepto}</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                      ${p.monto.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">{p.fecha}</td>
                    <td className="px-4 py-3.5 text-slate-700">
                      <div>{p.formaPago}</div>
                      <div className="font-mono text-[10px] text-slate-400">{p.numeroComprobante}</div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL PROGRAMAR FECHA DE LA DIFERENCIA */}
      {mostrarModalNuevaCuota && (
        <NuevaCuotaProgramadaModal
          isOpen={mostrarModalNuevaCuota}
          onClose={() => setMostrarModalNuevaCuota(false)}
          clientes={clientes}
          expedientes={expedientes}
          onGuardar={(nueva) => {
            onAgregarCuotaProgramada(nueva);
            setMostrarModalNuevaCuota(false);
          }}
        />
      )}

      {/* MODAL REGISTRAR PAGO */}
      {mostrarModalNuevoPago && (
        <NuevoPagoModal
          isOpen={mostrarModalNuevoPago}
          onClose={() => setMostrarModalNuevoPago(false)}
          clientes={clientes}
          expedientes={expedientes}
          onGuardar={(pago) => {
            onAgregarPago(pago);
            setMostrarModalNuevoPago(false);
          }}
        />
      )}
    </div>
  );
};

// Modal para programar la fecha de vencimiento de la diferencia
const NuevaCuotaProgramadaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  expedientes: Expediente[];
  onGuardar: (cuota: CuotaProgramada) => void;
}> = ({ isOpen, onClose, clientes, expedientes, onGuardar }) => {
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [expedienteId, setExpedienteId] = useState(expedientes[0]?.id || '');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState<number>(1000);
  const [fechaVencimiento, setFechaVencimiento] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [observaciones, setObservaciones] = useState('');

  const clienteObj = clientes.find((c) => c.id === clienteId) || clientes[0];
  const expObj = expedientes.find((e) => e.id === expedienteId) || expedientes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      id: `cuota-${Date.now()}`,
      clienteId: clienteObj.id,
      clienteNombre: clienteObj.nombre,
      expedienteId: expObj.id,
      numeroCausa: expObj.numeroCausa,
      numeroCuota: 2,
      totalCuotas: 3,
      descripcion: descripcion.trim() || 'Pago de la diferencia de honorarios convenidos',
      monto: Number(monto),
      fechaVencimiento,
      estado: 'Pendiente',
      observaciones: observaciones.trim() || 'Fecha programada de pago de la diferencia.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden text-slate-900 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Programar Fecha de Pago de la Diferencia
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Causa / Expediente</label>
            <select
              value={expedienteId}
              onChange={(e) => setExpedienteId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              {expedientes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.numeroCausa} - {e.titulo.substring(0, 30)}...
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hito / Concepto del Pago de la Diferencia
            </label>
            <input
              type="text"
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Saldo final contra emisión de Sentencia"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monto de la Diferencia ($ USD)
              </label>
              <input
                type="number"
                required
                min="1"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha Límite de Pago
              </label>
              <input
                type="date"
                required
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observaciones o Condiciones del Cobro
            </label>
            <textarea
              rows={2}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej: Se emitirá factura 5 días antes del vencimiento."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Guardar Fecha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal registrar pago ordinario
const NuevoPagoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  expedientes: Expediente[];
  onGuardar: (pago: PagoHonorario) => void;
}> = ({ isOpen, onClose, clientes, expedientes, onGuardar }) => {
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [expedienteId, setExpedienteId] = useState(expedientes[0]?.id || '');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState<number>(500);
  const [formaPago, setFormaPago] = useState<PagoHonorario['formaPago']>('Transferencia Bancaria');
  const [numeroComprobante, setNumeroComprobante] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clienteObj = clientes.find((c) => c.id === clienteId) || clientes[0];
    const expObj = expedientes.find((e) => e.id === expedienteId) || expedientes[0];

    onGuardar({
      id: `pago-${Date.now()}`,
      clienteId: clienteObj.id,
      clienteNombre: clienteObj.nombre,
      expedienteId: expObj.id,
      numeroCausa: expObj.numeroCausa,
      concepto: concepto.trim() || 'Cuota de honorarios profesionales',
      monto: Number(monto),
      fecha: new Date().toISOString().split('T')[0],
      formaPago,
      numeroComprobante: numeroComprobante.trim() || 'TRANS-PCH',
      estado: 'Pagado',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden text-slate-900 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Registrar Pago de Honorarios</h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Cliente</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Causa</label>
            <select
              value={expedienteId}
              onChange={(e) => setExpedienteId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
            >
              {expedientes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.numeroCausa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Concepto</label>
            <input
              type="text"
              required
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej: Anticipo patrocinio o pago de diferencia"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Monto ($ USD)</label>
              <input
                type="number"
                required
                min="1"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Forma de Pago</label>
              <select
                value={formaPago}
                onChange={(e) => setFormaPago(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Cheque">Cheque</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">N° Comprobante Bancario</label>
            <input
              type="text"
              value={numeroComprobante}
              onChange={(e) => setNumeroComprobante(e.target.value)}
              placeholder="Ej: TRANS-PCH-99214"
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Guardar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
