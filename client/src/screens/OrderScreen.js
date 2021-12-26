import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  ListGroup,
  Card,
  Button,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Alertt from "../components/Layout/Alert";
import { getOrder, deliverOrder } from "../Redux/actions/order";
import Loader from "../components/UI/Loader";
import Meta from "../components/UI/Meta";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { user } = useSelector((state) => state.auth);

  const markDeliveredHandler = () => {
    dispatch(deliverOrder(id));
  };

  useEffect(() => {
    dispatch(getOrder(id));
    window.addEventListener("beforeunload", function (e) {
      // Check if any of the input fields are filled
      if (window.confirm("Are you sure you want to leave")) {
        return;
      }
    });
  }, [dispatch, id]);

  return (
    <>
      <Meta title='Order Details' />
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Alert className='alert-fail py-2'>{error}</Alert>}
          {order && (
            <Row>
              <Col md={8}>
                <div className='d-flex align-items-center justify-content-between'>
                  <Button
                    className='btn-secondary btn-sx mb-2'
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <i className='fas fa-chevron-left'></i> Go back
                  </Button>
                  <Link to='/profile'>
                    My orders <i className='fas fa-shopping-bag'></i>
                  </Link>
                </div>
                <div className='display-6 mb-3'>
                  Order Details{" "}
                  {order && !order.isPaid && (
                    <span style={{ fontSize: "1.5rem" }}>
                      <OverlayTrigger
                        placement='right'
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Payment pending
                          </Tooltip>
                        }
                      >
                        <i className='fas fa-exclamation-triangle'></i>
                      </OverlayTrigger>
                    </span>
                  )}
                </div>
                <ListGroup variant='flush' className='p-2 mb-3'>
                  <div>
                    <ListGroup.Item className='text-muted'>
                      Order ID : {order._id}
                    </ListGroup.Item>
                  </div>
                  <ListGroup.Item>
                    <h1 className='text-lg1'>Shipping</h1>
                    <p className='py-0 my-0'>
                      <strong>Name : </strong>
                      {order.user.name.trim()}
                    </p>
                    <p className='py-0 my-0'>
                      <strong>Email : </strong>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email.trim()}
                      </a>
                    </p>
                    <p className='py-0 my-0'>
                      <strong>Address : </strong>
                      {order.shippingAddress.address.trim()},{" "}
                      {order.shippingAddress.city.trim()},{" "}
                      {order.shippingAddress.country.trim()},{" "}
                      {order.shippingAddress.postalCode.trim()}
                    </p>
                    {order.isDelivered ? (
                      <Alert className='alert-succ-bold mt-2'>
                        <i className='fas fa-check-circle'></i> Delivered on{" "}
                        {order.deliveredAt}
                      </Alert>
                    ) : (
                      <>
                        <Alert className='alert-fail-bold mt-2'>
                          <i className='fas fa-exclamation-triangle'></i> Not
                          yet Delivered
                        </Alert>
                        {user && user.isAdmin && (
                          <Button
                            variant='outline-light'
                            onClick={markDeliveredHandler}
                            className='btn-sm'
                          >
                            Mark as delivered
                          </Button>
                        )}
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h3 className='text-lg1'>Payment</h3>
                    <p className='py-0 my-0'>
                      <strong>Method : </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Alert className='alert-succ-bold mt-2'>
                        <i className='fas fa-check-circle'></i> Paid on{" "}
                        {order.paidAt}
                      </Alert>
                    ) : (
                      <>
                        <Alert className='alert-fail-bold mt-2'>
                          <i className='fas fa-exclamation-triangle'></i>{" "}
                          Payment pending
                        </Alert>
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h3 className='text-lg1'>Cart Items</h3>
                    {order.orderItems.length === 0 ? (
                      <Alertt variant='info'>Order is empty</Alertt>
                    ) : (
                      <ListGroup className='bg-dark' variant='flush'>
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index} className='my-0 py-2'>
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
                            <hr className='m-0 p-0'></hr>
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
                        <Col className='text-muted3'>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <hr className='m-0 p-0'></hr>
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-muted3'>Shipping</Col>
                        <Col className='text-muted3'>
                          ${order.shippingPrice}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <hr className='m-0 p-0'></hr>
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-muted3'>Tax</Col>
                        <Col className='text-muted3'>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <hr className='m-0 p-0'></hr>
                    <ListGroup.Item>
                      <Row>
                        <Col className='text-muted3'>Total</Col>
                        <Col className='text-muted3'>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default OrderScreen;
