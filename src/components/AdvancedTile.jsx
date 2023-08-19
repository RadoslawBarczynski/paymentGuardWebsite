import React, { Component } from 'react'
import '../styles//AdvancedTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class AdvancedTile extends Component{
    render() { 
        return (
            <div className='tile-advanced-body'>
                <div className='tile-body-container'>
                <div className='advanced-tile-div-span'>
                <span className='advanced-tile-span'>W dniu dzisiejszym</span>
                </div>
                <div className='advanced-tile-container-second'>
                    <div className='advanced-tile-content'>
                        <span className='advanced-tile-top'>Ostatni zakup</span>
                        <span className='advanced-tile-bottom-left'>Notatka</span>
                    </div>
                    <div className='advanced-tile-content'>
                        <span className='advanced-tile-top'>{this.props.price}zł</span>
                        <span className='advanced-tile-bottom-right'>{this.props.description}</span>
                    </div>
                </div>
                <div className='advanced-tile-wrapper'>
                <div className='advanced-tile-div-span-second'>
                <span className='advanced-tile-h1'>{this.props.recordsSum}zł</span>
                <span className='advanced-tile-span-second'>/Dzisiaj</span>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default AdvancedTile;