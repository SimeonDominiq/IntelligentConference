import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../../_actions";

function MainLayout(props) {
    const { alert, user } = props;

    const handleLogout = event => {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        const logoutConfirm = window.confirm("Do you really want to Sign Out?");
        if (logoutConfirm) {
            props.signOut(token);
        }
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center my-4">
                    <div className="col-xl-12 col-lg-12 col-md-9 mt-2">
                        <div className="row">
                            <div className="col-md-7">
                                <h3>
                                    Welcome{" "}
                                    {(user && user.firstName) +
                                        " " +
                                        (user && user.lastName)}
                                </h3>
                            </div>
                            <div className="col-md-5">
                                <div className="d-flex justify-content-end headerLinks">
                                    <Link to="/dashboard">Dashboard</Link> ||{" "}
                                    <Link to="#" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {alert.message && (
                            <div className={`mb-3 alert ${alert.type}`}>
                                {alert.message}
                            </div>
                        )}
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    const { alert } = state;
    const { user } = state.authentication;
    return {
        alert,
        user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: cred => dispatch(signOut(cred))
    };
};

const connectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout);

export { connectedPage as MainLayout };
