import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutsListCard from './WorkoutsListCard';
import { changeCompleteStatusOfWorkoutRequest } from '../../actions/dashboard';
import NoRecordFound from '../Common/NoRecordFound';

class Workouts extends Component {
    render() {
        const { workouts, } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Today's Workout</h3>
                </div>
                {workouts && workouts.length > 0 &&
                    workouts.map((o, i) =>
                        <WorkoutsListCard key={i} workout={o} handleCompleteWorkout={this.handleCompleteWorkout} />
                    )
                }
                {(!workouts || workouts.length <= 0) &&
                    <NoRecordFound title="No workouts found for today." />
                }
            </div>
        );
    }

    handleCompleteWorkout = (workoutId, isCompleted) => {
        const { dispatch } = this.props;
        let requestData = { workoutId, isCompleted };
        dispatch(changeCompleteStatusOfWorkoutRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { dashboard } = state;
    return {
        workouts: dashboard.get('workouts'),
    };
}

export default connect(
    mapStateToProps,
)(Workouts);