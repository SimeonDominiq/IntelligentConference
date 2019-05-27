import MainApp from "../components/MainApp";
import { LoginPage } from "../components/LoginPage";
import { RegisterPage } from "../components/RegisterPage";
import { DashboardPage } from "../components/DashboardPage";
import { AddConference } from "../components/AddConference";
import { ConferenceDetails } from "../components/ConferenceDetails";
import { NotFound } from "../NotFound";
import { AddTalk } from "../components/AddTalk";

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
