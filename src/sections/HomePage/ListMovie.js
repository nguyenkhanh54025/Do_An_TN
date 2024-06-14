import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListMovie() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/admin/getAllSchedule');
                setMovies(response.data);
            } catch (error) {
                setError('Error fetching movie data');
            }
            setLoading(false);
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className='container bg-white p-5 rounded-[5px] flex gap-5'>
            <div className='w-[160px] flex justify-center items-center text-center bg-oran p-5 rounded-[5px] flex-shrink-0'>
                <h4 className='font-bold'>Lịch ra phim</h4>
            </div>

            <div className='flex flex-wrap gap-5 h-fit'>
                {movies.map((movie) => (
                    <Movie  key={movie.id} time={movie.time} title={movie.name_movie} />
                ))}
            </div>
        </section>
    );
}

const Movie = ({ time, title }) => {
    return (
        <div className='text-black flex gap-2.5'>
            <span className='font-bold'>[{time}]</span>
            {title}
        </div>
    );
}
