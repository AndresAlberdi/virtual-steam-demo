import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkbench } from '../context/WorkbenchContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, Award, ArrowLeft, CheckCircle2, FileText, Beaker } from 'lucide-react';

export default function TeacherAnalyticsView() {
  const { currentUser } = useAuth();
  const { bitacora } = useWorkbench();
  const navigate = useNavigate();

  // Datos simulados de aula para demostración senior
  const estudiantesDemo = [
    { id: '1', nombre: 'Carlos Mamani', lab: 'Molaridad CuSO₄', score: 95, eppErrors: 0, status: 'Completado' },
    { id: '2', nombre: 'Lucía Quispe', lab: 'Volumetría Ácido-Base', score: 88, eppErrors: 1, status: 'Completado' },
    { id: '3', nombre: 'Mateo Flores', lab: 'Espejo de Plata', score: 72, eppErrors: 2, status: 'En revisión' },
    { id: '4', nombre: 'Sofia Condori', lab: 'Molaridad CuSO₄', score: 100, eppErrors: 0, status: 'Completado' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header de Docente */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/student/workbench')}
              className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                PANEL DE ANALÍTICA DOCENTE • FE Y ALEGRÍA
              </h1>
              <p className="text-xs text-slate-400">
                Supervisión procesal de aula digital y control de bioseguridad EPP
              </p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60">
            {currentUser?.name || 'Prof. Rodrigo Mariaca'}
          </div>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Estudiantes Activos</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-400 font-mono">42 / 45</div>
            <span className="text-[10px] text-slate-500">93% de participación de aula</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Promedio Metacognitivo</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">88.7 PTS</div>
            <span className="text-[10px] text-emerald-500/80"> Meta Ley 070 alcanzada</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Incidencias EPP</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">3 Incidencias</div>
            <span className="text-[10px] text-slate-500">Falta de gafas en lab ácido</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold">Docentes Certificados</span>
              <Beaker className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-400 font-mono">60 Profesores</div>
            <span className="text-[10px] text-slate-500">Red Fe y Alegría Bolivia</span>
          </div>
        </div>

        {/* Matriz de Calificaciones y Bitácoras de Estudiantes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            Matriz Procesal de Entregas y Bitácoras Metacognitivas:
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Estudiante</th>
                  <th className="p-3">Laboratorio Realizado</th>
                  <th className="p-3">Errores EPP</th>
                  <th className="p-3">Puntaje</th>
                  <th className="p-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {estudiantesDemo.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-3 font-bold text-slate-200">{std.nombre}</td>
                    <td className="p-3 text-sky-400">{std.lab}</td>
                    <td className="p-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${std.eppErrors > 0 ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400'}`}>
                        {std.eppErrors} err
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{std.score} pts</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[10px] bg-slate-950 text-slate-300 px-2 py-1 rounded border border-slate-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {std.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
