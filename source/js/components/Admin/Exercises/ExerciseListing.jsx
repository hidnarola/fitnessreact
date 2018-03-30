import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPageLoader } from '../../../actions/pageLoader';
import { exerciseListRequest, exerciseDeleteRequest } from '../../../actions/admin/exercises';
import dateFormat from 'dateformat';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import ReactTable from 'react-table';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import _ from 'lodash';
import { exerciseTypeListRequest } from '../../../actions/admin/exerciseTypes';
import { EXERCISE_MECHANICS_COMPOUND, EXERCISE_MECHANICS_ISOLATION, EXERCISE_DIFFICULTY_BEGINNER, EXERCISE_DIFFICULTY_INTERMEDIATE, EXERCISE_DIFFICULTY_EXPERT, exerciseMechanicsObj, exerciseDifficultyLevelObj } from '../../../constants/consts';
import DeleteConfirmation from '../Common/DeleteConfirmation';

class ExerciseListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDeleteModal: false,
            deleteActionInit: false
        }
    }

    componentWillMount() {
        this.updateList();
    }

    render() {
        const { exericses, bodyParts, exerciseTypes } = this.props;
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
                                    {exericses && exericses.length > 0 &&
                                        <ReactTable
                                            data={exericses}
                                            columns={[
                                                {
                                                    Header: "Created Date",
                                                    accessor: "createdAt",
                                                    Cell: (row) => {
                                                        return (
                                                            <div>{dateFormat(row.value, 'mm/dd/yyyy')}</div>
                                                        );
                                                    }
                                                },
                                                {
                                                    Header: "Name",
                                                    accessor: "name"
                                                },
                                                {
                                                    Header: "Main Muscle",
                                                    accessor: "mainMuscleGroup",
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
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="actions-wrapper">
                                                                <NavLink to={`${adminRouteCodes.EXERCISE}/${row.value}`}><FaPencil /></NavLink>
                                                                <a href="javascript:void(0)" onClick={() => this.confirmDelete(row.value)}><FaTrash /></a>
                                                            </div>
                                                        );
                                                    }
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-striped -highlight"
                                        />
                                    }
                                    {!exericses &&
                                        <span>No records found</span>
                                    }
                                    {exericses && exericses.length <= 0 &&
                                        <span>No records found</span>
                                    }
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
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(exerciseTypeListRequest());
        dispatch(exerciseListRequest());
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
        bodyPartsLoading: adminBodyParts.get('loading'),
        bodyPartsError: adminBodyParts.get('error'),
        bodyParts: adminBodyParts.get('bodyParts'),
        exerciseTypesLoading: adminExerciseTypes.get('loading'),
        exerciseTypesError: adminExerciseTypes.get('error'),
        exerciseTypes: adminExerciseTypes.get('exerciseTypes'),
    }
}

export default connect(mapStateToProps)(ExerciseListing);