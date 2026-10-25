import React, { useState } from 'react';
import { 
  Users, ShieldCheck, UserPlus, KeyRound, CheckCircle2, XCircle, 
  Mail, Phone, Award, Scale, Lock, Eye, AlertTriangle, Briefcase, 
  Trash2, Edit3, Check, X, ShieldAlert, ArrowRight
} from 'lucide-react';
import { UsuarioEstudio, RolUsuarioEstudio } from '../../types/legal';

interface EquipoSociosManagerProps {
  usuarios: UsuarioEstudio[];
  usuarioActivo: UsuarioEstudio;
  onAgregarUsuario: (usuario: UsuarioEstudio) => void;
  onActualizarUsuario: (usuario: UsuarioEstudio) => void;
  onEliminarUsuario: (usuarioId: string) => void;
  onCambiarUsuarioSesion: (usuario: UsuarioEstudio) => void;
}

export const EquipoSociosManager: React.FC<EquipoSociosManagerProps> = ({
  usuarios,
  usuarioActivo,
  onAgregarUsuario,
  onActualizarUsuario,
  onEliminarUsuario,
  onCambiarUsuarioSesion,
}) => {
  const [modalNuevoAbierto, setModalNuevoAbierto] = useState(false);
  const [filtroRol, setFiltroRol] = useState<string>('todos');

  // Formulario nuevo miembro
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevoRol, setNuevoRol] = useState<RolUsuarioEstudio>('Abogado Asociado');
  const [nuevaCedula, setNuevaCedula] = useState('');
  const [nuevaMatricula, setNuevaMatricula] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');
  const [nuevoDepartamento, setNuevoDepartamento] = useState('Litigio General');
  const [nuevaTarifa, setNuevaTarifa] = useState('80');

  const esSocio = usuarioActivo.rol === 'Abogado Socio';

  const rolesDisponibles: RolUsuarioEstudio[] = [
    'Abogado Socio',
    'Abogado Asociado',
    'Pasante',
    'Asistente',
    'Administrativo',
  ];

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtroRol === 'todos') return true;
    return u.rol === filtroRol;
  });

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoEmail.trim()) return;

    let emailFinal = nuevoEmail.trim();
    if (!emailFinal.includes('@')) {
      emailFinal += '@actiolegisec.com';
    }

    const nuevo: UsuarioEstudio = {
      id: `usr-${Date.now()}`,
      nombre: nuevoNombre.trim(),
      email: emailFinal,
      rol: nuevoRol,
      tarifaHora: parseFloat(nuevaTarifa) || 50,
      cedula: nuevaCedula.trim() || '1700000000',
      matriculaForo: nuevaMatricula.trim() || undefined,
      puedeResponderConsultas: nuevoRol === 'Abogado Socio' || (nuevoRol === 'Abogado Asociado' && emailFinal !== 'info@actiolegisec.com'),
      puedeFirmarEscritos: nuevoRol === 'Abogado Socio' || nuevoRol === 'Abogado Asociado',
      activo: true,
      telefono: nuevoTelefono.trim() || '+593 99 000 0000',
      departamento: nuevoDepartamento.trim(),
    };

    onAgregarUsuario(nuevo);
    setModalNuevoAbierto(false);
    setNuevoNombre('');
    setNuevoEmail('');
    setNuevaCedula('');
    setNuevaMatricula('');
    setNuevoTelefono('');
  };

  const handleToggleEstadoActivo = (usuario: UsuarioEstudio) => {
    // Proteger las cuentas de Diego Tapia y Marela Dunn
    if (usuario.email === 'diego.tapia@actiolegisec.com' || usuario.email === 'marela.dunn@actiolegisec.com') {
      alert('Las cuentas principales de los Abogados Socios no pueden ser desactivadas.');
      return;
    }

    onActualizarUsuario({
      ...usuario,
      activo: !usuario.activo,
    });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white font-mono border border-black">
              ACTIO LEGIS
            </span>
            <span className="text-xs text-slate-500 font-mono">· Administración de Plataforma & Gobierno</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight font-display uppercase flex items-center gap-2.5">
            Administración del Equipo & Matriz de Roles
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-black text-white uppercase tracking-wider">
              Control Exclusivo Socios
            </span>
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Diego Tapia y Marela Dunn administran los accesos del despacho, asignación de roles, permisos de firma y buzones institucionales.
          </p>
        </div>

        {esSocio && (
          <button
            onClick={() => setModalNuevoAbierto(true)}
            className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-black actio-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <UserPlus className="w-4 h-4 text-white" />
            Vincular Nuevo Miembro
          </button>
        )}
      </div>

      {/* Alerta de Perfil Actual Arquitectónica */}
      <div className="p-4 border-2 border-black bg-white actio-shadow flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center text-white shrink-0 actio-shadow-sm">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{usuarioActivo.nombre}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-mono">
                {usuarioActivo.rol}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">{usuarioActivo.email}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {esSocio 
                ? 'Usted tiene control absoluto sobre la plataforma ACTIO LEGIS (modificar, generar, eliminar y auditar).'
                : 'Usted se encuentra en una cuenta con permisos restringidos según su función profesional.'}
            </p>
          </div>
        </div>

        {/* Simulador rápido de rol para pruebas */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            Probar como:
          </span>
          <select
            value={usuarioActivo.id}
            onChange={(e) => {
              const u = usuarios.find((usr) => usr.id === e.target.value);
              if (u) onCambiarUsuarioSesion(u);
            }}
            className="text-xs border border-slate-300 rounded px-2 py-1 bg-white font-medium text-slate-800"
          >
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} ({u.rol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Matriz de Roles y Atribuciones Oficiales de ACTIO LEGIS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Estructura Funcional de Cuentas Internas de ACTIO LEGIS
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Definición estricta de competencias por nivel jerárquico según las políticas del estudio
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Reglamento Interno 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
          {/* 1. Socios */}
          <div className="p-3.5 space-y-2 bg-amber-50/20">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>1. Abogados Socios</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Diego Tapia y Marela Dunn. <strong>Administradores totales</strong>. Cambiar, generar, modificar, eliminar, gestionar miembros y responder todo.
            </p>
            <div className="pt-2 text-[10px] text-amber-800 font-mono font-semibold">
              Permiso: TOTAL / ROOT
            </div>
          </div>

          {/* 2. Asociados */}
          <div className="p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>2. Abogados Asociados</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Responden <strong>únicamente</strong> a clientes asignados o agregados por ellos. Editan calendario, agendan citas y firman sus escritos.
            </p>
            <div className="pt-2 text-[10px] text-indigo-700 font-mono font-semibold">
              Permiso: CLIENTES ASIGNADOS
            </div>
          </div>

          {/* 3. Pasantes */}
          <div className="p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>3. Pasantes</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Acceso restringido para <strong>subir documentación</strong> y ordenar información (estados de trámites y procesos). Sin firma ni cobros.
            </p>
            <div className="pt-2 text-[10px] text-emerald-700 font-mono font-semibold">
              Permiso: ARCHIVO & ESTADOS
            </div>
          </div>

          {/* 4. Asistentes */}
          <div className="p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <KeyRound className="w-4 h-4 text-blue-600" />
              <span>4. Asistentes</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Suben escritos telemáticos <strong>con firma de abogado autorizado</strong> (no propia), escanean gastos y corrigen calendario.
            </p>
            <div className="pt-2 text-[10px] text-blue-700 font-mono font-semibold">
              Permiso: TRÁMITE TELEMÁTICO
            </div>
          </div>

          {/* 5. Administrativo */}
          <div className="p-3.5 space-y-2 bg-slate-50">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>5. Administrativo</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Solo suben gastos, escanean comprobantes y orden de honorarios. <strong>Sin acceso a nada de procesos</strong>. Buzón info@ no responde.
            </p>
            <div className="pt-2 text-[10px] text-rose-700 font-mono font-semibold">
              Permiso: FINANZAS / NO PROCESOS
            </div>
          </div>
        </div>
      </div>

      {/* Lista y Gestión de Miembros */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              Personal Vinculado a ACTIO LEGIS ({usuariosFiltrados.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-medium">Filtrar por rol:</label>
            <select
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800"
            >
              <option value="todos">Todos los Roles</option>
              {rolesDisponibles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Nombre & Correo Institucional</th>
                <th className="px-4 py-3">Rol en ACTIO LEGIS</th>
                <th className="px-4 py-3">Departamento / Matrícula</th>
                <th className="px-4 py-3">Atribución de Firma</th>
                <th className="px-4 py-3">Consultas de Clientes</th>
                <th className="px-4 py-3 text-center">Estado Acceso</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuariosFiltrados.map((u) => {
                const esDiegoOMarela =
                  u.email === 'diego.tapia@actiolegisec.com' || u.email === 'marela.dunn@actiolegisec.com';
                const esInfo = u.email === 'info@actiolegisec.com';

                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {u.nombre}
                        {esDiegoOMarela && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            Socio Administrador
                          </span>
                        )}
                        {esInfo && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                            Buzón Registro
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                        <span>{u.email}</span>
                        <span>·</span>
                        <span>C.I. {u.cedula}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          u.rol === 'Abogado Socio'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : u.rol === 'Abogado Asociado'
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                            : u.rol === 'Pasante'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : u.rol === 'Asistente'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}
                      >
                        {u.rol}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="text-slate-800">{u.departamento || 'Área General'}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {u.matriculaForo || 'Sin matrícula (Asistencia/Admin)'}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {u.puedeFirmarEscritos ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Firma Propia (.p12)
                        </span>
                      ) : u.rol === 'Asistente' ? (
                        <span className="text-blue-700 font-semibold flex items-center gap-1">
                          <KeyRound className="w-3.5 h-3.5" />
                          Usa Firma de Abogado
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          No Habilitado
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      {esInfo ? (
                        <span className="text-rose-600 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          No responde (Solo Registro)
                        </span>
                      ) : u.rol === 'Abogado Socio' ? (
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Responde Todos
                        </span>
                      ) : u.rol === 'Abogado Asociado' ? (
                        <span className="text-indigo-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Solo Clientes Asignados
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Sin Acceso
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          u.activo
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {u.activo ? 'ACTIVO' : 'SUSPENDIDO'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      {esSocio && !esDiegoOMarela && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleEstadoActivo(u)}
                            className={`px-2 py-1 text-[11px] rounded font-semibold transition-colors ${
                              u.activo
                                ? 'text-rose-600 hover:bg-rose-50'
                                : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={u.activo ? 'Suspender acceso a la web ACTIO LEGIS' : 'Reactivar acceso'}
                          >
                            {u.activo ? 'Desactivar' : 'Activar'}
                          </button>

                          <button
                            onClick={() => onCambiarUsuarioSesion(u)}
                            className="px-2 py-1 text-[11px] text-indigo-600 hover:bg-indigo-50 rounded font-semibold transition-colors"
                            title="Ver plataforma como este usuario"
                          >
                            Simular &rarr;
                          </button>
                        </div>
                      )}
                      {esDiegoOMarela && (
                        <span className="text-[11px] text-slate-400 italic">Socio Vitalicio</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuevo Miembro */}
      {modalNuevoAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-700/50 overflow-hidden text-slate-900">
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  Vincular Nuevo Miembro a ACTIO LEGIS
                </h3>
                <p className="text-[11px] text-slate-400">
                  Defina el rol y permisos de acceso para la intranet del despacho
                </p>
              </div>
              <button
                onClick={() => setModalNuevoAbierto(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearUsuario} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre Completo y Título
                </label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="Ej: Abg. Carlos Vivanco"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    required
                    value={nuevoEmail}
                    onChange={(e) => setNuevoEmail(e.target.value)}
                    placeholder="carlos.vivanco@actiolegisec.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rol Funcional
                  </label>
                  <select
                    value={nuevoRol}
                    onChange={(e) => setNuevoRol(e.target.value as RolUsuarioEstudio)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {rolesDisponibles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cédula de Identidad
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevaCedula}
                    onChange={(e) => setNuevaCedula(e.target.value)}
                    placeholder="1712345678"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Matrícula Foro (Opcional)
                  </label>
                  <input
                    type="text"
                    value={nuevaMatricula}
                    onChange={(e) => setNuevaMatricula(e.target.value)}
                    placeholder="FORO-PCH-18920"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Departamento / Área
                  </label>
                  <input
                    type="text"
                    value={nuevoDepartamento}
                    onChange={(e) => setNuevoDepartamento(e.target.value)}
                    placeholder="Ej: Litigio Tributario"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono Móvil
                  </label>
                  <input
                    type="text"
                    value={nuevoTelefono}
                    onChange={(e) => setNuevoTelefono(e.target.value)}
                    placeholder="+593 99 123 4567"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-semibold block text-slate-800">
                  Permisos automáticos para rol '{nuevoRol}':
                </span>
                {nuevoRol === 'Abogado Socio' && (
                  <span>• Acceso absoluto (admin, expedientes, firma, finanzas, usuarios).</span>
                )}
                {nuevoRol === 'Abogado Asociado' && (
                  <span>• Puede responder a sus clientes asignados, agendar citas y firmar escritos propios.</span>
                )}
                {nuevoRol === 'Pasante' && (
                  <span>• Solo sube documentación y actualiza estados de expedientes. Sin firma ni honorarios.</span>
                )}
                {nuevoRol === 'Asistente' && (
                  <span>• Puede subir escritos telemáticos usando la firma del abogado autorizado, escanear gastos y corregir calendario.</span>
                )}
                {nuevoRol === 'Administrativo' && (
                  <span>• Solo gastos, comprobantes y orden de honorarios. Sin acceso a litigios ni causas.</span>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalNuevoAbierto(false)}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Registrar en ACTIO LEGIS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
