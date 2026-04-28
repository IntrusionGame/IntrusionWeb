import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  FaLock, FaTerminal, FaDatabase, FaExclamationTriangle, FaSkull,
  FaImage, FaVideo, FaExternalLinkAlt, FaFilter, FaBug,
} from "react-icons/fa";
import logoIntrusion from "../Imagenes/LogoIntrusion.png";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const PASSWORD = import.meta.env.VITE_INTERNAL_REPORT_PASSWORD;


const IMPORTANCIA_CONFIG = {
  Bajo:    { color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.4)",  glow: "rgba(34,197,94,0.15)",  left: "#22c55e" },
  Medio:   { color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.4)", glow: "rgba(245,158,11,0.15)", left: "#f59e0b" },
  Alto:    { color: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.4)", glow: "rgba(249,115,22,0.15)", left: "#f97316" },
  Critico: { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.5)",  glow: "rgba(239,68,68,0.25)",  left: "#ef4444" },
};

const NIVEL_COLOR  = { Sotano: "#7c3aed", Salon: "#2563eb", Baño: "#0891b2" };
const TIPO_COLOR   = { mecanicas: "#ef4444", grafico: "#7c3aed", sonido: "#0891b2" };
const NIVEL_BG     = { Sotano: "rgba(124,58,237,0.15)", Salon: "rgba(37,99,235,0.15)", Baño: "rgba(8,145,178,0.15)" };
const TIPO_BG      = { mecanicas: "rgba(239,68,68,0.15)", grafico: "rgba(124,58,237,0.15)", sonido: "rgba(8,145,178,0.15)" };

const DatosInternosPage = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtroImportancia, setFiltroImportancia] = useState("Todos");
  const [filtroNivel, setFiltroNivel] = useState("Todos");
  const [modalArchivo, setModalArchivo] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) { setAutenticado(true); setErrorLogin(false); }
    else { setErrorLogin(true); setPassword(""); }
  };

  useEffect(() => {
    if (!autenticado) return;
    const fetchDatos = async () => {
      setCargando(true);
      const { data, error } = await supabase.from("reportes_internos").select("*").order("created_at", { ascending: false });
      if (!error) setDatos(data || []);
      setCargando(false);
    };
    fetchDatos();
  }, [autenticado]);

  const contarPor = (campo) => {
    const counts = {};
    datos.forEach((d) => { const val = d[campo] || "desconocido"; counts[val] = (counts[val] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const datosFiltrados = datos.filter((d) => {
    const okImp = filtroImportancia === "Todos" || d.importancia === filtroImportancia;
    const okNiv = filtroNivel === "Todos" || d.nivel === filtroNivel;
    return okImp && okNiv;
  });

  const esImagen = (url) => url && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  const esVideo  = (url) => url && /\.(mp4|mov|avi|mkv|webm)$/i.test(url);

  if (!autenticado) {
    return (
      <div style={{ backgroundColor: "black", width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          .font-elite  { font-family: 'Special Elite', serif; }
        `}</style>
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-zinc-900 bg-zinc-950/80 p-12 text-center shadow-[0_0_60px_rgba(185,28,28,0.1)]"
        >
          <FaLock className="text-red-700 text-4xl mx-auto mb-6 opacity-80" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-700 to-transparent mb-8" />
          <h1 className="text-xl text-zinc-100 font-black uppercase tracking-widest font-glitch mb-2">ACCESO RESTRINGIDO</h1>
          <div className="flex flex-col items-center gap-2 mb-8">
            <span className="text-[10px] text-zinc-600 font-elite uppercase tracking-[0.3em]">Panel Datos Internos <br></br><span>—</span></span>
            <img src={logoIntrusion} alt="Intrusion" className="h-6 w-auto brightness-75" style={{ filter: "drop-shadow(0 0 4px rgba(185,28,28,0.3))" }} />
          </div>
          <form onSubmit={handleLogin} className="space-y-6 font-elite">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">Contraseña</label>
              <input type="password" value={password} autoFocus
                onChange={(e) => { setPassword(e.target.value); setErrorLogin(false); }}
                className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none transition-colors font-elite"
                placeholder="••••••••••••"
              />
              {errorLogin && <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-700 uppercase tracking-widest">✗ Acceso denegado</Motion.p>}
            </div>
            <button type="submit" className="w-full py-4 bg-red-700 text-black font-black uppercase tracking-[0.5em] text-[10px] hover:bg-red-600 transition-all font-elite">ACCEDER</button>
          </form>
        </Motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "black", width: "100%", minHeight: "100vh", color: "#71717a", overflowY: "auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
        html, body { overflow-y: auto !important; height: auto !important; background: black; }
        .font-glitch { font-family: 'Rubik Glitch', system-ui; }
        .font-elite  { font-family: 'Special Elite', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #b91c1c; }
        .recharts-tooltip-wrapper { outline: none !important; }
        .card-critico { animation: pulse-border 2s infinite; }
        @keyframes pulse-border { 0%,100% { box-shadow: 0 0 8px rgba(239,68,68,0.2); } 50% { box-shadow: 0 0 20px rgba(239,68,68,0.5); } }
      `}</style>

      {/* MODAL */}
      {modalArchivo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6" onClick={() => setModalArchivo(null)}>
          <Motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full border border-red-700/30 bg-zinc-950 p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setModalArchivo(null)} className="absolute top-3 right-3 text-zinc-600 hover:text-red-700 text-xs font-elite uppercase tracking-widest">✕ CERRAR</button>
            {esImagen(modalArchivo) ? (
              <img src={modalArchivo} alt="evidencia" className="w-full max-h-[70vh] object-contain" />
            ) : esVideo(modalArchivo) ? (
              <video src={modalArchivo} controls className="w-full max-h-[70vh]" />
            ) : (
              <div className="text-center py-12">
                <a href={modalArchivo} target="_blank" rel="noopener noreferrer" className="text-red-700 font-elite uppercase tracking-widest text-sm hover:text-red-500">Abrir archivo ↗</a>
              </div>
            )}
          </Motion.div>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full p-6 flex justify-between items-center bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <FaDatabase className="text-red-700 text-sm" />
          <span className="text-[10px] text-red-700 font-bold tracking-[0.4em] animate-pulse font-elite uppercase flex items-center gap-2">
  <span>Panel_Interno —</span>
  <img 
    src={logoIntrusion} 
    alt="Intrusion" 
    className="h-[12px] w-auto object-contain brightness-90 contrast-125" 
    style={{ 
      filter: 'drop-shadow(0 0 3px rgba(185, 28, 28, 0.4))',
      transform: 'translateY(-1.5px)' 
    }}
  />
</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[9px] text-zinc-600 font-elite uppercase tracking-widest">{datos.length} reportes</span>
          <button onClick={() => setAutenticado(false)} className="text-[9px] text-zinc-700 hover:text-red-700 font-elite uppercase tracking-widest transition-colors">CERRAR SESIÓN</button>
        </div>
      </header>

      {cargando ? (
        <div className="flex items-center justify-center h-96"><FaTerminal className="text-red-700 text-4xl animate-pulse" /></div>
      ) : (
        <main className="w-full max-w-7xl mx-auto px-6 py-12 space-y-12">

          {/* STATS — con barras de progreso animadas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reportes",  value: datos.length, pct: 100, icon: <FaDatabase />, color: "#b91c1c" },
              { label: "Críticos",        value: datos.filter(d => d.importancia === "Critico").length, pct: datos.length ? (datos.filter(d => d.importancia === "Critico").length / datos.length) * 100 : 0, icon: <FaSkull />, color: "#ef4444" },
              { label: "Con Evidencia",   value: datos.filter(d => d.archivo_url).length, pct: datos.length ? (datos.filter(d => d.archivo_url).length / datos.length) * 100 : 0, icon: <FaImage />, color: "#7c3aed" },
              { label: "Altos+Críticos",  value: datos.filter(d => ["Alto","Critico"].includes(d.importancia)).length, pct: datos.length ? (datos.filter(d => ["Alto","Critico"].includes(d.importancia)).length / datos.length) * 100 : 0, icon: <FaExclamationTriangle />, color: "#f97316" },
            ].map((stat, i) => (
              <Motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="border border-zinc-900 bg-zinc-950 p-6 text-center relative overflow-hidden flex flex-col gap-3"
                style={{ boxShadow: `inset 0 0 30px ${stat.color}08` }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${stat.color}, transparent)` }} />
                <div className="text-xl flex justify-center" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="text-4xl text-zinc-100 font-black font-glitch">{stat.value}</div>
                <div className="text-[8px] text-zinc-600 font-elite uppercase tracking-widest">{stat.label}</div>
                {/* BARRA PROGRESO */}
                <div className="h-0.5 bg-zinc-900 w-full mt-1">
                  <Motion.div initial={{ width: 0 }} animate={{ width: `${stat.pct}%` }} transition={{ duration: 1.2, delay: i * 0.1 + 0.3 }}
                    className="h-full" style={{ backgroundColor: stat.color }}
                  />
                </div>
                <span className="text-[8px] font-elite" style={{ color: stat.color }}>{stat.pct.toFixed(0)}%</span>
              </Motion.div>
            ))}
          </div>

          {/* GRÁFICAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Importancia", campo: "importancia", colorMap: IMPORTANCIA_CONFIG, getColor: (n) => IMPORTANCIA_CONFIG[n]?.color || "#b91c1c" },
              { title: "Sector",      campo: "nivel",       colorMap: NIVEL_COLOR,        getColor: (n) => NIVEL_COLOR[n] || "#b91c1c" },
            ].map((chart, ci) => (
              <Motion.div key={ci} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}
                className="border border-zinc-900 bg-zinc-950 p-6"
              >
                <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-4 border-b border-zinc-900 pb-3">{chart.title}</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={contarPor(chart.campo)} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" strokeWidth={2} stroke="#000">
                      {contarPor(chart.campo).map((entry, i) => <Cell key={i} fill={chart.getColor(entry.name)} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '10px', fontFamily: 'Special Elite' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {contarPor(chart.campo).map((entry, i) => {
                    const color = chart.getColor(entry.name);
                    const pct = datos.length ? ((entry.value / datos.length) * 100).toFixed(0) : 0;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                            <span className="text-[9px] text-zinc-500 font-elite uppercase">{entry.name}</span>
                          </div>
                          <span className="text-[9px] font-black font-elite" style={{ color }}>{entry.value} <span className="text-zinc-700">({pct}%)</span></span>
                        </div>
                        <div className="h-0.5 bg-zinc-900">
                          <Motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.4 }} className="h-full" style={{ backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Motion.div>
            ))}

            {/* BAR tipo error */}
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="border border-zinc-900 bg-zinc-950 p-6"
            >
              <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-4 border-b border-zinc-900 pb-3">Tipo de Error</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={contarPor("tipo_error")} barSize={24}>
                  <XAxis dataKey="name" tick={{ fill: '#52525b', fontSize: 9, fontFamily: 'Special Elite' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#52525b', fontSize: 9 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '10px', fontFamily: 'Special Elite' }} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {contarPor("tipo_error").map((entry, i) => <Cell key={i} fill={TIPO_COLOR[entry.name] || "#b91c1c"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {contarPor("tipo_error").map((entry, i) => {
                  const color = TIPO_COLOR[entry.name] || "#b91c1c";
                  const pct = datos.length ? ((entry.value / datos.length) * 100).toFixed(0) : 0;
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-[9px] text-zinc-500 font-elite uppercase">{entry.name}</span>
                      </div>
                      <span className="text-[9px] font-black font-elite" style={{ color }}>{entry.value}</span>
                    </div>
                  );
                })}
              </div>
            </Motion.div>
          </div>

          {/* FILTROS */}
          <div className="flex flex-wrap gap-3 items-center border-y border-zinc-900 py-4">
            <FaFilter className="text-red-700 text-xs" />
            <span className="text-[9px] text-zinc-600 font-elite uppercase tracking-widest">Importancia:</span>
            {["Todos", "Bajo", "Medio", "Alto", "Critico"].map(f => (
              <button key={f} onClick={() => setFiltroImportancia(f)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all font-elite ${filtroImportancia === f ? "bg-red-700 border-red-700 text-black" : "bg-black border-zinc-800 text-zinc-600 hover:border-zinc-600"}`}
              >{f}</button>
            ))}
            <span className="text-zinc-800">|</span>
            <span className="text-[9px] text-zinc-600 font-elite uppercase tracking-widest">Sector:</span>
            {["Todos", "Sotano", "Salon", "Baño"].map(f => (
              <button key={f} onClick={() => setFiltroNivel(f)}
                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all font-elite ${filtroNivel === f ? "bg-red-700 border-red-700 text-black" : "bg-black border-zinc-800 text-zinc-600 hover:border-zinc-600"}`}
              >{f}</button>
            ))}
            <span className="text-[9px] text-zinc-700 font-elite ml-auto">{datosFiltrados.length} resultados</span>
          </div>

          {/* TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {datosFiltrados.length === 0 ? (
              <div className="col-span-3 text-center py-20 text-zinc-700 font-elite uppercase tracking-widest text-[11px]">Sin reportes con estos filtros</div>
            ) : (
              datosFiltrados.map((d, i) => {
                const imp = IMPORTANCIA_CONFIG[d.importancia] || IMPORTANCIA_CONFIG.Bajo;
                const nivelColor = NIVEL_COLOR[d.nivel] || "#b91c1c";
                const tipoColor = TIPO_COLOR[d.tipo_error] || "#b91c1c";
                const tieneArchivo = d.archivo_url && d.archivo_url.length > 0;
                const esCritico = d.importancia === "Critico";

                return (
                  <Motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex flex-col overflow-hidden transition-all relative ${esCritico ? "card-critico" : ""}`}
                    style={{
                      border: `1px solid ${imp.border}`,
                      background: `linear-gradient(135deg, #09090b 0%, ${imp.bg} 100%)`,
                      borderLeft: `3px solid ${imp.color}`,
                    }}
                  >
                    {/* NÚMERO DE REPORTE */}
                    <div className="absolute top-3 right-3 text-[8px] font-elite text-zinc-700">#{String(datos.length - datos.indexOf(d)).padStart(3, '0')}</div>

                    {/* CABECERA */}
                    <div className="p-4 pb-3 flex items-start gap-2 flex-wrap">
                      {/* IMPORTANCIA — badge sólido */}
                      <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 font-elite rounded-sm"
                        style={{ backgroundColor: imp.color, color: "#000" }}
                      >
                        {esCritico && "⚠ "}{d.importancia}
                      </span>
                      {/* NIVEL */}
                      <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 font-elite rounded-sm"
                        style={{ backgroundColor: NIVEL_BG[d.nivel] || "rgba(185,28,28,0.1)", color: nivelColor, border: `1px solid ${nivelColor}40` }}
                      >
                        {d.nivel}
                      </span>
                      {/* TIPO */}
                      <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 font-elite rounded-sm"
                        style={{ backgroundColor: TIPO_BG[d.tipo_error] || "rgba(185,28,28,0.1)", color: tipoColor, border: `1px solid ${tipoColor}40` }}
                      >
                        {d.tipo_error}
                      </span>
                    </div>

                    {/* PREVIEW IMAGEN */}
                    {tieneArchivo && esImagen(d.archivo_url) && (
                      <div className="relative cursor-pointer group mx-4 mb-3 overflow-hidden rounded-sm" onClick={() => setModalArchivo(d.archivo_url)}>
                        <img src={d.archivo_url} alt="evidencia" className="w-full h-40 object-cover opacity-50 group-hover:opacity-80 transition-all group-hover:scale-105 duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <span className="text-[9px] text-white font-elite uppercase tracking-widest bg-black/80 px-3 py-1.5 border border-white/10">↗ Ver evidencia</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    {/* PREVIEW VIDEO */}
                    {tieneArchivo && esVideo(d.archivo_url) && (
                      <div className="relative cursor-pointer group mx-4 mb-3 bg-zinc-900 rounded-sm overflow-hidden" onClick={() => setModalArchivo(d.archivo_url)}>
                        <div className="h-28 flex items-center justify-center gap-3 group-hover:bg-zinc-800 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-red-700/20 border border-red-700/40 flex items-center justify-center group-hover:bg-red-700/40 transition-colors">
                            <FaVideo className="text-red-700 text-sm" />
                          </div>
                          <span className="text-[9px] text-zinc-500 font-elite uppercase tracking-widest group-hover:text-zinc-300 transition-colors">Reproducir vídeo</span>
                        </div>
                      </div>
                    )}

                    {/* DESCRIPCIÓN */}
                    <div className="px-4 pb-3 flex-1">
                      <div className="text-[8px] text-zinc-700 font-elite uppercase tracking-widest mb-2 flex items-center gap-1">
                        <FaBug className="text-[7px]" /> Descripción del fallo
                      </div>
                      <p className="text-[11px] text-zinc-300 font-elite leading-6 line-clamp-4">
                        {d.descripcion || <span className="text-zinc-700 italic">Sin descripción</span>}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: `${imp.color}20` }}>
                      {tieneArchivo && !esImagen(d.archivo_url) && !esVideo(d.archivo_url) && (
                        <a href={d.archivo_url} target="_blank" rel="noopener noreferrer"
                          className="text-[8px] text-zinc-600 hover:text-red-700 font-elite uppercase tracking-widest flex items-center gap-1 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-[7px]" /> Ver archivo
                        </a>
                      )}
                      {tieneArchivo && (esImagen(d.archivo_url) || esVideo(d.archivo_url)) && (
                        <button onClick={() => setModalArchivo(d.archivo_url)}
                          className="text-[8px] text-zinc-600 hover:text-red-700 font-elite uppercase tracking-widest flex items-center gap-1 transition-colors"
                        >
                          {esImagen(d.archivo_url) ? <FaImage className="text-[7px]" /> : <FaVideo className="text-[7px]" />}
                          Ver evidencia
                        </button>
                      )}
                      {!tieneArchivo && <span className="text-[8px] text-zinc-800 font-elite italic">Sin evidencia</span>}
                      <span className="text-[8px] text-zinc-700 font-elite">
                        {d.created_at ? new Date(d.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "2-digit" }) : ""}
                      </span>
                    </div>
                  </Motion.div>
                );
              })
            )}
          </div>

        </main>
      )}

      <footer className="w-full py-10 flex justify-center opacity-20 font-elite">
        <span className="text-[8px] tracking-[2em] uppercase font-bold text-white">SYSTEM_OFFLINE</span>
      </footer>
    </div>
  );
};

export default DatosInternosPage;