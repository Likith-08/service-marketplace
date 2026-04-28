// AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("customerLoggedIn", "true");
    navigate("/customer/services");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="overlay" />

        <div className="left-content">
          <div className="logo">ServiceHub</div>

          <h1>
            Book Trusted
            <br />
            Home Services
          </h1>

          <p>
            Connect with verified plumbers, electricians, carpenters,
            mechanics, AC repair experts and more near you.
          </p>

          <div className="feature-list">
            <div className="feature-item">✓ Verified Professionals</div>
            <div className="feature-item">✓ Fast Booking</div>
            <div className="feature-item">✓ Safe & Secure</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="tabs">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="sub-text">
            {isLogin
              ? "Login to continue booking services"
              : "Create your account to get started"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="input-group">
              <label>Email or Phone Number</label>
              <input
                type="text"
                placeholder="Enter email or phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isLogin && (
              <div className="extra-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>

                <span>Forgot Password?</span>
              </div>
            )}

            <button className="submit-btn" type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}