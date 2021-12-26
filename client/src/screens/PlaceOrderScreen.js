import React, { useEffect } from "react";
import { Button, Col, Row, ListGroup, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/Layout/CheckoutSteps";
import Alertt from "../components/Layout/Alert";
import { createOrder } from "../Redux/actions/order";
import Loader from "../components/UI/Loader";
import Meta from "../components/UI/Meta";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // calculate prices
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  cart.shippingPrice = cart.itemsPrice < 100 ? 50 : 0;

  cart.taxPrice = Number(0.03 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const { order, error, success, loading } = useSelector(
    (state) => state.order
  );

  const doPaymentHandler = () => {
    if (paymentMethod === "PayPal") {
      navigate("/payment/paypal");
    } else {
      alert("Please select a payment mode");
    }
  };

  const cancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel the order?")) {
      navigate("/cart");
    }
  };

  return (
    <>
      <Meta title='Checkout' />
      <Row className='justify-content-center'>
        <Col md={10} className='d-flex d-sm-block justify-content-center'>
          <CheckoutSteps s1 s2 s3 s4 />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col md={8}>
          <ListGroup variant='flush' className='p-2 mb-3'>
            <ListGroup.Item>
              <h1 className='text-lg1'>Shipping Address</h1>
              <p className='py-0 my-0 text-muted3'>
                {shippingAddress.address}, {shippingAddress.city}
              </p>
              <p className='py-0 my-0 text-muted3'>
                {shippingAddress.country}, {shippingAddress.postalCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className='text-lg1'>Payment Method</h3>
              <p className='py-0 my-0 text-muted3'>{paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className='text-lg1'>Cart Items</h3>
              {cartItems.length === 0 ? (
                <Alertt variant='info'>Your cart is empty</Alertt>
              ) : (
                <ListGroup className='bg-dark' variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col className='pe-0' xs={1}>
                          {index + 1}
                        </Col>
                        <Col className='px-0'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={6}>
                          <div className='text-center'>
                            <span className='text-muted2'>
                              {" "}
                              {item.qty} X ${item.price} =
                            </span>
                            <span className='text-muted3'>
                              {" "}
                              ${item.qty * item.price}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <div className='text-lg1'>Order Summary</div>
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col className='text-muted3'>Items</Col>
                  <Col className='text-muted3'>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-muted3'>Shipping</Col>
                  <Col className='text-muted3'>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-muted3'>Tax</Col>
                  <Col className='text-muted3'>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-muted3'>Total</Col>
                  <Col className='text-muted3'>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && <Alertt variant='danger'>{error}</Alertt>}
              {loading && <Loader />}
              <ListGroup.Item className='d-grid'>
                <Button
                  type='button'
                  className='btn-block btn-lr btn-s mb-2'
                  disabled={cartItems.length === 0}
                  onClick={doPaymentHandler}
                  disabled={loading}
                >
                  <i className='fas fa-check'></i> Place order and Pay
                </Button>
                <Button
                  variant='dark'
                  className='btn-block btn-lr btn-s mb-2'
                  disabled={cartItems.length === 0}
                  onClick={cancelOrder}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
