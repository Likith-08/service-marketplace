import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">

      {/* 🔥 Floating Icons (NEW) */}
      <div className="floating-icons">
        <span>🔧</span>
        <span>💡</span>
        <span>🧹</span>
        <span>🛠️</span>
        <span>🚿</span>
      </div>

      <div className="bg-blur"></div>

      <div className="splash-content">
        <div className="logo">ServiceHub</div>
        <p className="tagline">Trusted Services At Your Fingertips</p>
      </div>
    </div>
  );
}

export default SplashScreen;