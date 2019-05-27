import { userConstants } from "../_constants";

export function conference(state = {}, action) {
    switch (action.type) {
        case userConstants.ADD_RECORD_LOADING:
            return { isloading: true };
        case userConstants.ADD_CONFERENCE_SUCCESS:
            return { isloading: false };
        case userConstants.ADD_CONFERENCE_FAILURE:
            return { isloading: false };
        default:
            return state;
    }
}
