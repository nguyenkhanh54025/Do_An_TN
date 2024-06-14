import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AssignMoviePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [assigned, setAssigned] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/movie/listMovie');
                setMovies(response.data);
            } catch (error) {
                setError('Error fetching movies data');
            }
            setLoading(false);
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchAssigned = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/filmedMovie?actor_id=${id}`);
                setAssigned(response.data);
                console.log(response.data);
            } catch (error) {
                setError('Error fetching assigned movies data');
            }
            setLoading(false);
        };

        fetchAssigned();
    }, [id]);  // <- Ensure this effect runs when actor_id changes

    const handleDelete = async (movieId) => {
        const userConfirmed = window.confirm("Bạn muốn xóa phim này ra khỏi danh sách phim đã đóng?");
        
        if (!userConfirmed) {
            return; // Exit the function if the user cancels
        }

        const formData = new FormData();
        formData.append('assign_id', movieId);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/unAssign`, {
                method: "POST",
                body: formData,
            });
            
            alert("Movie deleted successfully");
            window.location.reload(); // Reload the page after successful deletion
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const handleAdd = async (movieId) => {
        const userConfirmed = window.confirm("Bạn muốn thêm phim này vào danh sách phim đã đóng?");
        
        if (!userConfirmed) {
            return; // Exit the function if the user cancels
        }

        const formData = new FormData();
        formData.append('movie_id', movieId);
        formData.append('actor_id', id);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/assignMovie`, {
                method: "POST",
                body: formData,
            });
            
            alert("Assign successfully");
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
            <h1>Phim đã đóng</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Thumbnail</th>
                        <th style={styles.th}>View Count</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assigned.map((assign) => (
                        <tr key={assign.movie_id}>
                            <td style={styles.td}>{assign.movie_id}</td>
                            <td style={styles.td}>{assign.name}</td>
                            <td style={styles.td}>
                                <img src={assign.thumbnail} alt={assign.name} style={styles.img} />
                            </td>
                            <td style={styles.td}>{assign.view_count}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleDelete(assign.id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>Danh sách phim</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
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
                            <td style={styles.td}>{movie.id}</td>
                            <td style={styles.td}>{movie.name}</td>
                            <td style={styles.td}>{movie.description}</td>
                            <td style={styles.td}>{movie.type}</td>
                            <td style={styles.td}>
                                <img src={movie.thumbnail} alt={movie.name} style={styles.img} />
                            </td>
                            <td style={styles.td}>{movie.view_count}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleAdd(movie.id)} style={styles.deleteButton}>Thêm</button>
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
