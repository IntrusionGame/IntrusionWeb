import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaChevronLeft,
  FaGlobe,
} from "react-icons/fa";

import David from "../Imagenes/Componentes/FotoDavid.jpg";
import Luismi from "../Imagenes/Componentes/FotoLuismi.jpeg";
import Victor from "../Imagenes/Componentes/Foto_Delegado.png";
import Eva from "../Imagenes/Componentes/FotoEva.jpg";
import JoseAndres from "../Imagenes/Componentes/FotoJoseAndres.jpg";
import Michel from "../Imagenes/Componentes/FotoMichel.jpg";
import Oscar from "../Imagenes/Componentes/FotoOscar.jpg";
import Rafa from "../Imagenes/Componentes/FotoRafa.png";

// Base de datos de personal
const teamMembers = [
  { id: 1, name: "Javier Soriano Moreno", specialty: "Gamer Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna", social: { Portfolio: "https://sites.google.com/view/sorieme/inicio" }, status: "online" },
  { id: 2, name: "David Jiménez Villena", specialty: "Web Developer / Gamer Developer", image: David, social: { Portfolio: "https://djsekai34.github.io/DJVPortFolio/", linkedin: "https://www.linkedin.com/in/david-jimenez-villena/" }, status: "online" },
  { id: 3, name: "Luis Miguel Escuderos Alcaide", specialty: "Art 3D", image: Luismi, social: { Portfolio: "https://porfolioluisillo.carrd.co" }, status: "online" },
  { id: 4, name: "Francisco Torres Puche", specialty: "Gamer Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Void", social: { Portfolio: "https://sites.google.com/view/dgpp-ftp?usp=sharing" }, status: "offline" },
  { id: 5, name: "Víctor Hugo Jiménez Meseguer", specialty: "Producer", image: Victor, social: { Portfolio: "https://guns.lol/pollitoamarillo" }, status: "producer" },
  { id: 6, name: "Rafael Soler Cabrero", specialty: "Gamer Developer / UX Designer", image: Rafa, social: { linkedin: "https://es.linkedin.com/in/rafael-soler-cabrero-136093357" }, status: "online" },
  { id: 7, name: "Eva Góngora Fuentes", specialty: "Art Director / 3D and 2D Generalist", image: Eva, social: { linkedin: "http://www.linkedin.com/in/eva-góngora-fuentes-965b34368" }, status: "online" },
  { id: 8, name: "José Andrés Garrido Gutiérrez", specialty: "Art 3D and 2D", image: JoseAndres, social: { Portfolio: "https://sites.google.com/g.educaand.es/diseogestinpublicajoseandres?usp=sharing" }, status: "online" },
  { id: 9, name: "Óscar González Escabias", specialty: "Gamer Developer / 3D and 2D Art", image: Oscar, social: { Portfolio: "https://sites.google.com/view/profile-oscar/inicio" }, status: "unknown" },
  { id: 10, name: "Michel Mendoza", specialty: "Gamer Developer", image: Michel, social: { Portfolio: "https://arycer.me/" }, status: "online" },
  { id: 11, name: "Adrián Moreno Aibar", specialty: "Gamer Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angel", social: { Portfolio: "https://sites.google.com/g.educaand.es/pericogames/inicio" }, status: "unknown" },
  { id: 12, name: "Juan José Santiago Vílchez", specialty: "Gamer Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alvaro", social: { Portfolio: "https://sites.google.com/g.educaand.es/milusistudio/inicio" }, status: "unknown" },

];

const socialIcons = {
  linkedin: FaLinkedin,
  Portfolio: FaGlobe,
};

const SobreNosotros = () => {
  // Configuraciones de Animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, skewY: 7 },
    visible: {
      opacity: [0, 0.2, 1],
      y: 0,
      skewY: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto overflow-x-hidden z-50 custom-scrollbar">
      {/* Estilos Globales y Animaciones CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
          .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #450a0a #000; }

          @keyframes glitch-img {
            0% { filter: grayscale(1) brightness(0.8); transform: translate(0); }
            2% { filter: grayscale(0) brightness(1.1); transform: translate(-1px, 1px); }
            4% { filter: grayscale(1) brightness(0.8); transform: translate(0); }
            100% { filter: grayscale(1) brightness(0.8); transform: translate(0); }
          }
          .animate-glitch-img { animation: glitch-img 5s infinite; }
        `}
      </style>

      {/* Control de Navegación Superior */}
      <Link to="/">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors font-elite text-xs cursor-pointer group"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>REGRESAR AL SISTEMA</span>
        </motion.div>
      </Link>

      <div className="w-full flex flex-col items-center pt-20 pb-32">
        {/* Cabecera del Nexo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-glitch text-red-700 drop-shadow-[0_0_15px_rgba(185,28,28,0.6)] uppercase">
            Nexo de Operaciones
          </h1>
          <p className="font-elite text-zinc-600 text-[10px] tracking-[0.4em] mt-4 uppercase">
            — Personal de Desarrollo Identificado —
          </p>
        </motion.div>

        {/* Grilla de Perfiles */}
        <div className="w-full max-w-[1100px] px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-elite"
          >
            {teamMembers.map((member, index) => {
              const isCenter = index === 4;
              return (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`relative p-6 border flex flex-col items-center justify-between min-h-[340px] transition-all duration-300
                    ${isCenter ? "border-red-600 bg-red-950/10 shadow-[0_0_20px_rgba(185,28,28,0.15)]" : "border-red-900/30 bg-zinc-950/40 hover:border-red-700/60"}`}
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600 opacity-40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600 opacity-40" />

                  {/* Avatar y Estado del Sujeto */}
                  <div className="relative w-28 h-28 mb-4 overflow-hidden border border-red-900/40 bg-black">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full grayscale brightness-75 contrast-125 p-1 animate-glitch-img object-cover"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black 
                      ${
                        member.status === "online"
                          ? "bg-red-600 animate-pulse"
                          : member.status === "producer"
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-zinc-800"
                      }`}
                    />
                  </div>

                  {/* Información de Identidad */}
                  <div className="text-center w-full px-2">
                    <h2
                      className={`text-lg font-bold tracking-tighter mb-1 whitespace-nowrap ${isCenter ? "text-red-500" : "text-red-700"}`}
                    >
                      {member.name}
                    </h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-tight">
                      {member.specialty}
                    </p>
                  </div>

                  {/* Redes y Enlaces Externos */}
                  <div className="flex gap-5 mt-6">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      return Icon ? (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -3, color: "#ef4444" }}
                          className="text-zinc-600 transition-colors"
                        >
                          <Icon size={18} />
                        </motion.a>
                      ) : null;
                    })}
                  </div>

                  {/* Metadata de Referencia */}
                  <span className="absolute top-2 right-3 text-[8px] text-zinc-800 font-mono italic">
                    REF_{member.id}00X
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;