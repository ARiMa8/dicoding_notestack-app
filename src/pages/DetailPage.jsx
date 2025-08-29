import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/api";
import NoteDetail from "../components/NoteDetail";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

const DetailPage = ({ notes, onDelete, onArchive }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      setIsLoading(true);
      try {
        const existingNote = notes.find((note) => note.id === id);
        if (existingNote) {
          setNote(existingNote);
        } else {
          const fetchedNote = await getNote(id);
          setNote(fetchedNote);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadNote();
  }, [id, notes]);

  if (isLoading) {
    return <Loading />;
  }

  if (notFound || !note) {
    return <NotFound />;
  }

  return <NoteDetail note={note} onDelete={onDelete} onArchive={onArchive} />;
};

export default DetailPage;
