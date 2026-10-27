import React, { useState } from 'react';
import { X, User, Lock, Shield, AlertCircle, Settings } from 'lucide-react';

export type RolUsuario = 'admin' | 'abogado' | 'asistente' | 'pasante' | 'cliente';

export interface UsuarioSistema {
  id: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  codigoCliente?: string;
  claveAcceso?: string;
  activo: boolean;
}

interface LoginModalProps {
  modalIngreso: 'intranet' | 'cliente' | 'admin' | null;
  onClose: () => void;
  usuariosSistema: UsuarioSistema[];
  onLoginExitoso: (usuario: UsuarioSistema, vistaDestino: 'intranet' | 'cliente' | 'admin-console') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  modalIngreso,
  onClose,
  usuariosSistema,
  onLoginExitoso
}) => {
  const [correoGoogleInput, setCorreoGoogleInput] = useState('diego.tapia@actiolegisec.com');
  const [claveIntranetInput, setClaveIntranetInput] = useState('');

  const [codigoClienteInput, setCodigoClienteInput] = useState('ACTIO-00001');
  const [claveClienteInput, setClaveClienteInput] = useState('');

  const [correoAdminInput, setCorreoAdminInput] = useState('diego.tapia@actiolegisec.com');
  const [claveAdminInput, setClaveAdminInput] = useState('');
  const [recordarAdmin, setRecordarAdmin] = useState(false);

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  if (!modalIngreso) return null;

  // 1. INTRANET: PERMITE INGRESO CON CLAVE O CON GOOGLE
  const handleIngresoIntranetConClave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    const correoLimpio = correoGoogleInput.trim().toLowerCase();

    if (!correoLimpio.endsWith('@actiolegisec.com')) {
      setErrorLogin('Acceso denegado: Se requiere correo institucional de la firma @actiolegisec.com');
      return;
    }

    let usr = usuariosSistema.find(u => u.correo.toLowerCase() === correoLimpio);

    if (!usr) {
      usr = {
        id: `usr-${Date.now()}`,
        nombre: correoLimpio.split('@')[0].replace('.', ' ').toUpperCase(),
        correo: correoLimpio,
        rol: 'abogado',
        claveAcceso: claveIntranetInput,
        activo: true
      };
    }

    onLoginExitoso(usr, 'intranet');
  };

  // 2. PORTAL CLIENTES (ACTIO-XXXXX)
  const handleIngresoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    const codLimpio = codigoClienteInput.trim().toUpperCase();

    let clienteEncontrado = usuariosSistema.find(u => 
      u.rol === 'cliente' && u.codigoCliente === codLimpio
    );

    if (!clienteEncontrado && codLimpio.startsWith('ACTIO-')) {
      clienteEncontrado = {
        id: `usr-cli-${Date.now()}`,
        nombre: 'Inmobiliaria del Valle S.A.S.',
        correo: 'contacto@inmovalle.com',
        rol: 'cliente',
        codigoCliente: codLimpio,
        claveAcceso: claveClienteInput,
        activo: true
      };
    }

    if (clienteEncontrado) {
      onLoginExitoso(clienteEncontrado, 'cliente');
    } else {
      setErrorLogin('Código de cliente inválido. Debe usar el formato ACTIO-00001.');
    }
  };

  // 3. CONSOLA ADMINISTRADOR (DIEGO TAPIA)
  const handleIngresoAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);

    if (correoAdminInput.trim().toLowerCase() !== 'diego.tapia@actiolegisec.com') {
      setErrorLogin('Acceso restringido únicamente para diego.tapia@actiolegisec.com');
      return;
    }

    if (claveAdminInput.length >= 4) {
      const adminUsr = usuariosSistema.find(u => u.correo === 'diego.tapia@actiolegisec.com') || {
        id: 'usr-admin',
        nombre: 'Abg. Diego Tapia Vicuña, Mgs.',
        correo: 'diego.tapia@actiolegisec.com',
        rol: 'admin',
        activo: true
      };
      onLoginExitoso(adminUsr, 'admin-console');
    } else {
      setErrorLogin('Contraseña de Administrador incorrecta.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
        
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-4">
          <img 
            src="/logo-estudio.png" 
            alt="ACTIO LEGIS Consultores Jurídicos" 
            className="h-16 w-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* MODAL 1: INTRANET DE ABOGADOS / EQUIPO */}
        {modalIngreso === 'intranet' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Intranet del Despacho</h3>
              <p className="text-xs text-neutral-500 mt-1">Acceso con clave institucional o Google Workspace (@actiolegisec.com).</p>
            </div>

            <form onSubmit={handleIngresoIntranetConClave} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Correo Institucional (@actiolegisec.com)
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={correoGoogleInput}
                    onChange={(e) => setCorreoGoogleInput(e.target.value)}
                    placeholder="usuario@actiolegisec.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-mono focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Contraseña Institucional
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={claveIntranetInput}
                    onChange={(e) => setClaveIntranetInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
              >
                Ingresar a la Intranet
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono"><span className="bg-white px-2 text-neutral-400">O Autenticar con Google</span></div>
              </div>

              <button
                type="button"
                onClick={handleIngresoIntranetConClave}
                className="w-full py-2.5 px-4 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continuar con Google Workspace</span>
              </button>
            </form>
          </div>
        )}

        {/* MODAL 2: PORTAL CLIENTES */}
        {modalIngreso === 'cliente' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Portal de Clientes</h3>
              <p className="text-xs text-neutral-500 mt-1">Ingrese con el código confidencial asignado por su abogado patrocinador.</p>
            </div>

            <form onSubmit={handleIngresoCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Código de Cliente (Ej. ACTIO-00001)
                </label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={codigoClienteInput}
                    onChange={(e) => setCodigoClienteInput(e.target.value)}
                    placeholder="ACTIO-00001"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm uppercase font-mono focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Contraseña de Acceso
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={claveClienteInput}
                    onChange={(e) => setClaveClienteInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
              >
                Ingresar al Portal Privado
              </button>
            </form>
          </div>
        )}

        {/* MODAL 3: CONSOLA DE ADMINISTRADOR */}
        {modalIngreso === 'admin' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-serif text-neutral-950 font-bold flex items-center justify-center gap-2">
                <Settings className="w-5 h-5 text-neutral-900" />
                <span>Consola Administrador Principal</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Acceso con privilegios de control total CMS.</p>
            </div>

            <form onSubmit={handleIngresoAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Correo de Administrador
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={correoAdminInput}
                    onChange={(e) => setCorreoAdminInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-mono focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Contraseña de Administrador
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={claveAdminInput}
                    onChange={(e) => setClaveAdminInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recordarAdmin"
                  checked={recordarAdmin}
                  onChange={(e) => setRecordarAdmin(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950 cursor-pointer"
                />
                <label htmlFor="recordarAdmin" className="text-xs text-neutral-600 cursor-pointer select-none">
                  Recordar este usuario en el navegador
                </label>
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs"
              >
                Ingresar a Consola Admin
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
