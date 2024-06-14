// src/SchedulePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { colors } from '@mui/material';

export default function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/admin/getAllSchedule');
                setSchedules(response.data);
            } catch (error) {
                setError('Error fetching schedules data');
            }
            setLoading(false);
        };

        fetchSchedules();
    }, []);

    const handleAdd = async () =>{
      const name = document.getElementById('movie_name').value;
      if (!name || !selectedDate) {
        alert('Vui lòng nhập User ID và chọn ngày VIP');
        return;
      }
      const formData = new FormData();
      formData.append('movie_name', name);
      formData.append('date', formatDate(selectedDate));
      
      const response = await fetch('http://127.0.0.1:8000/api/admin/addSchedule', {
        method: "POST",
        body: formData
      });
      if(response)
        {
          console.log("Schedule add successfully");
          window.location.reload(); 
        }else{
          console.log("Schedule add not successfully");
          window.location.reload(); 
        }
    
    }

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
    };

    const handleDelete = async (movieId) => {
      const userConfirmed = window.confirm("Are you sure you want to delete this movie?");
      
      if (!userConfirmed) {
          return;
      }
  
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/admin/deleteSchedule?schedule_id=${movieId}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              }
          });
          
          if(response)
            {
              console.log("Schedule deleted successfully");
              window.location.reload(); 
            }else{
              console.log("Schedule deleted not successfully");
              window.location.reload(); 
            }
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
        <div style={styles.scheduleTable}>
          <div className="flex items-center gap-3 mb-3">
              <h1>Schedule Information</h1>
              <input id='movie_name'
                type="text"
                placeholder="Nhập tên phim"
                className="text-black w-40 p-2 border rounded"
              />
              <p>Chọn ngày ra mắt</p>
              <div className='text-black'>
                <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control bg-gray-100"
                />
              </div>
              <button
                onClick={handleAdd}
                style={{
                  color: 'white',
                  background: 'skyblue',
                  padding: '10px 20px',
                  border: 'none',
                  marginTop: '5px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.target.style.background = 'deepskyblue'; e.target.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'skyblue'; e.target.style.transform = 'scale(1)'; }}
              >
                Thêm lịch ra mắt
              </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td style={styles.td}>{schedule.id}</td>
                            <td style={styles.td}>{schedule.name_movie}</td>
                            <td style={styles.td}>{schedule.time}</td>
                            <button
                              onClick={() => handleDelete(schedule.id)} // Wrap handleEdit in an arrow function
                              style={{
                                color: 'white',
                                background: 'red',
                                padding: '10px 20px',
                                border: 'none',
                                marginTop: '5px',
                                marginLeft: '10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'background-color 0.3s, transform 0.2s',
                              }}
                              onMouseEnter={(e) => { e.target.style.background = 'deepred'; e.target.style.transform = 'scale(1.05)'; }}
                              onMouseLeave={(e) => { e.target.style.background = 'red'; e.target.style.transform = 'scale(1)'; }}
                            >
                              Xóa
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    scheduleTable: {
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
};
