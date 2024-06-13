import React, { useState, useEffect } from 'react';
import TitleSection from '../../components/TitleSection'
// import { BsFillLayersFill } from "react-icons/bs";
import MovieItem1 from '../../components/MovieItem1';

export default function ProposeSection() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/movie/greatMovie');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <section className='section'>
            <TitleSection title={'Đề xuất phim'} />

            <div className='grid grid-cols-6 gap-[24px]'>
            {data &&
                     data.slice(0, 6).map((item, index) => (
                        <MovieItem1 hot={true} id={item.id} nameMovie={item.name} poster={item.thumbnail} />
                    ))}
            </div>
        </section>
    )
}
