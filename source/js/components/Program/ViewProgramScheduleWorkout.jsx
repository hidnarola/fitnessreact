import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getUsersProgramWorkoutScheduleRequest,
    changeProgramWorkoutMainType,
    viewUsersPublicProgramWorkoutScheduleRequest
} from '../../actions/userPrograms';
import {
    getExercisesNameRequest,
    getExerciseMeasurementRequest
} from '../../actions/userScheduleWorkouts';
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    SCHEDULED_WORKOUT_TYPE_RESTDAY
} from '../../constants/consts';
import cns from "classnames";
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { te } from '../../helpers/funs';
import ProgramWorkoutExercisesView from './ProgramWorkoutExercisesView';
import { routeCodes } from '../../constants/routes';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class ViewProgramScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = { loadWorkoutInit: false }
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match && match.params && match.params.id && match.params.workout_id) {
            let _id = match.params.id;
            let workoutId = match.params.workout_id;
            dispatch(viewUsersPublicProgramWorkoutScheduleRequest(workoutId));
            dispatch(getExercisesNameRequest());
            dispatch(getExerciseMeasurementRequest());
            this.setState({ loadWorkoutInit: true });
        }
    }

    render() {
        const {
            workout,
            selectedWorkoutMainType,
            match,
            workoutsList,
            workoutStat
        } = this.props;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <h2>{`Workout - ${(workout && typeof workout.day !== 'undefined') ? `Day ${(workout.day + 1)}` : ''}`}</h2>
                            }
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <h2>{`${(workout.title) ? workout.title : 'Rest Day'}`}</h2>
                            }
                            {(workout && typeof workout.day !== 'undefined' && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_RESTDAY) &&
                                <p>{`${(workout.description) ? workout.description : 'Hey its rest day! Take total rest.'}`}</p>
                            }
                            {(!workout || typeof workout.day === 'undefined' || workout.day < 0) &&
                                <h2>{`Workout - Day 0`}</h2>
                            }
                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                <div className="body-head-l-btm">
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_WARMUP)}>Warmup <span className="workout-types-count-badge">{workout && workout.warmup && workout.warmup.length}</span></a>
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_EXERCISE)}>Workout <span className="workout-types-count-badge">{workout && workout.exercise && workout.exercise.length}</span></a>
                                    <a href="javascript:void(0)" className={cns('white-btn p-relative', { 'active': (selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN) })} onClick={() => this.handleWorkoutMainTypeChange(SCHEDULED_WORKOUT_TYPE_COOLDOWN)}>Cooldown <span className="workout-types-count-badge">{workout && workout.cooldown && workout.cooldown.length}</span></a>
                                </div>
                            }
                        </div>
                        <div className="body-head-r">
                            <NavLink
                                className='white-btn'
                                to={`${routeCodes.PROGRAM_VIEW}/${match.params.id}`}
                            >
                                <i className="icon-arrow_back"></i> Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-9 col-sm-9 col-xs-12">
                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                <div className="">
                                    <div className="whitebox-body profile-body">
                                        {selectedWorkoutMainType &&
                                            <div className="workout-main-types-view-wrapper">
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_WARMUP &&
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_WARMUP}
                                                        exercises={workout.warmup}
                                                        allowEdit={false}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                                                        exercises={workout.exercise}
                                                        allowEdit={false}
                                                    />
                                                }
                                                {selectedWorkoutMainType === SCHEDULED_WORKOUT_TYPE_COOLDOWN &&
                                                    <ProgramWorkoutExercisesView
                                                        workoutType={SCHEDULED_WORKOUT_TYPE_COOLDOWN}
                                                        exercises={workout.cooldown}
                                                        allowEdit={false}
                                                    />
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="col-md-3 col-sm-12 col-xs-12">
                            {typeof workoutsList !== 'undefined' && workoutsList && workoutsList.length > 0 &&
                                <div className="white-box space-btm-20 todays-workout-box-wrapper">
                                    <div className="whitebox-head d-flex">
                                        <h3 className="title-h3 size-14">Today's Workouts</h3>
                                    </div>
                                    <div className="whitebox-body text-c">
                                        {workoutsList.map((o, i) => {
                                            let isActive = false;
                                            if (match && match.params && match.params.id && match.params.workout_id && match.params.workout_id === o._id) {
                                                isActive = true;
                                            }
                                            return (
                                                <TodaysWorkoutListCard
                                                    key={i}
                                                    workout={o}
                                                    isActive={isActive}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            }

                            {workout && Object.keys(workout).length > 0 && workout.type && workout.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && workoutStat &&
                                <div className="white-box space-btm-20 padding-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3 size-14 text-c">Workout Stats</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        {typeof workoutStat.total_workout !== 'undefined' && workoutStat.total_workout > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Exercises</h4>
                                                    <h5>{workoutStat.total_workout}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_workout !== 'undefined' && workoutStat.total_workout > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Exercises</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_reps !== 'undefined' && workoutStat.total_reps > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Reps</h4>
                                                    <h5>{workoutStat.total_reps}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_reps !== 'undefined' && workoutStat.total_reps > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Reps</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_sets !== 'undefined' && workoutStat.total_sets > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Sets</h4>
                                                    <h5>{workoutStat.total_sets}</h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_sets !== 'undefined' && workoutStat.total_sets > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Total Sets</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.total_weight_lifted !== 'undefined' && workoutStat.total_weight_lifted > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Weight Lifted</h4>
                                                    <h5>
                                                        {convertUnits(MEASUREMENT_UNIT_GRAM, MEASUREMENT_UNIT_KILOGRAM, workoutStat.total_weight_lifted).toFixed(2)}
                                                        {MEASUREMENT_UNIT_KILOGRAM}
                                                    </h5>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.total_weight_lifted !== 'undefined' && workoutStat.total_weight_lifted > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Weight Lifted</h4>
                                                    <h5>
                                                        0
                                                    </h5>
                                                </div>
                                            </div>
                                        }
                                        {typeof workoutStat.muscle_work !== 'undefined' && workoutStat.muscle_work && workoutStat.muscle_work.length > 0 &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Muscles Worked</h4>
                                                    <h5>{workoutStat.muscle_work.length}</h5>
                                                </div>
                                                <div className="workoutstatus-btm">
                                                    <p>
                                                        {workoutStat.muscle_work.join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        {!(typeof workoutStat.muscle_work !== 'undefined' && workoutStat.muscle_work && workoutStat.muscle_work.length > 0) &&
                                            <div className="workout-status">
                                                <div className="workoutstatus-top">
                                                    <h4>Muscles Worked</h4>
                                                    <h5>0</h5>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            error,
            dispatch,
            match,
            history
        } = this.props;
        const { loadWorkoutInit } = this.state;
        if (loadWorkoutInit && !loading) {
            dispatch(hidePageLoader());
        }
        if (loadWorkoutInit && !loading && error && error.length > 0) {
            this.setState({ loadWorkoutInit: false });
            te('Something went wrong! please try later.');
            if (match && match.params && match.params.id) {
                history.push(`${routeCodes.PROGRAM_VIEW}/${match.params.id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        }
        if (match && match.params && match.params.id && match.params.workout_id && prevProps.match.params.workout_id !== match.params.workout_id) {
            let _id = match.params.id;
            let workoutId = match.params.workout_id;
            dispatch(showPageLoader());
            dispatch(getUsersProgramWorkoutScheduleRequest(workoutId));
            this.setState({ loadWorkoutInit: true });

        }
    }

    handleWorkoutMainTypeChange = (mainType) => {
        const { dispatch } = this.props;
        dispatch(changeProgramWorkoutMainType(mainType));
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        workout: userPrograms.get('workout'),
        loading: userPrograms.get('loading'),
        error: userPrograms.get('error'),
        selectedWorkoutMainType: userPrograms.get('selectedWorkoutMainType'),
        workoutsList: userPrograms.get('workoutsList'),
        workoutStat: userPrograms.get('workoutStat'),
    };
}

export default connect(
    mapStateToProps,
)(ViewProgramScheduleWorkout);

class TodaysWorkoutListCard extends Component {
    render() {
        const { workout, isActive } = this.props;
        return (
            <div className={cns('todays-workout-list-card', { active: isActive })}>
                <NavLink to={routeCodes.VIEW_PROGRAM_SCHEDULE_WORKOUT.replace(':id', workout.programId).replace(':workout_id', workout._id)}>{workout.title}</NavLink>
            </div>
        );
    }
}