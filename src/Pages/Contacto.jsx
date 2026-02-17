import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaSkull, FaInstagram, FaTwitter, FaDiscord, FaBroadcastTower, FaUserSecret, FaEnvelopeOpenText } from "react-icons/fa";

const Contacto = () => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const destinatarios = [
    { id: "all", label: "BROADCAST_TOTAL (Todos los Arquitectos)", email: "proyecto.videojuegos.2526@gmail.com" },
    { id: "arch_01", label: "David Jiménez Villena (Web/Gamer Dev)", email: "davidjimenezvillena@gmail.com" },
    { id: "arch_02", label: "Luis Miguel Escuderos (3D Art)", email: "luismiguelescuderoalcaide10@gmail.com" },
    { id: "arch_03", label: "Víctor Hugo Jiménez (Producer)", email: "victorhugojimenezmeseguer@gmail.com" },
    { id: "arch_04", label: "José Andrés Garrido (3D/2D Art)", email: "joseandresgarridoguti@gmail.com" },
    { id: "arch_05", label: "Óscar González (Gamer Dev/Art)", email: "oscarge10.oge@gmail.com" },
    { id: "arch_06", label: "Eva Góngora (Art Director)", email: "evagfvdg@gmail.com" },
    { id: "arch_07", label: "Francisco Torres (Gamer Dev)", email: "franciscotorrespuche@gmail.com"},
    { id: "arch_08", label: "Rafael Soler (Gamer Dev/UX)", email: "rafasc3000@gmail.com" },
    { id: "arch_09", label: "Michel Mendoza (Gamer Developer)", email: "michel.mendoza@gmail.com" },
    { id: "arch_10", label: "Javier Soriano Moreno (Gamer Developer)", email: "soriano8822@gmail.com" },
  ];

  // LOGICA DE ENVÍO Y SEGURIDAD
  const sendEmail = (e) => {
    e.preventDefault();

    if (honeypot !== "") {
      setStatus("PAQUETES ENVIADOS. BORRANDO HUELLAS..."); 
      setTimeout(() => setStatus(""), 5000);
      return;
    }

    setStatus("INICIANDO PROTOCOLO DE TRANSMISIÓN...");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setStatus("PAQUETES ENVIADOS. BORRANDO HUELLAS...");
          e.target.reset();
          setHoneypot("");
          setTimeout(() => setStatus(""), 5000);
      }, (error) => {
          console.error("ERROR_LOG:", error);
          setStatus("ERROR_CODE: 0x00042 - ENLACE ROTO.");
          setTimeout(() => setStatus(""), 5000);
      });
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-y-auto custom-scrollbar font-elite text-zinc-400 select-none">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { 
            font-family: 'Special Elite', serif !important; 
            -webkit-font-smoothing: none;
            text-rendering: optimizeLegibility;
          }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #450a0a; border: 1px solid #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
          
          select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23450a0a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1em;
          }
          .status-flicker { animation: flicker 2s infinite; }
          @keyframes flicker {
            0%, 100%, 10%, 8%, 6% { opacity: 1; }
            9%, 7%, 3% { opacity: 0.4; }
          }
        `}
      </style>

      {/* NAVEGACIÓN */}
      <Link to="/">
        <motion.div 
          whileHover={{ x: -5 }}
          className="fixed top-6 left-6 z-[60] flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-colors cursor-pointer group font-elite"
        >
          <FaChevronLeft className="group-hover:animate-pulse" />
          <span className="text-xs tracking-widest uppercase italic">INTERRUMPIR_ENLACE</span>
        </motion.div>
      </Link>

      <div className="max-w-6xl mx-auto pt-24 pb-20 px-6">
        <header className="border-b border-red-900/30 pb-8 mb-16 relative">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-glitch text-red-700 uppercase mb-4 tracking-tighter drop-shadow-[0_0_8px_rgba(185,28,28,0.4)]"
          >
            Canal de Enlace
          </motion.h1>
          <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase animate-pulse font-elite">
            Estableciendo conexión con los arquitectos del vacío...
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-elite">
          
          {/* SECCIÓN: REDES EXTERNAS */}
          <motion.section 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-red-600">
              <FaBroadcastTower />
              <h2 className="text-xl tracking-widest uppercase font-bold text-zinc-200">Frecuencias Externas</h2>
            </div>
            
            <div className="grid gap-6">
              {[
                { name: "Instagram", icon: <FaInstagram />, user: "@INTRUSION_DEV", link: "#" },
                { name: "Twitter / X", icon: <FaTwitter />, user: "ARCHITECT_X", link: "#" },
                { name: "Discord", icon: <FaDiscord />, user: "VOID_SERVER", link: "#" }
              ].map((social, i) => (
                <a 
                  href={social.link} 
                  key={i}
                  className="group flex items-center justify-between p-4 border border-zinc-900 bg-zinc-950/50 hover:border-red-900/50 transition-all hover:bg-zinc-900/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-zinc-700 group-hover:text-red-600 transition-colors">
                      {social.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-600 uppercase tracking-tighter">{social.name}</span>
                      <span className="text-sm text-zinc-300 group-hover:text-red-500 transition-colors font-elite">{social.user}</span>
                    </div>
                  </div>
                  <FaSkull className="opacity-0 group-hover:opacity-100 text-red-900 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.section>

          {/* SECCIÓN: TRANSMISOR DE DATOS */}
          <motion.section 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-zinc-950/30 border border-red-900/10 p-8 relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-2 text-[8px] text-red-900/50 font-mono uppercase italic">
              Packet_Loss: 0.02%
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              
              {/* FILTRO ANTI-BOTS */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input 
                  type="text" 
                  name="anti_bot_field" 
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />
              </div>

              <input type="hidden" name="time" value={new Date().toLocaleString('es-ES', { timeZone: 'UTC', hour12: false })} />

              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-bold font-elite">
                  <FaUserSecret className="text-red-900" /> Canal de Destino
                </label>
                <select 
                  name="to_email" 
                  required
                  className="w-full bg-black border border-zinc-900 p-3 text-xs focus:border-red-700 outline-none transition-colors text-red-500 font-elite cursor-pointer shadow-inner"
                >
                  {destinatarios.map((dest) => (
                    <option key={dest.id} value={dest.email} className="bg-black text-zinc-300">
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-bold font-elite">Identificador</label>
                  <input type="text" name="user_name" required className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-red-700 outline-none text-zinc-300 font-elite" placeholder="SUJETO_00" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-bold font-elite">Punto de Retorno</label>
                  <input type="email" name="user_email" required className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-red-700 outline-none text-zinc-300 font-elite" placeholder="red@void.com" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-bold font-elite">
                  <FaEnvelopeOpenText className="text-zinc-700" size={10} /> Encabezado
                </label>
                <input type="text" name="subject" required className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-red-700 outline-none text-zinc-300 font-elite" placeholder="ERR_LOG: FALLO EN EL SISTEMA" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 font-bold font-elite">Mensaje Cifrado</label>
                <textarea name="message" rows="4" required className="w-full bg-black border border-zinc-900 p-3 text-sm focus:border-red-700 outline-none text-zinc-300 font-elite resize-none" placeholder="Escriba su reporte aquí..." />
              </div>

              <button type="submit" className="w-full bg-red-950/20 border border-red-900 hover:bg-red-900 hover:text-white transition-all py-4 text-xs tracking-[0.4em] uppercase font-bold active:scale-95 shadow-[0_0_15px_rgba(153,27,27,0.1)] font-elite">
                Transmitir Datos
              </button>

              <AnimatePresence>
                {status && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] text-center text-red-600 font-bold tracking-widest uppercase status-flicker border border-red-900/20 py-2 font-elite"
                  >
                    {status}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.section>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Contacto;