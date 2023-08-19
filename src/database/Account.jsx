import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Navbar from '../components/Navbar'
import DefaultInput from '../components/DefaultInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Account({ session, changeView }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      const { user } = session

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatarUrl,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <div className='add-body'>
    <Navbar changeView={changeView} currentScene={'account'}/>
      <div className='add-title-container'>
                <span className='add-title'>Moje konto</span>
      </div>
      <form onSubmit={updateProfile} className="form-widget">
        <div>
            <label htmlFor="email"><FontAwesomeIcon  icon={faEnvelope} /> Email</label>
              <div className='container'>
                <input id="email" className="inputField" type="text" value={session.user.email} disabled />
              </div>
        </div>
        <div>
          <label htmlFor="username"><FontAwesomeIcon  icon={faUser} /> Imię</label>
            <DefaultInput
              id="username"
              type="text"
              required
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
        </div>
      <div>
        <label htmlFor="website"><FontAwesomeIcon  icon={faGlobe} /> Strona</label>
          <DefaultInput
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            />
      </div>

      <div>
        <button className="add-login-btn" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Zapisz'}
        </button>
      </div>

      <div>
        <button className="logout-btn" type="button" onClick={() => supabase.auth.signOut()}>
          Wyloguj
        </button>
      </div>
    </form>
          </div>
  )
}