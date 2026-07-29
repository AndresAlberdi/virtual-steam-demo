import React, { useState } from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { ShieldCheck, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FaseEPPModal() {
  const { eppSeleccionado, setEppSeleccionado, eppErroresCount, setEppErroresCount, eppCompletado, setEppCompletado, setFaseActual, laboratorioId } = useWorkbench();
  
  const eppItems = [
    { id: 'gafas', nombre: 'Gafas de Seguridad UV', requerido: true, desc: 'Protección contra salpicaduras de ácido y corrosivos.' },
    { id: 'guardapolvo', nombre: 'Bata / Guardapolvo de Algodón', requerido: true, desc: 'Protección corporal contra reactivos químicos.' },
    { id: 'guantes', nombre: 'Guantes de Nitrilo', requerido: true, desc: 'Barrera dérmica para manipulación de AgNO₃ y NaOH.' },
    { id: 'casco', nombre: 'Casco de Minería', requerido: false, desc: 'No requerido en laboratorio químico básico.' },
    { id: 'audifonos', nombre: 'Audífonos de Cancelación de Ruido', requerido: false, desc: 'No requerido para experimentos volumétricos.' }
  ];

  const toggleItem = (id) => {
    if (eppSeleccionado.includes(id)) {
      setEppSeleccionado(eppSeleccionado.filter(i => i !== id));
    } else {
      setEppSeleccionado([...eppSeleccionado, id]);
    }
  };

  const handleValidarEPP = () => {
    const faltantes = eppItems.filter(item => item.requerido && !eppSeleccionado.includes(item.id));
    const innecesarios = eppSeleccionado.filter(id => !eppItems.find(item => item.id === id && item.requerido));

    if (faltantes.length > 0 || innecesarios.length > 0) {
      setEppErroresCount(eppErroresCount + 1);
      alert(`⚠️ Falla de Bioseguridad (MSDS): Faltan elementos requeridos (${faltantes.map(f => f.nombre).join(', ')}) o seleccionaste elementos innecesarios. ¡Revisa la ficha de seguridad!`);
    } else {
      setEppCompletado(true);
      setFaseActual(2); // Avanzar a Fase 2: Ensamblaje
    }
  };

  if (eppCompletado) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-sky-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-full bg-sky-950 border border-sky-500 flex items-center justify-center text-sky-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">FASE 1: INDUCCIÓN EPP Y BIOSEGURIDAD</h2>
            <p className="text-xs text-slate-400">Protocolo Obligatorio Ficha MSDS • Ley 070 Bolivia</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 my-4 leading-relaxed">
          Antes de ingresar a la mesa de experimentación para <strong className="text-sky-400 uppercase">{laboratorioId.replace('lab_', '')}</strong>, debes equipar correctamente a tu avatar con el Equipo de Protección Personal (EPP) adecuado.
        </p>

        <div className="space-y-2 mb-6">
          {eppItems.map((item) => {
            const isSelected = eppSeleccionado.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-sky-950/80 border-sky-500 text-white shadow-lg shadow-sky-950'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-2">
                    <span>{item.nombre}</span>
                    {item.requerido && (
                      <span className="text-[9px] bg-rose-950 text-rose-400 border border-rose-800 px-1.5 py-0.2 rounded font-mono uppercase">
                        Requerido MSDS
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] opacity-75 mt-0.5">{item.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-sky-500 border-sky-400 text-white' : 'border-slate-700'}`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            Errores Bioseguridad: <span className="text-amber-400 font-bold">{eppErroresCount}</span>
          </div>
          <button
            onClick={handleValidarEPP}
            className="py-2.5 px-5 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg border border-sky-400/30 transition-all flex items-center gap-2"
          >
            <span>Validar e Iniciar Ensamblaje</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
