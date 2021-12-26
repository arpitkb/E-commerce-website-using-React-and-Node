import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../UI/Loader";

const AdminRoute = ({ component, auth: { user, loading } }) => {
  if (loading) return <Loader />;
  if (user && user.isAdmin) return component;

  return <Navigate to='/login' />;
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
