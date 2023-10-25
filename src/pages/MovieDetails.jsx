import React, { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import styles from "./MovieDetails.module.css";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moviesData from "../components/movies.json"; // Ajusta la importación del archivo JSON

export function MovieDetails() {
  const { movieId } = useParams(); // Cambia "movieTitle" a "movieId" para recibir el ID desde la URL
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    // Busca la información de la película directamente en el archivo JSON por ID
    const selectedMovie = moviesData.find((item) => item.id === parseInt(movieId)); // Asegúrate de convertir el ID a un número

    if (selectedMovie) {
      setMovie(selectedMovie);
      setVideoUrl(selectedMovie.videoUrl);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [movieId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <header>
        <Link to="/home">
          <h1 className={styles.title}>Proyector Movies</h1>
        </Link>
      </header>
      <div className={styles.detailsContainer}>
        <ReactPlayer url={videoUrl} controls={true} width="740px" height="460px" />
        <div className={`${styles.col} ${styles.movieDetails}`}>
          <p className={styles.firstItem}>
            <strong>Title:</strong> {movie ? movie.title : "No Title Available"}
          </p>
          <p>
            <strong>Genres:</strong> {movie ? movie.genre_ids.join(", ") : "No Genres Available"}
          </p>
          <p>
            <strong>Description:</strong> {movie ? movie.overview : "No Description Available"}
          </p>
        </div>
      </div>
    </>
  );
}
