import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoIntrusion from "../Imagenes/LogoIntrusion.png";

const Menu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const canvasRef = useRef(null);

  // Sistema de ruido estático original
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

  const menuItems = [
    { id: 1, label: "INICIAR RITUAL", desc: "Comenzar la partida", path: "/juego" },
    { id: 2, label: "EXPEDIENTES", desc: "Puzles y archivos", path: "/expedientes" },
    { id: 3, label: "MANIFIESTO", desc: "Sobre los arquitectos de este vacío", path: "/SobreNosotros" },
    { id: 4, label: "CANAL DE ENLACE", desc: "Establecer conexión con los arquitectos", path: "/contacto" },
    { id: 5, label: "BITÁCORA DE FALLOS", desc: "Registros recuperados del vacío", path: "/blog" },
  ];

  const entradaTerror = {
    hidden: { 
      opacity: 0, 
      scale: 1.8, // Empieza demasiado grande, como si estuviera pegado a la "cámara"
      filter: "blur(20px) brightness(0) contrast(200%)",
    },
    visible: {
      opacity: [0, 1, 0.1, 1, 0, 0.9, 1],
      // Saltos de posición agresivos y cortos (glitch de posición)
      x: [0, -40, 40, -10, 20, -5, 0],
      y: [0, 10, -15, 5, -20, 0, 0],
      // Cambios de escala súbitos para dar sensación de que algo se acerca
      scale: [1.5, 1, 1.2, 0.95, 1.05, 1],
      // Skew extremo solo en frames cortos para deformar el logo
      skewX: [0, -50, 50, -20, 0],
      filter: [
        "blur(20px) brightness(0)", 
        "blur(0px) brightness(3) contrast(150%)", // Flash violento
        "blur(15px) brightness(0.2)", 
        "blur(2px) brightness(2)", 
        "blur(10px) brightness(0.5)",
        "blur(0px) brightness(1.2)",
        "blur(0px) brightness(1)"
      ],
      transition: { 
        duration: 0.7, // Más rápido para que sea un impacto, no un baile
        times: [0, 0.05, 0.1, 0.2, 0.3, 0.45, 1], // Tiempos irregulares = Movimiento errático
        ease: "linear" // IMPORTANTE: Sin suavizado, el terror es seco y cortante
      },
    },
  };
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden select-none font-elite">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          
          /* LAYOUT ORIGINAL (PC, MÓVIL VERTICAL, TABLET VERTICAL) */
          .main-grid {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            padding-left: 8%;
          }

         /* PARCHE EXCLUSIVO: TABLETS EN HORIZONTAL - UN DEDO MÁS GRANDE */
          @media (orientation: landscape) and (max-height: 700px) and (max-width: 1300px) {
            .main-grid { 
              display: grid !important;
              grid-template-rows: auto 1fr;
              padding-top: 3vh !important; /* Subimos un poco el contenido */
              justify-content: start !important;
            }
            .logo-wrap { 
              max-height: 85px !important; /* Más espacio para el logo */
              margin-bottom: 1.2rem !important; 
            }
            .logo-img { 
              height: 65px !important; /* El logo crece "un dedo" */
            }
            .nav-wrap { 
              gap: 0.6rem !important; /* Más aire entre botones */
            }
            .menu-text { 
              font-size: 1.4rem !important; /* Letra un poco más grande y legible */
            }
            .desc-container { 
              display: none !important; 
            }
          }
        `}
      </style>

      {/* Post-Procesado */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-40 opacity-[0.15] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_3px,2px_100%]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-red-900/5 blur-[120px] rounded-full" />

      <div className="main-grid relative z-10">
        {/* LOGO */}
        <motion.div
          variants={entradaTerror}
          initial="hidden"
          animate="visible"
          className="logo-wrap mb-10 md:mb-16 flex items-start"
        >
          <img 
            src={LogoIntrusion} 
            alt="LOGO" 
            className="logo-img w-auto h-[45px] sm:h-[50px] md:h-[100px] lg:h-[130px] object-contain drop-shadow-[0_0_20px_rgba(185,28,28,0.7)]"
          />
        </motion.div>

        {/* NAVEGACIÓN */}
        <nav className="nav-wrap flex flex-col gap-5 md:gap-7">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={item.id} className="block no-underline">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
                className="group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <span className={`h-[1px] bg-red-700 transition-all duration-500 ${activeItem === item.id ? "w-10" : "w-0"}`} />
                  <h2 className={`menu-text text-xl md:text-3xl transition-colors duration-300 uppercase tracking-tighter ${activeItem === item.id ? "text-red-500" : "text-zinc-500"}`}>
                    {item.label}
                  </h2>
                </div>

                <div className="h-4 overflow-hidden desc-container">
                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] md:text-xs text-zinc-600 ml-14 uppercase tracking-widest italic"
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
    </div>
  );
};

export default Menu;