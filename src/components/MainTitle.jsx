import React, { Component } from 'react'
import '../styles//MainTitle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class  MainTitle extends Component{
    render() { 
        return (
            <div className='wrapper'>
                <FontAwesomeIcon size="3x" className='iconTitle' icon={faShield} />
                <h1 className='firstTitle'>Payment</h1>
                <h1 className='secondTitle'>Guard</h1>
            </div>
        );
    }
}
 
export default MainTitle;