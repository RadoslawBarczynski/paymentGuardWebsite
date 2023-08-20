import { useState, useEffect } from 'react'
import { supabase } from '../database/supabaseClient'
import { format } from 'date-fns'
import Navbar from '../components/Navbar'
import '../styles//history.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faLeftLong} from '@fortawesome/free-solid-svg-icons'

export default function RegularHistory() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [usersData, setUsersData] = useState([]);
  
    useEffect(() => {
        async function fetchCostData() {
            const { data: costs, error } = await supabase
                .from('costs')
                .select('price, description, timestamp, userId')
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

    const hasNextPage = data.length === perPage;

    return (
        <div className='body history-body'>
            <div className='container mt-4'>
                <table className='history-table'>
                    <thead>
                        <tr>
                            <th className='history-first-th'>Kwota</th>
                            <th>Notatka</th>
                            <th>Data</th>
                            <th className='history-last-th'>Użytkownik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                        const user = usersData.find(user => user.id === item.userId);
                            return (
                                <tr key={index}>
                                    <td>{item.price} zł</td>
                                    <td>{item.description}</td>
                                    <td>{formatDate(item.timestamp)}</td>
                                    <td>{user ? user.username : 'Unknown User'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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