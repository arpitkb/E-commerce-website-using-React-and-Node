import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Col,
  Pagination,
  Row,
  Table,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../Redux/actions/prod";
import Loader from "../../components/UI/Loader";
import Meta from "../../components/UI/Meta";

const categories = [
  "",
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

const ProductsListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { products, pages, page, loading, error } = useSelector(
    (state) => state.products
  );

  const qs = location.search || "";

  useEffect(() => {
    dispatch(getProducts(qs));
  }, [dispatch, qs]);

  const addQuery = (key, value) => {
    let searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`);
  };
  const removeQuery = (key) => {
    let searchParams = new URLSearchParams(location.search);
    if (!searchParams.has(key)) return;
    searchParams.delete(key);
    navigate(`?${searchParams.toString()}`);
  };

  const [formData, setFormData] = useState({
    sort: "",
    from: 0,
    to: 10000,
    category: "",
  });

  const { from, to, category, sort } = formData;

  const filterChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    if (Number(to) < Number(from)) return;
    else {
      let qstr = "";
      if (sort != "") qstr = `sort=${sort}&`;
      if (from) qstr += `price[gte]=${from}&`;
      if (to) qstr += `price[lte]=${to}&`;
      if (category != "") qstr += `category=${category}&`;
      navigate(`/admin/products?${qstr}`);
      // setKeyword("");
    }
  };

  const removeFilter = () => {
    setFormData({
      sort: "",
      from: "",
      to: "",
      category: "",
    });
    navigate("/admin/products");
  };

  const deleteHandler = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone!"
      )
    ) {
      if (window.confirm("Seriously???")) {
        dispatch(deleteProduct(id));
      }
    }
  };

  return (
    <>
      <Meta title='Admin | Products' />
      <Row className='mb-3 align-items-center'>
        <Col sm={3} className='display-6 mb-3 mb-sm-0'>
          Products
        </Col>
        <Col sm={9} className='d-sm-flex'>
          <Link
            to='/admin/products/new'
            className='ms-sm-auto btn btn-lr btn-sx1'
          >
            <i className='fas fa-plus me-2'></i>
            Create a product
          </Link>
        </Col>
      </Row>
      <Form onSubmit={filterFormSubmitHandler} className='mb-2'>
        <Row className='align-items-center justify-content-between'>
          <Col xs={6} sm={3} className='my-1'>
            <FloatingLabel controlId='sort' label='Sort by'>
              <Form.Select
                onChange={filterChange}
                name='sort'
                aria-label='sort by what?'
              >
                <option value=''>Default</option>
                <option value='price'>Price</option>
                <option value='rating'>Rating</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={3} className='my-1'>
            <FloatingLabel controlId='category' label='Category'>
              <Form.Select
                onChange={filterChange}
                name='category'
                aria-label='which category?'
              >
                {categories.map((el) => (
                  <option key={el + "56"} value={el}>
                    {el === "" ? "Any" : el}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={2} className='my-1'>
            <FloatingLabel controlId='price' label='Min. price'>
              <Form.Control
                onChange={filterChange}
                value={from}
                type='number'
                name='from'
                placeholder='min price'
              />
            </FloatingLabel>
          </Col>
          <Col xs={6} sm={2} className='my-1'>
            <FloatingLabel controlId='price' label='Max. price'>
              <Form.Control
                onChange={filterChange}
                value={to}
                type='number'
                name='to'
                placeholder='max price'
                min='20'
              />
            </FloatingLabel>
          </Col>
          <Col xs='auto' className='my-1 d-flex px-0'>
            <Button className='btn-lr btn-sx me-1' type='submit'>
              Apply
            </Button>
            <Button className='btn-lr btn-sx ms-1' onClick={removeFilter}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
      {loading && <Loader />}
      {error && <Alert className='alert-fail-bold my-3'>{error}</Alert>}
      <div className='admin-product'>
        <Table responsive hover>
          <thead>
            <tr>
              <th scope='col-3'>ID</th>
              <th scope='col-2'>NAME</th>
              <th scope='col-3'>PRICE</th>
              <th scope='col-2'>CATEGORY</th>
              <th scope='col-2'>BRAND</th>
              <th scope='col-2'>OPTIONS</th>
            </tr>
          </thead>
          <tbody className='my-3'>
            {products.length === 0 && (
              <tr>
                <td>No results found</td>
              </tr>
            )}
            {products &&
              products.length > 0 &&
              products.map((p) => (
                <tr className='tab1' key={p._id}>
                  <td>
                    <Link to={`/product/${p._id}`}>
                      <i className='fas fa-location-arrow'></i>
                      {p._id}
                    </Link>
                  </td>
                  <td>{p.name.trim()} </td>
                  <td>${p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td className='px-0 pt-2 m-0'>
                    <Link className='my-0 mx-1' to={`/admin/products/${p._id}`}>
                      <Button className='btn-sm m-0'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      className='my-0 mx-1 btn-sm btn-danger'
                      onClick={() => deleteHandler(p._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-center fixed-bottom'>
        {pages && pages > 1 && (
          <Pagination>
            {[...Array(pages).keys()].map((p) => (
              <Pagination.Item
                key={p + 1}
                onClick={() => addQuery("page", `${p + 1}`)}
                active={page === p + 1}
              >
                {p + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>
    </>
  );
};

export default ProductsListScreen;
