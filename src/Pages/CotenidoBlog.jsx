import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { 
  FaChevronLeft, FaExclamationTriangle, 
  FaFileContract, FaVideo, FaSearch, FaSkull 
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { ApartadosBlog } from "../DatosBlog/index.js";

const TranscripcionIncidente = () => {
  const { id } = useParams();
  
  /**
   * PUNTO CRÍTICO: Lógica de Identificación
   * Extraemos el ID numérico de la URL (ej: 'protocolo230226' -> '230226')
   * para localizar los datos correctos en el JSON de incidentes.
   */
  const cleanId = id ? id.replace("protocolo", "") : "";
  const [loading, setLoading] = useState(true);
  const incidente = ApartadosBlog[cleanId];

  /**
   * PUNTO CRÍTICO: Ciclo de Vida y Carga
   * El efecto se dispara cada vez que el ID de la URL cambia.
   * La 'key={id}' en el render asegura que el componente se reinicie 
   * completamente al navegar entre diferentes protocolos.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  // VARIANTES PARA LA ENTRADA SECUENCIAL (STAGGER)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Tiempo entre la aparición de cada elemento
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black font-elite text-red-600 text-xl uppercase tracking-widest z-[100]">
        <Motion.div 
          animate={{ opacity: [1, 0.4, 1] }} 
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <FaSearch className="inline-block mr-4" /> 
          SISTEMA_BUSCANDO: {id?.toUpperCase()}...
        </Motion.div>
      </div>
    );
  }

  if (!incidente) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black font-elite text-red-700 z-[100]">
        <div className="text-center p-6 border border-red-900/50 bg-red-950/5">
          <FaExclamationTriangle className="text-5xl mb-4 mx-auto animate-pulse" />
          <h2 className="text-2xl mb-2 uppercase">Acceso Denegado</h2>
          <p className="tracking-[0.3em] text-xs opacity-70">
            EL_ARCHIVO_{id}_NO_EXISTE_O_ESTÁ_CORRUPTO
          </p>
          <Link 
            to="/blog" 
            className="mt-8 inline-block text-[10px] border border-red-900 px-4 py-2 hover:bg-red-900 hover:text-black transition-all uppercase tracking-tighter"
          >
            Volver a la Terminal
          </Link>
        </div>
      </div>
    );
  }

  return (
<div key={id} className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400 pb-32">      <style>
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
            width: 100%; height: 2px; background: rgba(153, 27, 27, 0.15);
            position: fixed; top: 0; left: 0; pointer-events: none; z-index: 100;
            animation: scanline 6s linear infinite;
          }
          @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
        `}
      </style>

      <div className="scanline" />
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      {/* BARRA DE NAVEGACIÓN SUPERIOR IZQUIERDA */}
      <div className="fixed top-6 left-6 z-[60] flex items-center gap-4 font-elite">
        
        {/* BOTÓN 1: CERRAR ARCHIVO */}
        <Link to="/blog">
          <Motion.div 
            whileHover={{ x: -5 }} // Volvemos al desplazamiento original
            className="flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
          >
            <FaChevronLeft className="group-hover:animate-pulse text-xs" />
            <span className="text-xs tracking-widest uppercase italic">CERRAR_ARCHIVO</span>
          </Motion.div>
        </Link>

        {/* SEPARADOR VISUAL */}
        <span className="text-zinc-900 select-none opacity-50">|</span>

        {/* BOTÓN 2: MENÚ PRINCIPAL */}
        <Link to="/">
          <Motion.div 
            whileHover={{ x: -5 }} 
            className="flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
          >
            {/* Opcional: puedes añadir el icono aquí también si quieres simetría total */}
            <span className="text-xs tracking-widest uppercase italic">SISTEMA_RAÍZ</span>
          </Motion.div>
        </Link>
      </div>

      {/* CUERPO DEL DOCUMENTO CON ANIMACIÓN POR PASOS */}
      <Motion.div 
        className="max-w-3xl mx-auto pt-24 pb-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Motion.header variants={itemVariants} className="border-b border-red-900/30 pb-8 mb-12">
          <h1 className="text-3xl md:text-5xl font-glitch text-red-700 uppercase mb-4 tracking-tighter">
            {incidente.titulo}
          </h1>
          <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase text-zinc-500">
            <span className="flex items-center gap-2 border border-red-900/40 px-2 py-1">
              <FaFileContract className="text-red-700" /> {incidente.clasificacion}
            </span>
            <span className="flex items-center gap-2 border border-zinc-900 px-2 py-1">
              <FaVideo className="text-zinc-700" /> {incidente.fecha}
            </span>
          </div>
        </Motion.header>

        <div className="space-y-10">
          {incidente.contenido.map((item, idx) => (
            <Motion.div 
              key={idx} 
              variants={itemVariants}
            >
              {/* RENDERIZADO DINÁMICO POR TIPO DE CONTENIDO */}
              {item.tipo === "titulo" && (
                <div className="relative flex flex-col mb-8 mt-16 group">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-2xl md:text-3xl font-glitch text-red-600 uppercase tracking-[0.2em] bg-gradient-to-r from-red-950/30 to-transparent px-4 py-2 border-l-4 border-red-700 relative overflow-hidden">
                      {item.texto}
                      <Motion.div 
                        className="absolute inset-0 bg-red-500/10 w-1/2 -skew-x-12"
                        animate={{ x: ["-150%", "250%"] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      />
                    </h2>
                    <div className="h-[1px] flex-grow bg-red-900/40 relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 bg-red-700 rotate-45" />
                    </div>
                  </div>
                </div>
              )}

              {item.tipo === "subtitulo" && (
                <div className="flex items-center gap-3 mb-4 mt-8 opacity-80">
                  <div className="w-2 h-2 bg-red-900 rotate-45" />
                  <h3 className="text-sm md:text-base font-elite text-zinc-400 uppercase tracking-[0.3em] border-b border-red-900/30 pb-1">
                    {item.texto}
                  </h3>
                </div>
              )}

              {item.tipo === "parrafo" && (
                <p className="text-lg leading-relaxed text-zinc-300 font-elite indent-8">
                  {item.texto}
                </p>
              )}

              {item.tipo === "imagen" && (
                <div className="relative group my-12 flex flex-col items-center">
                  <div className="absolute -inset-1 bg-red-900/10 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative border border-zinc-900 bg-black w-full overflow-hidden flex flex-col">
                    <div className="flex justify-center bg-zinc-950/50">
                      <img 
                        src={item.src} 
                        className="w-auto h-auto max-w-full max-h-[600px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                        alt="Evidencia" 
                      />
                    </div>
                    <div className="p-3 border-t border-zinc-900 bg-black/80 font-elite text-center">
                      <p className="text-[10px] text-red-900 uppercase tracking-widest flex items-center justify-center gap-2">
                        <FaExclamationTriangle />
                        <span>{item.caption}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Motion.div>
          ))}
        </div>

        <Motion.footer variants={itemVariants} className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center gap-6 opacity-40">
          <FaSkull className="text-red-900 text-3xl" />
          <p className="text-[9px] tracking-[0.6em] uppercase text-center font-elite">
            fin de la transmisión // la curiosidad mató al arquitecto
          </p>
        </Motion.footer>
      </Motion.div>

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default TranscripcionIncidente;