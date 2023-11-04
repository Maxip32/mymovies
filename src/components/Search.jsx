import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import movieData from "./movies.json";

export function Search() {
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState(query.get("search") || "");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      setSearchResults([]);
    }
  }, [search]);

  const handleSearch = (value) => {
    const lowerValue = value.toLowerCase();
    const results = movieData?.filter((movie) =>
      movie.title.toLowerCase().includes(lowerValue)
    );
    setSearchResults(results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery({ search });
    handleSearch(search);
  };

  const handleSelectMovie = () => {
    // Limpia la búsqueda cuando se selecciona una película
    setSearch("");
    setQuery({ search: "" });
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          type="text"
          value={search}
          autoFocus
          placeholder="Title"
          aria-label="Search Movies"
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
        />
        <FaSearch size={20} color="black" className={styles.searchButton} />
      </div>

      <ul>
        {searchResults?.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={movie} onClick={handleSelectMovie}>
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </form>
  );
}
