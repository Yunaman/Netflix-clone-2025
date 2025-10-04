import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../../Utils/axios";

const Row = ({ title = "Row", fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        if (!fetchUrl) return;
        const request = await axios.get(fetchUrl);
        if (!cancel) setMovies(request.data.results || []);
      } catch (error) {
        // keep simple error handling
        console.error("Failed to fetch movies for row:", title, error);
      }
    })();
    return () => { cancel = true; };
  }, [fetchUrl, title]);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          const imgPath = isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path;
          if (!imgPath) return null;
          return (
            <img
              key={movie.id}
              src={`${base_url}${imgPath}`}
              alt={movie.name || movie.title || "movie"}
              className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Row;
