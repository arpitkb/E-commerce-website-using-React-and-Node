import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../Redux/actions/order";

import axios from "../../axios";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/UI/Loader";
import CardHeader from "react-bootstrap/esm/CardHeader";
import Meta from "../components/UI/Meta";

const PaymentDo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.order);

  // calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  cart.shippingPrice = cart.itemsPrice < 100 ? 50 : 0;

  cart.taxPrice = Number(0.03 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    totalPrice,
    shippingPrice,
  } = cart;

  const paymentSuccessHandler = (paymentResult) => {
    dispatch(
      createOrder(
        paymentResult,
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          shippingPrice,
          taxPrice,
          itemsPrice,
          totalPrice,
        },
        navigate
      )
    );
  };

  const isValid =
    cartItems &&
    cartItems.length > 0 &&
    totalPrice !== 0 &&
    paymentMethod === "PayPal";

  useEffect(() => {
    const addPaypalSdk = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (isValid) {
      if (!window.paypal) {
        addPaypalSdk();
      } else {
        setSdkReady(true);
      }
    }
  }, [isValid]);

  return (
    <>
      <Meta title='Paypal' />
      {!isValid && <h3 className='text-center'>Invalid order</h3>}
      {error && <Alert className='alert-fail'>{error}</Alert>}
      {isValid && (
        <Row className='justify-content-center mt-5'>
          <Col md={5}>
            <Card>
              <Card.Header>
                <h2 className='text-center'>Pay Now</h2>
              </Card.Header>
              <Card.Body>
                {loading && (
                  <div className='d-flex justify-content-center'>
                    <Loader /> Initiating payment
                  </div>
                )}
                {!sdkReady ? (
                  <div className='d-flex justify-content-center'>
                    <Loader />
                  </div>
                ) : (
                  <PayPalButton
                    amount={totalPrice}
                    onSuccess={paymentSuccessHandler}
                  />
                )}
              </Card.Body>

              <Card.Footer>
                <em className='text-muted'>
                  Please do not refresh this page, some details might get lost!
                </em>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PaymentDo;
