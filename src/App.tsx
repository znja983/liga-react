import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';

import Equipo from './equipo'
import Informativa from './informativa'
import Favorito from './favorito'
import Home from './homre'
import Original from './original'
import Usuario from './usuario'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/favorito">Favorito</Link>
          <Link to="/original">Original</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/favorito" element={<Favorito />} />
          <Route path="/original" element={<Original />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
