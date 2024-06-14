import React, { useState, useEffect } from 'react';
import MovieItem from '../../components/MovieItem';
import TitleSection from '../../components/TitleSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function GoodMovie() {
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
        <section className='section container'>
            <TitleSection title={'Phim hay'} />

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
                            <MovieItem hot={true} id={item.id} nameMovie={item.name} poster={item.thumbnail} type={item.type} viewing_time={item.viewing_time} vip={false} />
                        </SwiperSlide>
                    ))}
            </Swiper>
            
        </section>
    );
}
