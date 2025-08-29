import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import Loading from "../components/Loading";

const HomePage = ({ notes, isLoading }) => {
  const [searchParams] = useSearchParams();
  const [filteredNotes, setFilteredNotes] = useState([]);
  const keyword = searchParams.get("keyword") || "";
  const { getText } = useLanguage();

  useEffect(() => {
    if (keyword) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [keyword, notes]);

  const handleSearch = (searchKeyword) => {
    if (searchKeyword) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <NotesList notes={filteredNotes} emptyMessage={getText("noNotes")} />
    </div>
  );
};

export default HomePage;
