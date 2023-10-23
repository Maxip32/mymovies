import React, { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "./Empty";

export function MoviesGrid({ search }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 15;

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = search
      ? `/search/movie?query=${search}&page=${currentPage}`
      : `/discover/movie?page=${currentPage}`;
    get(searchUrl).then((data) => {
      setMovies(data.results);
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Restablece la página actual cuando se cambia la búsqueda
  }, [search]);

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={() => setCurrentPage(currentPage + 1)}
        loader={<Spinner />}
      >
        <ul className={styles.moviesGrid}>
          {movies.slice(0, currentPage * itemsPerPage).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          )}
          <span className={styles.pageNumber}>Página {currentPage}</span>
          {hasMore && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
