import React, { useState, useEffect } from 'react';
import { BsFillStarFill, BsPlayCircle, BsPlus, BsStar } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

export default function DetailMovieSection({ poster, rating, episode }) {
    const [userRating, setUserRating] = useState(rating);

    useEffect(() => {
        setUserRating(rating); // Initialize userRating with the initial rating
    }, [rating]);

    const renderStars = (currentRating, setRatingFunction) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <BsFillStarFill
                    key={i}
                    className={i <= currentRating ? 'text-yellow' : 'text-gray-400'}
                    onClick={() => setRatingFunction(i)}
                    style={{ cursor: 'pointer' }}
                />
            );
        }
        return stars;
    };
    const renderStars1 = () => {
        const stars = [];
        if (rating >= 0 && rating < 5) {
            for (let i = 0; i < rating; i++) {
                stars.push(<BsFillStarFill key={i} />);
            }
            for (let i = 0; i < 5 - rating; i++) {
                stars.push(<BsStar key={`empty_${i}`} />);
            }
        }
        return stars;
    };
    const handleFollow = async () => {
        try {
            const formData = new FormData();
            formData.append('movie_id', localStorage.getItem('movie_id'));
            formData.append('user_id', localStorage.getItem('id'));
            const response = await fetch(`http://127.0.0.1:8000/api/movie/follow`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                alert('Follow thành công!');
            } else {
                alert('Follow không thành công!, vui lòng thử lại sau!.');
            }
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    const handleRatingSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('movie_id', localStorage.getItem('movie_id'));
            formData.append('user_id', localStorage.getItem('id'));
            formData.append('rating', userRating);
            const response = await fetch(`http://127.0.0.1:8000/api/movie/addrating`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                alert('Đánh giá thành công!');
            } else {
                alert('Đánh giá không thành công!, vui lòng thử lại sau!.');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const renderEpisodeItems = () => {
        if (!episode) return null;

        return episode.map((episodeItem, index) => (
            <EpisodeItem
                key={episodeItem.id}
                poster={poster}
                stt={episodeItem.stt}
                movie_id={episodeItem.movie_id}
            />
        ));
    };

    return (
        <section className='flex flex-col gap-[30px] w-[30%]'>
            <div className='flex flex-col bg-black p-[30px] rounded-[10px] gap-2.5'>
                <div className='w-full relative'>
                    <img src={poster} alt='' className='object-cover w-full h-full block rounded-[10px]' />
                    <div className='absolute right-1/2 translate-x-1/2 top-0 bg-orange py-1.5 px-2.5 rounded-b-[10px] text-sm'>Kịch tính </div>
                </div>
                <div className='flex gap-[5px] text-yellow justify-center'>
                {renderStars1()}
                </div>
                <button onClick={handleFollow} className='flex gap-[5px] items-center py-[5px] px-2.5 rounded-[5px] bg-blue justify-center'>
                    <BsPlus className='text-[24px]' /> Thêm vào bộ theo dõi
                </button>
            </div>
            <div className='flex flex-col gap-5 bg-black p-[30px] rounded-[10px]'>
                <h3 className='text-lg font-bold'>Tập phim</h3>
                <div className='grid gap-2.5'>
                    {renderEpisodeItems()}
                </div>
            </div>
            <div className='flex flex-col gap-5 bg-black p-[30px] rounded-[10px]'>
                <h3 className='text-lg font-bold'>Đánh giá của bạn</h3>
                <div className='flex gap-[15px] text-yellow text-3xl'>
                     {renderStars(rating, () => {})}
                </div>
                <button onClick={handleRatingSubmit} className='py-[5px] px-[15px] text-sm bg-blue rounded-[5px]'>Đánh giá</button>
            </div>
        </section>
    );
}

const EpisodeItem = ({ poster, stt, movie_id }) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/view/${movie_id}/${stt}`);
        window.location.reload();
    };

    return (
        <Link onClick={handleView}>
            <div className='flex gap-2.5 items-center'>
                <div className='w-[105px] aspect-square relative'>
                    <img src={poster} alt='' className='rounded-[10px] w-full h-full block object-cover' />
                    <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25px]'><BsPlayCircle /></button>
                </div>
                <div>
                    <h5 className='line-clamp-1 font-semibold'>Tập {stt}</h5>
                    <p className='text-sm text-gray'>36min</p>
                </div>
            </div>
        </Link>
    );
};
