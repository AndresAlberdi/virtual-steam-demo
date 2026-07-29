import React, { useState } from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { Activity, Grid, Zap } from 'lucide-react';

export default function InstrumentoAnalisis() {
  const { reaccionCompleta, ejecutando, resultadoQuimico, laboratorioId } = useWorkbench();
  const [displayInput, setDisplayInput] = useState('');

  const handleKeyPress = (key) => {
    if (key === 'CLR') setDisplayInput('');
    else if (key === 'ENT') {
      alert(`Comando espectrométrico enviado: ${displayInput || 'SCAN'}`);
      setDisplayInput('');
    } else if (key === 'ESC') setDisplayInput('');
    else if (displayInput.length < 8) setDisplayInput(prev => prev + key);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-xl flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          Cromatógrafo Analítico & Espectrómetro
        </h3>
        <span className="text-[10px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-850">
          UV-VIS 2026
        </span>
      </div>

      {/* Pantalla del Cromatógrafo / Visualizador de Picos Analíticos */}
      <div className="my-2 bg-slate-950 border border-slate-850 rounded-lg p-2 relative h-36 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Rejilla de Fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

        {ejecutando || resultadoQuimico ? (
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span>SCANNING SAMPLE #001</span>
              <span>LAMBDA: 540nm</span>
            </div>

            {/* Simulación del Pico del Cromatograma (SVG Path) */}
            <div className="w-full h-20 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                {/* Eje base */}
                <line x1="0" y1="55" x2="200" y2="55" stroke="#334155" strokeWidth="1" />

                {/* Curva de pico cromatográfico estequiométrico */}
                <path
                  d={
                    laboratorioId === 'lab_molaridad'
                      ? "M 0 55 Q 60 55 90 20 T 120 55 L 200 55"
                      : laboratorioId === 'lab_titulacion'
                      ? "M 0 55 L 70 55 Q 100 10 130 55 L 200 55"
                      : "M 0 55 L 50 55 Q 110 5 150 55 L 200 55"
                  }
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className="animate-pulse"
                />

                {/* Sombreado bajo la curva */}
                <path
                  d={
                    laboratorioId === 'lab_molaridad'
                      ? "M 0 55 Q 60 55 90 20 T 120 55 L 200 55 Z"
                      : laboratorioId === 'lab_titulacion'
                      ? "M 0 55 L 70 55 Q 100 10 130 55 L 200 55 Z"
                      : "M 0 55 L 50 55 Q 110 5 150 55 L 200 55 Z"
                  }
                  fill="rgba(16, 185, 129, 0.15)"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Pureza: <strong className="text-emerald-400">99.4%</strong></span>
              <span>Retención: <strong className="text-sky-400">2.4 min</strong></span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 text-xs font-mono">
            <Zap className="w-6 h-6 mb-1 opacity-50" />
            <span>Instrumento en Espera (Offline)</span>
          </div>
        )}
      </div>

      {/* Teclado Físico Digital de Control */}
      <div>
        <div className="bg-black/80 px-2 py-1 mb-2 rounded border border-slate-800 text-right font-mono text-xs text-emerald-400 h-6 flex items-center justify-end">
          {displayInput || '0.00'}
        </div>

        <div className="grid grid-cols-4 gap-1">
          {['7', '8', '9', 'CLR', '4', '5', '6', 'ENT', '1', '2', '3', 'ESC', '0', '.', '+', '-'].map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`py-1 rounded text-[10px] font-bold font-mono transition-colors shadow-sm ${
                key === 'ENT'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : key === 'CLR' || key === 'ESC'
                  ? 'bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800/60'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-750'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
