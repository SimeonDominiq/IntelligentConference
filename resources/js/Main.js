import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "./_routes";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./_reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import NetworkService from "./NetworkService";

const store = createStore(rootReducer, applyMiddleware(thunk));

NetworkService.setupInterceptors(store);

if (document.getElementById("app")) {
    ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById("app")
    );
}
