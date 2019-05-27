import axios from "axios";
import {
    ADD_CONFERENCE_URL,
    ADD_TALK_URL,
    DELETE_TALK_URL
} from "../_constants";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { userConstants } from "../_constants";

export const addConference = credentials => {
    return dispatch => {
        dispatch({ type: userConstants.ADD_RECORD_LOADING });
        return axios
            .post(ADD_CONFERENCE_URL, credentials)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_SUCCESS,
                        success: response.data.message
                    });
                    history.push("/dashboard");
                    dispatch(
                        alertActions.success("Conference Added Successfully!")
                    );
                } else {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.ADD_CONFERENCE_FAILURE
                });
                dispatch(
                    alertActions.error(
                        "Error completing request. Please try again!"
                    )
                );
            });
    };
};

export const addTalk = credentials => {
    return dispatch => {
        dispatch({ type: userConstants.ADD_RECORD_LOADING });
        return axios
            .post(ADD_TALK_URL, credentials)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_SUCCESS,
                        success: response.data.message
                    });
                    history.push(
                        "/conference-details/" + credentials.conferenceId
                    );
                    dispatch(alertActions.success("Talk Added Successfully!"));
                } else {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.ADD_CONFERENCE_FAILURE
                });
                dispatch(
                    alertActions.error(
                        "Error completing request. Please try again!"
                    )
                );
            });
    };
};

export const deleteTalk = (conference_id, talk_id) => {
    return dispatch => {
        dispatch({ type: userConstants.ADD_RECORD_LOADING });
        return axios
            .get(DELETE_TALK_URL + "/" + conference_id + "/" + talk_id)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_SUCCESS
                    });
                    dispatch(alertActions.success(response.data.message));
                } else {
                    dispatch({
                        type: userConstants.ADD_CONFERENCE_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.ADD_CONFERENCE_FAILURE
                });
                dispatch(
                    alertActions.error(
                        "Error completing request. Please try again!"
                    )
                );
            });
    };
};
