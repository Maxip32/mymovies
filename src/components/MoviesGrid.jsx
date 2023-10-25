import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

// Importa el archivo JSON local (ajusta la ruta según sea necesario)
import moviesData from "../components/movies.json";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 15;
  const [query, setQuery] = useSearchParams();
  const search = query.get("search");

  useEffect(() => {
    setIsLoading(true);

    // Filtra las películas del archivo JSON local
    const filteredMovies = moviesData.filter((movie) => {
      if (!search) return true; // Si no hay término de búsqueda, muestra todas las películas
      // Filtra las películas que coinciden con el término de búsqueda (en este ejemplo, solo por título)
      return movie.title.toLowerCase().includes(search.toLowerCase());
    });

    setMovies(filteredMovies);
    setIsLoading(false);
  }, [search]);

  return (
    <>
      <header>
        <Link to="/home">
          <h1 className={styles.title}>Proyector Movies</h1>
        </Link>
      </header>
      <div>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
          
            <FaSearch size={20} color="black" className={styles.searchButton} />
          </div>
        </div>
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasMore}
          next={() => setCurrentPage(currentPage + 1)}
          loader={<Spinner />}
          >
          <ul className={styles.moviesGrid}>
            {movies.slice(0, currentPage * itemsPerPage).map((movie) => (
              // Utiliza Link para envolver MovieCard y pasar datos de película a la página de detalles
              <Link key={movie.id} to={`/movie/${movie.id}`} state={movie}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </ul>
          <div className={styles.buttonContainer}>
            {currentPage > 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
              )}
            <span className={styles.pageNumber}>Page {currentPage}</span>
            {hasMore && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
