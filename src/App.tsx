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
  FileText,
  CheckCircle2
} from 'lucide-react';
import { LoginModal } from './components/LoginModal';
import { ClienteCasosView } from './components/PortalCliente/ClienteCasosView';
import { ClienteConsultasView } from './components/PortalCliente/ClienteConsultasView';
import type { Cliente, ExpedienteJudicial } from './types/legal';

// Datos de respaldo seguros
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
    try {
      localStorage.setItem('actiolegis_cliente_activo', JSON.stringify(seguro));
    } catch {
      // Manejo seguro de memoria
    }
    setVistaActual('cliente-casos');
  };

  const handleCerrarSesion = () => {
    setClienteActivo(null);
    try {
      localStorage.removeItem('actiolegis_cliente_activo');
    } catch {
      // Manejo seguro de memoria
    }
    setVistaActual('inicio');
  };

  const expedientesFiltrados = expedientes.filter((exp) => {
    if (!clienteActivo) return true;
    const clienteNombreActual = String(clienteActivo?.nombre || '').toLowerCase().trim();
    const clienteExpediente = String(exp?.cliente || '').toLowerCase().trim();
    if (!clienteNombreActual || !clienteExpediente) return true;
    return clienteExpediente.includes(clienteNombreActual) || clienteNombreActual.includes(clienteExpediente);
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navegación Superior */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm">
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
          <nav className="hidden md:flex items-center gap-7">
            {clienteActivo ? (
              <>
                <button
                  onClick={() => setVistaActual('cliente-casos')}
                  className={`text-xs font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    vistaActual === 'cliente-casos' 
                      ? 'bg-neutral-900 text-white shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Mis Procesos
                </button>

                <button
                  onClick={() => setVistaActual('cliente-consultas')}
                  className={`text-xs font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    vistaActual === 'cliente-consultas' 
                      ? 'bg-neutral-900 text-white shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultas al Abogado
                </button>

                <div className="h-4 w-px bg-neutral-200" />

                <div className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-medium max-w-[150px] truncate">{clienteActivo.nombre}</span>
                </div>

                <button
                  onClick={handleCerrarSesion}
                  title="Cerrar Sesión"
                  className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <a href="#inicio" className="text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors">Inicio</a>
                <a href="#servicios" className="text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors">Áreas de Práctica</a>
                <a href="#despacho" className="text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors">El Despacho</a>
                <a href="#contacto" className="text-xs font-medium text-neutral-600 hover:text-neutral-950 transition-colors">Contacto</a>

                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-all shadow-sm hover:shadow"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  Portal Clientes
                </button>
              </>
            )}
          </nav>

          {/* Menú Móvil */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-5 space-y-3">
            {clienteActivo ? (
              <>
                <button
                  onClick={() => { setVistaActual('cliente-casos'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-xs font-medium py-2 text-neutral-800"
                >
                  Mis Procesos
                </button>
                <button
                  onClick={() => { setVistaActual('cliente-consultas'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-xs font-medium py-2 text-neutral-800"
                >
                  Consultas al Abogado
                </button>
                <button
                  onClick={() => { handleCerrarSesion(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-xs font-medium py-2 text-rose-600"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <a 
                  href="#servicios" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs font-medium py-2 text-neutral-700"
                >
                  Áreas de Práctica
                </a>
                <a 
                  href="#despacho" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs font-medium py-2 text-neutral-700"
                >
                  El Despacho
                </a>
                <a 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs font-medium py-2 text-neutral-700"
                >
                  Contacto
                </a>
                <button
                  onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-medium"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  Acceso a Portal Clientes
                </button>
              </>
            )}
          </div>
        )}
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
          /* Portal Web Público Completo Original */
          <div className="space-y-28 py-8" id="inicio">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-950 border border-amber-200/70">
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                Defensa Jurídica de Alto Nivel & Rigor Constitucional
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-950 tracking-tight leading-[1.15]">
                Patrocinio Estratégico y Rigor Constitucional
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
                Brindamos asesoría y representación legal integral en materias civil, societaria, constitucional y administrativa, con total transparencia digital para nuestros clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 transition-all shadow-md flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  Acceso al Portal de Clientes
                </button>
                <a
                  href="#contacto"
                  className="px-6 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  Solicitar Consulta Legal
                </a>
              </div>
            </section>

            {/* Estadísticas / Valores */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-neutral-200">
              <div className="text-center space-y-1">
                <p className="text-3xl font-serif font-bold text-neutral-950">+15</p>
                <p className="text-xs text-neutral-500 font-medium">Años de Trayectoria</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-3xl font-serif font-bold text-neutral-950">100%</p>
                <p className="text-xs text-neutral-500 font-medium">Transparencia Procesal</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-3xl font-serif font-bold text-neutral-950">24/7</p>
                <p className="text-xs text-neutral-500 font-medium">Portal Digital de Clientes</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-3xl font-serif font-bold text-neutral-950">+500</p>
                <p className="text-xs text-neutral-500 font-medium">Causas Patrocinadas</p>
              </div>
            </section>

            {/* Áreas de Práctica */}
            <section id="servicios" className="space-y-10">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950">Áreas de Especialización</h2>
                <p className="text-xs sm:text-sm text-neutral-500">Asesoría jurídica corporativa y litigio especializado en los fueros más exigentes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4 hover:border-neutral-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-950">Litigio Civil y Mercantil</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Resolución judicial de controversias patrimoniales, cobro de acreencias, arbitrajes y ejecución de contratos de alta complejidad.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1.5 pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Juicios Ordinarios y Sumarios</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cobro judicial de pagarés y títulos</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Arbitraje comercial nacional e internacional</li>
                  </ul>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4 hover:border-neutral-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-950">Justicia Constitucional</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Acciones de protección, medidas cautelares y demandas extraordinarias en defensa de los derechos de personas y corporaciones.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1.5 pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Acciones de Protección y Medidas Cautelares</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Acción Extraordinaria de Protección (CC)</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Hábeas Data y Acceso a la Información</li>
                  </ul>
                </div>

                <div className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm space-y-4 hover:border-neutral-300 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-neutral-950">Contencioso Administrativo</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Impugnación de actos administrativos, multas, determinaciones tributarias y controversias con instituciones del Estado.
                  </p>
                  <ul className="text-xs text-neutral-500 space-y-1.5 pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Juicios de Plena Jurisdicción y Subjetivos</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Impugnación de Glosas de Contraloría y SRI</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Controversias en Contratación Pública (SERCOP)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* El Despacho */}
            <section id="despacho" className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
              <div className="max-w-2xl space-y-6 relative z-10">
                <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">Nuestra Filosofía</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  Un despacho comprometido con la certeza jurídica y la claridad absoluta
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  En ACTIO LEGIS combinamos la tradición jurídica de alto nivel con herramientas tecnológicas de vanguardia. Creemos que cada cliente tiene el derecho fundamental de conocer el estado en tiempo real de sus juicios sin barreras ni tecnicismos oscuros.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs text-neutral-300">
                  <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-400" /> Rigor Procesal</span>
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-400" /> Secreto Profesional</span>
                  <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-amber-400" /> Eficacia Probatoria</span>
                </div>
              </div>
            </section>

            {/* Contacto */}
            <section id="contacto" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-neutral-950">Contáctenos</h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Agende una consulta preliminar con nuestro equipo legal especializado.
                  </p>
                </div>

                <div className="space-y-4 text-xs text-neutral-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                    <span>Edificio Corporativo Platinum, Piso 8, Samborondón / Guayaquil, Ecuador</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span>+593 4 283 0000 / +593 99 999 9999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span>contacto@actiolegis.com.ec</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
                <form onSubmit={(e) => { e.preventDefault(); alert('Gracias por su mensaje. Un abogado patrocinador se pondrá en contacto a la brevedad.'); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">Nombre Completo *</label>
                      <input required type="text" placeholder="Dr. / Ing. / Lic." className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">Correo Electrónico *</label>
                      <input required type="email" placeholder="correo@empresa.com" className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Asunto o Tipo de Controversia *</label>
                    <input required type="text" placeholder="Ej. Demanda civil o consulta constitucional" className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Descripción Breve *</label>
                    <textarea required rows={4} placeholder="Describa brevemente los antecedentes de su requerimiento..." className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                    Enviar Requerimiento al Despacho
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer Institucional */}
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
