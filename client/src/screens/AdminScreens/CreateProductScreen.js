import React, { useState } from "react";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/actions/prod";
import Loader from "../../components/UI/Loader";
import Meta from "../../components/UI/Meta";
const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Appliances",
  "Home and Kitchen",
  "Computers",
  "Grocery",
  "Movies and TV",
  "Sports",
  "Outdoor",
  "Arts, Crafts and Sewing",
];

const CreateProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorcu, loading } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    image: "",
    description: "",
    countInStock: 0,
  });

  const { name, brand, price, category, image, description, countInStock } =
    formData;

  const chngHandler = (e) => {
    if (e.target.files) {
      const img = e.target.files[0];
      setFormData({
        ...formData,
        image: img,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(formData, navigate));
  };

  return (
    <>
      <Meta title='Admin | create product' />

      <Row className='justify-content-center'>
        <div className='mb-4'>
          {" "}
          <h3 className='my-3'>Create product</h3>
          {!loading && (
            <Link className='my-2' to='/admin/products'>
              Go back
            </Link>
          )}
          {loading && (
            <div>
              <Loader />
              <div className='text-muted'>
                <em>Do not navigate back or refresh this page</em>
              </div>
            </div>
          )}
          {errorcu && !loading && <p className='text-danger'>{errorcu}</p>}
        </div>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Floating className='mb-3'>
              <Form.Control
                required
                id='name'
                name='name'
                value={name}
                onChange={chngHandler}
                type='text'
                placeholder='name'
              />
              <label htmlFor='name'>*Product name</label>
            </Form.Floating>
            <Row className='mb-3'>
              <Col>
                <Form.Floating>
                  <Form.Control
                    required
                    id='brand'
                    value={brand}
                    name='brand'
                    onChange={chngHandler}
                    type='text'
                    placeholder='brand'
                  />
                  <label htmlFor='brand'>*Brand</label>
                </Form.Floating>
              </Col>
              <Col>
                <FloatingLabel controlId='category' label='*Select a category'>
                  <Form.Select
                    onChange={chngHandler}
                    aria-label='category select'
                    name='category'
                    value={category}
                  >
                    <option>Open this select menu</option>
                    {categories.map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Group controlId='image' className=''>
                  <Form.Control
                    placeholder='choose image'
                    name='image'
                    type='file'
                    onChange={chngHandler}
                    accept='.jpg,.png,.jpeg'
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Floating>
                  <Form.Control
                    onChange={chngHandler}
                    required
                    value={price}
                    name='price'
                    id='price'
                    type='text'
                    placeholder='price'
                  />
                  <label htmlFor='price'>*Price</label>
                </Form.Floating>
              </Col>
              <Col>
                <Form.Floating>
                  <Form.Control
                    value={countInStock}
                    name='countInStock'
                    onChange={chngHandler}
                    id='countInStock'
                    type='number'
                    placeholder='countInStock'
                  />
                  <label htmlFor='countInStock'>Count in stock</label>
                </Form.Floating>
              </Col>
            </Row>
            <Form.Floating>
              <Form.Control
                onChange={chngHandler}
                required
                value={description}
                name='description'
                as='textarea'
                placeholder='Leave a description'
                style={{ height: "100px" }}
              />
              <label htmlFor='description'>*Product description</label>
            </Form.Floating>
            <Button type='submit' disabled={loading} className='my-3 btn-lr'>
              {loading ? "Creating..." : "Create"}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateProductScreen;
