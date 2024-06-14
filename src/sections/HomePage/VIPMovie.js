import React, { useEffect, useState } from 'react';
import TitleSection from '../../components/TitleSection';
import MovieItem from '../../components/MovieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// import { useNavigate } from 'react-router-dom';

export default function VIPMovie() {
    const [userId, setUserId] = useState(null);
    const [Data, setData] = useState(null);
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.clear();
    //     navigate('/user/login');
    // };
    useEffect(() => {
        const storedId = localStorage.getItem('id');
        setUserId(storedId);
        if (storedId) {
            fetchHistoryrData(storedId);
        } 
    }, []);


    const fetchHistoryrData = async (id) => {
        try {
          //  const response = await fetch(`http://127.0.0.1:8000/api/movie/greatMovie/${id}`);
          const response = await fetch(`http://127.0.0.1:8000/api/movie/VipMovie`);
            const Data = await response.json();
            setData(Data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <section className='section container'>
        <TitleSection hightlight='Phim Vip' title='Cho bạn' />

        <Swiper
            spaceBetween={20}
            slidesPerView={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper w-full"
        >
            {Data &&
                Data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieItem hot={false } id={item.id}  nameMovie={item.name} poster={item.thumbnail} type={item.type} viewing_time={item.viewing_time} vip={item.vip} />
                    </SwiperSlide>
                ))}
        </Swiper>
        </section>
    );
}
