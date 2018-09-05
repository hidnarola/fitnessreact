import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPageLoader } from '../../../actions/pageLoader';
import { exerciseDeleteRequest, exerciseFilterRequest, setExerciseState } from '../../../actions/admin/exercises';
import dateFormat from 'dateformat';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { FaPencil, FaTrash, FaRotateLeft } from 'react-icons/lib/fa';
import ReactTable from 'react-table';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import _ from 'lodash';
import { EXERCISE_DIFFICULTY_BEGINNER, EXERCISE_DIFFICULTY_INTERMEDIATE, EXERCISE_DIFFICULTY_EXPERT, exerciseDifficultyLevelObj, EXE_CATS, EXE_SCATS } from '../../../constants/consts';
import { DropdownButton, ButtonToolbar, MenuItem } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

const difficultyLevelOptions = [
    { value: '', label: 'All' },
    { value: EXERCISE_DIFFICULTY_BEGINNER, label: 'Beginner' },
    { value: EXERCISE_DIFFICULTY_INTERMEDIATE, label: 'Intermediate' },
    { value: EXERCISE_DIFFICULTY_EXPERT, label: 'Expert' },
];

const statusOptions = [
    { value: '', label: 'All' },
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
];

const deletedOptions = [
    { value: '', label: 'All' },
    { value: 0, label: 'Not Deleted' },
    { value: 1, label: 'Deleted' },
];

class ExerciseListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            requestFilterInit: false,
            filterData: [],
            pages: 0,
            showRecoverModal: false
        }
    }

    componentWillMount() {
        this.updateList();
    }

    fetchData = (state, instance) => {
        this.setState({ requestFilterInit: true });
        const { pageSize, page, filtered, sorted, columns } = state;
        const { dispatch } = this.props;
        let columnFilter = [];
        let columnSort = [];
        _.forEach(columns, (column) => {
            if (typeof column.id !== 'undefined') {
                if (filtered && filtered.length > 0) {
                    let filterObj = _.find(filtered, (o) => {
                        return o.id === column.id;
                    });
                    if (typeof filterObj !== 'undefined') {
                        if (column.filterEqual) {
                            filterObj['isEqualFlag'] = true;
                        } else {
                            filterObj['isEqualFlag'] = false;
                        }
                        columnFilter.push(filterObj);
                    }
                }
            }
        });

        if (sorted && sorted.length > 0) {
            _.forEach(sorted, (sort) => {
                columnSort.push(sort);
            });
        }

        const filterData = {
            pageSize,
            page,
            columnFilter,
            columnSort,
        }

        dispatch(exerciseFilterRequest(filterData));
    }

    render() {
        const { bodyParts, filteredExercises } = this.props;
        const { showDeleteModal, requestFilterInit, pages, showRecoverModal } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercises</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EXERCISE_SAVE} className="pink-btn"><i className="icon-add_circle"></i>Add Exercise</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Exercises</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <ReactTable
                                        manual
                                        data={filteredExercises}
                                        columns={[
                                            {
                                                Header: "Created Date",
                                                accessor: "createdAt",
                                                id: "createdAt",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div>{dateFormat(row.value, 'mm/dd/yyyy')}</div>
                                                    );
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                Header: "Category",
                                                accessor: "category",
                                                id: "category",
                                                Cell: (row) => {
                                                    let cate = '-----';
                                                    _.forEach(EXE_CATS, (o) => {
                                                        if (o.value === row.value) {
                                                            cate = o.label;
                                                        }
                                                    })
                                                    return (
                                                        <div className="category-wrapper">
                                                            {cate}
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : ""}
                                                        >
                                                            <option value="">All</option>
                                                            {EXE_CATS && EXE_CATS.length > 0 &&
                                                                EXE_CATS.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                Header: "Sub Category",
                                                accessor: "subCategory",
                                                id: "subCategory",
                                                Cell: (row) => {
                                                    let cate = '-----';
                                                    _.forEach(EXE_SCATS, (o) => {
                                                        if (o.value === row.value) {
                                                            cate = o.label;
                                                        }
                                                    })
                                                    return (
                                                        <div className="sub-category-wrapper">
                                                            {cate}
                                                        </div>
                                                    );
                                                },
                                                Filter: ({ filter, onChange }) => {
                                                    return (
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            className="width-100-per"
                                                            value={filter ? filter.value : ""}
                                                        >
                                                            <option value="">All</option>
                                                            {EXE_SCATS && EXE_SCATS.length > 0 &&
                                                                EXE_SCATS.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name",
                                                id: "name",
                                                minWidth: 250,
                                            },
                                            {
                                                Header: "Main Muscle",
                                                accessor: "mainMuscleGroup",
                                                id: "mainMuscle.bodypart",
                                                Cell: (row) => {
                                                    if (bodyParts) {
                                                        let mainMuscle = '-----';
                                                        _.forEach(bodyParts, (o) => {
                                                            if (o._id === row.value) {
                                                                mainMuscle = o.bodypart;
                                                            }
                                                        })
                                                        return (
                                                            <div className="main-muscle-group-wrapper">
                                                                {mainMuscle}
                                                            </div>
                                                        );
                                                    }
                                                },
                                                minWidth: 150,
                                            },
                                            {
                                                Header: "Difficlty Level",
                                                accessor: "difficltyLevel",
                                                id: "difficltyLevel",
                                                filterEqual: true,
                                                Cell: (row) => {
                                                    let difficultyLevel = '-----';
                                                    if (_.has(exerciseDifficultyLevelObj, row.value)) {
                                                        difficultyLevel = exerciseDifficultyLevelObj[row.value];
                                                    }
                                                    return (
                                                        <div className="table-listing-mechanics-wrapper">
                                                            {difficultyLevel}
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
                                                            {difficultyLevelOptions && difficultyLevelOptions.length > 0 &&
                                                                difficultyLevelOptions.map((obj, index) => (
                                                                    <option key={index} value={obj.value}>{obj.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    );
                                                },
                                                minWidth: 100,
                                            },
                                            {
                                                id: "status",
                                                Header: "Status",
                                                accessor: "status",
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
                                                },
                                                maxWidth: 100,
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
                                                },
                                                maxWidth: 100,
                                            },
                                            {
                                                Header: "Actions",
                                                accessor: "_id",
                                                id: "_id",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    return (
                                                        <div className="actions-wrapper">
                                                            <ButtonToolbar>
                                                                <DropdownButton title="Actions" pullRight id="dropdown-size-medium">
                                                                    <MenuItem
                                                                        eventKey="1"
                                                                        href={`${adminRouteCodes.EXERCISE_SAVE}/${row.value}`}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            this.props.history.push(`${adminRouteCodes.EXERCISE_SAVE}/${row.value}`);
                                                                        }}
                                                                    >
                                                                        <FaPencil className="v-align-sub" /> Edit
                                                                    </MenuItem>
                                                                    {row && row.original && (typeof row.original.isDeleted === 'undefined' || row.original.isDeleted === 0) &&
                                                                        <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)} >
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
                                        pages={pages}
                                        loading={requestFilterInit}
                                        onFetchData={this.fetchData}
                                        filterable
                                        defaultPageSize={10}
                                        className="-striped -highlight"
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
                    onCancel={this.closeDeleteModal}
                >
                    Record will be deleted!
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
        const { loading, filteredExercises, filteredTotalPages, deleteLoading, deleteFlag, deleteError, recoverLoading, recoverFlag, recoverError } = this.props;
        const { requestFilterInit } = this.state;
        if (requestFilterInit && !loading) {
            this.setState({
                requestFilterInit: false,
                filterData: filteredExercises,
                pages: filteredTotalPages,
            });
        }
        if (!deleteLoading && deleteFlag && prevProps.deleteLoading !== deleteLoading && prevProps.deleteFlag !== deleteFlag) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setExerciseState(stateData));
            ts('Exercise deleted!');
            window.location.reload();
            // this.refreshDtData();
        } else if (!deleteLoading && prevProps.deleteLoading !== deleteLoading && deleteError && deleteError.length > 0) {
            let stateData = { deleteLoading: false, deleteFlag: false, deleteError: [] };
            dispatch(setExerciseState(stateData));
            te(deleteError[0]);
            window.location.reload();
            // this.refreshDtData();
        }
        if (!recoverLoading && recoverFlag && prevProps.recoverLoading !== recoverLoading && prevProps.recoverFlag !== recoverFlag) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setExerciseState(stateData));
            ts('Exercise recovered!');
            window.location.reload();
            // this.refreshDtData();
        } else if (!recoverLoading && prevProps.recoverLoading !== recoverLoading && recoverError && recoverError.length > 0) {
            let stateData = { recoverLoading: false, recoverFlag: false, recoverError: [] };
            dispatch(setExerciseState(stateData));
            te(recoverError[0]);
            window.location.reload();
            // this.refreshDtData();
        }
    }

    // ----Start funs -----
    updateList = () => {
        const { dispatch } = this.props;
        dispatch(bodyPartListRequest());
    }

    confirmDelete = (_id) => {
        this.setState({ selectedId: _id, showDeleteModal: true });
    }

    closeDeleteModal = () => {
        this.setState({ selectedId: null, showDeleteModal: false });
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(exerciseDeleteRequest(selectedId));
        this.closeDeleteModal();
    }

    handleDelete = () => {
        const { selectedId } = this.state;
        const { dispatch } = this.props;
        dispatch(exerciseDeleteRequest(selectedId));
        this.closeDeleteModal();
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
        dispatch(exerciseRecoverRequest(selectedId));
        this.closeRecoverModal();
    }
    // ----END funs -----
}

const mapStateToProps = (state) => {
    const { adminExercises, adminBodyParts } = state;
    return {
        loading: adminExercises.get('loading'),
        error: adminExercises.get('error'),
        filteredExercises: adminExercises.get('filteredExercises'),
        filteredTotalPages: adminExercises.get('filteredTotalPages'),
        bodyPartsLoading: adminBodyParts.get('loading'),
        bodyPartsError: adminBodyParts.get('error'),
        bodyParts: adminBodyParts.get('bodyParts'),
        deleteLoading: adminExercises.get('deleteLoading'),
        deleteFlag: adminExercises.get('deleteFlag'),
        deleteError: adminExercises.get('deleteError'),
        recoverLoading: adminExercises.get('recoverLoading'),
        recoverFlag: adminExercises.get('recoverFlag'),
        recoverError: adminExercises.get('recoverError'),
    }
}

export default connect(mapStateToProps)(ExerciseListing);