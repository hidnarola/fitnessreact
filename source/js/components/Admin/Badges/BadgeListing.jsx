import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPencil, FaTrash, FaRotateLeft } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import moment from 'moment';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_INACTIVE_STR,
    STATUS_ACTIVE_STR,
    BADGES_TASKS,
    MEASUREMENT_UNITS
} from '../../../constants/consts';
import _ from 'lodash';
import { generateDTTableFilterObj, te, ts } from '../../../helpers/funs';
import { badgeFilterRequest, badgeDeleteRequest, badgeUndoDeleteRequest } from '../../../actions/admin/badges';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import SweetAlert from "react-bootstrap-sweetalert";

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

class BadgeListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badges: [],
            pages: 0,
            dtLoading: false,
            filterData: null,
            showDeleteModal: false,
            deleteActionInit: false,
            selectedId: null,
            showUndoDeleteModal: false,
            undoDeleteActionInit: false,
        }
    }

    render() {
        const {
            dtLoading,
            pages,
            badges,
            showDeleteModal,
            showUndoDeleteModal,
        } = this.state;
        return (
            <div className="badge-category-listing-wrapper">
                <div className="body-content row d-flex my-panel-body">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Bagde List</h3>
                                <Link to={adminRouteCodes.BADGES_SAVE} className="add-new-btn">
                                    <span>Add Badge</span>
                                    <i className="icon-add_circle"></i>
                                </Link>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={badges}
                                        noDataText={"No records found..."}
                                        columns={[
                                            {
                                                id: 'createdAt',
                                                Header: 'Created At',
                                                accessor: 'createdAt',
                                                filterable: false,
                                                sortable: true,
                                                maxWidth: 100,
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
                                                id: 'task',
                                                Header: 'Tasks',
                                                accessor: 'task',
                                                minWidth: 200,
                                                Cell: (row) => {
                                                    let dataObj = _.find(BADGES_TASKS, (o) => {
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
                                                    var badgeTasks = Object.assign([], BADGES_TASKS);
                                                    badgeTasks.splice(0, 0, { value: '', label: 'All' });
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            {badgeTasks && badgeTasks.length > 0 &&
                                                                badgeTasks.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'value',
                                                Header: 'Target',
                                                accessor: 'value',
                                                filterable: false,
                                                maxWidth: 130,
                                                Cell: (row) => {
                                                    var task = row.original.task;
                                                    var unitLabel = row.original.unit;
                                                    var taskObj = _.find(BADGES_TASKS, ['value', task]);
                                                    if (taskObj) {
                                                        var unitKey = taskObj.unitKey;
                                                        var unitKeyObj = _.find(MEASUREMENT_UNITS, ['key', unitKey]);
                                                        if (unitKeyObj) {
                                                            var units = unitKeyObj.value;
                                                            var unitObj = _.find(units, ['value', row.original.unit]);
                                                            if (unitObj) {
                                                                unitLabel = unitObj.label;
                                                            }
                                                        }

                                                    }
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {`${row.value} ${unitLabel}`}
                                                        </div>
                                                    );
                                                },
                                            },
                                            {
                                                id: 'point',
                                                Header: 'Points',
                                                accessor: 'point',
                                                filterable: true,
                                                filterDigit: true,
                                                maxWidth: 80,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="list-status-wrapper">
                                                            {`${row.value} pts`}
                                                        </div>
                                                    )
                                                },
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
                                                id: 'name',
                                                Header: 'Name',
                                                accessor: 'name',
                                                minWidth: 200,
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
                                                id: 'status',
                                                Header: 'Status',
                                                accessor: 'status',
                                                filterDigit: true,
                                                maxWidth: 100,
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
                                                maxWidth: 100,
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
                                                maxWidth: 70,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <Link to={`${adminRouteCodes.BADGES_SAVE}/${row.value}`} className="dt-act-btn dt-act-btn-edit">
                                                                <FaPencil />
                                                            </Link>
                                                            {row.original.isDeleted === 0 &&
                                                                <button className="dt-act-btn dt-act-btn-delete" onClick={() => this.handleShowDeleteModal(row.value)}>
                                                                    <FaTrash />
                                                                </button>
                                                            }
                                                            {row.original.isDeleted === 1 &&
                                                                <button className="dt-act-btn dt-act-btn-restore" onClick={() => this.handleShowUndoDeleteModal(row.value)}>
                                                                    <FaRotateLeft />
                                                                </button>
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
                                        showPaginationTop={false}
                                        showPaginationBottom={true}
                                        minRows={5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SweetAlert
                    show={showDeleteModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleDelete}
                    onCancel={this.handleHideDeleteModal}
                >
                    Record will be deleted!
                </SweetAlert>

                <SweetAlert
                    show={showUndoDeleteModal}
                    success
                    showCancel
                    confirmBtnText="Yes, recover it!"
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleUndoDelete}
                    onCancel={this.handleHideUndoDeleteModal}
                >
                    Record will be recovered back!
                </SweetAlert>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            filteredBadges,
            filteredTotalPages,
            error,
            dispatch,
        } = this.props;
        const {
            dtLoading,
            deleteActionInit,
            undoDeleteActionInit,
        } = this.state;
        if (dtLoading && !loading) {
            this.setState({
                dtLoading: false,
                badges: filteredBadges,
                pages: filteredTotalPages,
            });
        }
        if (deleteActionInit && !loading) {
            if (error.length > 0) {
                te(error[0]);
            } else {
                ts('Badge deleted successfully');
            }
            dispatch(hidePageLoader());
            this.setState({ deleteActionInit: false });
            this.handleHideDeleteModal();
            this.refreshDTData();
        }
        if (undoDeleteActionInit && !loading) {
            if (error.length > 0) {
                te(error[0]);
            } else {
                ts('Badge recovered successfully');
            }
            dispatch(hidePageLoader());
            this.setState({ undoDeleteActionInit: false });
            this.handleHideUndoDeleteModal();
            this.refreshDTData();
        }
    }

    //#region Start Funs
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        this.setState({
            dtLoading: true,
        });
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ filterData: filterData });
        dispatch(badgeFilterRequest(filterData));
    }

    refreshDTData = () => {
        const { dispatch } = this.props;
        const { filterData } = this.state;
        this.setState({
            dtLoading: true,
        });
        dispatch(badgeFilterRequest(filterData));
    }

    routeTo = (e, route) => {
        const {
            history,
        } = this.props;
        e.preventDefault();
        history.push(route);
    }

    handleShowDeleteModal = (_id) => {
        this.setState({
            showDeleteModal: true,
            selectedId: _id,
        });
    }

    handleHideDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
            selectedId: null,
        });
    }

    handleDelete = () => {
        const {
            dispatch,
        } = this.props;
        this.setState({ deleteActionInit: true });
        dispatch(showPageLoader());
        dispatch(badgeDeleteRequest(this.state.selectedId));
    }

    handleShowUndoDeleteModal = (_id) => {
        this.setState({
            showUndoDeleteModal: true,
            selectedId: _id,
        });
    }

    handleHideUndoDeleteModal = () => {
        this.setState({
            showUndoDeleteModal: false,
            selectedId: null,
        });
    }

    handleUndoDelete = () => {
        const {
            dispatch,
        } = this.props;
        this.setState({ undoDeleteActionInit: true });
        dispatch(showPageLoader());
        dispatch(badgeUndoDeleteRequest(this.state.selectedId));
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { adminBadges } = state;
    return {
        loading: adminBadges.get('loading'),
        error: adminBadges.get('error'),
        filteredBadges: adminBadges.get('filteredBadges'),
        filteredTotalPages: adminBadges.get('filteredTotalPages'),
    };
}

export default connect(mapStateToProps)(BadgeListing);