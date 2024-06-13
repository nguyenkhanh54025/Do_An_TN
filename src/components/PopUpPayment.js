import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import momoQR from '../assets/images/momo.png'
import PurOK from '../components/PurOK'

export default function PopUpPayment() {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }
    return (
        <>
            <button className='buttonPr text-white !w-full justify-center font-bold text-xl' onClick={handleClick}>Thanh toán</button>

            {
                show && <div className='fixed inset-0 flex justify-center items-center'>
                    <div className='w-[1200px] bg-[#f9f9f9] rounded-[10px]'>
                        <div className='bg-secondary px-5 py-2.5 relative text-center text-white rounded-t-[10px]'>
                            <h2 className='text-3xl font-bold'>Thanh toán tài khoản</h2>
                            <button className='absolute top-1/2 -translate-y-1/2 right-2.5 text-3xl' onClick={handleClick}><IoCloseSharp /></button>
                        </div>

                        <div className='py-10 flex flex-col items-center gap-10'>
                            <div className='flex flex-col gap-5 items-center'>
                                <p><span className='text-xl font-bold'>BƯỚC 1:</span> Bạn vui lòng quét mã QR sau đây để tiến hành thanh toán</p>
                                <img src={momoQR} alt='' className='w-[123px] aspect-square' />
                                <p><span className='text-xl font-bold'>BƯỚC 2:</span> Nhập nội dung {localStorage.getItem('id')} số tiền muốn thanh toán</p>
                                <p><span className='text-xl font-bold'>BƯỚC 4:</span> Nhập mã thanh toán giao dịch của bạn để xác nhận thông tin chuyển khoản</p>
                                <input type='text' placeholder='Mã thanh toán giao dịch của bạn ' className='p-2.5 bg-white text-center w-[600px] rounded-[10px]' />
                                <PurOK/>
                            </div>

                            <div className='flex justify-center'>
                                <ul className='bg-gray p-5 rounded-[10px] w-fit text-white list-disc list-inside'>
                                    <li>Phải nhập chính xác mã thanh toán giao dịch của bạn lên hệ thống, để được xác nhận thành tài khoản VIP.</li>
                                    <li>Trường hợp sau vài phút mà bạn không được đổi thành tài khoản VIP vui lòng gọi tới số hotline <span className='text-xl font-bold'>0946602812</span>.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
