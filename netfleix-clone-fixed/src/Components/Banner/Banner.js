import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data.results || [];
        const random = results[Math.floor(Math.random() * results.length)];
        if (!cancelled) setMovie(random);
      } catch (err) {
        console.error("Banner fetch failed", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const truncate = (str, n) => {
    if (!str) return "";
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const backgroundStyle = movie
    ? {
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}")`,
        backgroundPosition: "center center",
      }
    : {};

  return (
    <header className="banner" style={backgroundStyle}>
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name || ""}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
