import { motion as Motion, AnimatePresence } from "framer-motion"; // Añadido AnimatePresence para transiciones suaves
import { Link } from "react-router-dom";
import { useState } from "react"; // Necesario para la paginación
import { FaChevronLeft, FaSkull, FaLock, FaTerminal, FaEye, FaChevronRight } from "react-icons/fa";

// IMPORTACIÓN OPTIMIZADA: Traemos los datos de fuera
import { DatosBlog } from "../DatosBlog/indiceBlog.js"; 

const Bitacora = () => {
  // LÓGICA DE PAGINACIÓN (Sin tocar el visual)
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 4;

  const totalPaginas = Math.ceil(DatosBlog.length / registrosPorPagina);
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;
  const registrosActuales = DatosBlog.slice(indicePrimero, indiceUltimo);

  return (
    /* AJUSTE: overflow-x-hidden para evitar desborde en iPhone 15 */
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto overflow-x-hidden custom-scrollbar font-elite text-zinc-500 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif !important; }

          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #450a0a #000; }

          .scanline {
            width: 100%; height: 2px; background: rgba(153, 27, 27, 0.1);
            position: fixed; top: 0; left: 0; pointer-events: none; z-index: 50;
            animation: scanline 8s linear infinite;
          }
          @keyframes scanline { 0% { top: 0; } 100% { top: 100vh; } }
        `}
      </style>

      <div className="scanline" />
      
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] flex items-center font-elite">
        <Link to="/">
          <Motion.div 
            whileHover={{ x: -2 }}
            className="flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
          >
            <FaChevronLeft className="group-hover:animate-pulse text-[10px]" />
            <span className="text-[10px] tracking-widest uppercase italic">SALIR_DEL_SISTEMA</span>
          </Motion.div>
        </Link>
      </div>

      {/* AJUSTE: px-4 en móvil para evitar que el contenido toque los bordes del iPhone */}
      <div className="max-w-4xl mx-auto pt-20 md:pt-24 pb-20 px-4 md:px-6">
        <header className="border-b border-zinc-900 pb-8 mb-12">
          <Motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* AJUSTE: text-2xl en móvil para que el título no desborde */
            className="text-2xl md:text-4xl font-glitch text-red-700 uppercase tracking-tighter"
          >
            Bitácora de Incidencias
          </Motion.h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mt-2">
            <span className="text-[8px] md:text-[10px] animate-pulse uppercase tracking-[0.2em] md:tracking-[0.3em]">
              Acceso No Autorizado Detectado // Pág_{paginaActual}_de_{totalPaginas}
            </span>
            <div className="h-[1px] flex-grow bg-red-900/20" />
          </div>
        </header>

        <section className="space-y-4 min-h-[460px]">
          <AnimatePresence mode="wait">
            <Motion.div
              key={paginaActual}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {registrosActuales.map((reg, index) => (
                <Motion.div
                  key={reg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={`/blog/protocolo${reg.id}`} 
                    /* AJUSTE: p-4 en móvil para dar espacio a los iconos internos */
                    className="group relative flex items-center justify-between p-4 md:p-6 border border-zinc-900 bg-zinc-950/20 hover:border-red-900/40 transition-all duration-500 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-[10px] md:text-xs text-zinc-800 group-hover:text-red-900 font-mono transition-colors">
                        [{indicePrimero + index + 1 < 10 ? `0${indicePrimero + index + 1}` : indicePrimero + index + 1}]
                      </span>
                      <div>
                        {/* AJUSTE: text-sm en móvil para que el título del protocolo quepa en una línea */}
                        <h2 className="text-sm md:text-lg text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-wider flex items-center gap-2 md:gap-3">
                          {reg.titulo}
                          <FaLock className="text-[8px] md:text-[10px] text-zinc-800 group-hover:text-red-900 transition-colors" />
                        </h2>
                        <span className="text-[8px] md:text-[9px] text-zinc-700 uppercase tracking-widest block mt-1">
                          {reg.fecha} // RIESGO: <span className={reg.riesgo === "CRÍTICO" ? "text-red-700" : ""}>{reg.riesgo}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Motion.div
                        whileHover={{ rotate: 180 }}
                        className="text-zinc-800 group-hover:text-red-600 transition-colors"
                      >
                        <FaEye size={16} className="md:w-[18px]" />
                      </Motion.div>
                      <FaTerminal className="hidden sm:block text-zinc-900" />
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-red-600 transition-opacity" />
                  </Link>
                </Motion.div>
              ))}
            </Motion.div>
          </AnimatePresence>
        </section>

        {/* --- NUEVA PAGINACIÓN (Respetando estética y textos originales) --- */}
        <div className="relative -mt-16 md:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-8 font-elite z-10">
          <button
            onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            /* Reducimos tracking al mínimo en móvil para que no ocupe ancho de más */
            className={`text-[9px] md:text-[10px] tracking-tight md:tracking-[0.3em] uppercase transition-all flex items-center gap-2 ${paginaActual === 1 ? "opacity-5" : "text-zinc-700 hover:text-red-700"}`}
          >
            [REBOBINAR_MEMORIA]
          </button>

          <div className="flex gap-2 my-1 sm:my-0">
            {[...Array(totalPaginas)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rotate-45 transition-all duration-500 ${i + 1 === paginaActual ? "bg-red-700 shadow-[0_0_8px_red] scale-125" : "bg-zinc-900"}`} 
              />
            ))}
          </div>

          <button
            onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            className={`text-[9px] md:text-[10px] tracking-tight md:tracking-[0.3em] uppercase transition-all flex items-center gap-2 ${paginaActual === totalPaginas ? "opacity-5" : "text-zinc-700 hover:text-red-700 animate-pulse"}`}
          >
            [RASTREAR_MÁS_ERRORES]
          </button>
        </div>

        {/* --- FOOTER: COMPACTADO PARA SUBIR EL BLOQUE ANTERIOR --- */}
        <footer className="mt-8 md:mt-20 pt-4 border-t border-zinc-900 flex flex-col items-center gap-3 pb-20 md:pb-10">
          <FaSkull className="text-zinc-900 text-xl md:text-3xl" />
<p className="text-[8px] md:text-[10px] text-zinc-800 uppercase tracking-[0.2em] md:tracking-[0.4em] text-center px-6 max-w-[300px] md:max-w-[600px] leading-relaxed">            Si puedes leer esto, ya es demasiado tarde para el Sujeto_00.
          </p>
        </footer>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Bitacora;