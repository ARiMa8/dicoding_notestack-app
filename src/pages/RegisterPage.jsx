import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useLanguage } from "../contexts/LanguageContext";
import { register } from "../utils/api";

const RegisterPage = () => {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { getText } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      setIsLoading(false);
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 className="auth-title">{getText("registerTitle")}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              {getText("name")}
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder={getText("namePlaceholder")}
              value={name}
              onChange={handleNameChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              {getText("email")}
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder={getText("emailPlaceholder")}
              value={email}
              onChange={handleEmailChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              {getText("password")}
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder={getText("passwordPlaceholder")}
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              {getText("confirmPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder={getText("confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? getText("loading") : getText("register")}
          </button>
        </form>

        <p className="auth-link">
          {getText("haveAccount")}{" "}
          <Link to="/login">{getText("clickHere")}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
