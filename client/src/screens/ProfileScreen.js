import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Alert, Table } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/actions/auth";
import { getMyOrders } from "../Redux/actions/order";
import Loader from "../components/UI/Loader";
import formatDate from "../utils/formatdate";
import Meta from "../components/UI/Meta";
import SmallLoader from "../components/UI/SmallLoader";

const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

const ProfileScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success, uploading } = useSelector(
    (state) => state.auth
  );
  const { orders, loading: orderLoading } = useSelector(
    (state) => state.orders
  );

  // form handling
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    oldpassword: "",
    password: "",
    confPass: "",
  });
  const [touched, setTouched] = useState(false);
  const [passChng, setPassChng] = useState(false);

  // get all my orders
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  //   naviagte if not logged in
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [redirect, user, loading, navigate]);

  const togglePassChng = () => {
    setPassChng(!passChng);
  };

  const { name, email, password, confPass, oldpassword } = formData;

  const passInvalid =
    touched && !passReg.test(password) && password.trim().length > 0;

  const emailInvalid = touched && !mailReg.test(email);

  const passNotMatch = touched && confPass !== password;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);
    if (password.trim().length > 0 && oldpassword.trim().length === 0) {
      return;
    }

    if (
      (!passReg.test(password) && password.trim().length > 0) ||
      !mailReg.test(email) ||
      confPass !== password ||
      name.trim().length === 0
    ) {
      return;
    } else {
      setTouched(false);
      dispatch(updateUser({ email, name, oldpassword, password }));
      setFormData({
        ...formData,
        oldpassword: "",
        password: "",
        confPass: "",
      });
    }
  };

  return (
    <>
      <Meta title='User profile' />
      <Row className='justify-content-center'>
        <Col sm={8} md={3}>
          <div className='text-lg'>My profile</div>

          <Form onSubmit={formSubmissionHandler} className='py-3'>
            {uploading && (
              <div>
                <SmallLoader />
                <span>Updating</span>
              </div>
            )}
            {error && <Alert variant='danger'>{error}</Alert>}
            {success && (
              <Alert className='alert-succ py-1'>Profile updated</Alert>
            )}
            {loading && <Loader />}
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                value={name}
                onChange={changeHandler}
                name='name'
                type='name'
                placeholder='Enter name'
              />
              {touched && name.trim().length === 0 && (
                <Form.Text className='error-text'>
                  Please enter a name
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={changeHandler}
                name='email'
                type='email'
                placeholder='Enter email'
              />
              {emailInvalid && (
                <Form.Text className='error-text'>
                  Please enter a valid email
                </Form.Text>
              )}
            </Form.Group>

            {passChng && (
              <>
                <Form.Group className='mb-3' controlId='oldPassword'>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    name='oldpassword'
                    value={oldpassword}
                    onChange={changeHandler}
                    type='password'
                    placeholder='Previous password'
                  />
                  {touched &&
                    oldpassword.trim().length === 0 &&
                    password.trim().length > 0 && (
                      <Form.Text className='error-text'>
                        Please enter your old password
                      </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={changeHandler}
                    name='password'
                    type='password'
                    placeholder='Password'
                  />
                  <Form.Text className={passInvalid && "error-text"}>
                    Password should be 7 to 15 characters which contain at least
                    one numeric digit and a special character
                  </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='confPassword'>
                  <Form.Label>Confirm new Password</Form.Label>
                  <Form.Control
                    name='confPass'
                    value={confPass}
                    onChange={changeHandler}
                    type='password'
                    placeholder='Enter your password again'
                  />
                  {passNotMatch && (
                    <Form.Text className='error-text'>
                      Password do not match
                    </Form.Text>
                  )}
                </Form.Group>
              </>
            )}
            <Button className='btn-sm' variant='success' type='submit'>
              Update
            </Button>
            <Button
              onClick={togglePassChng}
              className='btn-sm ms-1'
              variant='info'
            >
              {!passChng ? (
                <i className='fas fa-angle-double-down'></i>
              ) : (
                <i className='fas fa-angle-double-up'></i>
              )}
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <div className='mb-4'>
            <div className='text-lg'>My orders</div>
            {orderLoading && <Loader />}
          </div>
          {!orderLoading && (
            <>
              {orders && orders.length > 0 ? (
                <Table responsive className='striped bordered table-hover'>
                  <thead>
                    <tr>
                      <th scope='col-3'>ORDER ID</th>
                      <th scope='col-3'>ORDER_DATE</th>
                      <th scope='col-2'>AMOUNT</th>
                      <th scope='col-2'>PAID</th>
                      <th scope='col-2'>Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id}>
                        <td>
                          {o._id}
                          <Link
                            className='text-muted2 px-2'
                            style={{ textDecoration: "underline" }}
                            to={`/order/${o._id}`}
                          >
                            <i className='vd fa-1-5x fas fa-angle-double-up'></i>
                          </Link>
                        </td>
                        <td>{formatDate(o.createdAt)} </td>
                        <td>$ {o.totalPrice} </td>
                        <td>
                          {o.isPaid ? (
                            <span className='text-success'>PAID</span>
                          ) : (
                            <span className='text-danger'>UNPAID</span>
                          )}{" "}
                        </td>
                        <td>
                          {o.isDelivered ? (
                            <span className='text-success'>YES</span>
                          ) : (
                            <span className='text-danger'>NO</span>
                          )}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className='text-center'>
                  <p className='text-muted2'>You don't have any orders</p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
