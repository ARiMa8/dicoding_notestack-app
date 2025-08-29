import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation = ({ isAuthenticated }) => {
  const location = useLocation();
  const { getText } = useLanguage();

  if (!isAuthenticated) return null;

  return (
    <nav className="navigation">
      <div className="container">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              {getText("activeNotes")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/archives"
              className={`nav-link ${
                location.pathname === "/archives" ? "active" : ""
              }`}
            >
              {getText("archives")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/notes/new"
              className={`nav-link ${
                location.pathname === "/notes/new" ? "active" : ""
              }`}
            >
              {getText("addNote")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
