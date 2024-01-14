import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface singleMovie {
  id: number;
  name: string;
  media_type: string;
  poster_path: string;
  first_air_date: string;
  vote_average: string;
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
      <div>
        <h2>{movie.name}</h2>
      </div>
      r
      <div>
        {reviews.map((review: singleReview) => (
          <div key={review.id}>
            <h1>{review.author}</h1>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleMovie;
