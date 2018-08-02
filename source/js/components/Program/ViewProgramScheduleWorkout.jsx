import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeCodes } from '../../constants/routes';
import { te } from '../../helpers/funs';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
} from '../../constants/consts';
import cns from "classnames";
import { getUsersProgramWorkoutScheduleRequest, changeProgramWorkoutMainTypeDetails } from '../../actions/userPrograms';
import WorkoutExercisesDetailsView from '../ScheduleWorkout/WorkoutExercisesDetailsView';
import { NavLink } from "react-router-dom";

class ViewProgramScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadWorkoutInit: false,
        }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.workout_id) {
            let _id = match.params.workout_id;
            dispatch(getUsersProgramWorkoutScheduleRequest(_id));
            this.setState({ loadWorkoutInit: true });
        }
    }

    render() {
        const {
            workout,
            match,
            selectedWorkoutMainTypeDetails,
        } = this.props;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                {workout && Object.keys(workout).length > 0 &&
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="">
                                <h2>{`${workout.title} on ${moment(workout.date).format('MM/DD/YYYY')}`}</h2>
                                <p>{`${workout.description}`}</p>
                            </div>
                            <div className="body-head-r">
                                <NavLink
                                    className='pink-btn'
                                    to={`${routeCodes.PROGRAM_SAVE}/${match.params.id}`}>
                                    <i className="icon-arrow_back"></i> Back
                                </NavLink>
                            </div>
                        </div>
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        <div className="workout-main-types-wrapper">
                                            <ul>
                                                <li className={cns({ 'active': (selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_WARMUP) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_WARMUP)}>Warmup</a></li>
                                                <li className={cns({ 'active': (selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_EXERCISE) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_EXERCISE)}>Workout</a></li>
                                                <li className={cns({ 'active': (selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_COOLDOWN) })}><a href="javascript:void(0)" className="" onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_COOLDOWN)}>Cooldown</a></li>
                                            </ul>
                                        </div>
                                        {selectedWorkoutMainTypeDetails &&
                                            <div className="workout-main-types-view-wrapper">
                                                {selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_WARMUP &&
                                                    <WorkoutExercisesDetailsView
                                                        exercises={workout.warmup}
                                                    />
                                                }
                                                {selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                    <WorkoutExercisesDetailsView
                                                        exercises={workout.exercise}
                                                    />
                                                }
                                                {selectedWorkoutMainTypeDetails === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                    <WorkoutExercisesDetailsView
                                                        exercises={workout.cooldown}
                                                    />
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            workout,
            loading,
            error,
            history,
        } = this.props;
        const {
            loadWorkoutInit,
        } = this.state;
        if (loadWorkoutInit && !loading && workout && Object.keys(workout).length <= 0) {
            this.setState({ loadWorkoutInit: false });
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te(error[0]);
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeProgramWorkoutMainTypeDetails(mainType));
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        workout: userPrograms.get('workout'),
        loading: userPrograms.get('loading'),
        error: userPrograms.get('error'),
        selectedWorkoutMainTypeDetails: userPrograms.get('selectedWorkoutMainTypeDetails'),
    };
}

export default connect(
    mapStateToProps,
)(ViewProgramScheduleWorkout);