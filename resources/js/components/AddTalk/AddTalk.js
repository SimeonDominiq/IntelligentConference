import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import useValitedForm from "../../_validator/FormValidation";
import { TalkValidation } from "../../_validator";
import { addTalk } from "../../_actions";
import { GET_USERS_URL } from "../../_constants";

const initialState = {
    title: "",
    description: "",
    speaker: "",
    conferenceId: ""
};

function AddTalk(props) {
    const { alert, isloading } = props;

    const [conferenceId, setConferenceId] = useState(props.match.params.id);
    const [isfetching, setIsFetching] = useState(false);
    const [users, setUsers] = useState([]);

    let UserOptions;

    initialState.conferenceId = conferenceId;

    const [formData, validation, validateForm, getData] = useValitedForm(
        initialState,
        TalkValidation
    );

    const fetchUsers = async () => {
        setIsFetching(true);
        const response = await axios.get(GET_USERS_URL);
        if (response) {
            setIsFetching(false);
            setUsers(response.data.users);
        }
    };

    useEffect(() => {
        fetchUsers(users);
    }, []);

    if (users.length > 0) {
        UserOptions = users.map(user => {
            return (
                <option key={user.id} value={user.id}>
                    {user.firstName + " " + user.lastName}
                </option>
            );
        });
    }

    const submit = event => {
        event.preventDefault();
        const valid = validateForm();
        if (valid) {
            console.log(getData());
            props.addTalk(getData());
        }
    };
    const hasError = field => validation.errors[field].length > 0;

    return (
        <MainLayout>
            <div className="card o-hidden border-0 shadow-lg">
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-3">Add Talk</h1>
                    </div>
                    <form
                        className="user validated-form"
                        noValidate={true}
                        onSubmit={submit}
                    >
                        <input
                            type="hidden"
                            name="conferenceId"
                            value={conferenceId}
                            readOnly="readonly"
                        />
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
                                disabled={isfetching}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.title.indexOf("required") >
                                -1
                                    ? "Please Enter title"
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
                                disabled={isfetching}
                            />
                            <span className="validated-form__errors">
                                {validation.errors.description.indexOf(
                                    "required"
                                ) > -1
                                    ? "Please Enter description"
                                    : ""}
                            </span>
                        </div>
                        <div
                            className={`form-group  ${
                                hasError("speaker") ? "validate-error" : ""
                            }`}
                        >
                            <label htmlFor="speaker">{"Speaker"}</label>
                            <select
                                name="speaker"
                                id="speaker"
                                className="form-control form-control-user"
                                {...formData.speaker.input}
                                disabled={isfetching}
                            >
                                <option vlaue="">Select Speaker</option>
                                {UserOptions}
                            </select>
                            <span className="validated-form__errors">
                                {validation.errors.speaker.indexOf("required") >
                                -1
                                    ? "Please select speaker"
                                    : ""}
                            </span>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-user btn-block"
                                disabled={!validation.valid || isloading}
                            >
                                {isloading ? "Please wait..." : "Add Talk"}
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
        addTalk: credentials => dispatch(addTalk(credentials))
    };
};

const connectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTalk);

export { connectedPage as AddTalk };
