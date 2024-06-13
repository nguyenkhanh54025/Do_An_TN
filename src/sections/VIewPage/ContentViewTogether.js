import React from 'react'
import { IoIosArrowDown, IoMdCopy } from 'react-icons/io'
import { IoPeopleSharp } from 'react-icons/io5'

export default function ContentViewTogether() {
    return (
        <section className='flex flex-col gap-5'>
            <div>
                <h4 className='mb-2.5'>Chia sẻ liên kết bên đưới để mời bạn bè tham gia cùng</h4>

                <div className='border-white p-2.5 rounded-[10px] border flex items-center justify-between'>
                    <p className='text-sm text-gray'>http;//app.mai1tinhyeuhttp;//app.mai1tinhyeuhttp;//app.mai1tinhyeuhttp;//app.mai1tinhyeu </p>

                    <button className='rounded-[5px] py-[5px] px-2.5 bg-oran flex items-center gap-[5px]'>Copy <IoMdCopy /></button>
                </div>
            </div>

            <div>
                <h4 className='mb-2.5'>Chế độ của phòng</h4>

                <div className='flex items-center gap-5'>
                    <button className='p-2.5 rounded-[10px] border border-white flex gap-2.5 items-center'><IoPeopleSharp className='text-[24px]' /> Công khai</button>
                    <button className='p-2.5 rounded-[10px] border border-white flex gap-2.5 items-center'><IoPeopleSharp className='text-[24px]' /> Công khai</button>
                    <button className='p-2.5 rounded-[10px] border border-white flex gap-2.5 items-center'><IoPeopleSharp className='text-[24px]' /> Công khai</button>
                </div>
            </div>

            <div>
                <h4 className='mb-2.5'>Chia sẻ liên kết bên đưới để mời bạn bè tham gia cùng</h4>

                <div className='flex items-center'>
                    <button className='p-2.5 rounded-[10px] border border-white flex gap-2.5 items-center'>
                        Không giới hạn
                        <IoIosArrowDown className='text-[24px]' />
                    </button>
                </div>
            </div>
        </section>
    )
}
