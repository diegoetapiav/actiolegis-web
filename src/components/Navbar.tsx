import React from 'react';
import { SesionUsuario } from '../services/storageService';

interface NavbarProps {
  sesion: SesionUsuario;
  tabActiva: string;
  onCambiarTab: (tab: string) => void;
  vistaActual: 'sitio-web' | 'intranet' | 'cliente';
  onCambiarVistaPrincipal: (vista: 'sitio-web' | 'intranet' | 'cliente') => void;
  onAbrirLogin: () => void;
  onAbrirLoginConTab: (tab: 'estudio' | 'cliente') => void;
  onAbrirReservarCita: () => void;
  onCerrarSesion: () => void;
  onAbrirSatje?: () => void;
  totalMensajesPendientes?: number;
  paleta?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ vistaActual }) => {
  // En el sitio web no se muestra esta barra para evitar duplicidad
  if (vistaActual === 'sitio-web') {
    return null;
  }

  return null;
};
