import React, { Component } from 'react'
import '../styles//Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component{
    render() { 
        return (
            <div className='navbar'>
            <div className='logoWrapper'>
                <FontAwesomeIcon size="2x" className='iconTitle' icon={faShield} />
                <h2 className='firstTitle'>Payment</h2>
                <h2 className='secondTitle'>Guard</h2>
            </div>
            <div class="navbar-elements" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Wszystkie wpisy</a>
                  </li>
                  <li class="nav-item-add">
                    <a class="nav-link" href="#">Dodaj wpis</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" href="#">Konto</a>
                  </li>
                </ul>
            </div>
            </div>
        );
    }
}
 
export default Navbar;