import React from 'react'
import movieEx from '../assets/images/movieEx.png'
import { BsXCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function MovieHistory({ poster, nameMovie, day }) {
    return (
        <Link to={'/view/1'} className='flex flex-col gap-2.5'>
            <div className='aspect-[10/13] relative'>
                <img src={poster || movieEx} alt='' className='w-full h-full object-cover' />

                <div className='absolute top-0 left-0 p-2.5 inset-x-0 flex justify-between'>
                    <div className='text-sm bg-blue py-[5px] px-2.5 rounded-[10px]'>{day || '2 ngày trước'}</div>

                    <button><BsXCircle /></button>
                </div>
            </div>

            <p className='text-sm text-center line-clamp-1'>{nameMovie || 'One piece: Đảo hải tặc'}</p>
        </Link>
    )
}
