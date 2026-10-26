import React from 'react';
import { MapPin, Phone, Mail, ArrowUp, ExternalLink, Shield } from 'lucide-react';

interface BannerGuayaquilProps {
  onAbrirLoginClientes?: () => void;
  onAbrirLoginIntranet?: () => void;
  onAbrirReservarCita?: () => void;
}

export const BannerGuayaquil: React.FC<BannerGuayaquilProps> = ({
  onAbrirLoginClientes,
  onAbrirLoginIntranet,
  onAbrirReservarCita,
}) => {
  return (
    <div className="font-sans text-neutral-900 bg-[#FAF9F6]">
      
      {/* 1. SECCIÓN DE ATENCIÓN EN DESPACHO (FONDO CLARO EDITORIAL) */}
      <section id="contacto" className="py-20 md:py-24 bg-white border-t border-b border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 font-semibold">
                <Shield className="w-3.5 h-3.5 text-neutral-900" />
                <span>Atención Confidencial</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-snug">
                Confíe su causa a una defensa rigurosa.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Analizamos la viabilidad procesal de su situación jurídica con estricta reserva y prontitud técnica en nuestras oficinas de Puerto Santa Ana, Guayaquil, o por vía telemática.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={onAbrirReservarCita}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs text-center cursor-pointer"
              >
                Solicitar Reunión en Despacho
              </button>
              <button
                type="button"
                onClick={onAbrirLoginClientes}
                className="px-5 py-3.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-2xs"
              >
                Portal Clientes
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PIE DE PÁGINA EDITORIAL APROBADO (BLANCO / MARFIL) */}
      <footer className="bg-white text-neutral-900 border-t border-neutral-200/80 py-16 px-6 text-xs">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Columna 1: Logotipo en Placa 3D a la izquierda con eslogan oficial */}
            <div className="space-y-4 md:col-span-1">
              <div className="relative inline-block select-none py-1">
                <div className="absolute -right-1.5 -bottom-1.5 w-full h-full border-b-[4px] border-r-[4px] border-neutral-950 pointer-events-none" />
                <div className="relative px-4 py-2 bg-neutral-950 text-white flex flex-col items-center justify-center shadow-xs">
                  <span className="font-black text-sm tracking-[0.14em] leading-tight font-sans">
                    ACTIO
                  </span>
                  <span className="font-black text-sm tracking-[0.14em] leading-tight font-sans">
                    LEGIS
                  </span>
                </div>
              </div>

              <div className="text-[8.5px] uppercase tracking-[0.25em] font-medium font-sans text-neutral-500">
                en servicio del derecho
              </div>

              <p className="text-neutral-500 text-xs leading-relaxed pt-1 font-light">
                Firma jurídica boutique en Guayaquil. Litigio penal estratégico, rigor procesal, asesoría societaria y defensa forense en servicio del derecho.
              </p>
              
              <div className="flex items-center gap-2 text-[11px] text-neutral-800 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                <span>Puerto Santa Ana & Malecón Simón Bolívar, Guayaquil</span>
              </div>
            </div>

            {/* Columna 2: Línea Forense */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Línea Forense
              </h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li>
                  <a href="#proposito" className="hover:text-neutral-950 transition-colors">
                    Propósito & Manifiesto
                  </a>
                </li>
                <li>
                  <a href="#socios" className="hover:text-neutral-950 transition-colors">
                    Socios: Diego Tapia & Marcela Dunn
                  </a>
                </li>
                <li>
                  <a href="#practica" className="hover:text-neutral-950 transition-colors">
                    Defensa Penal Económica & Fraude
                  </a>
                </li>
                <li>
                  <a href="#practica" className="hover:text-neutral-950 transition-colors">
                    Arbitraje & Controversias Societarias
                  </a>
                </li>
                <li>
                  <a href="#editorial" className="hover:text-neutral-950 transition-colors">
                    Editorial Jurídico ACTIO LEGIS
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Plataformas Privadas */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Plataforma Privada
              </h4>
              <ul className="space-y-2 text-neutral-500 font-light">
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirLoginClientes}
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Portal Clientes (Causas & Pagos)
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirLoginIntranet}
                    className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                  >
                    Intranet de Litigantes
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={onAbrirReservarCita}
                    className="text-neutral-950 font-medium hover:underline text-left cursor-pointer"
                  >
                    Agendar Consulta Confidencial
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.funcionjudicial.gob.ec/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-neutral-950 transition-colors flex items-center gap-1.5"
                  >
                    <span>Función Judicial SATJE</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                </li>
                <li>
                  <span className="text-[11px] text-neutral-400 block pt-1 font-mono">
                    Sincronización SATJE en tiempo real
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 4: Atención Guayaquil */}
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
                Sede Guayaquil
              </h4>
              <div className="space-y-2 text-neutral-500 text-xs font-light">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span className="font-medium text-neutral-800 font-mono">+593 (4) 259-8800</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                  <span>contacto@actiolegisec.com</span>
                </div>
                <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                  Lunes a Viernes: 08:30 – 18:30 <br />
                  Guardia técnica para urgencias penales 24/7
                </p>
                <div className="pt-2 text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                  Puerto Santa Ana • Guayaquil
                </div>
              </div>
            </div>

          </div>

          {/* Sub-pie inferior formal */}
          <div className="pt-8 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
            <p>© {new Date().getFullYear()} ACTIO LEGIS. Todos los derechos reservados. Guayaquil, Ecuador.</p>
            <div className="flex items-center gap-4">
              <span>Firma Electrónica Válida</span>
              <span>•</span>
              <span>Ley de Comercio Electrónico</span>
              <span>•</span>
              <button 
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-neutral-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Subir al inicio</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
