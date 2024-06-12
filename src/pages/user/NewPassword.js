import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/sign/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      if (data === 1) {
        navigate("/user/login");
      }

      console.log("Request successful");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-secondary formLogin">
      <h2>Mật khẩu mới</h2>

      <form onSubmit={handleSubmit}>
        <div className="listInput">
          <div>
            <div className="pass">
              <BsEye />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <span>
              Tối thiểu 8 chữ số, có ít nhất 1 kí tự đặc biệt và 1 chữ số
            </span>
          </div>

          <div>
            <div className="pass">
              <BsEye />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <span>Mật khẩu nhập lại không chính xác</span>
          </div>
        </div>

        <div className="submitButton">
          <button type="submit">Đổi mật khẩu</button>
        </div>
      </form>
    </div>
  );
}
