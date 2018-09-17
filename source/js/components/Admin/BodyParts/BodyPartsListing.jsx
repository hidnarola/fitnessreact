import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import moment from "moment";
import { generateDTTableFilterObj, ts, te, capitalizeFirstLetter } from '../../../helpers/funs';
import { filterBodyPartsRequest, bodyPartAddRequest, setBodyPartState, bodyPartUpdateRequest, bodyPartDeleteRequest, bodyPartRecoverRequest } from '../../../actions/admin/bodyParts';
import BodyPartsSave from './BodyPartsSave';
import { initialize, reset } from "redux-form";
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash, FaRotateLeft } from "react-icons/lib/fa";
import SweetAlert from "react-bootstrap-sweetalert";

const deletedOptions = [
    { value: '', label: 'All' },
    { value: 0, label: 'Not Deleted' },
    { value: 1, label: 'Deleted' },
];

class BodyPartsListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,
            showSaveModal: false,
            showDeleteModal: false,
            selectedId: null,
            showRecoverModal: false,
        };
    }

    render() {
        const { dtData, dtPages, dtLoading, showSaveModal, showDeleteModal, showRecoverModal } = this.state;
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
                                <h3 className="title-h3">Body Parts List</h3>
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
                                                sortable: true,
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
                                                Filter: ({ column, filter, onChange }) => {
                                                    return (
                                                        <input
                                                            type="text"
                                                            className="width-100-per"
                                                            value={filter ? filter.value : ''}
                                                            onChange={event => onChange(event.target.value)}
                                                            placeholder={(column && column.Header) ? `${column.Header}` : 'Search'}
                                                        />
                                                    );
                                                },
                                            },
                                            {
                                                id: "isDeleted",
                                                Header: "Deleted",
                                                accessor: "isDeleted",
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(deletedOptions, (o) => {
                                                        return (o.value === row.value);
                                                    });
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {dataObj &&
                                                                <span>{dataObj.label}</span>
                                                            }
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            {deletedOptions && deletedOptions.length > 0 &&
                                                                deletedOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
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
                                                                    {row && row.original && (typeof row.original.isDeleted === 'undefined' || row.original.isDeleted === 0) &&
                                                                        <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => this.handleShowDeleteModal(row.value)} >
                                                                            <FaTrash className="v-align-sub" /> Delete
                                                                        </MenuItem>
                                                                    }
                                                                    {row && row.original && typeof row.original.isDeleted !== 'undefined' && row.original.isDeleted === 1 &&
                                                                        <MenuItem eventKey="3" href="javascript:void(0)" onClick={() => this.openRecoverModal(row.value)}>
                                                                            <FaRotateLeft className="v-align-sub" /> Recover
                                                                        </MenuItem>
                                                                    }
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
                                        minRows={5}
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

                <SweetAlert
                    show={showDeleteModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDelete}
                    onCancel={this.handleCloseDeleteModal}
                >
                    You will not be able to recover it!
                </SweetAlert>

                <SweetAlert
                    show={showRecoverModal}
                    success
                    showCancel
                    confirmBtnText="Yes, recover it!"
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleRecover}
                    onCancel={this.closeRecoverModal}
                >
                    Record will be recovered back!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { dispatch, deleteLoading, deleteFlag, deleteError, filteredLoading, filteredBodyParts, filteredTotalPages, saveLoading, saveBodyPart,recoverLoading, recoverFlag, recoverError, } = this.props;
        const { dtLoading } = this.state;
        if (dtLoading && !filteredLoading) {
            this.setState({ dtLoading: filteredLoading, dtData: filteredBodyParts, dtPages: filteredTotalPages });
        }
        if (!saveLoading && saveBodyPart && prevProps.saveLoading !== saveLoading && prevProps.saveBodyPart !== saveBodyPart) {
            this.handleCloseSaveModal();
            let stateData = { saveLoading: false, saveBodyPart: null, saveError: [] };
            dispatch(setBodyPartState(stateData));
            ts('Body part saved!');
            this.refreshDtData();
        }
        if (!deleteLoading && deleteFlag && prevProps.deleteLoading !== deleteLoading && prevProps.deleteFlag !== deleteFlag) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setBodyPartState(stateData));
            ts('Body part deleted!');
            this.refreshDtData();
        } else if (!deleteLoading && prevProps.deleteLoading !== deleteLoading && deleteError && deleteError.length > 0) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setBodyPartState(stateData));
            te(deleteError[0]);
            this.refreshDtData();
        }
        if (!recoverLoading && recoverFlag && prevProps.recoverLoading !== recoverLoading && prevProps.recoverFlag !== recoverFlag) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setBodyPartState(stateData));
            ts('Body part recovered!');
            this.refreshDtData();
        } else if (!recoverLoading && prevProps.recoverLoading !== recoverLoading && recoverError && recoverError.length > 0) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setBodyPartState(stateData));
            te(recoverError[0]);
            this.refreshDtData();
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
            bodypart: (data && data.bodypart && data.bodypart.trim()) ? capitalizeFirstLetter(data.bodypart).trim() : '',
        };
        if (data && data.id) {
            dispatch(bodyPartUpdateRequest(data.id, requestData));
        } else {
            dispatch(bodyPartAddRequest(requestData));
        }
    }

    handleShowDeleteModal = (_id) => {
        this.setState({ showDeleteModal: true, selectedId: _id });
    }

    handleCloseDeleteModal = () => {
        this.setState({ showDeleteModal: false, selectedId: null });
    }

    handleDelete = () => {
        const { dispatch } = this.props;
        const { selectedId } = this.state;
        dispatch(bodyPartDeleteRequest(selectedId));
        this.handleCloseDeleteModal();
    }

    openRecoverModal = (_id) => {
        this.setState({ selectedId: _id, showRecoverModal: true });
    }

    closeRecoverModal = () => {
        this.setState({ selectedId: null, showRecoverModal: false });
    }

    handleRecover = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(bodyPartRecoverRequest(selectedId));
        this.closeRecoverModal();
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
        deleteLoading: adminBodyParts.get('deleteLoading'),
        deleteFlag: adminBodyParts.get('deleteFlag'),
        deleteError: adminBodyParts.get('deleteError'),
        recoverLoading: adminBodyParts.get('recoverLoading'),
        recoverFlag: adminBodyParts.get('recoverFlag'),
        recoverError: adminBodyParts.get('recoverError'),
    };
}

export default connect(
    mapStateToProps,
)(BodyPartsListing);