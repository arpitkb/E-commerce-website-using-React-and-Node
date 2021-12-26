import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner, Table } from "react-bootstrap";
import {
  Link,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUserOrders,
  updateUserDetails,
} from "../../Redux/actions/user";
import Alertt from "../../components/Layout/Alert";
import Loader from "../../components/UI/Loader";
import formatDate from "../../utils/formatdate";
import Meta from "../../components/UI/Meta";

const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserProfileScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, profileLoading, orders, orderLoading } = useSelector(
    (state) => state.admin
  );

  //form handling
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
  });
  const [isAdmin, setIsAdmin] = useState(user && user.isAdmin);

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserOrders(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFormData({
      name: user && user.name,
      email: user && user.email,
      isAdmin: user && user.isAdmin,
    });
    setIsAdmin(user && user.isAdmin);
  }, [user]);

  const [touched, setTouched] = useState(false);
  const { name, email } = formData;
  const emailInvalid = touched && !mailReg.test(email);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAdmin = () => {
    if (
      !isAdmin &&
      window.confirm(
        "Are you sure you want to make this user admin? this user can reomove you from admin afterwards!"
      )
    ) {
      setIsAdmin(!isAdmin);
    } else {
      setIsAdmin(!isAdmin);
    }
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!mailReg.test(email) || name.trim().length === 0) {
      return;
    } else {
      setTouched(false);
      dispatch(
        updateUserDetails(
          {
            name,
            email,
            isAdmin,
          },
          id
        )
      );
    }
  };

  return (
    <>
      <Meta title='Admin | Update user' />
      <Row className='justify-content-center'>
        <Col md={6} className=''>
          <div className='text-lg'>User Profile</div>
          <Form onSubmit={formSubmissionHandler} className='py-3'>
            {error && <Alertt variant='danger'>{error}</Alertt>}
            {/* {success && <Alertt variant='success'>Profile updated</Alertt>} */}
            {profileLoading && <Loader />}
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
            <div className='form-check my-4 ms-2 form-switch'>
              <input
                className={`form-check-input ${
                  isAdmin ? "bg-success" : "bg-info"
                }`}
                type='checkbox'
                role='switch'
                id='admin'
                name='admin'
                value={isAdmin}
                checked={isAdmin}
                onChange={toggleAdmin}
              />
              <label class='form-check-label' for='admin'>
                {isAdmin ? "Remove as admin" : "Make admin"}
              </label>
            </div>
            <Button className='btn-lr btn-s' variant='success' type='submit'>
              {profileLoading && (
                <Spinner
                  className='me-2'
                  as='span'
                  animation='grow'
                  size='sm'
                />
              )}
              <span>{!profileLoading ? "Update" : "Updating"}</span>
            </Button>
          </Form>
        </Col>
        <Col md={11} className='mt-5'>
          <div className='mb-4'>
            <div className='text-lg'>User orders</div>
            {orderLoading && <Loader />}
          </div>
          {!orderLoading && (
            <>
              {orders && orders.length > 0 ? (
                <Table responsive='md' className='striped bordered table-hover'>
                  <thead className='mb-3'>
                    <tr>
                      <th scope='col-3'>ORDER-ID</th>
                      <th scope='col-3'>ORDER-DATE</th>
                      <th scope='col-3'>AMOUNT</th>
                      <th scope='col-1'>PAID</th>
                      <th scope='col-2'>DELIVERED</th>
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
                            View details
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
                  <p className='text-muted2'>User don't have any orders</p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>{" "}
    </>
  );
};

export default UserProfileScreen;
