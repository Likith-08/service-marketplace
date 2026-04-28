import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* 🔥 Floating Icons (NEW) */}
      <div className="floating-icons">
        <span>🔧</span>
        <span>💡</span>
        <span>🧹</span>
        <span>🛠️</span>
        <span>🚿</span>
      </div>

      <h1 className="title">Welcome to ServiceHub</h1>
      <p className="subtitle">Choose your role to continue</p>

      <div className="btn-group">
        <button
          className="btn customer"
          onClick={() => navigate("/customer")}
        >
          Customer
        </button>

        <button
          className="btn provider"
          onClick={() => navigate("/provider")}
        >
          Provider
        </button>
      </div>
    </div>
  );
}

export default LandingPage;