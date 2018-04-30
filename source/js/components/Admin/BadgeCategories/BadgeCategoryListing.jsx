import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import ReactTable from 'react-table';
import { reset, initialize } from 'redux-form';
import moment from 'moment';
import { badgeCategoryFilterRequest, badgeCategorySelectOneRequest, badgeCategoryUpdateRequest, badgeCategoryAddRequest, badgeCategoryDeleteRequest } from '../../../actions/admin/badgeCategories';
import { generateDTTableFilterObj, ts } from '../../../helpers/funs';
import { showPageLoader } from '../../../actions/pageLoader';
import BadgeCategorySaveForm from './BadgeCategorySaveForm';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_INACTIVE_STR, STATUS_ACTIVE_STR } from '../../../constants/consts';
import _ from 'lodash';
import DeleteConfirmation from '../Common/DeleteConfirmation';

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

class BadgeCategoryListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            badgeCategories: [],
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
        const { badgeCategory } = this.props;
        const {
            dtLoading,
            pages,
            badgeCategories,
            saveModalShow,
            showDeleteModal,
            deleteActionInit
        } = this.state;
        return (
            <div className="badge-category-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Badge Category</h2>
                    </div>
                    <div className="body-head-r">
                        <a href="javascript:void(0)" onClick={() => this.handleShowSaveModal()} className="pink-btn">Add Badge Category</a>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Bagde Category List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={badgeCategories}
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

                <BadgeCategorySaveForm
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
        const { loading, filteredBadgeCategories, filteredTotalPages, badgeCategory, dispatch } = this.props;
        const { dtLoading, saveActionInit, selectActionInit, deleteActionInit } = this.state;
        if (dtLoading && !loading) {
            this.setState({
                dtLoading: false,
                badgeCategories: filteredBadgeCategories,
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
                name: badgeCategory.name,
                status: _.find(statusOptions, (o) => { return (o.value === badgeCategory.status) })
            }
            dispatch(initialize('badgeCategorySave', formData));
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
        dispatch(badgeCategoryFilterRequest(filterData));
    }

    refreshDTData = () => {
        const { dispatch } = this.props;
        const { filterData } = this.state;
        this.setState({
            dtLoading: true,
        });
        dispatch(badgeCategoryFilterRequest(filterData));
    }

    handleShowSaveModal = (id = null) => {
        const { dispatch } = this.props;
        const formData = {
            name: '',
            status: '',
        }
        dispatch(initialize('badgeCategorySave', formData));
        dispatch(reset('badgeCategorySave'));
        if (id) {
            this.setState({ selectedId: id, selectActionInit: true });
            dispatch(badgeCategorySelectOneRequest(id));
        }
        this.setState({ saveModalShow: true });
    }

    handleHideSaveModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('badgeCategorySave'));
        this.setState({
            saveModalShow: false,
            selectedId: null,
            selectActionInit: false
        });
    }

    handleSubmit = (data) => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        let badgeCategory = {
            name: data.name,
            status: data.status.value,
        }
        this.setState({
            saveActionInit: true,
        });
        dispatch(showPageLoader());
        if (selectedId) {
            dispatch(badgeCategoryUpdateRequest(selectedId, badgeCategory));
        } else {
            dispatch(badgeCategoryAddRequest(badgeCategory));
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
        dispatch(badgeCategoryDeleteRequest(selectedId));
    }
    // End Funs
}

const mapStateToProps = (state) => {
    const { adminBadgeCategories } = state;
    return {
        loading: adminBadgeCategories.get('loading'),
        filteredBadgeCategories: adminBadgeCategories.get('filteredBudgeCategories'),
        filteredTotalPages: adminBadgeCategories.get('filteredTotalPages'),
        badgeCategory: adminBadgeCategories.get('badgeCategory'),
    };
}

export default connect(mapStateToProps)(BadgeCategoryListing);