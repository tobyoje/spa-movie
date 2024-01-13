import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import MovieCard2 from "../MovieCard2/MovieCard2";

interface singleMovie {
  id: number;
  name: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  vote_average: string;
}
const LandingPage = () => {
  const [data, setData] = useState();
  const [apiKey, setApiKey] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const tmdbBaseUrl = "https://api.themoviedb.org/3";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/trending/tv/week?api_key=${apiKey}`
      );
      setData(response.data);
      setMoviesList(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(moviesList);

  return (
    <>
      <div className="movielist">
        {moviesList.map((movie: singleMovie) => (
          <div key={movie.id}>
            <MovieCard2 movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
