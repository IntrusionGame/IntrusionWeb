import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaChevronLeft,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import logoIntrusion from "../Imagenes/LogoIntrusion.png";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ReportePage = () => {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sujeto_id: "",
    tipo_anomalia: "visual",
    gravedad: "Baja",
    fps_estables: "si",
    integridad_build: 5,
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const { error } = await supabase
        .from("reportes_externos")
        .insert([formData]);
      if (error) throw error;
    const resultado = await supabase.functions.invoke("bright-api", {
  body: { formData }
});
console.log("Discord result:", resultado);
      setEnviado(true);
    } catch (error) {
      alert("FALLO EN LA TRANSMISIÓN: " + error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        minHeight: "100vh",
        color: "#71717a",
        overflowY: "auto",
        position: "relative",
        display: "block",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
        html, body {
          overflow-y: auto !important;
          height: auto !important;
        }
        .font-glitch { font-family: 'Rubik Glitch', system-ui; }
        .font-elite { font-family: 'Special Elite', serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000000; }
        ::-webkit-scrollbar-thumb { background-color: #b91c1c; border: 1px solid #1a1a1a; }
        ::-webkit-scrollbar-thumb:hover { background-color: #b91c1c; }
      `}</style>

      <header className="w-full p-6 flex justify-between items-center bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="text-[10px] text-red-700 font-bold tracking-[0.4em] animate-pulse font-elite">
          SISTEMA_REPORTE_V.5
        </div>
      </header>

      <section className="w-full max-w-4xl mx-auto py-16 px-6">
        {enviado ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center py-24 border border-zinc-900 bg-zinc-950/50 shadow-2xl px-10"
          >
            <FaCheckCircle className="text-red-700 text-6xl mb-8 opacity-80" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mb-8" />
            <h2 className="text-2xl text-red-700 font-black uppercase tracking-widest italic font-glitch mb-4">
              Protocolo Completado
            </h2>
            <p className="text-[13px] text-zinc-400 font-elite leading-8 max-w-md mb-10">
              Gracias por rellenar el formulario.{" "}
              <span className="text-zinc-200">
                Hemos guardado tus datos correctamente.
              </span>{" "}
              Tu reporte ha sido integrado en nuestra base de datos y nos
              ayudará a mejorar el juego.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-12 py-5 bg-red-700 text-black font-black uppercase text-[11px] tracking-[0.6em] hover:bg-red-600 transition-all active:scale-95 font-elite shadow-[0_0_30px_rgba(185,28,28,0.3)]"
            >
              VOLVER AL MENÚ PRINCIPAL
            </button>
          </Motion.div>
        ) : (
          <div className="space-y-6">
            {/* TÍTULO */}
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-2"
            >
              {/* Contenedor Flex para alinear texto y logo */}
              <div className="flex items-center justify-center gap-4 mb-2">
                <h1 className="text-4xl text-red-700 font-black uppercase tracking-tighter font-glitch">
                  Formulario de Testeo de
                </h1>
                {/* El Logo de Intrusion */}
                <img
                  src={logoIntrusion} // ← Asegúrate de que esta sea la ruta correcta de tu logo
                  alt="Intrusion Logo"
                  className="h-10 w-auto object-contain brightness-90 contrast-125"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(185, 28, 28, 0.4))",
                  }}
                />
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mt-3" />
            </Motion.div>

            {/* POLÍTICA DE DATOS */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border border-zinc-800 bg-zinc-950/80 p-6 flex gap-4 items-start"
            >
              <FaShieldAlt className="text-red-700 text-xl mt-0.5 shrink-0" />
              <div className="space-y-2 font-elite">
                <p className="text-[11px] text-zinc-300 font-black uppercase tracking-widest">
                  Política de Privacidad de Datos
                </p>
                <p className="text-[11px] text-zinc-500 leading-6">
                  Los datos introducidos en este formulario se almacenan de
                  forma <span className="text-zinc-300">interna y privada</span>
                  , siendo utilizados únicamente para mejorar el desarrollo del
                  juego. Nunca serán compartidos con terceros.
                </p>
                <p className="text-[11px] text-zinc-500 leading-6">
                  Si no deseas que se conozca tu nombre, puedes escribir{" "}
                  <span className="text-zinc-300 font-black">Anónimo</span> en
                  el campo de identificador.
                </p>
                <p className="text-[11px] text-zinc-500 leading-6">
                  ¿Tienes alguna duda?{" "}
                  <Link
                    to="/contacto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-700 hover:text-red-500 transition-colors underline decoration-red-700/40 underline-offset-2"
                  >
                    No dudes en escribirnos en nuestra página de contacto.
                  </Link>
                </p>
              </div>
            </Motion.div>

            {/* FORMULARIO */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-2 text-[8px] text-zinc-800 italic font-elite uppercase tracking-[0.2em]">
                DATA_NODE_SUPABASE_v.2.0
              </div>

              <div className="flex items-center gap-4 mb-12 border-b border-zinc-900 pb-6">
                <FaFileAlt className="text-red-700 text-2xl" />
                <h2 className="text-red-700 text-2xl font-black uppercase tracking-widest italic font-glitch">
                  Informe de Anomalías
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 font-elite">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                      Sujeto_ID
                    </label>
                    <input
                      type="text"
                      value={formData.sujeto_id}
                      required
                      className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none transition-colors font-elite"
                      placeholder="ID DEL TESTER o 'Anónimo'..."
                      onChange={(e) =>
                        setFormData({ ...formData, sujeto_id: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                      Tipo_de_Anomalía
                    </label>
                    <select
                      className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none font-elite cursor-pointer"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tipo_anomalia: e.target.value,
                        })
                      }
                    >
                      <option value="visual">Visual / Gráfica</option>
                      <option value="mecanica">Mecánica / Gameplay</option>
                      <option value="rendimiento">Rendimiento / FPS</option>
                      <option value="audio">Audio / Interfaz</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                      Nivel_de_Amenaza
                    </label>
                    <div className="flex gap-6 mt-2">
                      {["Baja", "Media", "Crítica"].map((nivel) => (
                        <label
                          key={nivel}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="gravedad"
                            value={nivel}
                            checked={formData.gravedad === nivel}
                            className="accent-red-700 w-4 h-4"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gravedad: e.target.value,
                              })
                            }
                          />
                          <span className="text-[10px] uppercase group-hover:text-red-700 transition-colors">
                            {nivel}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                      ¿FPS_Estables?
                    </label>
                    <select
                      className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none font-elite"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fps_estables: e.target.value,
                        })
                      }
                    >
                      <option value="si">Constantes (60+)</option>
                      <option value="no">Inestables / Tirones</option>
                      <option value="caidas">Caídas en Combate</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4 bg-zinc-900/30 p-6 border border-zinc-900">
                  <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                    Estado_de_Integridad_de_la_Build (
                    {formData.integridad_build} - 10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.integridad_build}
                    className="w-full accent-red-700 bg-zinc-900 h-1 appearance-none cursor-pointer"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        integridad_build: parseInt(e.target.value),
                      })
                    }
                  />
                  <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                    <span>SISTEMA_CORRUPTO</span>
                    <span>SISTEMA_ESTABLE</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                    Descripción_del_Fallo
                  </label>
                  <textarea
                    required
                    value={formData.descripcion}
                    className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 h-40 focus:border-red-700 outline-none resize-none transition-colors font-elite"
                    placeholder="Escriba los detalles técnicos del error detectado..."
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full py-6 bg-zinc-900 border border-red-700/50 text-red-700 font-black uppercase tracking-[0.6em] hover:bg-red-700 hover:text-black transition-all font-elite flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  <span className="group-hover:animate-pulse">
                    {enviando ? "SINCRONIZANDO..." : "SINCRONIZAR_REPORTE_DB"}
                  </span>
                </button>
              </form>
            </Motion.div>
          </div>
        )}
      </section>

      <footer className="w-full py-16 flex justify-center opacity-20 font-elite">
        <span className="text-[8px] tracking-[2em] uppercase font-bold text-white">
          SYSTEM_OFFLINE
        </span>
      </footer>
    </div>
  );
};

export default ReportePage;
