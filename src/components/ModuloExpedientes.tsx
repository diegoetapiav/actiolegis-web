import React, { useState, useEffect } from 'react';

const API_URL = "https://asistente-legal-backend-237k.onrender.com";
const ORG_ID = "b47a988d-7123-455b-bfbf-6677942e1234";

interface Expediente {
  id: string;
  num_proceso: string;
  materia?: string;
  tipo_proceso?: string;
  cliente: string;
  contraparte?: string;
  estado_actual?: string;
  proximas_acciones?: string;
  judicatura?: string;
  termino_dias?: number | null;
  fecha_limite?: string | null;
  en_termino_fatal?: boolean;
  honorarios_pactados?: number | string;
  honorarios_cobrados?: number | string;
  responsable?: {
    nombre_completo?: string;
  } | null;
  created_at?: string;
}

export const ModuloExpedientes: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState<Expediente | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('Todas las Materias');

  // Modal para Cargar Providencia con IA
  const [modalAbierto, setModalAbierto] = useState(false);
  const [textoProvidencia, setTextoProvidencia] = useState('');
  const [analizandoIA, setAnalizandoIA] = useState(false);
  const [enRevision, setEnRevision] = useState(false);

  // Formulario IA
  const [datosForm, setDatosForm] = useState({
    expedienteId: null as string | null,
    materia: 'CIVIL Y MERCANTIL',
    numProceso: '',
    cliente: '',
    contraparte: '',
    tipoProceso: '',
    estado: '',
    proximasAcciones: '',
    responsableId: ''
  });

  const cargarExpedientes = async () => {
    try {
      setCargando(true);
      const resp = await fetch(`${API_URL}/api/listar-expedientes?organizacion_id=${ORG_ID}`);
      const data = await resp.json();
      const lista = data.expedientes || (Array.isArray(data) ? data : []);
      setExpedientes(lista);
      if (lista.length > 0 && !expedienteSeleccionado) {
        setExpedienteSeleccionado(lista[0]);
      }
    } catch (e) {
      console.error("Error al cargar causas desde Supabase:", e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarExpedientes();
  }, []);

  const procesarConIA = async () => {
    if (!textoProvidencia.trim()) return alert("Por favor pega el texto de la providencia.");
    setAnalizandoIA
