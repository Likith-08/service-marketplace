import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import "./Login.css"; // reuse same CSS

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully");


        // ✅ redirect to services
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        {/* 👉 switch to login */}
        <p
            style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/provider")}
          >
            Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;