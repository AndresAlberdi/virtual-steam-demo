/**
 * Virtual-STEM Bolivia: Motor de Simulación Científica de Química
 * -------------------------------------------------------------
 * Autor/Supervisor Pedagógico: Blgo. Rodrigo Genaro Mariaca Cardozo
 * Desarrollo: Compatible con React.js / TypeScript y Antigravity IDE (Gemini)
 * Licencia: Código Abierto (Open-Source) para democratización del aprendizaje
 * 
 * Este módulo contiene la lógica físico-química rigurosa para las tres prácticas
 * de la demo de Química del Proyecto Virtual-STEM Bolivia. Se ejecuta completamente
 * en el cliente (Browser-side), garantizando costo cero bajo el plan Spark de Firebase.
 */

// ============================================================================
// CONSTANTES FÍSICO-QUÍMICAS GLOBALES
// ============================================================================
export const CONSTANTES = {
  // Constante universal de los gases ideales (atm * L / mol * K)
  R_GASES: 0.082057,
  
  // Producto iónico del agua a 25 °C (1.0 x 10^-14)
  KW: 1.0e-14,

  // --- LABORATORIO 1: MOLARIDAD ---
  // Sulfato de Cobre Pentahidratado (CuSO4 * 5H2O)
  PM_CUSO4: 249.68, // g/mol
  VOLUMEN_MATRAZ_NOMINAL: 0.250, // 250 mL en Litros
  TARGET_MOLARIDAD: 0.1, // Concentración objetivo (0.1 M)
  MASA_TEORICA_IDEAL: 6.242, // Masa exacta para 250 mL de 0.1M en gramos

  // --- LABORATORIO 2: TITULACIÓN ---
  // Ácido Acético (CH3COOH) - Ácido débil en el vinagre comercial
  KA_ACIDO_ACETICO: 1.8e-5,
  PKA_ACIDO_ACETICO: 4.74,
  PM_ACIDO_ACETICO: 60.05, // g/mol
  DENSIDAD_VINAGRE: 1.005, // g/mL promedio

  // --- LABORATORIO 3: TOLLENS (ESPEJO DE PLATA) ---
  // Parámetros de Arrhenius para la cinética de reducción de plata molecular
  ACTIVACION_ENERGIA_J: 40000, // Ea = 40 kJ/mol
  FACTOR_A_ARRHENIUS: 1.0e5,    // Calibrado para completar reacción en ~20s a 60°C
  R_JOULES: 8.314,             // R en J / (mol * K)
};

// ============================================================================
// CLASE 1: SIMULADOR DE MOLARIDAD Y PREPARACIÓN DE SOLUCIONES [5.Q.18 / 6.Q.2]
// ============================================================================
export class MolaridadSimulator {
  /**
   * Calcula la concentración resultante y el error de enrase en el matraz aforado.
   * El enrase perfecto es cuando el menisco toca exactamente la línea de aforo (offset = 0).
   * 
   * @param {number} masaGramos - Masa de CuSO4 * 5H2O pesada en la balanza digital.
   * @param {number} offsetEnraseML - Desviación del enrase en mL (positivo = exceso de agua, negativo = falta de agua).
   * @returns {object} Resultado detallado del experimento de soluciones.
   */
  static simularPreparacion(masaGramos, offsetEnraseML) {
    if (masaGramos <= 0) {
      return {
        success: false,
        molaridad: 0,
        errorMolaridadPct: 100,
        colorHex: "rgba(0, 112, 255, 0.0)",
        mensaje: "La balanza marca 0.00g. Debes pesar sulfato de cobre pentahidratado para iniciar el experimento."
      };
    }

    const V_nominal_L = CONSTANTES.VOLUMEN_MATRAZ_NOMINAL;
    const V_real_L = V_nominal_L + (offsetEnraseML / 1000);

    // Evitar división entre cero o volumen negativo
    if (V_real_L <= 0.005) {
      return {
        success: false,
        molaridad: 0,
        errorMolaridadPct: 100,
        colorHex: "rgba(0, 112, 255, 0.0)",
        mensaje: "El volumen de agua en el matraz es insuficiente para disolver la sal."
      };
    }

    // Cálculo estequiométrico
    const molesSoluto = masaGramos / CONSTANTES.PM_CUSO4;
    const molaridadObtenida = molesSoluto / V_real_L;

    // Calcular el porcentaje de error respecto al objetivo pedagógico de 0.1 M
    const errorMolaridadPct = Math.abs((molaridadObtenida - CONSTANTES.TARGET_MOLARIDAD) / CONSTANTES.TARGET_MOLARIDAD) * 100;

    // Calcular el color de la solución (el azul de hidratación del Cu2+ depende de la molaridad)
    // Clamping de la intensidad (alfa) entre 0.1 y 0.95 según la molaridad obtenida (rango visible de 0 M a 0.5 M)
    const factorIntensidad = Math.min(molaridadObtenida / 0.3, 1.0);
    const alpha = 0.15 + (factorIntensidad * 0.8);
    const colorHex = `rgba(0, 90, 220, ${alpha.toFixed(3)})`;

    // Evaluación pedagógica basada en la Ley 070 (metacognición)
    let mensaje = "";
    let success = false;

    // Umbral de tolerancia de error analítico (< 1.5% se considera exitoso)
    if (errorMolaridadPct < 1.5) {
      success = true;
      mensaje = `¡Excelente trabajo analítico! Lograste una concentración de ${molaridadObtenida.toFixed(4)} M (Error: ${errorMolaridadPct.toFixed(2)}%). El menisco está perfectamente alineado con la línea de aforo y la masa pesada es la ideal (${masaGramos.toFixed(3)} g).`;
    } else {
      // Diagnóstico de error de enrase (menisco)
      if (Math.abs(offsetEnraseML) > 1.5) {
        if (offsetEnraseML > 0) {
          mensaje += `Error de Menisco (Dilución Excesiva): Excediste la línea de aforo del matraz por ${offsetEnraseML.toFixed(1)} mL de agua destilada. `;
        } else {
          mensaje += `Error de Menisco (Aforo Insuficiente): Te faltaron ${Math.abs(offsetEnraseML).toFixed(1)} mL de agua para alcanzar la línea de aforo del matraz. `;
        }
      }

      // Diagnóstico de error de pesaje (balanza)
      const errorMasaPct = ((masaGramos - CONSTANTES.MASA_TEORICA_IDEAL) / CONSTANTES.MASA_TEORICA_IDEAL) * 100;
      if (Math.abs(errorMasaPct) > 2.0) {
        if (errorMasaPct > 0) {
          mensaje += `Exceso de Reactivo: Pesaste ${masaGramos.toFixed(2)} g, que supera el peso estequiométrico ideal (${CONSTANTES.MASA_TEORICA_IDEAL.toFixed(3)} g). `;
        } else {
          mensaje += `Falta de Reactivo: Pesaste apenas ${masaGramos.toFixed(2)} g, insuficiente frente a los ${CONSTANTES.MASA_TEORICA_IDEAL.toFixed(3)} g teóricos. `;
        }
      }

      mensaje += `La solución final resultante es de ${molaridadObtenida.toFixed(4)} M. Revisa tu técnica de pesaje y enrase e inténtalo de nuevo.`;
    }

    return {
      success,
      molaridad: molaridadObtenida,
      errorMolaridadPct,
      colorHex,
      mensaje
    };
  }
}

// ============================================================================
// CLASE 2: SIMULADOR DE TITULACIÓN ÁCIDO-BASE (VOLUMETRÍA) [6.Q.4]
// ============================================================================
export class TitulacionSimulator {
  /**
   * Calcula el pH de la solución en tiempo real y determina el color según el volumen de NaOH agregado.
   * Modela la neutralización de un ácido débil (CH3COOH) con una base fuerte (NaOH).
   * 
   * @param {number} volBaseML - Volumen de base NaOH (0.1 M) añadida desde la bureta en mL.
   * @param {number} concAcidoNominal - Concentración nominal de ácido en el vinagre (por defecto 0.8 M, aprox 5% p/v).
   * @param {number} volAcidoML - Volumen de la muestra de vinagre en el matraz (nominalmente 10 mL).
   * @param {number} concBase - Concentración de la base NaOH en la bureta (0.1 M).
   * @returns {object} Estado químico e indicadores de coloración de la fenolftaleína.
   */
  static calcularPuntoCurva(volBaseML, concAcidoNominal = 0.8, volAcidoML = 10.0, concBase = 0.1) {
    const Ka = CONSTANTES.KA_ACIDO_ACETICO;
    const pKa = CONSTANTES.PKA_ACIDO_ACETICO;
    const Kw = CONSTANTES.KW;

    const Va_L = volAcidoML / 1000;
    const Vb_L = volBaseML / 1000;
    const Ca = concAcidoNominal;
    const Cb = concBase;

    // Moles iniciales
    const molesAcidoInicial = Ca * Va_L;
    const molesBaseAñadida = Cb * Vb_L;

    // Volumen de equivalencia exacto en mL: Ca * Va = Cb * Vb => Vb = (Ca * Va) / Cb
    const volEquivalenciaML = (Ca * volAcidoML) / Cb;

    let pH = 7.0;
    let tipoRegion = "";

    // 1. Punto inicial (sin base añadida) - Lógica de Ácido Débil puro
    if (volBaseML <= 0) {
      const H = Math.sqrt(Ka * Ca);
      pH = -Math.log10(H);
      tipoRegion = "ácido_débil_puro";
    }
    // 2. Antes del punto de equivalencia - Región Tampón / Amortiguadora (Buffer)
    else if (volBaseML < volEquivalenciaML) {
      const molesAcidoRemanente = molesAcidoInicial - molesBaseAñadida;
      const molesAcetatoFormado = molesBaseAñadida;

      // Ecuación de Henderson-Hasselbalch
      pH = pKa + Math.log10(molesAcetatoFormado / molesAcidoRemanente);
      tipoRegion = "region_buffer_acetatos";
    }
    // 3. Punto de equivalencia exacto - Hidrólisis de sal básica (Acetato de Sodio)
    else if (Math.abs(volBaseML - volEquivalenciaML) < 0.005) {
      const V_total_L = Va_L + Vb_L;
      const concSal = molesAcidoInicial / V_total_L; // Todo el ácido débil pasó a sal
      
      const Kb = Kw / Ka;
      const OH = Math.sqrt(Kb * concSal);
      const pOH = -Math.log10(OH);
      pH = 14 - pOH;
      tipoRegion = "punto_equivalencia_hidrolisis";
    }
    // 4. Exceso de base - Base fuerte gobernando el pH
    else {
      const V_total_L = Va_L + Vb_L;
      const molesBaseExceso = molesBaseAñadida - molesAcidoInicial;
      const concOH = molesBaseExceso / V_total_L;
      
      const pOH = -Math.log10(concOH);
      pH = 14 - pOH;
      tipoRegion = "exceso_de_base_fuerte";
    }

    // Evitar valores de pH fuera de rango físico por aproximaciones numéricas de punto flotante
    pH = Math.max(0, Math.min(14, pH));

    // Lógica de color de la Fenolftaleína (Viraje óptico entre pH 8.2 y 10.0)
    let colorHex = "rgba(255, 255, 255, 0.0)"; // Incoloro en medio ácido
    let alphaViraje = 0;

    if (pH > 8.2) {
      if (pH >= 10.0) {
        alphaViraje = 0.85;
      } else {
        // Interpolación lineal del canal alfa en el rango de viraje (8.2 a 10.0)
        alphaViraje = 0.85 * ((pH - 8.2) / (10.0 - 8.2));
      }
      colorHex = `rgba(235, 0, 139, ${alphaViraje.toFixed(3)})`; // Tono rosa-fucsia indicador
    }

    // Determinar descripción del viraje para la interfaz
    let estadoViraje = "Incoloro";
    if (pH > 8.2 && pH < 8.5) estadoViraje = "Rosa pálido inicial (Punto óptimo)";
    else if (pH >= 8.5 && pH < 10.0) estadoViraje = "Rosa claro persistente";
    else if (pH >= 10.0) estadoViraje = "Fucsia intenso (Sobre-titulado / Error)";

    return {
      pH,
      volEquivalenciaML,
      tipoRegion,
      colorHex,
      estadoViraje,
      porcentajeNeutralizado: Math.min((volBaseML / volEquivalenciaML) * 100, 200)
    };
  }
}

// ============================================================================
// CLASE 3: SIMULADOR DE CINETICA DE TOLLENS (ESPEJO DE PLATA) [6.Q.16]
// ============================================================================
export class TollensKineticsSimulator {
  /**
   * Valida la secuencia de adición de reactivos para la preparación correcta del reactivo de Tollens.
   * Retorna el estado físico intermedio de la solución.
   * 
   * @param {string[]} reactivosList - Lista de reactivos añadidos en orden cronológico.
   * @returns {object} Estado de la mezcla de reactivos y su representación visual.
   */
  static validarPreparacionReactivo(reactivosList) {
    if (!reactivosList || reactivosList.length === 0) {
      return { estado: "vacio", colorHex: "rgba(255, 255, 255, 0.0)", turbidez: 0, descripcion: "Tubo de ensayo vacío." };
    }

    // Convertir a minúsculas y limpiar espacios para evitar errores de tipeo
    const secuencia = reactivosList.map(r => r.toLowerCase().trim());

    // Paso 1: Nitrato de Plata (AgNO3)
    if (secuencia.length === 1 && (secuencia[0].includes("nitrato") || secuencia[0].includes("agno3"))) {
      return {
        estado: "nitrato_plata_inicial",
        colorHex: "rgba(240, 240, 255, 0.15)",
        turbidez: 0.05,
        descripcion: "Solución clara de Nitrato de Plata (AgNO3 0.1 M)."
      };
    }

    // Paso 2: Nitrato de Plata + Hidróxido de Sodio (AgNO3 + NaOH) -> Precipitado de Óxido de Plata
    if (secuencia.length === 2 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio"))) {
      return {
        estado: "precipitado_cafe",
        colorHex: "rgba(101, 67, 33, 0.8)", // Precipitado café/marrón de Ag2O
        turbidez: 0.9,
        descripcion: "Formación de precipitado café oscuro de Óxido de Plata (Ag2O)."
      };
    }

    // Paso 3: Disolución del precipitado con Amoníaco (AgNO3 + NaOH + NH4OH) -> Ion Complejo Diaminplata(I)
    if (secuencia.length === 3 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio")) &&
        (secuencia[2].includes("nh4oh") || secuencia[2].includes("amoniaco"))) {
      return {
        estado: "reactivo_tollens_listo",
        colorHex: "rgba(255, 255, 255, 0.1)", // Se vuelve a aclarar
        turbidez: 0.0,
        descripcion: "Reactivo de Tollens preparado. El precipitado café se disolvió formando el ion complejo diaminplata(I): [Ag(NH3)2]+."
      };
    }

    // Paso 4: Añadir carbohidrato reductor (Glucosa o Formaldehído) antes del calentamiento
    if (secuencia.length === 4 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio")) &&
        (secuencia[2].includes("nh4oh") || secuencia[2].includes("amoniaco")) &&
        (secuencia[3].includes("glucosa") || secuencia[3].includes("formaldehido") || secuencia[3].includes("aldehido"))) {
      return {
        estado: "mezcla_completa_sin_calentar",
        colorHex: "rgba(255, 255, 255, 0.15)",
        turbidez: 0.05,
        descripcion: "Mezcla completa. Listo para iniciar el calentamiento en Baño María a 60°C."
      };
    }

    // Casos de error en la secuencia procedimental
    return {
      estado: "secuencia_incorrecta",
      colorHex: "rgba(180, 180, 180, 0.5)",
      turbidez: 0.5,
      descripcion: "Error procedimental en la secuencia. El reactivo de Tollens requiere una secuencia estricta: AgNO3 -> NaOH -> NH4OH para evitar precipitaciones irreversibles de sales de plata coloidales."
    };
  }

  /**
   * Calcula el progreso del espejo de plata en función de la temperatura del Baño María y el tiempo.
   * Implementa un modelo cinético de Arrhenius simplificado.
   * 
   * @param {number} tempCelcius - Temperatura actual del Baño María en °C.
   * @param {number} tiempoSegundos - Tiempo transcurrido de calentamiento en segundos.
   * @param {string} estadoInicial - Estado de preparación obtenido de la validación.
   * @returns {object} Progreso de la deposición, reflectividad de las paredes y estado visual.
   */
  static simularCineticaReaccion(tempCelcius, tiempoSegundos, estadoInicial) {
    if (estadoInicial !== "mezcla_completa_sin_calentar") {
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: "rgba(100, 100, 100, 0.2)",
        mensaje: "No se puede iniciar la cinética. Asegúrate de preparar correctamente el Reactivo de Tollens en orden estricto."
      };
    }

    const TempK = tempCelcius + 273.15;
    
    // 1. Escenario de Frío (Temperatura por debajo de 50°C): Cinética inerte
    if (tempCelcius < 50) {
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: "rgba(240, 240, 245, 0.15)",
        mensaje: `Temperatura de Baño María demasiado baja (${tempCelcius.toFixed(1)}°C). La velocidad de reducción es insignificante. Se requiere elevar el calor a por lo menos 50°C.`
      };
    }

    // 2. Escenario de Fuego Excesivo (Temperatura superior a 75°C): Reducción violenta (Plata coloidal negra en suspensión)
    if (tempCelcius > 75) {
      const factorOscurecimiento = Math.min(tiempoSegundos / 8, 1.0);
      const alphaColoide = factorOscurecimiento * 0.95;
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: `rgba(20, 20, 20, ${alphaColoide.toFixed(3)})`, // Se vuelve completamente negro y opaco
        mensaje: "¡Error Cinético Crítico! Calentamiento excesivo (T > 75°C). La reducción de los iones de plata ocurrió de forma violenta en el seno del líquido, formando plata coloidal negra sin adherirse a las paredes de vidrio. Reacción fallida."
      };
    }

    // 3. Escenario Óptimo (50°C <= T <= 75°C): Formación homogénea del espejo de plata
    // Calcular tasa de reacción usando la ecuación de Arrhenius
    const exponente = -CONSTANTES.ACTIVACION_ENERGIA_J / (CONSTANTES.R_JOULES * TempK);
    const constanteK = CONSTANTES.FACTOR_A_ARRHENIUS * Math.exp(exponente); // tasa por segundo

    // El progreso de la deposición molecular de plata metálica en las paredes
    const progreso = Math.min(constanteK * tiempoSegundos, 1.0);
    const progresoEspejoPct = progreso * 100;

    // La reflectividad (Efecto espejo metálico plateado) se incrementa de forma proporcional
    const reflectividadEspejo = progreso;

    // La solución pasa de incolora/clara a gris plateada reflectante
    const alphaPlata = 0.15 + (progreso * 0.7);
    const colorSolucionHex = `rgba(192, 192, 192, ${alphaPlata.toFixed(3)})`;

    let mensaje = "";
    if (progresoEspejoPct < 30) {
      mensaje = `Calentamiento óptimo a ${tempCelcius.toFixed(1)}°C. Los iones de plata se están reduciendo gradualmente en las paredes de vidrio.`;
    } else if (progresoEspejoPct >= 30 && progresoEspejoPct < 95) {
      mensaje = `El espejo de plata se está asentando homogéneamente. Reflectividad actual: ${(reflectividadEspejo * 100).toFixed(0)}%.`;
    } else {
      mensaje = `¡Reacción de Tollens Completa! Has depositado una película perfecta de plata metálica reflectante. Las paredes del tubo reflejan el entorno con absoluta fidelidad.`;
    }

    return {
      progresoEspejoPct,
      reflectividadEspejo,
      colorSolucionHex,
      mensaje
    };
  }
}
