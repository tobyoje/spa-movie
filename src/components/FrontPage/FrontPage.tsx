import React, { useState } from "react";
import "./FrontPage.scss";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();
  const [myUserApi, setUserApi] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sessionStorage.setItem("apiKey", myUserApi);
    navigate("/home");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserApi(event.target.value);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="apiform">
        <h1> Welcome here</h1>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter your TMDB API here"
        />

        <button>Enter</button>
      </form>
    </section>
  );
};

export default FrontPage;
