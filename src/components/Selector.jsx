import React, { useState } from 'react';
import '../styles//Selector.css'

const Selector = ({isNonRegular, changeIsNonRegular}) => {
    const [isActive, setIsActive] = useState(isNonRegular);

    const toggle = () => {
        setIsActive(!isActive);
        changeIsNonRegular(!isActive)
      };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem'}}>
      <div>
        <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Nieregularny koszt</span>
      </div>
    <button className='add-toggle-regular-btn' onClick={toggle}>
      {isActive ? 'Tak' : 'Nie'}
    </button>
    </div>
  );
};

export default Selector;
