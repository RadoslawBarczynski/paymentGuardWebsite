import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import Navbar from '../components/Navbar'
import '../styles//Home.css'
import MainPanel from '../components/MainPanel'

export default function History({ changeView }) {
    
  

    return (
        <div className='body'>
            <Navbar changeView={changeView} currentScene={'history'}/>
        </div>
    )
}