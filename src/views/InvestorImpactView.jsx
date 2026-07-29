import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Landmark, ArrowLeft, Globe2, ShieldCheck, Sparkles, TrendingUp, HardDriveDownload } from 'lucide-react';

export default function InvestorImpactView() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Inversionistas / Embajada */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/student/workbench')}
              className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-300 to-emerald-300">
                INVESTOR IMPACT & SOCIAL SROI DASHBOARD
              </h1>
              <p className="text-xs text-slate-400">
                Grant Compliance Report • US Embassy La Paz (PD-LA PAZ-FY26-01)
              </p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-800/60 flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span>US Embassy Partner</span>
          </div>
        </div>

        {/* Métricas Clave de Impacto Social */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Estudiantes Meta</span>
              <Globe2 className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-400 font-mono">2,500 Alumnos</div>
            <span className="text-[10px] text-slate-500">6.º de Secundaria en Bolivia</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Mitigación Brecha Rural</span>
              <HardDriveDownload className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">20.2% Cobertura</div>
            <span className="text-[10px] text-emerald-500/80">Kits USB Offline "0% Data Cost"</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">SROI Social</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">4.8x Retorno</div>
            <span className="text-[10px] text-slate-500">Retorno Social de Inversión</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Costo de Operación Nube</span>
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-400 font-mono">$0.00 USD</div>
            <span className="text-[10px] text-slate-500">Firebase Spark Always Free</span>
          </div>
        </div>

        {/* Detalles del Acuerdo y Transferencia Científica Bilateral */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Transferencia Científica Bilateral:
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              El motor de simulación matemática desarrollado por <strong className="text-white">Andrés Alberdi (UMSA)</strong> incorpora la metodología de retención cognitiva validada por pares internacionales (<strong className="text-sky-300">Georgia Tech & Purdue University</strong>).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs space-y-1 font-mono text-slate-400">
              <div>• Diagnóstico Inicial: 97% de reprobación en Química por falta de laboratorios.</div>
              <div>• Solución: Prototipo PWA autónomo distribuible en instaladores .exe / .apk.</div>
              <div>• Red Estratégica: Fe y Alegría Bolivia (60 profesores certificados).</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              Eficiencia del Gasto de Subvención:
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Al eliminar servidores Node.js/Python y ejecutar la lógica 100% en el cliente React, el 100% de la subvención financia directamente el contenido pedagógico.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs space-y-1 font-mono text-slate-400">
              <div>• Cuota Firestore: Sync-on-submit diferido (&lt; 20k escrituras/día).</div>
              <div>• Ancho de Banda: Cacheo agresivo local IndexedDB.</div>
              <div>• Escalabilidad: Ampliación a 10,000 usuarios sin cambiar de plan.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
