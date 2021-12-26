import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Card,
  Image,
  Button,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../Redux/actions/cart";
import CartItem from "../components/cart/CartItem";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";
import Meta from "../components/UI/Meta";

const CartScreen = () => {
  const [searchParams, setSearchparams] = useSearchParams();
  const { id } = useParams();
  const qty = parseInt(searchParams.get("qty"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.cart);
  // console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const chngQty = (nid, nqty) => {
    dispatch(addToCart(nid, nqty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Meta title='Your Cart' />
      {cartItems && cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup>
                {cartItems.map((el) => (
                  <ListGroup.Item key={el.product}>
                    <CartItem
                      item={el}
                      chngQty={chngQty}
                      remove={removeHandler}
                    />
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <Link to='/'>Add more</Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className='bg-transparent shadow'>
                <Card.Body>
                  <h4>
                    <span className='me-1'> Subtotal</span>
                    {loading ? (
                      <Spinner animation='border' size='sm' />
                    ) : (
                      cartItems.reduce(
                        (acc, item) => acc + parseInt(item.qty),
                        0
                      )
                    )}
                    <span className='ms-1'>Items</span>
                  </h4>

                  <h5>
                    <span className='me-1'>$</span>
                    {loading ? (
                      <Spinner animation='border' size='sm' />
                    ) : (
                      <span>
                        {cartItems
                          .reduce(
                            (acc, item) =>
                              acc + item.price * parseInt(item.qty),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    )}
                  </h5>
                  <div className='d-flex'>
                    <Button onClick={checkoutHandler} className='btn-lr w-100'>
                      Proceed to checkout
                      <i className='ms-1 fas fa-caret-right'></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default CartScreen;
