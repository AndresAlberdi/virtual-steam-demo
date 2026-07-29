import React, { createContext, useContext, useState, useEffect } from 'react';
import { MolaridadSimulator, TitulacionSimulator, TollensKineticsSimulator } from '../services/simulacionQuimicaEngine';

const WorkbenchContext = createContext();

export const WorkbenchProvider = ({ children }) => {
  // Laboratorio activo ('lab_molaridad' | 'lab_titulacion' | 'lab_tollens')
  const [laboratorioId, setLaboratorioId] = useState('lab_molaridad');
  
  // Fase actual del ciclo de 5 fases metacognitivas (1..5)
  const [faseActual, setFaseActual] = useState(1);

  // EPP e Inducción
  const [eppSeleccionado, setEppSeleccionado] = useState([]);
  const [eppErroresCount, setEppErroresCount] = useState(0);
  const [eppCompletado, setEppCompletado] = useState(false);

  // Vidriería y reactivos en mesa
  const [tabActiva, setTabActiva] = useState('reactivos');
  const [elementosEnMesa, setElementosEnMesa] = useState([]);
  const [reactivosAñadidos, setReactivosAñadidos] = useState([]);

  // Parámetros numéricos
  const [temperatura, setTemperatura] = useState(20); // 20 a 100 °C
  const [tiempo, setTiempo] = useState(0); // Segundos de reacción
  const [velocidadAgitacion, setVelocidadAgitacion] = useState(0); // RPM
  const [masaSoluto, setMasaSoluto] = useState(6.242); // Gramos para CuSO4 (ideal: 6.242g)
  const [volumenEnraseOffset, setVolumenEnraseOffset] = useState(0); // Offset en mL para enrase
  const [volumenBaseBureta, setVolumenBaseBureta] = useState(0); // mL NaOH en titulación (0 a 100 mL)

  // Estado de simulación
  const [ejecutando, setEjecutando] = useState(false);
  const [reaccionCompleta, setReaccionCompleta] = useState(false);
  const [resultadoQuimico, setResultadoQuimico] = useState(null);

  // Bitácora de reportes de analítica (Persistida offline)
  const [bitacora, setBitacora] = useState(() => {
    const saved = localStorage.getItem('virtual_stem_bitacora');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('virtual_stem_bitacora', JSON.stringify(bitacora));
  }, [bitacora]);

  // Recalcular estado químico cuando cambian los parámetros
  useEffect(() => {
    if (laboratorioId === 'lab_molaridad') {
      const res = MolaridadSimulator.simularPreparacion(masaSoluto, volumenEnraseOffset);
      setResultadoQuimico(res);
    } else if (laboratorioId === 'lab_titulacion') {
      const res = TitulacionSimulator.calcularPuntoCurva(volumenBaseBureta, 0.8, 10.0, 0.1);
      setResultadoQuimico(res);
    } else if (laboratorioId === 'lab_tollens') {
      const validacion = TollensKineticsSimulator.validarPreparacionReactivo(reactivosAñadidos);
      const res = TollensKineticsSimulator.simularCineticaReaccion(temperatura, tiempo, validacion.estado);
      setResultadoQuimico({ ...res, validacion });
    }
  }, [laboratorioId, masaSoluto, volumenEnraseOffset, volumenBaseBureta, reactivosAñadidos, temperatura, tiempo]);

  // Reset del experimento al cambiar de laboratorio
  const cambiarLaboratorio = (newLabId) => {
    setLaboratorioId(newLabId);
    setFaseActual(1);
    setEppCompletado(false);
    setElementosEnMesa([]);
    setReactivosAñadidos([]);
    setEjecutando(false);
    setReaccionCompleta(false);
    setTiempo(0);
    if (newLabId === 'lab_molaridad') {
      setMasaSoluto(6.242);
      setVolumenEnraseOffset(0);
    } else if (newLabId === 'lab_titulacion') {
      setVolumenBaseBureta(0);
    } else if (newLabId === 'lab_tollens') {
      setTemperatura(60);
    }
  };

  const agregarElementoMesa = (item) => {
    if (!elementosEnMesa.find(e => e.id === item.id)) {
      setElementosEnMesa([...elementosEnMesa, item]);
    }
  };

  const agregarReactivo = (nombre) => {
    setReactivosAñadidos([...reactivosAñadidos, nombre]);
  };

  const reiniciarSimulacion = () => {
    setElementosEnMesa([]);
    setReactivosAñadidos([]);
    setEjecutando(false);
    setReaccionCompleta(false);
    setTiempo(0);
  };

  const guardarReporteMetacognitivo = (respuestas, score) => {
    const nuevoReporte = {
      id: 'session_' + Date.now(),
      laboratorioId,
      timestamp: new Date().toISOString(),
      eppErroresCount,
      score,
      respuestas,
      resultado: resultadoQuimico
    };
    setBitacora([nuevoReporte, ...bitacora]);
  };

  return (
    <WorkbenchContext.Provider value={{
      laboratorioId, cambiarLaboratorio,
      faseActual, setFaseActual,
      eppSeleccionado, setEppSeleccionado,
      eppErroresCount, setEppErroresCount,
      eppCompletado, setEppCompletado,
      tabActiva, setTabActiva,
      elementosEnMesa, setElementosEnMesa, agregarElementoMesa,
      reactivosAñadidos, setReactivosAñadidos, agregarReactivo,
      temperatura, setTemperatura,
      tiempo, setTiempo,
      velocidadAgitacion, setVelocidadAgitacion,
      masaSoluto, setMasaSoluto,
      volumenEnraseOffset, setVolumenEnraseOffset,
      volumenBaseBureta, setVolumenBaseBureta,
      ejecutando, setEjecutando,
      reaccionCompleta, setReaccionCompleta,
      resultadoQuimico, setResultadoQuimico,
      reiniciarSimulacion,
      bitacora, guardarReporteMetacognitivo
    }}>
      {children}
    </WorkbenchContext.Provider>
  );
};

export const useWorkbench = () => useContext(WorkbenchContext);
