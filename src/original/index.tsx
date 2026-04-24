import { useEffect, useMemo, useState } from 'react'
import './style.css'

interface Film {
  uid: string
  title: string
  opening_crawl: string
  release_date: string
}

function Original() {
  const [films, setFilms] = useState<Film[]>([])
  const [questionFilm, setQuestionFilm] = useState<Film | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://www.swapi.tech/api/films')
        const data = await response.json()
        const list = data.result.map((item: any) => ({
          uid: item.uid,
          title: item.properties.title,
          opening_crawl: item.properties.opening_crawl,
          release_date: item.properties.release_date,
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

  const createQuestion = () => {
    if (!films.length) {
      setQuestionFilm(null)
      setOptions([])
      setSelected(null)
      setFeedback('')
      return
    }

    const index = Math.floor(Math.random() * films.length)
    const answerFilm = films[index]
    const pool = films.filter((film) => film.uid !== answerFilm.uid)
    const randomOptions = [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((film) => film.title)
    const nextOptions = [...randomOptions, answerFilm.title].sort(() => Math.random() - 0.5)

    setQuestionFilm(answerFilm)
    setOptions(nextOptions)
    setSelected(null)
    setFeedback('')
  }

  useEffect(() => {
    if (films.length) {
      createQuestion()
    }
  }, [films])

  const handleSelect = (option: string) => {
    if (!questionFilm) return
    setSelected(option)
    setFeedback(option === questionFilm.title ? 'Correcto' : 'Incorrecto')
  }

  const questionText = useMemo(() => {
    if (!questionFilm) return ''
    const text = questionFilm.opening_crawl
      .replace(/\s+/g, ' ')
      .trim()
    return text.length > 290 ? `${text.slice(0, 290)}...` : text
  }, [questionFilm])

  return (
    <div className="original-container">
      <h1>Desafío Original</h1>
      {loading ? (
        <p className="status-message">Cargando desafío...</p>
      ) : !questionFilm ? (
        <p className="status-message">No hay datos disponibles.</p>
      ) : (
        <div className="challenge-card">
          <p className="challenge-text">{questionText}</p>
          <div className="options-grid">
            {options.map((option) => (
              <button
                key={option}
                className={`option-button ${selected === option ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <p className={`feedback ${feedback === 'Correcto' ? 'correct' : 'wrong'}`}>
              {feedback}
            </p>
          )}
          <button className="next-button" onClick={createQuestion}>
            Siguiente desafío
          </button>
          <p className="hint">Adivina la película por su texto de apertura.</p>
        </div>
      )}
    </div>
  )
}

export default Original
