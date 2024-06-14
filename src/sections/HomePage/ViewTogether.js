import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'

export default function ViewTogether() {
    return (
        <section className='section30 container'>
            <h3 className='text-[25px] font-bold text-center'>Xem phim trực tuyến <span className='text-oran'>cùng với bạn bè</span></h3>

            <div className='flex gap-10'>
                <InfoItem icon={<BsFillPeopleFill className='text-6xl text-oran' />} title={'Xem và nghe cùng nhau'} content='Bắt đầu xem phim và mời bạn bè của bạn bằng cách chia sẻ mã bạn bè của bạn với họ.' />
                <InfoItem icon={<BsFillPeopleFill className='text-6xl text-oran' />} title={'Xem và nghe cùng nhau'} content='Duyệt tìm phương tiện yêu thích của bạn và thêm URL vào hàng đợi.' />
                <InfoItem icon={<BsFillPeopleFill className='text-6xl text-oran' />} title={'Xem và nghe cùng nhau'} content='Các tính năng mới được thêm vào trên các trang web phát trực tuyến như trò chuyện thời gian thực và đánh dấu dấu thời gian.' />
            </div>
        </section>
    )
}

export const InfoItem = ({ icon, title, content }) => {
    return (
        <div className='flex flex-col items-center w-full gap-2.5'>
            {icon}
            <h4 className='text-[25px] pt-2.5'>{title}</h4>
            <p className='text-center text-gray'>{content}</p>
        </div>
    )
}
