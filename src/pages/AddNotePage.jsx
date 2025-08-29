import React from "react";
import NoteForm from "../components/NoteForm";

const AddNotePage = ({ onAddNote }) => {
  return <NoteForm onAddNote={onAddNote} />;
};

export default AddNotePage;
