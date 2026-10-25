import React, { useState } from 'react';
import { 
  Receipt, Plus, DollarSign, FileText, CheckCircle2, AlertCircle, 
  Download, Eye, User, FolderGit2, X, Upload, Calendar, Building2, Check
} from 'lucide-react';
import { GastoCliente, Cliente, Expediente } from '../../types/legal';

interface GastosManagerProps {
  gastos: GastoCliente[];
  clientes: Cliente[];
  expedientes: Expediente[];
  onAgregarGasto: (gasto: GastoCliente) => void;
  onMarcarReembolsado: (gastoId: string) => void;
  abogadoNombre: string;
}

export const GastosManager: React.FC<GastosManagerProps> = ({
  gastos,
  clientes,
  expedientes,
  onAgregarGasto,
  onMarcarReembolsado,
  abogadoNombre,
}) => {
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [comprobanteModalVisualizar, setComprobanteModalVisualizar] = useState<GastoCliente | null>(null);
  const [filtroCliente, setFiltroCliente] = useState<string>('todos');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Cálculos
  const totalGastosGenerados = gastos.reduce((acc, g) => acc + g.monto, 0);
  const totalGastosReembolsados = gastos
    .filter((g) => g.reembolsadoPorCliente)
    .reduce((acc, g) => acc + g.monto, 0);
  const totalGastosPendientesReembolso = totalGastosGenerados - totalGastosReembolsados;

  const gastosFiltrados = gastos.filter((g) => {
    const coincideCliente = filtroCliente === 'todos' || g.clienteId === filtroCliente;
    const coincideEstado =
      filtroEstado === 'todos' ||
      (filtroEstado === 'reembolsado' && g.reembolsadoPorCliente) ||
      (filtroEstado === 'pendiente' && !g.reembolsadoPorCliente);
    return coincideCliente && coincideEstado;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Contabilidad Procesal</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">
            Gastos Judiciales por Cliente & Comprobantes
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Registro y control de tasas judiciales, peritajes, notarías y copias generadas por cliente con respaldo de facturas y scans.
          </p>
        </div>

        <button
          onClick={() => setMostrarModalNuevo(true)}
          className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <Plus className="w-4 h-4 text-white" />
          Registrar Gasto con Comprobante
        </button>
      </div>

      {/* Tarjetas de Resumen Arquitectónicas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Total Gastos Procesales Generados</span>
          <div className="text-2xl font-black font-mono text-black mt-1 tabular-nums font-display">
            ${totalGastosGenerados.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-slate-400">Suma total de erogaciones del despacho</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-rose-700 block uppercase tracking-wider font-mono">Pendiente de Reembolso por Clientes</span>
          <div className="text-2xl font-black font-mono text-rose-700 mt-1 tabular-nums font-display">
            ${totalGastosPendientesReembolso.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-slate-400">Valores a liquidar con los clientes</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-700 block uppercase tracking-wider font-mono">Gastos Reembolsados / Cobrados</span>
          <div className="text-2xl font-black font-mono text-slate-900 mt-1 tabular-nums font-display">
            ${totalGastosReembolsados.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-slate-400">Comprobantes ya cancelados por clientes</span>
        </div>
      </div>

      {/* Filtros y Tabla de Gastos */}
      <div className="bg-white border-2 border-black actio-shadow overflow-hidden">
        <div className="p-4 border-b-2 border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Auditoría de Gastos Procesales</span>
            <span className="text-xs text-slate-400">({gastosFiltrados.length} registros)</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700"
            >
              <option value="todos">Todos los Clientes</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700"
            >
              <option value="todos">Todos los Estados</option>
              <option value="pendiente">Pendiente de Reembolso</option>
              <option value="reembolsado">Reembolsados</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Cliente & Causa</th>
                <th className="px-4 py-3">Concepto del Gasto</th>
                <th className="px-4 py-3">Proveedor / Entidad</th>
                <th className="px-4 py-3 text-right">Monto (USD)</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Comprobante / Scan</th>
                <th className="px-4 py-3 text-center">Estado Reembolso</th>
                <th className="px-4 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gastosFiltrados.map((gasto) => (
                <tr key={gasto.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-900">{gasto.clienteNombre}</div>
                    <div className="font-mono text-[11px] text-slate-500">{gasto.numeroCausa}</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="text-slate-800 font-medium">{gasto.concepto}</div>
                    <div className="text-[10px] text-slate-400">{gasto.tipoComprobante}</div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600">
                    <div>{gasto.proveedor}</div>
                    <div className="font-mono text-[10px] text-slate-400">{gasto.numeroComprobanteFactura}</div>
                  </td>

                  <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                    ${gasto.monto.toFixed(2)}
                  </td>

                  <td className="px-4 py-3.5 font-mono text-slate-600">{gasto.fecha}</td>

                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setComprobanteModalVisualizar(gasto)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md border border-indigo-200 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Ver Scan / Factura
                    </button>
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        gasto.reembolsadoPorCliente
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {gasto.reembolsadoPorCliente ? 'Reembolsado' : 'Pendiente Reembolso'}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    {!gasto.reembolsadoPorCliente ? (
                      <button
                        onClick={() => onMarcarReembolsado(gasto.id)}
                        className="px-2 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                      >
                        Marcar Reembolsado
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Liquidado
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {gastosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    No se registran gastos con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL VER SCAN / COMPROBANTE DE FACTURA */}
      {comprobanteModalVisualizar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden text-slate-900">
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Comprobante de Gasto Digitalizado</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {comprobanteModalVisualizar.numeroComprobanteFactura}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setComprobanteModalVisualizar(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">{comprobanteModalVisualizar.proveedor}</span>
                  <span className="font-mono text-emerald-700 font-bold text-sm">
                    ${comprobanteModalVisualizar.monto.toFixed(2)} USD
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div><strong>Cliente:</strong> {comprobanteModalVisualizar.clienteNombre}</div>
                  <div><strong>Causa Judicial:</strong> {comprobanteModalVisualizar.numeroCausa}</div>
                  <div><strong>Concepto:</strong> {comprobanteModalVisualizar.concepto}</div>
                  <div><strong>Fecha de Emisión:</strong> {comprobanteModalVisualizar.fecha}</div>
                  <div><strong>Tipo de Documento:</strong> {comprobanteModalVisualizar.tipoComprobante}</div>
                  <div><strong>Archivo Digital:</strong> {comprobanteModalVisualizar.comprobanteNombreArchivo || 'Factura_Digital.pdf'}</div>
                </div>

                {/* Vista previa simulada del scan oficial */}
                <div className="p-4 bg-white rounded-lg border border-slate-200 text-center space-y-2 mt-2">
                  <FileText className="w-10 h-10 mx-auto text-indigo-500" />
                  <div className="text-xs font-semibold text-slate-800">
                    Scan oficial verificado y archivado
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Registrado en ACTIO LEGIS por: {comprobanteModalVisualizar.registradoPor}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Estado: {comprobanteModalVisualizar.reembolsadoPorCliente ? 'Reembolsado por cliente' : 'Pendiente de reembolso'}
                </span>
                <button
                  onClick={() => alert(`Descargando comprobante ${comprobanteModalVisualizar.numeroComprobanteFactura}...`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar Scan / PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR NUEVO GASTO */}
      {mostrarModalNuevo && (
        <NuevoGastoModal
          isOpen={mostrarModalNuevo}
          onClose={() => setMostrarModalNuevo(false)}
          clientes={clientes}
          expedientes={expedientes}
          abogadoNombre={abogadoNombre}
          onGuardar={(nuevo) => {
            onAgregarGasto(nuevo);
            setMostrarModalNuevo(false);
          }}
        />
      )}
    </div>
  );
};

const NuevoGastoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  expedientes: Expediente[];
  abogadoNombre: string;
  onGuardar: (gasto: GastoCliente) => void;
}> = ({ isOpen, onClose, clientes, expedientes, abogadoNombre, onGuardar }) => {
  const [clienteId, setClienteId] = useState(clientes[0]?.id || '');
  const [expedienteId, setExpedienteId] = useState(expedientes[0]?.id || '');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState<number>(100);
  const [proveedor, setProveedor] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');
  const [tipoComprobante, setTipoComprobante] = useState<GastoCliente['tipoComprobante']>('Factura Electrónica');
  const [nombreArchivoScan, setNombreArchivoScan] = useState('Scan_Comprobante.pdf');

  const clienteObj = clientes.find((c) => c.id === clienteId) || clientes[0];
  const expObj = expedientes.find((e) => e.id === expedienteId) || expedientes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      id: `gasto-${Date.now()}`,
      clienteId: clienteObj.id,
      clienteNombre: clienteObj.nombre,
      expedienteId: expObj.id,
      numeroCausa: expObj.numeroCausa,
      concepto: concepto.trim() || 'Gasto procesal judicial',
      monto: Number(monto),
      fecha: new Date().toISOString().split('T')[0],
      numeroComprobanteFactura: numeroFactura.trim() || 'FAC-PENDIENTE',
      proveedor: proveedor.trim() || 'Entidad Judicial / Notaría',
      tipoComprobante,
      comprobanteNombreArchivo: nombreArchivoScan,
      reembolsadoPorCliente: false,
      registradoPor: abogadoNombre,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden text-slate-900 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Registrar Gasto Procesal de Cliente</h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Causa Judicial</label>
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Concepto del Gasto Judicial
            </label>
            <input
              type="text"
              required
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej: Honorario de Perito Acreditado / Notaría Copias"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proveedor / Perito / Notaría
              </label>
              <input
                type="text"
                required
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                placeholder="Ej: Notaría 35 de Quito"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Monto del Gasto ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.5"
                required
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Comprobante</label>
              <select
                value={tipoComprobante}
                onChange={(e) => setTipoComprobante(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Factura Electrónica">Factura Electrónica</option>
                <option value="Recibo Notarial">Recibo Notarial</option>
                <option value="Tasa Judicial Judicatura">Tasa Judicial Judicatura</option>
                <option value="Honorario Peritaje">Honorario Peritaje</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">N° de Factura / Recibo</label>
              <input
                type="text"
                required
                value={numeroFactura}
                onChange={(e) => setNumeroFactura(e.target.value)}
                placeholder="Ej: FAC-001-002-004812"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adjuntar Scan del Comprobante / Factura Digital (PDF o Imagen)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nombreArchivoScan}
                onChange={(e) => setNombreArchivoScan(e.target.value)}
                placeholder="Nombre del archivo escaneado..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
              />
              <button
                type="button"
                onClick={() => setNombreArchivoScan(`Scan_${numeroFactura || 'Factura'}_${Date.now()}.pdf`)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold border border-slate-300 whitespace-nowrap"
              >
                Cargar Scan
              </button>
            </div>
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
              Guardar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
