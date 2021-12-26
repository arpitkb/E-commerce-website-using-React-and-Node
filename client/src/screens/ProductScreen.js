import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Alert,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import Rating from "../components/Product/Rating";
import { getProduct, addReview } from "../Redux/actions/prod";
import { useDispatch, useSelector } from "react-redux";
import Alertt from "../components/Layout/Alert";
import formatDate from "../utils/formatdate";
import Loader from "../components/UI/Loader";
import Meta from "../components/UI/Meta";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, reviewLoading, reviewError } = useSelector(
    (state) => state.productDetail
  );

  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    comment: "",
    rating: 3,
  });

  const { comment, rating } = data;

  const chngHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReview(id, data));
    setData({
      comment: "",
      rating: 3,
    });
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <Meta title={product ? product.name : "Loading.."} />
      <Button
        variant='secondary'
        onClick={() => navigate(-1)}
        className='btn-sx my-2'
      >
        Go back
      </Button>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : product ? (
        <>
          <Row className='mb-3'>
            <Col className='mb-4' md={6}>
              <Image fluid src={product.image} alt={product.name} />
            </Col>
            <Col md={3} className='d-flex flex-column'>
              <h4>{product.name}</h4>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <div> Price: ${product.price}</div>
              <div className='mt-3 me-auto'>{product.description}</div>
            </Col>
            <Col md={3} className='p-md-0'>
              <Row className='mt-3 mt-md-0 ms-md-2'>
                <Col xs={2} md={5}>
                  <strong>Price:</strong>
                </Col>
                <Col xs={5} md={7}>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
              <Row className='mt-3 mt-md-2 ms-md-2'>
                <Col xs={2} md={5}>
                  <strong>Status: </strong>
                </Col>
                <Col xs={5} md={7}>
                  {product.countInStock > 0 ? (
                    <strong className='text-success'>In stock </strong>
                  ) : (
                    <strong className='text-danger'>Out of stock </strong>
                  )}
                </Col>
              </Row>
              {product.countInStock > 0 && (
                <Row className='mt-3 mt-md-2 ms-md-2'>
                  <Col xs={2} md={4}>
                    <strong>Qty </strong>
                  </Col>
                  <Col xs={5} md={8}>
                    <Form.Select
                      as='select'
                      size='sm'
                      onChange={(e) => setQty(e.target.value)}
                      value={qty}
                    >
                      {[...Array(product.countInStock).keys()].map((el) => (
                        <option key={el} value={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              )}
              <Row className='mt-3 mt-md-0 ms-md-2'>
                <Col xs={6} md={12} className='mt-4'>
                  <Button
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    className='btn-s btn-dark btn-lr px-2 w-100'
                  >
                    <i className='fas fa-cart-plus'></i> Add to cart
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              {reviewLoading && <Loader />}
              {reviewError && (
                <Alert className='alert-fail'>{reviewError}</Alert>
              )}
              <h3 className='mb-3'>Reviews</h3>
              <ColoredLine color='rgba(39, 30, 161, 0.507)' />
              {product.reviews.length === 0 && <p>No reviews yet</p>}
              {product.reviews.map((r) => (
                <div key={r._id} className='mb-3'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Rating value={r.rating} />

                    <div className='text-muted2'>{formatDate(r.date)}</div>
                  </div>

                  <div className='text-muted3'>{r.comment}</div>
                  <div className='text-sm'>
                    <em>-by {r.name}</em>
                  </div>
                </div>
              ))}
            </Col>
            <Col md={2}></Col>
            {user && (
              <Col md={5} className='text-right'>
                <h3 className='mb-3'>Add a review</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Range
                      name='rating'
                      value={rating}
                      onChange={chngHandler}
                      min='0.5'
                      max='5'
                      step='0.5'
                    />
                  </Form.Group>

                  <FloatingLabel controlId='floatingTextarea2' label='Comments'>
                    <Form.Control
                      as='textarea'
                      placeholder='Leave a review here'
                      style={{ height: "70px" }}
                      required
                      name='comment'
                      value={comment}
                      onChange={chngHandler}
                    />
                  </FloatingLabel>
                  <Button
                    disabled={reviewLoading}
                    className='btn-lr btn-sx my-2'
                    type='submit'
                  >
                    {reviewLoading ? "Posting.." : "Post"}
                  </Button>
                </Form>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <Alertt variant='danger'>{error && error}</Alertt>
      )}
    </>
  );
};

export default ProductScreen;
