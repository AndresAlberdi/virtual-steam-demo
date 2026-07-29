import React from 'react';
import { WorkbenchProvider } from '../../context/WorkbenchContext';
import HeaderComponent from './HeaderComponent';
import SidebarMateriales from './SidebarMateriales';
import CanvasSimulacion from './CanvasSimulacion';
import PanelControl from './PanelControl';
import PanelDetalles from './PanelDetalles';
import InstrumentoAnalisis from './InstrumentoAnalisis';
import FaseEPPModal from './FaseEPPModal';
import FaseMetacognicionModal from './FaseMetacognicionModal';

function WorkbenchContent() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between p-2 md:p-4 selection:bg-sky-500 selection:text-white">
      {/* Grid General Responsivo de 12 Columnas */}
      <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto w-full">
        {/* 1. HeaderComponent (col-12) */}
        <HeaderComponent />

        {/* Modal Interactivo de Bioseguridad EPP (Fase 1) */}
        <FaseEPPModal />

        {/* Modal Interactivo Metacognitivo (Fase 5) */}
        <FaseMetacognicionModal />

        {/* 2. Barra Lateral Izquierda: Reactivos y Vidriería (col-3) */}
        <SidebarMateriales />

        {/* 3. Área Central: Visor Canvas y Sliders de Control (col-6) */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-3">
          <CanvasSimulacion />
          <PanelControl />
        </div>

        {/* 4. Columna Derecha: Reportes e Instrumentación Analítica (col-3) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
          <PanelDetalles />
          <InstrumentoAnalisis />
        </div>
      </div>

      {/* Footer Institucional */}
      <footer className="mt-4 text-center text-[10px] text-slate-500 font-mono py-2 border-t border-slate-900">
        Virtual STEAM Demo • Desarrollado por Andrés Alberdi (UMSA) & Blgo. Rodrigo Mariaca • Alianza Fe y Alegría Bolivia & Embajada de EE. UU. (PD-LA PAZ-FY26-01)
      </footer>
    </div>
  );
}

export default function WorkbenchView() {
  return (
    <WorkbenchProvider>
      <WorkbenchContent />
    </WorkbenchProvider>
  );
}
