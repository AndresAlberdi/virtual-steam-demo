import { describe, it, expect } from 'vitest';
import { 
  CONSTANTES, 
  MolaridadSimulator, 
  TitulacionSimulator, 
  TollensKineticsSimulator 
} from './simulacionQuimicaEngine';

describe('Motor de Simulación Científica (simulacionQuimicaEngine)', () => {

  // =========================================================================
  // PRUEBAS UNITARIAS: LABORATORIO 1 - MOLARIDAD
  // =========================================================================
  describe('Lab 1: MolaridadSimulator (CuSO4 * 5H2O)', () => {
    it('debe retornar masa requerida ideal (6.242 g) con error menor al 1.5%', () => {
      const masaIdeal = CONSTANTES.MASA_TEORICA_IDEAL; // 6.242 g
      const resultado = MolaridadSimulator.simularPreparacion(masaIdeal, 0);

      expect(resultado.success).toBe(true);
      expect(resultado.molaridad).toBeCloseTo(0.1, 3);
      expect(resultado.errorMolaridadPct).toBeLessThan(1.5);
      expect(resultado.mensaje).toContain('Excelente trabajo analítico');
    });

    it('debe detectar un error de pesaje por exceso de reactivo', () => {
      const resultado = MolaridadSimulator.simularPreparacion(10.0, 0);

      expect(resultado.success).toBe(false);
      expect(resultado.molaridad).toBeGreaterThan(0.15);
      expect(resultado.mensaje).toContain('Exceso de Reactivo');
    });

    it('debe detectar un error de enrase por exceso de agua destilada (dilución)', () => {
      const resultado = MolaridadSimulator.simularPreparacion(6.242, 4.0); // +4 mL de agua

      expect(resultado.success).toBe(false);
      expect(resultado.mensaje).toContain('Error de Menisco');
      expect(resultado.mensaje).toContain('Dilución Excesiva');
    });

    it('debe fallar si la masa de reactivo es 0.00g', () => {
      const resultado = MolaridadSimulator.simularPreparacion(0, 0);

      expect(resultado.success).toBe(false);
      expect(resultado.mensaje).toContain('La balanza marca 0.00g');
    });
  });

  // =========================================================================
  // PRUEBAS UNITARIAS: LABORATORIO 2 - TITULACIÓN ÁCIDO-BASE
  // =========================================================================
  describe('Lab 2: TitulacionSimulator (Vinagre con NaOH)', () => {
    it('debe calcular pH ácido inicial antes de agregar NaOH (pH < 4)', () => {
      const puntoInicial = TitulacionSimulator.calcularPuntoCurva(0, 0.8, 10.0, 0.1);

      expect(puntoInicial.pH).toBeLessThan(3.5);
      expect(puntoInicial.colorHex).toBe('rgba(255, 255, 255, 0.0)'); // Incoloro
      expect(puntoInicial.tipoRegion).toBe('ácido_débil_puro');
    });

    it('debe alcanzar la neutralización con viraje rosa en la equivalencia teórica (80 mL NaOH)', () => {
      const equivalente = TitulacionSimulator.calcularPuntoCurva(80.0, 0.8, 10.0, 0.1);

      expect(equivalente.pH).toBeGreaterThan(8.2);
      expect(equivalente.colorHex).toContain('235, 0, 139'); // Rosa fucsia
      expect(equivalente.estadoViraje).toContain('Rosa');
    });

    it('debe indicar sobre-titulación al exceder el volumen de base', () => {
      const exceso = TitulacionSimulator.calcularPuntoCurva(95.0, 0.8, 10.0, 0.1);

      expect(exceso.pH).toBeGreaterThan(10.0);
      expect(exceso.estadoViraje).toContain('Fucsia intenso');
    });
  });

  // =========================================================================
  // PRUEBAS UNITARIAS: LABORATORIO 3 - TOLLENS (ESPEJO DE PLATA)
  // =========================================================================
  describe('Lab 3: TollensKineticsSimulator (Espejo de Plata)', () => {
    it('debe validar la secuencia estricta de reactivos para preparar Tollens', () => {
      const resValido = TollensKineticsSimulator.validarPreparacionReactivo([
        'Nitrato de Plata',
        'Hidróxido de Sodio',
        'Amoníaco',
        'Glucosa'
      ]);

      expect(resValido.estado).toBe('mezcla_completa_sin_calentar');
      expect(resValido.descripcion).toContain('Mezcla completa');
    });

    it('debe rechazar secuencias procedimentales incorrectas', () => {
      const resInvalido = TollensKineticsSimulator.validarPreparacionReactivo([
        'Glucosa',
        'Nitrato de Plata'
      ]);

      expect(resInvalido.estado).toBe('secuencia_incorrecta');
      expect(resInvalido.descripcion).toContain('Error procedimental');
    });

    it('debe simular la cinética de Arrhenius a 60°C logrando deposición de espejo de plata', () => {
      const estadoSim = TollensKineticsSimulator.simularCineticaReaccion(60, 20, 'mezcla_completa_sin_calentar');

      expect(estadoSim.progresoEspejoPct).toBeGreaterThan(50);
      expect(estadoSim.reflectividadEspejo).toBeGreaterThan(0.5);
    });

    it('debe fallar la reacción si la temperatura es excesiva (> 75°C) por formación de plata coloidal negra', () => {
      const resCalorExcesivo = TollensKineticsSimulator.simularCineticaReaccion(85, 10, 'mezcla_completa_sin_calentar');

      expect(resCalorExcesivo.progresoEspejoPct).toBe(0);
      expect(resCalorExcesivo.mensaje).toContain('Error Cinético Crítico');
    });
  });
});
