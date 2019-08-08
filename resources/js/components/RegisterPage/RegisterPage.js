import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../_actions";
import useValitedForm from "../../_validator/FormValidation";
import { RegisterValidation } from "../../_validator";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
};

function RegisterPage(props) {
    const { alert, isloading } = props;

    const [formData, validation, validateForm, getData] = useValitedForm(
        initialState,
        RegisterValidation
    );

    const handleSubmit = event => {
        event.preventDefault();
        const valid = validateForm();

        if (valid) {
            props.signUp(getData());
        }
    };

    const hasError = field => validation.errors[field].length > 0;

    return (
        <Fragment>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">
                                            Create an Account!
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
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="form-group row">
                                            <div
                                                className={`col-sm-6 mb-3 mb-sm-0 ${
                                                    hasError("firstName")
                                                        ? "validate-error"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control form-control-user"
                                                    placeholder="First Name"
                                                    {...formData.firstName
                                                        .input}
                                                />
                                                <span className="validated-form__errors">
                                                    {validation.errors.firstName.indexOf(
                                                        "required"
                                                    ) > -1
                                                        ? "Please Enter First Name!"
                                                        : ""}
                                                </span>
                                            </div>
                                            <div
                                                className={`col-sm-6 ${
                                                    hasError("lastName")
                                                        ? "validate-error"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control form-control-user"
                                                    placeholder="Last Name"
                                                    {...formData.lastName.input}
                                                />
                                                <span className="validated-form__errors">
                                                    {validation.errors.lastName.indexOf(
                                                        "required"
                                                    ) > -1
                                                        ? "Please Enter Last Name!"
                                                        : ""}
                                                </span>
                                            </div>
                                        </div>
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
                                                className="form-control form-control-user"
                                                placeholder="Email Address"
                                                {...formData.email.input}
                                            />
                                            <span className="validated-form__errors">
                                                {validation.errors.email.indexOf(
                                                    "required"
                                                ) > -1
                                                    ? "Email is Required!"
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
                                                hasError("phoneNumber")
                                                    ? "validate-error"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                className="form-control form-control-user"
                                                placeholder="Phone Number"
                                                {...formData.phoneNumber.input}
                                            />
                                            <span className="validated-form__errors">
                                                {validation.errors.phoneNumber.indexOf(
                                                    "required"
                                                ) > -1
                                                    ? "Please Enter phone number!"
                                                    : ""}
                                                {validation.errors.phoneNumber.indexOf(
                                                    "minLength"
                                                ) > -1
                                                    ? "Invalid phone Number!"
                                                    : ""}
                                            </span>
                                        </div>
                                        <div className="form-group row">
                                            <div
                                                className={`col-sm-6 mb-3 mb-sm-0  ${
                                                    hasError("password")
                                                        ? "validate-error"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Password"
                                                    {...formData.password.input}
                                                />
                                                <span className="validated-form__errors">
                                                    {validation.errors.password.indexOf(
                                                        "required"
                                                    ) > -1
                                                        ? "Password is Required!"
                                                        : ""}
                                                    {validation.errors.password.indexOf(
                                                        "minLength"
                                                    ) > -1
                                                        ? "Minimum of six (6) Characters!"
                                                        : ""}
                                                </span>
                                            </div>
                                            <div
                                                className={`col-sm-6  ${
                                                    hasError("confirmPassword")
                                                        ? "validate-error"
                                                        : ""
                                                }`}
                                            >
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    className="form-control form-control-user"
                                                    placeholder="Confirm Password"
                                                    {...formData.confirmPassword
                                                        .input}
                                                />
                                                <span className="validated-form__errors">
                                                    {validation.errors.confirmPassword.indexOf(
                                                        "required"
                                                    ) > -1
                                                        ? "Password Confirmation is Required!"
                                                        : ""}
                                                    {validation.errors.confirmPassword.indexOf(
                                                        "compareFields"
                                                    ) > -1
                                                        ? "Passwords do not match!"
                                                        : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-user btn-block"
                                                disabled={
                                                    !validation.valid ||
                                                    isloading
                                                }
                                            >
                                                {isloading
                                                    ? "Please wait..."
                                                    : "Create Account"}
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
                                        <Link className="small" to="/login">
                                            Already have an account? Login!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    const { alert } = state;
    const { isloading } = state.registration;
    return {
        alert,
        isloading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: creds => dispatch(signUp(creds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage);
