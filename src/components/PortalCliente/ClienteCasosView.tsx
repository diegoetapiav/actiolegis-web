import React, { useState } from 'react';
import { 
  Cliente, Expediente, ActuacionExpediente 
} from '../../types/legal';
import { 
  Scale, ExternalLink, Calendar, UserCheck, Clock, 
  CheckCircle2, ArrowRight, ShieldCheck, MessageSquare, 
  HelpCircle, ChevronRight, FileCheck, Building2
} from 'lucide-react';

interface ClienteCasosViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  onIrAConsultas: () => void;
  onIrACitas: () => void;
}

// Paleta de colores suaves y diferenciadores para cada juicio/trámite
const PALETA_TRAMITES = [
  {
    fondoCard: 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400',
    badgeMateria: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    barraProgreso: 'bg-emerald-600',
    indicadorActivo: 'bg-emerald-500',
    detalleFondo: 'bg-gradient-to-br from-emerald-50/40 via-white to-white',
    nombreColor: 'Verde Sabiduría'
  },
  {
    fondoCard: 'bg-amber-50/80 border-amber-200 hover:border-amber-400',
    badgeMateria: 'bg-amber-100 text-amber-900 border-amber-300',
    barraProgreso: 'bg-amber-600',
    indicadorActivo: 'bg-amber-500',
    detalleFondo: 'bg-gradient-to-br from-amber-50/40 via-white to-white',
    nombreColor: 'Crema / Ámbar'
  },
  {
    fondoCard: 'bg-sky-50/70 border-sky-200 hover:border-sky-400',
    badgeMateria: 'bg-sky-100 text-sky-800 border-sky-300',
    barraProgreso: 'bg-sky-600',
    indicadorActivo: 'bg-sky-500',
    detalleFondo: 'bg-gradient-to-br from-sky-50/40 via-white to-white',
    nombreColor: 'Azul Celeste'
  },
  {
    fondoCard: 'bg-indigo-50/70 border-indigo-200 hover:border-indigo-400',
    badgeMateria: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    barraProgreso: 'bg-indigo-600',
    indicadorActivo: 'bg-indigo-500',
    detalleFondo: 'bg-gradient-to-br from-indigo-50/40 via-white to-white',
    nombreColor: 'Lavanda'
  }
];

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  cliente,
  expedientes,
  onIrAConsultas,
  onIrACitas
}) => {
  // Filtra las causas asignadas al cliente actual
  const misCasos = expedientes.filter(
    (e) =>
      e.clienteId === cliente.id ||
      e.cliente.toLowerCase().includes(cliente.nombre.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(e.cliente.toLowerCase())
  );

  // Caso seleccionado (por defecto el primero)
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string>(
    misCasos[0]?.id || ''
  );

  const casoActivo = misCasos.find((c) => c.id === casoSeleccionadoId) || misCasos[0];
  const indiceActivo = misCasos.findIndex((c) => c.id === casoActivo?.id);
  const colorEstiloActivo = PALETA_TRAMITES[indiceActivo % PALETA_TRAMITES.length] || PALETA_TRAMITES[0];

  // Cálculo individual de progreso según la etapa de cada trámite
  const calcularProgresoEtapa = (etapa?: string) => {
    const et = (etapa || '').toLowerCase();
    if (et.includes('sentencia') || et.includes('ejecutoria') || et.includes('concluid')) {
      return { porcentaje: 100, label: 'Sentencia Definitiva / Concluido', pasoActivo: 4 };
    }
    if (et.includes('audiencia') || et.includes('prueba') || et.includes('probatori') || et.includes('juicio')) {
      return { porcentaje: 65, label: 'Fase Probatoria & Audiencia', pasoActivo: 3 };
    }
    if (et.includes('califica') || et.includes('contestaci') || et.includes('tramite')) {
      return { porcentaje: 35, label: 'Calificación & Contestación', pasoActivo: 2 };
    }
    return { porcentaje: 15, label: 'Presentación de Demanda / Inicio', pasoActivo: 1 };
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* =========================================================
          1. BIENVENIDA CLEAN, LUMINOSA Y CÁLIDA
         ========================================================= */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
            <span>Portal Seguro • Código: {cliente.codigoAcceso || 'ACTIO-CLIENTE'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950">
            Bienvenido/a, {cliente.nombre}
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-xl">
            Siga en tiempo real el progreso de sus trámites legales y providencias emitidas por los juzgados de forma clara y sin tecnicismos complejos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onIrACitas}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-neutral-300" />
            <span>Agendar Cita con Abogado</span>
          </button>
          
          <button
            onClick={onIrAConsultas}
            className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-neutral-500" />
            <span>Hacer una Pregunta</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          2. GRILLA PRINCIPAL: SELECTOR DE TRÁMITES + DETALLE
         ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL IZQUIERDO: MIS JUICIOS Y TRÁMITES (CON COLORES DIFERENCIADOS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Mis Juicios & Trámites ({misCasos.length})
            </h2>
            <span className="text-[11px] text-neutral-400">Seleccione para ver avance</span>
          </div>

          {misCasos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
              <Scale className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">No hay procesos vinculados actualmente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {misCasos.map((caso, index) => {
                const colorConfig = PALETA_TRAMITES[index % PALETA_TRAMITES.length];
                const estaSeleccionado = caso.id === casoActivo?.id;
                const { porcentaje, label } = calcularProgresoEtapa(caso.etapaProcesalActual || caso.estado);

                return (
                  <div
                    key={caso.id}
                    onClick={() => setCasoSeleccionadoId(caso.id)}
                    className={`rounded-2xl p-5 border transition-all cursor-pointer relative ${
                      colorConfig.fondoCard
                    } ${
                      estaSeleccionado 
                        ? 'ring-2 ring-neutral-950 shadow-md scale-[1.01]' 
                        : 'opacity-90 hover:opacity-100 shadow-sm'
                    }`}
                  >
                    {/* Encabezado del Trámite */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        {caso.numProceso || 'En trámite prejudicial'}
                      </span>
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${colorConfig.badgeMateria}`}>
                        {caso.materia}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-neutral-950 text-sm leading-snug mb-2 line-clamp-2">
                      {caso.tipoProceso}
                    </h3>

                    {/* Barra de Progreso Propia de este trámite */}
                    <div className="mt-3 pt-3 border-t border-neutral-900/10 space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-neutral-600 font-medium">{label}</span>
                        <span className="font-mono font-bold text-neutral-900">{porcentaje}%</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-neutral-900/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${colorConfig.barraProgreso}`}
                          style={{ width: `${porcentaje}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {caso.proximaFechaClave ? caso.proximaFechaClave : 'Causa en seguimiento activo'}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${estaSeleccionado ? 'rotate-90 text-neutral-950' : 'text-neutral-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PANEL DERECHO: DETALLE INTEGRAL DEL PROCESO SELECCIONADO */}
        {casoActivo && (
          <div className={`lg:col-span-8 rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-8 ${colorEstiloActivo.detalleFondo}`}>
            
            {/* Header del Caso Seleccionado */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${colorEstiloActivo.indicadorActivo}`} />
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    Causa Judicial: {casoActivo.numProceso}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${colorEstiloActivo.badgeMateria}`}>
                    {casoActivo.materia}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-950">
                  {casoActivo.tipoProceso}
                </h2>
                <p className="text-xs text-neutral-600 mt-1">
                  Demandante: <strong className="text-neutral-900">{casoActivo.cliente}</strong> • Demandado/Contraparte: <strong className="text-neutral-900">{casoActivo.contraparte}</strong>
                </p>
              </div>

              {casoActivo.enlaceSatje && (
                <a
                  href={casoActivo.enlaceSatje}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-900 text-xs font-semibold text-neutral-900 transition-colors shadow-sm shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verificar en Portal SATJE</span>
                </a>
              )}
            </div>

            {/* BARRA DE ESTADO INDIVIDUAL: ETAPAS DEL PROCESO */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Estado Procesal en Tiempo Real
                  </div>
                  <div className="text-base font-serif font-bold text-neutral-900 mt-0.5">
                    {casoActivo.etapaProcesalActual || 'Fase de Sustanciación & Evacuación Probatoria'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {calcularProgresoEtapa(casoActivo.etapaProcesalActual).porcentaje}% Completado
                  </span>
                </div>
              </div>

              {/* Barra visual gráfica */}
              <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${colorEstiloActivo.barraProgreso}`}
                  style={{ width: `${calcularProgresoEtapa(casoActivo.etapaProcesalActual).porcentaje}%` }}
                />
              </div>

              {/* 4 Hitos procesales claros para el cliente */}
              <div className="grid grid-cols-4 gap-2 text-center pt-2">
                <div className="text-[11px]">
                  <div className="font-semibold text-neutral-900">1. Demanda</div>
                  <div className="text-[10px] text-neutral-400">Ingreso oficial</div>
                </div>
                <div className="text-[11px]">
                  <div className="font-semibold text-neutral-900">2. Citación</div>
                  <div className="text-[10px] text-neutral-400">Notificación partes</div>
                </div>
                <div className="text-[11px]">
                  <div className={`font-semibold ${colorEstiloActivo.badgeMateria.split(' ')[1]}`}>
                    3. Pruebas / Audiencia
                  </div>
                  <div className="text-[10px] text-neutral-400">Debate oral</div>
                </div>
                <div className="text-[11px]">
                  <div className="font-semibold text-neutral-900">4. Sentencia</div>
                  <div className="text-[10px] text-neutral-400">Resolución final</div>
                </div>
              </div>
            </div>

            {/* Ficha Informativa de Tribunales y Abogado a Cargo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/70 p-5 rounded-2xl border border-neutral-200/80">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Juzgado / Judicatura</div>
                <div className="text-xs font-medium text-neutral-900 mt-1 leading-snug">
                  {casoActivo.unidadJudicial || 'Unidad Judicial Civil de Guayaquil'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Contraparte Demandada</div>
                <div className="text-xs font-medium text-neutral-900 mt-1 leading-snug">
                  {casoActivo.contraparte}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Abogado Patrocinador</div>
                <div className="text-xs font-semibold text-neutral-900 mt-1 leading-snug">
                  {casoActivo.abogadoLider || 'Dr. Diego Tapia'} • ACTIO LEGIS[cite: 11]
                </div>
              </div>
            </div>

            {/* Próxima Fecha o Alerta Clave */}
            {casoActivo.proximaFechaClave && (
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    Próxima Actuación Clave: {casoActivo.proximaFechaClave}
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5">
                    {casoActivo.proximasAcciones || 'Revisión y contestación formal dentro del término de ley.'}
                  </p>
                </div>
              </div>
            )}

            {/* HISTORIAL EXPLICADO DE PROVIDENCIAS (LENGUAJE AMIGABLE PARA EL CLIENTE) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-neutral-900" />
                  <span>Historial de Providencias & Decisiones del Juez</span>
                </h3>
                <span className="text-[11px] text
