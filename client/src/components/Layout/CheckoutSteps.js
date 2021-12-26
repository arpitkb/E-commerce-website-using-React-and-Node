import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ s1, s2, s3, s4 }) => {
  return (
    <Nav fill='sm' className='justify-content-center mt-3 nav-tabs'>
      <Nav.Item>
        {s1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {s2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Address</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {s3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {s4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Place order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
