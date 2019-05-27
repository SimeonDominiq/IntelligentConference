import React, { useState, useEffect } from "react";
import $ from "jquery";
import DataTable from "datatables.net";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import "../../Assets/datatables/dataTables.bootstrap4.min.css";
import "../../Assets/datatables/jquery.dataTables.min.js";
import "../../Assets/datatables/dataTables.bootstrap4.min.js";
import { DataTableBuild } from "../DataTable/DataTable";
import { CONFERENCE_DETAILS_URLS } from "../../_constants";
import { deleteTalk } from "../../_actions";

$.DataTable = DataTable;

function ConferenceDetails(props) {
    const { alert, user } = props;

    const [isloading, setIsLoading] = useState(true);
    const [details, setDetails] = useState(null);
    const [talks, setTalks] = useState([]);

    const conferenceId = props.match.params.id;

    const headings = ["Title", "Description", "Speaker", "Actions"];
    const footer = ["Title", "Description", "Speaker", "Actions"];

    useEffect(() => {
        $("#dataTable").DataTable();
    }, []);

    const getConferenceDetails = async () => {
        const response = await axios.get(
            CONFERENCE_DETAILS_URLS + "/" + conferenceId
        );
        if (response) {
            const conference = response.data.conference;
            setDetails(conference);
            setTalks(conference.talks);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getConferenceDetails(details);
    }, []);

    function delTalk(conference_id, talk_id) {
        const deleteConfirm = window.confirm(
            "Are you sure you want to Delete?"
        );
        if (deleteConfirm) {
            console.log(conference_id, talk_id);
            props.deleteTalk(conference_id, talk_id);
        }
    }

    return (
        <MainLayout>
            <div className="card o-hidden border-0 shadow-lg">
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        {isloading && (
                            <span className="badge badge-danger">
                                Please wait...
                            </span>
                        )}
                    </div>
                    <h3 className="text-center">Conference Details</h3>
                    <div className="form-group">
                        <label className="font-weight-bold">Title</label>
                        <div>{details && details.title}</div>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold">Description</label>
                        <div>{details && details.title}</div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <span className="font-weight-bold">
                                {"Start Date"}:
                            </span>
                            {details && details.start_date}
                        </div>
                        <div className="col-md-6">
                            <span className="font-weight-bold">
                                {"End Date"}:
                            </span>
                            {details && details.end_date}
                        </div>
                    </div>

                    <h4 className="text-center mt-5">Talks</h4>
                    <div className="my-3">
                        <Link
                            to={`/add-talk/${conferenceId}`}
                            className="btn btn-primary btn-user"
                        >
                            Add Talk
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
                                    </tr>
                                ) : (
                                    talks.map(talk => {
                                        return (
                                            <tr key={talk.id}>
                                                <td>{talk.title}</td>
                                                <td>{talk.description}</td>
                                                <td>{talk.speaker}</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        onClick={() =>
                                                            delTalk(
                                                                details.id,
                                                                talk.id
                                                            )
                                                        }
                                                    >
                                                        Delete
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
    const { user } = state.authentication;
    return {
        alert,
        user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTalk: (conf_id, talk_id) => dispatch(deleteTalk(conf_id, talk_id))
    };
};

const connectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConferenceDetails);

export { connectedPage as ConferenceDetails };
