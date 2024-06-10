import React from 'react'
import logo from '../assets/images/bigLogo.png'

export default function FooterComponent() {
    return (
        <footer className='border-t-2 py-5 border-secondary'>
            <div className='container flex justify-between items-center'>
                <img src={logo} alt='' />

                <div className='flex gap-[50px]'>
                    <div>
                        <h3 className='font-bold mb-4'>GIỚI THIỆU</h3>

                        <ul className='text-sm flex flex-col gap-[15px]'>
                            <li>Giới thiệu về MovieFilm</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold mb-4'>QUY ĐỊNH</h3>

                        <ul className='text-sm flex flex-col gap-[15px]'>
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách thanh toán</li>
                            <li>Gói và phương thức cung cấp dịch vụ</li>
                            <li>Chính sách về sở hữu trí tuệ</li>
                            <li>Chính sách bảo vệ thông tin cá nhân</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold mb-4'>THÔNG TIN</h3>

                        <ul className='text-sm flex flex-col gap-[15px]'>
                            <li>Thông báo</li>
                            <li>FAQs</li>
                            <li>Liên hệ</li>
                            <li>Góp ý</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
