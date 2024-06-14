import React, { useState, useEffect } from 'react';
import InfoPremium from '../components/InfoPremium';
import TitleSection from '../components/TitleSection';
import ExtendItem from '../components/ExtendItem';
import ExtendItemMomo from '../components/ExtendItemMomo';

import { IoLockClosedSharp } from 'react-icons/io5';
import logoMomo from '../assets/images/logoMomo.png';
import PopUpPayment from '../components/PopUpPayment';

export default function PlanformPage() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const currentDay = String(currentDate.getDate()).padStart(2, '0');

    const formattedStartDate = `${currentDay}/${currentMonth}/${currentYear}`;
    const [endDate, setEndDate] = useState('');

    // Function to update endDate from localStorage
    const updateEndDateFromLocalStorage = () => {
        setEndDate(localStorage.getItem("end") || '');
    };
    const username=localStorage.getItem("name");
    // Update endDate when component mounts
    useEffect(() => {
        updateEndDateFromLocalStorage();

        // Add event listener for localStorage changes
        window.addEventListener('storage', updateEndDateFromLocalStorage);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('storage', updateEndDateFromLocalStorage);
        };
    }, []);

    const handleExtendItemClick = (value) => {
        const end = document.getElementById('endDate');
        end.textContent = localStorage.getItem('end');
        const price = document.getElementById('money');
        price.textContent = localStorage.getItem('money');
    };

    return (
        <main className='py-0 bg-white'>
            <InfoPremium />

            <section className='container py-10 text-black flex gap-[30px] items-start'>
                {/* ============= Steps ============= */}
                <div className='flex flex-col gap-[30px] w-3/5'>
                <form className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-5'>
                        <TitleSection title="Bước 1/2: Chọn thời hạn gói VIP" />
                        <div className='flex flex-col gap-2.5' onClick={handleExtendItemClick}>
                            <ExtendItem value={1} content={<><p>1 THÁNG</p></>} money={'10.000'} />
                            <ExtendItem value={2} content={<><p>2 THÁNG</p></>} money={'20.000'} />
                            <ExtendItem value={4} content={<><p>4 THÁNG</p> <p className='text-sm font-light'>Siêu tiết kiệm</p></>} money={'30.000'} />
                            <ExtendItem value={6} content={<><p>6 THÁNG</p> <p className='text-sm font-light'>Siêu tiết kiệm</p></>} money={'40.000'} />
                            <ExtendItem value={12} content={<><p>12 THÁNG</p> <p className='text-sm font-light'>Siêu tiết kiệm</p></>} money={'49.000'} />
                        </div>
                    </div>
                </form>
                    <div className='flex flex-col gap-5'>
                        <div className='grid gap-2.5'>
                            <TitleSection title="Bước 2/2: Chọn phương thức thanh toán" />
                            <p className='flex gap-2 items-center'><IoLockClosedSharp className='text-blue' /> Mọi giao dịch của bạn đều được bảo mật</p>
                        </div>

                        <div className='flex flex-col gap-2.5'>
                            <ExtendItemMomo content={<div className='flex items-center gap-2'><img src={logoMomo} alt='momo' /> Ví MoMo</div>} />
                        </div>
                    </div>
                </div>
                
           

                {/* ============= Total ============= */}
                <div className='w-2/5 bg-grayF5 rounded-[5px] p-5 flex flex-col gap-5'>
                    <TitleSection title='Thông tin chi tiết' />

                    <div>
                        <div className='py-5 first:pt-0 border-t first:border-none grid gap-2.5'>
                            <InfoDetailItem content={'Tên tài khoản'} value={username} />
                        </div>
                        <div className='py-5 first:pt-0 border-t first:border-none grid gap-2.5'>
                            <InfoDetailItem content={'Tên gói'} value={'VIP'} />
                            <InfoDetailItem content={'Thời hạn gói'} value={'1 tháng'} />
                        </div>
                        <div className='py-5 first:pt-0 border-t first:border-none grid gap-2.5'>
                            <InfoDetailItem id='startDate' content={'Ngày hiệu lực'} value={formattedStartDate} />
                            <div className='flex justify-between items-center w-full'>
                                <p>Ngày hết hạn</p>
                                <p className={`? 'text-blue text-xl' : ''} font-bold`} id='endDate'>Xin hãy chọn gói</p>
                            </div>
                        </div>
                        <div className='py-5 first:pt-0 border-t first:border-none grid gap-2.5'>
                            <div className='flex justify-between items-center w-full'>
                                <p>Thành tiền</p>
                                <p className={`? 'text-blue text-xl' : ''} font-bold`} id='money'>Xin hãy chọn gói</p>
                            </div>
                        </div>

                        <PopUpPayment />
                    </div>
                </div>
            </section>
        </main>
    )
}

export const InfoDetailItem = ({ content, value, total }) => {
    return (
        <div className='flex justify-between items-center w-full'>
            <p>{content}</p>
            <p className={`${total ? 'text-blue text-xl' : ''} font-bold`}>{value}</p>
        </div>
    )
}
