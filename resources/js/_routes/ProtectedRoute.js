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
            const user_role = 2;
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
                ((isadmin && user_role != 4) || (!isadmin && user_role == 4))
            ) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: "/dashboard" }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

function showUser(user) {
    console.log(user);
}

export default ProtectedRoute;
