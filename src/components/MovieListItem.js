import React from 'react'
import coverFilm from '../assets/images/movieEx.png'
import { BsEyeFill, BsFillStarFill } from 'react-icons/bs'

export default function MovieListItem({ vip }) {
    return (
        <div className='flex gap-[40px] items-center bg-black p-5 first:rounded-t-[10px] last:rounded-b-[10px]'>
            <div className='flex gap-[15px]'>
                <div className='relative w-[153px] flex-shrink-0'>
                    <img src={coverFilm} alt='' className='block w-full object-cover rounded-[10px]' />
                    {
                        vip && <div className='absolute top-2.5 left-2.5 px-2.5 py-[5px] rounded-[10px] bg-linear text-sm font-bold'>VIP</div>
                    }
                </div>

                <div>
                    <h5 className='mb-2 text-lg font-bold'>Thất kiếm anh hùng</h5>

                    <div className='text-gray grid gap-5'>
                        <div className='flex gap-[30px]'>
                            <p>2018</p>
                            <p>Hàn Quốc</p>
                            <p>1g42ph</p>
                            <p className='flex items-center gap-2.5'><BsEyeFill className='text-[24px]' /> 567k lượt xem</p>
                        </div>

                        <p className='line-clamp-4 text-sm'>Hãy cùng nhau thưởng thức lại màn trình diễn LIVE PERFORMANCE ĐẦU TIÊN của CHÚNG TA CỦA TƯƠNG LAI tại 7-MINUTE STAGE nàooooo !!! 🔥🔥🔥Và đừng quên tiếp tục ủng hộ bài hát trên các nền tảng nghe nhạc số nhéeee: https://mtp.bfan.link/chung-ta-cua-tu... 🪐🪐🪐✨✨✨🎶🎶🎶Tùng yêu mọi người rất nhiều ♥️♥️♥️</p>

                        <div className='flex gap-2.5'>
                            <button className='px-2.5 py-[5px] bg-oran rounded-[10px] text-sm w-fit text-white'>Kịch tính </button>
                            {
                                vip && <button className='px-2.5 py-[5px] bg-linear rounded-[10px] text-sm w-fit text-white'>VIP </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-5 items-end'>
                <div className='flex gap-[5px] text-yellow'>
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                </div>

                <button className='px-[30px] py-2.5 bg-blue rounded-[10px] whitespace-nowrap'>Xem ngay</button>
            </div>
        </div>
    )
}
