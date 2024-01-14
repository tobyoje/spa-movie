import React, { useEffect, useState } from "react";
import "./Search.scss";
import axios from "axios";
import MovieList from "../MovieList/MovieList";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/images/home.svg";
import searchIcon from "../../assets/images/search.svg";

interface Props {
  searchInput: {
    airDate: number;
    genre: string;
    mediatype: string;
  };
}

const Search = () => {
  const apiKey = sessionStorage.getItem("apiKey");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState({
    airDate: 0,
    genre: "",
    mediatype: "tv",
  });

  const tmdbBaseUrl = "https://api.themoviedb.org/3/discover/";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/${searchInput.mediatype}`,
        {
          params: {
            api_key: apiKey,
            page: currentPage,
            with_genres: searchInput.genre,
            [searchInput.mediatype === "tv"
              ? "first_air_date_year"
              : "primary_release_year"]: searchInput.airDate,
          },
        }
      );

      setData(response.data);
      setMoviesList(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchInput, currentPage]);
  console.log(moviesList);
  console.log(pageNumber);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchInput((prevState) => ({ ...prevState, [name]: value }));
    setCurrentPage(1);
  };

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
          <h1 className="top-container__title">Search</h1>
        </div>
        <Link to={"/search"}>
          <img className="header__icon" src={searchIcon} alt="Home" />
        </Link>
      </header>

      <section className="filter">
        <form className="filter__container">
          <div className="filter__option">
            <label htmlFor="mediatype">Media Type</label>
            <select
              onChange={handleChange}
              value={searchInput.mediatype}
              id="mediatype"
              name="mediatype"
            >
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
            </select>
          </div>

          <div className="filter__option">
            <label htmlFor="genre">Genre</label>
            <select
              onChange={handleChange}
              value={searchInput.genre}
              id="genre"
              name="genre"
            >
              <option value="">Select</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
            </select>
          </div>

          <div className="filter__option">
            <label htmlFor="airDate">Year</label>
            <select
              onChange={handleChange}
              value={searchInput.airDate}
              id="airDate"
              name="airDate"
            >
              <option value="">Select</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
            </select>
          </div>

          <div className="filter__option">
            <button>Clear Filters</button>
          </div>
        </form>
      </section>

      <MovieList
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Search;
