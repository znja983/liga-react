import { useState, useEffect } from 'react'
import './style.css'

interface Film {
  uid: string
  title: string
  director: string
  producer: string
  release_date: string
  opening_crawl: string
}

function Favorito() {
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const favoriteIds = JSON.parse(
      window.localStorage.getItem('favoriteFilmIds') || '[]',
    ) as string[]

    if (!favoriteIds.length) {
      setFilms([])
      setLoading(false)
      return
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://www.swapi.tech/api/films')
        const data = await response.json()
        const list = data.result
          .filter((item: any) => favoriteIds.includes(item.uid))
          .map((item: any) => ({
            uid: item.uid,
            title: item.properties.title,
            director: item.properties.director,
            producer: item.properties.producer,
            release_date: item.properties.release_date,
            opening_crawl: item.properties.opening_crawl,
          }))
        setFilms(list)
      } catch {
        setFilms([])
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  return (
    <div className="home-container">
      <h1>Favoritos</h1>
      {loading ? (
        <p className="status-message">Cargando favoritos...</p>
      ) : films.length === 0 ? (
        <p className="status-message">No hay películas favoritas seleccionadas.</p>
      ) : (
        <div className="film-grid">
          {films.map((film) => (
            <article key={film.uid} className="film-card">
              <h2>{film.title}</h2>
              <p>
                <strong>Director:</strong> {film.director}
              </p>
              <p>
                <strong>Productor:</strong> {film.producer}
              </p>
              <p>
                <strong>Año:</strong> {film.release_date}
              </p>
              <p className="film-summary">{film.opening_crawl}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorito
