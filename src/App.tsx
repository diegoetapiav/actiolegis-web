import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, Calendar, DollarSign, 
  MapPin, Phone, Mail, ArrowRight, ArrowUp, ExternalLink, 
  ChevronRight, Lock, User, LogOut, X, Clock, Award, Landmark, 
  Users, Building2, Sparkles, Plus, CheckCircle2, AlertCircle, Bot, BookOpen, 
  HeartHandshake, UserCheck, Settings, Upload, FileCheck
} from 'lucide-react';

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

export interface RegistroGastoDrive {
  id: string;
  causaId: string;
  cliente: string;
  monto: string;
  concepto: string;
  nombreArchivo: string;
  rutaDrive: string;
  fechaSubida: string;
  usuarioSubida: string;
}

export interface NotificacionAuditoria {
  id: string;
  fecha: string;
  usuario: string;
  accion: string;
  modulo: string;
}

export interface ArticuloEditorial {
  id: string;
  titulo: string;
  categoria: string;
  resumen: string;
  autor: string;
  estado: 'publicado' | 'pendiente_aprobacion';
  fecha: string;
}

const USUARIOS_BASE: UsuarioSistema[] = [
  { id: 'usr-admin', nombre: 'Abg. Diego Tapia Vicuña, Mgs.', correo: 'diego.tapia@actiolegisec.com', rol: 'admin', activo: true },
  { id: 'usr-abg', nombre: 'Abg. Marcela Dunn-Ortega, Mgs.', correo: 'marceladunnortega@actiolegisec.com', rol: 'abogado', activo: true },
  { id: 'usr-asis', nombre: 'Lcda. María Elena Castro', correo: 'mcastro@actiolegisec.com', rol: 'asistente', activo: true },
  { id: 'usr-pas', nombre: 'Carlos Mendoza', correo: 'cmendoza@actiolegisec.com', rol: 'pasante', activo: true },
  { id: 'usr-cli-1', nombre: 'Inmobiliaria del Valle S.A.S.', correo: 'contacto@inmovalle.com', rol: 'cliente', codigoCliente: 'ACTIO-00001', claveAcceso: 'cliente123', activo: true },
];

export default function App() {
  const [vista, setVista] = useState<'sitio-web' | 'editorial' | 'equipo' | 'cliente' | 'intranet' | 'admin-console'>('sitio-web');
  const [tabIntranet, setTabIntranet] = useState<'expedientes' | 'citas' | 'gastos' | 'editorial-borradores'>('expedientes');
  const [modalIngreso, setModalIngreso] = useState<'intranet' | 'cliente' | 'admin' | null>(null);

  const [usuarioSesion, setUsuarioSesion] = useState<UsuarioSistema | null>(null);
  const [usuariosSistema, setUsuariosSistema] = useState<UsuarioSistema[]>(USUARIOS_BASE);

  // Formulario SSO Intranet
  const [correoGoogleInput, setCorreoGoogleInput] = useState('diego.tapia@actiolegisec.com');
  // Formulario Portal Clientes
  const [codigoClienteInput, setCodigoClienteInput] = useState('');
  const [claveClienteInput, setClaveClienteInput] = useState('');
  // Formulario Admin
  const [correoAdminInput, setCorreoAdminInput] = useState('diego.tapia@actiolegisec.com');
  const [claveAdminInput, setClaveAdminInput] = useState('');
  const [claveAdminGuardada, setClaveAdminGuardada] = useState<string | null>('admin123');

  const [montoGastoInput, setMontoGastoInput] = useState('');
  const [conceptoGastoInput, setConceptoGastoInput] = useState('');
  const [archivoComprobante, setArchivoComprobante] = useState<File | null>(null);

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  // 1. AUTENTICACIÓN GOOGLE SINGLE SIGN-ON PARA INTRANET
  const handleIngresoGoogleIntranet = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    
    const correoLimpio = correoGoogleInput.trim().toLowerCase();

    if (!correoLimpio.endsWith('@actiolegisec.com')) {
      setErrorLogin('Acceso denegado: Únicamente se autoriza el ingreso a cuentas institucionales de Google @actiolegisec.com');
      return;
    }

    let usr = usuariosSistema.find(u => u.correo.toLowerCase() === correoLimpio);

    if (!usr) {
      usr = {
        id: `usr-${Date.now()}`,
        nombre: correoLimpio.split('@')[0].replace('.', ' ').toUpperCase(),
        correo: correoLimpio,
        rol: 'abogado',
        activo: true
      };
      setUsuariosSistema(prev => [...prev, usr!]);
    }

    setUsuarioSesion(usr);
    setModalIngreso(null);
    setVista('intranet');
  };

  // 2. INGRESO PORTAL CLIENTES
  const handleIngresoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);
    const codLimpio = codigoClienteInput.trim().toUpperCase();

    const clienteEncontrado = usuariosSistema.find(u => 
      u.rol === 'cliente' && 
      u.codigoCliente === codLimpio && 
      u.claveAcceso === claveClienteInput
    );

    if (clienteEncontrado) {
      setUsuarioSesion(clienteEncontrado);
      setModalIngreso(null);
      setCodigoClienteInput('');
      setClaveClienteInput('');
      setVista('cliente');
    } else {
      setErrorLogin('Código de cliente o contraseña incorrectos. Verifique sus datos.');
    }
  };

  // 3. INGRESO CONSOLA ADMINISTRADOR
  const handleIngresoAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLogin(null);

    if (correoAdminInput.trim().toLowerCase() !== 'diego.tapia@actiolegisec.com') {
      setErrorLogin('Acceso restringido únicamente para diego.tapia@actiolegisec.com');
      return;
    }

    if (claveAdminInput.length >= 4) {
      const adminUsr = usuariosSistema.find(u => u.correo === 'diego.tapia@actiolegisec.com')!;
      setUsuarioSesion(adminUsr);
      setModalIngreso(null);
      setVista('admin-console');
    } else {
      setErrorLogin('Contraseña de Administrador incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased">
      
      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">
          
          <div onClick={() => setVista('sitio-web')} className="flex items-center gap-3.5 cursor-pointer">
            <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-20 w-auto object-contain mix-blend-multiply" />
            <div className="hidden sm:flex flex-col border-l border-neutral-200 pl-3">
              <span className="font-serif text-xs font-bold text-neutral-950">
                {vista === 'editorial' ? 'Editorial Jurídico' : 'Estudio Jurídico'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono">
                Guayaquil • Ecuador
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {vista === 'sitio-web' || vista === 'editorial' || vista === 'equipo' ? (
              <>
                <nav className="hidden lg:flex items-center gap-6 text-xs font-mono uppercase tracking-[0.15em] text-neutral-600 ml-8">
                  <button type="button" onClick={() => setVista('sitio-web')} className={`hover:text-neutral-950 cursor-pointer ${vista === 'sitio-web' ? 'text-neutral-950 font-bold' : ''}`}>Inicio</button>
                  <a href="#proposito" className="hover:text-neutral-950">Propósito</a>
                  <a href="#socios" className="hover:text-neutral-950">Nuestro Equipo</a>
                  <a href="#practica" className="hover:text-neutral-950">Prácticas</a>
                  <button type="button" onClick={() => setVista('editorial')} className="hover:text-neutral-950 cursor-pointer">Editorial</button>
                  <a href="#contacto" className="hover:text-neutral-950">Contacto</a>
                </nav>

                <button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('intranet'); }} className="px-3 py-2 bg-neutral-100 text-neutral-800 rounded-xl text-xs font-semibold">Intranet</button>
                <button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }} className="px-3 py-2 border border-neutral-300 rounded-xl text-xs font-semibold">Portal Clientes</button>
                <button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('admin'); }} className="px-3 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold">Consola Admin</button>
              </>
            ) : (
              <button type="button" onClick={() => { setUsuarioSesion(null); setVista('sitio-web'); }} className="px-3.5 py-2 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* VISTA PORTADA PRINCIPAL */}
      {vista === 'sitio-web' && (
        <main>
          <section className="pt-20 pb-24 text-center border-b border-neutral-200">
            <div className="max-w-4xl mx-auto px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 border border-neutral-200 text-[11px] font-mono uppercase mb-8">
                <span>Despacho de litigantes • Guayaquil, Ecuador</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-serif text-neutral-950 tracking-tight leading-tight">
                Rigor técnico, litigio estratégico y defensa <span className="italic font-normal text-[#E2D9C8]">en servicio del derecho.</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 font-light mt-6 max-w-2xl mx-auto">
                ACTIO LEGIS consolida una práctica jurídica de alta exigencia procesal, patrocinando juicios y trámites judiciales o administrativos, manejo de casos de complejidad y controversias de distintas índoles bajo estándares de estricta reserva y ética profesional.
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button type="button" onClick={() => alert('Para agendar su consulta, contáctenos al +593 4 6005080 o al correo info@actiolegisec.com')} className="px-7 py-3.5 bg-neutral-950 text-white text-xs uppercase font-semibold rounded-xl">Agende una consulta</button>
                <button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }} className="px-7 py-3.5 bg-white border border-neutral-300 text-neutral-900 text-xs uppercase font-semibold rounded-xl">Portal de Clientes</button>
              </div>
            </div>
          </section>

          <section id="proposito" className="py-20 bg-[#281F26] text-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">No ejercemos el derecho en masa. Asumimos causas con compromiso de fondo.</h2>
              <p className="mt-4 text-neutral-300 text-sm font-light">En un entorno sobrecargado por trámites delegados, ACTIO LEGIS ejerce el patrocinio con la devoción técnica que amerita: cada proceso es directed personalmente, formulando teorías de cada caso, procurando la más sólida recopilación probatoria para obtener el resultado esperado.</p>
            </div>
          </section>
        </main>
      )}

      {/* VISTA INTRANET */}
      {vista === 'intranet' && (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold">Intranet ACTIO LEGIS</h1>
            <div className="flex gap-2">
              <button type="button" onClick={() => setTabIntranet('expedientes')} className="px-3.5 py-1.5 bg-neutral-100 rounded-lg text-xs font-semibold">Expedientes & IA</button>
              <button type="button" onClick={() => setTabIntranet('citas')} className="px-3.5 py-1.5 bg-neutral-100 rounded-lg text-xs font-semibold">Google Calendar Inst.</button>
            </div>
          </div>

          {tabIntranet === 'citas' && (
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 h-[650px]">
              <iframe 
                src="https://calendar.google.com/calendar/embed?src=actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc%40group.calendar.google.com&ctz=America%2FGuayaquil"
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                title="Calendario ACTIO LEGIS"
              />
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-200 py-12 px-6 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-20 w-auto object-contain mix-blend-multiply" />
            <p className="mt-2 text-neutral-500">Estudio Jurídico en Guayaquil.</p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-950 uppercase font-mono mb-2">Enlaces de interés</h4>
            <ul className="space-y-1 text-neutral-600">
              <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('intranet'); }}>Intranet Abogados</button></li>
              <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('cliente'); }}>Portal Clientes</button></li>
              <li><button type="button" onClick={() => { setErrorLogin(null); setModalIngreso('admin'); }}>Consola Administrador</button></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* MODAL 1: INTRANET (GOOGLE OAUTH SSO EXCLUSIVO) */}
      {modalIngreso === 'intranet' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7 text-center space-y-5">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900">
              <X className="w-5 h-5" />
            </button>

            <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-16 w-auto mx-auto mix-blend-multiply" />

            <div>
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Intranet del Despacho</h3>
              <p className="text-xs text-neutral-500 mt-1">Acceso exclusivo mediante la cuenta corporativa de Google (@actiolegisec.com).</p>
            </div>

            <form onSubmit={handleIngresoGoogleIntranet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono text-left">Correo Google Institucional</label>
                <input
                  type="email"
                  required
                  value={correoGoogleInput}
                  onChange={(e) => setCorreoGoogleInput(e.target.value)}
                  placeholder="usuario@actiolegisec.com"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950 font-mono"
                />
              </div>

              {errorLogin && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorLogin}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-3 shadow-2xs transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continuar con Google (@actiolegisec.com)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PORTAL CLIENTES */}
      {modalIngreso === 'cliente' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-16 w-auto mx-auto mix-blend-multiply mb-2" />
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Portal de Clientes</h3>
            </div>

            <form onSubmit={handleIngresoCliente} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Código de Cliente (Ej. ACTIO-00001)</label>
                <input type="text" required value={codigoClienteInput} onChange={(e) => setCodigoClienteInput(e.target.value)} placeholder="ACTIO-00001" className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm uppercase font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Contraseña de Acceso</label>
                <input type="password" required value={claveClienteInput} onChange={(e) => setClaveClienteInput(e.target.value)} placeholder="••••••••••••" className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm" />
              </div>
              {errorLogin && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">{errorLogin}</div>}
              <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold uppercase rounded-xl">Ingresar al Portal Privado</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CONSOLA DE ADMINISTRADOR */}
      {modalIngreso === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl p-7">
            <button onClick={() => setModalIngreso(null)} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <img src="/logo-estudio.png" alt="ACTIO LEGIS" className="h-16 w-auto mx-auto mix-blend-multiply mb-2" />
              <h3 className="text-xl font-serif text-neutral-950 font-bold">Consola Administrador Principal</h3>
            </div>

            <form onSubmit={handleIngresoAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Correo de Administrador</label>
                <input type="email" required value={correoAdminInput} onChange={(e) => setCorreoAdminInput(e.target.value)} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">Contraseña de Administrador</label>
                <input type="password" required value={claveAdminInput} onChange={(e) => setClaveAdminInput(e.target.value)} placeholder="••••••••••••" className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm" />
              </div>
              {errorLogin && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">{errorLogin}</div>}
              <button type="submit" className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold uppercase rounded-xl">Ingresar a Consola Admin</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
