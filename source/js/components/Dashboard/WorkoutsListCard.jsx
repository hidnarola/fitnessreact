import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeCodes } from '../../constants/routes';
import { NavLink } from "react-router-dom";
import moment from "moment";
import { SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';

class WorkoutsListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCompleted: false,
        }
    }

    componentWillMount() {
        const { workout } = this.props;
        if (workout && workout.isCompleted) {
            this.setState({ isCompleted: (workout.isCompleted) ? true : false });
        }
    }

    render() {
        const { workout, handleCompleteWorkout } = this.props;
        const { isCompleted } = this.state;
        var today = moment().utc();
        var workoutDay = moment(workout.date);
        return (
            <div className="todays-workout-list-card">
                <NavLink to={routeCodes.SAVE_SCHEDULE_WORKOUT.replace(':id', workout._id)}>{workout.title}</NavLink>
                {workoutDay <= today && workout.dayType && workout.dayType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                    <div className="switch-wrap">
                        <small>Workout complete</small>
                        <div className="material-switch">
                            <input
                                id={workout._id}
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => {
                                    this.setState({ isCompleted: !isCompleted });
                                    handleCompleteWorkout(workout._id, !isCompleted);
                                }}
                                disabled={false}
                            />
                            <label htmlFor={workout._id} className="label-default"></label>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(WorkoutsListCard);