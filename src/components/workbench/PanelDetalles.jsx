import React from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { FileText, CheckCircle, AlertTriangle, BarChart2, ShieldAlert } from 'lucide-react';

export default function PanelDetalles() {
  const { laboratorioId, resultadoQuimico, setFaseActual, eppErroresCount } = useWorkbench();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-xl flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2.5 flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-400" />
            Resumen del Experimento
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            En Vivo
          </span>
        </h3>

        {/* Detalles del objetivo del laboratorio */}
        <div className="space-y-2 text-xs">
          {laboratorioId === 'lab_molaridad' && (
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Molaridad Calculada (M):</span>
              <div className="font-mono text-xl font-black text-sky-400">
                {resultadoQuimico?.molaridad ? resultadoQuimico.molaridad.toFixed(4) : '0.0000'} M
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>Objetivo Teórico:</span>
                <span className="font-mono text-slate-200">0.1000 M</span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Error Analítico:</span>
                <span className={`font-mono font-bold ${resultadoQuimico?.errorMolaridadPct < 1.5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {resultadoQuimico?.errorMolaridadPct ? resultadoQuimico.errorMolaridadPct.toFixed(2) : '100'}%
                </span>
              </div>
            </div>
          )}

          {laboratorioId === 'lab_titulacion' && (
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">pH Solución Matraz:</span>
              <div className="font-mono text-xl font-black text-rose-400">
                {resultadoQuimico?.pH ? resultadoQuimico.pH.toFixed(2) : '2.88'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>Estado Indicador:</span>
                <span className="font-medium text-slate-200">{resultadoQuimico?.estadoViraje || 'Incoloro'}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Neutralización:</span>
                <span className="font-mono text-sky-400">
                  {resultadoQuimico?.porcentajeNeutralizado ? resultadoQuimico.porcentajeNeutralizado.toFixed(0) : '0'}%
                </span>
              </div>
            </div>
          )}

          {laboratorioId === 'lab_tollens' && (
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Reflectividad Espejo:</span>
              <div className="font-mono text-xl font-black text-emerald-400">
                {resultadoQuimico?.reflectividadEspejo ? (resultadoQuimico.reflectividadEspejo * 100).toFixed(0) : '0'}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                <span>Secuencia Tollens:</span>
                <span className="font-medium text-slate-200">{resultadoQuimico?.validacion?.estado || 'Sin preparar'}</span>
              </div>
            </div>
          )}

          {/* Bioseguridad Registro */}
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-850 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Incidencias EPP:
            </span>
            <span className={`font-mono font-bold ${eppErroresCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {eppErroresCount} error(es)
            </span>
          </div>
        </div>
      </div>

      {/* Botón para Abrir Fase 5 Metacognición & Reporte */}
      <button
        onClick={() => setFaseActual(5)}
        className="mt-3 w-full py-2.5 px-3 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-sky-950 border border-sky-400/30 transition-all flex items-center justify-center gap-2"
      >
        <BarChart2 className="w-4 h-4" />
        <span>Abrir Reporte & Metacognición</span>
      </button>
    </div>
  );
}
