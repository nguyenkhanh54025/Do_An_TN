import React, { useState, useEffect } from 'react';
import TitleSection from '../../components/TitleSection';
import MovieItem from '../../components/MovieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function NewMovie() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/movie/newMovie');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <section className='section container'>
            <TitleSection hightlight='Phim lẻ' title='mới nhất' />

            <Swiper
                spaceBetween={20}
                slidesPerView={5}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-full"
            >
                {data &&
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MovieItem  id={item.id} hot={false} nameMovie={item.name} poster={item.thumbnail}  type={item.type} viewing_time={item.viewing_time} vip={false}   />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
}
