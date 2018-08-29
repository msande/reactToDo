import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserService } from "../services/UserService";

const isAuthenticated = UserService.info() ? true : false

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute;