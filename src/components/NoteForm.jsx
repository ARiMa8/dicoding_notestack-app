import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getText } = useLanguage();

  const maxTitleLength = 50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (title.trim() && body.trim() && title.length <= maxTitleLength) {
      setIsLoading(true);
      try {
        await onAddNote({
          title: title.trim(),
          body: body.trim(),
        });
        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else if (title.length > maxTitleLength) {
      setError(
        `${getText("titleLimit")} ${maxTitleLength} ${getText("characters")}`
      );
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2
          className="note-detail-title"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          {getText("addNoteTitle")}
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              {getText("noteTitle")}
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder={getText("titlePlaceholder")}
              value={title}
              onChange={handleTitleChange}
              required
              disabled={isLoading}
            />
            <div
              className={`char-counter ${
                title.length >= maxTitleLength ? "char-limit" : ""
              }`}
            >
              {title.length}/{maxTitleLength} {getText("characters")}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="body">
              {getText("noteContent")}
            </label>
            <textarea
              id="body"
              className="form-textarea"
              placeholder={getText("contentPlaceholder")}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={title.length > maxTitleLength || isLoading}
            >
              {isLoading ? getText("loading") : getText("save")}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              {getText("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
