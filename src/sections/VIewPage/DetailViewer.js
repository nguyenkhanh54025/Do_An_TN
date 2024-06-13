import React from 'react'
import { BsCheckCircleFill, BsFillChatTextFill, BsPerson, BsToggleOff, BsXLg } from 'react-icons/bs'
import avatar from '../../assets/images/avatarDefault.png'
import { FaHouseUser } from 'react-icons/fa'

export default function DetailViewer() {
    return (
        <section className='flex flex-col gap-[30px] w-[30%]'>
            <div className='flex flex-col bg-black p-[30px] rounded-[10px] gap-5 min-h-[285px]'>
                <h4 className='flex gap-[5px] items-center'>
                    <BsPerson className='text-lg' />
                    Người tham gia (2)
                </h4>

                <div className='flex flex-col gap-2.5'>
                    <PersonItem />
                    <PersonItem />
                    <PersonItem />
                </div>
            </div>

            <div className='flex flex-col bg-black p-[30px] rounded-[10px] gap-5 h-[600px]'>
                <h4 className='flex gap-2.5 items-center'>
                    <BsFillChatTextFill className='text-lg' />
                    Nhắn tin
                </h4>

                <div className='flex justify-between items-center bg-secondary px-2.5 py-[5px] rounded-[10px] text-gray'>
                    <p>Cho phép mọi người nhắn tin</p>
                    <button className='text-[24px]'><BsToggleOff /></button>
                </div>
            </div>
        </section>
    )
}

const PersonItem = () => {
    return (
        <div className='flex justify-between gap-5 items-center'>
            <div className='flex gap-2.5 items-center'>
                <img src={avatar} alt='' className='w-[30px] aspect-square rounded-full bg-white' />

                <div className='flex gap-[8px] items-center'>
                    <p>Kimm</p>
                    <FaHouseUser className='text-oran text-lg' />
                </div>
            </div>

            <div className='flex gap-2.5 text-lg'>
                <button><BsCheckCircleFill /></button>
                <button><BsXLg /></button>
            </div>
        </div>
    )
}