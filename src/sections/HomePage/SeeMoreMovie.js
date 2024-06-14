import React, { useEffect, useState } from "react";
import TitleSection from "../../components/TitleSection";
import { IoIosTimer } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SeeMoreMovie() {
  const [userId, setUserId] = useState(null);
  const [Data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    setUserId(storedId);
    if (storedId) {
      fetchHistoryrData(storedId);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  const fetchHistoryrData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/movie/historyview/${id}`,
      );
      const Data = await response.json();
      setData(Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="container section">
      <TitleSection hightlight={"Xem tiếp "} title={"phim bạn đã xem"} />

      <div className="grid grid-cols-4 gap-5">
        {/* Thêm logic để hiển thị danh sách phim */}
        {userId ? (
          <>
            {Data ? (
              Data.map((movie, index) => (
                <MovieItem
                  key={index}
                  id={movie.id}
                  title={movie.name}
                  thumbnail={movie.thumbnail}
                  viewing_time={movie.viewing_time}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </>
        ) : (
          <div className=" col-span-4 text-center">
            <Link onClick={handleLogout}>Vui lòng đăng nhập để xem tiếp</Link>
          </div>
        )}
      </div>
    </section>
  );
}

const MovieItem = ({ id, title, thumbnail, viewing_time }) => {
  return (
    <Link to={"/view/" + id}>
      <div className="flex flex-col gap-2.5">
        <div className="relative">
          <img
            src={thumbnail}
            alt=""
            className="rounded-t-[10px] aspect-video object-cover"
          />

          <button className="text-white text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <BsPlayCircle className="text-" />
          </button>

          <div className="relative w-full bg-white h-[2px]">
            <div className="absolute inset-y-0 left-0 w-[20%] bg-primary"></div>
          </div>
        </div>

        <div>
          <h6 className="mb-[5px]">{title}</h6>
          <p className="flex gap-[5px] text-sm items-center text-gray">
            <IoIosTimer />
            {viewing_time}
          </p>
        </div>
      </div>
    </Link>
  );
};
