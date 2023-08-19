import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import Navbar from '../components/Navbar'
import '../styles//add.css'
import MainPanel from '../components/MainPanel'
import DefaultInput from '../components/DefaultInput'
import Selector from '../components/Selector'
import DropdownList from '../components/DropdownList'

export default function Add({ changeView, session }) {
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [isNonRegular, setIsNonRegular] = useState(false)
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [selected, setSelected] = useState(1);

    const data = [
        {key:'1', value:'Środki czystości'},
        {key:'2', value:'Meble'},
        {key:'3', value:'Sprzęty elektroniczne'},
        {key:'4', value:'Sprzęty kuchenne'},
        {key:'5', value:'Sprzęty do sprzątania'},
        {key:'6', value:'Wyjścia'},
    ] 
    
    const handleOptionChange = (selectedKey) => {
        setSelected(selectedKey);
      };

      const changeIsNonRegular = (active) => {
        setIsNonRegular(active);
      }

    const addCost = async (price, description) =>{

        setLoading(true)
        const { user } = session
    
    
        try {
          let table
          let updates
    
          if(isNonRegular)
          {
              table = 'inregularcosts'
              updates = {
                userId: user.id,
                price: price,
                description: description,
                timestamp: new Date(),
                type: selected
              }
          }
          else
          {
              table = 'costs'
              updates = {
                userId: user.id,
                price: price,
                description: description,
                timestamp: new Date(),
              }
          }
    
    
        let {data, error } = await supabase.from(table).insert(updates)
    
        if (error) {
            console.error('Błąd podczas dodawania rekordu:', error);
          } else {
            console.log('typ: ' + isNonRegular)
            console.log('Rekord został dodany:', updates);
            setPrice('');
            setDescription('');
          }
        } catch (error) {
          console.error('Błąd podczas dodawania rekordu:', error.message);
        }
      };
    

    return (
        <div className='add-body'>
            <Navbar changeView={changeView} currentScene={'add'}/>
            <div className='add-title-container'>
                <span className='add-title'>Dodaj wydatek!</span>
            </div>
            <div className='inputsWrapper'>

                <DefaultInput 
                type="text"
                placeholder="Kwota"
                value={price}
                required={true}
                onChange={(e) => setPrice(e.target.value)}
                />
                <DefaultInput
                  type="text"
                  placeholder="Opis"
                  value={description}
                  required={true}
                  onChange={(e) => setDescription(e.target.value)}
                    />
            </div>
            <div>
                <Selector isNonRegular={isNonRegular} changeIsNonRegular={changeIsNonRegular} />
            </div>
            {isNonRegular && (
            <div>
                <DropdownList options={data} onChange={handleOptionChange} selected={selected} />
            </div>
            )}
            <div>
                <button className={'add-login-btn'} disabled={loading} onClick={() =>  addCost(price, description)}>
                    {loading ? <span>Loading</span> : <span>Dodaj</span>}
                </button>
            </div>
        </div>
    )
}