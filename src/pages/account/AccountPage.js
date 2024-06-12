import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logoBlack.png";
import { Link, useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      fetchUserData(storedId);
    } else {
      localStorage.clear();
      navigate("/user/login");
    }
  }, [navigate]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/account/user/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="bg-white">
      <div className="section container items-center">
        <img src={logo} alt="" className="max-w-[210px]" />

        <div className="text-black w-[556px] p-[50px] border rounded-[5px] grid gap-5">
          <h3 className="font-bold text-xl">Chi tiết về tài khoản của bạn</h3>

          <div className="grid gap-5">
            {userData ? (
              <>
                <div>
                  <h5 className="font-bold">Tên tài khoản</h5>
                  <p>{userData.email}</p>
                </div>
                <div>
                  <h5 className="font-bold">Tên</h5>
                  <p>{userData.nameUser}</p>
                </div>
                <div>
                  <h5 className="font-bold">Email</h5>
                  <p>{userData.email}</p>
                </div>
              </>
            ) : (
              <div>Failed to fetch user data</div>
            )}
          </div>

          <div className="grid text-sm gap-2.5">
            <Link
              to="/update-infomation"
              className="border rounded-[5px] p-2.5 text-center"
            >
              Chỉnh sửa chi tiết
            </Link>
            <Link
              to="/change-password"
              className="border rounded-[5px] p-2.5 text-center"
            >
              Đổi mật khẩu
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
