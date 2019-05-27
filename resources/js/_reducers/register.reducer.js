import { userConstants } from "../_constants";

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_LOADING:
            return { isloading: true };
        case userConstants.REGISTER_SUCCESS:
            return { isloading: false };
        case userConstants.REGISTER_FAILURE:
            return { isloading: false };
        default:
            return state;
    }
}
