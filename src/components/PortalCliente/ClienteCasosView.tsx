import React, { useState } from 'react';
import { 
  Building2, ExternalLink, ShieldCheck, DollarSign, FileText, 
  ChevronRight, Scale
} from 'lucide-react';
import { ExpedienteInterno } from '../ModuloExpedientes';

interface ClienteCasosViewProps {
  expedientes?: ExpedienteInterno[];
  codigoClienteSesion?: string;
}

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  expedientes = [],
  codigoClienteSesion = 'ACTIO-00001'
}) => {
  // Lista base de respaldo en caso de que no lleguen expedientes dinámicos
  const expedientesBase: ExpedienteInterno[] = [
    {
      id: 'exp-1',
      numProceso: '17230-2024-00482',
      materia: 'Civil',
      tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      contraparte: 'Municipio de Guayaquil',
      unidadJudicial: 'Unidad Judicial Civil con sede en Guayaquil',
      abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs.',
      etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
      porcentaje: 65,
      proximaFechaClave: '2026-10-28',
      proximasAcciones: 'Presentación de alegatos finales y prueba pericial.',
      honorariosFijados: '$3,500.00',
      gastosRegistrados: '$450.00',
      actuaciones: [
        {
          id: 'act-1',
          fecha: '2026-10-18',
          titulo: 'Providencia Notificada',
          resumenParaCliente: 'Se señala fecha para la práctica de la diligencia de inspección judicial en el sitio.'
        },
        {
          id: 'act-2',
          fecha: '2026-10-05',
          titulo: 'Informe Pericial Incorporado',
          resumenParaCliente: 'El perito acreditado por el Consejo de la Judicatura rinde su informe técnico favorable.'
        }
      ]
    },
    {
      id: 'exp-2',
      numProceso: '09281-2025-01129',
      materia: 'Penal',
      tipoProceso: 'Investigación Previa por Presunto Delito Económico',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      contraparte: 'Fiscalía General del Estado',
      unidadJudicial: 'Unidad Judicial Penal con sede en Guayaquil',
      abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs.',
      etapaProcesalActual: 'Diligencias de Investigación Previa',
      porcentaje: 40,
      proximaFechaClave: '2026-11-05',
      proximasAcciones: 'Rendición de versión libre y voluntaria.',
      honorariosFijados: '$2,800.00',
      gastosRegistrados: '$200.00',
      actuaciones: [
        {
          id: 'act-3',
          fecha: '2026-10-12',
          titulo: 'Señalamiento de Versión',
          resumenParaCliente: 'Fiscalía notifica fecha para la recepción de la versión de la parte interesada.'
        }
      ]
    }
  ];

  const listaAMostrar = expedientes.length > 0 ? expedientes : expedientesBase;
  const [causaSeleccionadaId, setCausaSeleccionadaId] = useState(listaAMostrar[0]?.id || 'exp-1');
  const causaActiva = listaAMostrar.find((c) => c.id === causaSeleccionadaId) || listaAMostrar[0];

  // Datos de valores convenidos y reembolsos
  const honorariosTotales = 3500;
  const honorariosPagados = 2400;
  const porcentajeHonorarios = Math.round((honorariosPagados / honorariosTotales) * 100);

  const gastosTotales = 450;
  const gastosCubiertos = 350;
  const porcentajeGastos = Math.round((gastosCubiertos / gastosTotales) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* CABECERA BIENVENIDA CLIENTE */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700"/>
            <span>Portal del Cliente • Código Confidencial: {codigoClienteSesion}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">
            Bienvenido/a, <span className="underline decoration-neutral-300">{causaActiva?.cliente || 'Inmobiliaria del Valle S.A.S.'}</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Plataforma confidencial de seguimiento en vivo de causas judiciales y estado de cuenta patrocinado por ACTIO LEGIS.
          </p>
        </div>

        {/* ENLACE DIRECTO AL SATJE OFICIAL */}
        <a 
          href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#281F26] hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-mono shadow-xs"
        >
          <Scale className="w-4 h-4 text-neutral-300"/>
          <span>Consultar Causa en SATJE</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400"/>
        </a>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: LISTADO DE CAUSAS DEL CLIENTE */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Causas Patrocinadas ({listaAMostrar.length})
            </span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              En Trámite
            </span>
          </div>

          <div className="space-y-2">
            {listaAMostrar.map((c) => {
              const esSeleccionado = c.id === causaActiva?.id;
              return (
                <div 
                  key={c.id} 
                  onClick={() => setCausaSeleccionadaId(c.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    esSeleccionado 
                      ? 'border-neutral-950 bg-[#FAF9F6] shadow-2xs font-semibold' 
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 mb-1">
                    <span>Juicio No: {c.numProceso}</span>
                    <ChevronRight className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${esSeleccionado ? 'rotate-90 text-neutral-950' : ''}`} />
                  </div>
                  <div className="font-serif font-bold text-neutral-950 text-xs leading-snug line-clamp-2">
                    {c.tipoProceso}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN DETALLADA, BARRAS FINANCIERAS Y ACTUACIONES */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TARJETA 1: DETALLES DE LA CAUSA SELECCIONADA Y SATJE */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Proceso Judicial Seleccionado
                </span>
                <h2 className="text-xl font-serif font-bold text-neutral-950">
                  {causaActiva?.tipoProceso}
                </h2>
                <span className="text-xs font-mono text-neutral-600 block mt-1">
                  Causa Judicial No: <strong>{causaActiva?.numProceso}</strong>
                </span>
              </div>

              <a 
                href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-all cursor-pointer"
              >
                <span>Ver Movimientos SATJE</span>
                <ExternalLink className="w-3 h-3 text-neutral-500"/>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-700">
              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Etapa Procesal Actual:</span>
                <strong className="text-neutral-950 font-serif text-sm block">{causaActiva?.etapaProcesalActual}</strong>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Próxima Fecha Clave:</span>
                <strong className="text-neutral-950 font-mono text-sm block">{causaActiva?.proximaFechaClave}</strong>
              </div>
            </div>
          </div>

          {/* TARJETA 2: BARRAS DE PROGRESO DE HONORARIOS Y GASTOS */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-5">
            <div className="border-b border-neutral-200 pb-2">
              <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-neutral-900"/>
                <span>Estado Financiero & Reembolso de Gastos</span>
              </h3>
              <p className="text-xs text-neutral-500 font-light mt-0.5">
                Transparencia de valores convenidos, cancelados y gastos operacionales abonados.
              </p>
            </div>

            <div className="space-y-4">
              {/* BARRA 1: HONORARIOS PROFESIONALES */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-700 font-bold">Honorarios Profesionales Convenidos:</span>
                  <span className="text-neutral-950 font-bold">${honorariosPagados} / ${honorariosTotales} USD ({porcentajeHonorarios}%)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                  <div 
                    className="h-full bg-neutral-950 rounded-full transition-all duration-700" 
                    style={{ width: `${porcentajeHonorarios}%` }}
                  />
                </div>
              </div>

              {/* BARRA 2: GASTOS JUDICIALES Y OPERACIONALES */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-700 font-bold">Gastos Operacionales & Peritajes:</span>
                  <span className="text-emerald-900 font-bold">${gastosCubiertos} / ${gastosTotales} USD ({porcentajeGastos}%)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                  <div 
                    className="h-full bg-emerald-700 rounded-full transition-all duration-700" 
                    style={{ width: `${porcentajeGastos}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TARJETA 3: LÍNEA DE TIEMPO PROCESAL */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-neutral-200 pb-2 flex justify-between items-center">
              <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-900"/>
                <span>Línea de Tiempo Procesal</span>
              </h3>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Resumen Ejecutivo</span>
            </div>

            <div className="space-y-3">
              {causaActiva?.actuaciones && causaActiva.actuaciones.length > 0 ? (
                causaActiva.actuaciones.map((act) => (
                  <div key={act.id} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200 space-y-1 text-xs">
                    <div className="flex justify-between items-center font-mono text-[11px] text-neutral-500">
                      <strong className="text-neutral-950 font-serif text-sm">{act.titulo}</strong>
                      <span>{act.fecha}</span>
                    </div>
                    <p className="text-neutral-700 leading-relaxed font-sans mt-1">
                      {act.resumenParaCliente}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center font-mono text-xs text-neutral-400 bg-[#FAF9F6] rounded-xl border border-neutral-200">
                  No existen actuaciones procesales registradas recientemente para este expediente.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
