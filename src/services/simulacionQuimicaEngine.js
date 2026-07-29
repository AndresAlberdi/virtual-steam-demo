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

export const CONSTANTES = {
  R_GASES: 0.082057,
  KW: 1.0e-14,
  PM_CUSO4: 249.68,
  VOLUMEN_MATRAZ_NOMINAL: 0.250,
  TARGET_MOLARIDAD: 0.1,
  MASA_TEORICA_IDEAL: 6.242,
  KA_ACIDO_ACETICO: 1.8e-5,
  PKA_ACIDO_ACETICO: 4.74,
  PM_ACIDO_ACETICO: 60.05,
  DENSIDAD_VINAGRE: 1.005,
  ACTIVACION_ENERGIA_J: 40000,
  FACTOR_A_ARRHENIUS: 1.0e5,
  R_JOULES: 8.314,
};

export class MolaridadSimulator {
  static simularPreparacion(masaGramos, offsetEnraseML = 0) {
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

    if (V_real_L <= 0.005) {
      return {
        success: false,
        molaridad: 0,
        errorMolaridadPct: 100,
        colorHex: "rgba(0, 112, 255, 0.0)",
        mensaje: "El volumen de agua en el matraz es insuficiente para disolver la sal."
      };
    }

    const molesSoluto = masaGramos / CONSTANTES.PM_CUSO4;
    const molaridadObtenida = molesSoluto / V_real_L;
    const errorMolaridadPct = Math.abs((molaridadObtenida - CONSTANTES.TARGET_MOLARIDAD) / CONSTANTES.TARGET_MOLARIDAD) * 100;

    const factorIntensidad = Math.min(molaridadObtenida / 0.3, 1.0);
    const alpha = 0.15 + (factorIntensidad * 0.8);
    const colorHex = `rgba(0, 100, 230, ${alpha.toFixed(3)})`;

    let mensaje = "";
    let success = false;

    if (errorMolaridadPct < 1.5) {
      success = true;
      mensaje = `¡Excelente trabajo analítico! Lograste una concentración de ${molaridadObtenida.toFixed(4)} M (Error: ${errorMolaridadPct.toFixed(2)}%). El menisco está perfectamente alineado con la línea de aforo y la masa pesada es la ideal (${masaGramos.toFixed(3)} g).`;
    } else {
      if (Math.abs(offsetEnraseML) > 1.5) {
        if (offsetEnraseML > 0) {
          mensaje += `Error de Menisco (Dilución Excesiva): Excediste la línea de aforo del matraz por ${offsetEnraseML.toFixed(1)} mL de agua destilada. `;
        } else {
          mensaje += `Error de Menisco (Aforo Insuficiente): Te faltaron ${Math.abs(offsetEnraseML).toFixed(1)} mL de agua para alcanzar la línea de aforo del matraz. `;
        }
      }

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

export class TitulacionSimulator {
  static calcularPuntoCurva(volBaseML, concAcidoNominal = 0.8, volAcidoML = 10.0, concBase = 0.1) {
    const Ka = CONSTANTES.KA_ACIDO_ACETICO;
    const pKa = CONSTANTES.PKA_ACIDO_ACETICO;
    const Kw = CONSTANTES.KW;

    const Va_L = volAcidoML / 1000;
    const Vb_L = volBaseML / 1000;
    const Ca = concAcidoNominal;
    const Cb = concBase;

    const molesAcidoInicial = Ca * Va_L;
    const molesBaseAñadida = Cb * Vb_L;
    const volEquivalenciaML = (Ca * volAcidoML) / Cb;

    let pH = 7.0;
    let tipoRegion = "";

    if (volBaseML <= 0) {
      const H = Math.sqrt(Ka * Ca);
      pH = -Math.log10(H);
      tipoRegion = "ácido_débil_puro";
    } else if (volBaseML < volEquivalenciaML) {
      const molesAcidoRemanente = molesAcidoInicial - molesBaseAñadida;
      const molesAcetatoFormado = molesBaseAñadida;
      pH = pKa + Math.log10(molesAcetatoFormado / molesAcidoRemanente);
      tipoRegion = "region_buffer_acetatos";
    } else if (Math.abs(volBaseML - volEquivalenciaML) < 0.005) {
      const V_total_L = Va_L + Vb_L;
      const concSal = molesAcidoInicial / V_total_L;
      const Kb = Kw / Ka;
      const OH = Math.sqrt(Kb * concSal);
      const pOH = -Math.log10(OH);
      pH = 14 - pOH;
      tipoRegion = "punto_equivalencia_hidrolisis";
    } else {
      const V_total_L = Va_L + Vb_L;
      const molesBaseExceso = molesBaseAñadida - molesAcidoInicial;
      const concOH = molesBaseExceso / V_total_L;
      const pOH = -Math.log10(concOH);
      pH = 14 - pOH;
      tipoRegion = "exceso_de_base_fuerte";
    }

    pH = Math.max(0, Math.min(14, pH));

    let colorHex = "rgba(255, 255, 255, 0.0)";
    let alphaViraje = 0;

    if (pH > 8.2) {
      if (pH >= 10.0) {
        alphaViraje = 0.85;
      } else {
        alphaViraje = 0.85 * ((pH - 8.2) / (10.0 - 8.2));
      }
      colorHex = `rgba(235, 0, 139, ${alphaViraje.toFixed(3)})`;
    }

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

export class TollensKineticsSimulator {
  static normalizarTexto(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  static validarPreparacionReactivo(reactivosList) {
    if (!reactivosList || reactivosList.length === 0) {
      return { estado: "vacio", colorHex: "rgba(255, 255, 255, 0.0)", turbidez: 0, descripcion: "Tubo de ensayo vacío." };
    }

    const secuencia = reactivosList.map(r => this.normalizarTexto(r));

    if (secuencia.length === 1 && (secuencia[0].includes("nitrato") || secuencia[0].includes("agno3"))) {
      return {
        estado: "nitrato_plata_inicial",
        colorHex: "rgba(240, 240, 255, 0.15)",
        turbidez: 0.05,
        descripcion: "Solución clara de Nitrato de Plata (AgNO3 0.1 M)."
      };
    }

    if (secuencia.length === 2 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio"))) {
      return {
        estado: "precipitado_cafe",
        colorHex: "rgba(101, 67, 33, 0.8)",
        turbidez: 0.9,
        descripcion: "Formación de precipitado café oscuro de Óxido de Plata (Ag2O)."
      };
    }

    if (secuencia.length === 3 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio")) &&
        (secuencia[2].includes("nh4oh") || secuencia[2].includes("amoniaco") || secuencia[2].includes("amoniaco"))) {
      return {
        estado: "reactivo_tollens_listo",
        colorHex: "rgba(255, 255, 255, 0.1)",
        turbidez: 0.0,
        descripcion: "Reactivo de Tollens preparado. El precipitado café se disolvió formando el ion complejo diaminplata(I): [Ag(NH3)2]+."
      };
    }

    if (secuencia.length === 4 && 
        (secuencia[0].includes("agno3") || secuencia[0].includes("nitrato")) && 
        (secuencia[1].includes("naoh") || secuencia[1].includes("hidroxido de sodio")) &&
        (secuencia[2].includes("nh4oh") || secuencia[2].includes("amoniaco") || secuencia[2].includes("amoniaco")) &&
        (secuencia[3].includes("glucosa") || secuencia[3].includes("formaldehido") || secuencia[3].includes("aldehido"))) {
      return {
        estado: "mezcla_completa_sin_calentar",
        colorHex: "rgba(255, 255, 255, 0.15)",
        turbidez: 0.05,
        descripcion: "Mezcla completa. Listo para iniciar el calentamiento en Baño María a 60°C."
      };
    }

    return {
      estado: "secuencia_incorrecta",
      colorHex: "rgba(180, 180, 180, 0.5)",
      turbidez: 0.5,
      descripcion: "Error procedimental en la secuencia. El reactivo de Tollens requiere secuencia estricta: AgNO3 -> NaOH -> NH4OH."
    };
  }

  static simularCineticaReaccion(tempCelcius, tiempoSegundos, estadoInicial) {
    if (estadoInicial !== "mezcla_completa_sin_calentar") {
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: "rgba(100, 100, 100, 0.2)",
        mensaje: "No se puede iniciar la cinética. Prepara correctamente el Reactivo de Tollens en orden estricto."
      };
    }

    const TempK = tempCelcius + 273.15;
    
    if (tempCelcius < 50) {
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: "rgba(240, 240, 255, 0.15)",
        mensaje: `Temperatura de Baño María demasiado baja (${tempCelcius.toFixed(1)}°C). Se requiere elevar el calor a por lo menos 50°C.`
      };
    }

    if (tempCelcius > 75) {
      const factorOscurecimiento = Math.min(tiempoSegundos / 8, 1.0);
      const alphaColoide = factorOscurecimiento * 0.95;
      return {
        progresoEspejoPct: 0,
        reflectividadEspejo: 0,
        colorSolucionHex: `rgba(20, 20, 20, ${alphaColoide.toFixed(3)})`,
        mensaje: "¡Error Cinético Crítico! Calentamiento excesivo (T > 75°C). Reducción violenta en el seno del líquido (plata coloidal negra)."
      };
    }

    const exponente = -CONSTANTES.ACTIVACION_ENERGIA_J / (CONSTANTES.R_JOULES * TempK);
    const constanteK = CONSTANTES.FACTOR_A_ARRHENIUS * Math.exp(exponente);
    const progreso = Math.min(constanteK * tiempoSegundos, 1.0);
    const progresoEspejoPct = progreso * 100;
    const reflectividadEspejo = progreso;

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
