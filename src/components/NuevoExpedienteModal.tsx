import React, { useState } from 'react';
import { X, Save, PlusCircle, Scale } from 'lucide-react';
import { Cliente, Expediente, MateriaLegal, EtapaProcesal } from '../types/legal';

interface NuevoExpedienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientes: Cliente[];
  onGuardar: (nuevo: Expediente) => void;
}

export const NuevoExpedienteModal: React.FC<NuevoExpedienteModalProps> = ({
  isOpen,
  onClose,
  clientes,
  onGuardar,
}) => {
  const [numeroCausa, setNumeroCausa] = useState('17230-2024-');
  const [tipoProceso, setTipoProceso] = useState<Expediente['tipoProceso']>('Juicio Judicial');
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState<MateriaLegal>('Civil y Mercantil');
  const [etapa, setEtapa] = useState<string>(''); // No obligatoria al inicio
  const [estado, setEstado] = useState<Expediente['estado']>('En Trámite');
  const [clienteId, setClienteId] = useState<string>(clientes[0]?.id || '');
  const [contraparte, setContraparte] = useState('');
  const [abogadoResponsable, setAbogadoResponsable] = useState('Dr. Diego Tapia');
  const [judicatura, setJudicatura] = useState('Unidad Judicial Civil de Quito');
  const [cuantia, setCuantia] = useState<number>(10000);
  const [honorariosPactados, setHonorariosPactados] = useState<number>(2000);
  const [honorariosCobrados, setHonorariosCobrados] = useState<number>(1000);
  const [proximoTermino, setProximoTermino] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [descripcionTermino, setDescripcionTermino] = useState('Contestación a la demanda / Término probatorio');
  const [resumenCaso, setResumenCaso] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clienteAsignado = clientes.find((c) => c.id === clienteId) || clientes[0];

    const nuevo: Expediente = {
      id: `exp-${Date.now()}`,
      numeroCausa: numeroCausa.trim(),
      tipoProceso,
      titulo: titulo.trim(),
      materia,
      etapa,
      estado,
      clienteId: clienteAsignado.id,
      clienteNombre: clienteAsignado.nombre,
      clienteCodigoAcceso: clienteAsignado.codigoAcceso,
      contraparte: contraparte.trim(),
      abogadoResponsable,
      judicatura: judicatura.trim(),
      cuantia: Number(cuantia) || 0,
      honorariosPactados: Number(honorariosPactados) || 0,
      honorariosCobrados: Number(honorariosCobrados) || 0,
      fechaInicio: new Date().toISOString().split('T')[0],
      proximoTermino,
      descripcionTermino: descripcionTermino.trim(),
      resumenCaso: resumenCaso.trim() || 'Expediente legal aperturado en el despacho.',
      actuaciones: [
        {
          id: `act-init-${Date.now()}`,
          fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
          tipo: 'Escrito Presentado',
          titulo: 'Ingreso e inicio de patrocinio legal',
          resumen: 'Se apertura el expediente en el despacho jurídico.',
          resumenParaCliente: 'El despacho inició la representación formal y apertura del expediente.',
          abogado: abogadoResponsable,
        },
      ],
    };

    onGuardar(nuevo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-white max-w-2xl w-full border-2 border-black actio-shadow overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabecera Arquitectónica ACTIO LEGIS */}
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-black uppercase px-2 py-0.5 bg-white text-black">
              ACTIO LEGIS
            </span>
            <h2 className="font-bold text-base text-white font-display uppercase tracking-wide">
              Registrar Nuevo Juicio o Trámite Legal
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Proceso
              </label>
              <select
                value={tipoProceso}
                onChange={(e) => setTipoProceso(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Juicio Judicial">Juicio Judicial (SATJE / Tribunales)</option>
                <option value="Trámite Administrativo">Trámite Administrativo (SRI / SERCOP / Ministerios)</option>
                <option value="Trámite Notarial / Societario">Trámite Notarial / Societario / Registral</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número de Causa / Expediente
              </label>
              <input
                type="text"
                required
                value={numeroCausa}
                onChange={(e) => setNumeroCausa(e.target.value)}
                placeholder="Ej: 17230-2024-00999"
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Carátula / Título del Caso
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Juicio Ordinario de Prescripción Extraordinaria Adquisitiva"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cliente Patrocinado
              </label>
              <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} (Código: {c.codigoAcceso})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraparte / Demandado
              </label>
              <input
                type="text"
                required
                value={contraparte}
                onChange={(e) => setContraparte(e.target.value)}
                placeholder="Nombre de la contraparte o institución"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Materia Legal
              </label>
              <select
                value={materia}
                onChange={(e) => setMateria(e.target.value as MateriaLegal)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Civil y Mercantil">Civil y Mercantil</option>
                <option value="Laboral">Laboral</option>
                <option value="Societario y Corporativo">Societario y Corporativo</option>
                <option value="Constitucional">Constitucional</option>
                <option value="Penal">Penal</option>
                <option value="Tributario y Aduanero">Tributario y Aduanero</option>
                <option value="Contencioso Administrativo">Contencioso Administrativo</option>
                <option value="Trámite Notarial y Registral">Trámite Notarial y Registral</option>
                <option value="Familia y Niñez">Familia y Niñez</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Etapa Procesal
                </label>
                <span className="text-[10px] text-amber-600 font-medium">Opcional al inicio</span>
              </div>
              <select
                value={etapa}
                onChange={(e) => setEtapa(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="">-- Sin etapa asignada (Apertura inicial) --</option>
                <option value="Calificación de Demanda">Calificación de Demanda</option>
                <option value="Citación Judicial">Citación Judicial</option>
                <option value="Término para Contestar">Término para Contestar</option>
                <option value="Audiencia Preliminar">Audiencia Preliminar</option>
                <option value="Fase Probatoria">Fase Probatoria</option>
                <option value="Audiencia de Juicio">Audiencia de Juicio</option>
                <option value="Sentencia de Primera Instancia">Sentencia de Primera Instancia</option>
                <option value="Recurso de Apelación">Recurso de Apelación</option>
                <option value="Ejecución / Mandamiento de Pago">Ejecución / Mandamiento de Pago</option>
                <option value="Concluido / Archivado">Concluido / Archivado</option>
              </select>
              <p className="text-[10px] text-slate-400 mt-1">
                Puede dejarse en blanco al aperturar y asignarse o editarse más adelante.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estado del Expediente
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="En Trámite">En Trámite</option>
                <option value="Audiencia Fijada">Audiencia Fijada</option>
                <option value="En Término Fatal">En Término Fatal</option>
                <option value="Sentencia Favorable">Sentencia Favorable</option>
                <option value="En Apelación">En Apelación</option>
                <option value="Concluido">Concluido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judicatura / Juzgado / Dependencia
              </label>
              <input
                type="text"
                required
                value={judicatura}
                onChange={(e) => setJudicatura(e.target.value)}
                placeholder="Ej: Unidad Judicial Civil con sede en Iñaquito, Quito"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Abogado Responsable
              </label>
              <input
                type="text"
                required
                value={abogadoResponsable}
                onChange={(e) => setAbogadoResponsable(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cuantía en Litigio ($ USD)
              </label>
              <input
                type="number"
                min="0"
                value={cuantia}
                onChange={(e) => setCuantia(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Honorarios Pactados ($ USD)
              </label>
              <input
                type="number"
                min="0"
                value={honorariosPactados}
                onChange={(e) => setHonorariosPactados(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Honorarios Cobrados ($ USD)
              </label>
              <input
                type="number"
                min="0"
                value={honorariosCobrados}
                onChange={(e) => setHonorariosCobrados(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Próximo Término o Vencimiento Fatal
              </label>
              <input
                type="date"
                value={proximoTermino}
                onChange={(e) => setProximoTermino(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detalle del Término
              </label>
              <input
                type="text"
                value={descripcionTermino}
                onChange={(e) => setDescripcionTermino(e.target.value)}
                placeholder="Ej: Término de 3 días para contestar reconvención"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Resumen de los Hechos y Estrategia
            </label>
            <textarea
              rows={3}
              value={resumenCaso}
              onChange={(e) => setResumenCaso(e.target.value)}
              placeholder="Describa brevemente el objeto del litigio o trámite..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              Guardar Expediente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
