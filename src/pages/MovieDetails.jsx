import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { get } from "../utils/httpClient";
import styles from "./MovieDetails.module.css";
import YouTube from "react-youtube"; // Importa el componente "YouTube"

export function MovieDetails() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    get("/movie/" + movieId).then((data) => {
      setMovie(data);
      setIsLoading(false);
    });
  }, [movieId]);

  if (isLoading) {
    return <Spinner />;
  }

  const youtubeVideoId = movie.youtubeVideoId; // asegurarse que "youtubeVideoId" esté configurado en tu JSON

  // opciones del reproductor
  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
      key: "AIzaSyDzfznI8Q-X1lAfWQUTzbCUhZqldIfyRFc", //clave de API
    },
  };

  return (
    <div className={styles.detailsContainer}>
      <YouTube videoId={youtubeVideoId} opts={opts} />
      <div className={`${styles.col} ${styles.movieDetails}`}>
        <p className={styles.firstItem}>
          <strong>Title:</strong> {movie.title}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {movie.overview}
        </p>
      </div>
    </div>
  );
}
