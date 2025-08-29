import React from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { getText } = useLanguage();

  const handleSearch = (event) => {
    const value = event.target.value;

    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }

    onSearch(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder={getText("searchPlaceholder")}
        value={keyword}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
