import React from 'react'
import ViewTogether from '../sections/HomePage/ViewTogether'
import TitleSection from '../components/TitleSection'

export default function VIewTogetherPage() {
    return (
        <main className='container section'>
            <ViewTogether />

            <section className='section'>
                <TitleSection hightlight='Các bước' title='để xem phim cùng nhau' />

                <div className='grid grid-cols-3 gap-[50px]'>
                    <StepItem />
                    <StepItem />
                    <StepItem />
                </div>
            </section>
        </main>
    )
}

const StepItem = () => {
    return (
        <div className='flex gap-[18px] p-5 bg-darkBlue min-h-[185px] rounded-[10px]'>
            <p className='text-[30px] font-bold'>1</p>

            <div>
                <h6 className='mb-2.5 font-bold'>Tạo phòng</h6>

                <p className='text-sm'>Đăng nhập vào MovieFilm để sử dụng chức năng xem phim cùng nhau</p>
            </div>
        </div>
    )
}