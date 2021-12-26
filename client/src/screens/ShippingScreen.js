import React, { useState } from "react";
import { Button, Col, Form, Row, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../Redux/actions/cart";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/Layout/CheckoutSteps";
import Meta from "../components/UI/Meta";
import countryList from "../utils/coutryList";

const postalRegex = /^[1-9][0-9]{5}$/;

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    address: shippingAddress.address || "",
    postalCode: shippingAddress.postalCode || "",
    city: shippingAddress.city || "India",
    country: shippingAddress.country || "",
  });
  const [touched, setTouched] = useState(false);

  const { address, postalCode, city, country } = formData;

  const chngHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setTouched(true);
    if (
      address.trim().length === 0 ||
      city.trim().length === 0 ||
      country.trim().length === 0 ||
      !postalRegex.test(postalCode)
    ) {
      return;
    } else {
      setTouched(false);
      dispatch(saveAddress(formData));
      navigate("/payment");
      //   console.log("ok");
    }
  };

  return (
    <>
      <Meta title='Checkout' />
      <Row className='justify-content-center'>
        <Col md={10} className='d-flex d-sm-block justify-content-center'>
          <CheckoutSteps s1 s2 />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md={8}>
          <div className='text-lg py-3'>Shipping Address</div>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='address'
                value={address}
                onChange={chngHandler}
                type='text'
                placeholder='Enter address'
              />
              {touched && address.trim().length === 0 && (
                <Form.Text className='error-text'>
                  Please enter a valid Address
                </Form.Text>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name='city'
                    value={city}
                    onChange={chngHandler}
                    type='text'
                    placeholder='Enter city'
                  />
                  {touched && city.trim().length === 0 && (
                    <Form.Text className='error-text'>
                      Please enter a city
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='postalCode'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    name='postalCode'
                    value={postalCode}
                    onChange={chngHandler}
                    type=''
                    placeholder='Enter Postal Code'
                  />
                  {touched && !postalRegex.test(postalCode) && (
                    <Form.Text className='error-text'>
                      Invalid Postal Code
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <FloatingLabel controlId='floatingSelectGrid' label='Country'>
              <Form.Select
                value={country}
                name='country'
                onChange={chngHandler}
                aria-label='Floating label select example'
              >
                {countryList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            {touched && country.trim().length === 0 && (
              <Form.Text className='error-text'>
                Please enter a country
              </Form.Text>
            )}
            <div className='d-flex'>
              <Button className='mt-2 btn-sx ms-auto' type='submit'>
                continue <i className='fas fa-angle-double-right'></i>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>{" "}
    </>
  );
};

export default ShippingScreen;
