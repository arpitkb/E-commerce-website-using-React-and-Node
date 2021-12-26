import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Spinner className='me-1' animation='grow' variant='primary' />
      <Spinner className='mx-2' animation='grow' variant='warning' />
      <Spinner className='ms-1' animation='grow' variant='success' />
    </>
  );
};

export default Loader;
