import React, { useState } from 'react';
import { 
  Building2, ExternalLink, ShieldCheck, DollarSign, FileText, 
  ChevronRight, Scale 
} from 'lucide-react';

export const ClienteCasosView: React.FC<any> = ({
  expedientes = [],
  codigoClienteSesion = 'ACTIO-00001'
}) => {
  // Datos reales integrados en el componente
  const expedientesLista = [
    {
      id: 'exp-1',
      numProceso: '17230-2024-00482',
      tipoProceso: 'Prescripción Extraordinaria Adquisitiva de Dominio de Lote Urbano',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      etapaProcesalActual: 'Fase Probatoria / Audiencia de Juicio',
      proximaFechaClave: '2026-10-28',
      honorariosConvenidos: 3500,
      honorariosPagados: 2400,
      gastosTotales: 450,
      gastosPagados: 350,
      actuaciones: [
        {
          id: 'act-1',
          fecha: '2026-10-18',
          titulo: 'Providencia Judicial Notificada',
          resumenParaCliente: 'Se señala fecha y hora para la práctica de la inspección judicial en el sitio.'
        },
        {
          id: 'act-2',
          fecha: '2026-10-05',
          titulo: 'Informe Pericial Incorporado',
          resumenParaCliente: 'El perito acreditado rinde su informe técnico favorable sobre el predio.'
        }
      ]
    },
    {
      id: 'exp-2',
      numProceso: '09281-2025-01129',
      tipoProceso: 'Investigación Previa por Presunto Delito Económico',
      cliente: 'Inmobiliaria del Valle S.A.S.',
      etapaProcesalActual: 'Diligencias de Investigación Previa',
      proximaFechaClave: '2026-11-05',
      honorariosConvenidos: 2800,
      honorariosPagados: 1500,
      gastosTotales: 200,
      gastosPagados: 100,
      actuaciones: [
        {
          id: 'act-3',
          fecha: '2026-10-12',
          titulo: 'Señalamiento de Versión',
          resumenParaCliente: 'Fiscalía notifica fecha para recepción de versión libre y voluntaria.'
        }
      ]
    }
  ];

  const listadoFinal = expedientes.length > 0 ? expedientes : expedientesLista;
  const [casoSeleccionadoId, setCasoSeleccionadoId] = useState(listadoFinal[0]?.id || 'exp-1');
  const casoActivo = listadoFinal.find((c: any) => c.id === casoSeleccionadoId) || listadoFinal[0];

  // Cálculos de porcentajes financieros
  const pctHonorarios = Math.round(((casoActivo.honorariosPagados || 2400) / (casoActivo.honorariosConvenidos || 3500)) * 100);
  const pctGastos = Math.round(((casoActivo.gastosPagados || 350) / (casoActivo.gastosTotales || 450)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* CABECERA BIENVENIDA CLIENTE */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700"/>
            <span>Código Confidencial: {codigoClienteSesion}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">
            Bienvenido/a, <span className="underline decoration-neutral-300">{casoActivo?.cliente || 'Inmobiliaria del Valle S.A.S.'}</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Plataforma confidencial de seguimiento en vivo de causas judiciales y estado de cuenta patrocinado por ACTIO LEGIS.
          </p>
        </div>

        {/* ENLACE DIRECTO SATJE */}
        <a 
          href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#281F26] hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all font-mono shadow-xs cursor-pointer"
        >
          <Scale className="w-4 h-4 text-neutral-300"/>
          <span>Consultar Causa en SATJE</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-400"/>
        </a>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA: LISTADO DE CAUSAS */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Causas Patrocinadas ({listadoFinal.length})
            </span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              En Trámite
            </span>
          </div>

          <div className="space-y-2">
            {listadoFinal.map((c: any) => {
              const esSeleccionado = c.id === casoActivo?.id;
              return (
                <div 
                  key={c.id} 
                  onClick={() => setCasoSeleccionadoId(c.id)}
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

        {/* COLUMNA DERECHA: REEMPLAZA LA CAJA ANTERIOR POR EL DETALLE COMPLETO */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TARJETA 1: INFORMACIÓN DEL PROCESO & BOTÓN SATJE */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Proceso Judicial Seleccionado
                </span>
                <h2 className="text-xl font-serif font-bold text-neutral-950">
                  {casoActivo?.tipoProceso}
                </h2>
                <span className="text-xs font-mono text-neutral-600 block mt-1">
                  Causa Judicial No: <strong>{casoActivo?.numProceso}</strong>
                </span>
              </div>

              <a 
                href="https://sistemas.funcionjudicial.gob.ec/consultas-satje/publico/index.xhtml"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#281F26] text-white text-xs font-mono font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
              >
                <Scale className="w-3.5 h-3.5 text-neutral-300"/>
                <span>Ver Movimientos SATJE</span>
                <ExternalLink className="w-3 h-3 text-neutral-400"/>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-700">
              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Etapa Procesal Actual:</span>
                <strong className="text-neutral-950 font-serif text-sm block">{casoActivo?.etapaProcesalActual}</strong>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-neutral-200/80 space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">Próxima Fecha Clave:</span>
                <strong className="text-neutral-950 font-mono text-sm block">{casoActivo?.proximaFechaClave}</strong>
              </div>
            </div>
          </div>

          {/* TARJETA 2: BARRAS DE PROGRESO FINANCIERO */}
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
              {/* BARRA HONORARIOS */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-700 font-bold">Honorarios Profesionales Convenidos:</span>
                  <span className="text-neutral-950 font-bold">${casoActivo.honorariosPagados || 2400} / ${casoActivo.honorariosConvenidos || 3500} USD ({pctHonorarios}%)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                  <div 
                    className="h-full bg-neutral-950 rounded-full transition-all duration-700" 
                    style={{ width: `${pctHonorarios}%` }}
                  />
                </div>
              </div>

              {/* BARRA GASTOS */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-700 font-bold">Gastos Operacionales & Peritajes:</span>
                  <span className="text-emerald-900 font-bold">${casoActivo.gastosPagados || 350} / ${casoActivo.gastosTotales || 450} USD ({pctGastos}%)</span>
                </div>
                <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 p-0.5">
                  <div 
                    className="h-full bg-emerald-700 rounded-full transition-all duration-700" 
                    style={{ width: `${pctGastos}%` }}
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
              {casoActivo?.actuaciones && casoActivo.actuaciones.length > 0 ? (
                casoActivo.actuaciones.map((act: any) => (
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

export default ClienteCasosView;
