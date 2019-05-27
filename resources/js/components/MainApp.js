import React, { Component, Fragment } from "react";
import { LoginPage } from "../components/LoginPage";

export default class MainApp extends Component {
    render() {
        return (
            <Fragment>
                <LoginPage />
            </Fragment>
        );
    }
}
