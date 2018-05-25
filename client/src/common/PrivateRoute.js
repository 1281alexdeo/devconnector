import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Componenet, auth, ...rest }) => (
  //...rest means also take any other properties as props
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Componenet {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

//use proptypes
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(PrivateRoute);
