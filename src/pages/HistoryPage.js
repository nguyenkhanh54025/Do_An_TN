import React, { useEffect, useState } from 'react';
import TitleSection from '../components/TitleSection'
import MovieHistory from '../components/MovieHistory'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function HistoryPage() {
    const [userId, setUserId] = useState(null);
    const [Data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        setUserId(storedId);
        if (storedId) {
            fetchHistoryrData(storedId);
        } 
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        navigate('/user/login');
    };
    const fetchHistoryrData = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movie/historyview/${id}`);
            const Data = await response.json();
            setData(Data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <main className='section container'>
            <section className='section'>
                <TitleSection title='Lịch sử phim đã xem' />

              
                {userId ? (
                    <div className='grid grid-cols-6 gap-y-5 gap-x-[24px]'>
                         {Data ? (
                            Data.map((movie, index) => (
                                <MovieHistory key={index} id={movie.id} nameMovie={movie.name} poster={movie.thumbnail}  day={movie.created_at} />
                            ))
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                     ): (
                        <div className=' col-span-4 text-center'><Link onClick={handleLogout}>Vui lòng đăng nhập để xem tiếp</Link></div>
                )}
                

                <Pagination />
            </section>
        </main>
    )
}
