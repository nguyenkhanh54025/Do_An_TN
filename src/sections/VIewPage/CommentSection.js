import React, { useState, useEffect } from 'react';
import { FaRegComments } from "react-icons/fa";
import CommentItem from '../../components/CommentItem';
// import Pagination from '../../components/Pagination';
import avatar from '../../assets/images/avatarDefault.png';

export default function CommentSection({ comments, movie_id }) {
    const [userName, setUserName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [updatedComments, setUpdatedComments] = useState(comments);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setUserName(storedName);
        } else {
            setUserName('Default Name');
        }
    }, []);

    const handleCommentSubmit = async () => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            console.error('User ID not found in local storage');
            return;
        }

        const newComment = {
            user_id,
            movie_id,
            comment: commentText,
        };

        try {
            await fetch(`http://127.0.0.1:8000/api/movie/cmt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            // Fetch updated comments after successful submission
            const response = await fetch(`http://127.0.0.1:8000/api/movie/view/${movie_id}`);
            const movieData = await response.json();
            setUpdatedComments(movieData.comments);

            setCommentText(''); // Clear the input field
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <section className='section'>
            <h3 className='text-orange flex items-center gap-2'>
                <FaRegComments /> Bình luận
            </h3>

            <div className='flex gap-2.5'>
                <img src={avatar} alt='Avatar' className='w-[50px] h-[50px] rounded-full bg-white' />
                <div className='w-full text-black flex flex-col gap-2.5'>
                    <div className='bg-white rounded-[5px] p-2.5'>
                        <h6 className={`border-b border-secondary pb-2.5 font-bold`}>{userName}</h6>
                        <input
                            className='py-2.5 text-sm placeholder:text-black w-full outline-none'
                            placeholder='Nội dung bình luận ...'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </div>
                    <div className='text-white text-sm flex gap-[30px] justify-end'>
                        <button
                            className='bg-blue py-[5px] px-[15px] rounded-[5px]'
                            onClick={handleCommentSubmit}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-5 mt-5'>
                {updatedComments && updatedComments.length > 0 ? (
                    updatedComments.map((comment, index) => (
                        <div key={index} className='bg-gray-100 p-4 rounded-lg'>
                            <CommentItem 
                                recomment={true}
                                cmt_id={comment.id} 
                                mv_id={movie_id}
                                cmt={comment.comments} 
                                name={comment.name} 
                                avatar={comment.avatar || avatar} 
                                time={comment.created_at} 
                                reply={comment.rcomment} 
                                like={comment.countlike} 
                            />
                            <div className='ml-8 mt-2'>
                                {comment.rcomment && comment.rcomment.length > 0 && comment.rcomment.map((reply, replyIndex) => (
                                    <CommentItem
                                        key={replyIndex}
                                        recomment={true}
                                        cmt_id={reply.id}
                                        mv_id={movie_id}
                                        cmt={reply.comments}
                                        name={reply.name}
                                        avatar={reply.avatar || avatar}
                                        time={reply.created_at}
                                        like={reply.countlike}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-gray-500'>Không có bình luận nào.</div>
                )}
                {/* <Pagination /> */}
            </div>
        </section>
    );
}
