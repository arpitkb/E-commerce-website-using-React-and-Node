import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, getProduct } from "../../Redux/actions/prod";
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

const UpdateProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.productDetail);
  const { errorcu } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    countInStock: 0,
  });

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
      });
    }
  }, [product]);

  const { name, brand, price, category, description, countInStock } = formData;

  const chngHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(id, formData, navigate));
  };

  return (
    <>
      <Meta title='Admin | Update Product' />
      <Row className='justify-content-center'>
        <div className='mb-4'>
          {" "}
          <h3 className='my-3'>Update</h3>
          {loading && <Loader />}
          <Link className='my-4' to='/admin/products'>
            Go back
          </Link>
          {errorcu && <p className='text-danger'>{errorcu}</p>}
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
            <Button type='submit' className='my-3 btn-lr'>
              Update
            </Button>
          </Form>
        </Col>
      </Row>{" "}
    </>
  );
};

export default UpdateProductScreen;
