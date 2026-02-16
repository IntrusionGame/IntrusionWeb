import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [timer, setTimer] = useState("00:00:00");

  // Sistema de Reloj en Tiempo Real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimer(now.toLocaleTimeString("en-GB"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: [0, 1, 0.2, 1, 0.5, 1], 
        y: 0 
      }}
      transition={{ 
        duration: 0.8, 
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        delay: 2.2 
      }}
      className="fixed bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end pointer-events-none z-50 select-none font-elite"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
          .font-elite { font-family: 'Special Elite', serif; }
        `}
      </style>

      {/* SECCIÓN IZQUIERDA: Monitor de Estado */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-red-950/10 border-l-2 border-red-800 px-3 py-1">
          <div className="relative">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping absolute" />
            <div className="w-2 h-2 bg-red-600 rounded-full" />
          </div>
          <span className="text-[10px] md:text-xs text-red-500 tracking-[0.2em] uppercase">
            Sujeto detectado: <span className="text-zinc-300">USER_404</span>
          </span>
        </div>

        {/* Indicadores de Actividad */}
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-4 md:w-6 ${i < 5 ? "bg-red-900/40" : "bg-zinc-800/20"} animate-pulse`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* SECCIÓN DERECHA: Telemetría y Protocolo */}
      <div className="flex flex-col items-end text-right">
        <div className="text-[16px] md:text-xl text-zinc-300 font-bold tracking-widest leading-none mb-1">
          {timer}
        </div>

        <div className="flex items-center gap-2 border-b border-red-900/50 pb-1 mb-1">
          <span className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest">
            AMENAZA:
          </span>
          <span className="text-[9px] md:text-[11px] text-red-600 uppercase font-black animate-pulse drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">
            CRÍTICO
          </span>
        </div>

        <div className="text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
          PROTOCOLO <span className="text-zinc-300 font-bold italic">INTRUSION</span> ACTIVO. <br />
          <span className="text-red-800/90 text-[8px] md:text-[10px] font-semibold tracking-[0.1em]">
            ACCESO RESTRINGIDO A NIVEL 4
          </span>
        </div>
      </div>

      {/* Línea Decorativa Inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-950/20 to-transparent" />
    </motion.footer>
  );
};

export default Footer;