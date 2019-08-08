import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({
    component: Component,
    isgeneral,
    isadmin,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => {
            const currentUser = localStorage.getItem("user");
            if (currentUser == null) {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                );
            }

            // check if route is restricted by role
            if (
                !isgeneral &&
                ((isadmin && currentUser.user.role != 4) ||
                    (!isadmin && currentUser.user.role == 4))
            ) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: "/dashboard" }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

export default ProtectedRoute;
