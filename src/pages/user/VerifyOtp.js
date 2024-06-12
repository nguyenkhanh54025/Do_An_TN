import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [OTP, setOTP] = useState("");
  const user_id = localStorage.getItem("user_id");
  const Request_id = localStorage.getItem("Request_id");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/sign/verifyEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, OTP, Request_id }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const data = await response.json();
      if (data === 1) {
        navigate("/user/new_password");
      }

      console.log("Request successful");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="bg-secondary formLogin">
      <h2>Xác thực mã OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="listInput text-center">
          <div>
            <span></span>
            <input
              type="text"
              placeholder=""
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>

          <div>Gửi lại mã OTP</div>
          <br />
          <br />
        </div>

        <div className="submitButton">
          <button>Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
