import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/actions/cart";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/Layout/CheckoutSteps";
import Meta from "../components/UI/Meta";
import { Link } from "react-router-dom";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethd, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethd));
    navigate("/placeorder");
  };

  return (
    <>
      <Meta title='Checkout' />
      <Row className='justify-content-center'>
        <Col md={10} className='d-flex d-sm-block justify-content-center'>
          <CheckoutSteps s1 s2 s3 />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <div className='text-lg py-3'>Select payment method</div>
          <Form onSubmit={submitHandler}>
            <div className='mb-3'>
              <Form.Check
                type='radio'
                label='PayPal or credit card'
                id='paypal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethd === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </div>
            <div className='mb-3'>
              <Form.Check
                type='radio'
                label='UPI'
                disabled
                id='upi'
                name='paymentMethod'
                value='UPI'
                checked={paymentMethd === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </div>
            <div className='mb-3'>
              <Form.Check
                type='radio'
                label='Cash on delivery'
                id='cod'
                disabled
                name='paymentMethod'
                value='cod'
                checked={paymentMethd === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </div>
            <div className='d-flex'>
              <Link to='/shipping' className='mt-2 me-auto'>
                <i className='fas fa-angle-double-left'></i>
              </Link>
              <Button className='mt-2 btn-sx ms-auto' type='submit'>
                Continue <i className='fas fa-angle-double-right'></i>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>{" "}
    </>
  );
};

export default PaymentScreen;
