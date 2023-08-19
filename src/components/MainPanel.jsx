import React, { Component } from 'react'
import '../styles//MainPanel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShield } from '@fortawesome/free-solid-svg-icons'
import BasicTile from './BasicTile';
import AdvancedTile from './AdvancedTile';
import HugeTile from './HugeTile';

class MainPanel extends Component{

    render() { 
        return (
            <div className='panel-body'>
                <div className="panel-shape">
                <button className="logout-btn" type="button" onClick={() => supabase.auth.signOut()}>
                    Wyloguj
                </button>
                <div className="panel-shape-radius"></div>
                </div>
                <h2 className='tile-container-title'>Statystyka płatności</h2>
                <div className='tiles-container'>
                    <div className='small-tiles-container'>
                        <BasicTile 
                        recordsOfMonth={this.props.recordsOfMonth}
                        color='#3700B3'
                        fontColor='#fff'
                        shadowColor='#220072'
                        />
                        <AdvancedTile 
                        recordsSum={this.props.recordsSum}
                        lastRecord={this.props.lastRecord}
                        price={this.props.price}
                        description={this.props.description}
                        color='#63458a'
                        fontColor='#fff'
                        shadowColor='#392752'
                        />
                    </div>
                    <div>
                        <HugeTile 
                        color='#158F6E'
                        fontColor='#fff'
                        shadowColor='#266353'
                        inRegularRecordsOfMonth={this.props.inRegularRecordsOfMonth}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
 
export default MainPanel;