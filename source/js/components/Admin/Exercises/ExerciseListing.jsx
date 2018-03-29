import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showPageLoader } from '../../../actions/pageLoader';
import { exerciseListRequest } from '../../../actions/admin/exercises';
import dateFormat from 'dateformat';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { FaPencil, FaTrash } from 'react-icons/lib/fa';
import ReactTable from 'react-table';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import _ from 'lodash';

class ExerciseListing extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.updateList();
    }

    render() {
        const { exericses, bodyParts } = this.props;
        return (
            <div className="exercise-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercises</h2>
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
                                                },
                                                {
                                                    Header: "Other Muscle",
                                                    accessor: "otherMuscleGroup",
                                                    Cell: (row) => {
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
                                                },
                                                {
                                                    Header: "Detailed Muscle",
                                                    accessor: "detailedMuscleGroup",
                                                    Cell: (row) => {
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
                                                },
                                                {
                                                    Header: "Mechanics",
                                                    accessor: "mechanics",
                                                },
                                                {
                                                    Header: "Difficlty Level",
                                                    accessor: "difficltyLevel",
                                                },
                                                {
                                                    Header: "Type",
                                                    accessor: "type",
                                                },
                                                {
                                                    Header: "Actions",
                                                    accessor: "_id",
                                                    Cell: (row) => {
                                                        return (
                                                            <div className="actions-wrapper">
                                                                <NavLink to={`${adminRouteCodes.EXERCISE}/${row.value}`}><FaPencil /></NavLink>
                                                                <a href="javascript:void(0)"><FaTrash /></a>
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
            </div >
        );
    }

    // ----Start funs -----
    updateList = () => {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(exerciseListRequest());
    }
    // ----END funs -----
}

const mapStateToProps = (state) => {
    const { adminExercises, adminBodyParts } = state;
    return {
        loading: adminExercises.get('loading'),
        error: adminExercises.get('error'),
        exericses: adminExercises.get('exercises'),
        bodyPartsLoading: adminBodyParts.get('loading'),
        bodyPartsError: adminBodyParts.get('error'),
        bodyParts: adminBodyParts.get('bodyParts'),
    }
}

export default connect(mapStateToProps)(ExerciseListing);