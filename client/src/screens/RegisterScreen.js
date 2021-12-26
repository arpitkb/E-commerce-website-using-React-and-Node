import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/actions/auth";
import Alertt from "../components/Layout/Alert";
import Meta from "../components/UI/Meta";

const mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

const RegisterScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  // naviagte if registered

  useEffect(() => {
    if (user) {
      navigate(`/${redirect}`);
    }
  }, [redirect, user, navigate]);

  // form handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
  });
  const [touched, setTouched] = useState(false);

  const { name, email, password, confPass } = formData;

  const passInvalid = touched && !passReg.test(password);

  const emailInvalid = touched && !mailReg.test(email);

  const passNotMatch = touched && confPass !== password;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    setTouched(true);

    if (
      !passReg.test(password) ||
      !mailReg.test(email) ||
      confPass !== password ||
      name.trim().length === 0
    ) {
      return;
    } else {
      setTouched(false);
      dispatch(registerUser(name, email, password));
    }
  };

  return (
    <>
      <Meta title='Shopzone | Signup' />
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <div className='display-6'>Sign up</div>

          <Form onSubmit={formSubmissionHandler} className='pt-3 pb-1'>
            {error && <Alertt variant='danger'>{error}</Alertt>}
            {loading && (
              <div>
                <Spinner size='sm' animation='grow' variant='primary' />
                <Spinner
                  size='sm'
                  className='mx-1'
                  animation='grow'
                  variant='warning'
                />
                <Spinner size='sm' animation='grow' variant='success' />
                <span className='mx-1 text-warning'>Signing you up</span>
              </div>
            )}
            <FloatingLabel className='mb-2' label='Full name' controlId='name'>
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
            </FloatingLabel>
            <FloatingLabel
              controlId='email'
              label='Email address'
              className='mb-2'
            >
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
            </FloatingLabel>
            <FloatingLabel
              controlId='password'
              label='Set Password'
              className='mb-2'
            >
              <Form.Control
                value={password}
                onChange={changeHandler}
                name='password'
                type='password'
                placeholder='Password'
              />
              <Form.Text className={passInvalid && "error-text"}>
                Password should be 7 to 15 characters which contain at least one
                numeric digit and a special character
              </Form.Text>
            </FloatingLabel>

            <FloatingLabel
              className='mb-2'
              controlId='confPass'
              label='Confirm password'
            >
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
            </FloatingLabel>

            <Button
              disabled={loading}
              className='btn-s'
              variant='success'
              type='submit'
              style={{ width: "175px" }}
            >
              Sign up
            </Button>
          </Form>
          <Row>
            <Col>
              Already have an account ?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login <i className='fas fa-location-arrow'></i>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default RegisterScreen;
