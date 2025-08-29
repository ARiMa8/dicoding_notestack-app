import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  id: {
    appTitle: "NoteStack",

    activeNotes: "Catatan Aktif",
    archives: "Arsip",
    addNote: "Tambah Catatan",

    searchPlaceholder: "Cari catatan berdasarkan judul...",

    noNotes: "Tidak ada catatan",
    emptyArchive: "Arsip kosong",
    noNotesAvailable: "Belum ada catatan yang tersedia.",

    save: "Simpan Catatan",
    cancel: "Batal",
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Pindahkan ke Aktif",
    login: "Masuk",
    register: "Daftar",
    logout: "Keluar",

    noteTitle: "Judul Catatan",
    noteContent: "Isi Catatan",
    titlePlaceholder: "Masukkan judul catatan...",
    contentPlaceholder: "Tuliskan isi catatan...",
    addNoteTitle: "Tambah Catatan Baru",

    loginTitle: "Masuk ke Akun Anda",
    registerTitle: "Buat Akun Baru",
    name: "Nama",
    email: "Email",
    password: "Password",
    confirmPassword: "Konfirmasi Password",
    namePlaceholder: "Masukkan nama lengkap...",
    emailPlaceholder: "Masukkan email...",
    passwordPlaceholder: "Masukkan password...",
    confirmPasswordPlaceholder: "Konfirmasi password...",
    haveAccount: "Sudah punya akun?",
    noAccount: "Belum punya akun?",
    clickHere: "Klik disini",

    deleteConfirm: "Apakah Anda yakin ingin menghapus catatan ini?",
    titleLimit: "Judul tidak boleh lebih dari",
    characters: "karakter!",
    loading: "Memuat...",

    notFound: "Halaman Tidak Ditemukan",
    notFoundMessage:
      "Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.",
    backToHome: "Kembali ke Beranda",

    copyright: "NoteStack ARiMa. All rights reserved.",

    lightTheme: "Tema Terang",
    darkTheme: "Tema Gelap",
  },
  en: {
    appTitle: "NoteStack",

    activeNotes: "Active Notes",
    archives: "Archives",
    addNote: "Add Note",

    searchPlaceholder: "Search notes by title...",

    noNotes: "No notes available",
    emptyArchive: "Archive is empty",
    noNotesAvailable: "No notes available yet.",

    save: "Save Note",
    cancel: "Cancel",
    delete: "Delete",
    archive: "Archive",
    unarchive: "Move to Active",
    login: "Login",
    register: "Register",
    logout: "Logout",

    noteTitle: "Note Title",
    noteContent: "Note Content",
    titlePlaceholder: "Enter note title...",
    contentPlaceholder: "Write your note content...",
    addNoteTitle: "Add New Note",

    loginTitle: "Login to Your Account",
    registerTitle: "Create New Account",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    namePlaceholder: "Enter your full name...",
    emailPlaceholder: "Enter your email...",
    passwordPlaceholder: "Enter your password...",
    confirmPasswordPlaceholder: "Confirm your password...",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    clickHere: "Click here",

    deleteConfirm: "Are you sure you want to delete this note?",
    titleLimit: "Title must not exceed",
    characters: "characters!",
    loading: "Loading...",

    notFound: "Page Not Found",
    notFoundMessage:
      "Sorry, the page you are looking for does not exist or has been moved.",
    backToHome: "Back to Home",

    copyright: "NoteStack ARiMa. All rights reserved.",

    lightTheme: "Light Theme",
    darkTheme: "Dark Theme",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "id";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "id" ? "en" : "id"));
  };

  const getText = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    getText,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
