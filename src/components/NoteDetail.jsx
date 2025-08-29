import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { showFormattedDate } from "../utils";

const NoteDetail = ({ note, onDelete, onArchive }) => {
  const navigate = useNavigate();
  const { getText } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(getText("deleteConfirm"))) {
      setIsLoading(true);
      try {
        await onDelete(note.id);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete note:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      await onArchive(note.id);
      navigate(note.archived ? "/archives" : "/");
    } catch (error) {
      console.error("Failed to archive note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="note-detail">
        <h1 className="note-detail-title">{note.title}</h1>
        <p className="note-detail-date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-detail-body">{note.body}</p>

        <div className="btn-group">
          <button
            onClick={handleArchive}
            className={`btn ${note.archived ? "btn-success" : "btn-warning"}`}
            disabled={isLoading}
          >
            {isLoading
              ? getText("loading")
              : note.archived
              ? getText("unarchive")
              : getText("archive")}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={isLoading}
          >
            {isLoading ? getText("loading") : getText("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
