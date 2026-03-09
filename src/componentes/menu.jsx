import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LogoIntrusion from "../Imagenes/LogoIntrusion.png";

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
      x: -15, 
      skewX: 0, 
      filter: "blur(15px) brightness(0)" 
    },
    visible: {
      /* Parpadeo más lento y agónico */
      opacity: [0, 0.8, 0.2, 1, 0.7, 1],
      /* Saltos más controlados para que se vea el desplazamiento */
      x: [0, -20, 15, -5, 2, 0],
      /* El skew ahora es un impacto inicial que se recupera */
      skewX: [0, 25, -15, 5, 0, 0],
      /* El brillo y el desenfoque ahora duran lo suficiente para dar atmósfera */
      filter: [
        "blur(10px) brightness(0)", 
        "blur(2px) brightness(1.5)", 
        "blur(8px) brightness(0.5)", 
        "blur(0px) brightness(1.2)", 
        "blur(1px) brightness(1)", 
        "blur(0px) brightness(1)"
      ],
      transition: { 
        duration: 1.2, // Aumentado para que se aprecie el efecto
        times: [0, 0.2, 0.4, 0.6, 0.8, 1], // Distribución uniforme para que no sea un flash instantáneo
        ease: "anticipate" // 'anticipate' le da un peso más orgánico al inicio
      },
    },
  };;

  return (
    /* CAMBIO ESTRATÉGICO PARA TABLET HORIZONTAL: 
       - Usamos 'items-center' en lugar de 'items-start' en móviles si quieres, 
         pero para respetar tu diseño de izquierda mantengo el pl-X.
       - La clave es 'justify-center' pero con un 'pt' (padding top) controlado en pantallas cortas.
    */
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex flex-col justify-center items-start pl-8 sm:pl-12 md:pl-20 lg:pl-32 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }

          /* Ajuste para pantallas con poca altura (Tablet Horizontal / iPhone Landscape) */
          @media (max-height: 500px) {
            .compact-nav { space-y: 1 !important; }
            .compact-margin { margin-bottom: 1rem !important; }
            .compact-logo { height: 40px !important; }
          }
        `}
      </style>

      {/* Capas de Post-Procesado */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-40 opacity-[0.15] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_3px,2px_100%]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-red-900/10 blur-[80px] md:blur-[120px] rounded-full" />

      {/* Título / Logo */}
      <motion.div
        variants={entradaTerror}
        initial="hidden"
        animate="visible"
        // compact-margin ajusta el espacio en horizontal
className="mb-4 sm:mb-2 md:mb-12 compact-margin z-10"      >
        <img 
          src={LogoIntrusion} 
          alt="INTRUSION LOGO" 
          // compact-logo reduce el tamaño si la pantalla es muy bajita
className="w-auto h-[6vh] sm:h-[7vh] md:h-[100px] lg:h-[140px] compact-logo object-contain drop-shadow-[0_0_20px_rgba(185,28,28,0.7)]"     />
      </motion.div>

      {/* Navegación */}
      {/* Reducimos el space-y en tablets/móviles para que quepa todo */}
      <nav className="space-y-3 sm:space-y-2 md:space-y-6 relative z-10 w-full md:w-auto font-elite">
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
                  className={`text-lg sm:text-base md:text-3xl transition-colors duration-300 uppercase tracking-tighter ${
                    activeItem === item.id
                      ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                      : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </h2>
              </div>

              {/* Reducimos la altura del contenedor de descripción en pantallas pequeñas */}
              <div className="h-3 sm:h-4 md:h-6">
                <AnimatePresence>
                  {activeItem === item.id && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[9px] sm:text-[8px] md:text-xs text-zinc-600 ml-11 sm:ml-12 md:ml-16 uppercase tracking-widest italic"
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