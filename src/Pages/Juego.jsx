import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaChevronLeft, FaUsers, FaSkullCrossbones, 
  FaCogs, FaUserShield, FaInfoCircle 
} from "react-icons/fa";

import LogoIntrusion from "../Imagenes/LogoIntrusion.png";

const Juego = () => {
  // Variantes para animaciones de entrada secuencial
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    /* AJUSTE RESPONSIVE: Cambiamos fixed por absolute o aseguramos que el h-screen sea real para iOS */
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto overflow-x-hidden custom-scrollbar font-elite text-zinc-400 select-none">
      
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #450a0a #000; }
        `}
      </style>
      
      {/* SCANLINE Y EFECTOS DE FONDO - Pointer events none para no bloquear el scroll en móvil */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%]" />
      
      {/* BOTÓN VOLVER - Ajuste de posición para Safe Area de iPhone */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] flex items-center font-elite">
        <Link to="/">
          <Motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
          >
            <FaChevronLeft className="group-hover:animate-pulse text-xs" />
            <span className="text-[10px] md:text-xs tracking-widest uppercase italic">INTERRUMPIR_ENLACE</span>
          </Motion.div>
        </Link>
      </div>

      <Motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        /* AJUSTE RESPONSIVE: Padding lateral reducido en móvil (px-4) y superior ajustado */
        className="max-w-5xl mx-auto pt-20 md:pt-24 pb-20 px-4 md:px-6 relative z-10"
      >
        {/* CABECERA: TÍTULO Y DATA TÉCNICA */}
        <header className="border-b border-zinc-900 pb-8 md:pb-12 mb-12 md:mb-16">
          <Motion.div variants={itemVariants} className="flex flex-col mb-8">
            <div className="mb-4">
              <img 
                src={LogoIntrusion} 
                alt="INTRUSION LOGO" 
                /* AJUSTE RESPONSIVE: Logo más pequeño en móvil para evitar desborde */
                className="w-auto h-[40px] sm:h-[60px] md:h-[90px] object-contain drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]"
              />
            </div>
            
            {/* SUBTÍTULO DE ESPECIFICACIONES */}
            <div className="flex items-center gap-3">
               <div className="h-[2px] w-6 md:w-8 bg-red-700" />
               <span className="text-sm sm:text-lg md:text-2xl font-glitch text-zinc-400 uppercase tracking-[0.15em] md:tracking-[0.2em] break-words">
                 Especificaciones_del_Sistema
               </span>
            </div>
          </Motion.div>
          
          {/* AJUSTE RESPONSIVE: Grid de 1 columna en móvil, 3 en desktop */}
          <Motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="border border-zinc-900 p-4 bg-zinc-950/40 flex flex-col justify-center">
              <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase block mb-1">Clasificación</span>
              <div className="flex items-center gap-3">
                <FaSkullCrossbones className="text-red-700 text-xl md:text-2xl" />
                <span className="text-lg md:text-xl text-zinc-200">PEGI 18+</span>
              </div>
            </div>
            <div className="border border-zinc-900 p-4 bg-zinc-950/40 flex flex-col justify-center">
              <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase block mb-1">Unidades de Enlace</span>
              <div className="flex items-center gap-3">
                <FaUsers className="text-red-700 text-xl md:text-2xl" />
                <span className="text-lg md:text-xl text-zinc-200">1 - 4 JUGADORES</span>
              </div>
            </div>
            <div className="border border-zinc-900 p-4 bg-zinc-950/40 flex flex-col justify-center sm:col-span-2 md:col-span-1">
              <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase block mb-1">Estado del Servidor</span>
              <div className="flex items-center gap-3 text-green-900 animate-pulse">
                <span className="text-lg md:text-xl uppercase">Operativo</span>
              </div>
            </div>
          </Motion.div>
        </header>

        {/* SECCIÓN 1: SINOPSIS */}
        <section className="mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <Motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <FaInfoCircle className="text-red-700" />
              <h2 className="text-xl md:text-2xl text-zinc-200 uppercase tracking-widest">Sinopsis_Del_Vacio</h2>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-zinc-400 indent-4 md:indent-8">
              "Infiltration" no es un juego, es una brecha. Te adentrarás en las entrañas de una red 
              neuronal corrupta donde los recuerdos de los Arquitectos se mezclan con protocolos 
              de seguridad letales. Tu misión es simple: encontrar la verdad antes de que el 
              sistema te encuentre a ti.
            </p>
          </Motion.div>
          <Motion.div variants={itemVariants} className="relative aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay group-hover:bg-transparent transition-all duration-700" />
            <span className="text-zinc-700 font-mono text-[10px] md:text-xs italic uppercase">[Imagen_Corrupta_Preview]</span>
          </Motion.div>
        </section>

        {/* SECCIÓN 2: MECÁNICAS PRINCIPALES */}
        <section className="mb-16 md:mb-20">
          <Motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 md:mb-10">
            <FaCogs className="text-red-700" />
            <h2 className="text-xl md:text-2xl text-zinc-200 uppercase tracking-widest">Protocolos_De_Interacción</h2>
          </Motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { tit: "Hacking Social", d: "Manipula las variables de entorno para engañar a la IA." },
              { tit: "Sigilo Cuántico", d: "Desplázate entre los nodos sin alertar a los centinelas." },
              { tit: "Ingeniería Inversa", d: "Reconstruye los puzles de datos para abrir nuevas rutas." }
            ].map((mec, i) => (
              <Motion.div 
                key={i} variants={itemVariants}
                className="p-5 md:p-6 border-l-2 border-zinc-900 hover:border-red-700 bg-gradient-to-r from-zinc-950/50 to-transparent transition-all group"
              >
                <h3 className="text-red-900 group-hover:text-red-600 transition-colors uppercase mb-2 text-sm md:text-base font-bold">{mec.tit}</h3>
                <p className="text-xs md:text-sm opacity-60 leading-snug">{mec.d}</p>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 3: PERSONAJES (ARCHIVOS) */}
        <section>
          <Motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 md:mb-10">
            <FaUserShield className="text-red-700" />
            <h2 className="text-xl md:text-2xl text-zinc-200 uppercase tracking-widest">Sujetos_De_Prueba</h2>
          </Motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {["Sujeto_00", "El_Arquitecto", "Enlace_92", "Centinela"].map((pj, i) => (
              <Motion.div 
                key={i} variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                /* AJUSTE RESPONSIVE: Altura reducida en móvil (h-40) para que quepan en grid de 2 */
                className="relative h-40 md:h-64 bg-zinc-900/40 border border-zinc-900 flex flex-col items-center justify-end p-3 md:p-4 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                <span className="relative z-10 text-[8px] md:text-[10px] text-red-700 font-mono">[ARCHIVO_{i+1}]</span>
                <span className="relative z-10 text-sm md:text-lg uppercase font-glitch group-hover:text-zinc-100 text-center">{pj}</span>
              </Motion.div>
            ))}
          </div>
        </section>

      </Motion.div>
    </div>
  );
};

export default Juego;