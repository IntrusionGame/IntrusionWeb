import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const canvasRef = useRef(null);

  // Sistema de ruido estático (Efecto Visual)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const renderNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const data = idata.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.85) {
          const value = Math.random() * 255;
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(renderNoise);
    };

    resize();
    renderNoise();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Configuración de rutas y navegación
  const menuItems = [
    {
      id: 1,
      label: "INICIAR RITUAL",
      desc: "Comenzar la partida",
      path: "/juego",
    },
    {
      id: 2,
      label: "EXPEDIENTES",
      desc: "Puzles y archivos",
      path: "/expedientes",
    },
    {
      id: 3,
      label: "MANIFIESTO",
      desc: "Sobre los arquitectos de este vacío",
      path: "/SobreNosotros",
    },
    {
      id: 4,
      label: "CANAL DE ENLACE",
      desc: "Establecer conexión con los arquitectos",
      path: "/contacto",
    },
  ];

  // Animación de entrada Glitch
  const entradaTerror = {
    hidden: { opacity: 0, x: -40, skewX: 30 },
    visible: {
      opacity: [0, 1, 0.2, 1, 0.5, 1],
      x: [0, -10, 10, -5, 5, 0],
      skewX: [30, -30, 15, -15, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.1, 0.2, 0.3, 0.5, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex flex-col justify-center items-start pl-8 sm:pl-12 md:pl-20 lg:pl-32 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }
        `}
      </style>

      {/* Capas de Post-Procesado (CRT y Ruido) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-40 opacity-[0.15] mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_3px,2px_100%]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-red-900/10 blur-[80px] md:blur-[120px] rounded-full" />

      {/* Título Principal */}
      <motion.h1
        variants={entradaTerror}
        initial="hidden"
        animate="visible"
        className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-red-700 tracking-[0.05em] mb-8 md:mb-12 drop-shadow-[0_0_20px_rgba(185,28,28,0.7)] z-10 whitespace-nowrap font-glitch"
      >
        INTRUSION
      </motion.h1>

      {/* Navegación Interactiva */}
      <nav className="space-y-4 md:space-y-6 relative z-10 w-full md:w-auto font-elite">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={item.id} className="block no-underline">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              whileHover={{ x: 10 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <span
                  className={`h-[1px] md:h-[2px] transition-all duration-500 bg-red-700 ${activeItem === item.id ? "w-8 md:w-12" : "w-0"}`}
                />
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl transition-colors duration-300 uppercase tracking-tighter ${
                    activeItem === item.id
                      ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                      : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </h2>
              </div>

              {/* Contenedor de Descripción Dinámica */}
              <div className="h-4 md:h-6">
                <AnimatePresence>
                  {activeItem === item.id && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] md:text-xs text-zinc-600 ml-11 md:ml-16 uppercase tracking-widest italic"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Menu;
