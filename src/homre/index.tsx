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

function Home() {
  const [films, setFilms] = useState<Film[]>([])
  const [query, setQuery] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = window.localStorage.getItem('favoriteFilmIds')
    if (stored) {
      try {
        setFavoriteIds(JSON.parse(stored))
      } catch {
        setFavoriteIds([])
      }
    }
  }, [])

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://www.swapi.tech/api/films')
        const data = await response.json()
        const list = data.result.map((item: any) => ({
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

    fetchFilms()
  }, [])

  const filteredFilms = films.filter((film) => {
    const value = query.toLowerCase().trim()
    return (
      film.title.toLowerCase().includes(value) ||
      film.director.toLowerCase().includes(value) ||
      film.producer.toLowerCase().includes(value)
    )
  })

  const toggleFavorite = (uid: string) => {
    const nextIds = favoriteIds.includes(uid)
      ? favoriteIds.filter((id) => id !== uid)
      : [...favoriteIds, uid]
    setFavoriteIds(nextIds)
    window.localStorage.setItem('favoriteFilmIds', JSON.stringify(nextIds))
  }

  return (
    <div className="home-container">
      <h1>Películas</h1>
      <div className="home-actions">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título, director o productor"
          className="search-input"
        />
      </div>
      {loading ? (
        <p className="status-message">Cargando películas...</p>
      ) : (
        <div className="film-grid">
          {filteredFilms.length === 0 ? (
            <p className="status-message">No se encontraron películas.</p>
          ) : (
            filteredFilms.map((film) => (
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
                <button
                  className="favorite-button"
                  onClick={() => toggleFavorite(film.uid)}
                >
                  {favoriteIds.includes(film.uid)
                    ? 'Quitar de favoritos'
                    : 'Agregar a favoritos'}
                </button>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Home
