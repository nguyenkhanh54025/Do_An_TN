import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/logoBlack.png";

export default function EditMoviePage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    name: "",
    espisode: "",
    video: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/movie/info?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieData((prevData) => ({
            ...prevData,
            name: data.differentName
          }));
        })
        .catch((error) => console.error("Error fetching movie data:", error));
    }
  }, [id]);

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxFileSize = 64 * 1024 * 1024; // 64MB
    if (movieData.video && movieData.video.size > maxFileSize) {
      alert("Video file is too large. Maximum size is 64MB.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("espisode", movieData.espisode);

    if (movieData.video) {
      formData.append("video", movieData.video);
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/addEsp`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      alert("Episode added successfully");
      navigate("/mManage");
    } catch (error) {
      console.error("Error adding or editing movie:", error);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="section container items-center">
        <img src={logo} alt="Logo" className="max-w-[210px] mx-auto mb-8" />
        <div className="text-black w-[556px] p-[50px] border rounded-[5px] grid gap-5 shadow-lg">
          <h3 className="font-bold text-2xl mb-5 text-center">Quản lý Phim</h3>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-bold">Tên Phim</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded mt-2"
                value={movieData.name}
                readOnly
              />
            </div>
            <div>
              <label className="font-bold">Tập phim</label>
              <input
                id="espisode"
                type="number"
                className="w-full p-2 border rounded mt-2"
                onChange={(e) => setMovieData({ ...movieData, espisode: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="font-bold">Video</label>
              <input
                type="file"
                id="video"
                accept="video/*"
                className="w-full p-2 border rounded mt-2"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
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
              Thêm tập phim
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
