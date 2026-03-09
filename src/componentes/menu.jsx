import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoIntrusion from "../Imagenes/LogoIntrusion.png";

const Menu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const canvasRef = useRef(null);

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
    { id: 3, label: "MANIFIESTO", desc: "Sobre los arquitectos", path: "/SobreNosotros" },
    { id: 4, label: "CANAL DE ENLACE", desc: "Establecer conexión", path: "/contacto" },
    { id: 5, label: "BITÁCORA DE FALLOS", desc: "Registros recuperados", path: "/blog" },
  ];

  const entradaTerror = {
    hidden: { opacity: 0, x: -15, filter: "blur(15px) brightness(0)" },
    visible: {
      opacity: [0, 0.8, 0.2, 1, 0.7, 1],
      x: [0, -20, 15, -5, 2, 0],
      skewX: [0, 25, -15, 5, 0, 0],
      filter: [
        "blur(10px) brightness(0)", 
        "blur(2px) brightness(1.5)", 
        "blur(8px) brightness(0.5)", 
        "blur(0px) brightness(1.2)", 
        "blur(1px) brightness(1)", 
        "blur(0px) brightness(1)"
      ],
      transition: { duration: 1.2, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "anticipate" },
    },
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden select-none font-elite">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          
          /* RESET TOTAL PARA TABLETS EN HORIZONTAL */
          .layout-container {
            display: grid;
            grid-template-rows: auto 1fr;
            height: 100%;
            padding: 2rem 0 2rem 10%; /* Posicionamiento a la izquierda */
          }

          @media (max-height: 550px) or (orientation: landscape) and (max-width: 1300px) {
            .layout-container { padding: 1rem 0 1rem 5%; }
            .logo-box { max-height: 40px !important; margin-bottom: 0.5rem !important; }
            .nav-box { gap: 0.2rem !important; }
            .menu-text { font-size: 1.1rem !important; line-height: 1 !important; }
            .desc-text { display: none !important; } /* Eliminamos el hueco de la descripción */
          }
        `}
      </style>

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-40 opacity-[0.15] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_3px,2px_100%]" />
      
      <div className="layout-container relative z-10">
        {/* Logo con altura controlada */}
        <motion.div
          variants={entradaTerror}
          initial="hidden"
          animate="visible"
          className="logo-box flex items-center mb-10 md:mb-16"
        >
          <img 
            src={LogoIntrusion} 
            alt="LOGO" 
            className="h-[45px] md:h-[110px] w-auto object-contain drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]"
          />
        </motion.div>

        {/* Navegación compacta */}
        <nav className="nav-box flex flex-col justify-start gap-4 md:gap-8">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={item.id} className="group no-underline block">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3">
                   <span className={`h-[1px] bg-red-700 transition-all duration-300 ${activeItem === item.id ? "w-6 md:w-10" : "w-0"}`} />
                   <h2 className={`menu-text text-xl md:text-4xl uppercase tracking-tighter transition-colors ${activeItem === item.id ? "text-red-600" : "text-zinc-600"}`}>
                    {item.label}
                  </h2>
                </div>
                
                {/* Contenedor de descripción con altura cero si no está activo */}
                <div className="overflow-hidden">
                  <AnimatePresence>
                    {activeItem === item.id && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="desc-text text-[9px] md:text-xs text-zinc-700 italic ml-10 mt-1 uppercase tracking-widest"
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-red-950/10 blur-[100px] rounded-full z-0" />
    </div>
  );
};

export default Menu;