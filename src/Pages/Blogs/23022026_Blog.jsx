import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { 
  FaChevronLeft, FaRadiation, FaExclamationTriangle, 
  FaFileContract, FaVideo, FaSearch, FaSkull 
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { incidentesData } from "../../DatosBlog/blog260226.js";

const TranscripcionIncidente = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Selección de datos por ID
  const incidente = incidentesData[id] || Object.values(incidentesData)[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black font-elite text-red-600 text-xl uppercase tracking-widest z-[100]">
        <Motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          <FaSearch className="inline-block mr-4" /> Recopilando fragmentos_{id}...
        </Motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400">
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
            width: 100%; height: 2px; background: rgba(153, 27, 27, 0.15);
            position: fixed; top: 0; left: 0; pointer-events: none; z-index: 100;
            animation: scanline 6s linear infinite;
          }
          @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
        `}
      </style>

      <div className="scanline" />

      <Link to="/blog">
        <Motion.div whileHover={{ x: -5 }} className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-700 hover:text-red-700 transition-colors cursor-pointer group">
          <FaChevronLeft className="group-hover:animate-pulse" />
          <span className="text-xs tracking-widest uppercase italic">ABORTAR_LECTURA</span>
        </Motion.div>
      </Link>

      <div className="max-w-3xl mx-auto pt-24 pb-20 px-6">
        {/* Cabecera de Expediente */}
        <header className="border-b border-red-900/30 pb-8 mb-12">
          <Motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl md:text-5xl font-glitch text-red-700 uppercase mb-4 tracking-tighter">
            {incidente.titulo}
          </Motion.h1>
          <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase text-zinc-500">
            <span className="flex items-center gap-2 border border-red-900/40 px-2 py-1">
              <FaFileContract className="text-red-700" /> {incidente.clasificacion}
            </span>
            <span className="flex items-center gap-2 border border-zinc-900 px-2 py-1">
              <FaVideo className="text-zinc-700" /> {incidente.fecha}
            </span>
          </div>
        </header>

        {/* Renderizado Dinámico de Contenido */}
        <div className="space-y-10">
          {incidente.contenido.map((item, idx) => (
            <Motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              
              {/* Título de Sección (Nivel 1) */}
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
                      <div className="absolute right-0 -top-1 w-2 h-2 bg-red-700 rotate-45 shadow-[0_0_8px_#b91c1c]" />
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <div className="h-[2px] w-12 bg-red-800" />
                    <div className="h-[2px] w-4 bg-red-900/40" />
                    <div className="h-[2px] w-2 bg-red-900/20" />
                  </div>
                </div>
              )}

              {/* Subtítulos (Nivel 2) */}
              {item.tipo === "subtitulo" && (
                <div className="flex items-center gap-3 mb-4 mt-8 opacity-80">
                  <div className="w-2 h-2 bg-red-900 rotate-45 animate-pulse" />
                  <h3 className="text-sm md:text-base font-elite text-zinc-400 uppercase tracking-[0.3em] border-b border-red-900/30 pb-1">
                    {item.texto}
                  </h3>
                </div>
              )}

              {/* Bloques de Texto */}
              {item.tipo === "parrafo" && (
                <p className="text-lg leading-relaxed text-zinc-300 font-elite indent-8">
                  {item.texto}
                </p>
              )}

              {/* Archivos Visuales */}
              {item.tipo === "imagen" && (
                <div className="relative group my-12 flex flex-col items-center">
                  <div className="absolute -inset-1 bg-red-900/10 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative border border-zinc-900 bg-black w-full overflow-hidden flex flex-col">
                    <div className="flex justify-center bg-zinc-950/50">
                      <img src={item.src} className="w-auto h-auto max-w-full max-h-[600px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Archivo visual" />
                    </div>
                    <div className="p-3 border-t border-zinc-900 bg-black/80 font-elite text-center">
                      <p className="text-[10px] text-red-900 uppercase tracking-widest flex items-center justify-center gap-2">
                        <FaExclamationTriangle className="shrink-0" />
                        <span className="truncate">{item.caption}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Alertas de Código/Sistema */}
              {item.tipo === "codigo" && (
                <div className="bg-red-950/5 border-l-4 border-red-900 p-6 my-8 shadow-inner">
                  <FaRadiation className="text-red-700 mb-4 animate-pulse" />
                  <p className="text-sm text-red-600 font-elite leading-loose whitespace-pre-wrap">
                    {item.texto}
                  </p>
                </div>
              )}
            </Motion.div>
          ))}
        </div>

        {/* Cierre de Transmisión */}
        <footer className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center gap-6 opacity-40">
          <FaSkull className="text-red-900 text-3xl" />
          <p className="text-[9px] tracking-[0.6em] uppercase text-center font-elite">
            fin de la transmisión // la curiosidad mató al arquitecto
          </p>
        </footer>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default TranscripcionIncidente;