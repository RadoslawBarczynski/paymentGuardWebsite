import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import Navbar from '../components/Navbar'
import '../styles//Home.css'
import MainPanel from '../components/MainPanel'

export default function Home({ setCurrentScreen, username, session  }) {
    
  const [recordsSum, setRecordsSum] = useState(0);          //dzisiaj
  const [recordsOfMonth, setRecordsOfMonth] = useState([]); //w miesiącu
  const [lastRecord, setLastRecord] = useState(null);       //ostatni wpis
  const [price, setPrice] = useState(null);                 //cena ostatniego
  const [description, setDescription] = useState(null);     //opis ostatniego
  const [isScreenVisible, setIsScreenVisible] = useState(false);

  useEffect(() => {
    fetchRecordsSum();
    fetchRecordsOfMonth();
    fetchLastRecordToday();
    setIsScreenVisible(true);
  }, []);

  const fetchRecordsSum = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ustawia godzinÄ™ na 00:00:00

      // WywoĹ‚anie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price')
        .gte('timestamp', today.toISOString()); // Pobieramy rekordy od dzisiaj

      if (error) {
        console.error('Błąd podczas pobierania rekordów:', error);
      } else {
        // Obliczamy sumÄ™ rekordĂłw
        const sum = data.reduce((acc, record) => acc + record.price, 0);
        setRecordsSum(sum.toFixed(2));
      }
    } catch (error) {
      console.error('Błąd podczas pobierania rekordów:', error.message);
    }
  };

  const fetchRecordsOfMonth = async () => {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999); // Ustawia godzinÄ™ na 23:59:59.999

      // WywoĹ‚anie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price')
        .gte('timestamp', firstDayOfMonth.toISOString())
        .lte('timestamp', lastDayOfMonth.toISOString());

      if (error) {
        console.error('Błąd podczas pobierania rekordów:', error);
      } else {
        const sum2 = data.reduce((acc, record) => acc + record.price, 0);
        setRecordsOfMonth(sum2.toFixed(2));
      }
    } catch (error) {
      console.error('Błąd podczas pobierania rekordów:', error.message);
    }
  };

  const fetchLastRecordToday = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

      // WywoĹ‚anie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price, description')
        .gte('timestamp', startOfDay.toISOString())
        .lte('timestamp', endOfDay.toISOString())
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Błąd podczas pobierania rekordów:', error);
      } else {
        if (data.length > 0) {
          setLastRecord(data[0]);
          setPrice(data[0].price); // Rozbijamy wartoĹ›Ä‡ ceny na osobnÄ… zmiennÄ…
          setDescription(data[0].description); // Rozbijamy wartoĹ›Ä‡ opisu na osobnÄ… zmiennÄ…
        } else {
          setLastRecord(null);
          setPrice(0);
          setDescription('');
        }
      }
    } catch (error) {
      console.error('Błąd podczas pobierania rekordów:', error.message);
    }
  };

    return (
        <div className='body'>
            <Navbar />
            <MainPanel 
                recordsSum={recordsSum}
                recordsOfMonth={recordsOfMonth}
                lastRecord={lastRecord}
                price={price}
                description={description}
            />
        </div>
    )
}