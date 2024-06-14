import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logoBlack.png";

export default function EditActorPage() {
  const { id } = useParams();
  const [actorData, setActorData] = useState({
    name: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/admin/getActor?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch actor data");
        }
        const data = await response.json();
        setActorData(data);
      } catch (error) {
        console.error("Error fetching actor data:", error);
      }
    };

    if (id) {
      fetchActorData();
    }
  }, [id]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setActorData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', actorData.name);
    formData.append('avatar', actorData.avatar);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/editActor`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update actor");
      }
      alert('Actor updated successfully');
      window.location.href = 'http://localhost:3000/mActor';
    } catch (error) {
      console.error("Error updating actor:", error);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="section container items-center">
        <img src={logo} alt="Logo" className="max-w-[210px] mx-auto mb-8" />
        <div className="text-black w-[556px] p-[50px] border rounded-[5px] grid gap-5 shadow-lg">
          <h3 className="font-bold text-2xl mb-5 text-center">Chỉnh sửa diễn viên</h3>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-bold">Tên diễn viên</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded mt-2"
                value={actorData.name}
                onChange={(e) => setActorData({ ...actorData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="font-bold">Avatar</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="w-full p-2 border rounded mt-2"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                color: 'white',
                background: 'skyblue',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.background = 'deepskyblue'; e.target.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'skyblue'; e.target.style.transform = 'scale(1)'; }}
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
