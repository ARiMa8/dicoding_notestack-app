import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useLanguage } from "../contexts/LanguageContext";
import { login } from "../utils/api";

const LoginPage = ({ loginSuccess }) => {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { getText } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt started...");

    setIsLoading(true);
    setError("");

    try {
      console.log("Calling login API with:", { email });
      const token = await login({ email, password });
      console.log(
        "Login successful, token received:",
        token ? "Token exists" : "No token"
      );

      if (!token) {
        throw new Error("No token received from login");
      }

      await loginSuccess(token);
      console.log("Login success callback completed");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 className="auth-title">{getText("loginTitle")}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? getText("loading") : getText("login")}
          </button>
        </form>

        <p className="auth-link">
          {getText("noAccount")}{" "}
          <Link to="/register">{getText("clickHere")}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
