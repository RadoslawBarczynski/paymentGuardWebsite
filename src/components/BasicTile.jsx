import React, { Component } from 'react'
import '../styles//BasicTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class BasicTile extends Component{
    render() { 
        const color = this.props.color;
        const shadowColor = this.props.shadowColor;
        const shadow = '30px -16px ' + shadowColor
        return (
            <div className='tile-body' style={{backgroundColor: color, boxShadow: shadow}}>
                <div className='tile-body-container'>
                <div className='basic-tile-div-span'>
                <span className='basic-tile-span'>W tym miesiącu</span>
                </div>
                <div className='basic-tile-wrapper'>
                <div className='basic-tile-div-span-second'>
                <span className='basic-tile-h1'>{this.props.recordsOfMonth}zł</span>
                <span className='basic-tile-span-second'>/Miesięcznie</span>
                </div>
                </div>
                </div>
            </div>
        );
    }
}
 
export default BasicTile;