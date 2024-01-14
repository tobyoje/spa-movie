import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SingleMovie.scss";
import { Link, useParams } from "react-router-dom";
import homeIcon from "../../assets/images/home.svg";
import searchIcon from "../../assets/images/search.svg";
import dotIcon from "../../assets/images/dot.svg";

interface singleMovie {
  id: number;
  name: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  primary_release_year: string;
  vote_average: string;
  overview: string;
  genres: { name: string }[];
}

interface singleReview {
  id: number;
  author: string;
  content: string;
  created_at: string;
  url: string;
}

const SingleMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const apiKey = sessionStorage.getItem("apiKey");
  const [movie, setMovie] = useState<singleMovie | null>(null);
  const [reviews, setReviews] = useState([]);
  const tmdbBaseUrl = "https://api.themoviedb.org/3";

  const formatDate = (inputDate: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${tmdbBaseUrl}/tv/${movieId}?api_key=${apiKey}&append_to_response=reviews`
      );
      setMovie(response.data);
      setReviews(response.data.reviews.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(movie);
  console.log(reviews);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(movie);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  console.log(movie);

  return (
    <>
      <header className="header">
        <Link to={"/home"}>
          <img className="header__icon" src={homeIcon} alt="Home" />
        </Link>
        <div className="top-container">
          <h1 className="top-container__title"></h1>
        </div>
        <Link to={"/search"}>
          <img className="header__icon" src={searchIcon} alt="Home" />
        </Link>
      </header>

      <section className="singlemovie">
        <img
          className="singlemovie__image"
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt=""
        />

        <div className="singlemovie__info">
          <h2 className="singlemovie__title">{movie.name}</h2>
          <div className="singlemovie__info-inner">
            <p className="singlemovie__date">
              {movie.first_air_date || movie.primary_release_year}
            </p>
            <img className="singlemovie__dot" src={dotIcon} alt="Dot" />
            <p>{movie.vote_average} / 10</p>
          </div>
          <p className="singlemovie__media">
            {movie.first_air_date ? "Tv" : "Movie"}
          </p>
          <div className="singlemovie__genre">
            {movie.genres.map((genre: { name: string }, index: number) => (
              <React.Fragment key={index}>
                <p>{genre.name}</p>
                {index < movie.genres.length - 1 && (
                  <img className="singlemovie__dot" src={dotIcon} alt="Dot" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="singlemovie__overview">{movie.overview}</p>
        </div>
      </section>

      <section className="singlemovie__review">
        <h1 className="singlemovie__review-title">Reviews</h1>
        {reviews.map((review: singleReview) => (
          <div className="singlemovie__review-container" key={review.id}>
            <p className="singlemovie__author"> {review.author}</p>
            <p className="singlemovie__content">{review.content}</p>
            <p className="singlemovie__review-date">
              {formatDate(review.created_at)}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default SingleMovie;
