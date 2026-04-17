import { useState, useEffect } from 'react'

interface Ranking {
  rank: number
  contestantName: string
  points: number
  matchesPlayed: number
}

interface Estadistica {
  position: number
  name: string
  value: number
  appearances: number
  contestantName: string
  statName: string
}

type FiltroTipo = 'posiciones' | 'goleador' | 'asistencias' | 'amarillas' | 'atajadas'

const equiposMap: Record<string, string> = {
  "América de Cali SA": "america-de-cali",
  "CA Bucaramanga": "atletico-bucaramanga",
  "Club Atlético Nacional SA": "atletico-nacional",
  "Club Deportes Tolima SA": "deportes-tolima",
  "Asociación Deportivo Cali": "deportivo-cali",
  "Deportivo Independiente Medellín": "independiente-medellin",
  "Club Independiente Santa Fe": "independiente-santa-fe",
  "CD Popular Junior FC SA": "junior",
  "Millonarios FC": "millonarios",
  "Once Caldas SA": "once-caldas",

  "Internacional de Bogotá": "internacional-bogota",
  "Club Llaneros SA": "llaneros",
  "Águilas Doradas": "aguilas-doradas",
  "Fortaleza FC": "fortaleza",
  "Alianza FC": "alianza",
  "Jaguares de Córdoba FC": "jaguares",
  "Cúcuta Deportivo FC": "cucuta",
  "Boyacá Chicó FC": "boyaca-chico",
  "Deportivo Pereira FC": "pereira"
};

function Home() {
  const [ranking, setRanking] = useState<Ranking[]>([])
  const [title, setTitle] = useState('')

  const [filtro, setFiltro] = useState<FiltroTipo>('posiciones')

  useEffect(() => {
    setBusqueda('') 
    const fetchData = async () => {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/sdtibata/dataliga/refs/heads/main/${filtro}.json`)
        const data = await res.json()

        if (filtro === 'posiciones') {
          setRanking(data.standings[0].ranking)
          setTitle(data.standings[0].competitionName)
        } else {
          setEstadisticas(data)
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    fetchData()
  }, [filtro])

  return (
    <div className="tabla-container">
      <h2>{title}</h2>
      <table className="tabla-posiciones">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((equipo) => (
            <tr key={equipo.rank}>
              <td>{equipo.rank}</td>
              <td>{equipo.contestantName}</td>
              <td>{equipo.matchesPlayed}</td>
              <td>{equipo.points}</td>
            </tr>
          ))}

          {estadisticas.map((equipo) => (
            <tr key={equipo.position}>
              <td>{equipo.position}</td>
              <td>{equipo.name}</td>
              <td>{equipo.appearances}</td>
              <td>{equipo.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home