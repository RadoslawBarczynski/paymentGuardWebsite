import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import Navbar from '../components/Navbar'
import '../styles//Home.css'

export default function Home({ session }) {
    return (
        <div className='body'>
            <Navbar />
            <h1>HomePage</h1>
            <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
        </div>
    )
}