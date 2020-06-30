import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../redux/actions/authUserActions";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
export default PrivateRoute;
