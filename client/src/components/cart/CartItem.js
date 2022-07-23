import React from "react";
import { Col, Image, Row, Spinner, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartItem = ({ item, chngQty, remove }) => {
  const { loading } = useSelector((state) => state.cart);

  // const addOne = () => {
  //   chngQty(item.product, parseInt(item.qty) + 1);
  // };

  // extra code
  
  // const removeOne = () => {
  //   if (item.qty === 1) return;
  //   chngQty(item.product, parseInt(item.qty) - 1);
  // };

  const chngAmt = (e) => {
    chngQty(item.product, e.target.value);
  };

  const removeItem = () => {
    remove(item.product);
  };

  return (
    <Row className='mb-4 mb-xs-3 p-2 align-items-center'>
      <Col xs={6} md={3} lg={2}>
        <Image className='rb1' fluid src={item.image} alt={item.name}></Image>
      </Col>
      <Col xs={6} sm={6} className='my-lg-auto p-0' md={7} lg={3}>
        <strong className='mb-2 mb-lg-0'>{item.name}</strong>
        <div>${item.price}</div>
      </Col>
      <Col
        xs={3}
        sm={2}
        md={4}
        lg={2}
        className='my-auto mt-xs-0 px-0 pt-3 d-flex flex-xs-column'
      >
        <div className='mx-auto'>
          <i className='fas fa-2x fa-shopping-cart position-relative'>
            <span className='position-absolute top-0 start-100 translate-middle mybadge'>
              {loading ? (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                item.qty
              )}
            </span>
          </i>
        </div>
      </Col>

      <Col xs={8} sm={7} md={7} lg={5} className='my-auto pt-3 mt-xs-0 d-flex'>
        <div>
          <Form.Select
            as='select'
            size='sm'
            onChange={chngAmt}
            value={item.qty}
          >
            {[...Array(item.countInStock).keys()].map((el) => (
              <option key={el} value={el + 1}>
                {el + 1}
              </option>
            ))}
          </Form.Select>
        </div>
        <Button onClick={removeItem} className='btn-sm btn-danger ms-3'>
          <i className='fas fa-trash'></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
