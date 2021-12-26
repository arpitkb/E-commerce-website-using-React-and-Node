import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../UI/Loader";

const PrivateRoute = ({ component, auth: { user, loading } }) => {
  if (loading) return <Loader />;
  if (user) return component;

  return <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
