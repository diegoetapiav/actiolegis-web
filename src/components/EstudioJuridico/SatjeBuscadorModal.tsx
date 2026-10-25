import React, { useState } from 'react';
import { X, Search, ExternalLink, Download, Check, AlertCircle, RefreshCw, FileText, ArrowRight } from 'lucide-react';
import { buscarCausasSatje, obtenerEnlaceSatjeOficial } from '../../services/satjeService';
import { CausaSatjeBusqueda, Cliente, Expediente, MateriaLegal, TipoActuacion } from '../../types/legal';

interface SatjeBuscadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  expedientesExistentes: Expediente[];
  onImportarCausa: (nuevoExpediente: Expediente) => void;
  onSincronizarCausaExistente: (expedienteId: string, causaSatje: CausaSatjeBusqueda) => void;
}

export const SatjeBuscadorModal: React.FC<SatjeBuscadorModalProps> = ({
  isOpen,
  onClose,
  clientes,
  expedientesExistentes,
  onImportarCausa,
  onSincronizarCausaExistente,
}) => {
  const [numeroCausa, setNumeroCausa] = useState('17230-2024-00482');
  const [actorOfendido, setActorOfendido] = useState('');
  const [demandadoProcesado, setDemandadoProcesado] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [resultados, setResultados] = useState<CausaSatjeBusqueda[] | null>(null);
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState<string>(clientes[0]?.id || '');
  const [mensajeExito, setMensajeExito] = useState('');

  if (!isOpen) return null;

  const handleBuscar = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setBuscando(true);
    setMensajeExito('');
    try {
      const res = await buscarCausasSatje({
        numeroCausa,
        actorOfendido,
        demandadoProcesado,
      });
      setResultados(res);
    } catch (err) {
      console.error(err);
    } finally {
      setBuscando(false);
    }
  };

  const handleImportar = (causa: CausaSatjeBusqueda) => {
    const clienteAsignado = clientes.find((c) => c.id === clienteSeleccionadoId) || clientes[0];

    // Mapeo inteligente de materia
    let materiaMapeada: MateriaLegal = 'Civil y Mercantil';
    if (causa.materia.toLowerCase().includes('laboral') || causa.infraccionDelitoAccion.toLowerCase().includes('trabajo') || causa.infraccionDelitoAccion.toLowerCase().includes('despido')) {
      materiaMapeada = 'Laboral';
    } else if (causa.materia.toLowerCase().includes('constitucional')) {
      materiaMapeada = 'Constitucional';
    } else if (causa.materia.toLowerCase().includes('penal')) {
      materiaMapeada = 'Penal';
    } else if (causa.materia.toLowerCase().includes('mercantil') || causa.materia.toLowerCase().includes('ejecutivo')) {
      materiaMapeada = 'Civil y Mercantil';
    }

    const nuevoExpediente: Expediente = {
      id: `exp-satje-${Date.now()}`,
      numeroCausa: causa.numeroCausa,
      tipoProceso: 'Juicio Judicial',
      titulo: `${causa.tipoAccion}: ${causa.actorOfendido} vs ${causa.demandadoProcesado}`,
      materia: materiaMapeada,
      etapa: causa.actuaciones.length > 2 ? 'Fase Probatoria' : 'Calificación de Demanda',
      estado: 'En Trámite',
      clienteId: clienteAsignado ? clienteAsignado.id : 'cli-1',
      clienteNombre: clienteAsignado ? clienteAsignado.nombre : 'Cliente General',
      clienteCodigoAcceso: clienteAsignado ? clienteAsignado.codigoAcceso : 'ACTIO-8492',
      contraparte: causa.demandadoProcesado,
      abogadoResponsable: 'Dr. Diego Tapia',
      judicatura: causa.judicatura,
      juezPonente: causa.juezPonente,
      cuantia: 15000,
      honorariosPactados: 2500,
      honorariosCobrados: 1000,
      fechaInicio: causa.fechaIngreso,
      proximoTermino: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      descripcionTermino: 'Revisión de providencia y contestación procesal de término',
      resumenCaso: `Causa judicial ingresada en ${causa.judicatura}. Acción: ${causa.infraccionDelitoAccion}. Juez Ponente: ${causa.juezPonente}.`,
      enlaceSatje: obtenerEnlaceSatjeOficial(causa.numeroCausa),
      ultimaSincronizacionSatje: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actuaciones: causa.actuaciones.map((act, index) => {
        let tipoAct: TipoActuacion = 'Providencia Judicial';
        if (act.tipo.includes('SENTENCIA')) tipoAct = 'Sentencia / Auto Resolutorio';
        else if (act.tipo.includes('AUDIENCIA')) tipoAct = 'Audiencia Realizada';
        else if (act.tipo.includes('ESCRITO')) tipoAct = 'Escrito Presentado';
        else if (act.tipo.includes('NOTIFICACIÓN') || act.tipo.includes('CITACIÓN')) tipoAct = 'Notificación Electrónica';

        return {
          id: `act-satje-${index}-${Date.now()}`,
          fecha: act.fecha,
          tipo: tipoAct,
          titulo: act.titulo,
          resumen: act.detalle,
          resumenParaCliente: `Actuación registrada en juzgado: ${act.titulo.toLowerCase()}.`,
          foja: act.foja,
          abogado: 'Sistema Judicial SATJE',
          origenSatje: true,
        };
      }),
    };

    onImportarCausa(nuevoExpediente);
    setMensajeExito(`¡Expediente judicial ${causa.numeroCausa} importado y rellenado exitosamente!`);
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  const handleSincronizar = (expedienteId: string, causa: CausaSatjeBusqueda) => {
    onSincronizarCausaExistente(expedienteId, causa);
    setMensajeExito(`¡Expediente ${causa.numeroCausa} sincronizado con las últimas providencias de la Función Judicial!`);
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-white max-w-4xl w-full border-2 border-black actio-shadow overflow-hidden flex flex-col max-h-[90vh]">
        {/* Encabezado Arquitectónico */}
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xs">
              <RefreshCw className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black text-white uppercase tracking-widest font-mono">
                  ACTIO LEGIS · HERRAMIENTA JUDICIAL
                </span>
              </div>
              <h2 className="font-bold text-base text-white font-display uppercase tracking-wide">
                Interconexión y Consulta de Causas SATJE (Función Judicial)
              </h2>
              <p className="text-xs text-slate-300">
                Alimentación automática y actualización de expedientes procesales para el equipo legal de Actio Legis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda-filtros"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-white text-black font-bold uppercase flex items-center gap-1.5 border border-white transition-colors actio-shadow-sm hover:bg-slate-200"
              title="Abrir página oficial de la Función Judicial en una pestaña nueva"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Web Oficial SATJE
            </a>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formulario de Consulta SATJE */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleBuscar} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Causa / Proceso (SATJE)
                </label>
                <input
                  type="text"
                  value={numeroCausa}
                  onChange={(e) => setNumeroCausa(e.target.value)}
                  placeholder="Ej: 17230-2024-00482"
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Actor / Ofendido (Opcional)
                </label>
                <input
                  type="text"
                  value={actorOfendido}
                  onChange={(e) => setActorOfendido(e.target.value)}
                  placeholder="Nombre o Cédula/RUC"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Demandado / Procesado (Opcional)
                </label>
                <input
                  type="text"
                  value={demandadoProcesado}
                  onChange={(e) => setDemandadoProcesado(e.target.value)}
                  placeholder="Nombre o Cédula/RUC"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
            </div>

            {/* Ejemplos rápidos para facilitar la prueba */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">Probar causas SATJE:</span>
              <button
                type="button"
                onClick={() => {
                  setNumeroCausa('17230-2024-00482');
                  setActorOfendido('');
                  setDemandadoProcesado('');
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800"
              >
                17230-2024-00482 (Civil Prescripción)
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumeroCausa('17203-2023-05119');
                  setActorOfendido('');
                  setDemandadoProcesado('');
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800"
              >
                17203-2023-05119 (Laboral Sumario)
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumeroCausa('09281-2023-01822');
                  setActorOfendido('');
                  setDemandadoProcesado('');
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800"
              >
                09281-2023-01822 (Guayaquil Ejecutivo)
              </button>
              <button
                type="button"
                onClick={() => {
                  setNumeroCausa('17811-2024-00109');
                  setActorOfendido('');
                  setDemandadoProcesado('');
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-800"
              >
                17811-2024-00109 (Constitucional)
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-500">
                Se consultará la base indexada de procesos judiciales del Ecuador.
              </div>

              <button
                type="submit"
                disabled={buscando}
                className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {buscando ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Consultando SATJE...
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    Consultar en Función Judicial
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Mensaje de éxito si se importó */}
        {mensajeExito && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            {mensajeExito}
          </div>
        )}

        {/* Resultados de la Búsqueda */}
        <div className="flex-1 overflow-y-auto p-6">
          {resultados === null ? (
            <div className="text-center py-12 text-slate-400">
              <Search className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-600">
                Ingrese el número de causa o nombre de las partes y presione &quot;Consultar&quot;.
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                La aplicación extraerá la información judicial oficial, judicatura, providencias y estado para rellenar automáticamente sus expedientes.
              </p>
            </div>
          ) : resultados.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-500 mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                No se encontraron causas con los criterios ingresados
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Verifique que el número de causa tenga el formato cantón-año-secuencial (ej: 17230-2024-00482).
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  {resultados.length} Causa(s) Judicial(es) encontrada(s) en SATJE
                </span>
                <span className="text-xs text-slate-500">Datos verificados en la Función Judicial</span>
              </div>

              {resultados.map((causa) => {
                const expedienteExistente = expedientesExistentes.find(
                  (e) => e.numeroCausa.trim() === causa.numeroCausa.trim()
                );

                return (
                  <div
                    key={causa.numeroCausa}
                    className="border border-slate-200 rounded-xl p-5 bg-white shadow-xs hover:border-slate-300 transition-all space-y-4"
                  >
                    {/* Encabezado de la Causa */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-mono text-slate-900">
                            Causa N° {causa.numeroCausa}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-amber-50 text-amber-800 border border-amber-200">
                            {causa.materia}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          {causa.infraccionDelitoAccion}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400">Fecha de Ingreso:</span>
                        <div className="text-xs font-mono font-semibold text-slate-700">
                          {causa.fechaIngreso}
                        </div>
                      </div>
                    </div>

                    {/* Datos Detallados de la Causa */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Judicatura / Juzgado:
                        </span>
                        <span className="text-slate-800 font-medium">{causa.judicatura}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Juez Ponente:
                        </span>
                        <span className="text-slate-800 font-medium">{causa.juezPonente}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Actor / Ofendido:
                        </span>
                        <span className="text-slate-800 font-medium">{causa.actorOfendido}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block">
                          Demandado / Procesado:
                        </span>
                        <span className="text-slate-800 font-medium">{causa.demandadoProcesado}</span>
                      </div>
                    </div>

                    {/* Actuaciones / Providencias extraídas */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          Providencias y Actuaciones Extraídas ({causa.actuaciones.length}):
                        </span>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {causa.actuaciones.map((act, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                              <span className="font-semibold text-slate-700">{act.titulo}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-slate-400">{act.foja}</span>
                                <span>·</span>
                                <span className="font-mono">{act.fecha}</span>
                              </div>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                              {act.detalle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Acciones de importación o sincronización */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      {expedienteExistente ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                            <Check className="w-4 h-4 text-emerald-600" />
                            Esta causa ya existe en sus expedientes ({expedienteExistente.clienteNombre})
                          </span>
                          <button
                            onClick={() => handleSincronizar(expedienteExistente.id, causa)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Sincronizar Providencias
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-between">
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                              Asignar a Cliente:
                            </label>
                            <select
                              value={clienteSeleccionadoId}
                              onChange={(e) => setClienteSeleccionadoId(e.target.value)}
                              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                            >
                              {clientes.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.nombre} ({c.codigoAcceso})
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={() => handleImportar(causa)}
                            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Importar y Rellenar Automáticamente en la App
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pie con ayuda */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Los datos se extraen de la base SATJE de la Función Judicial del Ecuador.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
