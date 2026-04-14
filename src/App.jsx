import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Menu from "./componentes/menu.jsx";
import Footer from "./componentes/footer.jsx";
import SobreNosotros from "./Pages/SobreNostros.jsx";
import Expedientes from "./Pages/puzles.jsx";
import Contacto from "./Pages/Contacto.jsx";
import Blog from "./Pages/Blog.jsx";
import Blog26 from "./Pages/CotenidoBlog.jsx";
import Juego from "./Pages/Juego.jsx";
import Test from "./Pages/test.jsx";

function AppContent() {
  const location = useLocation();
  // No renderizar Footer si la ruta es /test
  const showFooter = location.pathname !== "/test";

  return (
    <div className="App bg-black h-screen w-screen overflow-hidden relative">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/test" element={<Test />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/expedientes" element={<Expedientes />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog26 />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;