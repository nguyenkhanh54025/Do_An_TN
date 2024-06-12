import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/account/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          email,
          username,
        }),
      });
      const data = await response.json();

      if (data.success) {
        // Nếu thao tác thành công, điều hướng người dùng đến trang account
        navigate("/account");
      } else {
        // Nếu thất bại, bạn có thể hiển thị thông báo lỗi hoặc xử lý tùy ý
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      
      navigate("/user/login");
    }
  }, [navigate]);

  return (
    <main className="bg-white flex justify-center py-20">
      <form
        className="text-black w-[556px] p-[50px] border rounded-[5px] grid gap-5"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold">Chi tiết về tài khoản của bạn</h3>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <h6 className="font-bold">Email</h6>
            <input
              type="text"
              placeholder="Email"
              className="px-[5px] py-2.5 w-full border rounded-[5px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-sm text-[#ff0000]">* Email là bắt buộc</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <h6 className="font-bold">Tên tài khoản</h6>
            <input
              type="text"
              placeholder="Username"
              className="px-[5px] py-2.5 w-full border rounded-[5px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="text-sm text-[#ff0000]">
              * Tên người dùng là bắt buộc
            </span>
            <p className="text-sm text-gray">
              Chúng tôi cho phép thay đổi tên người dùng 3 lần mỗi năm. Bạn còn
              lại 3 thay đổi
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-5">
            <button
              className="w-full p-2.5 rounded-[5px] bg-blue text-white"
              type="submit"
            >
              Lưu thay đổi
            </button>
            <button
              type="button"
              className="w-full p-2.5 rounded-[5px] border"
              onClick={() => window.history.back()}
            >
              Hủy bỏ
            </button>
          </div>
          <p className="text-sm text-gray text-center mt-2.5">
            Những thay đổi đối với tên người dùng của bạn có thể ảnh hưởng đến
            URL tới hồ sơ, mục hoặc dịch vụ của bạn. Thay đổi tên người dùng sẽ
            được hiển thị trên hồ sơ của bạn.
          </p>
        </div>
      </form>
    </main>
  );
}
