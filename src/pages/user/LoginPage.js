import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { useLocation, Outlet } from 'react-router-dom';
import { Link  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import background from '../../assets/images/background.jpg';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/sign/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
    
            const jsonData = await response.json();
            localStorage.clear();

            if (jsonData && jsonData.id && jsonData.name) {
                localStorage.setItem('id', jsonData.information.id);
                localStorage.setItem('name', jsonData.name);
                localStorage.setItem('role', jsonData.role);
                localStorage.setItem('vip', jsonData.vip);
                navigate('/');

            } else {
                throw new Error('Invalid user data received');
            }
            } catch (error) {
            setError('Failed to log in. Please try again.');
            console.error('Error logging in:', error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='bg-secondary formLogin'>
            <h2>Đăng nhập</h2>

            <form onSubmit={handleSubmit}>
                <div className='listInput'>
                    <div>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <div className='pass'>
                            <BsEye />
                            <input
                                type='password'
                                placeholder='Mật khẩu'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Link to='/user/forget_password'>Quên mật khẩu ?</Link>
                </div>

                <div className='submitButton'>
                    <button type='submit' disabled={loading}>Đăng nhập</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>Bạn chưa có tài khoản ? <a href='register' className='text-oran'>Tạo tài khoản</a></p>
                </div>
            </form>
        </div>
    );
}

export const Login = () => {
    const { pathname } = useLocation();

    return (
        <main className='flex justify-center items-center min-h-screen' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' , backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            {pathname === '/login' ? <LoginPage /> : <Outlet />}
        </main>
    );
};

export default Login;
