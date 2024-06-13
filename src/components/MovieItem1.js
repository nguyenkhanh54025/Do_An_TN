import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function MovieItem1({ hot, id, poster, nameMovie, count, type, viewing_time, vip }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/view/"+id);
        window.location.reload();
    };

    return (
        <Link onClick={() => handleClick(id)}>
            <div
                className="movie-item"
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    margin: '10px',
                    zIndex: 1,
                    cursor: 'pointer'
                }}
            >
                {hot && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            fontSize: '15px',
                            zIndex: 2
                        }}
                    >
                        Hot
                    </div>
                )}

                {count && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            backgroundColor: 'orange',
                            color: 'white',
                            padding: '6px 5px',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            fontSize: '14px',
                            zIndex: 2
                        }}
                    >
                        Tập {count} vietsub
                    </div>
                )}

                {vip && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'orange',
                            color: 'white',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            zIndex: 2
                        }}
                    >
                        VIP
                    </div>
                )}

                <img src={poster} alt={nameMovie} style={{ width: '200px', height: '270px',borderRadius:"20px" }} />
                <h3 style={{ textAlign: 'center', margin: '5px 0 0 0' }}>{nameMovie}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
                    <div
                        style={{
                            color: '#8c8c8c',
                            padding: '3px 8px',
                            borderRadius: '5px',
                            fontSize: '14px',
                            marginRight: '10px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {type}
                    </div>

                    <div
                        style={{
                            color: '#8c8c8c',
                            padding: '3px 8px',
                            borderRadius: '5px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <span style={{ marginRight: '5px' }}></span> {viewing_time}
                    </div>
                </div>
            </div>
        </Link>
    );
}
