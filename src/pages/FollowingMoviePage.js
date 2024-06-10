import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MovieManagePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const id = localStorage.getItem('id');
                const response = await axios.get(`http://127.0.0.1:8000/api/movie/getFollowedMovie?id=${id}`);
                setMovies(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleDelete = async (movieId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this movie?");
        
        if (!userConfirmed) {
            return; // Exit the function if the user cancels
        }
    
        const formData = new FormData();
        formData.append('movie_id', movieId);
        formData.append('user_id', localStorage.getItem('id'));

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movie/unFollow`, {
                method: "POST",
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            
            console.log("Movie deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const handleView = (movieId) => {
        navigate(`/view/${movieId}`);
    };
    
    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    if (movies.length === 0) {
        return <div style={styles.noData}>No movies to display</div>;
    }

    return (
        <div style={styles.movieTable}>
            <h1>Phim đang theo dõi</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Tên</th>
                        <th style={styles.th}>Mô tả</th>
                        <th style={styles.th}>Thumbnail</th>
                        <th style={styles.th}>Lượt xem</th>
                        <th style={styles.th}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td style={styles.td}>{movie.name}</td>
                            <td style={styles.td}>{movie.description}</td>
                            <td style={styles.td}>
                                <img src={movie.thumbnail} alt={movie.name} style={styles.img} />
                            </td>
                            <td style={styles.td}>{movie.view_count}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleDelete(movie.id)} style={styles.deleteButton}>Unfollow</button>
                                <button onClick={() => handleView(movie.id)} style={styles.viewButton}>Xem</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    movieTable: {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'collapse',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        border: '1px solid #ddd',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
        color: 'black',
    },
    td: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    img: {
        display: 'block',
        maxWidth: '100px',
        height: 'auto',
    },
    addButton: {
        margin: '20px 0',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '16px',
    },
    editButton: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    viewButton: {
        margin: '0 5px',
        padding: '5px 10px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#007bff',
    },
    error: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#dc3545',
    },
    noData: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '18px',
        color: '#6c757d',
    },
};

// Add hover effect styles
styles.addButton[':hover'] = {
    backgroundColor: '#0056b3',
};
styles.editButton[':hover'] = {
    backgroundColor: '#218838',
};
styles.deleteButton[':hover'] = {
    backgroundColor: '#c82333',
};
styles.viewButton[':hover'] = {
    backgroundColor: '#138496',
};
