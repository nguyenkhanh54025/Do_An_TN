import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import logo from "../assets/images/logoBlack.png";

export default function ActorList() {
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/getAllActor")
      .then((response) => response.json())
      .then((data) => {
        setActors(data);
      })
      .catch((error) => console.error("Error fetching actors data:", error));
  }, []);

  const handleAdd = () => {
    navigate("/mAddActor");
  };
  const handleAssign = (id) => {
    navigate(`/mAssign/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/mEditActor/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this actor?");
    if (!confirmed) {
      return; 
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/deleteActor?id=${id}`, {
        method: "GET",
      });
        window.alert("Actor deleted successfully.");
        window.location.reload();
    } catch (error) {
      console.error("Error deleting actor:", error);
    }
  };
  
  

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="section container items-center">
        <div className="text-black w-[800px] p-[50px] border rounded-[5px] grid gap-5 shadow-lg" style={{ backgroundColor: '#D6D2D2' }}>
          <h3 className="font-bold text-2xl mb-5 text-center">Danh sách diễn viên</h3>
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
              Thêm diễn viên
            </button>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Tên</th>
                <th className="py-2">Avatar</th>
                <th className="py-2">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {actors.map((actor) => (
                <tr key={actor.id}>
                  <td className="py-2 text-center">{actor.id}</td>
                  <td className="py-2 text-center">{actor.name}</td>
                  <td className="py-2 text-center">
                    <img
                      src={`http://127.0.0.1:8000/storage/img/${actor.avatar}`}
                      alt={actor.name}
                      className="max-w-[50px] mx-auto"
                    />
                  </td>
                  <td className="py-2 text-center">
                  <button
                    onClick={() => handleEdit(actor.id)} // Wrap handleEdit in an arrow function
                    style={{
                      color: 'white',
                      background: 'skyblue',
                      padding: '10px 20px',
                      border: 'none',
                      marginTop: '5px',
                      marginLeft: '10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.target.style.background = 'deepskyblue'; e.target.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'skyblue'; e.target.style.transform = 'scale(1)'; }}
                  >
                    Sửa
                  </button>

                     <button
                        type="button"
                        onClick={() => handleDelete(actor.id)}
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
                        onMouseEnter={(e) => { e.target.style.background = 'darkred'; e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'red'; e.target.style.transform = 'scale(1)'; }}
                      >
                        Xóa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAssign(actor.id)}
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
                        onMouseEnter={(e) => { e.target.style.background = 'darkred'; e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'red'; e.target.style.transform = 'scale(1)'; }}
                      >
                        Phim đã đóng
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
