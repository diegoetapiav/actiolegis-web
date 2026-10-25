import React, { useState } from 'react';
import { 
  FolderGit2, Plus, Search, ExternalLink, Calendar, 
  Clock, ShieldAlert, CheckCircle2, ChevronRight, RefreshCw, FileText,
  User, DollarSign, Filter, BookOpen, AlertTriangle
} from 'lucide-react';
import { Expediente, Cliente, ActuacionJudicial, UsuarioEstudio } from '../../types/legal';
import { ActioLegisLogo } from '../Brand/ActioLegisLogo';

interface ExpedientesManagerProps {
  expedientes: Expediente[];
  clientes: Cliente[];
  usuarioActivo?: UsuarioEstudio;
  onAbrirNuevoExpediente: () => void;
  onAbrirSatje: () => void;
  onActualizarExpediente: (expediente: Expediente) => void;
}

export const ExpedientesManager: React.FC<ExpedientesManagerProps> = ({
  expedientes,
  clientes,
  usuarioActivo,
  onAbrirNuevoExpediente,
  onAbrirSatje,
  onActualizarExpediente,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroMateria, setFiltroMateria] = useState<string>('todas');
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState<Expediente | null>(
    expedientes[0] || null
  );
  const [mostrarModalActuacion, setMostrarModalActuacion] = useState(false);
  const [editandoEtapa, setEditandoEtapa] = useState(false);
  const [nuevaEtapaValor, setNuevaEtapaValor] = useState('');

  const handleGuardarEtapa = () => {
    if (!expedienteSeleccionado) return;
    const expActualizado: Expediente = {
      ...expedienteSeleccionado,
      etapa: nuevaEtapaValor.trim() || undefined,
    };
    onActualizarExpediente(expActualizado);
    setExpedienteSeleccionado(expActualizado);
    setEditandoEtapa(false);
  };

  // Filtrado
  const expedientesFiltrados = expedientes.filter((exp) => {
    const textoMatch =
      exp.numeroCausa.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.clienteNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.contraparte.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.judicatura.toLowerCase().includes(busqueda.toLowerCase());

    const estadoMatch =
      filtroEstado === 'todos' || exp.estado.toLowerCase().replace(/\s+/g, '-') === filtroEstado;

    const materiaMatch = filtroMateria === 'todas' || exp.materia === filtroMateria;

    return textoMatch && estadoMatch && materiaMatch;
  });

  const handleAgregarActuacion = (nueva: ActuacionJudicial) => {
    if (!expedienteSeleccionado) return;
    const actuacionesActualizadas = [nueva, ...expedienteSeleccionado.actuaciones];
    const expActualizado: Expediente = {
      ...expedienteSeleccionado,
      actuaciones: actuacionesActualizadas,
    };
    onActualizarExpediente(expActualizado);
    setExpedienteSeleccionado(expActualizado);
    setMostrarModalActuacion(false);
  };

  if (usuarioActivo?.rol === 'Administrativo') {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center max-w-xl mx-auto my-12 space-y-4 shadow-sm">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Acceso Restringido a Procesos y Juicios
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Por reglamento de reserva y secreto profesional de <strong>ACTIO LEGIS</strong>, las cuentas con rol <strong>Administrativo</strong> ({usuarioActivo.nombre} / {usuarioActivo.email}) no tienen acceso a expedientes, litigios ni causas judiciales.
        </p>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
          Su perfil está facultado exclusivamente para registrar gastos, comprobantes y llevar el orden de cobro de honorarios.
        </div>
      </div>
    );
  }

  const esPasante = usuarioActivo?.rol === 'Pasante';

  return (
    <div className="space-y-6">
      {/* Barra Superior de Control y Resumen */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Despacho Principal Quito</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">
            Gestión Procesal de Juicios, Causas SATJE & Trámites
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Control de litigios de la firma, plazos fatales y sincronización con el sistema oficial de la Función Judicial del Ecuador.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onAbrirSatje}
            className="px-3.5 py-2 bg-white hover:bg-black hover:text-white text-black border-1.5 border-black font-bold text-xs transition-all flex items-center gap-2 actio-shadow-sm"
            title="Conectar con procesosjudiciales.funcionjudicial.gob.ec"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Consultar SATJE Función Judicial
          </button>

          <button
            onClick={onAbrirNuevoExpediente}
            className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Plus className="w-4 h-4 text-white" />
            Nuevo Expediente
          </button>
        </div>
      </div>

      {/* Métricas rápidas arquitectónicas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">Total Procesos Activos</span>
          <div className="text-2xl font-black text-black font-mono tabular-nums mt-1 font-display">
            {expedientes.length}
          </div>
          <span className="text-[10px] text-slate-400">Judiciales y administrativos</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-rose-700 block uppercase tracking-wider font-mono">En Término Fatal</span>
          <div className="text-2xl font-black text-rose-700 font-mono tabular-nums mt-1 font-display">
            {expedientes.filter((e) => e.estado === 'En Término Fatal').length}
          </div>
          <span className="text-[10px] text-slate-400">Atención urgente requerida</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-700 block uppercase tracking-wider font-mono">Audiencias Fijadas</span>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums mt-1 font-display">
            {expedientes.filter((e) => e.estado === 'Audiencia Fijada').length}
          </div>
          <span className="text-[10px] text-slate-400">En agenda judicial</span>
        </div>

        <div className="p-4 bg-white border-1.5 border-black actio-shadow-sm">
          <span className="text-[10px] font-bold text-slate-700 block uppercase tracking-wider font-mono">Vinculados a SATJE</span>
          <div className="text-2xl font-black text-slate-900 font-mono tabular-nums mt-1 font-display">
            {expedientes.filter((e) => e.enlaceSatje || e.numeroCausa.includes('-')).length}
          </div>
          <span className="text-[10px] text-slate-400">Sincronización habilitada</span>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por número de causa (ej: 17230-2024), cliente, judicatura o materia..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="todos">Todos los Estados</option>
            <option value="en-trámite">En Trámite</option>
            <option value="audiencia-fijada">Audiencia Fijada</option>
            <option value="en-término-fatal">En Término Fatal</option>
            <option value="sentencia-favorable">Sentencia Favorable</option>
          </select>

          <select
            value={filtroMateria}
            onChange={(e) => setFiltroMateria(e.target.value)}
            className="px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="todas">Todas las Materias</option>
            <option value="Civil y Mercantil">Civil y Mercantil</option>
            <option value="Laboral">Laboral</option>
            <option value="Constitucional">Constitucional</option>
            <option value="Contencioso Administrativo">Contencioso Administrativo</option>
            <option value="Penal">Penal</option>
          </select>
        </div>
      </div>

      {/* Contenedor Principal en Dos Columnas: Lista y Detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Listado de Expedientes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Expedientes ({expedientesFiltrados.length})</span>
            <span>Seleccione para ver bitácora</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {expedientesFiltrados.map((exp) => {
              const esSeleccionado = expedienteSeleccionado?.id === exp.id;
              const tieneTerminoUrgente = exp.estado === 'En Término Fatal';

              return (
                <div
                  key={exp.id}
                  onClick={() => setExpedienteSeleccionado(exp)}
                  className={`p-4 border text-left cursor-pointer transition-all ${
                    esSeleccionado
                      ? 'border-2 border-black bg-white actio-shadow'
                      : 'border-slate-300 bg-white hover:border-black hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-black">
                      {exp.numeroCausa}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 border ${
                        exp.estado === 'En Término Fatal'
                          ? 'bg-rose-50 text-rose-800 border-rose-400'
                          : exp.estado === 'Audiencia Fijada'
                          ? 'bg-slate-100 text-slate-900 border-slate-700'
                          : exp.estado === 'Sentencia Favorable'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      {exp.estado}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-950 line-clamp-1 mb-1 font-display">
                    {exp.titulo}
                  </h3>

                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-2">
                    <User className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate font-medium">{exp.clienteNombre}</span>
                    <span>·</span>
                    <span className="font-mono text-black font-bold text-[10px]">
                      {exp.clienteCodigoAcceso}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-150 text-slate-500">
                    <span className="text-[10px] font-semibold text-slate-700 uppercase font-mono truncate max-w-[170px]">
                      {exp.materia}
                    </span>
                    {exp.proximoTermino && (
                      <div className="flex items-center gap-1 font-mono text-[10px] text-rose-700 font-bold">
                        <Clock className="w-3 h-3" />
                        <span>Vence: {exp.proximoTermino}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {expedientesFiltrados.length === 0 && (
              <div className="text-center py-10 bg-white border-2 border-dashed border-slate-300 p-4">
                <AlertTriangle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-800 font-display uppercase">No se encontraron expedientes</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pruebe ajustando los filtros o registre un nuevo expediente.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Vista Detallada del Expediente Seleccionado */}
        <div className="lg:col-span-7">
          {expedienteSeleccionado ? (
            <div className="bg-white border-2 border-black actio-shadow p-6 space-y-6">
              {/* Encabezado del Expediente */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black font-mono text-black">
                      Causa N° {expedienteSeleccionado.numeroCausa}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 bg-black text-white font-mono font-bold uppercase tracking-wider">
                      {expedienteSeleccionado.tipoProceso}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda-filtros"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2.5 py-1 bg-white hover:bg-black hover:text-white text-black font-bold flex items-center gap-1 border border-black transition-colors actio-shadow-sm"
                      title="Abrir en portal oficial SATJE"
                    >
                      <ExternalLink className="w-3 h-3" />
                      SATJE Oficial
                    </a>
                    <button
                      onClick={() => setMostrarModalActuacion(true)}
                      className="text-xs px-3 py-1 bg-black hover:bg-slate-900 text-white font-bold uppercase tracking-wider flex items-center gap-1 transition-all border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-white" />
                      Añadir Actuación
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-bold text-slate-900 mt-3 leading-snug">
                  {expedienteSeleccionado.titulo}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {expedienteSeleccionado.resumenCaso}
                </p>
              </div>

              {/* Ficha técnica del caso */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Cliente Patrocinado
                  </span>
                  <span className="font-semibold text-slate-900 block mt-0.5">
                    {expedienteSeleccionado.clienteNombre}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-mono">
                    Código: {expedienteSeleccionado.clienteCodigoAcceso}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Contraparte
                  </span>
                  <span className="font-semibold text-slate-900 block mt-0.5">
                    {expedienteSeleccionado.contraparte}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Judicatura / Juzgado
                  </span>
                  <span className="font-medium text-slate-800 block mt-0.5 line-clamp-2">
                    {expedienteSeleccionado.judicatura}
                  </span>
                </div>

                <div className="relative group">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Materia & Etapa Procesal
                  </span>
                  <span className="font-medium text-slate-800 block mt-0.5">
                    {expedienteSeleccionado.materia}
                  </span>
                  {editandoEtapa ? (
                    <div className="mt-1 flex items-center gap-1.5">
                      <select
                        value={nuevaEtapaValor}
                        onChange={(e) => setNuevaEtapaValor(e.target.value)}
                        className="text-xs px-2 py-1 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                      >
                        <option value="">-- Sin etapa asignada --</option>
                        <option value="Calificación de Demanda">Calificación de Demanda</option>
                        <option value="Citación Judicial">Citación Judicial</option>
                        <option value="Término para Contestar">Término para Contestar</option>
                        <option value="Audiencia Preliminar">Audiencia Preliminar</option>
                        <option value="Fase Probatoria">Fase Probatoria</option>
                        <option value="Audiencia de Juicio">Audiencia de Juicio</option>
                        <option value="Sentencia de Primera Instancia">Sentencia de Primera Instancia</option>
                        <option value="Recurso de Apelación">Recurso de Apelación</option>
                        <option value="Casación">Casación</option>
                        <option value="Ejecución / Mandamiento de Pago">Ejecución / Mandamiento de Pago</option>
                        <option value="Concluido / Archivado">Concluido / Archivado</option>
                      </select>
                      <button
                        onClick={handleGuardarEtapa}
                        className="p-1 rounded bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-medium px-2"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditandoEtapa(false)}
                        className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 text-[11px]"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        expedienteSeleccionado.etapa 
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200 italic'
                      }`}>
                        {expedienteSeleccionado.etapa || 'Sin etapa asignada (Inicial)'}
                      </span>
                      <button
                        onClick={() => {
                          setNuevaEtapaValor(expedienteSeleccionado.etapa || '');
                          setEditandoEtapa(true);
                        }}
                        className="text-[10px] text-slate-500 hover:text-slate-900 underline font-medium"
                        title="Actualizar o asignar etapa procesal"
                      >
                        Editar etapa
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Abogado Responsable
                  </span>
                  <span className="font-medium text-slate-800 block mt-0.5">
                    {expedienteSeleccionado.abogadoResponsable}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    Honorarios Pactados
                  </span>
                  <span className="font-bold text-slate-900 font-mono block mt-0.5">
                    ${expedienteSeleccionado.honorariosPactados.toLocaleString()} USD
                  </span>
                  <span className="text-[10px] text-emerald-600">
                    Cobrado: ${expedienteSeleccionado.honorariosCobrados.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Alerta de Vencimiento de Término Procesal */}
              {expedienteSeleccionado.proximoTermino && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-900">
                      Próximo Vencimiento Fatal: {expedienteSeleccionado.proximoTermino}
                    </div>
                    <div className="text-amber-800 text-[11px] mt-0.5">
                      {expedienteSeleccionado.descripcionTermino || 'Atención de providencia o término probatorio en el juzgado.'}
                    </div>
                  </div>
                </div>
              )}

              {/* Bitácora Cronológica de Actuaciones y Providencias */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Bitácora Procesal ({expedienteSeleccionado.actuaciones.length} Actuaciones)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Orden cronológico inverso
                  </span>
                </div>

                <div className="space-y-3">
                  {expedienteSeleccionado.actuaciones.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-900">{act.titulo}</span>
                          {act.origenSatje && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-mono font-bold border border-amber-200">
                              SATJE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          {act.foja && <span>{act.foja}</span>}
                          <span>·</span>
                          <span>{act.fecha}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-sans mb-2">
                        {act.resumen}
                      </p>

                      {act.resumenParaCliente && (
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                          <span className="font-semibold text-slate-800">
                            Explicación visible para cliente:
                          </span>{' '}
                          {act.resumenParaCliente}
                        </div>
                      )}

                      <div className="text-[10px] text-slate-400 mt-2 text-right">
                        Registrado por: {act.abogado}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
              <FolderGit2 className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-600">
                Seleccione un expediente de la lista para ver su detalle
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para añadir actuación */}
      {mostrarModalActuacion && expedienteSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Agregar Actuación a Causa N° {expedienteSeleccionado.numeroCausa}
            </h3>

            <NuevaActuacionForm
              numeroCausa={expedienteSeleccionado.numeroCausa}
              abogadoDefecto={expedienteSeleccionado.abogadoResponsable}
              onGuardar={handleAgregarActuacion}
              onCancelar={() => setMostrarModalActuacion(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Formulario inline para añadir actuación
const NuevaActuacionForm: React.FC<{
  numeroCausa: string;
  abogadoDefecto: string;
  onGuardar: (act: ActuacionJudicial) => void;
  onCancelar: () => void;
}> = ({ numeroCausa, abogadoDefecto, onGuardar, onCancelar }) => {
  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [resumenParaCliente, setResumenParaCliente] = useState('');
  const [foja, setFoja] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      id: `act-${Date.now()}`,
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tipo: 'Providencia Judicial',
      titulo: titulo.trim(),
      resumen: resumen.trim(),
      resumenParaCliente: resumenParaCliente.trim() || resumen.trim(),
      foja: foja.trim() || undefined,
      abogado: abogadoDefecto,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la Actuación</label>
        <input
          type="text"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Providencia concediendo término probatorio"
          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Foja del Expediente (Opcional)</label>
        <input
          type="text"
          value={foja}
          onChange={(e) => setFoja(e.target.value)}
          placeholder="Ej: Fs. 160-162"
          className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Texto de la Providencia o Escrito</label>
        <textarea
          required
          rows={3}
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          placeholder="VISTOS: Agréguese a los autos..."
          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Explicación para el Cliente (Visible en su portal)
        </label>
        <textarea
          rows={2}
          value={resumenParaCliente}
          onChange={(e) => setResumenParaCliente(e.target.value)}
          placeholder="Ej: El Juez ordenó abrir el término de 10 días para pruebas..."
          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-amber-50/40"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancelar}
          className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
        >
          Guardar Actuación
        </button>
      </div>
    </form>
  );
};
