import React, { useState } from 'react';
import { Users, Plus, KeyRound, Copy, Check, Search, Building2, User, Phone, Mail, MapPin } from 'lucide-react';
import { Cliente, Expediente } from '../../types/legal';

interface ClientesManagerProps {
  clientes: Cliente[];
  expedientes: Expediente[];
  onAgregarCliente: (cliente: Cliente) => void;
}

export const ClientesManager: React.FC<ClientesManagerProps> = ({
  clientes,
  expedientes,
  onAgregarCliente,
}) => {
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.identificacion.includes(busqueda) ||
      c.codigoAcceso.toLowerCase().includes(busqueda.toLowerCase())
  );

  const copiarCodigo = (codigo: string, id: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiadoId(id);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono">
              ESTUDIO JURÍDICO ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-400">· Cartera de Clientes</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Directorio de Clientes & Códigos de Patrocinio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestión y entrega de códigos confidenciales para que los clientes de Actio Legis consulten sus causas en tiempo real.
          </p>
        </div>

        <button
          onClick={() => setMostrarModalNuevo(true)}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Registrar Nuevo Cliente
        </button>
      </div>

      {/* Búsqueda */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar cliente por nombre, RUC/Cédula o código de acceso..."
          className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        />
      </div>

      {/* Grilla de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clientesFiltrados.map((cliente) => {
          const casosDelCliente = expedientes.filter((e) => e.clienteId === cliente.id);

          return (
            <div
              key={cliente.id}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{cliente.nombre}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-600">
                      {cliente.tipo}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    ID / RUC: {cliente.identificacion}
                  </div>
                  {cliente.representanteLegal && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Rep. Legal: {cliente.representanteLegal}
                    </div>
                  )}
                </div>

                {/* Código de Acceso Consultivo */}
                <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-right">
                  <span className="text-[10px] font-semibold text-indigo-700 block uppercase">
                    Código de Consulta
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-xs font-bold text-indigo-900">
                      {cliente.codigoAcceso}
                    </span>
                    <button
                      onClick={() => copiarCodigo(cliente.codigoAcceso, cliente.id)}
                      className="p-1 text-indigo-600 hover:text-indigo-900 rounded-md transition-colors"
                      title="Copiar código para enviar al cliente"
                    >
                      {copiadoId === cliente.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{cliente.email}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cliente.telefono}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{cliente.ciudad} · {cliente.direccion}</span>
                </div>
              </div>

              {/* Causas activas asociadas */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold text-slate-700">
                  <span>Procesos Activos ({casosDelCliente.length}):</span>
                </div>
                <div className="space-y-1">
                  {casosDelCliente.map((c) => (
                    <div
                      key={c.id}
                      className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <span className="font-mono font-bold text-slate-800">{c.numeroCausa}</span>
                      <span className="text-slate-600 truncate max-w-[200px]">{c.titulo}</span>
                      <span className="text-[10px] text-slate-500">{c.estado}</span>
                    </div>
                  ))}
                  {casosDelCliente.length === 0 && (
                    <span className="text-[11px] text-slate-400 italic">Sin causas registradas aún</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {mostrarModalNuevo && (
        <NuevoClienteModal
          isOpen={mostrarModalNuevo}
          onClose={() => setMostrarModalNuevo(false)}
          onGuardar={(nuevo) => {
            onAgregarCliente(nuevo);
            setMostrarModalNuevo(false);
          }}
        />
      )}
    </div>
  );
};

const NuevoClienteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (cliente: Cliente) => void;
}> = ({ isOpen, onClose, onGuardar }) => {
  const [tipo, setTipo] = useState<'Persona Jurídica' | 'Persona Natural'>('Persona Natural');
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [representanteLegal, setRepresentanteLegal] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('Quito, Pichincha');
  const [direccion, setDireccion] = useState('');

  // Generación de código de acceso automático
  const codigoSugerido = `ACTIO-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      id: `cli-${Date.now()}`,
      codigoAcceso: codigoSugerido,
      tipo,
      nombre: nombre.trim(),
      identificacion: identificacion.trim(),
      representanteLegal: tipo === 'Persona Jurídica' ? representanteLegal.trim() : undefined,
      email: email.trim(),
      telefono: telefono.trim(),
      ciudad: ciudad.trim(),
      direccion: direccion.trim(),
      fechaRegistro: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Registrar Nuevo Cliente</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTipo('Persona Natural')}
              className={`py-2 text-xs font-semibold rounded-lg border ${
                tipo === 'Persona Natural'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              Persona Natural
            </button>
            <button
              type="button"
              onClick={() => setTipo('Persona Jurídica')}
              className={`py-2 text-xs font-semibold rounded-lg border ${
                tipo === 'Persona Jurídica'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              Persona Jurídica
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre / Razón Social
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Carlos Alberto Mendoza"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {tipo === 'Persona Jurídica' ? 'RUC' : 'Cédula / Pasaporte'}
              </label>
              <input
                type="text"
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                placeholder="Ej: 1718293041"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono</label>
              <input
                type="text"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+593 99..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {tipo === 'Persona Jurídica' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Representante Legal
              </label>
              <input
                type="text"
                value={representanteLegal}
                onChange={(e) => setRepresentanteLegal(e.target.value)}
                placeholder="Nombre del Gerente / Apoderado"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@correo.com"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad</label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dirección</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle y N°"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-800">
            Se generará automáticamente el código consultivo: <strong>{codigoSugerido}</strong>. Comparta este código con su cliente para que acceda al portal.
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
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
