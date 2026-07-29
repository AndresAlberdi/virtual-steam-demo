import React from 'react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Beaker, ShieldCheck, GraduationCap, BarChart3, Award } from 'lucide-react';

export default function LoginView() {
  const { loginWithRole, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    loginWithRole(role);
    if (role === 'student') navigate('/student/workbench');
    else if (role === 'teacher') navigate('/teacher/analytics');
    else if (role === 'investor' || role === 'supervisor') navigate('/investor/impact');
    else navigate('/student/workbench');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Luz radial de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/30 mb-3">
            <Beaker className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-teal-200">
            VIRTUAL STEAM DEMO
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma de Simulación Científica y Educación Técnica • Ley 070 Bolivia
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-sky-400 block text-center mb-2">
            Selecciona tu Perfil de Acceso (RBAC):
          </label>

          <button
            onClick={() => handleSelectRole('student')}
            className="w-full p-3 bg-gradient-to-r from-slate-850 to-slate-900 hover:from-sky-950 hover:to-slate-850 border border-slate-800 hover:border-sky-500 rounded-xl transition-all text-left flex items-center gap-3 group shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-sky-300">Estudiante (6to Secundaria)</div>
              <div className="text-[11px] text-slate-400">Acceso directo al Workbench de Química 3D</div>
            </div>
          </button>

          <button
            onClick={() => handleSelectRole('teacher')}
            className="w-full p-3 bg-gradient-to-r from-slate-850 to-slate-900 hover:from-emerald-950 hover:to-slate-850 border border-slate-800 hover:border-emerald-500 rounded-xl transition-all text-left flex items-center gap-3 group shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-emerald-300">Docente (Fe y Alegría)</div>
              <div className="text-[11px] text-slate-400">Dashboard de Aula & KPIs de Bioseguridad</div>
            </div>
          </button>

          <button
            onClick={() => handleSelectRole('investor')}
            className="w-full p-3 bg-gradient-to-r from-slate-850 to-slate-900 hover:from-amber-950 hover:to-slate-850 border border-slate-800 hover:border-amber-500 rounded-xl transition-all text-left flex items-center gap-3 group shadow-md"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">Embajada EE. UU. / Inversionista</div>
              <div className="text-[11px] text-slate-400">Métricas SROI, Cobertura 20.2% Rural & Impacto</div>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <span className="text-[10px] text-slate-500 font-mono">
            Firebase Project: <strong className="text-sky-400">virtual-steam-demo</strong> (Spark Always Free)
          </span>
        </div>
      </div>
    </div>
  );
}
