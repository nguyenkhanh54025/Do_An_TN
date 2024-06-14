import React from 'react'
import { FaLaptop } from 'react-icons/fa'
import { IoIosPhonePortrait } from 'react-icons/io'

export default function InfoCorresponding() {
    return (
        <section className='bg-darkBlue py-10'>
            <div className='section30 container'>
                <div className='text-center'>
                    <h3 className='text-[25px] font-bold'>Thiết bị <span className='text-oran'>Tương ứng</span></h3>
                    <p>Xem phim và chương trình truyền hình yêu thích của bạn trên các thiết bị yêu thích của bạn </p>
                </div>

                <div className='flex gap-[50px] w-full'>
                    <div className='flex items-center text-oran'>
                        <FaLaptop className='text-[365px]' />
                        <IoIosPhonePortrait className='text-[200px]' />
                    </div>

                    <div className='flex flex-col gap-2.5 w-full'>
                        <button className='p-5 bg-white font-bold text-black w-full rounded-[5px] text-start'>TV thông minh</button>
                        <button className='p-5 bg-white font-bold text-black w-full rounded-[5px] text-start'>TV thông minh</button>
                        <button className='p-5 bg-white font-bold text-black w-full rounded-[5px] text-start'>TV thông minh</button>
                        <button className='p-5 bg-white font-bold text-black w-full rounded-[5px] text-start'>TV thông minh</button>
                        <button className='p-5 bg-white font-bold text-black w-full rounded-[5px] text-start'>TV thông minh</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
