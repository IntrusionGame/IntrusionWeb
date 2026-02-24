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
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400 select-none">
      {/* SCANLINE Y EFECTOS DE FONDO */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%]" />
      
      {/* BOTÓN VOLVER */}
      <div className="fixed top-6 left-6 z-[60] flex items-center font-elite">
        <Link to="/">
          <Motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
          >
            <FaChevronLeft className="group-hover:animate-pulse text-xs" />
            <span className="text-xs tracking-widest uppercase italic">INTERRUMPIR_ENLACE</span>
          </Motion.div>
        </Link>
      </div>

      <Motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto pt-24 pb-20 px-6 relative z-10"
      >
        {/* CABECERA: TÍTULO Y DATA TÉCNICA */}
        <header className="border-b border-zinc-900 pb-12 mb-16">
          <Motion.div variants={itemVariants} className="flex flex-col mb-8">
            <div className="mb-4">
              <img 
                src={LogoIntrusion} 
                alt="INTRUSION LOGO" 
                className="w-auto h-[50px] sm:h-[70px] md:h-[90px] object-contain drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]"
              />
            </div>
            
            {/* SUBTÍTULO DE ESPECIFICACIONES */}
            <div className="flex items-center gap-3">
               <div className="h-[2px] w-8 bg-red-700" />
               <span className="text-xl md:text-2xl font-glitch text-zinc-400 uppercase tracking-[0.2em]">
                 Especificaciones_del_Sistema
               </span>
            </div>
          </Motion.div>
          
          <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-zinc-900 p-4 bg-zinc-950/40">
              <span className="text-[10px] text-zinc-600 uppercase block mb-2">Clasificación</span>
              <div className="flex items-center gap-3">
                <FaSkullCrossbones className="text-red-700 text-2xl" />
                <span className="text-xl text-zinc-200">PEGI 18+</span>
              </div>
            </div>
            <div className="border border-zinc-900 p-4 bg-zinc-950/40">
              <span className="text-[10px] text-zinc-600 uppercase block mb-2">Unidades de Enlace</span>
              <div className="flex items-center gap-3">
                <FaUsers className="text-red-700 text-2xl" />
                <span className="text-xl text-zinc-200">1 - 4 JUGADORES</span>
              </div>
            </div>
            <div className="border border-zinc-900 p-4 bg-zinc-950/40">
              <span className="text-[10px] text-zinc-600 uppercase block mb-2">Estado del Servidor</span>
              <div className="flex items-center gap-3 text-green-900 animate-pulse">
                <span className="text-xl uppercase">Operativo</span>
              </div>
            </div>
          </Motion.div>
        </header>

        {/* SECCIÓN 1: SINOPSIS */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-6">
              <FaInfoCircle className="text-red-700" />
              <h2 className="text-2xl text-zinc-200 uppercase tracking-widest">Sinopsis_Del_Vacio</h2>
            </div>
            <p className="text-lg leading-relaxed text-zinc-400 indent-8">
              "Infiltration" no es un juego, es una brecha. Te adentrarás en las entrañas de una red 
              neuronal corrupta donde los recuerdos de los Arquitectos se mezclan con protocolos 
              de seguridad letales. Tu misión es simple: encontrar la verdad antes de que el 
              sistema te encuentre a ti.
            </p>
          </Motion.div>
          <Motion.div variants={itemVariants} className="relative aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay group-hover:bg-transparent transition-all duration-700" />
            <span className="text-zinc-700 font-mono text-xs italic uppercase">[Imagen_Corrupta_Preview]</span>
          </Motion.div>
        </section>

        {/* SECCIÓN 2: MECÁNICAS PRINCIPALES */}
        <section className="mb-20">
          <Motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
            <FaCogs className="text-red-700" />
            <h2 className="text-2xl text-zinc-200 uppercase tracking-widest">Protocolos_De_Interacción</h2>
          </Motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { tit: "Hacking Social", d: "Manipula las variables de entorno para engañar a la IA." },
              { tit: "Sigilo Cuántico", d: "Desplázate entre los nodos sin alertar a los centinelas." },
              { tit: "Ingeniería Inversa", d: "Reconstruye los puzles de datos para abrir nuevas rutas." }
            ].map((mec, i) => (
              <Motion.div 
                key={i} variants={itemVariants}
                className="p-6 border-l-2 border-zinc-900 hover:border-red-700 bg-gradient-to-r from-zinc-950/50 to-transparent transition-all group"
              >
                <h3 className="text-red-900 group-hover:text-red-600 transition-colors uppercase mb-2">{mec.tit}</h3>
                <p className="text-sm opacity-60">{mec.d}</p>
              </Motion.div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 3: PERSONAJES (ARCHIVOS) */}
        <section>
          <Motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
            <FaUserShield className="text-red-700" />
            <h2 className="text-2xl text-zinc-200 uppercase tracking-widest">Sujetos_De_Prueba</h2>
          </Motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Sujeto_00", "El_Arquitecto", "Enlace_92", "Centinela"].map((pj, i) => (
              <Motion.div 
                key={i} variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative h-64 bg-zinc-900/40 border border-zinc-900 flex flex-col items-center justify-end p-4 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                <span className="relative z-10 text-[10px] text-red-700 font-mono">[ARCHIVO_{i+1}]</span>
                <span className="relative z-10 text-lg uppercase font-glitch group-hover:text-zinc-100">{pj}</span>
              </Motion.div>
            ))}
          </div>
        </section>

      </Motion.div>
    </div>
  );
};

export default Juego;