import axios from "axios";
import { history } from "./_helpers";
import { alertActions } from "./_actions";

export default {
    setupInterceptors: store => {
        // Add a request interceptor
        axios.interceptors.request.use(
            function(config) {
                // get current user from storage
                let user = JSON.parse(localStorage.getItem("user"));
                let token = user && user.token ? user.token : "";
                config.headers["Authorization"] = "Bearer " + token;
                config.headers["Content-Type"] = "application/json";

                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        axios.interceptors.response.use(
            function(response) {
                return response;
            },
            function(error) {
                //catches if the session ended!
                if (
                    error.response.data.status == "ERR_EXPIRED_TOKEN" ||
                    error.response.data.status == "ERR_BLACKLISTED_TOKEN" ||
                    error.response.data.status == "ERR_INVALID_TOKEN"
                ) {
                    localStorage.clear();
                    history.push("/login");
                    store.dispatch(
                        alertActions.error(
                            "Your session has expired! Kindly Login again"
                        )
                    );
                }
                return Promise.reject(error);
            }
        );
    }
};
