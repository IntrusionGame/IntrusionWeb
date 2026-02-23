import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaSkull, FaLock, FaTerminal, FaEye } from "react-icons/fa";

const Bitacora = () => {
  /**
   * PUNTO CRÍTICO: Base de Datos de Registros
   * Los IDs deben ser puramente numéricos para que coincidan con 
   * las keys del archivo de datos).
   */
  const registros = [
    { id: "230226", titulo: "PROTOCOLO_23022026.log", fecha: "23/02/26", riesgo: "CRÍTICO" },
    { id: "150326", titulo: "PROTOCOLO_15032026.log", fecha: "15/03/26", riesgo: "ALTO" },
    { id: "180326", titulo: "PROTOCOLO_18032026.log", fecha: "18/03/26", riesgo: "DESCONOCIDO" },
    { id: "200326", titulo: "PROTOCOLO_20032026.log", fecha: "20/03/26", riesgo: "BAJO" },
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-500 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif !important; }

          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
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
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR  */}
      <div className="fixed top-6 left-6 z-[60] flex items-center font-elite">
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

      <div className="max-w-4xl mx-auto pt-24 pb-20 px-6">
        <header className="border-b border-zinc-900 pb-8 mb-12">
          <Motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-glitch text-zinc-200 uppercase tracking-tighter"
          >
            Bitácora de Incidencias
          </Motion.h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[10px] text-red-900 animate-pulse uppercase tracking-[0.3em]">Acceso No Autorizado Detectado</span>
            <div className="h-[1px] flex-grow bg-red-900/20" />
          </div>
        </header>

        {/**
         * LISTADO DE REGISTROS
         * Renderizado dinámico de los protocolos disponibles.
         */}
        <section className="space-y-4">
          {registros.map((reg, index) => (
            <Motion.div
              key={reg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/**
               * PUNTO CRÍTICO: Construcción de URL Estética
               * Se concatena la palabra 'protocolo' con el ID para generar 
               * una URL tipo /blog/protocolo230226 que el Router pueda capturar.
               */}
              <Link 
                to={`/blog/protocolo${reg.id}`} 
                className="group relative flex items-center justify-between p-6 border border-zinc-900 bg-zinc-950/20 hover:border-red-900/40 transition-all duration-500 overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs text-zinc-800 group-hover:text-red-900 font-mono transition-colors">
                    [{index + 1 < 10 ? `0${index + 1}` : index + 1}]
                  </span>
                  <div>
                    <h2 className="text-lg text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-wider flex items-center gap-3">
                      {reg.titulo}
                      <FaLock className="text-[10px] text-zinc-800 group-hover:text-red-900 transition-colors" />
                    </h2>
                    <span className="text-[9px] text-zinc-700 uppercase tracking-widest">
                      {reg.fecha} // RIESGO: <span className={reg.riesgo === "CRÍTICO" ? "text-red-700" : ""}>{reg.riesgo}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Motion.div
                    whileHover={{ rotate: 180 }}
                    className="text-zinc-800 group-hover:text-red-600 transition-colors"
                  >
                    <FaEye size={18} />
                  </Motion.div>
                  <FaTerminal className="text-zinc-900" />
                </div>

                {/* EFECTO DE RESPLANDOR AL PASAR EL MOUSE */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-red-600 transition-opacity" />
              </Link>
            </Motion.div>
          ))}
        </section>

        <footer className="mt-20 pt-8 border-t border-zinc-900 flex flex-col items-center gap-4">
          <FaSkull className="text-zinc-900 text-3xl" />
          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.5em] text-center">
            Si puedes leer esto, ya es demasiado tarde para el Sujeto_00.
          </p>
        </footer>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Bitacora;