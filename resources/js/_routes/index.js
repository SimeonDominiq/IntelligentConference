import React, { Component } from "react";
import { Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import routes from "./Routes";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

class Routes extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;

        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routes.map((route, i) => {
                        if (route.auth) {
                            return (
                                <ProtectedRoute
                                    key={i}
                                    isgeneral={route.general}
                                    isadmin={route.admin}
                                    {...route}
                                />
                            );
                        } else {
                            return <PublicRoute key={i} {...route} />;
                        }
                    })}
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
const connectedPage = connect(mapStateToProps)(Routes);
export { connectedPage as Routes };
