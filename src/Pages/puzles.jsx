import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaLock, FaSkull, FaEye, FaMicrochip } from "react-icons/fa";

const Expedientes = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 }
    }
  };

  const puzzleVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const puzzles = [
    {
      fase: "I: EL INGRESO",
      titulo: "LA INTRUSIÓN",
      desc: "El silencio se rompe con el crujido de un marco de madera. Un error de cálculo, un destello en la oscuridad y un impacto seco. La sesión comienza con una pérdida total de control. No deberías haber entrado por esa ventana.",
      puzle: "PRÓLOGO: Transmisión interrumpida. Estado inconsciente.",
      img: "URL_IMAGEN_CINEMATICA" 
    },
    {
      fase: "II: EL SÓTANO",
      titulo: "CANDADOS E HILOS",
      desc: "Despertar en la penumbra, confinado. Los muros hablan a través de conexiones cromáticas y metal oxidado. Encuentra el patrón oculto en los muros antes de que el tiempo se agote. La salida está arriba, pero el código está en los detalles.",
      puzle: "SISTEMA DE SEGURIDAD: Sincronización de frecuencias y fibras.",
      img: "URL_IMAGEN_SOTANO"
    },
    {
      fase: "III: PRIMERA PLANTA",
      titulo: "EL SALÓN Y EL BAÑO",
      desc: "Un entorno doméstico distorsionado. Las medicinas dictan una cronología y las siluetas en el suelo reclaman su lugar. El montacargas es tu único aliado, pero requiere una ofrenda de lógica y orden. Cuidado con lo que despiertas al moverte.",
      puzle: "ASOCIACIÓN Y ORDEN: Reconstrucción de la escena del crimen.",
      peligro: "BIO-AMENAZA: El guardián de cuatro patas reacciona a la negligencia. Mantén la calma o prepárate para el descenso del propietario.",
      img: "URL_IMAGEN_PLANTA1"
    },
    {
      fase: "IV: SEGUNDA PLANTA",
      titulo: "REVELADO FINAL",
      desc: "La cámara oscura revela la verdad envuelta en plástico. Cada objeto es una pieza de un rompecabezas macabro que conecta con tu primer descenso. Encuentra la llave maestra entre los ecos del sótano para finalizar el protocolo de huida.",
      puzle: "CORRESPONDENCIA: Identificación de activos y nexos físicos.",
      peligro: "ALERTA ACÚSTICA: El entorno es inestable. Un paso en falso alertará al objetivo. Asegura los accesos antes de que el cierre sea permanente.",
      img: "URL_IMAGEN_PLANTA2"
    }
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #450a0a #000; }

          @keyframes flicker {
            0% { opacity: 0.8; }
            5% { opacity: 0.4; }
            10% { opacity: 0.9; }
            15% { opacity: 0.3; }
            20% { opacity: 0.9; }
            100% { opacity: 1; }
          }
          .animate-flicker { animation: flicker 4s infinite; }

          @keyframes text-glitch {
            0% { transform: translate(0); text-shadow: 0 0 0 transparent; }
            2% { transform: translate(-2px, 1px); text-shadow: 2px 0 red, -2px 0 blue; }
            4% { transform: translate(2px, -1px); text-shadow: -2px 0 red, 2px 0 blue; }
            6% { transform: translate(0); text-shadow: 0 0 0 transparent; }
          }
          .group:hover .glitch-hover { animation: text-glitch 0.3s cubic-bezier(.25,.46,.45,.94) both; }
        `}
      </style>

      <Link to="/">
        <motion.div 
          whileHover={{ x: -5 }}
          className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-colors cursor-pointer group"
        >
          <FaChevronLeft className="group-hover:animate-pulse" />
          <span className="text-xs tracking-widest uppercase">ABORTAR_SESIÓN</span>
        </motion.div>
      </Link>

      <div className="max-w-5xl mx-auto pt-24 pb-20 px-6">
        <header className="border-b border-red-900/30 pb-8 mb-16 relative">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-glitch text-red-700 uppercase mb-4 tracking-tighter drop-shadow-[0_0_8px_rgba(185,28,28,0.4)]"
          >
            Expedientes de Puzles
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            <span className="flex items-center gap-2"><FaMicrochip className="animate-pulse" /> ID_PROYECTO: INTRUSION</span>
            <span className="flex items-center gap-2"><FaEye /> ESTADO: CLASIFICADO</span>
            <span className="flex items-center gap-2"><FaSkull className="text-red-900" /> AMENAZA: NIVEL_4</span>
          </div>
        </header>

        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-32"
        >
          {puzzles.map((p, index) => (
            <motion.div 
              key={index}
              variants={puzzleVariants}
              className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group"
            >
              <div className="absolute -left-4 top-0 w-[1px] h-full bg-gradient-to-b from-red-800 to-transparent hidden lg:block opacity-20" />

              <div className="space-y-6">
                <div className="relative">
                  <span className="text-red-700 text-xs font-bold tracking-widest block mb-2">{p.fase}</span>
                  <h2 className="text-2xl md:text-3xl text-zinc-200 font-bold tracking-tight uppercase glitch-hover transition-colors group-hover:text-red-500">
                    {p.titulo}
                  </h2>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-900 p-5 rounded-sm italic text-sm leading-relaxed border-l-red-900 border-l-2 shadow-inner animate-flicker text-zinc-300">
                  "{p.desc}"
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <FaLock className="text-red-800 mt-1 flex-shrink-0" size={14} />
                    <p className="text-xs leading-relaxed text-zinc-500">
                      <span className="text-zinc-300 uppercase tracking-wider font-bold">
                        {p.puzle.split(': ')[0]}:
                      </span>
                      <span className="ml-1 italic">
                        {p.puzle.split(': ')[1]}
                      </span>
                    </p>
                  </div>
                  
                  {p.peligro && (
                    <div className="flex gap-3 bg-red-950/5 p-3 border border-red-950/20 group-hover:bg-red-950/20 transition-all">
                      <FaSkull className="text-red-600 mt-1 flex-shrink-0 animate-bounce" size={14} />
                      <p className="text-[10px] leading-relaxed text-red-600 font-bold uppercase tracking-widest">
                        {p.peligro}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" 
                />
                <div className="w-full aspect-video bg-zinc-950 border border-zinc-900 flex items-center justify-center relative overflow-hidden group-hover:border-red-900/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-zinc-800 group-hover:border-red-900 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-zinc-800 group-hover:border-red-900 transition-colors" />
                  
                  <span className="text-[10px] text-zinc-800 tracking-[0.5em] uppercase font-bold group-hover:text-red-900/40 transition-colors">Visual_Data_Missing</span>
                  
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                </div>
                <div className="mt-2 text-[8px] text-zinc-700 text-right font-mono uppercase tracking-widest italic group-hover:text-red-900 transition-colors">
                  DAT_STREAM: STAGE_{index + 1}_LIVE
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>

      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150" />
    </div>
  );
};

export default Expedientes;