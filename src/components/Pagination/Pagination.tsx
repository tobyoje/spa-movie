import React from "react";
import "./Pagination.scss";

interface Props {
  data: any;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ data, currentPage, setCurrentPage }: Props) => {
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <section className="paginate">
        <div className="paginate__container">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="paginate__button paginate__button--left"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1667 7.58325L9.75 12.9999L15.1667 18.4166"
                stroke={currentPage === 1 ? "#989898" : "#121212"}
                strokeWidth="2.70833"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p>
            {currentPage} OF {data.total_pages}
          </p>
          <button
            onClick={handleNext}
            disabled={currentPage === data.total_pages}
            className="paginate__button paginate__button--right"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8333 18.4166L16.2499 12.9999L10.8333 7.58325"
                stroke={
                  currentPage === data.total_pages ? "#989898" : "#121212"
                }
                strokeWidth="2.70833"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default Pagination;
