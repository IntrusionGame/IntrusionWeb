import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./componentes/menu.jsx";
import Footer from "./componentes/footer.jsx";
import SobreNosotros from "./Pages/SobreNostros.jsx";
import Expedientes from "./Pages/puzles.jsx";
import Contacto from "./Pages/Contacto.jsx";
import Blog from "./Pages/Blog.jsx";
import Blog26 from "./Pages/CotenidoBlog.jsx";
import Juego from "./Pages/Juego.jsx";

function App() {
  return (
    <Router>
      <div className="App bg-black h-screen w-screen overflow-hidden relative">
        {/* LAS RUTAS: Aquí cambia el contenido central */}
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/sobreNosotros" element={<SobreNosotros />} />
          <Route path="/expedientes" element={<Expedientes />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
<Route path="/blog/:id" element={<Blog26 />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
