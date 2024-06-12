import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/sign/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            const data = await response.json();
            if (data.Request_id) {
                localStorage.setItem('Request_id', data.Request_id);
                localStorage.setItem('user_id', data.user_id);
                navigate("/user/verify");
            }
            console.log('Request successful');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='bg-secondary formLogin'>
            <h2>Quên mật khẩu</h2>

            <form onSubmit={handleSubmit}>
                <div className='listInput'>
                    <div>
                        <input
                            type='email'
                            placeholder='Email của bạn'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>

                <div className='submitButton'>
                    <button type="submit">Đăng nhập</button>
                    <p>Bạn chưa có tài khoản? <a href='register' className='text-oran'>Tạo tài khoản</a></p>
                </div>
            </form>
        </div>
    );
}
