import React, { Component } from 'react'
import '../styles//AdvancedTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class AdvancedTile extends Component{
    render() { 
        const color = this.props.color;
        const fontColor = this.props.fontColor;
        const shadowColor = this.props.shadowColor;
        const shadow = '30px -16px ' + shadowColor
        return (
            <div className='tile-advanced-body' style={{backgroundColor: color,  boxShadow: shadow}}>
                <div className='tile-body-container'>
                <div className='advanced-tile-div-span'>
                <span className='advanced-tile-span' style={{color: fontColor}}>W dniu dzisiejszym</span>
                </div>
                <div className='advanced-tile-container-second'>
                    <div className='advanced-tile-content'>
                        <span className='advanced-tile-top' style={{color: fontColor}}>Ostatni zakup</span>
                        <span className='advanced-tile-bottom-left' style={{color: fontColor}}>Notatka</span>
                    </div>
                    <div className='advanced-tile-content'>
                        <span className='advanced-tile-top' style={{color: fontColor}}>{this.props.price}zł</span>
                        <span className='advanced-tile-bottom-right' style={{color: fontColor}}>{this.props.description}</span>
                    </div>
                </div>
                <div className='advanced-tile-wrapper'>
                <div className='advanced-tile-div-span-second'>
                <span className='advanced-tile-h1' style={{color: fontColor}}>{this.props.recordsSum}zł</span>
                <span className='advanced-tile-span-second' style={{color: fontColor}}>/Dzisiaj</span>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default AdvancedTile;