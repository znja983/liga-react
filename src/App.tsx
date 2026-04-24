import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import Informativa from './informativa'
import Favorito from './favorito'
import Home from './homre'
import Original from './original'
import Usuario from './usuario'
import './App.css'
import './styles.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/favorito">Favorito</Link>
          <Link to="/original">Original</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorito" element={<Favorito />} />
            <Route path="/original" element={<Original />} />
            <Route path="/informativa" element={<Informativa />} />
            <Route path="/usuario" element={<Usuario />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
