import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutsListCard from './WorkoutsListCard';
import NoDataFoundImg from "img/common/no_datafound.png";
import { changeCompleteStatusOfWorkoutRequest } from '../../actions/dashboard';

class Workouts extends Component {
    render() {
        const { workouts, } = this.props;
        return (
            <div className="white-box space-btm-30 min-height-348">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Today's Workout</h3>
                </div>
                {workouts && workouts.length > 0 &&
                    workouts.map((o, i) =>
                        <WorkoutsListCard key={i} workout={o} handleCompleteWorkout={this.handleCompleteWorkout} />
                    )
                }
                {(!workouts || workouts.length <= 0) &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
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