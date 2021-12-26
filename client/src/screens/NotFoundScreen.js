import React from "react";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <div
      style={{ height: "75vh" }}
      className='d-flex flex-column align-items-center justify-content-center'
    >
      <h1 className='display-3'>
        Error 4{" "}
        <span>
          <i className='fas fa-frown'></i>
        </span>{" "}
        4
      </h1>
      <h4>Page not found</h4>
      <Link className='btn btn-primary btn-sx' to='/'>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundScreen;
