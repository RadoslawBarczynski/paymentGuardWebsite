import React, { Component } from 'react'
import '../styles//HistoryTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class HistoryTile extends Component{
    render() { 
        const color = this.props.color;
        
        const typeGroups = this.props.records.reduce((groups, record) => {
            if (!groups[record.type]) {
                groups[record.type] = [];
            }
            groups[record.type].push(record);
            return groups;
        }, {});

        const data = [
            {key:'1', value:'Środki czystości'},
            {key:'2', value:'Meble'},
            {key:'3', value:'Sprzęty elektroniczne'},
            {key:'4', value:'Sprzęty kuchenne'},
            {key:'5', value:'Sprzęty do sprzątania'},
            {key:'6', value:'Wyjścia'},
        ] 

        return (
            <div className='history-tile-body' style={{backgroundColor: color}}>
                <div className='history-tile-body-container'>
                    <div className='history-tile-div-span'>
                    {data.map(item => {
                                const recordsOfType = typeGroups[item.key] || [];
                                const totalForType = recordsOfType.reduce((total, record) => total + record.price, 0);
                                
                                return (
                                    <span key={item.key} className='history-tile-span-type'>
                                        {item.value}: {totalForType}zł
                                    </span>
                                );
                            })}
                    </div>
                    <div className='history-tile-wrapper'>
                        <div className='history-tile-div-span-second'>
                        <span className='history-tile-span-second'>{this.props.month}</span>
                            <span className='history-tile-h1'>{this.props.price}zł</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default HistoryTile;