import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaLock, FaTerminal, FaSkull, FaExclamationTriangle, FaTachometerAlt, FaDatabase } from "react-icons/fa";
import logoIntrusion from "../Imagenes/LogoIntrusion.png";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const PASSWORD = import.meta.env.VITE_REPORT_PASSWORD;

const COLORS = {
  visual: "#b91c1c",
  mecanica: "#7f1d1d",
  rendimiento: "#dc2626",
  audio: "#ef4444",
  Baja: "#22c55e",
  Media: "#f59e0b",
  Crítica: "#b91c1c",
  si: "#22c55e",
  no: "#f59e0b",
  caidas: "#b91c1c",
};

const DatosPage = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAutenticado(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  useEffect(() => {
    if (!autenticado) return;
    const fetchDatos = async () => {
      setCargando(true);
      const { data, error } = await supabase.from('reportes_externos').select('*');
      if (!error) setDatos(data || []);
      setCargando(false);
    };
    fetchDatos();
  }, [autenticado]);

  const contarPor = (campo) => {
    const counts = {};
    datos.forEach(d => {
      const val = d[campo] || "desconocido";
      counts[val] = (counts[val] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const promedioIntegridad = datos.length
    ? (datos.reduce((acc, d) => acc + (d.integridad_build || 0), 0) / datos.length).toFixed(1)
    : 0;

  const distribucionIntegridad = Array.from({ length: 10 }, (_, i) => ({
    name: `${i + 1}`,
    value: datos.filter(d => d.integridad_build === i + 1).length
  }));

  const anomalias = contarPor('tipo_anomalia');
  const gravedades = contarPor('gravedad');
  const fps = contarPor('fps_estables');

  if (!autenticado) {
    return (
      <div style={{ backgroundColor: 'black', width: '100%', minHeight: '100vh', color: '#71717a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <h1 className="text-xl text-zinc-100 font-black uppercase tracking-widest font-glitch mb-2">ACCESO RESTRINGIDO</h1>
            <p className="text-[11px] text-zinc-600 font-elite uppercase tracking-[0.3em] mb-8 flex flex-col items-center gap-1">
            <span>Panel de Datos del análisis externo</span>
            <span>—</span>
            {/* Imagen del Logo sustituyendo el texto */}
            <img
              src={logoIntrusion}
              alt="Intrusion"
              className="h-6 w-auto object-contain brightness-75" // h-3 es aprox 12px, similar al texto [10px]
              style={{ filter: "drop-shadow(0 0 4px rgba(185, 28, 28, 0.3))" }}
            />
          </p>          <form onSubmit={handleLogin} className="space-y-6 font-elite">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] text-red-700 font-black uppercase tracking-[0.2em]">Contraseña</label>
              <input
                type="password"
                value={password}
                autoFocus
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className="bg-black border border-zinc-800 p-4 text-sm text-zinc-400 focus:border-red-700 outline-none transition-colors font-elite"
                placeholder="••••••••••••"
              />
              {error && <Motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-700 uppercase tracking-widest">✗ Acceso denegado</Motion.p>}
            </div>
            <button type="submit" className="w-full py-4 bg-red-700 text-black font-black uppercase tracking-[0.5em] text-[10px] hover:bg-red-600 transition-all font-elite">ACCEDER</button>
          </form>
        </Motion.div>
      </div>
    );
  }

  return (
    /* CORRECCIÓN DE SCROLL: overflow-y: auto y height: auto */
    <div style={{ 
      backgroundColor: 'black', 
      width: '100%', 
      minHeight: '100vh', 
      color: '#71717a', 
      overflowY: 'auto', 
      display: 'block',
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Special+Elite&display=swap');
        
        /* Aseguramos que el scroll funcione en todos los niveles */
        html, body {
          overflow-y: auto !important;
          height: auto !important;
          background: black;
        }

        .font-glitch { font-family: 'Rubik Glitch', system-ui; }
        .font-elite { font-family: 'Special Elite', serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background-color: #b91c1c; border: 1px solid #1a1a1a; }
        .recharts-tooltip-wrapper { outline: none !important; }
      `}</style>

      <header className="w-full p-6 flex justify-between items-center bg-black border-b border-zinc-900 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <FaDatabase className="text-red-700 text-sm" />
          <span className="text-[10px] text-red-700 font-bold tracking-[0.4em] animate-pulse font-elite uppercase flex items-center gap-2">
  <span>Panel_Externo —</span>
  <img 
    src={logoIntrusion} 
    alt="Intrusion" 
    className="h-[12px] w-auto object-contain brightness-90 contrast-125" 
    style={{ 
      filter: 'drop-shadow(0 0 3px rgba(185, 28, 28, 0.4))',
      transform: 'translateY(-1px)' 
    }}
  />
</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[9px] text-zinc-600 font-elite uppercase tracking-widest">
            {datos.length} reportes totales
          </span>
          <button
            onClick={() => setAutenticado(false)}
            className="text-[9px] text-zinc-700 hover:text-red-700 font-elite uppercase tracking-widest transition-colors"
          >
            CERRAR SESIÓN
          </button>
        </div>
      </header>

      {cargando ? (
        <div className="flex items-center justify-center h-96">
          <FaTerminal className="text-red-700 text-4xl animate-pulse" />
        </div>
      ) : (
        /* Agregado h-auto para que el contenido fluya */
        <main className="w-full max-w-7xl mx-auto px-6 py-12 space-y-12 h-auto">
          {/* STATS RÁPIDAS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Reportes", value: datos.length, icon: <FaDatabase /> },
              { label: "Promedio Integridad", value: `${promedioIntegridad}/10`, icon: <FaTachometerAlt /> },
              { label: "Bugs Críticos", value: datos.filter(d => d.gravedad === "Crítica").length, icon: <FaSkull /> },
              { label: "FPS Inestables", value: datos.filter(d => d.fps_estables !== "si").length, icon: <FaExclamationTriangle /> },
            ].map((stat, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-zinc-900 bg-zinc-950/50 p-6 text-center"
              >
                <div className="text-red-700 text-xl mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl text-zinc-100 font-black font-glitch mb-1">{stat.value}</div>
                <div className="text-[9px] text-zinc-600 font-elite uppercase tracking-widest">{stat.label}</div>
              </Motion.div>
            ))}
          </div>

          {/* FILA 1: Tipo Anomalía + Gravedad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PIE — Tipo Anomalía */}
            <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="border border-zinc-900 bg-zinc-950/50 p-8">
              <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-6 border-b border-zinc-900 pb-4">Tipo de Anomalía</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={anomalias} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                      {anomalias.map((entry, i) => <Cell key={i} fill={COLORS[entry.name] || "#b91c1c"} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '11px', fontFamily: 'Special Elite' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 flex-1">
                  {anomalias.map((entry, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[entry.name] || "#b91c1c" }} />
                        <span className="text-[10px] text-zinc-400 font-elite uppercase">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 bg-zinc-900 rounded" style={{ width: 60 }}>
                          <div className="h-full rounded" style={{ width: `${(entry.value / datos.length) * 100}%`, backgroundColor: COLORS[entry.name] || "#b91c1c" }} />
                        </div>
                        <span className="text-[10px] text-zinc-200 font-black font-elite">{entry.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>

            {/* PIE — Gravedad */}
            <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="border border-zinc-900 bg-zinc-950/50 p-8">
              <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-6 border-b border-zinc-900 pb-4">Nivel de Gravedad</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie data={gravedades} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                      {gravedades.map((entry, i) => <Cell key={i} fill={COLORS[entry.name] || "#b91c1c"} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '11px', fontFamily: 'Special Elite' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 flex-1">
                  {gravedades.map((entry, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[entry.name] || "#b91c1c" }} />
                        <span className="text-[10px] text-zinc-400 font-elite uppercase">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 bg-zinc-900 rounded" style={{ width: 60 }}>
                          <div className="h-full rounded" style={{ width: `${(entry.value / datos.length) * 100}%`, backgroundColor: COLORS[entry.name] || "#b91c1c" }} />
                        </div>
                        <span className="text-[10px] text-zinc-200 font-black font-elite">{entry.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          </div>

          {/* FILA 2: FPS + Integridad Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FPS */}
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-zinc-900 bg-zinc-950/50 p-8">
              <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-6 border-b border-zinc-900 pb-4">Estabilidad FPS</h3>
              <div className="space-y-4 mt-4">
                {[{ key: "si", label: "Constantes (60+)" }, { key: "no", label: "Inestables / Tirones" }, { key: "caidas", label: "Caídas en Combate" }].map((item) => {
                  const count = datos.filter(d => d.fps_estables === item.key).length;
                  const pct = datos.length ? (count / datos.length) * 100 : 0;
                  return (
                    <div key={item.key} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-elite">
                        <span className="text-zinc-400 uppercase">{item.label}</span>
                        <span className="text-zinc-200 font-black">{count} <span className="text-zinc-600">({pct.toFixed(0)}%)</span></span>
                      </div>
                      <div className="h-2 bg-zinc-900 w-full">
                        <Motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full" style={{ backgroundColor: COLORS[item.key] }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Motion.div>

            {/* BAR — Integridad */}
            <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-zinc-900 bg-zinc-950/50 p-8">
              <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-6 border-b border-zinc-900 pb-4">Distribución Integridad Build</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={distribucionIntegridad} barSize={16}>
                  <XAxis dataKey="name" tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'Special Elite' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'Special Elite' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '11px', fontFamily: 'Special Elite' }} cursor={{ fill: 'rgba(185,28,28,0.05)' }} />
                  <Bar dataKey="value" fill="#b91c1c" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-[9px] text-zinc-600 font-elite uppercase tracking-widest mt-2">Promedio: <span className="text-red-700 font-black">{promedioIntegridad}</span> / 10</p>
            </Motion.div>
          </div>

          {/* TABLA — Últimas descripciones */}
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-zinc-900 bg-zinc-950/50 p-8">
            <h3 className="text-[10px] text-red-700 font-black uppercase tracking-[0.3em] font-elite mb-6 border-b border-zinc-900 pb-4">Últimos Reportes — Descripciones</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {datos.length === 0 ? (
                <p className="text-[11px] text-zinc-600 font-elite text-center py-8">Sin datos aún</p>
              ) : (
                [...datos].reverse().map((d, i) => (
                  <Motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="border border-zinc-900 p-4 hover:border-red-700/30 transition-colors">
                    <div className="flex flex-wrap gap-3 mb-2">
                      <span className="text-[8px] px-2 py-0.5 border font-elite uppercase tracking-widest" style={{ borderColor: COLORS[d.tipo_anomalia] || '#b91c1c', color: COLORS[d.tipo_anomalia] || '#b91c1c' }}>{d.tipo_anomalia}</span>
                      <span className="text-[8px] px-2 py-0.5 border font-elite uppercase tracking-widest" style={{ borderColor: COLORS[d.gravedad] || '#b91c1c', color: COLORS[d.gravedad] || '#b91c1c' }}>{d.gravedad}</span>
                      <span className="text-[8px] text-zinc-600 font-elite uppercase tracking-widest">Integridad: {d.integridad_build}/10</span>
                      {d.sujeto_id && <span className="text-[8px] text-zinc-700 font-elite uppercase tracking-widest">ID: {d.sujeto_id}</span>}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-elite leading-6">{d.descripcion || <span className="text-zinc-700 italic">Sin descripción</span>}</p>
                  </Motion.div>
                ))
              )}
            </div>
          </Motion.div>
        </main>
      )}

      <footer className="w-full py-10 flex justify-center opacity-20 font-elite">
        <span className="text-[8px] tracking-[2em] uppercase font-bold text-white">SYSTEM_OFFLINE</span>
      </footer>
    </div>
  );
};

export default DatosPage;