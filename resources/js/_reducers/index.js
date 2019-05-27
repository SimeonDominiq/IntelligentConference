import { combineReducers } from "redux";
import { authentication } from "./auth.reducer";
import { alert } from "./alert.reducer";
import { registration } from "./register.reducer";
import { conference } from "./conference.reducer";

const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    conference
});

export { rootReducer };
