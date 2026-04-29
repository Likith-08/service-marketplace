import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reset token generated (check console)");
        console.log("TOKEN:", data.resetToken);

        navigate("/"); // go back to login
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

 return (
  <div className="forgot-page">
    <div className="forgot-card">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive reset instructions</p>

      <input
        type="text"
        placeholder="Enter your email"
        className="forgot-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="forgot-btn" onClick={handleSubmit}>
        Send Reset Link
      </button>

      <div className="back-login" onClick={() => navigate("/customer")}>
        Back to Login
      </div>
    </div>
  </div>
);
}