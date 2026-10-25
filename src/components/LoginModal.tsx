import React, { useState, useEffect } from 'react';
import { X, Lock, KeyRound, Building2, User, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SesionUsuario } from '../services/storageService';
import { CLIENTES_INICIALES, USUARIOS_ESTUDIO } from '../data/mockLegalData';
import { ActioLegisLogo } from './Brand/ActioLegisLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (sesion: SesionUsuario) => void;
  tabInicial?: 'estudio' | 'cliente';
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin,
  tabInicial = 'cliente' 
}) => {
  const [tab, setTab] = useState<'estudio' | 'cliente'>(tabInicial);

  // Sincronizar tab inicial cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setTab(tabInicial);
    }
  }, [isOpen, tabInicial]);

  // Formulario Estudio
  const [emailEstudio, setEmailEstudio] = useState('diego.tapia@actiolegisec.com');
  const [passwordEstudio, setPasswordEstudio] = useState('actio2026');

  // Formulario Cliente
  const [codigoCliente, setCodigoCliente] = useState('ACTIO-8492');
  const [errorCliente, setErrorCliente] = useState('');

  if (!isOpen) return null;

  const handleLoginEstudio = (e: React.FormEvent) => {
    e.preventDefault();
    const usuarioEncontrado =
      USUARIOS_ESTUDIO.find((u) => u.email.toLowerCase() === emailEstudio.toLowerCase()) ||
      USUARIOS_ESTUDIO[0];
    onLogin({
      tipo: 'estudio',
      usuarioEstudioId: usuarioEncontrado.id,
      nombre: usuarioEncontrado.nombre,
      emailOIdentificacion: usuarioEncontrado.email,
      rol: usuarioEncontrado.rol,
      puedeResponderConsultas: usuarioEncontrado.puedeResponderConsultas,
    });
    onClose();
  };

  const handleLoginCliente = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorCliente('');
    const codigoLimpio = codigoCliente.trim().toUpperCase();
    const clienteEncontrado = CLIENTES_INICIALES.find(
      (c) => c.codigoAcceso.toUpperCase() === codigoLimpio || c.identificacion === codigoLimpio
    );

    if (clienteEncontrado) {
      onLogin({
        tipo: 'cliente',
        clienteId: clienteEncontrado.id,
        nombre: clienteEncontrado.nombre,
        emailOIdentificacion: clienteEncontrado.identificacion,
        codigoAcceso: clienteEncontrado.codigoAcceso,
      });
      onClose();
    } else {
      setErrorCliente('Código de acceso confidencial o identificación no encontrada en el registro de ACTIO LEGIS.');
    }
  };

  const seleccionarClienteDemo = (c: typeof CLIENTES_INICIALES[0]) => {
    onLogin({
      tipo: 'cliente',
      clienteId: c.id,
      nombre: c.nombre,
      emailOIdentificacion: c.identificacion,
      codigoAcceso: c.codigoAcceso,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 flex flex-col max-h-[92vh]">
        {/* Cabecera Moderna ACTIO LEGIS */}
        <div className="px-6 py-6 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-black/60 rounded-xl border border-white/20">
                <ActioLegisLogo variant="white" size="xs" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white uppercase font-display block">
                  ACTIO LEGIS
                </span>
                <p className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Plataforma Segura • Guayaquil, Ecuador</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {tab === 'cliente'
              ? 'Accede al seguimiento confidencial de tus causas judiciales, audiencias y liquidación de honorarios.'
              : 'Ingreso reservado para los abogados socios, asociados y equipo administrativo de ACTIO LEGIS.'}
          </p>

          {/* Selector de Pestañas Moderno */}
          <div className="grid grid-cols-2 gap-2 mt-4 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setTab('cliente')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'cliente'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ingreso Clientes</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('estudio')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                tab === 'estudio'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Ingreso Intranet (Equipo)</span>
            </button>
          </div>
        </div>

        {/* Contenido del Formulario */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {tab === 'cliente' ? (
            /* TAB CLIENTES */
            <form onSubmit={handleLoginCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Código Confidencial o RUC / Cédula
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={codigoCliente}
                    onChange={(e) => setCodigoCliente(e.target.value)}
                    placeholder="Ej. ACTIO-8492 o 0992384756001"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-mono tracking-wider focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  El código fue asignado por tu abogado al abrir tu expediente en ACTIO LEGIS.
                </p>
              </div>

              {errorCliente && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {errorCliente}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Acceder a Mis Causas y Expedientes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Acceso rápido clientes de demostración */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  O selecciona un cliente registrado para probar:
                </span>
                <div className="space-y-2">
                  {CLIENTES_INICIALES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => seleccionarClienteDemo(c)}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                          {c.nombre}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Código: {c.codigoAcceso} • {c.tipo}
                        </span>
                      </div>
                      <span className="text-xs text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Entrar →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* TAB INTRANET ESTUDIO */
            <form onSubmit={handleLoginEstudio} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo Institucional (@actiolegisec.com)
                </label>
                <input
                  type="email"
                  required
                  value={emailEstudio}
                  onChange={(e) => setEmailEstudio(e.target.value)}
                  placeholder="abogado@actiolegisec.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Contraseña de Seguridad
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={passwordEstudio}
                    onChange={(e) => setPasswordEstudio(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Ingresar a Intranet del Estudio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Acceso Rápido por Miembro del Equipo */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Acceso directo según rol en ACTIO LEGIS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {USUARIOS_ESTUDIO.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        onLogin({
                          tipo: 'estudio',
                          usuarioEstudioId: u.id,
                          nombre: u.nombre,
                          emailOIdentificacion: u.email,
                          rol: u.rol,
                          puedeResponderConsultas: u.puedeResponderConsultas,
                        });
                        onClose();
                      }}
                      className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800 block truncate">
                        {u.nombre}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {u.rol}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
