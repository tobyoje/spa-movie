import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import "./Trending.scss";
import homeIcon from "../../assets/images/home.svg";
import searchIcon from "../../assets/images/search.svg";
import { Link } from "react-router-dom";

const Trending = () => {
  const apiKey = sessionStorage.getItem("apiKey");

  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);

  const tmdbBaseUrl = "https://api.themoviedb.org/3";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/trending/tv/week?api_key=${apiKey}&page=${currentPage}`
      );
      setData(response.data);
      setMoviesList(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  console.log(moviesList);
  console.log(data);

  if (!data) {
    return (
      <>
        <p>loading..</p>
      </>
    );
  }

  return (
    <>
      <header className="header">
        <Link to={"/home"}>
          <img className="header__icon" src={homeIcon} alt="Home" />
        </Link>
        <div className="top-container">
          <h1 className="top-container__title">Trending TV Shows</h1>
        </div>
        <Link to={"/search"}>
          <img className="header__icon" src={searchIcon} alt="Home" />
        </Link>
      </header>

      <MovieList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Trending;
