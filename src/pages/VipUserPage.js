import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/getAllUser');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddVIP = async () => {
    if (!userId || !selectedDate) {
      alert('Vui lòng nhập User ID và chọn ngày VIP');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/toVip', {
        id: userId,
        vip: formatDate(selectedDate)
      });
      console.log(response.data);
      alert('Thêm VIP thành công');
      window.location.reload(); 
    } catch (error) {
      console.error('Error adding VIP:', error);
      alert('Có lỗi xảy ra khi thêm VIP');
    }
  };

  const handleRemoveVIP = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/admin/unVip?id=${userId}`);
      console.log(response.data);
      alert('Xóa VIP thành công');
      window.location.reload();
    } catch (error) {
      console.error('Error removing VIP:', error);
      alert('Có lỗi xảy ra khi xóa VIP');
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="section container items-center">
        <div className="text-black w-[800px] p-[50px] border rounded-[5px] grid gap-5 shadow-lg" style={{ backgroundColor: '#D6D2D2' }}>
          <h3 className="font-bold text-2xl mb-5 text-center">Quản lý tài khoản VIP</h3>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              placeholder="Nhập User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-40 p-2 border rounded"
            />
            <p>Chọn ngày hết hạn</p>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control bg-gray-100"
            />
            <button
              onClick={handleAddVIP}
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
              Thêm VIP
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleRemoveVIP(user.id)}
                        style={{
                          color: 'white',
                          background: 'red',
                          padding: '10px 20px',
                          border: 'none',
                          marginTop: '5px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          transition: 'background-color 0.3s, transform 0.2s',
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'darkred'; e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'red'; e.target.style.transform = 'scale(1)'; }}
                      >
                        Xóa VIP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserListPage;
