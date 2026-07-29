import React from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { useAuth } from '../../context/AuthContext';
import { Beaker, Shield, Activity, Award, LogOut, RefreshCw, UserCheck } from 'lucide-react';

export default function HeaderComponent() {
  const { laboratorioId, cambiarLaboratorio, faseActual, setFaseActual, eppCompletado, reiniciarSimulacion } = useWorkbench();
  const { currentUser, logout, loginWithRole } = useAuth();

  const laboratorios = [
    { id: 'lab_molaridad', title: '1. Molaridad CuSO₄', code: '5.Q.18' },
    { id: 'lab_titulacion', title: '2. Volumetría Ácido-Base', code: '6.Q.4' },
    { id: 'lab_tollens', title: '3. Espejo de Plata (Tollens)', code: '6.Q.16' },
  ];

  const fases = [
    { num: 1, label: '1. EPP / Bioseguridad' },
    { num: 2, label: '2. Ensamblaje' },
    { num: 3, label: '3. Parámetros' },
    { num: 4, label: '4. Reacción' },
    { num: 5, label: '5. Metacognición' },
  ];

  return (
    <header className="col-span-12 bg-slate-900 border-b border-slate-800 p-3 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Marca Institucional */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
            <Beaker className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-teal-200">
              VIRTUAL-STEM <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">BOLIVIA</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Demo Química • Blgo. Rodrigo Mariaca & Ing. Andrés Alberdi
            </p>
          </div>
        </div>

        {/* Selección de Laboratorios (Practicas Currículo Ley 070) */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-lg border border-slate-800">
          {laboratorios.map((lab) => (
            <button
              key={lab.id}
              onClick={() => cambiarLaboratorio(lab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                laboratorioId === lab.id
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md shadow-sky-900/50 border border-sky-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <span>{lab.title}</span>
              <span className="text-[10px] opacity-75 font-mono px-1 rounded bg-slate-900/60">
                {lab.code}
              </span>
            </button>
          ))}
        </div>

        {/* Perfil & Acciones de Rol */}
        <div className="flex items-center gap-2">
          {currentUser && (
            <div className="flex items-center gap-2 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-lg text-xs">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-slate-200 block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-sky-400 uppercase font-mono tracking-wider">{currentUser.role}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => loginWithRole('student')}
              title="Cambiar a Rol Estudiante"
              className={`px-2 py-1 text-[11px] font-bold rounded ${currentUser?.role === 'student' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Estudiante
            </button>
            <button
              onClick={() => loginWithRole('teacher')}
              title="Cambiar a Rol Profesor"
              className={`px-2 py-1 text-[11px] font-bold rounded ${currentUser?.role === 'teacher' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Docente
            </button>
            <button
              onClick={() => loginWithRole('investor')}
              title="Cambiar a Rol Inversionista / Embajada"
              className={`px-2 py-1 text-[11px] font-bold rounded ${currentUser?.role === 'investor' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Embajada US
            </button>
          </div>

          <button
            onClick={reiniciarSimulacion}
            title="Reiniciar Mesa de Trabajo"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Indicador de Flujo Pedagógico de 5 Fases */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>Fases Metacognitivas (Ley 070):</span>
        </div>
        <div className="flex items-center gap-1">
          {fases.map((fase) => {
            const isCompleted = fase.num < faseActual || (fase.num === 1 && eppCompletado);
            const isCurrent = fase.num === faseActual;
            return (
              <button
                key={fase.num}
                onClick={() => setFaseActual(fase.num)}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all border ${
                  isCurrent
                    ? 'bg-sky-600/30 text-sky-300 border-sky-500 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                    : 'bg-slate-950/40 text-slate-500 border-slate-850 hover:text-slate-300'
                }`}
              >
                {fase.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
