import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VipPopup from '../assets/images/VipPopup.png';
import { red } from '@mui/material/colors';

export default function InfoPremium() {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        navigate('/');
    };

    const handleClick = () => {
        setShow(false);
        navigate('/premium');
    };

    const popupContent = (
        <button className='py-[5px] px-[15px] rounded-[5px] bg-blue text-white' onClick={handleClick}>
            <img src={VipPopup} alt='Vip' style={{ maxWidth: '100%', height: 'auto' }} />
        </button>
    );

    return (
        <>
            {show && (
                <div className='fixed inset-0 flex justify-center items-center'>
                    <div className='w-[342px] bg-[#f9f9f9] rounded-[10px] relative'>
                        <button onClick={handleClose} className="absolute top-0 right-2 m-3 btn-close">
                            <h1 style={{color:red}}>X</h1>
                        </button>
                        <div className=' flex flex-col items-center gap-10'>
                            <div className='flex flex-col gap-5 items-center'>
                                {popupContent}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
