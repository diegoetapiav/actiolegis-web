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
    localStorage.setItem('actiolegis_cliente_activo', JSON.stringify(
