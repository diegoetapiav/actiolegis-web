import React, { useState, useEffect } from 'react';

const API_URL = "https://asistente-legal-backend-237k.onrender.com";
const ORG_ID = "b47a988d-7123-455b-bfbf-6677942e1234";

interface Expediente {
  id: string;
  num_proceso: string;
  materia?: string;
  tipo_proceso?: string;
  cliente: string;
  contraparte?: string;
  estado_actual?: string;
  proximas_acciones?: string;
  judicatura?: string;
  termino_dias?: number | null;
  fecha_limite?: string | null;
  en_termino_fatal?: boolean;
  honorarios_pactados?: number | string;
  honorarios_cobrados?: number | string;
  responsable?: {
    nombre_completo?: string;
  } | null;
  created_at?: string;
}

export const ModuloExpedientes: React.FC = () => {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState<Expediente | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('Todas las Materias');

  // Modal para Cargar Providencia con IA
  const [modalAbierto, setModalAbierto] = useState(false);
  const [textoProvidencia, setTextoProvidencia] = useState('');
  const [analizandoIA, setAnalizandoIA] = useState(false);
  const [enRevision, setEnRevision] = useState(false);

  // Formulario IA
  const [datosForm, setDatosForm] = useState({
    expedienteId: null as string | null,
    materia: 'CIVIL Y MERCANTIL',
    numProceso: '',
    cliente: '',
    contraparte: '',
    tipoProceso: '',
    estado: '',
    proximasAcciones: '',
    responsableId: ''
  });

  const cargarExpedientes = async () => {
    try {
      setCargando(true);
      const resp = await fetch(`${API_URL}/api/listar-expedientes?organizacion_id=${ORG_ID}`);
      const data = await resp.json();
      const lista = data.expedientes || (Array.isArray(data) ? data : []);
      setExpedientes(lista);
      if (lista.length > 0 && !expedienteSeleccionado) {
        setExpedienteSeleccionado(lista[0]);
      }
    } catch (e) {
      console.error("Error al cargar causas desde Supabase:", e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarExpedientes();
  }, []);

  const procesarConIA = async () => {
    if (!textoProvidencia.trim()) return alert("Por favor pega el texto de la providencia.");
    setAnalizandoIA(true);
    try {
      const resp = await fetch(`${API_URL}/api/procesar-providencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textoNotificacion: textoProvidencia, organizacionId: ORG_ID })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);

      const d = data.datosIA || {};
      setDatosForm({
        expedienteId: data.coincidencias?.[0]?.id || null,
        materia: d.materia || 'CIVIL Y MERCANTIL',
        numProceso: d.numProceso || '',
        cliente: d.cliente || '',
        contraparte: d.contraparte || '',
        tipoProceso: d.tipoProceso || '',
        estado: d.estado || '',
        proximasAcciones: d.proximasAcciones || '',
        responsableId: ''
      });
      setEnRevision(true);
    } catch (err: any) {
      alert("Error en el análisis de IA: " + err.message);
    } finally {
      setAnalizandoIA(false);
    }
  };

  const guardarExpediente = async () => {
    try {
      const resp = await fetch(`${API_URL}/api/guardar-expediente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datosForm, organizacionId: ORG_ID })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);

      alert(data.mensaje || "Expediente guardado exitosamente en Supabase.");
      setModalAbierto(false);
      setEnRevision(false);
      setTextoProvidencia('');
      cargarExpedientes();
    } catch (e: any) {
      alert("Error al guardar: " + e.message);
    }
  };

  const expedientesFiltrados = expedientes.filter(exp => {
    const t = busqueda.toLowerCase();
    const coincideTexto = (
      exp.cliente?.toLowerCase().includes(t) ||
      exp.contraparte?.toLowerCase().includes(t) ||
      exp.num_proceso?.toLowerCase().includes(t)
    );
    const coincideMateria = filtroMateria === 'Todas las Materias' || exp.materia === filtroMateria;
    return coincideTexto && coincideMateria;
  });

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen p-6 text-slate-800 font-sans">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-300 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase bg-slate-200/60 px-2.5 py-1 rounded">
            ACTIO LEGIS · Despacho Guayaquil
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            GESTIÓN PROCESAL DE JUICIOS, CAUSAS SATJE & TRÁMITES
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Control de litigios de la firma, plazos fatales y sincronización con el sistema de la Función Judicial.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.open('https://procesosjudiciales.funcionjudicial.gob.ec', '_blank')}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all text-slate-700 bg-white shadow-sm"
          >
            ↗ Consultar SATJE Función Judicial
          </button>
          <button
            onClick={() => { setModalAbierto(true); setEnRevision(false); }}
            className="px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
          >
            + NUEVO EXPEDIENTE / IA
          </button>
        </div>
      </div>

      {/* Indicadores Numéricos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Procesos Activos</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{expedientes.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Judiciales y administrativos</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">En Término Fatal</div>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {expedientes.filter(e => e.en_termino_fatal).length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Atención urgente requerida</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Audiencias Fijadas</div>
          <div className="text-2xl font-black text-slate-900 mt-1">1</div>
          <div className="text-[10px] text-slate-400 mt-0.5">En agenda judicial</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Vinculados a SATJE</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{expedientes.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Sincronización habilitada</div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar por número de causa (ej: 09281-2024...), cliente o judicatura..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 shadow-sm focus:outline-none focus:border-amber-500"
        />
        <select 
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 shadow-sm focus:outline-none"
        >
          <option value="Todas las Materias">Todas las Materias</option>
          <option value="CIVIL Y MERCANTIL">Civil y Mercantil</option>
          <option value="LABORAL">Laboral</option>
          <option value="CONSTITUCIONAL">Constitucional</option>
          <option value="PENAL">Penal</option>
        </select>
      </div>

      {/* Cuadrícula Principal: Lista Lateral + Ficha Detallada */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lista Lateral de Expedientes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 mb-2">
            Expedientes ({expedientesFiltrados.length})
          </div>
          {cargando ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
              Cargando causas de Supabase...
            </div>
          ) : expedientesFiltrados.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
              No hay causas registradas bajo este criterio.
            </div>
          ) : (
            expedientesFiltrados.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setExpedienteSeleccionado(exp)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  expedienteSeleccionado?.id === exp.id
                    ? 'bg-white border-amber-500 shadow-md ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs font-black text-slate-900">{exp.num_proceso}</span>
                  {exp.en_termino_fatal && (
                    <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded font-bold">
                      En Término Fatal
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-800 line-clamp-1">{exp.tipo_proceso || 'Proceso Judicial'}</div>
                <div className="text-[11px] text-slate-500 mt-1">👤 {exp.cliente}</div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  <span className="uppercase font-semibold">{exp.materia || 'CIVIL'}</span>
                  {exp.fecha_limite && <span>⏳ Vence: {exp.fecha_limite}</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ficha Detallada */}
        <div className="lg:col-span-7">
          {expedienteSeleccionado ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-base font-black text-slate-900 font-mono">
                    Causa Nº {expedienteSeleccionado.num_proceso}
                  </span>
                  <span className="ml-2 text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded">
                    JUICIO JUDICIAL
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-black text-slate-900 leading-snug">
                {expedienteSeleccionado.tipo_proceso || 'Acción Judicial'}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {expedienteSeleccionado.estado_actual || 'Sin providencias o actuaciones recientes registradas.'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Cliente Patrocinado</div>
                  <div className="font-bold text-slate-800 mt-0.5">{expedienteSeleccionado.cliente}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Contraparte</div>
                  <div className="font-bold text-slate-800 mt-0.5">{expedienteSeleccionado.contraparte || 'No asignada'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Judicatura / Juzgado</div>
                  <div className="font-bold text-slate-800 mt-0.5">{expedienteSeleccionado.judicatura || 'Guayaquil, Guayas'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Materia & Etapa</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{expedienteSeleccionado.materia || 'Civil'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Abogado Responsable</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {expedienteSeleccionado.responsable?.nombre_completo || 'Dr. Diego Tapia'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400">Honorarios</div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    ${expedienteSeleccionado.honorarios_pactados || '2500'} USD
                  </div>
                </div>
              </div>

              {expedienteSeleccionado.proximas_acciones && (
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">Próximas Acciones & Términos</div>
                  <div className="text-xs text-amber-800 mt-1">{expedienteSeleccionado.proximas_acciones}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
              Selecciona una causa de la lista para ver su información y bitácora.
            </div>
          )}
        </div>
      </div>

      {/* Modal Carga IA / Providencias */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-black text-slate-900">
                {enRevision ? "Revisión de Datos Extraídos por Gemini" : "Analizar Providencia SATJE con IA"}
              </h3>
              <button 
                onClick={() => setModalAbierto(false)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {!enRevision ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Pega el texto emitido en la notificación o providencia de la Función Judicial. La IA estructurará las partes procesales, número de causa, términos y mandatos.
                </p>
                <textarea
                  rows={6}
                  value={textoProvidencia}
                  onChange={(e) => setTextoProvidencia(e.target.value)}
                  placeholder="Ej: En lo principal, notifíquese a las partes dentro de la causa 09281-2024-00123..."
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={procesarConIA}
                  disabled={analizandoIA}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all"
                >
                  {analizandoIA ? "⏳ Analizando con Gemini..." : "⚡ Extraer y Clasificar"}
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-500 font-semibold">Número de Juicio:</label>
                  <input
                    type="text"
                    value={datosForm.numProceso}
                    onChange={(e) => setDatosForm({ ...datosForm, numProceso: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-500 font-semibold">Cliente:</label>
                    <input
                      type="text"
                      value={datosForm.cliente}
                      onChange={(e) => setDatosForm({ ...datosForm, cliente: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 font-semibold">Contraparte:</label>
                    <input
                      type="text"
                      value={datosForm.contraparte}
                      onChange={(e) => setDatosForm({ ...datosForm, contraparte: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-500 font-semibold">Estado Procesal:</label>
                  <textarea
                    rows={2}
                    value={datosForm.estado}
                    onChange={(e) => setDatosForm({ ...datosForm, estado: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2 mt-1 text-slate-800"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={guardarExpediente}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-lg text-white"
                  >
                    💾 Guardar en Supabase
                  </button>
                  <button
                    onClick={() => setEnRevision(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg text-slate-600"
                  >
                    Volver
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
