import React, { useEffect } from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { Play, Square, RefreshCw, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PanelControl() {
  const { 
    laboratorioId,
    temperatura, setTemperatura,
    tiempo, setTiempo,
    velocidadAgitacion, setVelocidadAgitacion,
    masaSoluto, setMasaSoluto,
    volumenEnraseOffset, setVolumenEnraseOffset,
    volumenBaseBureta, setVolumenBaseBureta,
    ejecutando, setEjecutando,
    resultadoQuimico,
    setFaseActual
  } = useWorkbench();

  // Temporizador de reacción en vivo
  useEffect(() => {
    let interval;
    if (ejecutando) {
      interval = setInterval(() => {
        setTiempo((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [ejecutando, setTiempo]);

  // Si se completa la reacción con éxito, lanzar celebración confetti
  useEffect(() => {
    if (resultadoQuimico?.success || (resultadoQuimico?.progresoEspejoPct >= 95)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [resultadoQuimico]);

  const handleIniciar = () => {
    setEjecutando(true);
    setFaseActual(4); // Pasar a fase 4: Ejecución
  };

  const handleDetener = () => {
    setEjecutando(false);
  };

  return (
    <div className="col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-xl">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          Controles Analógicos y Parámetros Estequiométricos
        </h3>
        <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
          Fase 3: Configuración
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        {/* Controles específicos del laboratorio de Molaridad */}
        {laboratorioId === 'lab_molaridad' && (
          <>
            <div>
              <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                <span>Masa CuSO₄·5H₂O:</span>
                <span className="text-sky-400 font-mono">{masaSoluto.toFixed(3)} g</span>
              </label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.05"
                value={masaSoluto}
                onChange={(e) => setMasaSoluto(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <span className="text-[10px] text-slate-500 block mt-0.5">Ideal 0.1 M: 6.242 g</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
                <span>Offset Enrase (Menisco):</span>
                <span className="text-sky-400 font-mono">{volumenEnraseOffset > 0 ? `+${volumenEnraseOffset}` : volumenEnraseOffset} mL</span>
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={volumenEnraseOffset}
                onChange={(e) => setVolumenEnraseOffset(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <span className="text-[10px] text-slate-500 block mt-0.5">0.0 mL = Aforo perfecto</span>
            </div>
          </>
        )}

        {/* Controles específicos del laboratorio de Titulación */}
        {laboratorioId === 'lab_titulacion' && (
          <div>
            <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
              <span>Volumen NaOH (Bureta):</span>
              <span className="text-sky-400 font-mono">{volumenBaseBureta.toFixed(1)} mL</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={volumenBaseBureta}
              onChange={(e) => setVolumenBaseBureta(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <span className="text-[10px] text-slate-500 block mt-0.5">Equivalencia teórica: 80.0 mL</span>
          </div>
        )}

        {/* Controles generales (Temperatura & Agitación) */}
        <div>
          <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
            <span>Temperatura Placa:</span>
            <span className="text-rose-400 font-mono">{temperatura}°C</span>
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="1"
            value={temperatura}
            onChange={(e) => setTemperatura(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 flex justify-between mb-1">
            <span>Agitación Magnética:</span>
            <span className="text-sky-400 font-mono">{velocidadAgitacion} RPM</span>
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={velocidadAgitacion}
            onChange={(e) => setVelocidadAgitacion(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>

        {/* Botones de Acción del Sistema */}
        <div className="flex items-center gap-2 lg:col-span-1">
          <button
            onClick={handleIniciar}
            disabled={ejecutando}
            className="flex-1 py-2.5 px-3 bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 active:to-emerald-800 disabled:opacity-40 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-950 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Iniciar</span>
          </button>

          <button
            onClick={handleDetener}
            disabled={!ejecutando}
            className="flex-1 py-2.5 px-3 bg-gradient-to-b from-rose-600 to-rose-700 hover:from-rose-500 active:to-rose-800 disabled:opacity-40 text-white font-bold text-xs rounded-lg shadow-md shadow-rose-950 border border-rose-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Detener</span>
          </button>
        </div>
      </div>
    </div>
  );
}
