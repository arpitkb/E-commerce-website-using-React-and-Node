import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <>
      <Card className='my-1 p-1 bg-transparent shadow'>
        <Link to={`/product/${product._id}`}>
          <Card.Img
            style={{ maxHeight: "16rem" }}
            fluid='true'
            alt={product.name}
            variant='top'
            src={product.image}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as='h3'>$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductItem;
