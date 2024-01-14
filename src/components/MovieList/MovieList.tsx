import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import MovieCard from "../MovieCard/MovieCard";
import MovieCard2 from "../MovieCard2/MovieCard2";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

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
  data: any;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MovieList = ({ data, currentPage, setCurrentPage }: Props) => {
  return (
    <>
      <section className="movielist-container">
        <div className="movielist">
          {data.results.map((movie: singleMovie) => (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
};

export default MovieList;
