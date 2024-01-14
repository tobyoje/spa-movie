import React, { useState, useEffect } from "react";
import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowError(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={`apierror ${showError ? "show" : "hide"}`}>
      {showError && (
        <>
          <h1>There's an error with your API Key</h1>
          <Link to={"/"}>
            <button>Try Again</button>
          </Link>
        </>
      )}
    </section>
  );
};

export default Error;
