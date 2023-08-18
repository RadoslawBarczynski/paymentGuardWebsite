import { useState } from 'react'
import { supabase } from './supabaseClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'
import MainTitle from '../components/MainTitle'
import DefaultInput from '../components/DefaultInput'
import '../styles//Auth.css'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()


    setLoading(true)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
    
        if (error) Alert.alert(error.message)
        setLoading(false)
      }

      await signInWithEmail(); 
    
      async function signUpWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })
    
        if (error) Alert.alert(error.message)
        setLoading(false)
      }
    
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <MainTitle />
        <p className="description">Zaloguj się za pomocą swojego maila oraz hasła</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div className='inputsWrapper'>

          <DefaultInput 
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          />
          <DefaultInput
            type="password"
            placeholder="Your password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            />
            </div>
          <div>
            <button className={'loginBtn'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Zaloguj</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}