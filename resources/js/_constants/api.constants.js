export const BASE_URL =
    window.location.protocol + "//" + window.location.host + "/api";

export const REGISTER_URL = BASE_URL + "/signup";

export const LOGIN_URL = BASE_URL + "/login";

export const LOG_OUT_URL = BASE_URL + "/logout";

export const SEND_RESET_URL = BASE_URL + "/send-token";

export const CONFIRM_TOKEN_URL = BASE_URL + "/confirm-token";

export const RESET_PASSWORD_URL = BASE_URL + "/password/reset";

export const CONFERENCE_LIST_URL = BASE_URL + "/get-all-conferences";

export const ADD_CONFERENCE_URL = BASE_URL + "/add-conference";

export const CONFERENCE_DETAILS_URLS = BASE_URL + "/conference-details";

export const ADD_TALK_URL = BASE_URL + "/addtalk";

export const GET_USERS_URL = BASE_URL + "/get-users";

export const DELETE_TALK_URL = BASE_URL + "/delete-talk";
