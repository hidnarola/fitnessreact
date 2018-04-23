import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import { reset, initialize } from 'redux-form';
import moment from 'moment';
import { generateDTTableFilterObj, ts } from '../../../helpers/funs';
import { showPageLoader } from '../../../actions/pageLoader';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_INACTIVE_STR,
    STATUS_ACTIVE_STR,
    TASKS_UNITS_KGS,
    TASKS_UNITS_KGS_STR,
    TASKS_UNITS_KMS_STR,
    TASKS_UNITS_KMS
} from '../../../constants/consts';
import _ from 'lodash';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import BadgeTaskSaveForm from './BadgeTaskSaveForm';
import { badgeTaskFilterRequest, badgeTaskSelectOneRequest, badgeTaskUpdateRequest, badgeTaskAddRequest, badgeTaskDeleteRequest } from '../../../actions/admin/badgeTasks';

const unitOptions = [
    { value: '', label: 'All' },
    { value: TASKS_UNITS_KGS, label: TASKS_UNITS_KGS_STR },
    { value: TASKS_UNITS_KMS, label: TASKS_UNITS_KMS_STR },
];

const statusOptions = [
    { value: '', label: 'All' },
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

const isDeletedOptions = [
    { value: '', label: 'All' },
    { value: 1, label: 'Yes' },
    { value: 0, label: 'No' },
];

class BadgeTaskListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeTasks: [],
            pages: 0,
            dtLoading: false,
            filterData: null,
            saveModalShow: false,
            selectedId: null,
            selectActionInit: false,
            saveActionInit: false,
            showDeleteModal: false,
        }
    }

    render() {
        const { badgeTask } = this.props;
        const {
            dtLoading,
            pages,
            badgeTasks,
            saveModalShow,
            showDeleteModal,
            deleteActionInit
        } = this.state;
        return (
            <div className="badge-category-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Badge Task</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal()} className="pink-btn">Add Badge Task</a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Badge Task List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={badgeTasks}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'createdAt',
                                                Header: 'Created At',
                                                accessor: 'createdAt',
                                                filterable: false,
                                                sortable: false,
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
                                                id: 'name',
                                                Header: 'Name',
                                                accessor: 'name',
                                            },
                                            {
                                                id: 'unit',
                                                Header: 'Unit',
                                                accessor: 'unit',
                                                filterEqual: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(unitOptions, (o) => {
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
                                                            {unitOptions && unitOptions.length > 0 &&
                                                                unitOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'status',
                                                Header: 'Status',
                                                accessor: 'status',
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(statusOptions, (o) => {
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
                                                            {statusOptions && statusOptions.length > 0 &&
                                                                statusOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'isDeleted',
                                                Header: 'Deleted',
                                                accessor: 'isDeleted',
                                                filterDigit: true,
                                                Cell: (row) => {
                                                    let dataObj = _.find(isDeletedOptions, (o) => {
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
                                                            {isDeletedOptions && isDeletedOptions.length > 0 &&
                                                                isDeletedOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: "_id",
                                                Header: "Actions",
                                                accessor: "_id",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal(row.value)} className="btn btn-primary"><FaPencil /></a>
                                                            {!row.original.isDeleted &&
                                                                <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)} className="btn btn-danger"><FaTrash /></a>
                                                            }
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        pages={pages}
                                        loading={dtLoading}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        showPaginationTop={true}
                                        showPaginationBottom={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <BadgeTaskSaveForm
                    show={saveModalShow}
                    handleClose={this.handleHideSaveModal}
                    onSubmit={this.handleSubmit}
                />

                <DeleteConfirmation
                    show={showDeleteModal}
                    handleClose={this.closeDeleteModal}
                    handleYes={this.handleDelete}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { loading, filteredBadgeTasks, filteredTotalPages, badgeTask, dispatch } = this.props;
        const { dtLoading, saveActionInit, selectActionInit, deleteActionInit } = this.state;
        if (dtLoading && !loading) {
            this.setState({
                dtLoading: false,
                badgeTasks: filteredBadgeTasks,
                pages: filteredTotalPages,
            });
        }
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false,
                selectedId: null,
                saveModalShow: false,
                selectActionInit: false,
            });
            ts('Record saved successfully!');
            this.refreshDTData();
        } else if (selectActionInit && !loading) {
            const formData = {
                name: badgeTask.name,
                description: badgeTask.description,
                unit: _.find(unitOptions, (o) => { return (o.value === badgeTask.unit) }),
                status: _.find(statusOptions, (o) => { return (o.value === badgeTask.status) }),
            }
            dispatch(initialize('badgeTaskSave', formData));
        } else if (deleteActionInit && !loading) {
            this.setState({
                selectedId: null,
                showDeleteModal: false,
                deleteActionInit: false
            });
            ts('Record deleted successfully!');
            this.refreshDTData();
        }
    }

    // Start Funs
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        this.setState({
            dtLoading: true,
        });
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ filterData: filterData });
        dispatch(badgeTaskFilterRequest(filterData));
    }

    refreshDTData = () => {
        const { dispatch } = this.props;
        const { filterData } = this.state;
        this.setState({
            dtLoading: true,
        });
        dispatch(badgeTaskFilterRequest(filterData));
    }

    handleShowSaveModal = (id = null) => {
        const { dispatch } = this.props;
        const formData = {
            name: '',
            status: '',
        }
        dispatch(initialize('badgeTaskSave', formData));
        dispatch(reset('badgeTaskSave'));
        if (id) {
            this.setState({ selectedId: id, selectActionInit: true });
            dispatch(badgeTaskSelectOneRequest(id));
        }
        this.setState({ saveModalShow: true });
    }

    handleHideSaveModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('badgeTaskSave'));
        this.setState({
            saveModalShow: false,
            selectedId: null,
            selectActionInit: false
        });
    }

    handleSubmit = (data) => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        let badgeTask = {
            name: data.name,
            description: data.description,
            unit: data.unit.value,
            status: data.status.value,
        }
        this.setState({
            saveActionInit: true,
        });
        dispatch(showPageLoader());
        if (selectedId) {
            dispatch(badgeTaskUpdateRequest(selectedId, badgeTask));
        } else {
            dispatch(badgeTaskAddRequest(badgeTask));
        }
    }

    confirmDelete = (_id) => {
        this.setState({
            selectedId: _id,
            showDeleteModal: true
        });
    }

    closeDeleteModal = () => {
        this.setState({
            selectedId: null,
            showDeleteModal: false
        });
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        this.setState({
            deleteActionInit: true
        });
        dispatch(badgeTaskDeleteRequest(selectedId));
    }
    // End Funs
}

const mapStateToProps = (state) => {
    const { adminBadgeTasks } = state;
    return {
        loading: adminBadgeTasks.get('loading'),
        filteredBadgeTasks: adminBadgeTasks.get('filteredBudgeTasks'),
        filteredTotalPages: adminBadgeTasks.get('filteredTotalPages'),
        badgeTask: adminBadgeTasks.get('badgeTask'),
    };
}

export default connect(mapStateToProps)(BadgeTaskListing);