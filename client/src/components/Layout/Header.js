import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../Redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  const guestItems = (
    <>
      <LinkContainer to='/login'>
        <Nav.Link>Sign in</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/register'>
        <Nav.Link>
          Sign up <i className='fas fa-user-plus'></i>
        </Nav.Link>
      </LinkContainer>
    </>
  );

  const authItems = (
    <>
      <NavDropdown
        title={
          <>
            {user && user.name + " "}
            <i className='fas fa-user'></i>
          </>
        }
        id='navbarScrollingDropdown'
      >
        <LinkContainer to='/profile'>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        {/* <NavDropdown.Divider /> */}

        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const adminItems = (
    <>
      <NavDropdown
        title={
          <>
            <span>Admin</span>
            <i className='fas fa-user-shield ms-1'></i>
          </>
        }
        id='admin'
      >
        <LinkContainer to='/admin/users'>
          <NavDropdown.Item>Users</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/products'>
          <NavDropdown.Item>Products</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to='/admin/orders'>
          <NavDropdown.Item>Orders</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );

  return (
    <div>
      <Navbar
        className='bg-nav shadow-lg'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <i className='fas fa-shopping-basket'></i> Shopzone
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='my-2 my-lg-0 ms-auto'
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {user && authItems}
              {!user && guestItems}
              {user && user.isAdmin && adminItems}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
