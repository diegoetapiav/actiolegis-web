import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Scale, 
  Calendar, 
  AlertCircle, 
  ChevronRight, 
  Briefcase,
  HelpCircle,
  Building,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import type { Cliente, ExpedienteJudicial, ActuacionJudicial } from '../../types/legal';

interface Props {
  cliente: Cliente;
  expedientes: ExpedienteJudicial[];
}

export const ClienteCasosView: React.FC<Props> = ({ cliente, expedientes = [] }) => {
  // Asegurar que expedientes sea un arreglo válido
  const listaSegura = Array.isArray(expedientes) && expedientes.length > 0 ? expedientes : [];
  
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState<string>(
    listaSegura[0]?.id || ''
  );
  const [filtroTexto, setFiltroTexto] = useState('');

  // Paleta de colores suaves diferenciados por trámite (del 1 al 4)
  const coloresTramites = [
    {
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      activeCard: 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500/20',
      barra: 'bg-emerald-600',
      tag: 'Trámite 1 • Verde Sabiduría'
    },
    {
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      activeCard: 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-500/20',
      barra: 'bg-amber-500',
      tag: 'Trámite 2 • Ámbar Cálido'
    },
    {
      badge: 'bg-sky-50 text-sky-800 border-sky-200',
      activeCard: 'border-sky-500 bg-sky-50/30 ring-1 ring-sky-500/20',
      barra: 'bg-sky-500',
      tag: 'Trámite 3 • Celeste Claridad'
    },
    {
      badge: 'bg-purple-50 text-purple-800 border-purple-200',
      activeCard: 'border-purple-500 bg-purple-50/30 ring-1 ring-purple-500/20',
      barra: 'bg-purple-500',
      tag: 'Trámite 4 • Lavanda Serena'
    }
  ];

  // Filtrado 100% blindado contra valores nulos o undefined
  const expedientesFiltrados = listaSegura.filter((item) => {
    if (!item) return false;
    const busqueda = String(filtroTexto || '').toLowerCase().trim();
    if (!busqueda) return true;

    const num = String(item.numeroCaso || '').toLowerCase();
    const tit = String(item.titulo || '').toLowerCase();
    const mat = String(item.materia || '').toLowerCase();
    return num.includes(busqueda) || tit.includes(busqueda) || mat.includes(busqueda);
  });

  const casoActivo = expedientesFiltrados.find(e => e?.id === casoSeleccionadoId) 
    || expedientesFiltrados[0] 
    || listaSegura[0];

  const indiceCasoActivo = listaSegura.findIndex(e => e?.id === casoActivo?.id);
  const colorEstilo = coloresTramites[indiceCasoActivo % coloresTramites.length] || coloresTramites[0];

  // Cálculo de etapas procesales individuales
  const etapas = [
    { key: 'demanda', label: 'Demanda' },
    { key: 'citacion', label: 'Citación' },
    { key: 'audiencia', label: 'Audiencia / Pruebas' },
    { key: 'sentencia', label: 'Sentencia' }
  ];

  const calcularIndiceEtapa = (etapa: string = '') => {
    const et = String(etapa).toLowerCase();
    if (et.includes('demanda')) return 0;
    if (et.includes('citacion')) return 1;
    if (et.includes('audiencia') || et.includes('prueba')) return 2;
    if (et.includes('sentencia') || et.includes('ejecucion')) return 3;
    return 1;
  };

  const etapaActualIndex = calcularIndiceEtapa(casoActivo?.etapaProcesal);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* =========================================================
          LEYENDA INSTITUCIONAL OFICIAL (SIN BANNER NEGRO)
         ========================================================= */}
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0 text-neutral-800">
            <Scale className="w-5 h-5 text-neutral-900" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-semibold text-neutral-950 font-serif">
              Portal Informativo de Causas & Procesos
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
              Este dashboard le permitirá enterarse de las causas judiciales, trámites administrativos o investigaciones patrocinados por <strong className="font-semibold text-neutral-900">ACTIO LEGIS</strong>. Cualquier información adicional, no dude en contactar a su abogado patrocinador.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTENIDO: LISTA LATERAL Y DETALLE DEL EXPEDIENTE
         ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LISTA LATERAL DE TRÁMITES (COLORES SUAVES DIFERENCIADOS) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Sus Procesos Activos ({expedientesFiltrados.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {expedientesFiltrados.map((item, index) => {
              const color = coloresTramites[index % coloresTramites.length];
              const estaSeleccionado = casoActivo?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setCasoSeleccionadoId(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                    estaSeleccionado 
                      ? color.activeCard 
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border font-mono ${color.badge}`}>
                      Trámite #{index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {item.numeroCaso}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-neutral-900 line-clamp-2 leading-snug mb-1">
                    {item.titulo}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span>{item.materia || 'Materia General'}</span>
                    <span className="font-medium text-neutral-700">
                      {item.porcentajeCompletado || 30}% avance
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETALLE DEL TRÁMITE SELECCIONADO */}
        {casoActivo ? (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Cabecera y Resumen del Expediente */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border font-mono ${colorEstilo.badge}`}>
                    Trámite #{indiceCasoActivo + 1} • {casoActivo.materia}
                  </span>
                  <h1 className="text-lg sm:text-xl font-serif font-bold text-neutral-950 mt-2">
                    {casoActivo.titulo}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400 block">Número de Causa</span>
                  <span className="text-xs font-mono font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200 mt-0.5 inline-block">
                    {casoActivo.numeroCaso}
                  </span>
                </div>
              </div>

              {/* BARRA DE PROGRESO INDIVIDUAL POR ETAPAS */}
              <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-xl border border-neutral-200/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-800">
                    Estado Procesal Individual
                  </span>
                  <span className="font-mono text-xs text-neutral-500">
                    Fase {etapaActualIndex + 1} de 4
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {etapas.map((et, idx) => {
                    const completada = idx <= etapaActualIndex;
                    return (
                      <div key={et.key} className="space-y-1.5">
                        <div className={`h-2 rounded-full ${
                          completada ? colorEstilo.barra : 'bg-neutral-200'
                        }`} />
                        <span className={`block text-[10px] text-center font-medium ${
                          completada ? 'text-neutral-900' : 'text-neutral-400'
                        }`}>
                          {et.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ficha Técnica del Proceso */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5">Unidad Judicial / Tribunal</span>
                  <span className="font-medium text-neutral-800 leading-snug">
                    {casoActivo.unidadJudicial || 'Sede Judicial Guayaquil'}
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5">Juez / Ponente</span>
                  <span className="font-medium text-neutral-800">
                    {casoActivo.juez || 'Por sorteo procesal'}
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block mb-0.5">Abogado Patrocinador</span>
                  <span className="font-medium text-neutral-800">
                    {casoActivo.abogadoPatrocinador || 'Diego Tapia, Ab.'}
                  </span>
                </div>
              </div>

            </div>

            {/* RESOLUCIONES Y PROCESO CON CÁPSULA: "¿QUÉ SIGNIFICA?" */}
            <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-semibold text-neutral-900 font-serif flex items-center gap-2">
                  <FileText className="w-4 h-4 text-neutral-700" />
                  Actuaciones y Providencias Judiciales
                </h3>
                <span className="text-xs text-neutral-400 font-mono">
                  Orden Cronológico
                </span>
              </div>

              <div className="space-y-4 pt-1">
                {Array.isArray(casoActivo.actuaciones) && casoActivo.actuaciones.length > 0 ? (
                  casoActivo.actuaciones.map((act) => (
                    <div 
                      key={act.id} 
                      className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-neutral-900">
                          {act.titulo}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {act.fecha}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {act.descripcion}
                      </p>

                      {/* CÁPSULA SENCILLA: "¿QUÉ SIGNIFICA?" */}
                      {act.interpretacionSencilla && (
                        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
                          <span className="font-bold flex-shrink-0">📌 ¿Qué significa?</span>
                          <span className="font-light">{act.interpretacionSencilla}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-neutral-400 text-xs">
                    No se registran nuevas actuaciones judiciales para este proceso en las últimas 48 horas.
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};

export default ClienteCasosView;
