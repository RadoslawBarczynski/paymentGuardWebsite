import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './database/supabaseClient'
import Auth from './database/Auth'
import Account from './database/Account'
import Home from './pages/home'
import Add from './pages/add'
import History from './pages/history'

//#63458a - purple
//#BB86FC - purple2
//#3700B3 - blue
//#CF6679 - red
//#03DAC6 - cyan
//#242424 - background
//#1a1a1a - secondary background

function App() {
  const [session, setSession] = useState(null)
  const [currentView, setCurrentView] = useState('home') // Początkowy widok to 'home'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const changeView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth changeView={changeView} />
      ) : currentView === 'home' ? (
        <Home key={session.user.id} session={session} changeView={changeView} />
      ) : currentView === 'account' ? (
        <Account session={session} changeView={changeView} />
      ) : currentView === 'history' ? (
        <History session={session} changeView={changeView}/> 
      ) : currentView === 'add' ? (
        <Add session={session} changeView={changeView}/>
      )
      : null}
    </div>
  );
}

export default App;
