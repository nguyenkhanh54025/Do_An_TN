import React from 'react'
import { BsCheck2 } from 'react-icons/bs'
import logo from '../assets/images/logoBlack.png'
import InfoPremium from '../components/InfoPremium'
import { Link } from 'react-router-dom'
import anh1 from '../assets/images/anh1.jpg';

export default function PremiumPage() {
    return (
        <main className='py-0 bg-white'>
            <InfoPremium />

            <section className='py-10 max-w-[734px] w-full m-auto text-black flex flex-col gap-[50px]'>
                <div className='flex flex-col items-center text-center gap-5 tracking-tighter'>
                    <img src={logo} alt='logo' />
                    <h2 className='font-semibold text-3xl'>Đăng ký để tận hưởng nhiều lợi ích hơn khi xem phim</h2>
                    <p className='text-nowrap font-medium'>Tận hưởng những bộ phim hay, cùng những tính năng nâng cao và ưu đãi đặc biệt giúp bạn xem phim nhiều hơn.</p>
                </div>

                <div className='flex gap-[30px]'>
                    <div className='w-full shadow-nomal rounded-[10px] min-h-[438px]'>
                        <div className='h-[200px] flex flex-col items-center justify-between py-[15px]'>
                            <p className='text-3xl font-semibold'>Cơ bản</p>

                            <button className='px-[15px] py-2.5 border-blue border rounded-[5px] text-blue text-sm'>Gói hiện tại</button>
                        </div>

                        <div className='tracking-tighter font-medium'>
                            <div className='flex gap-2 items-center border-t last:border-b-[1px] border-gray py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>Những bộ phim hành động, gay cấn</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full shadow-nomal rounded-[10px]'>
                        <div className='h-[200px] flex flex-col items-center justify-between py-[15px] text-white bg-black rounded-t-[10px] text-center px-2.5 tracking-tighter' style={{ backgroundImage: `url(${anh1})` }}>
                            <h4 className='text-3xl text-center font-bold'>VIP <br /> 69.000 <span className='text-xl font-normal'>VND</span></h4>
                            <p className='text-sm'>Giải trí không giới hạn với những bộ phim chiếu rạp mới ra mắt, những bộ phim mới hot trend trên thế giới</p>

                            <Link to={'/planform'} className='buttonPr'>Mua gói</Link>
                        </div>

                        <div className='tracking-tighter font-medium'>
                            <div className='flex gap-2 items-center border-t border-gray first:border-t-0 py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>Những bộ phim hành động, gay cấn</span>
                            </div>
                            <div className='flex gap-2 items-center border-t border-gray first:border-t-none py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>Độc quyền những bộ phim Việt đỉnh nhất</span>
                            </div>
                            <div className='flex gap-2 items-center border-t border-gray first:border-t-none py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>Tận hưởng bộ phim rạp mới ra mắt</span>
                            </div>
                            <div className='flex gap-2 items-center border-t border-gray first:border-t-none py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>100.000+ giải trí đặc sắc</span>
                            </div>
                            <div className='flex gap-2 items-center border-t border-gray first:border-t-none py-[15px] justify-center text-sm'>
                                <BsCheck2 className='text-blue text-lg' />
                                <span>Giải trí với nhiều thể loại</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
