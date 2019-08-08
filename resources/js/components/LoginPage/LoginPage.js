import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../_actions";
import { history } from "../../_helpers";
import useValitedForm from "../../_validator/FormValidation";
import { LoginValidation } from "../../_validator";

const initialState = {
    email: "",
    password: ""
};

function LoginPage(props) {
    const { alert, isloading } = props;

    const [formData, validation, validateForm, getData] = useValitedForm(
        initialState,
        LoginValidation
    );

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            history.push("/dashboard");
        }
    }, []);

    const submit = event => {
        event.preventDefault();
        const valid = validateForm();
        if (valid) {
            props.signIn(getData());
        }
    };
    const hasError = field => validation.errors[field].length > 0;

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-xl-10 col-lg-12 col-md-9 mt-5">
                        <div className="card o-hidden border-0 shadow-lg my-1">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                        {" "}
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-3">
                                                    Welcome Back!
                                                </h1>
                                            </div>
                                            {alert.message && (
                                                <div
                                                    className={`mb-3 alert ${
                                                        alert.type
                                                    }`}
                                                >
                                                    {alert.message}
                                                </div>
                                            )}
                                            <form
                                                className="user validated-form"
                                                noValidate={true}
                                                onSubmit={submit}
                                            >
                                                <div
                                                    className={`form-group  ${
                                                        hasError("email")
                                                            ? "validate-error"
                                                            : ""
                                                    }`}
                                                >
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter your email"
                                                        {...formData.email
                                                            .input}
                                                    />
                                                    <span className="validated-form__errors">
                                                        {validation.errors.email.indexOf(
                                                            "required"
                                                        ) > -1
                                                            ? "Please Enter Email!"
                                                            : ""}
                                                        {validation.errors.email.indexOf(
                                                            "isEmail"
                                                        ) > -1
                                                            ? "Please enter a valid Email!"
                                                            : ""}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`form-group  ${
                                                        hasError("password")
                                                            ? "validate-error"
                                                            : ""
                                                    }`}
                                                >
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        className="form-control form-control-user"
                                                        placeholder="Enter your password"
                                                        {...formData.password
                                                            .input}
                                                    />
                                                    <span className="validated-form__errors">
                                                        {validation.errors.password.indexOf(
                                                            "required"
                                                        ) > -1
                                                            ? "Please Enter Password!"
                                                            : ""}
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <button
                                                        className="btn btn-primary btn-user btn-block"
                                                        type="submit"
                                                        disabled={
                                                            !validation.valid ||
                                                            isloading
                                                        }
                                                    >
                                                        {isloading
                                                            ? "Please wait..."
                                                            : "Login"}
                                                    </button>
                                                </div>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <Link
                                                    className="small"
                                                    to="/resetpassword"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <div className="text-center">
                                                <Link
                                                    className="small"
                                                    to="/register"
                                                >
                                                    Create an Account!
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End of Card*/}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    const { alert } = state;
    const { isloading } = state.authentication;
    return {
        alert,
        isloading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: creds => dispatch(signIn(creds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
