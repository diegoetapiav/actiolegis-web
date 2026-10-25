import React from 'react';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Building2, Copy, Check } from 'lucide-react';
import { Cliente, Expediente, PagoHonorario } from '../../types/legal';

interface ClienteHonorariosViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  honorarios: PagoHonorario[];
}

export const ClienteHonorariosView: React.FC<ClienteHonorariosViewProps> = ({
  cliente,
  expedientes,
  honorarios,
}) => {
  const misHonorarios = honorarios.filter((h) => h.clienteId === cliente.id);
  const misExpedientes = expedientes.filter((e) => e.clienteId === cliente.id);

  const totalPactado = misExpedientes.reduce((acc, e) => acc + e.honorariosPactados, 0);
  const totalPagado = misHonorarios
    .filter((h) => h.estado === 'Pagado')
    .reduce((acc, h) => acc + h.monto, 0);
  const saldoPendiente = Math.max(0, totalPactado - totalPagado);

  const [copiado, setCopiado] = React.useState(false);

  const copiarCuenta = () => {
    navigator.clipboard.writeText('2100192834');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Estado de Cuenta y Honorarios Profesionales
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Transparencia y desglose de valores pactados, cuotas canceladas y recibos emitidos por el estudio.
        </p>
      </div>

      {/* Tarjetas de Resumen de Cuenta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 block">Honorarios Contratados</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            ${totalPactado.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400">Total convenido por patrocinio</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-emerald-700 block">Total Cancelado / Pagado</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            ${totalPagado.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400">Comprobantes acreditados</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-amber-700 block">Saldo Pendiente Acordado</span>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            ${saldoPendiente.toLocaleString()} USD
          </div>
          <span className="text-[11px] text-slate-400">Cuotas según hitos procesales</span>
        </div>
      </div>

      {/* Historial de Pagos y Recibos */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-800">
            Detalle de Pagos Registrados ({misHonorarios.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">Cliente: {cliente.codigoAcceso}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Concepto</th>
                <th className="px-4 py-3 font-mono">Causa</th>
                <th className="px-4 py-3 text-right">Monto (USD)</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Medio de Pago / Referencia</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {misHonorarios.map((pago) => (
                <tr key={pago.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-slate-900">{pago.concepto}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-600">{pago.numeroCausa}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                    ${pago.monto.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-600">{pago.fecha}</td>
                  <td className="px-4 py-3.5 text-slate-600">
                    <div>{pago.formaPago}</div>
                    <div className="text-[10px] font-mono text-slate-400">{pago.numeroComprobante}</div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        pago.estado === 'Pagado'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {pago.estado}
                    </span>
                  </td>
                </tr>
              ))}

              {misHonorarios.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    No registra movimientos de honorarios en este periodo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Datos Bancarios Oficiales del Estudio */}
      <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>Datos Bancarios Oficiales para Transferencias (Actio Legis Ecuador)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-4 rounded-lg border border-slate-200">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Entidad Financiera</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">Banco Pichincha</span>
            <span className="text-[11px] text-slate-500">Cuenta Corriente N° 2100192834</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Beneficiario & RUC</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">Actio Legis Despacho Jurídico Cía. Ltda.</span>
            <span className="text-[11px] text-slate-500 font-mono">RUC: 1793148920001</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Notificación de Pagos</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">pagos@actiolegisec.com</span>
            <button
              onClick={copiarCuenta}
              className="mt-1 text-[11px] text-indigo-600 font-semibold flex items-center gap-1 hover:underline"
            >
              {copiado ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiado ? 'N° de cuenta copiado' : 'Copiar número de cuenta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
