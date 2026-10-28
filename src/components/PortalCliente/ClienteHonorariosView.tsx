import React from 'react';
import { 
  ExternalLink, DollarSign, FileText, Scale 
} from 'lucide-react';
import { ExpedienteInterno } from '../ModuloExpedientes';

interface ClienteHonorariosViewProps {
  expedienteActivo?: ExpedienteInterno;
  expedientes?: ExpedienteInterno[];
}

export const ClienteHonorariosView: React.FC<ClienteHonorariosViewProps> = ({
  expedienteActivo
}) => {
  // Valores de respaldo si no recibe expediente de las props
  const causa = expedienteActivo || {
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
  };

  // Datos para barras de progreso financiero
  const honorariosTotales = 3500;
  const honorariosPagados = 2400;
  const porcentajeHonorarios = Math.round((honorariosPagados / honorariosTotales) * 100);

  const gastosTotales = 450;
  const gastosCubiertos = 350;
  const porcentajeGastos = Math.round((gastosCubiertos / gastosTotales) * 100);

  return (
    <div className="space-y-6">
      
      {/* TARJETA 1: DETALLES DE LA CAUSA Y BOTÓN SATJE */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
              Proceso Judicial Seleccionado
            </span>
            <h2 className="text-xl font-serif font-bold text-neutral-950">
              {causa.tipoProceso}
            </h2>
            <span className="text-xs font-mono text-neutral-600 block mt-1">
              Causa Judicial No: <strong>{causa.numProceso}</strong>
            </span>
          </div>

          <a 
            href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-[#281F26] hover:bg-black text-white text-xs font-mono font-semibold rounded-xl flex items-center justify-center gap-2 self-start sm:self-auto transition-all shadow-2xs cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-neutral-300"/>
            <span>Consultar Causa en SATJE</span>
            <ExternalLink className="w-3 h-3 text-neutral-400"/>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-700">
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Etapa Procesal Actual:</span>
            <strong className="text-neutral-950 font-serif text-sm block">{causa.etapaProcesalActual}</strong>
          </div>

          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Próxima Fecha Clave:</span>
            <strong className="text-neutral-950 font-mono text-sm block">{causa.proximaFechaClave}</strong>
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
          {causa.actuaciones && causa.actuaciones.length > 0 ? (
            causa.actuaciones.map((act) => (
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
  );
};
