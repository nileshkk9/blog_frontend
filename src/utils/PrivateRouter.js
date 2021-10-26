import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = rest;
  return (
    <Route
      {...rest}
      render={props => {
        if (currentUser.role === "CONTENT-WRITER") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(PrivateRoute);