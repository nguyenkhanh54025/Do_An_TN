import React,{ useState } from 'react'
import { BsEyeFill, BsHandThumbsDownFill, BsHandThumbsUpFill } from 'react-icons/bs'

export default function InfoMovieSection({id,name,description,view_count,created_at,video_duration,nation,viewing_time,like_count,dislike_count}) {
    const [updatedLikeCount, setUpdatedLikeCount] = useState(like_count);
    const [updatedDislikeCount, setUpdatedDislikeCount] = useState(dislike_count);
    const handleLikeClick = () => {
        const storedId = parseInt(localStorage.getItem("id"));
    
        fetch('http://127.0.0.1:8000/api/movie/lVideo', {
            method: 'POST',
            body: JSON.stringify({ movie_id: id, user_id: storedId }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to like video');
            }
        }).then(data => {
            setUpdatedLikeCount(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    };
    
    const handleDislikeClick = () => {
        const storedId = parseInt(localStorage.getItem("id"));
    
        fetch('http://127.0.0.1:8000/api/movie/dlVideo', {
            method: 'POST',
            body: JSON.stringify({ movie_id: id, user_id: storedId }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to dislike video');
            }
        }).then(data => {
            setUpdatedDislikeCount(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <section className='section'>
            <div className='grid gap-[15px]'>
                <h3 className='text-3xl font-bold'>{name}</h3>
                <p>Phim được cập nhập vào {created_at}</p>

                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <p>{video_duration}</p>
                        <p>{nation}</p>
                        <p>{viewing_time}</p>
                    </div>

                    <div className='flex items-center gap-5'>
                        <p className='flex items-center gap-1.5'><BsEyeFill /> {view_count} viewers</p>
                        <button className='flex items-center gap-1.5' onClick={handleLikeClick} >
                            <BsHandThumbsUpFill /> {updatedLikeCount} lượt thích
                        </button>
                        <button className='flex items-center gap-1.5' onClick={handleDislikeClick} >
                            <BsHandThumbsDownFill /> {updatedDislikeCount} không thích
                        </button>
                    </div>
                </div>
            </div>

            <div className='text-sm text-gray'>
                {description}
            </div>
        </section>
    )
}
