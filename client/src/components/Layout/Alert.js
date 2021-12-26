import React from "react";
import { Alert } from "react-bootstrap";

const Alertt = ({ variant, children }) => {
  return (
    <Alert className='py-2 bg-gradient' variant={variant}>
      {children}
    </Alert>
  );
};

Alertt.defaultProps = {
  variant: "primary",
};

export default Alertt;
