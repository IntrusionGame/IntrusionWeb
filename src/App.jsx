import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './componentes/menu.jsx';
import Footer from './componentes/footer.jsx';
import SobreNosotros from './Pages/SobreNostros.jsx';
import Expedientes from './Pages/puzles.jsx';

// Importa aquí tus futuras páginas
// import Juego from './paginas/Juego.jsx';

function App() {
  return (
    <Router>
      <div className="App bg-black h-screen w-screen overflow-hidden relative">
        
        {/* LAS RUTAS: Aquí cambia el contenido central */}
        <Routes>
          <Route path="/" element={<Menu />} />
          
          {/* Aquí irás añadiendo las demás páginas del juego */}
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path="/expedientes" element={<Expedientes />} />
        </Routes>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;