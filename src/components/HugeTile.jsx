import React, { Component } from 'react'
import '../styles//HugeTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'

class HugeTile extends Component {
    render() {
        const color = this.props.color;
        const shadowColor = this.props.shadowColor;
        const shadow = '30px -16px ' + shadowColor;

        const typeNames = {
            1: 'Środki czystości',
            2: 'Meble',
            3: 'Sprzęty elektroniczne',
            4: 'Sprzęty kuchenne',
            5: 'Sprzęty do sprzątania',
            6: 'Wyjścia',
        };

        // Grupowanie rekordów według typu
        const groupedByType = this.props.inRegularRecordsOfMonth.reduce((acc, record) => {
            if (!acc[record.type]) {
                acc[record.type] = [];
            }
            acc[record.type].push(record);
            return acc;
        }, {});

        // Obliczanie sum dla każdego typu
        const sumsByType = Object.keys(groupedByType).reduce((acc, type) => {
            const sum = groupedByType[type].reduce((total, record) => total + record.price, 0);
            acc[type] = sum.toFixed(2);
            return acc;
        }, {});

        const totalSum = Object.values(sumsByType).reduce((total, sum) => total + parseFloat(sum), 0).toFixed(2);


        return (
            <div className='huge-tile-body' style={{ backgroundColor: color, boxShadow: shadow }}>
                <div className='huge-tile-flexbox'>
                    <div className='huge-tile-div-span'>
                            <span className='huge-tile-span'>Nieregularne wydatki: </span>
                    </div>
                    <div className='huge-tile-type-sums'>
                        {Object.keys(sumsByType).map((type) => (
                            <span key={type} className='huge-tile-type-sum'>
                                - {typeNames[type]}: {sumsByType[type]} zł
                            </span>
                        ))}
                    </div>
                </div>
                <div className='huge-tile-flexbox'>
                    <div className='huge-tile-body-container'>
                        <div className='huge-tile-div-span'>
                            <span className='huge-tile-span'>W tym miesiącu </span>
                        </div>
                        <div className='huge-tile-wrapper'>
                            <div className='huge-tile-div-span-second'>
                                <span className='huge-tile-h1'>{totalSum}zł</span>
                                <span className='huge-tile-span-second'>/Miesięcznie</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HugeTile;
