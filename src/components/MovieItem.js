import React, { useState, useEffect, useRef } from 'react';
import MoviePopUp from '../components/MoviePopup';

export default function MovieItem({ hot, id, poster, nameMovie, count, type, viewing_time ,vip }) {
    const [isHovered, setIsHovered] = useState(false);
    const [popupMovieId, setPopupMovieId] = useState(null);
    const popupRef = useRef(null);

    const handleClick = () => {
        setIsHovered(!isHovered);
        setPopupMovieId(id);
    };

    const handleOutsideClick = (event) => {
        if (popupRef.current && popupRef.current.contains(event.target)) {
            setIsHovered(false);
        }
    };
    useEffect(() => {
        if (isHovered) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isHovered]);

    return (
        <div
            className="movie-item"
            onClick={handleClick}
            style={{
                position: 'relative',
                display: 'inline-block',
                margin: '10px',
                zIndex: 1,
                cursor: 'pointer',
                
            }}
        >
            {hot && (<div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'red',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '10px',
                fontSize: '15px',
                zIndex: 2
            }}>
                Hot
            </div>)}
        
            {count && (<div style={{
                position: 'absolute',
                top: '10px',

                backgroundColor: 'orange',
                color: 'white',
                padding: '6px 5px',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                fontSize: '14px',
                zIndex: 2
            }}>
                Tập {count} vietsub
            </div>)}

            {vip && (<div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'orange',
                color: 'white',
                padding: '6px 10px',
                borderRadius: '10px',
                fontSize: '14px',
                zIndex: 2
            }}>
                VIP
            </div>)}

            <img src={poster} alt={nameMovie} style={{ width: '200px', height: '270px' ,borderRadius:"20px"}} />
            <h3 style={{ textAlign: 'center', margin: '5px 0 0 0' }}>{nameMovie}</h3>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5px'
            }}>
                <div style={{
                    color: '#8c8c8c',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {type}
                </div>

                <div style={{
                    color: '#8c8c8c',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ marginRight: '5px' }}></span> {viewing_time}
                </div>
            </div>
            {isHovered && (
                <div ref={popupRef}>
                    <MoviePopUp movieId={popupMovieId} />
                </div>
            )}
        </div>

    );
}
