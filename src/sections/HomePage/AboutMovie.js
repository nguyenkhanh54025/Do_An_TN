import React from 'react'
import image from '../../assets/images/movieEx.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { BsBadge4K } from 'react-icons/bs';

export default function AboutMovie() {
    return (
        <>
            <section className='section30 container text-center'>
                <h2 className='text-[50px] font-bold'>Khám phá các <span className='text-oran'>giá trị</span></h2>

                <div className='flex gap-10'>
                    <ValueItem icon={<><BsBadge4K className='text-oran text-4xl' /></>} content={'Chúng tôi cam kết cung cấp nội dung chất lượng cao, thu hút và giải trí cho khán giả.'} title={'Chất lượng'} />
                    <ValueItem icon={<><BsBadge4K className='text-oran text-4xl' /></>} content={'Chúng tôi cung cấp nhiều loại phim và chương trình truyền hình đa dạng, đáp ứng các sở thích và sở thích khác nhau.'} title={'Chất lượng'} />
                    <ValueItem icon={<><BsBadge4K className='text-oran text-4xl' /></>} content={'Chúng tôi cố gắng làm cho nền tảng của mình có thể truy cập được trên nhiều thiết bị để bạn có thể thưởng thức phim mọi lúc, mọi nơi.'} title={'Chất lượng'} />
                    <ValueItem icon={<><BsBadge4K className='text-oran text-4xl' /></>} content={'Chúng tôi liên tục tìm kiếm những cách sáng tạo để nâng cao trải nghiệm xem phim của bạn và cung cấp các tính năng mới.'} title={'Chất lượng'} />
                    <ValueItem icon={<><BsBadge4K className='text-oran text-4xl' /></>} content={'Chúng tôi đánh giá cao cộng đồng yêu thích phim ảnh và mong muốn nuôi dưỡng cảm giác thân thuộc cũng như sự gắn kết giữa những người dùng của chúng tôi.'} title={'Chất lượng'} />
                </div>
            </section>
            <section className='bg-darkBlue'>
                <div className='container py-10 flex gap-[50px] items-center'>
                    <div className='w-[55%] flex flex-col gap-2.5'>
                        <h3 className='text-[25px] font-bold'>Về <span className='text-oran'>MovieFilm</span></h3>
                        <p className='text-gray'>
                            Chào mừng bạn đến với MovieFilm, điểm đến tuyệt vời dành cho những người đam mê điện ảnh. Chúng tôi đam mê phim ảnh và tin vào sức mạnh của việc kể chuyện. Sứ mệnh của chúng tôi là cung cấp nền tảng kết nối những người yêu thích phim với những bộ phim yêu thích của họ.
                            <br /> <br />
                            Với giao diện thân thiện với người dùng và thư viện phong phú, chúng tôi mong muốn nâng cao trải nghiệm xem phim của bạn và làm cho nó trở nên thuận tiện hơn bao giờ hết. Hãy tham gia cùng chúng tôi trong cuộc phiêu lưu thú vị này và để các bộ phim đưa bạn đến những cõi tưởng tượng mới.
                        </p>
                    </div>

                    <div className='w-[45%]'>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={2}
                            pagination={true}
                            modules={[Pagination]}
                            className="mySwiperPagination w-full"
                        >
                            <SwiperSlide className='h-[480px]'>
                                <img src={image} alt='' className='h-full w-full block object-cover rounded-[8px]' />
                            </SwiperSlide>
                            <SwiperSlide className='h-[480px]'>
                                <img src={image} alt='' className='h-full w-full block object-cover rounded-[8px]' />
                            </SwiperSlide>
                            <SwiperSlide className='h-[480px]'>
                                <img src={image} alt='' className='h-full w-full block object-cover rounded-[8px]' />
                            </SwiperSlide>
                            <SwiperSlide className='h-[480px]'>
                                <img src={image} alt='' className='h-full w-full block object-cover rounded-[8px]' />
                            </SwiperSlide>
                            <SwiperSlide className='h-[480px]'>
                                <img src={image} alt='' className='h-full w-full block object-cover rounded-[8px]' />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}

export const ValueItem = ({ icon, title, content }) => {
    return (
        <div className='flex flex-col gap-2.5 items-start w-full'>
            {icon}
            <h4 className='text-[25px] font-bold'>{title}</h4>
            <p className='text-start text-gray'>{content}</p>
        </div>
    )
}