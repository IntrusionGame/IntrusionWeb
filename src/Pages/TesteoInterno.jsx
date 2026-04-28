import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaCheckCircle,
  FaUpload,
  FaTimes,
  FaTerminal,
  FaMicrochip,
  FaLock,
} from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import logoIntrusion from "../Imagenes/LogoIntrusion.png";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const PASSWORD = import.meta.env.VITE_INTERNAL_REPORT_PASSWORD;

const ReportePage = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plataforma: "PC",
    nivel: "Sotano",
    tipo_error: "mecanicas",
    importancia: "Bajo",
    descripcion: "",
    archivo_url: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAutenticado(true);
      setErrorLogin(false);
    } else {
      setErrorLogin(true);
      setPassword("");
    }
  };

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      alert("ERROR: EL ARCHIVO EXCEDE EL LÍMITE DE SEGURIDAD (50MB)");
      return;
    }
    setArchivo(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setEnviando(true);
  try {
    let archivo_url = "";
    if (archivo) {
      setSubiendo(true);
      const ext = archivo.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("archivos-testeo")
        .upload(fileName, archivo);
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage
        .from("archivos-testeo")
        .getPublicUrl(fileName);
      archivo_url = urlData.publicUrl;
      setSubiendo(false);
    }

    const { error } = await supabase
      .from("reportes_internos")
      .insert([{ ...formData, archivo_url }]);
    if (error) throw error;

    
    await supabase.functions.invoke("bright-task", {
  body: { formData, archivo_url }
});

    setEnviado(true);
  } catch (error) {
    alert("FALLO CRÍTICO EN LA TRANSMISIÓN: " + error.message);
  } finally {
    setEnviando(false);
    setSubiendo(false);
  }
};

  if (!autenticado) {
    return (
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          minHeight: "100vh",
          color: "#71717a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite { font-family: 'Special Elite', serif; }
        `}</style>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-zinc-900 bg-zinc-950/80 p-12 text-center shadow-[0_0_60px_rgba(185,28,28,0.1)]"
        >
          <FaLock className="text-red-700 text-4xl mx-auto mb-6 opacity-80" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mb-8" />
          <h1 className="text-xl text-zinc-100 font-black uppercase tracking-widest font-glitch mb-2">
            ACCESO RESTRINGIDO
          </h1>
          <p className="text-[11px] text-zinc-600 font-elite uppercase tracking-[0.3em] mb-8 flex flex-col items-center gap-1">
            <span>Formulario de Testeo Interno</span>
            <span>—</span>
            <img
              src={logoIntrusion}
              alt="Intrusion"
              className="h-6 w-auto object-contain brightness-75" // h-3 es aprox 12px, similar al texto [10px]
              style={{ filter: "drop-shadow(0 0 4px rgba(185, 28, 28, 0.3))" }}
            />
          </p>
          <form onSubmit={handleLogin} className="space-y-6 font-elite">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorLogin(false);
                }}
                className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none transition-colors font-elite"
                placeholder="••••••••••••"
              />
              {errorLogin && (
                <Motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] text-red-700 uppercase tracking-widest"
                >
                  ✗ Acceso denegado
                </Motion.p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-red-700 text-black font-black uppercase tracking-[0.5em] text-[10px] hover:bg-red-600 transition-all font-elite"
            >
              ACCEDER
            </button>
          </form>
        </Motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100%",
        minHeight: "100vh",
        color: "#71717a",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
        html, body { overflow-y: auto !important; height: auto !important; background: black; }
        .font-glitch { font-family: 'Rubik Glitch', system-ui; }
        .font-elite { font-family: 'Special Elite', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #b91c1c; }
      `}</style>

      <header className="w-full p-4 flex justify-between items-center bg-black border-b border-red-900/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <FaTerminal className="text-red-700 text-xs animate-pulse" />
          <div className="text-[10px] text-red-700 font-bold tracking-[0.5em] font-elite uppercase">
            Intrusion_Testeo_Interno
          </div>
        </div>
        <button
          onClick={() => setAutenticado(false)}
          className="text-[9px] text-zinc-700 hover:text-red-700 font-elite uppercase tracking-widest transition-colors"
        >
          CERRAR SESIÓN
        </button>
      </header>

      <section className="w-full max-w-6xl mx-auto py-12 px-6 min-h-screen">
        {enviado ? (
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-32 border border-red-900/20 bg-zinc-950/80"
          >
            <FaCheckCircle className="text-red-700 text-7xl mb-6 drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]" />
            <h2 className="text-4xl text-red-700 font-glitch uppercase mb-2">
              Sincronización Exitosa
            </h2>
            <p className="text-zinc-500 font-elite text-xs tracking-widest mb-12">
              REPORTE ALMACENADO EN EL NODO CENTRAL
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-md px-6">
              <button
                onClick={() => {
                  setEnviado(false);
                  setArchivo(null);
                  setFormData({
                    plataforma: "PC",
                    nivel: "Sotano",
                    tipo_error: "mecanicas",
                    importancia: "Bajo",
                    descripcion: "",
                    archivo_url: "",
                  });
                }}
                className="flex-1 px-6 py-4 bg-red-700 text-black font-black font-elite text-[10px] tracking-[0.3em] hover:bg-red-600 transition-all active:scale-95"
              >
                NUEVO_REPORTE
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 px-6 py-4 bg-transparent border border-red-900/50 text-red-700 font-elite text-[10px] tracking-[0.3em] hover:bg-red-900/20 hover:border-red-700 transition-all active:scale-95"
              >
                CERRAR_SESIÓN
              </button>
            </div>
          </Motion.div>
        ) : (
          // ← ÚNICO CAMBIO: Motion.div con animación de entrada
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-6 gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-6xl text-red-700 font-glitch uppercase tracking-tighter">
                  Testeo interno de
                </h1>
                <img
                  src={logoIntrusion}
                  alt="Logo"
                  className="h-14 w-auto brightness-90"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-elite"
            >
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-zinc-950 border border-zinc-900 p-6">
                  <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-4 block">
                    01 // PLATAFORMA
                  </label>
                  <div className="bg-black border border-red-700/20 p-4 flex justify-between items-center">
                    <span className="text-zinc-200 text-xs font-black tracking-widest">
                      PC
                    </span>
                    <div className="w-2 h-2 bg-red-700 rounded-full" />
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-6">
                  <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-5 block">
                    02 // SECTOR_DE_FALLO
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Sotano", "Salon", "Baño"].map((niv) => (
                      <button
                        key={niv}
                        type="button"
                        onClick={() => setFormData({ ...formData, nivel: niv })}
                        className={`text-left px-5 py-4 text-[11px] border transition-all font-black tracking-widest ${
                          formData.nivel === niv
                            ? "bg-red-700 border-red-700 text-black"
                            : "bg-black border-zinc-800 text-zinc-600 hover:border-zinc-700"
                        }`}
                      >
                        {niv.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-6">
                  <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-5 block">
                    03 // PRIORIDAD_SISTEMA
                  </label>
                  <div className="flex flex-col gap-2">
                    {["Bajo", "Medio", "Alto", "Critico"].map((imp) => (
                      <button
                        key={imp}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, importancia: imp })
                        }
                        className={`py-3 text-[10px] border transition-all text-center font-bold ${
                          formData.importancia === imp
                            ? "bg-white border-white text-black"
                            : "bg-black border-zinc-900 text-zinc-700 hover:text-zinc-400"
                        }`}
                      >
                        {imp.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div className="bg-zinc-950 border border-zinc-900 p-6">
                  <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-5 block">
                    04 // CATEGORÍA_ANOMALÍA
                  </label>
                  <div className="flex gap-3">
                    {["mecanicas", "grafico", "sonido"].map((tipo) => (
                      <button
                        key={tipo}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, tipo_error: tipo })
                        }
                        className={`flex-1 py-4 text-[11px] border transition-all font-black ${
                          formData.tipo_error === tipo
                            ? "bg-red-700 border-red-700 text-black"
                            : "bg-black border-zinc-800 text-zinc-600 hover:text-red-700"
                        }`}
                      >
                        {tipo.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-6 relative">
                  <div className="absolute top-0 right-0 p-4">
                    <FaMicrochip className="text-zinc-900 text-2xl" />
                  </div>
                  <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-4 block">
                    05 // ANÁLISIS_DETALLADO
                  </label>
                  <textarea
                    required
                    value={formData.descripcion}
                    className="w-full bg-black border border-zinc-800 p-5 text-sm text-zinc-300 h-56 focus:border-red-700 outline-none resize-none transition-all placeholder:text-zinc-800"
                    placeholder="INTRODUCIR REGISTROS DE LA ANOMALÍA AQUÍ..."
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-center">
                    <label className="text-[11px] text-red-900 font-bold uppercase tracking-[0.2em] mb-4 block">
                      06 // EVIDENCIA_VISUAL
                    </label>
                    <input
                      type="file"
                      id="archivo"
                      className="hidden"
                      onChange={handleArchivo}
                      accept="image/*,video/*"
                    />
                    {!archivo ? (
                      <div className="space-y-3">
                        <label
                          htmlFor="archivo"
                          className="flex items-center gap-4 p-5 bg-black border border-dashed border-zinc-800 cursor-pointer hover:border-red-700 group transition-all"
                        >
                          <FaUpload className="text-zinc-700 group-hover:text-red-700" />
                          <span className="text-[10px] text-zinc-600 group-hover:text-zinc-300 uppercase tracking-widest">
                            Cargar Media
                          </span>
                        </label>
                        <p className="text-[11px] text-red-900/60 font-elite tracking-widest uppercase">
                          [ MAX_CAPACITY: 50MB // FORMATS: IMG, VIDEO ]
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-red-700/10 border border-red-700/50 p-5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-red-500 truncate max-w-[150px] font-bold">
                            {archivo.name}
                          </span>
                          <span className="text-[8px] text-zinc-600 uppercase">
                            {(archivo.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setArchivo(null)}
                          className="text-red-700 hover:scale-125 transition-transform"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="bg-red-700 hover:bg-red-600 text-black p-6 flex flex-col items-center justify-center gap-2 group transition-all disabled:opacity-30"
                  >
                    <span className="text-[14px] font-black tracking-[0.5em]">
                      {subiendo
                        ? "TRANSFIRIENDO..."
                        : enviando
                          ? "PROCESANDO..."
                          : "ENVIAR REPORTE"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </Motion.div>
        )}
      </section>
    </div>
  );
};

export default ReportePage;
