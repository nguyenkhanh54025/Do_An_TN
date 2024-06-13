import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoviePopUp from '../components/MoviePopup';

export default function MovieGridItem({ vip, id, poster, nameMovie, year, video_duration, nation, viewing_time }) {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    // Xử lý sự kiện khi nhấp vào nơi khác ngoài popup để đóng nó
    const handleOutsideClick = (event) => {
        if (popupRef.current && popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    // Lắng nghe sự kiện click trên toàn bộ trang
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div className='rounded-[10px] bg-black p-2.5 flex flex-col gap-2.5'>
                <div className='relative' style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img src={`http://127.0.0.1:8000/storage/img/${poster}`} alt='' className='rounded-[10px]' style={{ width: '100%', height: '100%' }} />
                    <div className='absolute top-0 right-0 inset-x-0 flex gap-2.5 justify-center text-sm'>
                        <div className='bg-oran rounded-b-[10px] px-2.5 py-[5px]'>Kịch tính</div>
                        {vip && <div className='bg-linear rounded-b-[10px] px-2.5 py-[5px] font-bold'>VIP</div>}
                    </div>
                </div>
                <div className='text-center'>
                    <h5 className='line-clamp-1 text-lg font-bold'>{nameMovie}</h5>
                    <div className='flex gap-2.5 justify-center text-gray'>
                        <p>{year}</p>
                        <p>{nation}</p>
                        <p>{viewing_time}</p>
                    </div>
                    <Link to={'/view/' + id}>
                        <button
                            className='mt-2.5 bg-blue-500 text-white px-4 py-2 rounded-[10px]'
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPopup(true);
                            }}
                        >
                            Chi tiết
                        </button>
                    </Link>
                </div>
            </div>
            {showPopup && (
                <div ref={popupRef}>
                    <MoviePopUp movieId={id} onClose={() => setShowPopup(false)} />
                </div>
            )}
        </>
    );
}
