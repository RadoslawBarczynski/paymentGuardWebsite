import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import { format, getMonth, getYear } from 'date-fns';
import  pl  from 'date-fns/locale/pl';
import '../styles//history.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faLeftLong} from '@fortawesome/free-solid-svg-icons'
import HistoryTile from '../components/HistoryTile'

export default function InRegularHistory() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [usersData, setUsersData] = useState([]);
    
    const colorArray = ['#63458a', '#3700B3',
     '#CF6679', '#328da9', '#1d8b63',
      '#1a7f08', '#71104f', '#63458a',
       '#3700B3', '#CF6679', '#328da9', '#1d8b63'];
  
    useEffect(() => {
        async function fetchCostData() {
            const { data: costs, error } = await supabase
                .from('inregularcosts')
                .select('price, description, timestamp, userId, type')
                .range((page - 1) * perPage, page * perPage - 1); // Pobieramy dane z zakresu dla danej strony

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(costs);
            }
        }

        fetchCostData();
    }, [page, perPage]);

    useEffect(() => {
        async function fetchUserData() {
            const { data: users, error } = await supabase
                .from('profiles')
                .select('id, username') 
                .in('id', data.map(item => item.userId)); 
    
            if (error) {
                console.error('Error fetching user data:', error);
            } else {
                setUsersData(users);
            }
        }
    
        fetchUserData();
    }, [data]); 
    

    const formatDate = (timestamp) => {
        return format(new Date(timestamp), 'dd.MM.yyyy HH:mm:ss', { timeZone: 'Europe/Warsaw' });
    };

    const groupedData = data.reduce((acc, item) => {
        const month = getMonth(new Date(item.timestamp));
        const year = getYear(new Date(item.timestamp));
        const key = `${year}-${month}`;
        
        if (!acc[key]) {
          acc[key] = [];
        }
        
        acc[key].push(item);
        return acc;
      }, {});
      
      // Calculate total price for each month
      const monthlyData = Object.keys(groupedData).map(key => {
        const items = groupedData[key];
        const total = items.reduce((sum, item) => sum + item.price, 0); 
        
        return {
          month: key,
          total,
          records: items
        };
      });

    const hasNextPage = data.length === perPage;

    return (
        <div className='body history-inregular-body'>
            <div className='history-tile-container mt-4'>
                {monthlyData.slice((page - 1) * 6, page * 6).map((monthData, index) => (
                    <HistoryTile
                        key={index}
                        color={colorArray[new Date(monthData.month).getMonth()]}
                        month={format(new Date(monthData.month), 'MMMM yyyy', { timeZone: 'Europe/Warsaw', locale: pl }).replace(/^\w/, (c) => c.toUpperCase())}
                        price={monthData.total}
                        records={monthData.records}
                    />
                ))}
            </div>
            <div className='pagination'>
                <button
                    className='btn btn-secondary history-pagination-btn'
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    disabled={page === 1} // Wyłączamy przycisk, jeżeli jesteśmy na pierwszej stronie
                >
                    <FontAwesomeIcon size="lg"  icon={faLeftLong} />
                </button>
                <span className='page-number'>{page}</span>
                <button
                    className='btn btn-secondary history-pagination-btn'
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNextPage} // Wyłączamy przycisk, jeżeli nie ma kolejnej strony
                >
                    <FontAwesomeIcon size="lg"  icon={faRightLong} />
                </button>
            </div>
        </div>
    )
}