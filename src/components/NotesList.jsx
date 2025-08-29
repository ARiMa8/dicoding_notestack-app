import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { showFormattedDate } from "../utils";

const NotesList = ({ notes, emptyMessage }) => {
  const { getText } = useLanguage();

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>{emptyMessage}</h3>
        <p>{getText("noNotesAvailable")}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="notes-grid">
        {notes.map((note) => (
          <Link to={`/notes/${note.id}`} key={note.id} className="note-card">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-date">{showFormattedDate(note.createdAt)}</p>
            <p className="note-body">{note.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
