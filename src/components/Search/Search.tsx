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

interface genreType {
  id: number;
  name: string;
}

const Search = () => {
  const apiKey = sessionStorage.getItem("apiKey");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState({
    airDate: 2024,
    genre: "",
    mediatype: "tv",
  });
  const [genreList, setGenreList] = useState<genreType[]>([]);

  const tmdbBaseUrl = "https://api.themoviedb.org/3/";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/discover/${searchInput.mediatype}`,
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

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/genre/${searchInput.mediatype}/list`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setGenreList(response.data.genres);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGenres();
  }, [searchInput, currentPage]);
  console.log(moviesList);
  console.log(genreList);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSearchInput((prevState) => ({ ...prevState, [name]: value }));
    setCurrentPage(1);
  };

  const handleClearFilter = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchInput({
      airDate: 2024,
      genre: "",
      mediatype: "tv",
    });
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
              {genreList.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter__option">
            <label htmlFor="airDate">Year</label>

            <input
              onChange={handleChange}
              value={searchInput.airDate}
              placeholder="Input year"
              id="airDate"
              name="airDate"
              type="text"
            />
          </div>

          <div className="filter__option">
            <button onClick={handleClearFilter}>Clear Filters</button>
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
