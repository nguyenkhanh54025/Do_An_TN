import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MovieManagePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/movie/listMovie');
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
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/delete?id=${movieId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            
            console.log("Movie deleted successfully");
            window.location.reload(); // Reload the page after successful deletion
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={styles.movieTable}>
            <h2>Movie List</h2>
            <button style={styles.addButton}>
                <Link to='/mAdd'>
                    Add Movie
                </Link>
            </button>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Genre</th>
                        <th style={styles.th}>Thumbnail</th>
                        <th style={styles.th}>View Count</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td style={styles.td}>{movie.name}</td>
                            <td style={styles.td}>{movie.description}</td>
                            <td style={styles.td}>{movie.type}</td>
                            <td style={styles.td}>
                                <img src={movie.thumbnail} alt={movie.name} style={styles.img} />
                            </td>
                            <td style={styles.td}>{movie.view_count}</td>
                            <td style={styles.td}>
                            <button style={styles.editButton}>
                                <Link to={`/mEdit/${movie.id}`}>
                                    Sửa
                                </Link>
                            </button>
                            <button onClick={() => handleDelete(movie.id)} style={styles.deleteButton}>Xóa</button>
                            <button style={styles.editButton}>
                                <Link to={`/mAddEsp/${movie.id}`}>
                                    Thêm tập
                                </Link>
                            </button>
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