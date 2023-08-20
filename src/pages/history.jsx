import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import { format } from 'date-fns'
import Navbar from '../components/Navbar'
import '../styles//history.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faLeftLong} from '@fortawesome/free-solid-svg-icons'
import RegularHistory from './regularHistory'
import InRegularHistory from './inRegularHistory'

export default function History({ changeView }) {
    const [currentView, setCurrentView] = useState(1);

    const toggleView = () => {
        setCurrentView(currentView === 1 ? 2 : 1);
    };

    return (
        <div className='body history-body'>
            <Navbar changeView={changeView} currentScene={'history'} />
            <button className='toggle-history-view-button' onClick={toggleView}>
                {currentView === 1 ? (
                    <span>Przełącz do nieregularnych <FontAwesomeIcon icon={faRightLong} /></span>
                ) : (
                    <span><FontAwesomeIcon icon={faLeftLong} /> Przełącz do regularnych</span>
                )}
            </button>
            {currentView === 1 ? <RegularHistory /> : <InRegularHistory />}
        </div>
    )
}