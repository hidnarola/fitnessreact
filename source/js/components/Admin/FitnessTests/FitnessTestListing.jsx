import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactTable from "react-table";
import moment from "moment";
import { generateDTTableFilterObj, capitalizeFirstLetter } from '../../../helpers/funs';
import { fitnessTestsFilterRequest, fitnessTestsDeleteRequest } from '../../../actions/admin/fitnessTests';
import {
    FITNESS_TEST_CAT_STRENGTH,
    FITNESS_TEST_CAT_FLEXIBILITY,
    FITNESS_TEST_CAT_POSTURE,
    FITNESS_TEST_CAT_CARDIO,
    FITNESS_TEST_SUB_CAT_UPPER_BODY,
    FITNESS_TEST_SUB_CAT_SIDE,
    FITNESS_TEST_SUB_CAT_LOWER_BODY,
    FITNESS_TEST_SUB_CAT_CARDIO,
    FITNESS_TEST_FORMAT_MAX_REP,
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_TEXT_FIELD,
    FITNESS_TEST_FORMAT_A_OR_B,
    FITNESS_TEST_FORMAT_MAX_REP_STR,
    FITNESS_TEST_FORMAT_MULTISELECT_STR,
    FITNESS_TEST_FORMAT_TEXT_FIELD_STR,
    FITNESS_TEST_FORMAT_A_OR_B_STR,
    STATUS_ACTIVE,
    STATUS_ACTIVE_STR,
    STATUS_INACTIVE_STR,
    STATUS_INACTIVE,
} from '../../../constants/consts';
import {
    DropdownButton,
    ButtonToolbar,
    MenuItem
} from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/lib/fa";
import DeleteConfirmation from '../Common/DeleteConfirmation';
import { adminRouteCodes } from '../../../constants/adminRoutes';

//#region basic consts
const categoryOptions = [
    { value: '', label: 'All' },
    { value: FITNESS_TEST_CAT_STRENGTH, label: capitalizeFirstLetter(FITNESS_TEST_CAT_STRENGTH.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_FLEXIBILITY, label: capitalizeFirstLetter(FITNESS_TEST_CAT_FLEXIBILITY.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_POSTURE, label: capitalizeFirstLetter(FITNESS_TEST_CAT_POSTURE.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_CAT_CARDIO.replace('_', ' ')) },
]

const subCategoryOptions = [
    { value: '', label: 'All' },
    { value: FITNESS_TEST_SUB_CAT_UPPER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_UPPER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_SIDE, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_SIDE.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_LOWER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_LOWER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_CARDIO.replace('_', ' ')) },
]

const formatOptions = [
    { value: '', label: 'All' },
    { value: FITNESS_TEST_FORMAT_MAX_REP, label: FITNESS_TEST_FORMAT_MAX_REP_STR },
    { value: FITNESS_TEST_FORMAT_MULTISELECT, label: FITNESS_TEST_FORMAT_MULTISELECT_STR },
    { value: FITNESS_TEST_FORMAT_TEXT_FIELD, label: FITNESS_TEST_FORMAT_TEXT_FIELD_STR },
    { value: FITNESS_TEST_FORMAT_A_OR_B, label: FITNESS_TEST_FORMAT_A_OR_B_STR },
]

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
//#endregion

class FitnessTestListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtData: [],
            dtPages: 0,
            dtLoading: false,
            dtFilterData: null,
            showDeleteModal: false,
            deleteActionInit: false,
            selectedId: null,
        }
    }

    render() {
        const {
            dtData,
            dtPages,
            dtLoading,
            showDeleteModal,
        } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Fitness Tests</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.FITNESS_TESTS_SAVE} className="pink-btn">
                            Add Fitness Test
                            <i className="icon-add"></i>
                        </NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Fitness Tests</h3>
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
                                                id: 'category',
                                                Header: 'Category',
                                                accessor: 'category',
                                                Cell: (row) => {
                                                    let dataObj = _.find(categoryOptions, (o) => {
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
                                                            {categoryOptions && categoryOptions.length > 0 &&
                                                                categoryOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'subCategory',
                                                Header: 'Sub Category',
                                                accessor: 'subCategory',
                                                Cell: (row) => {
                                                    let dataObj = _.find(subCategoryOptions, (o) => {
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
                                                            {subCategoryOptions && subCategoryOptions.length > 0 &&
                                                                subCategoryOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                }
                                            },
                                            {
                                                id: 'format',
                                                Header: 'Format',
                                                accessor: 'format',
                                                Cell: (row) => {
                                                    let dataObj = _.find(formatOptions, (o) => {
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
                                                            {formatOptions && formatOptions.length > 0 &&
                                                                formatOptions.map((obj, index) => (
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
                                                                    <MenuItem eventKey="1">
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    {!row.original.isDeleted &&
                                                                        <MenuItem
                                                                            eventKey="2"
                                                                            onClick={() => this.handleDeleteModal(true, row.value)}
                                                                        >
                                                                            <FaTrash className="v-align-sub" /> Delete
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteConfirmation
                    show={showDeleteModal}
                    handleYes={this.handleDelete}
                    handleClose={() => this.handleDeleteModal(false)}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            dtLoading,
            deleteActionInit,
        } = this.state;
        const {
            loading,
            filteredLoading,
            filteredFitnessTests,
            filteredTotalPages,
        } = this.props;
        if (dtLoading && !filteredLoading) {
            this.setState({
                dtLoading: filteredLoading,
                dtData: filteredFitnessTests,
                dtPages: filteredTotalPages,
            });
        }
        if (deleteActionInit && !loading) {
            this.setState({ deleteActionInit: false });
            this.handleDeleteModal(false);
            this.refreshDtData();
        }
    }

    //#region function for fetching data
    fetchData = (state, instance) => {
        const { dispatch } = this.props;
        let filterData = generateDTTableFilterObj(state, instance);
        this.setState({ dtLoading: true, dtFilterData: filterData });
        dispatch(fitnessTestsFilterRequest(filterData));
    }

    refreshDtData = () => {
        const { dispatch } = this.props;
        const { dtFilterData } = this.state;
        this.setState({ dtLoading: true });
        dispatch(fitnessTestsFilterRequest(dtFilterData));
    }
    //#endregion

    //#region funs
    handleDeleteModal = (flag, _id = null) => {
        this.setState({
            showDeleteModal: flag,
            selectedId: _id,
        });
    }

    handleDelete = () => {
        const { dispatch } = this.props;
        const { selectedId } = this.state;
        this.setState({
            deleteActionInit: true,
        });
        dispatch(fitnessTestsDeleteRequest(selectedId))
    }
    //#endregion
}

const mapStateToProps = (state) => {
    const { adminFitnessTests } = state;
    return {
        loading: adminFitnessTests.get('loading'),
        filteredLoading: adminFitnessTests.get('filteredLoading'),
        filteredFitnessTests: adminFitnessTests.get('filteredFitnessTests'),
        filteredTotalPages: adminFitnessTests.get('filteredTotalPages'),
        error: adminFitnessTests.get('error'),
    }
}

export default connect(mapStateToProps)(FitnessTestListing);