import React, { useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import "../../Assets/datatables/dataTables.bootstrap4.min.css";
import "../../Assets/datatables/jquery.dataTables.min.js";
import "../../Assets/datatables/dataTables.bootstrap4.min.js";
import { CONFERENCE_LIST_URL } from "../../_constants";
import { DataTableBuild } from "../DataTable/DataTable";

$.DataTable = DataTable;

function DashboardPage() {
    const headings = [
        "Title",
        "Description",
        "Start Date",
        "End Date",
        "Action"
    ];

    const footer = ["Title", "Description", "Start Date", "End Date", "Action"];

    const [isloading, setIsLoading] = useState(true);
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        fetchConferences(conferences);
    }, []);

    const fetchConferences = async () => {
        const response = await axios.get(CONFERENCE_LIST_URL);
        if (response) {
            setConferences(response.data.conferences);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        $("#dataTable").DataTable();
    }, []);

    return (
        <MainLayout>
            <div className="card o-hidden border-0 shadow-lg">
                <div className={`card-body`}>
                    <div className="mb-3">
                        <Link
                            to="/add-conference"
                            className="btn btn-primary btn-user"
                        >
                            Add Conference
                        </Link>
                    </div>
                    <div className="table-responsive">
                        <table
                            className="table table-bordered"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <DataTableBuild
                                headings={headings}
                                footer={footer}
                            />
                            <tbody>
                                {isloading ? (
                                    <tr>
                                        <td>---</td>
                                        <td>---</td>
                                        <td>---</td>
                                        <td>---</td>
                                        <td>---</td>
                                    </tr>
                                ) : (
                                    conferences.map(conference => {
                                        return (
                                            <tr key={conference.id}>
                                                <td>{conference.title}</td>
                                                <td>
                                                    {conference.description}
                                                </td>
                                                <td>{conference.start_date}</td>
                                                <td>{conference.end_date}</td>
                                                <td>
                                                    <Link
                                                        to={`/conference-details/${
                                                            conference.id
                                                        }`}
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

const mapStateToProps = state => {
    const { alert } = state;
    return {
        alert
    };
};

export default connect(mapStateToProps)(DashboardPage);
