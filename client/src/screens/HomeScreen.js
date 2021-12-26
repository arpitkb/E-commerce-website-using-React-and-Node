import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Pagination,
  Card,
  Form,
  Offcanvas,
  InputGroup,
} from "react-bootstrap";
import Meta from "../components/UI/Meta";
import ProductItem from "../components/Product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/prod";
import Alertt from "../components/Layout/Alert";
import Loader from "../components/UI/Loader";
import {
  useSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import TopCarousel from "../components/Layout/TopCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const { products, pages, page, loading, error } = useSelector(
    (state) => state.products
  );

  // for offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    addQuery("keyword", keyword);
    removeQuery("page");
  };

  const [formData, setFormData] = useState({
    sortby: "",
    from: 0,
    to: 10000,
    category: "",
  });

  const { from, to, category, sortby } = formData;

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
      let qstr = `sort=${sortby}&`;
      if (from) qstr += `price[gte]=${from}&`;
      if (to) qstr += `price[lte]=${to}&`;
      navigate(`?${qstr}`);
      setKeyword("");
      setShow(false);
    }
  };

  const removeFilter = () => {
    setFormData({
      sortby: "",
      from: "",
      to: "",
      category: "",
    });
    navigate("/");
  };

  return (
    <>
      <Meta />
      {qs === "" && <TopCarousel />}
      <>
        <hr className='p-0 m-0'></hr>
        <Row className='align-items-center bg-search'>
          <Col className='my-1' xs={3} sm='auto'>
            <Button className='' onClick={handleShow}>
              <i className='fas fa-sort'></i> Filters
            </Button>

            <Offcanvas className='bg-dark' show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Select filter</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form onSubmit={filterFormSubmitHandler}>
                  <legend className='mb-1'>Price range</legend>
                  <Form.Group controlId='from'>
                    <Form.Label>Minimum</Form.Label>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        className=''
                        name='from'
                        type='number'
                        value={from}
                        onChange={filterChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId='to'>
                    <Form.Label>Maximum</Form.Label>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        className=''
                        name='to'
                        type='number'
                        value={to}
                        onChange={filterChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId='$in' className='my-2'>
                    <Form.Label as='legend' className='mb-2'>
                      Sort by
                    </Form.Label>
                    <Form.Check
                      type='checkbox'
                      label={
                        <>
                          <i className='fas fa-sort-amount-down-alt'></i> Price
                        </>
                      }
                      name='sortby'
                      value='price'
                      onChange={filterChange}
                      className='mx-2'
                    />
                    <Form.Check
                      type='checkbox'
                      label={
                        <>
                          <i className='fas fa-sort-amount-down'></i> Price
                        </>
                      }
                      name='sortby'
                      id='$dec'
                      value='-price'
                      onChange={filterChange}
                      className='mx-2'
                    />
                    <Form.Check
                      type='checkbox'
                      label={
                        <>
                          <i className='fas fa-sort-amount-down-alt'></i>{" "}
                          Ratings
                        </>
                      }
                      name='sortby'
                      id='rinc'
                      value='rating'
                      onChange={filterChange}
                      className='mx-2'
                    />
                    <Form.Check
                      type='checkbox'
                      label={
                        <>
                          <i className='fas fa-sort-amount-down'></i> Ratings
                        </>
                      }
                      name='sortby'
                      id='rdec'
                      value='-rating'
                      onChange={filterChange}
                      className='mx-2'
                    />
                  </Form.Group>
                  <Button className='btn-lr btn-sx' type='submit'>
                    <i className='fas fa-filter'></i> Apply
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
          <Col xs={9} sm='auto'>
            <Form onSubmit={searchHandler}>
              <InputGroup className=''>
                <InputGroup.Text className='px-2'>
                  <i className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Control
                  id='keyword'
                  name='keyword'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder='search keyword'
                />
                <Button variant='secondary' type='submit'>
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col className='d-grid d-sm-block' xs={12} sm='auto'>
            <Button variant='light' onClick={removeFilter}>
              Clear filters
            </Button>
          </Col>
        </Row>
        <hr className='p-0 m-0'></hr>
        <h2 className='mt-2'>Latest Products</h2>
        {loading && (
          <div className='mt-2'>
            <Loader />
          </div>
        )}
        {!loading && products.length === 0 && <p>Sorry no results found</p>}
        {!loading && products ? (
          <>
            <Row>
              {products.map((el) => (
                <Col xs={12} sm={6} lg={4} xl={4} key={el._id}>
                  <ProductItem key={el._id} product={el} />
                </Col>
              ))}
            </Row>
            <div className='d-flex'>
              {pages > 1 && (
                <Pagination className='mt-5 mx-auto'>
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
        ) : (
          <>{error && <Alertt variant='danger'>{error}</Alertt>}</>
        )}
      </>
    </>
  );
};

export default HomeScreen;
