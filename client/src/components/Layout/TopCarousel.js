import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Carousel, Image } from "react-bootstrap";
import { getTopProducts } from "../../Redux/actions/prod";
import Loader from "../UI/Loader";

const TopCarousel = () => {
  const dispatch = useDispatch();
  const { toperr, toploading, top } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  return (
    <div>
      {toploading && <Loader />}
      {toperr && <Alert className='alert-fail'>{toperr}</Alert>}
      <Carousel variant='dark' className='mb-2'>
        {top &&
          top.length > 0 &&
          top.map((el) => (
            <Carousel.Item key={el._id} className='text-center'>
              <Link to={`/product/${el._id}`}>
                <Image fluid className='img-car' src={el.image} alt={el.name} />
              </Link>
              <Carousel.Caption className='mt-2'>
                <h5>{el.name}</h5>
                <p>{el.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default TopCarousel;
