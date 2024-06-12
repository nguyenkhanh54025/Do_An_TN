import React from 'react'

export default function ChangePasswordPage() {
    return (
        <main className='bg-white flex justify-center py-20'>
            <form className='text-black w-[556px] p-[50px] border rounded-[5px] grid gap-5' method='post'>
                <h3 className='text-xl font-bold'>Đổi mật khẩu</h3>

                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2.5'>
                        <h6 className='font-bold'>Mật khẩu hiện tại</h6>
                        <input type='password' placeholder='Name' className='px-[5px] py-2.5 w-full border rounded-[5px]' />
                        <span className='text-sm text-[#ff0000]'>*  Cần có mật khẩu</span>
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        <h6 className='font-bold'>Mật khẩu mới</h6>
                        <input type='password' placeholder='Name' className='px-[5px] py-2.5 w-full border rounded-[5px]' />
                        <span className='text-sm text-[#ff0000]'>*  Cần có mật khẩu</span>
                        <p className='text-sm text-gray'>Sử dụng 8 ký tự trở lên kết hợp giữa chữ cái, số và ký hiệu. Không được chứa tên hoặc tên người dùng của bạn.</p>
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <button className='w-full p-2.5 rounded-[5px] bg-blue text-white'>Lưu thay đổi</button>
                    <button type='button' className='w-full p-2.5 rounded-[5px] border' onClick={() => window.history.back()}>Hủy bỏ</button>
                </div>
            </form>
        </main>
    )
}
