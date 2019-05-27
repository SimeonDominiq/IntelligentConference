import React from "react";
import { connect } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import useValitedForm from "../../_validator/FormValidation";
import { ConferenceValidation } from "../../_validator";
import { addConference } from "../../_actions";

const initialState = {
    title: "",
    description: "",
    startDate: "",
    endDate: ""
};

function AddConference(props) {
    const { alert, isloading } = props;

    const [formData, validation, validateForm, getData] = useValitedForm(
        initialState,
        ConferenceValidation
    );

    const submit = event => {
        event.preventDefault();
        const valid = validateForm();
        if (valid) {
            props.addConference(getData());
        }
    };
    const hasError = field => validation.errors[field].length > 0;

    return (
        <MainLayout>
            <div className="card o-hidden border-0 shadow-lg">
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-3">
                            Add Conference
                        </h1>
                    </div>
                    {alert.message && (
                        <div className={`mb-3 alert ${alert.type}`}>
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
                                hasError("title") ? "validate-error" : ""
                            }`}
                        >
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control form-control-user"
                                {...formData.title.input}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.title.indexOf("required") >
                                -1
                                    ? "Please Enter conference title"
                                    : ""}
                            </span>
                        </div>
                        <div
                            className={`form-group  ${
                                hasError("description") ? "validate-error" : ""
                            }`}
                        >
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control form-control-user"
                                {...formData.description.input}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.description.indexOf(
                                    "required"
                                ) > -1
                                    ? "Please Enter conference description"
                                    : ""}
                            </span>
                        </div>
                        <div
                            className={`form-group  ${
                                hasError("startDate") ? "validate-error" : ""
                            }`}
                        >
                            <label htmlFor="startDate">{"Start Date"}</label>
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                className="form-control form-control-user"
                                {...formData.startDate.input}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.startDate.indexOf(
                                    "required"
                                ) > -1
                                    ? "Please enter start date"
                                    : ""}
                            </span>
                        </div>
                        <div
                            className={`form-group  ${
                                hasError("endDate") ? "validate-error" : ""
                            }`}
                        >
                            <label>{"End Date"}</label>
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                className="form-control form-control-user"
                                {...formData.endDate.input}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.endDate.indexOf("required") >
                                -1
                                    ? "Please enter end date"
                                    : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-user btn-block"
                                disabled={!validation.valid || isloading}
                            >
                                {isloading
                                    ? "Please wait..."
                                    : "Add Conference"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

const mapStateToProps = state => {
    const { alert } = state;
    const { isloading } = state.conference;
    return {
        alert,
        isloading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addConference: credentials => dispatch(addConference(credentials))
    };
};

const connectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddConference);

export { connectedPage as AddConference };
