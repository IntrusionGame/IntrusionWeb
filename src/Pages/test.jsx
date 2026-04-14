import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTerminal, FaChevronLeft, FaFileAlt, FaExpand } from "react-icons/fa";

const TestPage = () => {
  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: "/JuegoWeb/Build/JuegoWeb.loader.js", 
    dataUrl: "/JuegoWeb/Build/JuegoWeb.data",
    frameworkUrl: "/JuegoWeb/Build/JuegoWeb.framework.js",
    codeUrl: "/JuegoWeb/Build/JuegoWeb.wasm",
  });

  useEffect(() => {
    if (isLoaded) {
      const forceScroll = () => {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        document.body.style.height = "auto";
        document.documentElement.style.height = "auto";
      };

      document.addEventListener("fullscreenchange", forceScroll);
      document.addEventListener("webkitfullscreenchange", forceScroll);

      forceScroll();

      const canvas = document.querySelector("canvas");
      if (canvas) {
        const forwardWheel = (e) => {
          window.scrollBy({ top: e.deltaY, behavior: "auto" });
        };
        canvas.addEventListener("wheel", forwardWheel, { passive: true });
        canvas.onclick = () => window.focus();

        setTimeout(() => requestFullscreen(true), 500);

        return () => {
          canvas.removeEventListener("wheel", forwardWheel);
          document.removeEventListener("fullscreenchange", forceScroll);
          document.removeEventListener("webkitfullscreenchange", forceScroll);
        };
      }
    }
  }, [isLoaded, requestFullscreen]);

  return (
    <div 
      className="custom-scrollbar"
      style={{ 
        backgroundColor: 'black', 
        width: '100%', 
        minHeight: '100vh', 
        display: 'block', 
        overflowY: 'auto',
        color: '#71717a' 
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }

          html, body, .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #450a0a #000000;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #000000;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #450a0a;
            border-radius: 0px;
            border: 1px solid #1a1a1a;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #7f1d1d;
          }
        `}
      </style>

      {/* BOTÓN DE RETORNO FIJO */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] flex items-center font-elite">
        <Link to="/">
          <Motion.div 
            whileHover={{ x: -5 }}
            className="flex items-center gap-3 text-zinc-500 hover:text-red-700 transition-colors cursor-pointer group"
          >
            <FaChevronLeft className="group-hover:animate-pulse text-xs opacity-50" />
            <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase italic font-medium">
              INTERRUMPIR_ENLACE
            </span>
          </Motion.div>
        </Link>
      </div>
      
      {/* HEADER */}
      <header className="w-full p-6 flex justify-end items-center bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="text-[10px] text-red-900 font-bold tracking-[0.4em] animate-pulse font-elite">
          SISTEMA_REPORTE_V.5
        </div>
      </header>

      {/* SECCIÓN 1: EL JUEGO */}
      <section className="w-full flex flex-col items-center py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-red-700 font-black uppercase tracking-tighter font-glitch">
            Consola de Testeo
          </h1>
          <p className="text-[10px] text-zinc-500 mt-2 underline decoration-red-900 font-elite">
            {isLoaded ? "SISTEMA OPERATIVO CONECTADO" : `CARGANDO DATA: ${Math.round(loadingProgression * 100)}%`}
          </p>
        </div>

        <div className="w-full max-w-5xl aspect-video bg-zinc-950 border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,1)] relative">
          <Unity 
            unityProvider={unityProvider} 
            style={{ width: "100%", height: "100%" }}
            devicePixelRatio={window.devicePixelRatio}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
               <FaTerminal className="text-red-900 text-3xl animate-pulse" />
            </div>
          )}
        </div>

        <button 
          onClick={() => requestFullscreen(true)}
          className="mt-8 px-10 py-4 bg-red-900 text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-red-600 transition-all active:scale-95 font-elite"
        >
          <FaExpand className="inline mr-2" /> RE-VINCULAR_PANTALLA_COMPLETA
        </button>

        <div className="mt-20 flex flex-col items-center gap-4 opacity-50 font-elite">
           <div className="w-px h-20 bg-gradient-to-b from-red-900 to-transparent"></div>
           <span className="text-[9px] text-zinc-600 uppercase tracking-[0.4em]">Desliza para reportar daños</span>
        </div>
      </section>

      {/* SECCIÓN 2: EL FORMULARIO */}
      <section id="reporte" className="w-full max-w-3xl mx-auto py-32 px-6">
        <div className="bg-zinc-950 border border-zinc-900 p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-2 text-[8px] text-zinc-800 italic font-elite">REF_LOG_2026</div>
          
          <div className="flex items-center gap-4 mb-10 border-b border-zinc-900 pb-6">
            <FaFileAlt className="text-red-900 text-2xl" />
            <h2 className="text-red-700 text-2xl font-black uppercase tracking-widest italic font-glitch">Informe de Anomalías</h2>
          </div>

          <form className="space-y-10 font-elite">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-red-700 font-black uppercase tracking-widest">Sujeto_ID</label>
              <input 
                type="text" 
                className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-900 outline-none transition-colors font-elite"
                placeholder="Introduzca identificador..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-red-700 font-black uppercase tracking-widest">Descripción_del_Fallo</label>
              <textarea 
                className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 h-44 focus:border-red-900 outline-none resize-none transition-colors font-elite"
                placeholder="Detalle los errores visuales o de gameplay..."
              />
            </div>
            <button 
              type="button" 
              className="w-full py-5 bg-zinc-900 border border-red-900/50 text-red-600 font-black uppercase tracking-[0.5em] hover:bg-red-900 hover:text-black transition-all font-elite"
            >
              ENVIAR_PROTOCOLO
            </button>
          </form>
        </div>
      </section>

      <footer className="w-full py-16 flex justify-center opacity-20 font-elite">
        <span className="text-[8px] tracking-[2em] uppercase font-bold text-white">SYSTEM_OFFLINE</span>
      </footer>
    </div>
  );
};

export default TestPage;