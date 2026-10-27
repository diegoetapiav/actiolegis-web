import React from 'react';
import { Phone, Mail, ExternalLink, ArrowUp } from 'lucide-react';

interface FooterProps {
  setVista: (vista: 'sitio-web' | 'editorial' | 'equipo' | 'cliente' | 'intranet' | 'admin-console') => void;
  onAbrirModal: (tipo: 'intranet' | 'cliente' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ setVista, onAbrirModal }) => {
  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200 py-16 px-6 text-xs font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Columna 1: Marca & Logo */}
          <div className="space-y-4 md:col-span-1">
            <img 
              src="/logo-estudio.png" 
              alt="ACTIO LEGIS Consultores Jurídicos" 
              className="h-24 w-auto object-contain mix-blend-multiply cursor-pointer"
              onClick={() => setVista('sitio-web')}
            />
            <p className="text-neutral-500 text-xs leading-relaxed font-light">
              Estudio Jurídico en Guayaquil. Litigio penal y civil estratégicos, rigor procesal y asesoría corporativa.
            </p>
          </div>

          {/* Columna 2: Nuestra página */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
              Nuestra página
            </h4>
            <ul className="space-y-2 text-neutral-500 font-light">
              <li>
                <a 
                  href="#proposito" 
                  onClick={() => setVista('sitio-web')} 
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Propósito & Manifiesto
                </a>
              </li>
              <li>
                <a 
                  href="#socios" 
                  onClick={() => setVista('sitio-web')} 
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Quiénes somos
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => setVista('editorial')} 
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                >
                  Editorial Jurídica ACTIO LEGIS
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces de interés */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
              Enlaces de interés
            </h4>
            <ul className="space-y-2 text-neutral-500 font-light">
              <li>
                <button 
                  type="button" 
                  onClick={() => onAbrirModal('intranet')} 
                  className="hover:text-neutral-950 transition-colors text-left font-medium text-neutral-900 cursor-pointer"
                >
                  Intranet Abogados
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onAbrirModal('cliente')} 
                  className="hover:text-neutral-950 transition-colors text-left cursor-pointer"
                >
                  Portal Clientes
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onAbrirModal('admin')} 
                  className="hover:text-neutral-950 transition-colors text-left font-bold text-neutral-950 cursor-pointer"
                >
                  Consola Administrador
                </button>
              </li>
              <li>
                <a 
                  href="https://procesosjudiciales.funcionjudicial.gob.ec/busqueda" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-neutral-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Función Judicial SATJE</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Sede Guayaquil */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-950 text-xs uppercase tracking-[0.18em] font-mono">
              Sede Guayaquil
            </h4>
            <div className="space-y-2 text-neutral-500 text-xs font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                <span className="font-medium text-neutral-800 font-mono">+593 4 6005080</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
                <span>info@actiolegisec.com</span>
              </div>
              <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                Kennedy Norte, Alfonso Ortiz y José Castillo. Edificio Kennedy Office Center, piso 3, oficina 2.
              </p>
            </div>
          </div>

        </div>

        {/* Sub-pie */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
          <p>© {new Date().getFullYear()} ACTIO LEGIS. Todos los derechos reservados. Guayaquil, Ecuador.</p>
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
    </footer>
  );
};
