import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      {/* <Container> */}
      <Row className='py-3 bg-dark text-center'>
        <Col>Copyright &copy; Shopzone</Col>
      </Row>
      {/* </Container> */}
    </footer>
  );
};

export default Footer;
