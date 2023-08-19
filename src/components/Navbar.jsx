import React, { Component } from 'react';
import '../styles//Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {
    render() {
        const { changeView, currentScene } = this.props;

        return (
            <div className='navbar'>
                <div className='logoWrapper'>
                    <FontAwesomeIcon size="2x" className='iconTitle' icon={faShield} />
                    <h2 className='firstTitle'>Payment</h2>
                    <h2 className='secondTitle'>Guard</h2>
                </div>
                <div className="navbar-elements" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${currentScene === 'home' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => changeView('home')}>Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className={`nav-item ${currentScene === 'history' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => changeView('history')}>Wszystkie wpisy</a>
                        </li>
                        <li className={`nav-item ${currentScene === 'add' ? 'active' : ''}`}>
                            <a className="nav-link" href="#" onClick={() => changeView('add')}>Dodaj wpis</a>
                        </li>
                        <li className={`nav-item ${currentScene === 'account' ? 'active' : ''}`}>
                            <a className="nav-link disabled" href="#" onClick={() => changeView('account')}>Konto</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Navbar;
