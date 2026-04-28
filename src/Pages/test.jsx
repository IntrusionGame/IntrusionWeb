import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTerminal, FaChevronLeft, FaExpand, FaGamepad } from "react-icons/fa";
import logoIntrusion from "../Imagenes/LogoIntrusion.png"

const TestPage = () => {
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: "/JuegoWeb/Build/JuegoWeb.loader.js", 
    dataUrl: "/JuegoWeb/Build/JuegoWeb.data",
    frameworkUrl: "/JuegoWeb/Build/JuegoWeb.framework.js",
    codeUrl: "/JuegoWeb/Build/JuegoWeb.wasm",
    devicePixelRatio: window.devicePixelRatio,
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
        const forwardWheel = (e) => window.scrollBy({ top: e.deltaY, behavior: "auto" });
        canvas.addEventListener("wheel", forwardWheel, { passive: true });
        canvas.onclick = () => canvas.focus();
        canvas.onmouseleave = () => { canvas.blur(); window.focus(); };
        return () => {
          canvas.removeEventListener("wheel", forwardWheel);
          document.removeEventListener("fullscreenchange", forceScroll);
          document.removeEventListener("webkitfullscreenchange", forceScroll);
        };
      }
    }
  }, [isLoaded]);

  const handleJugar = () => {
    setJuegoIniciado(true);
    requestFullscreen(true);
  };

  return (
    <div style={{ backgroundColor: 'black', width: '100%', minHeight: '100vh',}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
        .font-glitch { font-family: 'Rubik Glitch', system-ui; }
        .font-elite { font-family: 'Special Elite', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
        ::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
      `}</style>

      {/* BOTÓN VOLVER */}
      <div className="fixed top-4 left-4 z-[60] font-elite">
       <Link to="/">
        <Motion.div
          whileHover={{ x: -5 }}
          className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-colors cursor-pointer group font-elite"
        >
          <FaChevronLeft className="group-hover:animate-pulse" />
          <span className="text-xs tracking-widest uppercase italic">
            INTERRUMPIR_ENLACE
          </span>
        </Motion.div>
      </Link>
      </div>

      <header className="w-full p-6 flex justify-end items-center bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="text-[10px] text-red-900 font-bold tracking-[0.4em] animate-pulse font-elite">
          SISTEMA_REPORTE_V.5
        </div>
      </header>

      <section className="w-full flex flex-col items-center py-10 px-4">

        {/* BIENVENIDA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl border border-zinc-900 bg-zinc-950/50 p-10 shadow-[0_0_40px_rgba(185,28,28,0.08)]"
        >
          {/* TÍTULO */}
          <div className="mb-6">
            <img 
  src={logoIntrusion} 
  alt="Intrusion" 
  className="h-16 w-auto mx-auto mb-1 brightness-100 hover:brightness-125 transition-all cursor-pointer" 
/>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-900 to-transparent mt-2 mb-4" />
            <p className="text-[9px] text-zinc-600 font-elite uppercase tracking-[0.4em]">
              PROTOCOLO DE TESTEO — FASE BETA
            </p>
          </div>

          {/* TEXTO */}
          <div className="max-w-3xl text-center mb-10 px-4">
          <p className="text-[12px] text-zinc-400 font-elite leading-7 mb-4">
            Bienvenido al testeo del videojuego de{" "}
            <img 
              src={logoIntrusion} // !!! CAMBIA ESTO POR LA RUTA REAL DE TU IMAGEN !!!
              alt="Intrusion" 
              className="inline-block h-[1em] w-auto align-middle" // Estilos para que no desentone el tamaño
            />.
            A continuación podrás jugar al juego pulsando el botón de jugar,
            el cual abrirá el juego en{" "}
            <span className="text-zinc-200">pantalla completa</span>.
<span className="block mt-2 text-zinc-100 font-bold border-b border-red-700/50 w-fit mx-auto pb-1">
    Se recomienda jugar en pantalla completa para una mejor experiencia.
  </span>          </p>

          <p className="text-[11px] text-zinc-500 font-elite leading-7 p-4 bg-zinc-950/50 border border-zinc-900 rounded">
            <span className="text-red-900 font-black">CRÍTICO:</span>{" "}
            <span className="text-zinc-300">
              Cuando termines — o a la misma vez que juegas
              — se agradece que rellenes el formulario de testeo para ayudarnos a mejorar el juego.
            </span>
          </p>
        </div>

          {/* BOTONES */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJugar}
              className="px-12 py-5 bg-red-900 text-black font-black uppercase text-[11px] tracking-[0.6em] hover:bg-red-600 transition-all active:scale-95 font-elite shadow-[0_0_30px_rgba(185,28,28,0.4)] flex items-center justify-center gap-3"
            >
              <FaGamepad size={14} />
              JUGAR
            </button>
            <Link to="/reportetest" target="_blank" rel="noopener noreferrer">
              <button className="px-12 py-5 border border-zinc-800 text-zinc-500 font-black uppercase text-[11px] tracking-[0.6em] hover:border-red-900 hover:text-red-700 transition-all active:scale-95 font-elite w-full">
                FORMULARIO →
              </button>
            </Link>
          </div>
        </Motion.div>

        {/* JUEGO */}
        <div
          className="w-full max-w-5xl bg-zinc-950 border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden"
          style={{
            aspectRatio: "16/9",
            display: juegoIniciado ? "block" : "none"
          }}
        >
          <Unity
            unityProvider={unityProvider}
            style={{ width: "100%", height: "100%" }}
            devicePixelRatio={window.devicePixelRatio}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 gap-4">
              <FaTerminal className="text-red-900 text-3xl animate-pulse" />
              <div className="w-64 h-px bg-zinc-900">
                <Motion.div
                  className="h-full bg-red-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgression * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-zinc-600 font-elite uppercase tracking-[0.4em]">
                Cargando... {Math.round(loadingProgression * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* BOTÓN PANTALLA COMPLETA — solo visible con el juego activo */}
        {juegoIniciado && (
          <div className="mt-4">
            <button
              onClick={() => requestFullscreen(true)}
              className="px-10 py-4 bg-red-900 text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-red-600 transition-all active:scale-95 font-elite"
            >
              <FaExpand className="inline mr-2" /> PANTALLA_COMPLETA
            </button>
          </div>
        )}

      </section>
    </div>
  );
};

export default TestPage;