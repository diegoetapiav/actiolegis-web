import React, { useState } from 'react';
import { Building2, CalendarDays, ExternalLink, RefreshCw, Bot, Upload, Users, BookOpen, Trash2 } from 'lucide-react';
import { UsuarioSistema } from './LoginModal';

export const ModuloExpedientes: React.FC<any> = ({
  expedientes,
  setExpedientes,
  usuarioSesion,
  tabIntranet,
  setTabIntranet,
  onRegistrarAuditoria
}) => {
  const [syncState, setSyncState] = useState(false);

  // URL del feed privado oficial de ACTIO LEGIS para incrustación directa
  const GOOGLE_EMBED_URL = "https://calendar.google.com/calendar/embed?src=actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc%40group.calendar.google.com&ctz=America%2FGuayaquil&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&bgcolor=%23FAF9F6";

  const handleRefresh = () => {
    setSyncState(true);
    const iframe = document.getElementById('google-calendar-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setSyncState(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* CABECERA INTRANET */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            <Building2 className="w-3.5 h-3.5 text-neutral-900"/>
            <span>Intranet • {usuarioSesion?.rol?.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-neutral-950">Intranet ACTIO LEGIS</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-neutral-100/70 p-1 rounded-xl">
          <button type="button" onClick={() => setTabIntranet('expedientes')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'expedientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Expedientes & IA</button>
          <button type="button" onClick={() => setTabIntranet('clientes')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'clientes' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Directorio Clientes</button>
          <button type="button" onClick={() => setTabIntranet('citas')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'citas' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Google Calendar Inst.</button>
          <button type="button" onClick={() => setTabIntranet('gastos')} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${tabIntranet === 'gastos' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-600'}`}>Registrar Gastos</button>
        </div>
      </div>

      {/* TAB CALENDARIO CONECTADO EN TIEMPO REAL */}
      {tabIntranet === 'citas' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-neutral-950 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-neutral-900"/>
                <span>Google Calendar Institucional ACTIO LEGIS (Sincronización en Vivo)</span>
              </h3>
              <p className="text-xs font-mono text-neutral-500">ID: actiolegisec.com_fg4fihhbm5f4odqfhd4pbgfdtc@group.calendar.google.com</p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={handleRefresh}
                className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncState ? 'animate-spin' : ''}`} />
                <span>Actualizar Vista</span>
              </button>

              <a 
                href="https://calendar.google.com/calendar/u/0/r" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#281F26] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Abrir Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-300"/>
              </a>
            </div>
          </div>

          {/* VISOR DIRECTO OFICIAL SIN BLOQUEOS CORS */}
          <div className="w-full h-[650px] rounded-xl overflow-hidden border border-neutral-200 bg-[#FAF9F6]">
            <iframe 
              id="google-calendar-iframe"
              src={GOOGLE_EMBED_URL}
              style={{ border: 0, width: '100%', height: '100%' }}
              frameBorder="0" 
              scrolling="no"
              title="Google Calendar Institucional"
            />
          </div>
        </div>
      )}

    </div>
  );
};
