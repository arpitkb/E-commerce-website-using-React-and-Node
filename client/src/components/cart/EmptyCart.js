import React from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";

const EmptyCart = () => {
  return (
    <div className='d-flex flex-column mt-5 align-items-center'>
      <h3>Hey, it feels so light!</h3>
      <p>There's nothing in your cart let's add some items</p>
      <Link to='/' className='btn btn-info'>
        Add items
      </Link>
    </div>
  );
};

export default EmptyCart;
