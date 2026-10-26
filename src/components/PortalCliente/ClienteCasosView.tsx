import React, { useState } from 'react';
import { Cliente, Expediente } from '../../types/legal';
import { 
  Scale, ExternalLink, Calendar, Clock, 
  MessageSquare, ChevronRight, FileCheck, Shield
} from 'lucide-react';

interface ClienteCasosViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  onIrAConsultas: () => void;
  onIrACitas: () => void;
}

// Tonos suaves diferenciados por cada trámite (Verde claro, Crema, Celeste, Lavanda)
const PALETA_TRAMITES = [
  {
    fondoCard: 'bg-[#F2F7F4] border-[#D1E3D8] hover:border-[#A3C8B2]',
    badgeMateria: 'bg-[#E1EFE7] text-[#1B4D33] border-[#C2DFCF]',
    barraProgreso: 'bg-[#2E6B4A]',
    indicadorActivo: 'bg-[#2E6B4A]',
    detalleFondo: 'bg-gradient-to-br from-[#F8FAF9] via-white to-white',
  },
  {
    fondoCard: 'bg-[#FAF6EE] border-[#EADFCB] hover:border-[#D9C4A1]',
    badgeMateria: 'bg-[#F3EBD8] text-[#5C4217] border-[#DFCBB0]',
    barraProgreso: 'bg-[#8C6424]',
    indicadorActivo: 'bg-[#8C6424]',
    detalleFondo: 'bg-gradient-to-br from-[#FCFBF8] via-white to-white',
  },
  {
    fondoCard: 'bg-[#F0F5FA] border-[#CFDFEE] hover:border-[#A6C3E0]',
    badgeMateria: 'bg-[#E1EDF7] text-[#19456B] border-[#BFDAF0]',
    barraProgreso: 'bg-[#255C8F]',
    indicadorActivo: 'bg-[#255C8F]',
    detalleFondo: 'bg-gradient-to-br from-[#F7FAFC] via-white to-white',
  },
  {
    fondoCard: 'bg-[#F5F2F9] border-[#DDD3EB] hover:border-[#BCABDA]',
    badgeMateria: 'bg-[#ECE4F5] text-[#422268] border-[#D2C0E8]',
    barraProgreso: 'bg-[#5B338E]',
    indicadorActivo: 'bg-[#5B338E]',
    detalleFondo: 'bg-gradient-to-br from-[#FAF8FC] via-white to-white',
  }
];

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  cliente,
  expedientes,
  onIrAConsultas,
  onIrACitas
}) => {
  const misCasos = expedientes.filter(
    (e) =>
      e.clienteId === cliente.id ||
      e.cliente.toLowerCase().includes(cliente.nombre.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(e.cliente.toLowerCase())
  );

  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string>(
    misCasos[0]?.id || ''
  );

  const casoActivo = misCasos.find((c) => c.id === casoSeleccionadoId) || misCasos[0];
  const indiceActivo = misCasos.findIndex((c) => c.id === casoActivo?.id);
  const colorEstiloActivo = PALETA_TRAMITES[indiceActivo % PALETA_TRAMITES.length] || PALETA_TRAMITES[0];

  const calcularProgresoEtapa = (etapa?: string) => {
    const et = (etapa || '').toLowerCase();
    if (et.includes('sentencia') || et.includes('ejecutoria') || et.includes('concluid')) {
      return { porcentaje: 100, label: 'Sentencia Definitiva', paso: 4 };
    }
    if (et.includes('audiencia') || et.includes('prueba') || et.includes('probatori') || et.includes('juicio')) {
      return { porcentaje: 65, label: 'Fase Probatoria / Audiencia', paso: 3 };
    }
    if (et.includes('califica') || et.includes('contestaci') || et.includes('tramite')) {
      return { porcentaje: 35, label: 'Calificación & Citación', paso: 2 };
    }
    return { porcentaje: 15, label: 'Presentación / Inicio', paso: 1 };
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* =========================================================
          CABECERA CLEAN & EDITORIAL (SIN RECUADRO NEGRO)
         ========================================================= */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 text-[10px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            <Shield className="w-3 h-3 text-neutral-800" />
            <span>Código Confidencial: {cliente.codigoAcceso || 'ACTIO-8492'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal tracking-tight">
            Bienvenido/a, <span className="font-semibold">{cliente.nombre}</span>
          </h1>

          <p className="text-xs sm:text-[13px] text-neutral-600 mt-2 leading-relaxed font-light">
            Este dashboard le permitirá enterarse de las causas judiciales, trámites administrativos o investigaciones patrocinados por ACTIO LEGIS. Cualquier información adicional, no dude en contactar a su abogado patrocinador.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onIrACitas}
            className="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-300" />
            <span>Agendar Cita</span>
          </button>
          
          <button
            onClick={onIrAConsultas}
            className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-neutral-600" />
            <span>Hacer una Pregunta</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          LISTA DE PROCESOS (COLORES SUAVES) + DETALLE
         ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: TRÁMITES CON SU PROPIO COLOR Y BARRA */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-semibold">
              Mis Juicios & Trámites ({misCasos.length})
            </h2>
            <span className="text-[11px] text-neutral-400">Seleccione un trámite</span>
          </div>

          {misCasos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
              <Scale className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">No hay procesos vinculados actualmente.</p>
            </div>
          ) : (
            misCasos.map((caso, index) => {
              const colorConfig = PALETA_TRAMITES[index % PALETA_TRAMITES.length];
              const estaSeleccionado = caso.id === casoActivo?.id;
              const { porcentaje, label } = calcularProgresoEtapa(caso.etapaProcesalActual || caso.estado);

              return (
                <div
                  key={caso.id}
                  onClick={() => setCasoSeleccionadoId(caso.id)}
                  className={`rounded-2xl p-5 border transition-all cursor-pointer relative ${ colorConfig.fondoCard }${
                    estaSeleccionado 
                      ? 'ring-2 ring-neutral-950 shadow-sm' 
                      : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-neutral-900">
                      {caso.numProceso || 'En trámite prejudicial'}
                    </span>
                    <span className={`text-[10px] uppercase font
