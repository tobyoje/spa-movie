import React from "react";
import "./MovieCard.scss";

interface singleMovie {
  id: number;
  name: string;
  title: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  vote_average: string;
}

interface Props {
  movie: singleMovie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <>
      <div className="moviecard">
        <img
          className="moviecard__image"
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={`${movie.name} Poster`}
        />

        <div className="moviecard__details">
          <h1>{movie.name || movie.title}</h1>
          <p>{movie.vote_average} / 10</p>
          <div className="moviecard__type">
            <p>{movie.first_air_date ? "TV" : "Movie"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
