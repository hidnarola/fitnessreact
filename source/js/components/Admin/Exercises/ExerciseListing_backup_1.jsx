import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPageLoader } from '../../../actions/pageLoader';
import { exerciseDeleteRequest, exerciseFilterRequest } from '../../../actions/admin/exercises';
import dateFormat from 'dateformat';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import ReactTable from 'react-table';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import _ from 'lodash';
import { exerciseTypeListRequest } from '../../../actions/admin/exerciseTypes';
import { EXERCISE_MECHANICS_COMPOUND, EXERCISE_MECHANICS_ISOLATION, EXERCISE_DIFFICULTY_BEGINNER, EXERCISE_DIFFICULTY_INTERMEDIATE, EXERCISE_DIFFICULTY_EXPERT, exerciseMechanicsObj, exerciseDifficultyLevelObj } from '../../../constants/consts';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import DTable from '../Common/DTable';

class ExerciseListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false,
            // filterData: {},
        }
    }

    componentWillMount() {
        this.updateList();
    }

    filterData = (filterData) => {
        const { dispatch } = this.props;
        // this.setState({ filterData: filterData }, () => {
        // });
        dispatch(exerciseFilterRequest(filterData));
    }

    render() {
        const { bodyParts, exerciseTypes, filteredExercises, filteredTotalPages, loading } = this.props;
        const { showDeleteModal } = this.state;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercises</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EXERCISE_SAVE} className="pink-btn">Add Exercise</NavLink>
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
                                    <DTable
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
                                                }
                                            },
                                            {
                                                Header: "Name",
                                                accessor: "name",
                                                id: "name",
                                            },
                                            {
                                                Header: "Main Muscle",
                                                accessor: "mainMuscleGroup",
                                                id: "mainMuscleGroup",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    if (bodyParts) {
                                                        let mainMuscle = _.find(bodyParts, (o) => {
                                                            if (o._id === row.value) {
                                                                return o
                                                            }
                                                            return '-----';
                                                        });
                                                        return (
                                                            <div className="main-muscle-group-wrapper">
                                                                {mainMuscle.bodypart}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            },
                                            {
                                                Header: "Other Muscle",
                                                accessor: "otherMuscleGroup",
                                                id: "otherMuscleGroup",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    if (bodyParts) {
                                                        let otherMuscles = [];
                                                        row.value.map((val, i) => {
                                                            const _id = val;
                                                            const musObj = _.find(bodyParts, ['_id', _id]);
                                                            otherMuscles.push(musObj);
                                                        });
                                                        return (
                                                            <div>
                                                                {otherMuscles &&
                                                                    otherMuscles.map((m, i) => (m.bodypart)).join(',')
                                                                }
                                                                {otherMuscles && otherMuscles.length <= 0 && <span>-----</span>}
                                                                {!otherMuscles && <span>-----</span>}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            },
                                            {
                                                Header: "Detailed Muscle",
                                                accessor: "detailedMuscleGroup",
                                                id: "detailedMuscleGroup",
                                                filterable: false,
                                                sortable: false,
                                                Cell: (row) => {
                                                    if (bodyParts) {

                                                        let otherMuscles = [];
                                                        row.value.map((val, i) => {
                                                            const _id = val;
                                                            const musObj = _.find(bodyParts, ['_id', _id]);
                                                            otherMuscles.push(musObj);
                                                        });
                                                        return (
                                                            <div>
                                                                {otherMuscles &&
                                                                    otherMuscles.map((m, i) => (m.bodypart)).join(',')
                                                                }
                                                                {otherMuscles && otherMuscles.length <= 0 && <span>-----</span>}
                                                                {!otherMuscles && <span>-----</span>}
                                                            </div>
                                                        );
                                                    }
                                                }
                                            },
                                            {
                                                Header: "Mechanics",
                                                accessor: "mechanics",
                                                id: "mechanics",
                                                Cell: (row) => {
                                                    let mech = '-----';
                                                    if (_.has(exerciseMechanicsObj, row.value)) {
                                                        mech = exerciseMechanicsObj[row.value];
                                                    }
                                                    return (
                                                        <div className="table-listing-mechanics-wrapper">
                                                            {mech}
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                Header: "Difficlty Level",
                                                accessor: "difficltyLevel",
                                                id: "difficltyLevel",
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
                                                }
                                            },
                                            {
                                                Header: "Type",
                                                accessor: "type",
                                                filterable: false,
                                                sortable: false,
                                                id: "type",
                                                Cell: (row) => {
                                                    let type = '-----';
                                                    let typeObj = _.find(exerciseTypes, ['_id', row.value]);
                                                    if (typeObj && typeObj.name) {
                                                        type = typeObj.name;
                                                    }
                                                    return (
                                                        <div className="table-listing-type-wrapper">
                                                            {type}
                                                        </div>
                                                    );
                                                }
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
                                                            <NavLink to={`${adminRouteCodes.EXERCISE_SAVE}/${row.value}`}><FaPencil /></NavLink>
                                                            <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}><FaTrash /></a>
                                                        </div>
                                                    );
                                                }
                                            },
                                        ]}
                                        loading={loading}
                                        pages={filteredTotalPages}
                                        filterDTable={this.filterData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DeleteConfirmation
                    show={showDeleteModal}
                    handleClose={this.closeDeleteModal}
                    handleYes={this.handleDelete}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const { loading } = this.props;
        const { deleteActionInit } = this.state;
        if (deleteActionInit && !loading) {
            this.setState({
                selectedId: null,
                showDeleteModal: false,
                deleteActionInit: false
            });
            this.updateList();
        }
    }

    // ----Start funs -----
    updateList = () => {
        const { dispatch } = this.props;
        // const { filterData } = this.state;
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(exerciseTypeListRequest());
        // dispatch(exerciseFilterRequest(filterData));
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
        dispatch(exerciseDeleteRequest(selectedId));
    }
    // ----END funs -----
}

const mapStateToProps = (state) => {
    const { adminExercises, adminBodyParts, adminExerciseTypes } = state;
    return {
        loading: adminExercises.get('loading'),
        error: adminExercises.get('error'),
        exericses: adminExercises.get('exercises'),
        filteredExercises: adminExercises.get('filteredExercises'),
        filteredTotalPages: adminExercises.get('filteredTotalPages'),
        bodyPartsLoading: adminBodyParts.get('loading'),
        bodyPartsError: adminBodyParts.get('error'),
        bodyParts: adminBodyParts.get('bodyParts'),
        exerciseTypesLoading: adminExerciseTypes.get('loading'),
        exerciseTypesError: adminExerciseTypes.get('error'),
        exerciseTypes: adminExerciseTypes.get('exerciseTypes'),
    }
}

export default connect(mapStateToProps)(ExerciseListing);