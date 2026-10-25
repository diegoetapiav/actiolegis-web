import React, { useState, useEffect } from 'react';

const API_URL = "https://asistente-legal-backend-237k.onrender.com";
const ORG_ID = "b47a988d-7123-455b-bfbf-6677942e1234";

export const ModuloExpedientes: React.FC = () => {
  const [subTab, setSubTab] = useState<'analizar' | 'tablero'>('tablero');
  const [textoProvidencia, setTextoProvidencia] = useState('');
  const [cargando, setCargando] = useState(false);
  const [expedientes, setExpedientes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');

  // Formulario extraído por IA
  const [datosForm, setDatosForm] = useState({
    expedienteId: null as string | null,
    materia: 'ACTIVOS CIVIL',
    numProceso: '',
    cliente: '',
    contraparte: '',
    tipoProceso: '',
    estado: '',
    proximasAcciones: '',
    responsableId: ''
  });
  const [responsables, setResponsables] = useState<any[]>([]);
  const [enRevision, setEnRevision] = useState(false);

  const cargarExpedientes = async () => {
    try {
      const resp = await fetch(`${API_URL}/api/listar-expedientes?organizacionId=${ORG_ID}`);
      const data = await resp.json();
      if (data.expedientes) setExpedientes(data.expedientes);
    } catch (e) {
      console.error("Error al cargar expedientes:", e);
    }
  };

  useEffect(() => {
    if (subTab === 'tablero') cargarExpedientes();
  }, [subTab]);

  const procesarConIA = async () => {
    if (!textoProvidencia.trim()) return alert("Ingresa el texto de la notificación.");
    setCargando(true);
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
        materia: d.materia || 'ACTIVOS CIVIL',
        numProceso: d.numProceso || '',
        cliente: d.cliente || '',
        contraparte: d.contraparte || '',
        tipoProceso: d.tipoProceso || '',
        estado: d.estado || '',
        proximasAcciones: d.proximasAcciones || '',
        responsableId: ''
      });
      setResponsables(data.listas?.responsables || []);
      setEnRevision(true);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setCargando(false);
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

      alert(data.mensaje || "Guardado exitosamente.");
      setEnRevision(false);
      setTextoProvidencia('');
      setSubTab('tablero');
    } catch (e: any) {
      alert("Error al guardar: " + e.message);
    }
  };

  const expedientesFiltrados = expedientes.filter(exp => {
    const t = busqueda.toLowerCase();
    return (exp.cliente?.toLowerCase().includes(t) ||
            exp.contraparte?.toLowerCase().includes(t) ||
            exp.num_proceso?.toLowerCase().includes(t));
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
      {/* Selector interno del módulo */}
      <div className="flex gap-3 mb-6 border-b border-slate-800 pb-4">
        <button
          onClick={() => setSubTab('tablero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'tablero' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          📁 Tablero de Causas ({expedientes.length})
        </button>
        <button
          onClick={() => { setSubTab('analizar'); setEnRevision(false); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === 'analizar' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          ⚡ Cargar Providencia con IA
        </button>
      </div>

      {/* VISTA 1: TABLERO DE CAUSAS */}
      {subTab === 'tablero' && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar por cliente, contraparte o número de juicio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 text-slate-400 uppercase">
                <tr>
                  <th className="p-3">Materia</th>
                  <th className="p-3">Nº Proceso</th>
                  <th className="p-3">Partes</th>
                  <th className="p-3">Estado Actual</th>
                  <th className="p-3">Próximas Acciones</th>
                  <th className="p-3">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {expedientesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      No se encontraron causas registradas.
                    </td>
                  </tr>
                ) : (
                  expedientesFiltrados.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-800/40">
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono text-[10px]">
                          {exp.materia}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-200">{exp.num_proceso}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-100">{exp.cliente}</div>
                        <div className="text-slate-400 text-[11px]">vs. {exp.contraparte}</div>
                      </td>
                      <td className="p-3 text-slate-300 max-w-xs">{exp.estado_actual}</td>
                      <td className="p-3 text-slate-300 max-w-xs">{exp.proximas_acciones}</td>
                      <td className="p-3 text-slate-400">{exp.responsable?.nombre_completo || 'Sin asignar'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 2: CARGAR PROVIDENCIA */}
      {subTab === 'analizar' && !enRevision && (
        <div className="max-w-xl mx-auto space-y-4">
          <label className="block text-xs font-bold text-slate-300">
            Pega el texto de la providencia judicial o notificación:
          </label>
          <textarea
            rows={6}
            value={textoProvidencia}
            onChange={(e) => setTextoProvidencia(e.target.value)}
            placeholder="Extracto de la providencia emitida por el juzgado o tribunal..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-400 font-sans"
          />
          <button
            onClick={procesarConIA}
            disabled={cargando}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold rounded-xl text-sm transition-all"
          >
            {cargando ? "⏳ Analizando con Gemini..." : "⚡ Extraer Datos con IA"}
          </button>
        </div>
      )}

      {/* REVISIÓN ANTES DE GUARDAR */}
      {subTab === 'analizar' && enRevision && (
        <div className="max-w-2xl mx-auto space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs">
          <h3 className="text-sm font-bold text-amber-400">Verifica los datos extraídos</h3>
          
          <div>
            <label className="text-slate-400">Materia:</label>
            <input
              type="text"
              value={datosForm.materia}
              onChange={(e) => setDatosForm({ ...datosForm, materia: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400">Cliente (Actor):</label>
              <input
                type="text"
                value={datosForm.cliente}
                onChange={(e) => setDatosForm({ ...datosForm, cliente: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
              />
            </div>
            <div>
              <label className="text-slate-400">Contraparte:</label>
              <input
                type="text"
                value={datosForm.contraparte}
                onChange={(e) => setDatosForm({ ...datosForm, contraparte: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400">Número de Proceso:</label>
            <input
              type="text"
              value={datosForm.numProceso}
              onChange={(e) => setDatosForm({ ...datosForm, numProceso: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-400">Estado Procesal:</label>
            <textarea
              rows={2}
              value={datosForm.estado}
              onChange={(e) => setDatosForm({ ...datosForm, estado: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
            />
          </div>

          <div>
            <label className="text-slate-400">Próximas Acciones:</label>
            <textarea
              rows={2}
              value={datosForm.proximasAcciones}
              onChange={(e) => setDatosForm({ ...datosForm, proximasAcciones: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 mt-1 text-slate-200"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              onClick={guardarExpediente}
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 font-bold rounded-lg text-white"
            >
              💾 Confirmar y Guardar
            </button>
            <button
              onClick={() => setEnRevision(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 font-semibold rounded-lg text-slate-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
