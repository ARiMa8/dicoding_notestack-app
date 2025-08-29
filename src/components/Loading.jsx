import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const Loading = () => {
  const { getText } = useLanguage();

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{getText("loading")}</p>
    </div>
  );
};

export default Loading;
