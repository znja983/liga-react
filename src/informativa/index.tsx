import './style.css'

function Informativa() {
  return (
    <div className="info-container">
      <h1>Información</h1>
      <section className="info-card">
        <h2>Acerca de la Aplicación</h2>
        <p>Esta aplicación te permite explorar películas de Star Wars utilizando la API SWAPI. Descubre detalles sobre cada película, guarda tus favoritas y participa en desafíos interactivos.</p>
      </section>
      <section className="info-card">
        <h2>Características</h2>
        <ul className="features-list">
          <li><strong>Home:</strong> Explora todas las películas con búsqueda avanzada</li>
          <li><strong>Favoritos:</strong> Guarda y accede a tus películas favoritas</li>
          <li><strong>Original:</strong> Desafío interactivo de adivinanza de películas</li>
          <li><strong>Información:</strong> Detalles sobre la aplicación</li>
          <li><strong>Usuario:</strong> Personaliza tu perfil</li>
        </ul>
      </section>
      <section className="info-card">
        <h2>Fuente de Datos</h2>
        <p>Los datos provienen de <strong>SWAPI</strong> (Star Wars API), una base de datos de acceso libre con información completa sobre el universo de Star Wars.</p>
      </section>
    </div>
  )
}

export default Informativa
