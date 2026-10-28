import React from 'react';
import { ExternalLink, DollarSign, FileText, Scale } from 'lucide-react';
import { ExpedienteInterno } from '../ModuloExpedientes';

interface ClienteHonorariosViewProps {
  expedienteActivo?: ExpedienteInterno;
}

export const ClienteHonorariosView: React.FC<ClienteHonorariosViewProps> = ({
  expedienteActivo
}) => {
  const causa = expedienteActivo || {
    id: 'exp-1',
    numProceso: '17230-2024-00482',
    tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
    etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
    proximaFechaClave: '2026-10-28',
    actuaciones: [
      { id: 'act-1', fecha: '2026-10-18', titulo: 'Providencia Notificada', resumenParaCliente: 'Se señala fecha para inspección judicial.' }
    ]
  };

  const honorariosTotales = 3500;
  const honorariosPagados = 2400;
  const pctHonorarios = Math.round((honorariosPagados / honorariosTotales) * 100);

  const gastosTotales = 450;
  const gastosPagados = 350;
  const pctGastos = Math.round((gastosPagados / gastosTotales) * 100);

  return (
    <div className="space-y-6">
      {/* CAJA SUPERIOR CON DETALLE Y SATJE */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Proceso Seleccionado</span>
            <h2 className="text-xl font-serif font-bold text-neutral-950">{causa.tipoProceso}</h2>
            <span className="text-xs font-mono text-neutral-600 block mt-1">
              Juicio No: <strong>{causa.numProceso}</strong>
            </span>
          </div>

          <a 
            href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-[#281F26] text-white text-xs font-mono font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-neutral-300"/>
            <span>Consultar SATJE</span>
            <ExternalLink className="w-3 h-3 text-neutral-400"/>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Etapa Procesal:</span>
            <strong className="text-neutral-950 font-serif text-sm block">{causa.etapaProcesalActual}</strong>
          </div>
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block">Próxima Fecha Clave:</span>
            <strong className="text-neutral-950 font-mono text-sm block">{causa.proximaFechaClave}</strong>
          </div>
        </div>
      </div>

      {/* BARRAS DE PROGRESO */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2 border-b pb-2">
          <DollarSign className="w-4 h-4 text-neutral-900"/>
          <span>Estado Financiero & Reembolso de Gastos</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-700 font-bold">Honorarios Convenidos:</span>
              <span className="text-neutral-950 font-bold">${honorariosPagados} / ${honorariosTotales} USD ({pctHonorarios}%)</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
              <div className="h-full bg-neutral-950 rounded-full transition-all duration-500" style={{ width: `${pctHonorarios}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-700 font-bold">Gastos Operacionales & Peritajes:</span>
              <span className="text-emerald-900 font-bold">${gastosPagados} / ${gastosTotales} USD ({pctGastos}%)</span>
            </div>
            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
              <div className="h-full bg-emerald-700 rounded-full transition-all duration-500" style={{ width: `${pctGastos}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* LÍNEA DE TIEMPO */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-neutral-950 flex items-center gap-2 border-b pb-2">
          <FileText className="w-4 h-4 text-neutral-900"/>
          <span>Línea de Tiempo Procesal</span>
        </h3>

        <div className="space-y-2">
          {causa.actuaciones && causa.actuaciones.length > 0 ? (
            causa.actuaciones.map((act) => (
              <div key={act.id} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200 text-xs space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                  <strong className="text-neutral-950 font-serif text-sm">{act.titulo}</strong>
                  <span>{act.fecha}</span>
                </div>
                <p className="text-neutral-700 leading-relaxed font-sans">{act.resumenParaCliente}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center font-mono text-xs text-neutral-400 bg-[#FAF9F6] rounded-xl border border-neutral-200">
              No existen actuaciones registradas para este expediente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
