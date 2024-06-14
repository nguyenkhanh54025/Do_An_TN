import React, { useState, useEffect } from 'react';
import TitleSection from '../../components/TitleSection';
import { BsChevronDown, BsFillStarFill, BsPlayCircle,BsStar  } from 'react-icons/bs';

export default function TopMovie() {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('Action');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/movie/TopMovie');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <section className='container flex gap-[50px]'>
            <div className='flex flex-col gap-5 w-2/5 flex-grow h-2/5'>
                <TitleSection arrow={true} title='Top 5 bộ phim ' />
                {data && (
                    <img src={data[activeTab][0].thumbnail} alt='' className='rounded-[10px] h-full object-cover' />
                )}
            </div>

            <div className='w-3/5 flex flex-col gap-5'>
                <div className='flex justify-between text-gray'>
                    <button className={activeTab === 'Action' ? 'text-white font-bold' : ''} onClick={() => handleTabClick('Action')}>Hành động</button>
                    <button className={activeTab === 'Adventure' ? 'text-white font-bold' : ''} onClick={() => handleTabClick('Adventure')}>Phiêu Lưu</button>
                    <button className={activeTab === 'Drama' ? 'text-white font-bold' : ''} onClick={() => handleTabClick('Drama')}>Drama</button>
                    <button className={activeTab === 'Fantasy' ? 'text-white font-bold' : ''} onClick={() => handleTabClick('Fantasy')}>Fantasy</button>
                    <button className={activeTab === 'Shounen' ? 'text-white font-bold' : ''} onClick={() => handleTabClick('Shounen')}>Shounen</button>
                    <button className='flex items-center'>Xem thêm <BsChevronDown className='text-lg' /></button>
                </div>

                <div className='flex flex-col gap-5'>
                    {activeTab !== 'all' && data && (
                        data[activeTab].map((actionItem, index) => (
                            <RatingMovieItem  key={actionItem.id}
                                rank={index + 1}
                                hide={index + 1 === 1}
                                view_count={actionItem.view_count}
                                nameMovie={actionItem.name}
                                video_duration={actionItem.video_duration}
                                nation={actionItem.nation}
                                viewing_time={actionItem.viewing_time}
                                rating={actionItem.rating}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

const RatingMovieItem = ({rank, hide, view_count, nameMovie, video_duration, nation, viewing_time, rating}) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<BsFillStarFill key={i} />);
    }
    for (let i = 0; i < 5-rating; i++) {
        stars.push(<BsStar key={i} />);
    }
    return (
        <div className='flex items-center w-full p-[30px] bg-darkBlue rounded-[10px]'>
            <div className='flex gap-10 flex-grow items-center'>
                <p className='text-3xl font-semibold'>#{rank}</p>
                <div className='flex flex-col gap-10'>
                    <div>
                        <h6 className='text-xl font-bold'>{nameMovie}</h6>
                        {hide && (
                            <div className='flex text-sm text-gray gap-2.5'>
                                <p>{video_duration}</p>
                                <span>|</span>
                                <p>{nation}</p>
                                <span>|</span>
                                <p>{viewing_time}</p>
                            </div>
                        )}
                    </div>
                    {hide && (
                        <div className='flex gap-[30px]'>
                            <div className='text-yellow flex gap-2.5'>
                               {stars}
                            </div>
                            <span>{view_count}  Lượt Xem </span>
                        </div>
                    )}
                </div>
            </div>
            {hide && <button className='text-[50px]'><BsPlayCircle /></button>}
        </div>
    );
};