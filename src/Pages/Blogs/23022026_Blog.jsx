import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft, FaRadiation, FaExclamationTriangle, FaFileContract, FaVideo, FaSearch, FaSkull } from "react-icons/fa";
import { useEffect, useState } from "react";
import Logo from "../../Imagenes/Blog/Logo.jpg";
import Casa from "../../Imagenes/Blog/Casa.jpg";
import Menu from "../../Imagenes/Blog/Menu.jpg";

const TranscripcionIncidente = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- CONTENIDO DEL POST ---
  const incidente = {
    titulo: "BITÁCORA DE DISEÑO",
    fecha: "2026-03-22 // 03:34 AM",
    clasificacion: "NIVEL_OMEGA-ROJO",
    contenido: [
      {
        tipo: "titulo",
        texto: "Diseño."
      },
      {
        tipo: "parrafo",
        texto: "La jefa de diseño se encargo de hacer el logo como el favicom."
      },
      {
        tipo: "imagen",
        src: Logo, 
        caption: "CAPTURA_SISTEMA: Manifestación del logo del videojuego."
      },
      {
        tipo: "parrafo",
        texto: "El resto de diseñadores también se encargaron de hacer el diseño de la casa de manera cenital."
      },
      {
        tipo: "imagen",
        src: Casa, 
        caption: "CAPTURA_SISTEMA: Manifestación de la casa en el Sector Delta-7."
      },
      {
        tipo: "titulo",
        texto: "UI."
      },
      {
        tipo: "parrafo",
        texto: "El jefe de UI se encargo de hacer el diseño de como sera el menú principal apoyandose en lo que le comentaban desde diseño."
      },
      {
        tipo: "imagen",
        src: Menu, 
        caption: "CAPTURA_SISTEMA: Manifestación del menú principal."
      },
      {
        tipo: "codigo",
        texto: "ERROR_CRÍTICO: INTEGRIDAD_DIMENSIONAL_0%\nGRAVEDAD_LOCAL: INESTABLE\nESTADO_SUJETO: DESCONOCIDO\n\nCONTINUAR_BAJO_PROPIO_RIESGO..."
      },
      {
        tipo: "parrafo",
        texto: "El equipo de reconocimiento no regresó. Las últimas señales de audio contienen frecuencias que el oído humano no debería procesar. Hemos sellado el acceso al archivo original, lo que ves aquí es solo un eco de lo que realmente sucedió en la oscuridad."
      }
    ]
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black font-elite text-red-600 text-xl uppercase tracking-widest">
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          <FaSearch className="inline-block mr-4" /> Recopilando fragmentos...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif !important; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }

          .scanline {
            width: 100%;
            height: 2px;
            background: rgba(153, 27, 27, 0.15);
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 100;
            animation: scanline 6s linear infinite;
          }
          @keyframes scanline {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
        `}
      </style>

      <div className="scanline" />
      
      {/* BOTÓN VOLVER */}
      <Link to="/blog">
        <motion.div 
          whileHover={{ x: -5 }}
          className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group"
        >
          <FaChevronLeft className="group-hover:animate-pulse" />
          <span className="text-xs tracking-widest uppercase italic font-elite">ABORTAR_LECTURA</span>
        </motion.div>
      </Link>

      <div className="max-w-3xl mx-auto pt-24 pb-20 px-6">
        {/* ENCABEZADO */}
        <header className="border-b border-red-900/30 pb-8 mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-glitch text-red-700 uppercase mb-4 tracking-tighter"
          >
            {incidente.titulo}
          </motion.h1>
          <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase text-zinc-500">
            <span className="flex items-center gap-2 border border-red-900/40 px-2 py-1">
              <FaFileContract className="text-red-700" /> {incidente.clasificacion}
            </span>
            <span className="flex items-center gap-2 border border-zinc-900 px-2 py-1">
              <FaVideo className="text-zinc-700" /> {incidente.fecha}
            </span>
          </div>
        </header>

        {/* CUERPO DEL DOCUMENTO */}
       <div className="space-y-10">
  {incidente.contenido.map((item, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* --- NUEVA LÓGICA PARA TÍTULOS DE SECCIÓN --- */}
      {item.tipo === "titulo" && (
        <div className="flex items-center gap-4 mb-6 mt-12">
          <h2 className="text-xl md:text-2xl font-glitch text-red-600 uppercase tracking-widest bg-red-950/10 px-2 py-1 border-l-4 border-red-700">
            {item.texto}
          </h2>
          <div className="h-[1px] flex-grow bg-red-900/20" />
        </div>
      )}

      {item.tipo === "parrafo" && (
        <p className="text-lg leading-relaxed text-zinc-300 font-elite indent-8">
          {item.texto}
        </p>
      )}

      {item.tipo === "imagen" && (
  <div className="relative group my-12 flex flex-col items-center">
    {/* Efecto de resplandor de fondo */}
    <div className="absolute -inset-1 bg-red-900/10 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
    
    <div className="relative border border-zinc-900 bg-black w-full overflow-hidden flex flex-col">
      {/* Contenedor de la imagen con ajuste dinámico */}
      <div className="flex justify-center bg-zinc-950/50">
        <img 
          src={item.src} 
          className="w-auto h-auto max-w-full max-h-[600px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          alt="Archivo visual"
        />
      </div>
      
      {/* Pie de foto */}
      <div className="p-3 border-t border-zinc-900 bg-black/80 font-elite">
        <p className="text-[10px] text-red-900 uppercase tracking-widest flex items-center gap-2">
          <FaExclamationTriangle className="shrink-0" /> 
          <span className="truncate">{item.caption}</span>
        </p>
      </div>
    </div>
  </div>
)}

      {item.tipo === "codigo" && (
        <div className="bg-red-950/5 border-l-4 border-red-900 p-6 my-8 shadow-inner">
          <FaRadiation className="text-red-700 mb-4 animate-pulse" />
          <p className="text-sm text-red-600 font-elite leading-loose whitespace-pre-wrap">
            {item.texto}
          </p>
        </div>
      )}
    </motion.div>
  ))}
</div>

        {/* PIE DE PÁGINA */}
        <footer className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center gap-6 opacity-40">
          <FaSkull className="text-red-900 text-3xl" />
          <p className="text-[9px] tracking-[0.6em] uppercase text-center font-elite">
            fin de la transmisión // la curiosidad mató al arquitecto
          </p>
        </footer>
      </div>

      {/* RUIDO VISUAL */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default TranscripcionIncidente;