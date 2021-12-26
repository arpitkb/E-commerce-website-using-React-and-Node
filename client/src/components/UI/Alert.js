import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => (
  <div className='container mt-2'>
    {alerts &&
      alerts.map((al) => (
        <div
          key={al.id}
          className={`alert alert-${
            al.alertType === "success" ? "succ" : "fail"
          }`}
          role='alert'
        >
          {al.alertType === "success" ? (
            <i className='fas fa-check-circle me-2'></i>
          ) : (
            <i className='fas fa-exclamation-triangle me-2'></i>
          )}

          {al.msg}
        </div>
      ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
