import React, { useState } from 'react';
import { Cliente, Expediente } from '../../types/legal';
import { 
  Scale, ExternalLink, Calendar, Clock, 
  MessageSquare, ChevronRight, FileText, Shield
} from 'lucide-react';

interface ClienteCasosViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
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
  const colorEstiloActivo = PALETA_TRAMITES[Math.max(0, indiceActivo) % PALETA_TRAMITES.length];

  const calcularProgresoEtapa = (etapa?: string) => {
    const et = (etapa || '').toLowerCase();
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
            <span>Código Confidencial: {cliente.codigoAcceso || 'ACTIO-8492'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-neutral-950 font-normal">
            Bienvenido/a, <span className="font-semibold">{cliente.nombre}</span>
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
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Mis Juicios & Trámites ({misCasos.length})
            </h2>
            <span className="text-[11px] text-neutral-400">Seleccione para ver detalle</span>
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
                  className={`rounded-2xl p-5 border transition-all cursor-pointer relative ${colorConfig.fondoCard} ${estaSeleccionado ? 'ring-2 ring-neutral-950 shadow-sm' : 'opacity-90 hover:opacity-100'}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-neutral-900">
                      {caso.numProceso || 'En trámite prejudicial'}
                    </span>
                    <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${colorConfig.badgeMateria}`}>
                      {caso.materia}
                    </span>
                  </div>

                  <h3 className="font-serif font-semibold text-neutral-950 text-sm leading-snug mb-3 line-clamp-2">
                    {caso.tipoProceso}
                  </h3>

                  {/* BARRA DE PROGRESO INDIVIDUAL POR CADA CASO */}
                  <div className="pt-2.5 border-t border-neutral-900/10 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-neutral-700 font-medium">{label}</span>
                      <span className="font-mono font-bold text-neutral-900">{porcentaje}%</span>
                    </div>
                    
                    <div className="w-full h-1.5 bg-neutral-900/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${colorConfig.barraProgreso}`}
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {caso.proximaFechaClave ? caso.proximaFechaClave : 'Causa en término judicial'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${estaSeleccionado ? 'rotate-90 text-neutral-950' : 'text-neutral-400'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* DETALLE DEL TRÁMITE SELECCIONADO */}
        {casoActivo && (
          <div className={`lg:col-span-8 rounded-3xl border border-neutral-200 shadow-sm p-6 sm:p-8 space-y-6 ${colorEstiloActivo.detalleFondo}`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${colorEstiloActivo.indicadorActivo}`} />
                  <span className="text-xs font-mono font-bold text-neutral-600">
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
                  Demandante: <strong className="text-neutral-900 font-medium">{casoActivo.cliente}</strong> • Demandado/Contraparte: <strong className="text-neutral-900 font-medium">{casoActivo.contraparte}</strong>
                </p>
              </div>

              {casoActivo.enlaceSatje && (
                <a
                  href={casoActivo.enlaceSatje}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:border-neutral-900 text-xs font-medium text-neutral-900 transition-colors shadow-sm shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verificar en SATJE</span>
                </a>
              )}
            </div>

            {/* BARRA GRÁFICA DE ETAPAS */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Etapa Procesal Actual
                  </div>
                  <div className="text-sm sm:text-base font-serif font-semibold text-neutral-900 mt-0.5">
                    {casoActivo.etapaProcesalActual || 'Fase Probatoria / Audiencia de Juicio'}
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-neutral-900">
                  {calcularProgresoEtapa(casoActivo.etapaProcesalActual).porcentaje}% Completado
                </span>
              </div>

              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${colorEstiloActivo.barraProgreso}`}
                  style={{ width: `${calcularProgresoEtapa(casoActivo.etapaProcesalActual).porcentaje}%` }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2 text-center pt-1 text-[11px]">
                <div className="font-medium text-neutral-900">1. Demanda</div>
                <div className="font-medium text-neutral-900">2. Citación</div>
                <div className="font-bold text-neutral-950">3. Pruebas</div>
                <div className="text-neutral-400">4. Sentencia</div>
              </div>
            </div>

            {/* DATOS DEL TRIBUNAL Y PATROCINIO */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/80 p-4 rounded-2xl border border-neutral-200 text-xs">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Juzgado / Unidad</div>
                <div className="font-medium text-neutral-900 mt-0.5">{casoActivo.unidadJudicial || 'Unidad Judicial Civil con sede en Guayaquil'}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Contraparte</div>
                <div className="font-medium text-neutral-900 mt-0.5">{casoActivo.contraparte}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Abogado Patrocinador</div>
                <div className="font-semibold text-neutral-900 mt-0.5">{casoActivo.abogadoLider || 'Dr. Diego Tapia'} • ACTIO LEGIS[cite: 11]</div>
              </div>
            </div>

            {/* PRÓXIMA FECHA CLAVE */}
            {casoActivo.proximaFechaClave && (
              <div className="bg-[#FAF6EE] border border-[#EADFCB] rounded-2xl p-4 flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#8C6424] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#5C4217]">Próxima Fecha Clave: {casoActivo.proximaFechaClave}</span>
                  <p className="text-[#6D5325] mt-0.5">{casoActivo.proximasAcciones || 'Actuación y diligencia programada en el juzgado.'}</p>
                </div>
              </div>
            )}

            {/* HISTORIAL EXPLICADO DE PROVIDENCIAS */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-neutral-900" />
                <span>Historial de Providencias & Resoluciones</span>
              </h3>

              {casoActivo.actuaciones && casoActivo.actuaciones.length > 0 ? (
                casoActivo.actuaciones.map((act) => (
                  <div key={act.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-neutral-900 font-serif text-sm">{act.titulo}</span>
                      <span className="text-neutral-400 font-mono text-[11px]">{act.fecha}</span>
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-700 leading-relaxed flex items-start gap-2">
                      <span className="text-neutral-900 font-bold shrink-0">📌 ¿Qué significa?:</span>
                      <span>{act.resumenParaCliente || act.resumen}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-center text-xs text-neutral-500">
                  Causa radicada en el juzgado. Las providencias que dicte el juez aparecerán automáticamente aquí explicadas.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
