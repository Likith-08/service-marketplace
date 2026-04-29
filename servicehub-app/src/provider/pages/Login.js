import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log(data);
    if (res.ok) {

    // ✅ save token
    localStorage.setItem("token", data.token);

    // ✅ redirect to services page
    navigate("/provider/services");
    }
       else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>

      <input
        type="email"
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

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
            <p>
  Don't have an account?{" "}
  <span onClick={() => navigate("/provider/register")}>
    Register
  </span>
</p>
      </div>
    </div>
);
}
export default Login;