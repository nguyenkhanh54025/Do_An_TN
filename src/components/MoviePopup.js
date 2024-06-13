import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function MoviePopUp({ movieId }) {
    const [movieInfo, setMovieInfo] = useState(null);

    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/movie/info?id=${movieId}`);
                const data = await response.json();
                setMovieInfo(data);
            } catch (error) {
                console.error('Error fetching movie information:', error);
            }
        };

        fetchMovieInfo();
    }, [movieId]);

    if (!movieInfo) {
        return null;
    }

    const genres = movieInfo.genre;
    const description = movieInfo.description.length > 200 
        ? movieInfo.description.substring(0, 200) + '...'
        : movieInfo.description;

    const popupContent = (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px',
                height: '600px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '100px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000, // Đảm bảo z-index cao
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundImage: `url(http://127.0.0.1:8000/storage/img/${movieInfo.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '10px',
                    padding: '20px',
                    color: 'white',
                    width: '70%',
                    textAlign: 'center',
                    position: 'relative',
                    marginTop: '15%',
                    height: '60%',
                    display: 'flex',
                    zIndex: 1001, // Z-index cao hơn để đảm bảo hiển thị trên cùng
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <h2 style={{ marginBottom: '10px' }}>{movieInfo.differentName}</h2>
                <div>
                    <h3>{movieInfo.name}</h3>
                    <p>Mô tả: {description}</p>
                    <p>View: {movieInfo.view_count}</p>
                    <p>Thể loại: 
                        <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0' }}>
                            {genres.map((genre, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#333',
                                        borderRadius: '5px'
                                    }}
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    </p>
                </div>
                <Link to={'/view/' + movieId} >
                    <button
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            color: 'white',
                            backgroundColor: '#007BFF',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Xem
                    </button>
                </Link>
            </div>
        </div>
    );

    return ReactDOM.createPortal(popupContent, document.body);
}
