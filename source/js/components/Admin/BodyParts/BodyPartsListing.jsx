import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import moment from "moment";
import { generateDTTableFilterObj, ts } from '../../../helpers/funs';
import { filterBodyPartsRequest, bodyPartAddRequest, setBodyPartState } from '../../../actions/admin/bodyParts';
import BodyPartsSave from './BodyPartsSave';
import { initialize, reset } from "redux-form";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/lib/fa";

class BodyPartsListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,
            showSaveModal: false,
        };
    }

    render() {
        const { dtData, dtPages, dtLoading, showSaveModal } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Body Parts</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" onClick={this.handleShowSaveModal} className="pink-btn">
                            <i className="icon-add_circle"></i>
                            Add Body Part
                        </a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Body Parts</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={dtData}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'createdAt',
                                                Header: 'Created At',
                                                accessor: 'createdAt',
                                                filterable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="list-dob-wrapper">
                                                            <span>
                                                                {row.value && moment(row.value).format('MM/DD/YYYY')}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'bodypart',
                                                Header: 'Body Part',
                                                accessor: 'bodypart',
                                            },
                                            {
                                                id: '_id',
                                                Header: 'Action',
                                                accessor: '_id',
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem
                                                                        eventKey="1"
                                                                        href="javascript:void(0)"
                                                                        onClick={() => this.handleShowSaveModal(row.original)}
                                                                    >
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        eventKey="2"
                                                                        href="javascript:void(0)"
                                                                    >
                                                                        <FaTrash className="v-align-sub" /> Delete
                                                                    </MenuItem>
                                                                </DropdownButton>
                                                            </ButtonToolbar>
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={dtPages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={true}
                                        showPaginationBottom={true}
                                        defaultSorted={[
                                            {
                                                id: "createdAt",
                                                desc: true
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <BodyPartsSave
                    show={showSaveModal}
                    onSubmit={this.handleSubmit}
                    handleClose={this.handleCloseSaveModal}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch, filteredLoading, filteredBodyParts, filteredTotalPages, saveLoading, saveBodyPart } = this.props;
        const { dtLoading } = this.state;
        if (dtLoading && !filteredLoading) {
            this.setState({
                dtLoading: filteredLoading,
                dtData: filteredBodyParts,
                dtPages: filteredTotalPages,
            });
        }
        if (!saveLoading && saveBodyPart && prevProps.saveLoading !== saveLoading && prevProps.saveBodyPart !== saveBodyPart) {
            this.handleCloseSaveModal();
            let stateData = { saveLoading: false, saveBodyPart: null, saveError: [] };
            dispatch(setBodyPartState(stateData));
            ts('Body Part Added!');
        }
    }

    //#region function for fetching data
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ dtLoading: true, dtFilterData: filterData });
        dispatch(filterBodyPartsRequest(filterData));
    }

    refreshDtData = () => {
        const { dispatch } = this.props;
        const { dtFilterData } = this.state;
        this.setState({ dtLoading: true });
        dispatch(filterBodyPartsRequest(dtFilterData));
    }
    //#endregion

    handleShowSaveModal = (data = null) => {
        const { dispatch } = this.props;
        let formData = {};
        if (data) {
            formData.bodypart = data.bodypart;
            formData.id = data._id;
        }
        this.setState({ showSaveModal: true });
        dispatch(initialize('body_part_save_form', formData));
    }

    handleCloseSaveModal = () => {
        const { dispatch } = this.props;
        this.setState({ showSaveModal: false });
        dispatch(reset('body_part_save_form'));
        let stateData = { saveLoading: false, saveBodyPart: null, saveError: [] };
        dispatch(setBodyPartState(stateData));
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        var requestData = {
            bodypart: (data && data.bodypart) ? data.bodypart.trim() : '',
        };
        dispatch(bodyPartAddRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { adminBodyParts } = state;
    return {
        saveLoading: adminBodyParts.get('saveLoading'),
        saveBodyPart: adminBodyParts.get('saveBodyPart'),
        saveError: adminBodyParts.get('saveError'),
        filteredLoading: adminBodyParts.get('filteredLoading'),
        filteredBodyParts: adminBodyParts.get('filteredBodyParts'),
        filteredTotalPages: adminBodyParts.get('filteredTotalPages'),
    };
}

export default connect(
    mapStateToProps,
)(BodyPartsListing);