import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Shield, 
  Briefcase, 
  Clock, 
  Award,
  LogIn,
  LogOut,
  User,
  ExternalLink,
  MessageSquare,
  FileText
} from 'lucide-react';
import { LoginModal } from './components/LoginModal';
import { ClienteCasosView } from './components/PortalCliente/ClienteCasosView';
import { ClienteConsultasView } from './components/PortalCliente/ClienteConsultasView';
import type { Cliente, ExpedienteJudicial } from './types/legal';

// Datos de respaldo seguros por defecto
const DEFAULT_CLIENTE: Cliente = {
  id: 'cli-01',
  nombre: 'Consorcio Nobis / Representación Corporativa',
  email: 'legal@nobis.com.ec',
  telefono: '+593 99 999 9999',
  identificacion: '0990000000001',
  tipo: 'empresa'
};

const DEFAULT_EXPEDIENTES: ExpedienteJudicial[] = [
  {
    id: 'exp-01',
    numeroCaso: '09332-2023-01824',
    titulo: 'Acción de Protección Constitucional - Vulneración al Debido Proceso',
    materia: 'Constitucional',
    unidadJudicial: 'Unidad Judicial Sur de Garantías Penales de Guayaquil',
    juez: 'Dra. María Elena Carrión',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2023-11-14',
    ultimaActualizacion: '2026-10-22',
    estado: 'en_tramite',
    etapaProcesal: 'audiencia',
    cuantia: 'Inestimable',
    porcentajeCompletado: 65,
    descripcion: 'Demanda de acción de protección en tutela de derechos constitucionales y seguridad jurídica patrimonial.',
    actuaciones: [
      {
        id: 'act-01',
        fecha: '2026-10-22',
        titulo: 'Convocatoria a Audiencia Evaluatoria y Preparatoria',
        descripcion: 'El juzgado convoca a las partes procesales a comparecer mediante plataforma telemática el 04 de noviembre.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'El juzgado fijó fecha oficial para la audiencia. Su equipo legal ya cuenta con la contestación y la prueba lista para sustentar sus derechos.'
      },
      {
        id: 'act-02',
        fecha: '2026-09-18',
        titulo: 'Admisión a Trámite y Citación a la Entidad Accionada',
        descripcion: 'Se califica la demanda por reunir los requisitos legales y se dispone la citación de rigor.',
        tipo: 'providencia',
        esHitoImportante: false,
        interpretacionSencilla: 'El juez verificó que la demanda está bien presentada y ordenó notificar legalmente a la contraparte para que conteste.'
      }
    ]
  },
  {
    id: 'exp-02',
    numeroCaso: '17203-2024-00412',
    titulo: 'Contencioso Administrativo - Impugnación de Acto Determinativo',
    materia: 'Contencioso Administrativo',
    unidadJudicial: 'Tribunal Distrital de lo Contencioso Administrativo con sede en Quito',
    juez: 'Dr. Gonzalo Zambrano P.',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2024-02-10',
    ultimaActualizacion: '2026-10-15',
    estado: 'en_tramite',
    etapaProcesal: 'pruebas',
    cuantia: '$ 184,500.00 USD',
    porcentajeCompletado: 45,
    descripcion: 'Demanda de plena jurisdicción impugnando resoluciones de glosa tributaria indebida.',
    actuaciones: [
      {
        id: 'act-03',
        fecha: '2026-10-15',
        titulo: 'Apertura del Término Probatorio de 30 Días',
        descripcion: 'Se confiere término común para que los peritos acreditados presenten sus dictámenes contables.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'Se abrió la fase de pruebas técnicas. Nuestro perito contable ya está elaborando el informe financiero a favor de su causa.'
      }
    ]
  },
  {
    id: 'exp-03',
    numeroCaso: '09281-2024-03190',
    titulo: 'Juicio Ordinario Mercantil - Incumplimiento de Contrato de Suministro',
    materia: 'Civil y Mercantil',
    unidadJudicial: 'Unidad Judicial Civil de Samborondón',
    juez: 'Abg. Roberto Morales F.',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2024-05-02',
    ultimaActualizacion: '2026-10-10',
    estado: 'en_tramite',
    etapaProcesal: 'citacion',
    cuantia: '$ 92,300.00 USD',
    porcentajeCompletado: 25,
    descripcion: 'Reclamo judicial de indemnización por daños y perjuicios derivados de incumplimiento contractual comercial.',
    actuaciones: [
      {
        id: 'act-04',
        fecha: '2026-10-10',
        titulo: 'Citación Efectiva a la Compañía Demandada',
        descripcion: 'La oficina de citaciones deja constancia de la citación en persona al representante legal de la demandada.',
        tipo: 'citacion',
        esHitoImportante: true,
        interpretacionSencilla: 'La contraparte fue formalmente notificada. Comienza a correr su plazo legal para defenderse o allanarse a la demanda.'
      }
    ]
  },
  {
    id: 'exp-04',
    numeroCaso: '09100-2023-08711',
    titulo: 'Arbitraje Comercial - Conflicto Societario y Rendición de Cuentas',
    materia: 'Arbitraje y Mediación',
    unidadJudicial: 'Centro de Arbitraje y Conciliación de la Cámara de Comercio',
    juez: 'Tribunal Arbitral Designado',
    cliente: 'Consorcio Nobis / Representación Corporativa',
    abogadoPatrocinador: 'Abg. Diego E. Tapia V.',
    fechaInicio: '2023-08-19',
    ultimaActualizacion: '2026-10-01',
    estado: 'en_tramite',
    etapaProcesal: 'demanda',
    cuantia: '$ 320,000.00 USD',
    porcentajeCompletado: 15,
    descripcion: 'Procedimiento arbitral para resolución vinculante de controversia de accionistas y liquidación de haberes.',
    actuaciones: [
      {
        id: 'act-05',
        fecha: '2026-10-01',
        titulo: 'Instalación Oficial del Tribunal Arbitral',
        descripcion: 'Posesión solemne de los árbitros dirimentes y fijación de calendario procesal de audiencias.',
        tipo: 'providencia',
        esHitoImportante: true,
        interpretacionSencilla: 'El tribunal arbitral quedó formalmente posesionado. Ya contamos con el cronograma definitivo de sesiones.'
      }
    ]
  }
];

export function App() {
  const [vistaActual, setVistaActual] = useState<'inicio' | 'cliente-casos' | 'cliente-consultas'>('inicio');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [clienteActivo, setClienteActivo] = useState<Cliente | null>(null);
  const [expedientes, setExpedientes] = useState<ExpedienteJudicial[]>(DEFAULT_EXPEDIENTES);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cargar sesión persistente o inicializar con seguridad
  useEffect(() => {
    try {
      const storedCliente = localStorage.getItem('actiolegis_cliente_activo');
      if (storedCliente) {
        setClienteActivo(JSON.parse(storedCliente));
      }
      const storedExpedientes = localStorage.getItem('actiolegis_expedientes');
      if (storedExpedientes) {
        const parsed = JSON.parse(storedExpedientes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExpedientes(parsed);
        }
      }
    } catch {
      // Si falla localStorage, usamos los valores por defecto sin romper la app
      setClienteActivo(DEFAULT_CLIENTE);
    }
  }, []);

  const handleLoginSuccess = (clienteData: Cliente) => {
    const seguro: Cliente = {
      id: clienteData?.id || DEFAULT_CLIENTE.id,
      nombre: clienteData?.nombre || DEFAULT_CLIENTE.nombre,
      email: clienteData?.email || DEFAULT_CLIENTE.email,
      telefono: clienteData?.telefono || DEFAULT_CLIENTE.telefono,
      identificacion: clienteData?.identificacion || DEFAULT_CLIENTE.identificacion,
      tipo: clienteData?.tipo || 'empresa'
    };
    setClienteActivo(seguro);
    localStorage.setItem('actiolegis_cliente_activo', JSON.stringify(seguro));
    setVistaActual('cliente-casos');
  };

  const handleCerrarSesion = () => {
    setClienteActivo(null);
    localStorage.removeItem('actiolegis_cliente_activo');
    setVistaActual('inicio');
  };

  // Filtrado 100% blindado contra nulos o undefined
  const expedientesFiltrados = expedientes.filter((exp) => {
    if (!clienteActivo) return true;
    const clienteNombreActual = String(clienteActivo?.nombre || '').toLowerCase().trim();
    const clienteExpediente = String(exp?.cliente || '').toLowerCase().trim();

    // Si ambos son cadenas válidas, evaluamos coincidencia; si no, mostramos los expedientes de cortesía
    if (!clienteNombreActual || !clienteExpediente) return true;
    return clienteExpediente.includes(clienteNombreActual) || clienteNombreActual.includes(clienteExpediente);
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navegación Superior */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            onClick={() => setVistaActual(clienteActivo ? 'cliente-casos' : 'inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-950 font-serif">ACTIO LEGIS</span>
              <span className="block text-[10px] tracking-widest text-neutral-400 font-sans uppercase">Estudio Jurídico</span>
            </div>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {clienteActivo ? (
              <>
                <button
                  onClick={() => setVistaActual('cliente-casos')}
                  className={`text-xs font-medium px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    vistaActual === 'cliente-casos' 
                      ? 'bg-neutral-900 text-white' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Mis Procesos
                </button>

                <button
                  onClick={() => setVistaActual('cliente-consultas')}
                  className={`text-xs font-medium px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    vistaActual === 'cliente-consultas' 
                      ? 'bg-neutral-900 text-white' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultas al Abogado
                </button>

                <div className="h-4 w-px bg-neutral-200" />

                <div className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-medium max-w-[140px] truncate">{clienteActivo.nombre}</span>
                </div>

                <button
                  onClick={handleCerrarSesion}
                  title="Cerrar Sesión"
                  className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <a href="#servicios" className="text-xs font-medium text-neutral-600 hover:text-neutral-950">Servicios</a>
                <a href="#despacho" className="text-xs font-medium text-neutral-600 hover:text-neutral-950">El Despacho</a>
                <a href="#contacto" className="text-xs font-medium text-neutral-600 hover:text-neutral-950">Contacto</a>

                <button
                  <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  Portal Clientes
                </button>
              </>
            )}
          </nav>

          {/* Menú Móvil Botón */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {clienteActivo ? (
          vistaActual === 'cliente-casos' ? (
            <ClienteCasosView 
              cliente={clienteActivo} 
              expedientes={expedientesFiltrados.length > 0 ? expedientesFiltrados : DEFAULT_EXPEDIENTES} 
            />
          ) : (
            <ClienteConsultasView 
              cliente={clienteActivo} 
              expedientes={expedientesFiltrados.length > 0 ? expedientesFiltrados : DEFAULT_EXPEDIENTES} 
            />
          )
        ) : (
          /* Página Web Pública */
          <div className="space-y-24 py-12">
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/60">
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                Defensa Jurídica de Alto Nivel
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-950 tracking-tight leading-tight">
                Patrocinio Estratégico y Rigor Constitucional
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                Brindamos asesoría y representación legal integral en materias civil, societaria, constitucional y administrativa, con total transparencia digital para nuestros clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-md flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  Acceso al Portal de Clientes
                </button>
                <a
                  href="#contacto"
                  className="px-6 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors"
                >
                  Solicitar Consulta Legal
                </a>
              </div>
            </section>

            <section id="servicios" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4">
                <Briefcase className="w-8 h-8 text-neutral-800" />
                <h3 className="text-lg font-serif font-bold text-neutral-950">Litigio Civil y Mercantil</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Resolución judicial de controversias patrimoniales, cobro de acreencias, arbitrajes y ejecución de contratos de alta complejidad.
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4">
                <Shield className="w-8 h-8 text-neutral-800" />
                <h3 className="text-lg font-serif font-bold text-neutral-950">Justicia Constitucional</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Acciones de protección, medidas cautelares y demandas extraordinarias en defensa de los derechos de personas y corporaciones.
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4">
                <Clock className="w-8 h-8 text-neutral-800" />
                <h3 className="text-lg font-serif font-bold text-neutral-950">Contencioso Administrativo</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Impugnación de actos administrativos, multas, determinaciones tributarias y controversias con instituciones del Estado.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white py-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ACTIO LEGIS - Estudio Jurídico. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Guayaquil, Ecuador</span>
            <span>•</span>
            <span>Confidencialidad Garantizada</span>
          </div>
        </div>
      </footer>

      {/* Modal de Inicio de Sesión */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
