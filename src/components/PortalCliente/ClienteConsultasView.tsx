import React, { useState } from 'react';
import { Cliente, Expediente } from '../../types/legal';
import { 
  Scale, ExternalLink, Calendar, Clock, 
  MessageSquare, ChevronRight, FileText, Shield
} from 'lucide-react';

interface ClienteCasosViewProps {
  cliente?: Cliente | null;
  expedientes?: Expediente[];
  onIrAConsultas: () => void;
  onIrACitas: () => void;
}

const PALETA_TRAMITES = [
  {
    fondoCard: 'bg-[#F2F7F4] border-[#D1E3D8]',
    badgeMateria: 'bg-[#E1EFE7] text-[#1B4D33] border-[#C2DFCF]',
    barraProgreso: 'bg-[#2E6B4A]',
    indicadorActivo: 'bg-[#2E6B4A]',
    detalleFondo: 'bg-[#FAFBF9]',
  },
  {
    fondoCard: 'bg-[#FAF6EE] border-[#EADFCB]',
    badgeMateria: 'bg-[#F3EBD8] text-[#5C4217] border-[#DFCBB0]',
    barraProgreso: 'bg-[#8C6424]',
    indicadorActivo: 'bg-[#8C6424]',
    detalleFondo: 'bg-[#FCFBF8]',
  },
  {
    fondoCard: 'bg-[#F0F5FA] border-[#CFDFEE]',
    badgeMateria: 'bg-[#E1EDF7] text-[#19456B] border-[#BFDAF0]',
    barraProgreso: 'bg-[#255C8F]',
    indicadorActivo: 'bg-[#255C8F]',
    detalleFondo: 'bg-[#F7FAFC]',
  },
  {
    fondoCard: 'bg-[#F5F2F9] border-[#DDD3EB]',
    badgeMateria: 'bg-[#ECE4F5] text-[#422268] border-[#D2C0E8]',
    barraProgreso: 'bg-[#5B338E]',
    indicadorActivo: 'bg-[#5B338E]',
    detalleFondo: 'bg-[#FAF8FC]',
  }
];

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  cliente,
  expedientes = [],
  onIrAConsultas,
  onIrACitas
}) => {
  const clienteNombre = String(cliente?.nombre || 'Inmobiliaria del Valle S.A.S.').trim();
  const clienteNombreLower = clienteNombre.toLowerCase();
  const clienteId = cliente?.id || '';

  // Filtro tolerante a valores nulos o incompletos
  const misCasos = (expedientes || []).filter((e) => {
    if (!e) return false;
    if (clienteId && e.clienteId === clienteId) return true;
    const expCliente = String(e.cliente || '').toLowerCase();
    if (!expCliente) return true;
    return expCliente.includes(clienteNombreLower) || clienteNombreLower.includes(expCliente);
  });

  const casosParaMostrar: Expediente[] = misCasos.length > 0 ? misCasos : (expedientes.length > 0 ? expedientes : [
    {
      id: 'exp-demo-1',
      clienteId: clienteId || 'cli-1',
      numProceso: '17230-2024-00482',
      materia: 'Civil',
      tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
      cliente: clienteNombre,
      contraparte: 'Herederos de Juan Carlos Peñaherrera y Otros',
      unidadJudicial: 'Unidad Judicial Civil de Guayaquil',
      abogadoLider: 'Dr. Diego Tapia',
      estado: 'En Trámite',
      etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
      proximaFechaClave: '2026-10-18',
      proximasAcciones: 'Entrega de informe pericial planimétrico y observaciones de la actora.',
      actuaciones: [
        {
          id: 'act-1',
          fecha: '2026-10-08 11:20',
          tipo: 'Providencia Judicial',
          titulo: 'Concesión de término fatal para informe pericial',
          resumen: 'El Juez ordenó la planimetría.',
          resumenParaCliente: 'El Juez ordenó al perito técnico que entregue el informe de medición del terreno en un plazo de 10 días para continuar.',
          foja: '142',
          abogado: 'Dr. Diego Tapia'
        }
      ]
    }
  ]);

  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string>(
    casosParaMostrar[0]?.id || ''
  );

  const casoActivo = casosParaMostrar.find((c) => c.id === casoSeleccionadoId) || casosParaMostrar[0];
  const indiceActivo = casosParaMostrar.findIndex((c) => c.id === casoActivo?.id);
  const colorEstiloActivo = PALETA_TRAMITES[Math.max(0, indiceActivo) % PALETA_TRAMITES.length];

  const calcularProgresoEtapa = (etapa?: string) => {
    const et = String(etapa || '').toLowerCase();
    if (et.includes('sentencia') || et.includes('ejecutoria') || et.includes('concluid')) {
      return { porcentaje: 100, label: 'Sentencia Definitiva' };
    }
    if (et.includes('audiencia') || et.includes('prueba') || et.includes('probatori') || et.includes('juicio')) {
      return { porcentaje: 65, label: 'Fase Probatoria / Audiencia' };
    }
    if (et.includes('califica') || et.includes('contestaci') || et.includes('tramite')) {
      return { porcentaje: 35, label: 'Calificación & Citación' };
    }
    return { porcentaje: 15, label: 'Presentación / Inicio' };
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* CABECERA MINIMALISTA (SIN BLOQUE NEGRO) */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            <Shield className="w-3.5 h-3.5 text-neutral-800" />
            <span>Código Confidencial: {cliente?.codigoAcceso || 'ACTIO-8492'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal">
            Bienvenido/a, <span className="font-semibold">{clienteNombre}</span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            Este dashboard le permitirá enterarse de las causas judiciales, trámites administrativos o investigaciones patrocinados por ACTIO LEGIS. Cualquier información adicional, no dude en contactar a su abogado patrocinador.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onIrACitas}
            className="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-neutral-300" />
            <span>Agendar Cita</span>
          </button>
          
          <button
            type="button"
            onClick={onIrAConsultas}
            className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-neutral-600" />
            <span>Hacer una Pregunta</span>
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: TRÁMITES Y DETALLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LISTADO DE TRÁMITES */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-
