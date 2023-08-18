import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './database/supabaseClient'
import Auth from './database/Auth'
import Account from './database/Account'
import Home from './pages/home'

//#9A48D0 - purple
//#63458a - purple2
//#ed9818 - yellow
//#FE724C - red
//#212121 - black
//#D7D7D7 - grey


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Home key={session.user.id} session={session} />}
    </div>
  )
}

export default App