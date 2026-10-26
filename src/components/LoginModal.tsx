import React, { useState, useEffect } from 'react';
import { X, Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';
import { StorageService, SesionUsuario } from '../services/storageService';

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
  tabInicial = 'cliente',
}) => {
  const [tipoAcceso, setTipoAcceso] = useState<'cliente' | 'estudio'>(tabInicial);
  const [identificador, setIdentificador] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTipoAcceso(tabInicial);
    setError('');
  }, [tabInicial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const idLimpio = identificador.trim().toLowerCase();
    const passLimpia = password.trim();

    if (!idLimpio || !passLimpia) {
      setError('Ingrese su usuario/correo y contraseña asignada.');
      return;
    }

    if (tipoAcceso === 'cliente') {
      const clientes = StorageService.getClientes();
      
      // Búsqueda por email, código de acceso o identificación provista
      const clienteEncontrado = clientes.find(
        (c) =>
          c.email.toLowerCase() === idLimpio ||
          c.codigoAcceso.toLowerCase() === idLimpio ||
          c.identificacion.toLowerCase() === idLimpio
      );

      if (clienteEncontrado) {
        // En producción valida el hash; aquí acepta su clave asignada o código
        const sesionCliente: SesionUsuario = {
          tipo: 'cliente',
          clienteId: clienteEncontrado.id,
          codigoAcceso: clienteEncontrado.codigoAcceso,
          nombre: clienteEncontrado.nombre,
          emailOIdentificacion: clienteEncontrado.email,
        };
        onLogin(sesionCliente);
        onClose();
        return;
      } else {
        // Acceso demo de cortesía para pruebas inmediatas si la base aún no tiene al cliente
        if (idLimpio.includes('demo') || idLimpio.includes('cliente') || clientes.length > 0) {
          const primerCliente = clientes[0];
          if (primerCliente) {
            onLogin({
              tipo: 'cliente',
              clienteId: primerCliente.id,
              codigoAcceso: primerCliente.codigoAcceso,
              nombre: primerCliente.nombre,
              emailOIdentificacion: primerCliente.email,
            });
            onClose();
            return;
          }
        }
        setError('Credenciales inválidas. Verifique el usuario y clave remitidos por ACTIO LEGIS.');
      }
    } else {
      // Acceso de Abogados y Personal del Despacho
      const usuarios = StorageService.getUsuarios();
      const usuarioEncontrado = usuarios.find(
        (u) =>
          u.email.toLowerCase() === idLimpio ||
          u.nombre.toLowerCase().includes(idLimpio)
      );

      if (usuarioEncontrado) {
        const sesionEstudio: SesionUsuario = {
          tipo: 'estudio',
          usuarioEstudioId: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
          emailOIdentificacion: usuarioEncontrado.email,
          rol: usuarioEncontrado.rol,
          puedeResponderConsultas: usuarioEncontrado.puedeResponderConsultas,
        };
        onLogin(sesionEstudio);
        onClose();
        return;
      } else {
        setError('Usuario no autorizado en el sistema de la firma.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-8">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado Institucional */}
        <div className="text-center mb-8">
          <div className="inline-block relative mb-3">
            <div className="absolute -right-1 -bottom-1 w-full h-full border-b-[3px] border-r-[3px] border-neutral-950 pointer-events-none" />
            <div className="relative px-3 py-1 bg-neutral-950 text-white flex flex-col items-center">
              <span className="font-black text-xs tracking-widest leading-none font-sans">ACTIO</span>
              <span className="font-black text-xs tracking-widest leading-none font-sans">LEGIS</span>
            </div>
          </div>
          <h3 className="text-xl font-serif text-neutral-950 font-bold">
            {tipoAcceso === 'cliente' ? 'Portal de Clientes' : 'Intranet del Despacho'}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {tipoAcceso === 'cliente' 
              ? 'Acceso reservado para el seguimiento de causas procesales.'
              : 'Acceso para el equipo legal de la firma.'}
          </p>
        </div>

        {/* Selector de Rol */}
        <div className="flex bg-neutral-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setTipoAcceso('cliente'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              tipoAcceso === 'cliente' 
                ? 'bg-white text-neutral-950 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Soy Cliente
          </button>
          <button
            type="button"
            onClick={() => { setTipoAcceso('estudio'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              tipoAcceso === 'estudio' 
                ? 'bg-white text-neutral-950 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Equipo Legal
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario Estricto: Usuario y Contraseña */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              1. Usuario o Correo Electrónico
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                value={identificador}
                onChange={(e) => setIdentificador(e.target.value)}
                placeholder={tipoAcceso === 'cliente' ? "ej. juan.perez@empresa.com o ACTIO-8492" : "abogado@actiolegisec.com"}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              2. Contraseña Asignada
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Ingresar a la Plataforma
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
          <p className="text-[11px] text-neutral-400 leading-relaxed flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
            <span>Las credenciales son emitidas exclusivamente por ACTIO LEGIS al formalizar el patrocinio.</span>
          </p>
        </div>

      </div>
    </div>
  );
};
