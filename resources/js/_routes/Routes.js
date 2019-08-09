import React from "react";
import Loadable from "react-loadable";
import MainApp from "../components/MainApp";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import { AddConference } from "../components/AddConference";
import { ConferenceDetails } from "../components/ConferenceDetails";
import { NotFound } from "../NotFound";
import { AddTalk } from "../components/AddTalk";

const LoginPage = Loadable({
    loader: () => import("../components/LoginPage/LoginPage"),
    loading() {
        return <div>Loading...</div>;
    }
});

const DashboardPage = Loadable({
    loader: () => import("../components/DashboardPage"),
    loading() {
        return <div>Loading...</div>;
    }
});

const Routes = [
    {
        path: "/",
        exact: true,
        auth: false,
        component: MainApp
    },
    {
        path: "/login",
        exact: true,
        auth: false,
        component: LoginPage
    },
    {
        path: "/register",
        exact: true,
        auth: false,
        admin: false,
        component: RegisterPage
    },
    {
        path: "/dashboard",
        exact: true,
        auth: true,
        component: DashboardPage
    },
    {
        path: "/add-conference",
        exact: true,
        auth: true,
        admin: false,
        component: AddConference
    },
    {
        path: "/conference-details/:id",
        auth: true,
        component: ConferenceDetails
    },
    {
        path: "/add-talk/:id",
        auth: true,
        component: AddTalk
    },
    {
        path: "*",
        auth: "false",
        component: NotFound
    }
];

export default Routes;
