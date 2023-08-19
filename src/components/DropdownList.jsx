import React, { useState } from 'react';
import '../styles//DropdownList.css';

function DropdownList({ options, onChange }) {
    const [selectedKey, setSelectedKey] = useState('');

    const handleSelectChange = (event) => {
        const selectedOption = options.find(option => option.value === event.target.value);
        setSelectedKey(selectedOption.value);
        onChange(selectedOption.key);
    };

    return (
        <label className='custom-select'>
            <select className='dropdown-select' value={selectedKey} onChange={handleSelectChange}>
                <option value="">Wybierz kategorię</option>
                {options.map((option) => (
                    <option 
                    key={option.key} 
                    value={option.value}
                    className={selectedKey === option.value ? 'dropdown-selected' : ''}
                    >
                        {option.value}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default DropdownList;
