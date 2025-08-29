import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import {
  getUserLogged,
  getActiveNotes,
  getArchivedNotes,
  addNote as addNoteAPI,
  deleteNote as deleteNoteAPI,
  archiveNote as archiveNoteAPI,
  unarchiveNote as unarchiveNoteAPI,
  putAccessToken,
  getAccessToken,
  removeAccessToken,
} from "./utils/api";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";
import "./styles/style.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, getText } = useLanguage();

  useEffect(() => {
    const initializeApp = async () => {
      console.log("Initializing app...");
      const token = getAccessToken();
      console.log("Token from localStorage:", token);

      if (token) {
        try {
          console.log("Token found, getting user data...");
          const userData = await getUserLogged();
          console.log("User data:", userData);

          if (userData) {
            setUser(userData);
            await loadNotes();
          } else {
            console.log("User data is null/undefined, removing token");
            removeAccessToken();
          }
        } catch (error) {
          console.error("Error getting user data:", error);
          removeAccessToken();
          setUser(null);
        }
      } else {
        console.log("No token found");
      }

      setInitializing(false);
    };

    initializeApp();
  }, []);

  const loadNotes = async () => {
    console.log("Loading notes...");
    setIsLoading(true);
    try {
      const [activeNotes, archived] = await Promise.all([
        getActiveNotes(),
        getArchivedNotes(),
      ]);
      console.log("Active notes loaded:", activeNotes);
      console.log("Archived notes loaded:", archived);

      setNotes(activeNotes || []);
      setArchivedNotes(archived || []);
    } catch (error) {
      console.error("Failed to load notes:", error);
      setNotes([]);
      setArchivedNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loginSuccess = async (token) => {
    try {
      putAccessToken(token);
      const userData = await getUserLogged();
      setUser(userData);
      await loadNotes();
    } catch (error) {
      console.error("Error in loginSuccess:", error);
      removeAccessToken();
      setUser(null);
      throw new Error("Gagal memuat data pengguna setelah login.");
    }
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
    setNotes([]);
    setArchivedNotes([]);
  };

  const addNote = async (noteData) => {
    try {
      const newNote = await addNoteAPI(noteData);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    } catch (error) {
      throw error;
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteAPI(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      throw error;
    }
  };

  const archiveNote = async (id) => {
    try {
      const note =
        notes.find((n) => n.id === id) ||
        archivedNotes.find((n) => n.id === id);

      if (!note) return;

      if (note.archived) {
        await unarchiveNoteAPI(id);
        setArchivedNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
        setNotes((prevNotes) => [...prevNotes, { ...note, archived: false }]);
      } else {
        await archiveNoteAPI(id);
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
        setArchivedNotes((prevNotes) => [
          ...prevNotes,
          { ...note, archived: true },
        ]);
      }
    } catch (error) {
      throw error;
    }
  };

  if (initializing) {
    return <Loading />;
  }

  const isAuthenticated = !!user;

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1>{getText("appTitle")}</h1>
            <div className="header-controls">
              <button onClick={toggleTheme} className="theme-toggle">
                {theme === "light" ? "🌙" : "☀️"}
                {theme === "light"
                  ? ` ${getText("darkTheme")}`
                  : ` ${getText("lightTheme")}`}
              </button>
              <button onClick={toggleLanguage} className="language-toggle">
                {language === "id" ? "🇺🇸 EN" : "🇮🇩 ID"}
              </button>
              {isAuthenticated && (
                <>
                  <span className="user-info">👋 {user.name}</span>
                  <button onClick={logout} className="logout-btn">
                    {getText("logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <Navigation isAuthenticated={isAuthenticated} />

      <main className="main-content">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/"
                element={<HomePage notes={notes} isLoading={isLoading} />}
              />
              <Route
                path="/archives"
                element={
                  <ArchivePage notes={archivedNotes} isLoading={isLoading} />
                }
              />
              <Route
                path="/notes/new"
                element={<AddNotePage onAddNote={addNote} />}
              />
              <Route
                path="/notes/:id"
                element={
                  <DetailPage
                    notes={[...notes, ...archivedNotes]}
                    onDelete={deleteNote}
                    onArchive={archiveNote}
                  />
                }
              />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginPage loginSuccess={loginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 {getText("copyright")}</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
