import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text }) => {
  return (
    <div className='my-2'>
      {value >= 1 ? (
        <i className='fas fa-star'></i>
      ) : value >= 0.5 ? (
        <i className='fas fa-star-half-alt'></i>
      ) : (
        <i className='far fa-star'></i>
      )}
      {value >= 2 ? (
        <i className='fas ms-1 fa-star'></i>
      ) : value >= 1.5 ? (
        <i className='fas ms-1 fa-star-half-alt'></i>
      ) : (
        <i className='far ms-1 fa-star'></i>
      )}
      {value >= 3 ? (
        <i className='fas ms-1 fa-star'></i>
      ) : value >= 2.5 ? (
        <i className='fas ms-1 fa-star-half-alt'></i>
      ) : (
        <i className='far ms-1 fa-star'></i>
      )}
      {value >= 4 ? (
        <i className='fas ms-1 fa-star'></i>
      ) : value >= 3.5 ? (
        <i className='fas ms-1 fa-star-half-alt'></i>
      ) : (
        <i className='far ms-1 fa-star'></i>
      )}
      {value >= 5 ? (
        <i className='fas ms-1 fa-star'></i>
      ) : value >= 4.5 ? (
        <i className='fas ms-1 fa-star-half-alt'></i>
      ) : (
        <i className='far ms-1 fa-star'></i>
      )}
      <div>{text && text}</div>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
};
export default Rating;
