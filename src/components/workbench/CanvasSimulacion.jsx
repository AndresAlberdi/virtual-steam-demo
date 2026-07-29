import React, { useRef, useEffect } from 'react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { Flame, Thermometer, Sparkles } from 'lucide-react';

export default function CanvasSimulacion() {
  const canvasRef = useRef(null);
  const { 
    laboratorioId, 
    temperatura, 
    tiempo, 
    ejecutando, 
    resultadoQuimico, 
    masaSoluto, 
    volumenEnraseOffset, 
    volumenBaseBureta, 
    reactivosAñadidos 
  } = useWorkbench();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // 1. Dibujar mesa y fondo de laboratorio industrial
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Rejilla técnica de fondo
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Superficie de acero inoxidable de la mesa
      const tableY = 320;
      const tableGrad = ctx.createLinearGradient(0, tableY, 0, h);
      tableGrad.addColorStop(0, '#1e293b');
      tableGrad.addColorStop(0.3, '#0f172a');
      tableGrad.addColorStop(1, '#020617');
      ctx.fillStyle = tableGrad;
      ctx.fillRect(0, tableY, w, h - tableY);

      // Línea brillante de borde de mesa
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, tableY);
      ctx.lineTo(w, tableY);
      ctx.stroke();

      // =========================================================================
      // DIBUJO DE LABORATORIO 1: MOLARIDAD (MATRAZ AFORADO + BALANZA + MENISCO)
      // =========================================================================
      if (laboratorioId === 'lab_molaridad') {
        const cx = w / 2;
        const cy = tableY - 10;

        // Placa / Base
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 90, cy - 15, 180, 15);

        // Matraz Aforado (Vidriería)
        const flaskY = cy - 200;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;

        // Cuerpo del Matraz
        ctx.beginPath();
        ctx.moveTo(cx - 15, flaskY); // Cuello izquierdo
        ctx.lineTo(cx - 15, flaskY + 90);
        ctx.quadraticCurveTo(cx - 75, flaskY + 140, cx - 70, flaskY + 195); // Balón izq
        ctx.lineTo(cx + 70, flaskY + 195); // Base
        ctx.quadraticCurveTo(cx + 75, flaskY + 140, cx + 15, flaskY + 90); // Balón der
        ctx.lineTo(cx + 15, flaskY); // Cuello der
        ctx.stroke();

        // Línea de Aforo (Marca calibrada nominal 250 mL)
        const aforoY = flaskY + 70;
        ctx.strokeStyle = '#ef4444'; // Línea roja de aforo
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 14, aforoY);
        ctx.lineTo(cx + 14, aforoY);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.font = '10px monospace';
        ctx.fillText('250 mL Aforo', cx + 22, aforoY + 3);

        // Renderizado del Líquido CuSO4 dentro del Matraz
        const offsetPx = (volumenEnraseOffset / 10) * 15; // Desviación en píxeles
        const nivelLíquidoY = aforoY - offsetPx;
        const colorSolucion = resultadoQuimico?.colorHex || 'rgba(0, 112, 255, 0.2)';

        ctx.fillStyle = colorSolucion;
        ctx.beginPath();
        ctx.moveTo(cx - 68, flaskY + 193);
        ctx.lineTo(cx + 68, flaskY + 193);
        ctx.quadraticCurveTo(cx + 73, flaskY + 140, cx + 14, nivelLíquidoY);
        // Menisco Cóncavo
        ctx.quadraticCurveTo(cx, nivelLíquidoY + 6, cx - 14, nivelLíquidoY);
        ctx.quadraticCurveTo(cx - 73, flaskY + 140, cx - 68, flaskY + 193);
        ctx.fill();

        // Si se está ejecutando la disolución, mostrar remolinos y partículas solubles
        if (ejecutando) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          for (let i = 0; i < 12; i++) {
            const rx = cx - 40 + Math.random() * 80;
            const ry = nivelLíquidoY + 20 + Math.random() * 90;
            ctx.beginPath();
            ctx.arc(rx, ry, 1 + Math.random() * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // =========================================================================
      // DIBUJO DE LABORATORIO 2: TITULACIÓN ÁCIDO-BASE (BURETA + ERLENMEYER)
      // =========================================================================
      else if (laboratorioId === 'lab_titulacion') {
        const cx = w / 2;

        // Bureta vertical arriba
        const buretaY = 30;
        const buretaH = 180;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 3;
        ctx.strokeRect(cx - 10, buretaY, 20, buretaH);

        // Nivel de NaOH en la bureta
        const pctBureta = Math.min(volumenBaseBureta / 80, 1.0);
        const liquidoBuretaH = (1 - pctBureta) * (buretaH - 10);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fillRect(cx - 8, buretaY + 5 + (buretaH - 10 - liquidoBuretaH), 16, liquidoBuretaH);

        // Gota cayendo desde la bureta al matraz si se está agregando base
        if (ejecutando || volumenBaseBureta > 0) {
          const gotaY = buretaY + buretaH + ((Date.now() / 8) % 70);
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(cx, gotaY, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Matraz Erlenmeyer abajo
        const erlenY = buretaY + buretaH + 70;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 15, erlenY);
        ctx.lineTo(cx - 15, erlenY + 30);
        ctx.lineTo(cx - 65, erlenY + 110);
        ctx.lineTo(cx + 65, erlenY + 110);
        ctx.lineTo(cx + 15, erlenY + 30);
        ctx.lineTo(cx + 15, erlenY);
        ctx.stroke();

        // Color de la mezcla según viraje de fenolftaleína
        const colorViraje = resultadoQuimico?.colorHex || 'rgba(255, 255, 255, 0.05)';
        ctx.fillStyle = colorViraje;
        ctx.beginPath();
        ctx.moveTo(cx - 63, erlenY + 108);
        ctx.lineTo(cx + 63, erlenY + 108);
        ctx.lineTo(cx + 35, erlenY + 65);
        ctx.quadraticCurveTo(cx, erlenY + 67, cx - 35, erlenY + 65);
        ctx.fill();

        // Lectura de pH flotante
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`pH: ${resultadoQuimico?.pH ? resultadoQuimico.pH.toFixed(2) : '2.88'}`, cx + 75, erlenY + 70);
      }

      // =========================================================================
      // DIBUJO DE LABORATORIO 3: TOLLENS / ESPEJO DE PLATA (TUBO + BAÑO MARÍA)
      // =========================================================================
      else if (laboratorioId === 'lab_tollens') {
        const cx = w / 2;

        // Vaso de Baño María (Agua caliente)
        const bathY = tableY - 140;
        ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';
        ctx.fillRect(cx - 80, bathY + 30, 160, 110);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 3;
        ctx.strokeRect(cx - 80, bathY + 20, 160, 120);

        // Burbujas térmicas de Baño María si T > 50°C
        if (temperatura > 50) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          for (let i = 0; i < (temperatura - 40) / 3; i++) {
            const bx = cx - 70 + Math.random() * 140;
            const by = bathY + 40 + Math.random() * 90;
            ctx.beginPath();
            ctx.arc(bx, by, 1 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Tubo de Ensayo en el centro
        const tubeY = bathY - 30;
        const tubeW = 34;
        const tubeH = 160;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - tubeW / 2, tubeY);
        ctx.lineTo(cx - tubeW / 2, tubeY + tubeH - 15);
        ctx.arc(cx, tubeY + tubeH - 15, tubeW / 2, Math.PI, 0, true);
        ctx.lineTo(cx + tubeW / 2, tubeY);
        ctx.stroke();

        // Renderizado del espejo de plata reflectante o solución
        const reflectividad = resultadoQuimico?.reflectividadEspejo || 0;
        if (reflectividad > 0.05) {
          // Gradiente metálico brillante de plata
          const silverGrad = ctx.createLinearGradient(cx - tubeW / 2, 0, cx + tubeW / 2, 0);
          silverGrad.addColorStop(0, '#64748b');
          silverGrad.addColorStop(0.3, '#f8fafc');
          silverGrad.addColorStop(0.7, '#94a3b8');
          silverGrad.addColorStop(1, '#475569');

          ctx.fillStyle = silverGrad;
          ctx.globalAlpha = Math.min(reflectividad * 1.2, 0.95);
          ctx.beginPath();
          ctx.moveTo(cx - tubeW / 2 + 2, tubeY + 40);
          ctx.lineTo(cx - tubeW / 2 + 2, tubeY + tubeH - 15);
          ctx.arc(cx, tubeY + tubeH - 15, tubeW / 2 - 2, Math.PI, 0, true);
          ctx.lineTo(cx + tubeW / 2 - 2, tubeY + 40);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          ctx.fillStyle = resultadoQuimico?.colorSolucionHex || 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(cx - tubeW / 2 + 3, tubeY + 50, tubeW - 6, tubeH - 65);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [laboratorioId, temperatura, tiempo, ejecutando, resultadoQuimico, masaSoluto, volumenEnraseOffset, volumenBaseBureta]);

  return (
    <div className="col-span-12 lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
      {/* Display LED Digital Retroiluminado de Temperatura y Telemetría */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg z-10">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-rose-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-300">TELEMETRÍA DIGITAL:</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-black/80 px-3 py-1 rounded border border-rose-950/80 font-mono text-base font-black text-rose-500 shadow-inner tracking-widest">
            {temperatura.toFixed(1)}°C
          </div>
          <div className="bg-black/80 px-3 py-1 rounded border border-sky-950/80 font-mono text-base font-black text-sky-400 shadow-inner tracking-widest">
            {tiempo}s
          </div>
        </div>
      </div>

      {/* Visor HTML5 Canvas Central */}
      <div className="my-2 relative flex items-center justify-center min-h-[300px]">
        <canvas
          ref={canvasRef}
          width={520}
          height={340}
          className="w-full h-auto rounded-lg border border-slate-850 shadow-inner bg-slate-950"
        />
        {ejecutando && (
          <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 animate-pulse shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulación en Vivo</span>
          </div>
        )}
      </div>

      {/* Estado del experimento en tiempo real */}
      <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg z-10 text-xs">
        <span className="font-bold text-sky-400 uppercase tracking-wider block mb-0.5">Diagnóstico Químico:</span>
        <p className="text-slate-300 font-medium">
          {resultadoQuimico?.mensaje || 'Configura los parámetros estequiométricos y presiona Iniciar Experimento.'}
        </p>
      </div>
    </div>
  );
}
