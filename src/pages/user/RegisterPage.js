import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!agreeTerms) {
            setError('Vui lòng đồng ý với các điều khoản.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu và mật khẩu xác nhận không khớp.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/sign/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }
            navigate('/user/login');
        
        } catch (error) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
            console.error('Error registering:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='formLogin bg-secondary'>
            <h2>Đăng ký</h2>

            <form onSubmit={handleSubmit}>
                <div className='listInput'>
                    <div>
                        <input
                            type='text'
                            placeholder='Họ và tên'
                            value={name}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type='email'
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
                    <div>
                        <div className='pass'>
                            <BsEye />
                            <input
                                type='password'
                                placeholder='Nhập lại mật khẩu'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <br/>           
                <div>
                    <label>
                        <input
                            type='checkbox'
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            required
                        />
                        Tôi đồng ý với các điều khoản
                    </label>

                    <p>Vui lòng đọc kĩ điều khoản và đồng ý </p>
                </div>
                <br/>           
                <button type='submit' disabled={loading}>Tiếp Tục</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
