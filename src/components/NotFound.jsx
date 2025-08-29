import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const NotFound = () => {
  const { getText } = useLanguage();

  return (
    <div className="container">
      <div className="not-found">
        <h1>404</h1>
        <h2>{getText("notFound")}</h2>
        <p>{getText("notFoundMessage")}</p>
        <Link to="/" className="btn btn-primary">
          {getText("backToHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
