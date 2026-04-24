import { useState, useEffect } from 'react'
import './style.css'

interface UserProfile {
  name: string
  joinDate: string
}

function Usuario() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Mi Perfil',
    joinDate: new Date().toLocaleDateString('es-ES')
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(profile.name)

  useEffect(() => {
    const stored = window.localStorage.getItem('userProfile')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setProfile(data)
        setTempName(data.name)
      } catch {
        window.localStorage.setItem('userProfile', JSON.stringify(profile))
      }
    } else {
      window.localStorage.setItem('userProfile', JSON.stringify(profile))
    }
  }, [])

  const handleSaveName = () => {
    const updatedProfile = { ...profile, name: tempName }
    setProfile(updatedProfile)
    window.localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempName(profile.name)
    setIsEditing(false)
  }

  return (
    <div className="user-container">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <div className="profile-avatar">U</div>
        <div className="profile-info">
          <p className="profile-label">Nombre:</p>
          {isEditing ? (
            <div className="edit-container">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="edit-input"
                placeholder="Ingresa tu nombre"
              />
              <button className="btn-save" onClick={handleSaveName}>
                Guardar
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="name-display">
              <p className="profile-name">{profile.name}</p>
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Editar
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <p className="stat-item">
          <strong>Se unió:</strong> {profile.joinDate}
        </p>
        <p className="stat-item">
          <strong>Favoritos guardados:</strong> <span id="fav-count">0</span>
        </p>
      </div>
    </div>
  )
}

function initFavCount() {
  try {
    const favs = JSON.parse(window.localStorage.getItem('favoriteFilmIds') || '[]') as string[]
    const el = document.getElementById('fav-count')
    if (el) el.textContent = String(favs.length)
  } catch {
    const el = document.getElementById('fav-count')
    if (el) el.textContent = '0'
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', initFavCount)
  setTimeout(initFavCount, 100)
}

export default Usuario
