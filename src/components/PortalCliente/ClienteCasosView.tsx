import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Clock, ShieldCheck, FileText, CheckCircle2, AlertCircle, Scale, ChevronRight } from 'lucide-react';
import { Expediente, Cliente } from '../../types/legal';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';

interface ClienteCasosViewProps {
  cliente: Cliente;
  expedientes: Expediente[];
  onIrAConsultas: () => void;
  onIrACitas: () => void;
}

export const ClienteCasosView: React.FC<ClienteCasosViewProps> = ({
  cliente,
  expedientes,
  onIrAConsultas,
  onIrACitas,
}) => {
  const misCasos = expedientes.filter((e) => e.clienteId === cliente.id);
  const [casoSeleccionado, setCasoSeleccionado] = useState<Expediente | null>(misCasos[0] || null);

  return (
    <div className="space-y-6">
      {/* Banner Arquitectónico Oficial ACTIO LEGIS */}
      <div className="bg-black text-white p-6 border-2 border-black actio-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block pt-1">
              <ActioLegisLogo variant="white" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-white text-black font-mono">
                  ACTIO LEGIS
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  Código Confidencial: <strong className="text-white">{cliente.codigoAcceso}</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight font-display uppercase">
                Bienvenido/a, {cliente.nombre}
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed font-sans">
                Portal privado y reservado de seguimiento de sus causas judiciales patrocinadas por el Estudio Jurídico ACTIO LEGIS. Consulte en tiempo real las providencias, fechas de audiencia y estado procesal oficial.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onIrACitas}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-slate-200 transition-all border border-white actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Agendar Cita con Abogado
            </button>
            <button
              onClick={onIrAConsultas}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-black hover:bg-slate-900 text-white border border-slate-700 transition-all hover:border-white"
            >
              Hacer una Pregunta
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Casos del Cliente */}
      {misCasos.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
          <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">No tiene causas registradas actualmente</h3>
          <p className="text-xs text-slate-500 mt-1">
            Comuníquese con su abogado patrocinador para vincular su causa a su código de acceso.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Lista de Casos a la izquierda */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Mis Juicios y Trámites ({misCasos.length})
            </h2>

            <div className="space-y-2.5">
              {misCasos.map((caso) => {
                const esActivo = casoSeleccionado?.id === caso.id;

                return (
                  <div
                    key={caso.id}
                    onClick={() => setCasoSeleccionado(caso)}
                    className={`p-4 border cursor-pointer transition-all text-left ${
                      esActivo
                        ? 'border-2 border-black bg-white actio-shadow'
                        : 'border-slate-300 bg-white hover:border-black hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-black">
                        {caso.numeroCausa}
                      </span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 border border-slate-300 bg-slate-50 text-slate-800">
                        {caso.estado}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug font-display">
                      {caso.titulo}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-150 mt-2">
                      <span className="truncate max-w-[140px] uppercase font-mono text-[10px] text-slate-600 font-semibold">{caso.materia}</span>
                      <span className="text-black font-bold font-mono text-xs flex items-center gap-0.5">
                        Consultar &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detalle Consultivo del Caso Seleccionado */}
          <div className="lg:col-span-8">
            {casoSeleccionado && (
              <div className="bg-white border-2 border-black actio-shadow p-6 space-y-6">
                {/* Header del caso */}
                <div className="pb-4 border-b-2 border-black">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black font-mono text-black">
                        Causa Judicial: {casoSeleccionado.numeroCausa}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 bg-black text-white font-mono font-bold uppercase tracking-wider">
                        {casoSeleccionado.materia}
                      </span>
                    </div>

                    <a
                      href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda-filtros"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2.5 py-1 bg-white hover:bg-black hover:text-white text-black font-bold flex items-center gap-1.5 transition-colors border border-black actio-shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verificar en Portal SATJE
                    </a>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    {casoSeleccionado.titulo}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {casoSeleccionado.resumenCaso}
                  </p>
                </div>

                {/* Progreso Visual del Caso */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Etapa Procesal Actual:</span>
                    <span className="font-semibold text-indigo-700 font-mono">
                      {casoSeleccionado.etapa}
                    </span>
                  </div>

                  {/* Barra de estado */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width:
                          casoSeleccionado.etapa === 'Calificación de Demanda'
                            ? '25%'
                            : casoSeleccionado.etapa === 'Audiencia Preliminar' || casoSeleccionado.etapa === 'Fase Probatoria'
                            ? '55%'
                            : casoSeleccionado.etapa === 'Audiencia de Juicio'
                            ? '75%'
                            : casoSeleccionado.etapa === 'Sentencia de Primera Instancia' || casoSeleccionado.estado === 'Sentencia Favorable'
                            ? '90%'
                            : '40%',
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Inicio / Demanda</span>
                    <span>Audiencia / Pruebas</span>
                    <span>Sentencia Definitiva</span>
                  </div>
                </div>

                {/* Datos del Tribunal y Abogado */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Juzgado / Judicatura
                    </span>
                    <span className="font-medium text-slate-800 block mt-0.5">
                      {casoSeleccionado.judicatura}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Contraparte Demandada
                    </span>
                    <span className="font-medium text-slate-800 block mt-0.5">
                      {casoSeleccionado.contraparte}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Abogado Patrocinador
                    </span>
                    <span className="font-bold text-slate-900 block mt-0.5">
                      {casoSeleccionado.abogadoResponsable}
                    </span>
                    <span className="text-[10px] text-slate-500">Actio Legis Ecuador</span>
                  </div>
                </div>

                {/* Próximo hito o audiencia si existe */}
                {casoSeleccionado.proximoTermino && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-900">
                        Próxima Fecha Clave: {casoSeleccionado.proximoTermino}
                      </div>
                      <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                        {casoSeleccionado.descripcionTermino || 'Plazo procesal o señalamiento de diligencia en el juzgado.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Historial de Providencias y Novedades explicadas para el cliente */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Historial de Actuaciones y Resoluciones Judiciales
                  </h3>

                  <div className="space-y-3">
                    {casoSeleccionado.actuaciones.map((act) => (
                      <div
                        key={act.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">{act.titulo}</span>
                          <span className="text-[10px] font-mono text-slate-400">{act.fecha}</span>
                        </div>

                        {/* Explicación en lenguaje sencillo para el cliente */}
                        <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed">
                          📌 {act.resumenParaCliente || act.resumen}
                        </div>

                        <details className="text-[11px] text-slate-500 pt-1">
                          <summary className="cursor-pointer hover:text-slate-800 font-semibold select-none">
                            Ver texto legal de la providencia
                          </summary>
                          <p className="mt-1.5 p-2 rounded bg-slate-50 text-slate-600 font-mono text-[11px] leading-relaxed">
                            {act.resumen}
                          </p>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aviso informativo de solo lectura */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>
                    🔒 Modo Consultivo: Este portal es de solo lectura. Para solicitar trámites, contacte a su abogado.
                  </span>
                  <button
                    onClick={onIrAConsultas}
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Enviar Consulta &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
