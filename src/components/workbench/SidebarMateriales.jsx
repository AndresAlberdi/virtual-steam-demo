import React from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { FlaskConical, Beaker, Flame, Plus, CheckCircle2 } from 'lucide-react';

export default function SidebarMateriales() {
  const { tabActiva, setTabActiva, agregarElementoMesa, reactivosAñadidos, agregarReactivo, laboratorioId } = useWorkbench();

  const tabs = [
    { id: 'reactivos', label: 'Reactivos', icon: FlaskConical },
    { id: 'vidrio', label: 'Vidrio', icon: Beaker },
    { id: 'equipos', label: 'Equipos', icon: Flame }
  ];

  // Catálogo de ítems organizados por laboratorio y categoría
  const itemsPorTab = {
    reactivos: laboratorioId === 'lab_molaridad' ? [
      { id: 'cuso4', nombre: 'Sulfato de Cobre (CuSO₄·5H₂O)', estado: 'Sólido Azul', desc: 'Masa Molar: 249.68 g/mol' },
      { id: 'h2o', nombre: 'Agua Destilada (H₂O)', estado: 'Líquido', desc: 'Solvente universal para aforo' }
    ] : laboratorioId === 'lab_titulacion' ? [
      { id: 'vinagre', nombre: 'Vinagre Comercial (CH₃COOH)', estado: 'Muestra Ácida', desc: 'Ácido acético ~0.8 M' },
      { id: 'naoh', nombre: 'Hidróxido de Sodio (NaOH 0.1 M)', estado: 'Valorante', desc: 'Base fuerte en bureta' },
      { id: 'fenolftaleina', nombre: 'Fenolftaleína (Indicador)', estado: 'Gotero', desc: 'Viraje rosa (pH 8.2 - 10.0)' }
    ] : [
      { id: 'agno3', nombre: 'Nitrato de Plata (AgNO₃ 0.1 M)', estado: 'Paso 1', desc: 'Precursor de plata' },
      { id: 'naoh_tollens', nombre: 'Hidróxido de Sodio (NaOH 1 M)', estado: 'Paso 2', desc: 'Precipitado café Ag₂O' },
      { id: 'nh4oh', nombre: 'Hidróxido de Amonio (NH₄OH 2 M)', estado: 'Paso 3', desc: 'Disuelve ion complejo [Ag(NH₃)₂]⁺' },
      { id: 'glucosa', nombre: 'Solución de Glucosa (C₆H₁₂O₆)', estado: 'Paso 4', desc: 'Aldehído reductor' }
    ],
    vidrio: [
      { id: 'matraz_aforado', nombre: 'Matraz Aforado (250 mL)', tipo: 'Vidriería de precisión' },
      { id: 'erlenmeyer', nombre: 'Matraz Erlenmeyer (100 mL)', tipo: 'Recipiente de titulación' },
      { id: 'bureta', nombre: 'Bureta Graduada (50 mL)', tipo: 'Dispensador volumétrico' },
      { id: 'tubo_ensayo', nombre: 'Tubo de Ensayo pyrex', tipo: 'Tubo para baño María' },
      { id: 'vaso_precipitados', nombre: 'Vaso de Precipitados (100 mL)', tipo: 'Medición rápida' }
    ],
    equipos: [
      { id: 'balanza_analitica', nombre: 'Balanza Analítica Digital', desc: 'Precisión ±0.001 g' },
      { id: 'placa_calefactora', nombre: 'Placa Calefactora Agitadora', desc: 'Regulador 20°C - 100°C' },
      { id: 'soporte_universal', nombre: 'Soporte Universal & Pinzas', desc: 'Fijación de bureta' },
      { id: 'termometro', nombre: 'Termómetro Digital Industrial', desc: 'Escala Celcius en vivo' }
    ]
  };

  return (
    <div className="col-span-12 lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-xl flex flex-col h-full">
      <h2 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-2">
        <FlaskConical className="w-4 h-4 text-sky-400" />
        Inventario de Laboratorio
      </h2>

      {/* Pestañas de Navegación */}
      <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850 mb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setTabActiva(tab.id)}
              className={`py-1.5 px-2 text-[11px] font-bold rounded flex items-center justify-center gap-1 transition-all ${
                tabActiva === tab.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Lista de Íconos y Materiales Seleccionables */}
      <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1">
        {itemsPorTab[tabActiva]?.map((item) => {
          const yaAñadido = reactivosAñadidos.includes(item.nombre);
          return (
            <div
              key={item.id}
              className="p-2.5 bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 hover:border-sky-500/60 rounded-lg transition-all shadow-md group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-sky-300">
                  {item.nombre}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {item.desc || item.estado || item.tipo}
                </div>
              </div>

              {tabActiva === 'reactivos' ? (
                <button
                  onClick={() => agregarReactivo(item.nombre)}
                  className={`p-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                    yaAñadido
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow'
                  }`}
                >
                  {yaAñadido ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{yaAñadido ? 'Vertido' : 'Verter'}</span>
                </button>
              ) : (
                <button
                  onClick={() => agregarElementoMesa(item)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white rounded text-[11px] font-bold border border-slate-700 transition-colors"
                >
                  + Mesa
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Reactivos vertidos en la mezcla actual */}
      {reactivosAñadidos.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Reactivos en Mezcla:</span>
            <span className="text-[10px] font-mono text-sky-400">{reactivosAñadidos.length} vertidos</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {reactivosAñadidos.map((r, idx) => (
              <span key={idx} className="text-[10px] font-medium bg-sky-950/60 text-sky-300 border border-sky-800/60 px-2 py-0.5 rounded">
                {idx + 1}. {r.split('(')[0]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
