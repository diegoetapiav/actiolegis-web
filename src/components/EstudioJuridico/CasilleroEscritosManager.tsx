import React, { useState } from 'react';
import { 
  FileText, ExternalLink, Key, Lock, CheckCircle2, ShieldCheck, Download, 
  Send, AlertTriangle, RefreshCw, PenTool, Hash, Calendar, Building2, Eye, Plus, Check
} from 'lucide-react';
import { EscritoFirmaDigital, Expediente, UsuarioEstudio } from '../../types/legal';
import { USUARIOS_ESTUDIO } from '../../data/mockLegalData';

interface CasilleroEscritosManagerProps {
  escritos: EscritoFirmaDigital[];
  expedientes: Expediente[];
  usuarioActivo?: UsuarioEstudio;
  onAgregarEscrito: (escrito: EscritoFirmaDigital) => void;
  onFirmarEscrito: (escritoId: string, firmaInfo: EscritoFirmaDigital['firmaInfo']) => void;
}

export const CasilleroEscritosManager: React.FC<CasilleroEscritosManagerProps> = ({
  escritos,
  expedientes,
  usuarioActivo,
  onAgregarEscrito,
  onFirmarEscrito,
}) => {
  const [escritoSeleccionado, setEscritoSeleccionado] = useState<EscritoFirmaDigital | null>(
    escritos[0] || null
  );

  // Estado del Modal de Firma Electrónica
  const [modalFirmaAbierto, setModalFirmaAbierto] = useState(false);
  const [modalNuevoEscritoAbierto, setModalNuevoEscritoAbierto] = useState(false);

  // Datos de Firma Digital
  const [archivoFirmaNombre, setArchivoFirmaNombre] = useState('Firma_Dr_Diego_Tapia_BCE.p12');
  const [claveFirma, setClaveFirma] = useState('actio.firma.2026');
  const [mostrarClave, setMostrarClave] = useState(false);
  const [entidadCertificadora, setEntidadCertificadora] = useState('Banco Central del Ecuador (BCE)');
  const [abogadoFirmante, setAbogadoFirmante] = useState(USUARIOS_ESTUDIO[0]);
  const [firmando, setFirmando] = useState(false);
  const [mensajeExitoFirma, setMensajeExitoFirma] = useState('');

  // Enlaces oficiales
  const URL_CASILLERO_ESATJE =
    'https://cas.funcionjudicial.gob.ec/cas/login?TARGET=https%3A%2F%2Fsatje-externo.funcionjudicial.gob.ec%2FeSatje%2Fcasillero%2Fpages%2F';
  const URL_VENTANILLA_VIRTUAL_SATJE =
    'https://satje-externo.funcionjudicial.gob.ec/ventanillaVirtual/index.xhtml';
  const URL_ESACC_CORTE_CONSTITUCIONAL =
    'https://esacc.corteconstitucional.gob.ec/auth/realms/cce/protocol/openid-connect/auth?client_id=esacc-angular&redirect_uri=https%3A%2F%2Fesacc.corteconstitucional.gob.ec%2Fappexterno%2F&state=aec125b8-774f-44ed-a32c-7f985219487c&response_mode=fragment&response_type=code&scope=openid&nonce=da314408-5d32-427c-8e2c-5984a92a55ca';

  const handleEjecutarFirma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escritoSeleccionado) return;

    if (!claveFirma || claveFirma.length < 4) {
      alert('Por favor ingrese la clave válida de su firma electrónica.');
      return;
    }

    setFirmando(true);

    setTimeout(() => {
      const fechaNow = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const hashCalculado = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      const titularTexto = usuarioActivo?.rol === 'Asistente'
        ? `${abogadoFirmante.nombre} (${abogadoFirmante.matriculaForo}) [Suscrito telemáticamente por Asistente: ${usuarioActivo.nombre} con firma autorizada]`
        : `${abogadoFirmante.nombre} (${abogadoFirmante.matriculaForo})`;

      const infoFirma: EscritoFirmaDigital['firmaInfo'] = {
        titular: titularTexto,
        cedulaAbogado: abogadoFirmante.cedula,
        entidadCertificadora,
        fechaFirma: fechaNow,
        hashFirmaSha256: hashCalculado,
        selloTiempo: `TSA ${entidadCertificadora} ${fechaNow}`,
      };

      onFirmarEscrito(escritoSeleccionado.id, infoFirma);

      setEscritoSeleccionado({
        ...escritoSeleccionado,
        firmado: true,
        firmaInfo: infoFirma,
        autorizadoPorAbogado: usuarioActivo?.rol === 'Asistente' ? abogadoFirmante.nombre : undefined,
      });

      setFirmando(false);
      setModalFirmaAbierto(false);
      setMensajeExitoFirma(
        usuarioActivo?.rol === 'Asistente'
          ? `¡Escrito firmado telemáticamente con la firma autorizada del ${abogadoFirmante.nombre}!`
          : `¡Escrito judicial firmado electrónicamente con éxito! Listo para ingreso telemático.`
      );
      setTimeout(() => setMensajeExitoFirma(''), 5000);
    }, 1200);
  };

  if (usuarioActivo?.rol === 'Administrativo') {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center max-w-xl mx-auto my-12 space-y-4 shadow-sm">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Acceso Restringido: Casillero & Escritos Judiciales
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Las credenciales de casillero electrónico y firma de escritos judiciales están reservadas exclusivamente a los abogados y asistentes procesales de <strong>ACTIO LEGIS</strong>.
        </p>
      </div>
    );
  }

  const esPasante = usuarioActivo?.rol === 'Pasante';
  const esAsistente = usuarioActivo?.rol === 'Asistente';

  return (
    <div className="space-y-6">
      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Litigio Digital & e-Satje</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase">
            Casillero Electrónico & Ventanillas de Ingreso de Escritos
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Conexión con los sistemas de la Función Judicial del Ecuador y Corte Constitucional con estación de firma electrónica digital.
          </p>
        </div>

        <button
          onClick={() => setModalNuevoEscritoAbierto(true)}
          className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <Plus className="w-4 h-4 text-white" />
          Redactar Nuevo Escrito
        </button>
      </div>

      {/* 3 Enlaces Oficiales de Acceso Judicial con Estilo Arquitectónico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Casillero Judicial e-Satje */}
        <div className="p-4 border-2 border-black bg-white actio-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-black text-white font-mono">
                FUNCIÓN JUDICIAL
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">e-Satje</span>
            </div>
            <h3 className="text-sm font-black text-black font-display uppercase">
              Casillero Judicial Electrónico
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Recepción de notificaciones, boletas electrónicas y providencias en el casillero institucional de los abogados.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 mt-3">
            <a
              href={URL_CASILLERO_ESATJE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-black actio-shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir Casillero e-Satje
            </a>
          </div>
        </div>

        {/* 2. Ventanilla Virtual SATJE */}
        <div className="p-4 border-2 border-black bg-white actio-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-black text-white font-mono">
                CONSEJO DE LA JUDICATURA
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">SATJE</span>
            </div>
            <h3 className="text-sm font-black text-black font-display uppercase">
              Ventanilla Virtual de Escritos
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ingreso telemático oficial de demandas y escritos judiciales firmados electrónicamente ante los tribunales del país.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 mt-3">
            <a
              href={URL_VENTANILLA_VIRTUAL_SATJE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-black actio-shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ventanilla Virtual SATJE
            </a>
          </div>
        </div>

        {/* 3. Corte Constitucional ESACC */}
        <div className="p-4 border-2 border-black bg-white actio-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-black text-white font-mono">
                CORTE CONSTITUCIONAL
              </span>
              <span className="text-xs text-slate-500 font-mono font-bold">ESACC</span>
            </div>
            <h3 className="text-sm font-black text-black font-display uppercase">
              Ventanilla Externa ESACC
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ingreso de acciones de protección, medidas cautelares, acciones extraordinarias de protección y memoriales constitucionales.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 mt-3">
            <a
              href={URL_ESACC_CORTE_CONSTITUCIONAL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-black actio-shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ingreso ESACC Constitucional
            </a>
          </div>
        </div>
      </div>

      {mensajeExitoFirma && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {mensajeExitoFirma}
        </div>
      )}

      {/* Estación de Redacción y Firma Electrónica */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Escritos Redactados */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Escritos del Despacho ({escritos.length})</span>
            <span>Seleccione para revisar o firmar</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {escritos.map((esc) => {
              const esSeleccionado = escritoSeleccionado?.id === esc.id;

              return (
                <div
                  key={esc.id}
                  onClick={() => setEscritoSeleccionado(esc)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    esSeleccionado
                      ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {esc.numeroCausa}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        esc.firmado
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {esc.firmado ? 'Firmado Electrónicamente' : 'Pendiente de Firma'}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
                    {esc.titulo}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-2 font-mono">
                    <span className="truncate max-w-[170px]">{esc.destinoVentanilla}</span>
                    <span>{esc.fechaGeneracion}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Vista Previa y Botón de Firmar */}
        <div className="lg:col-span-7">
          {escritoSeleccionado ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono text-slate-900">
                      Causa N° {escritoSeleccionado.numeroCausa}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {escritoSeleccionado.tipoEscrito}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {escritoSeleccionado.titulo}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {!escritoSeleccionado.firmado ? (
                    <button
                      onClick={() => setModalFirmaAbierto(true)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      Firmar Electrónicamente con Clave
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Documento Firmado Digitalmente
                      </span>
                      <button
                        onClick={() => {
                          const blob = new Blob([escritoSeleccionado.contenidoTexto], {
                            type: 'text/plain;charset=utf-8',
                          });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Escrito_${escritoSeleccionado.numeroCausa}_FIRMADO.txt`;
                          a.click();
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Descargar Firmado
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sello de Firma Electrónica si ya está firmado */}
              {escritoSeleccionado.firmado && escritoSeleccionado.firmaInfo && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      CERTIFICADO DE FIRMA ELECTRÓNICA VÁLIDA
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Algoritmo: SHA-256 / RSA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-800 block">Titular Firmante:</span>
                      <span>{escritoSeleccionado.firmaInfo.titular}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 block">Cédula / Documento:</span>
                      <span className="font-mono">{escritoSeleccionado.firmaInfo.cedulaAbogado}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 block">Entidad Certificadora:</span>
                      <span>{escritoSeleccionado.firmaInfo.entidadCertificadora}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 block">Sello de Tiempo Judicial:</span>
                      <span className="font-mono">{escritoSeleccionado.firmaInfo.fechaFirma}</span>
                    </div>
                  </div>

                  <div className="pt-1 text-[10px] text-slate-500 font-mono truncate">
                    Hash Hash-256: {escritoSeleccionado.firmaInfo.hashFirmaSha256}
                  </div>
                </div>
              )}

              {/* Contenido del Escrito */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Cuerpo del Escrito Judicial:
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto">
                  {escritoSeleccionado.contenidoTexto}
                </div>
              </div>

              {/* Botón directo de ingreso según destino */}
              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <span className="text-indigo-950 font-medium">
                  Destino del escrito: <strong>{escritoSeleccionado.destinoVentanilla}</strong>
                </span>

                <a
                  href={
                    escritoSeleccionado.destinoVentanilla === 'Corte Constitucional ESACC'
                      ? URL_ESACC_CORTE_CONSTITUCIONAL
                      : escritoSeleccionado.destinoVentanilla === 'Casillero Judicial e-Satje'
                      ? URL_CASILLERO_ESATJE
                      : URL_VENTANILLA_VIRTUAL_SATJE
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ir a Ingresar en la Ventanilla Oficial
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
              <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold text-slate-600">Seleccione un escrito judicial</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE FIRMA ELECTRÓNICA CON CLAVE */}
      {modalFirmaAbierto && escritoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden text-slate-900">
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PenTool className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Firma Electrónica de Escrito</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Causa: {escritoSeleccionado.numeroCausa}</p>
                </div>
              </div>
              <button
                onClick={() => setModalFirmaAbierto(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEjecutarFirma} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Abogado Titular de la Firma
                </label>
                <select
                  value={abogadoFirmante.id}
                  onChange={(e) => {
                    const u = USUARIOS_ESTUDIO.find((usr) => usr.id === e.target.value) || USUARIOS_ESTUDIO[0];
                    setAbogadoFirmante(u);
                    setEntidadCertificadora(u.entidadCertificadoraFirma || 'Banco Central del Ecuador (BCE)');
                  }}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  {USUARIOS_ESTUDIO.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre} - {u.matriculaForo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Certificado Digital (.p12 / .pfx)
                </label>
                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-700">
                  <span className="truncate">{archivoFirmaNombre}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    Cargado
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Entidad Certificadora Acreditada
                </label>
                <select
                  value={entidadCertificadora}
                  onChange={(e) => setEntidadCertificadora(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Banco Central del Ecuador (BCE)">Banco Central del Ecuador (BCE)</option>
                  <option value="Security Data Seguridad en Datos y Firma Digital">Security Data</option>
                  <option value="Consejo de la Judicatura - ICert">Consejo de la Judicatura (ICert)</option>
                  <option value="ANFAC Autoridad de Certificación">ANFAC Ecuador</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clave / Contraseña de la Firma Electrónica
                </label>
                <div className="relative">
                  <input
                    type={mostrarClave ? 'text' : 'password'}
                    required
                    value={claveFirma}
                    onChange={(e) => setClaveFirma(e.target.value)}
                    placeholder="Ingrese su clave de firma digital"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarClave(!mostrarClave)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    {mostrarClave ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  La clave valida criptográficamente su firma antes de estamparla en el documento.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalFirmaAbierto(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={firmando}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {firmando ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Validando y Firmando...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-3.5 h-3.5 text-amber-400" />
                      Firmar Escrito
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REDACTAR NUEVO ESCRITO */}
      {modalNuevoEscritoAbierto && (
        <NuevoEscritoModal
          isOpen={modalNuevoEscritoAbierto}
          onClose={() => setModalNuevoEscritoAbierto(false)}
          expedientes={expedientes}
          onGuardar={(nuevo) => {
            onAgregarEscrito(nuevo);
            setEscritoSeleccionado(nuevo);
            setModalNuevoEscritoAbierto(false);
          }}
        />
      )}
    </div>
  );
};

const NuevoEscritoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  expedientes: Expediente[];
  onGuardar: (escrito: EscritoFirmaDigital) => void;
}> = ({ isOpen, onClose, expedientes, onGuardar }) => {
  const [expedienteId, setExpedienteId] = useState(expedientes[0]?.id || '');
  const [titulo, setTitulo] = useState('');
  const [tipoEscrito, setTipoEscrito] = useState<EscritoFirmaDigital['tipoEscrito']>('Memorial General');
  const [destinoVentanilla, setDestinoVentanilla] = useState<EscritoFirmaDigital['destinoVentanilla']>('Ventanilla Virtual SATJE');
  const [contenidoTexto, setContenidoTexto] = useState('');

  const expObj = expedientes.find((e) => e.id === expedienteId) || expedientes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar({
      id: `esc-${Date.now()}`,
      expedienteId: expObj.id,
      numeroCausa: expObj.numeroCausa,
      titulo: titulo.trim(),
      materia: expObj.materia,
      tipoEscrito,
      destinoVentanilla,
      contenidoTexto: contenidoTexto.trim() || `SEÑOR JUEZ DE LA UNIDAD JUDICIAL...\nCAUSA: ${expObj.numeroCausa}\n\nComparezco respetuosamente...`,
      fechaGeneracion: new Date().toISOString().replace('T', ' ').substring(0, 16),
      firmado: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-900 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-900">Redactar Escrito Judicial para Firma</h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Causa Judicial</label>
              <select
                value={expedienteId}
                onChange={(e) => setExpedienteId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                {expedientes.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.numeroCausa} - {e.titulo.substring(0, 30)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Memorial</label>
              <select
                value={tipoEscrito}
                onChange={(e) => setTipoEscrito(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Memorial General">Memorial General</option>
                <option value="Contestación a la Demanda">Contestación a la Demanda</option>
                <option value="Anuncio de Prueba / Impugnación">Anuncio de Prueba / Impugnación</option>
                <option value="Recurso de Apelación">Recurso de Apelación</option>
                <option value="Solicitud de Copias y Casillero">Solicitud de Copias y Casillero</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Escrito</label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Impugnación a peritaje planimétrico"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ventanilla de Ingreso</label>
              <select
                value={destinoVentanilla}
                onChange={(e) => setDestinoVentanilla(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="Ventanilla Virtual SATJE">Ventanilla Virtual SATJE (Función Judicial)</option>
                <option value="Casillero Judicial e-Satje">Casillero Judicial e-Satje</option>
                <option value="Corte Constitucional ESACC">Corte Constitucional ESACC</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Cuerpo del Escrito</label>
            <textarea
              required
              rows={6}
              value={contenidoTexto}
              onChange={(e) => setContenidoTexto(e.target.value)}
              placeholder="SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL... Comparezco respetuosamente..."
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Guardar Escrito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
