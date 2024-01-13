import React from "react";
import "./MovieCard2.scss";

interface singleMovie {
  id: number;
  name: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  vote_average: string;
}

interface Props {
  movie: singleMovie;
}

const MovieCard2 = ({ movie }: Props) => {
  return (
    <>
      <div className="moviebox">
        <img
          className="moviebox__image"
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={`${movie.name} Poster`}
        />
      </div>
    </>
  );
};

export default MovieCard2;
