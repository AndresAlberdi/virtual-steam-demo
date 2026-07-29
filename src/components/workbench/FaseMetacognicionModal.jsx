import React, { useState } from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { useAuth } from '../../context/AuthContext';
import { Brain, Award, CheckCircle, Save, X } from 'lucide-react';

export default function FaseMetacognicionModal() {
  const { faseActual, setFaseActual, laboratorioId, resultadoQuimico, eppErroresCount, guardarReporteMetacognitivo } = useWorkbench();
  const { currentUser } = useAuth();

  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [enviado, setEnviado] = useState(false);

  if (faseActual !== 5) return null;

  // Cálculo del puntaje metacognitivo automatizado (100 pts base - penalizaciones)
  let baseScore = 100;
  if (eppErroresCount > 0) baseScore -= eppErroresCount * 15;
  if (resultadoQuimico?.errorMolaridadPct) {
    baseScore -= Math.min(resultadoQuimico.errorMolaridadPct * 3, 40);
  }
  const scoreFinal = Math.max(Math.round(baseScore), 20);

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarReporteMetacognitivo({ q1, q2 }, scoreFinal);
    setEnviado(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setFaseActual(4)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">FASE 5: ANÁLISIS METACOGNITIVO Y REPORTES</h2>
            <p className="text-xs text-slate-400">Evaluación Procesal Ley 070 • Sincronización Spark Offline</p>
          </div>
        </div>

        {enviado ? (
          <div className="my-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">¡Bitácora Sincronizada Exitosamente!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Tu reporte ha sido registrado en el almacenamiento local persistente (IndexedDB) y se transmitirá automáticamente a Firestore al detectar conexión.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 inline-block text-center font-mono">
              <span className="text-xs text-slate-400 block uppercase">Calificación Final Obtenida:</span>
              <span className="text-3xl font-black text-emerald-400">{scoreFinal} / 100 PTS</span>
            </div>
            <button
              onClick={() => setFaseActual(4)}
              className="block w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-xl transition-all"
            >
              Volver al Laboratorio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 my-4">
            {/* Resumen analítico automatizado */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block">Estudiante:</span>
                <span className="font-bold text-slate-200">{currentUser?.name || 'Estudiante Demo'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Laboratorio:</span>
                <span className="font-bold text-sky-400 uppercase">{laboratorioId.replace('lab_', '')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Incidencias EPP:</span>
                <span className={`font-bold ${eppErroresCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {eppErroresCount} error(es)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Puntaje Estimado:</span>
                <span className="font-bold text-emerald-400 font-mono">{scoreFinal} pts</span>
              </div>
            </div>

            {/* Preguntas de reflexión metacognitiva */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                1. ¿Qué causa provocó la diferencia entre tu resultado práctico y el valor estequiométrico ideal?
              </label>
              <textarea
                required
                rows={2}
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="Ejemplo: Desviación en el enrase del matraz por lectura incorrecta del menisco..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                2. ¿Cómo corregirías el procedimiento en un laboratorio físico real para evitar este error?
              </label>
              <textarea
                required
                rows={2}
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
                placeholder="Ejemplo: Usar una pipeta cuentagotas al acercarse a la línea de aforo..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-sky-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg border border-emerald-400/30 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y Transmitir Bitácora Metacognitiva</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
