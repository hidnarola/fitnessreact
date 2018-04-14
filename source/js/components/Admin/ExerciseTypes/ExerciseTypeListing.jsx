import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import DTable from '../Common/DTable';
import { exerciseTypeFilterRequest } from '../../../actions/admin/exerciseTypes';

class ExerciseTypeListing extends Component {
    render() {
        const { loading, filteredExerciseTypes, filteredTotalPages } = this.props;
        return (
            <div className="exercise-type-listing-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Exercise Types</h2>
                    </div>
                    <div className="body-head-r">
                        <NavLink to={adminRouteCodes.EXERCISE_SAVE} className="pink-btn">Add Exercise Type</NavLink>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Exercise Types List</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <DTable
                                        data={filteredExerciseTypes}
                                        columns={[
                                            {
                                                id: 'name',
                                                Header: 'Name',
                                                accessor: 'name',
                                            },
                                            {
                                                id: "_id",
                                                Header: "Actions",
                                                accessor: "_id",
                                            },
                                        ]}
                                        pages={filteredTotalPages}
                                        serverloading={loading}
                                        filterDTable={this.filterDTable}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Start Funs
    filterDTable = (filterData) => {
        const { dispatch } = this.props;
        dispatch(exerciseTypeFilterRequest(filterData));
    }
    // End Funs   
}

const mapStateToProps = (state) => {
    const { adminExerciseTypes } = state;
    return {
        loading: adminExerciseTypes.get('loading'),
        filteredExerciseTypes: adminExerciseTypes.get('filteredExerciseTypes'),
        filteredTotalPages: adminExerciseTypes.get('filteredTotalPages'),
    };
}

export default connect(mapStateToProps)(ExerciseTypeListing);