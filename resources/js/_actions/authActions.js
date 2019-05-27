import axios from "axios";
import {
    REGISTER_URL,
    LOGIN_URL,
    LOG_OUT_URL,
    SEND_RESET_URL,
    RESET_PASSWORD_URL
} from "../_constants";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { userConstants } from "../_constants";

export const signIn = credentials => {
    return dispatch => {
        dispatch({ type: userConstants.LOGIN_LOADING });
        return axios
            .post(LOGIN_URL, credentials)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        user: response.data.user
                    });
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    history.push("/dashboard");
                } else {
                    dispatch({
                        type: userConstants.LOGIN_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.LOGIN_FAILURE
                });
                dispatch(alertActions.error("Login Failed. Please try again!"));
            });
    };
};

export const signUp = credentials => {
    return dispatch => {
        dispatch({ type: userConstants.REGISTER_LOADING });
        return axios
            .post(REGISTER_URL, credentials)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.REGISTER_SUCCESS,
                        success: response.data.message
                    });
                    history.push("/login");
                    dispatch(alertActions.success("Registration successful!"));
                } else {
                    dispatch({
                        type: userConstants.REGISTER_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.REGISTER_FAILURE
                });
                dispatch(
                    alertActions.error("Registration Failed. Please try again!")
                );
            });
    };
};

export const signOut = token => {
    return dispatch => {
        return axios
            .get(LOG_OUT_URL, {
                params: {
                    token: token
                }
            })
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.LOGOUT
                    });
                    localStorage.clear();
                    history.push("/login");
                    dispatch(
                        alertActions.success(
                            "You have been logged out successfully!"
                        )
                    );
                } else {
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch(
                    alertActions.error("Logout Failed. Please try again!")
                );
            });
    };
};

export const sendReset = credential => {
    return dispatch => {
        dispatch({ type: userConstants.PASSWORD_RESET_LOADING });
        return axios
            .post(SEND_RESET_URL, credential)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.PASSWORD_RESET_SUCCESS
                    });
                    history.push("/login");
                    dispatch(alertActions.success(response.data.message));
                } else {
                    dispatch({
                        type: userConstants.PASSWORD_RESET_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.PASSWORD_RESET_FAILURE
                });
                dispatch(alertActions.error("Failure Sending Request"));
            });
    };
};

export const resetPassword = credential => {
    return dispatch => {
        console.log(RESET_PASSWORD_URL);
        dispatch({ type: userConstants.PASSWORD_RESET_LOADING });
        return axios
            .post(RESET_PASSWORD_URL, credential)
            .then(response => {
                if (response.data.status == "success") {
                    dispatch({
                        type: userConstants.PASSWORD_RESET_SUCCESS
                    });
                    history.push("/login");
                    dispatch(alertActions.success(response.data.message));
                } else {
                    dispatch({
                        type: userConstants.PASSWORD_RESET_FAILURE
                    });
                    dispatch(alertActions.error(response.data.message));
                }
            })
            .catch(errors => {
                dispatch({
                    type: userConstants.PASSWORD_RESET_FAILURE
                });
                dispatch(alertActions.error("Failure Sending Request"));
            });
    };
};
