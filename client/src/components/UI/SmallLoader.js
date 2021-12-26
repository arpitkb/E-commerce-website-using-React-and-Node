import React from "react";
import { Spinner } from "react-bootstrap";

const SmallLoader = () => {
  return (
    <>
      <Spinner size='sm' animation='grow' variant='primary' />
      <Spinner className='mx-1' size='sm' animation='grow' variant='warning' />
      <Spinner className='me-1' size='sm' animation='grow' variant='success' />
    </>
  );
};

export default SmallLoader;
