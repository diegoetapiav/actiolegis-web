import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, Scale, ExternalLink } from 'lucide-react';
import { ExpedienteInterno } from '../ModuloExpedientes';
import { ClienteHonorariosView } from './ClienteHonorariosView';

interface ClienteCasosViewProps {
  expedientes?: ExpedienteInterno[];
  codigoClienteSesion?: string;
}

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  expedientes = [],
  codigoClienteSesion = 'ACTIO-00001'
}) => {
  const expedientesBase: ExpedienteInterno[] = [
    {
      id: 'exp-1',
      numProceso: '17230-2024-00482',
      materia: 'Civil',
      tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      contraparte: 'Municipio de Guayaquil',
      unidadJudicial: 'Unidad Judicial Civil de Guayaquil',
      abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs.',
      etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
      porcentaje: 65,
      proximaFechaClave: '2026-10-28',
      proximasAcciones: 'Presentación de alegatos finales.',
      honorariosFijados: '$3,500.00',
      gastosRegistrados: '$450.00',
      actuaciones: [
        { id: 'act-1', fecha: '2026-10-18', titulo: 'Providencia Notificada', resumenParaCliente: 'Se señala fecha para la práctica de la inspección judicial.' }
      ]
    },
    {
      id: 'exp-2',
      numProceso: '09281-2025-01129',
      materia: 'Penal',
      tipoProceso: 'Investigación Previa por Presunto Delito Económico',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      contraparte: 'Fiscalía General del Estado',
      unidadJudicial: 'Unidad Judicial Penal de Guayaquil',
      abogadoLider: 'Abg. Diego Tapia Vicuña, Mgs.',
      etapaProcesalActual: 'Diligencias de Investigación Previa',
      porcentaje: 40,
      proximaFechaClave: '2026-11-05',
      proximasAcciones: 'Rendición de versión libre y voluntaria.',
      honorariosFijados: '$2,800.00',
      gastosRegistrados: '$200.00',
      actuaciones: []
    }
  ];

  const lista = expedientes.length > 0 ? expedientes : expedientesBase;
  const [causaId, setCausaId] = useState(lista[0]?.id || 'exp-1');
  const causaActiva = lista.find((c) => c.id === causaId) || lista[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* BIENVENIDA */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700"/>
            <span>Código Confidencial: {codigoClienteSesion}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">
            Bienvenido/a, <span className="underline decoration-neutral-300">{causaActiva?.cliente}</span>
          </h1>
        </div>

        <a 
          href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#281F26] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 font-mono"
        >
          <Scale className="w-4 h-4 text-neutral-300"/>
          <span>Consultar Causa en SATJE</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400"/>
        </a>
      </div>

      {/* GRILLA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LISTADO DE CASOS (IZQUIERDA) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-5 space-y-3">
          <span className="text-xs font-mono uppercase text-neutral-500 font-bold block border-b pb-2">
            Causas Patrocinadas ({lista.length})
          </span>
          <div className="space-y-2">
            {lista.map((c) => {
              const esActivo = c.id === causaActiva.id;
              return (
                <div 
                  key={c.id} 
                  onClick={() => setCausaId(c.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer ${
                    esActivo ? 'border-neutral-950 bg-[#FAF9F6] font-semibold' : 'border-neutral-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between font-mono text-[11px] text-neutral-500 mb-1">
                    <span>{c.numProceso}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${esActivo ? 'rotate-90 text-neutral-950' : ''}`} />
                  </div>
                  <div className="font-serif font-bold text-neutral-950 text-xs line-clamp-2">
                    {c.tipoProceso}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETALLE Y BARRAS FINANCIERAS (DERECHA) */}
        <div className="lg:col-span-8">
          <ClienteHonorariosView expedienteActivo={causaActiva} />
        </div>
      </div>

    </div>
  );
};
