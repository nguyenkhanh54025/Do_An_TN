import React, { useState,useEffect } from 'react'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatarDefault.png'
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import {  IoSearch } from "react-icons/io5";
import { BsFillPencilFill } from 'react-icons/bs';
// import { FaHistory } from 'react-icons/fa';
import {IoMdLogOut } from 'react-icons/io';
import { Button } from '@mui/material';

export default function HeaderComponent() {
    //const [userId, setUserId] = useState(null);
    const user_id = localStorage.getItem('id');

    const navigate = useNavigate();
        const handleSubmit = (e) => {
            navigate("/search");
        };
    // useEffect(() => {
    //         const storedId = localStorage.getItem("id");
    //         setUserId(storedId);
    //       }, []);
    return (
        <header className=' bg-secondary'>
            <div className='flex justify-between py-2.5 items-center container'>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>

                <nav>
                    <ul className='flex gap-5 font-bold'>
                        <li>
                            <Link to={'/'}>Trang chủ</Link>
                        </li>
                        <li>
                            <Link to={'/search'}>Lọc phim</Link>
                        </li>
                        <li>
                            <Link to={'/followedMovie'}>Đang theo dõi</Link>
                        </li>
                        <li>
                            <Link to={'/history'}>Lịch sử</Link>
                        </li>
                        <li>
                            <Link to={'/movie-following'}>Giới thiệu</Link>
                        </li>
                    </ul>
                </nav>

                <div className='flex gap-5 items-center'>
                    <form className='relative w-[260px]'>
                        <button className='absolute text-black top-1/2 left-[5px] -translate-y-1/2 text-[20px]' onClick={handleSubmit}><IoSearch /></button>
                        <input
                            type='text'
                            className='bg-white w-full rounded-[5px] p-[5px] text-center text-black placeholder:text-black placeholder:font-bold'
                            placeholder='Tìm kiếm'
                            name="value"
                        />
                    </form>

                    {user_id ? <AvatarDropdown />: <Link className='btn' to='/user/login'>Login</Link>   }
                </div>
            </div>
        </header>
    )
}

const AvatarDropdown = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    const handleShow = () => {
        setShow(!show)
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate('/user/login');
    };
    return (
        <div to={'#'} className='w-8 h-8 aspect-square bg-white rounded-full relative'>
            <img src={avatar} alt='avatar' className='w-8 h-8 block rounded-full' onClick={handleShow} />

            {
                show && <ul className='absolute top-full left-full bg-white flex flex-col gap-5 p-5 rounded-[10px] text-gray'>
                    <li>
                        <Link className='flex items-center whitespace-nowrap gap-2.5' to='/account'><BsFillPencilFill className='text-lg' /> Chỉnh sửa thông tin</Link>
                    </li>
                    {/* <li className='flex items-center whitespace-nowrap gap-2.5'> <Link className='flex items-center whitespace-nowrap gap-2.5' to='/followedMovie'><IoFilmSharp className='text-lg' /> Phim được theo dõi</Link></li>
                    <li className='flex items-center whitespace-nowrap gap-2.5'><Link className='flex items-center whitespace-nowrap gap-2.5' to='/history' ><FaHistory className='text-lg'  /> Phim đã xem</Link></li> */}
                    <li className='flex items-center whitespace-nowrap gap-2.5'><IoMdLogOut className='text-lg' /><Link onClick={handleLogout}> Đăng xuất</Link></li>
                    {/* <li className='flex items-center whitespace-nowrap gap-2.5'><IoMdLogIn className='text-lg' /> Đăng Nhập</li> */}
                </ul>
            }
        </div>
    )
}