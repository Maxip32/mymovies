import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

import movieData from "./movies.json";

export function Search() {
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState(query.get("search") || "");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (value) => {
    const lowerValue = value.toLowerCase();
    //added ?
    const results = movieData?.filter((movie) =>
      movie.title.toLowerCase().includes(lowerValue)
    );
    setSearchResults(results);
    console.log(results)
  }

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      setSearchResults([]);
    } 
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // acá falta un dispatch que traiga las pelis por ID

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
            setQuery({ search: value });
          }}
        />
        <FaSearch size={20} color="black" className={styles.searchButton} />
      </div>

      <ul>
        added ?
        {searchResults?.map((movie) => (
          <li key={movie.id}>
            {/* Usa Link para redirigir al componente MovieDetails */}
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </form>
  );
}
