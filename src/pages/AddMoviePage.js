import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/logoBlack.png";

export default function EditMoviePage() {
  const [movieData, setMovieData] = useState({
    name: "",
    description: "",
    videoUrl: null,
    thumbnail: null,
    genre: [],
    nation: "",
    adult: false,
    vip: false,
  });

  const navigate = useNavigate();

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
    if (movieData.videoUrl && movieData.videoUrl.size > maxFileSize) {
      alert("Video file is too large. Maximum size is 64MB.");
      return;
    }
    if (movieData.thumbnail && movieData.thumbnail.size > maxFileSize) {
      alert("Thumbnail file is too large. Maximum size is 64MB.");
      return;
    }

    const formData = new FormData();
    formData.append('name', movieData.name);
    formData.append('description', movieData.description);
    formData.append('videoUrl', movieData.videoUrl);
    formData.append('thumbnail', movieData.thumbnail);
    formData.append('genre', JSON.stringify(movieData.genre));
    formData.append('nation', movieData.nation);
    formData.append('adult', movieData.adult ? 1 : 0);
    formData.append('vip', movieData.vip ? 1 : 0);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      alert('Movie added successfully');
      navigate("/mManage");
    } catch (error) {
      console.error("Error adding movie:", error);
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
                onChange={(e) => setMovieData({ ...movieData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="font-bold">Mô Tả</label>
              <textarea
                id="description"
                className="w-full p-2 border rounded mt-2"
                value={movieData.description}
                onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="adult"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                checked={movieData.adult}
                onChange={(e) => setMovieData({ ...movieData, adult: e.target.checked })}
              />
              <label className="font-bold ml-2 text-gray-700">Là phim 18+</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="vip"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                checked={movieData.vip}
                onChange={(e) => setMovieData({ ...movieData, vip: e.target.checked })}
              />
              <label className="font-bold ml-2 text-gray-700">Là phim Vip</label>
            </div>
            <div>
              <label className="font-bold">Video</label>
              <input
                type="file"
                id="videoUrl"
                accept="video/*"
                className="w-full p-2 border rounded mt-2"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="font-bold">Thumbnail</label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="w-full p-2 border rounded mt-2"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="font-bold">Thể Loại</label>
              <div>
                {["Action", "Adventure", "Drama", "Fantasy", "Shounen", "Historical"].map((genre) => (
                  <label key={genre} className="inline-flex items-center mr-2">
                    <input
                      type="checkbox"
                      value={genre}
                      checked={movieData.genre.includes(genre)}
                      onChange={(e) => {
                        const { value } = e.target;
                        setMovieData((prevData) => {
                          const newGenre = prevData.genre.includes(value)
                            ? prevData.genre.filter((g) => g !== value)
                            : [...prevData.genre, value];
                          return {
                            ...prevData,
                            genre: newGenre,
                          };
                        });
                      }}
                      className="form-checkbox h-4 w-4"
                    />
                    <span className="ml-1">{genre}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                value={movieData.genre.join(", ")}
                readOnly
                className="w-full p-2 border rounded mt-2"
                id="genre"
              />
              <button
                type="button"
                onClick={() => setMovieData((prevData) => ({ ...prevData, genre: [] }))}
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
                Clear
              </button>
            </div>
            <div>
              <label className="font-bold">Quốc Gia</label>
              <select
                id="nation"
                className="w-full p-2 border rounded mt-2"
                value={movieData.nation}
                onChange={(e) => setMovieData({ ...movieData, nation: e.target.value })}
                required
              >
                <option value="">--Chọn quốc gia--</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
                <option value="Vietnam">Vietnam</option>
                {/* Add more options as needed */}
              </select>
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
              Gửi
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
