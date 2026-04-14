import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTerminal, FaChevronLeft, FaExpand } from "react-icons/fa";

const TestPage = () => {
  const { unityProvider, isLoaded, loadingProgression, requestFullscreen } = useUnityContext({
    loaderUrl: "/JuegoWeb/Build/JuegoWeb.loader.js", 
    dataUrl: "/JuegoWeb/Build/JuegoWeb.data",
    frameworkUrl: "/JuegoWeb/Build/JuegoWeb.framework.js",
    codeUrl: "/JuegoWeb/Build/JuegoWeb.wasm",
  });

  return (
    <div className="fixed inset-0 bg-black font-elite text-zinc-400 overflow-y-auto flex flex-col">
      {/* SCANLINE EFECTO */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%] opacity-10" />

      {/* HEADER DE CONTROL - Ahora no es absoluto, para que reserve su espacio arriba */}
      <div className="w-full p-4 flex justify-between items-center z-[60] bg-black border-b border-zinc-900/50">
        <Link to="/juego" className="flex items-center gap-2 text-zinc-600 hover:text-red-700 transition-colors drop-shadow-md">
          <FaChevronLeft />
          <span className="text-[10px] tracking-tighter uppercase font-bold">ABORTAR_CONEXIÓN</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-red-900 uppercase tracking-widest font-black">Monitorización_Sujeto</span>
            <span className="text-[10px] text-zinc-200 uppercase font-glitch">
              {isLoaded ? "SISTEMA_ONLINE" : `SINCRONIZANDO... ${Math.round(loadingProgression * 100)}%`}
            </span>
          </div>
          <button 
            onClick={() => requestFullscreen(true)}
            className="p-2 text-red-900 hover:text-red-500 transition-all border border-zinc-900 rounded-sm hover:border-red-900"
          >
            <FaExpand size={12} />
          </button>
        </div>
      </div>

      {/* CONTENEDOR DEL JUEGO - Añadimos pt-4 o pt-8 para bajar el contenido */}
      <main className="flex-1 relative bg-black flex items-center justify-center p-4 pt-2">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black">
            <FaTerminal className="text-red-900 text-5xl animate-pulse mb-6" />
            <div className="w-80 h-1 bg-zinc-900">
              <Motion.div 
                className="h-full bg-red-700 shadow-[0_0_15px_rgba(185,28,28,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgression * 100}%` }}
              />
            </div>
            <span className="mt-4 text-[11px] font-mono text-red-900 uppercase animate-pulse tracking-[0.3em]">
              Ajustando_Frecuencia_Cerebral...
            </span>
          </div>
        )}

        {/* El Canvas con un contenedor que respeta el espacio superior */}
        <div className="w-full h-full max-w-[1920px] max-h-[1080px] shadow-2xl shadow-red-900/5">
          <Unity 
            unityProvider={unityProvider} 
            className="w-full h-full"
            style={{ 
              aspectRatio: "16 / 9",
              objectFit: "contain"
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default TestPage;