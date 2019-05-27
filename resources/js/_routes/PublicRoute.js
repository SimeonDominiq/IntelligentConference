import React from "react";
import { Route } from "react-router";

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
);

export default PublicRoute;
