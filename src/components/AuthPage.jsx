import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import logo from "../assets/images/logo.png";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);

  const handleTabChange = () => {
    setIsLoginTab(!isLoginTab);
  };

  return (
    <div className="auth-page-container">
      <img src={logo} alt="IT-Cube Logo" className="auth-page-logo" />
      <div className="auth-page-content"></div>
      <div className="auth-tabs">
        <button
          className={`auth-tab ${isLoginTab ? "active" : ""}`}
          onClick={handleTabChange}
        >
          Вход
        </button>
        <button
          className={`auth-tab ${!isLoginTab ? "active" : ""}`}
          onClick={handleTabChange}
        >
          Регистрация
        </button>
      </div>
      <div className="auth-form-container">
        {isLoginTab ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default AuthPage;
