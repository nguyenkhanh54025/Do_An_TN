import React, { useState } from 'react';
export default function PurOK() {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    };
    const handleDone = () => {
        window.location.href='http://localhost:3000/'
    };
    const popupContent = (
        <div className='w-[1200px] bg-white rounded-[10px] border border-gray-300'>
            <div className='px-5 py-2.5 relative text-center text-white rounded-t-[10px] bg-red-500'>
                <h2 className='text-3xl font-bold' style={{ color: 'red' }}>Thanh toán thành công</h2>
            </div>
            <div className="px-5 py-3 text-center">
                <p className="text-gray-600">Cảm ơn bạn đã thanh toán, xin vui lòng chờ một chút để cập nhật thành VIP</p>
            </div>
            <div className='flex justify-center pb-3'>
                <button className='py-[5px] px-[15px] rounded-[5px] bg-blue text-white' onClick={handleDone}>Về trang chủ</button>
            </div>
        </div>
    );

    return (
        <>
            <button className='py-[5px] px-[15px] rounded-[5px] bg-blue text-white' onClick={handleClick}>Xác nhận giao dịch</button>
            {show && (
                <div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-25'>
                    {popupContent}
                </div>
            )}
        </>
    );
}