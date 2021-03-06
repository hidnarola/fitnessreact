import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { routeCodes } from '../../constants/routes';
import SaveScheduleWorkoutForm from '../ScheduleWorkout/SaveScheduleWorkoutForm';
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN
} from '../../constants/consts';
import _ from "lodash";
import { addUsersProgramWorkoutScheduleRequest } from '../../actions/userPrograms';

class AddProgramScheduleWorkout extends Component {
    componentWillMount() {
        const {
            selectedDay,
            history,
            match,
        } = this.props;
        if (!selectedDay) {
            if (match && match.params && match.params.id) {
                var _id = match.params.id;
                history.push(`${routeCodes.PROGRAM_SAVE}/${_id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        }
    }

    render() {
        const { selectedDay } = this.props;
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>{`Add Workout on Day ${(selectedDay) ? selectedDay : ''}`}</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    <SaveScheduleWorkoutForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    handleSubmit = (data) => {
        const { selectedDay, dispatch, match } = this.props;
        if (match && match.params && match.params.id) {
            var exercises = [];
            var sequence = 0;
            var warmups = (data.warmups && data.warmups.length > 0) ? data.warmups : [];
            var exers = (data.exercises && data.exercises.length > 0) ? data.exercises : [];
            var cooldowns = (data.cooldowns && data.cooldowns.length > 0) ? data.cooldowns : [];
            _.forEach(warmups, (warmup, index) => {
                var exercise = {
                    exerciseId: (warmup.exercise_id) ? warmup.exercise_id.value : '',
                    type: SCHEDULED_WORKOUT_TYPE_WARMUP,
                    reps: warmup.reps,
                    sets: warmup.sets,
                    weight: warmup.weight,
                    weightUnits: (warmup.weight_units) ? warmup.weight_units.value : MEASUREMENT_UNIT_KILOGRAM,
                    distance: warmup.distance,
                    distanceUnits: (warmup.distance_units) ? warmup.distance_units.value : MEASUREMENT_UNIT_KILOMETER,
                    restTime: warmup.rest_time,
                    oneSetTimer: warmup.one_set_time,
                    sequence: sequence++,
                };
                exercises.push(exercise);
            });
            _.forEach(exers, (exercise, index) => {
                var exercise = {
                    exerciseId: (exercise.exercise_id) ? exercise.exercise_id.value : '',
                    type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                    reps: exercise.reps,
                    sets: exercise.sets,
                    weight: exercise.weight,
                    weightUnits: (exercise.weight_units) ? exercise.weight_units.value : MEASUREMENT_UNIT_KILOGRAM,
                    distance: exercise.distance,
                    distanceUnits: (exercise.distance_units) ? exercise.distance_units.value : MEASUREMENT_UNIT_KILOMETER,
                    restTime: exercise.rest_time,
                    oneSetTimer: exercise.one_set_time,
                    sequence: sequence++,
                };
                exercises.push(exercise);
            });
            _.forEach(cooldowns, (cooldown, index) => {
                var exercise = {
                    exerciseId: (cooldown.exercise_id) ? cooldown.exercise_id.value : '',
                    type: SCHEDULED_WORKOUT_TYPE_COOLDOWN,
                    reps: cooldown.reps,
                    sets: cooldown.sets,
                    weight: cooldown.weight,
                    weightUnits: (cooldown.weight_units) ? cooldown.weight_units.value : MEASUREMENT_UNIT_KILOGRAM,
                    distance: cooldown.distance,
                    distanceUnits: (cooldown.distance_units) ? cooldown.distance_units.value : MEASUREMENT_UNIT_KILOMETER,
                    restTime: cooldown.rest_time,
                    oneSetTimer: cooldown.one_set_time,
                    sequence: sequence++,
                };
                exercises.push(exercise);
            });
            var requestData = {
                programId: match.params.id,
                title: data.title,
                description: data.description,
                type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                day: (selectedDay - 1),
                exercises: exercises,
            };
            dispatch(addUsersProgramWorkoutScheduleRequest(requestData));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            workout,
            history,
            match,
        } = this.props;
        if (!loading && workout && prevProps.workout !== workout) {
            if (match && match.params && match.params.id) {
                var _id = match.params.id;
                history.push(`${routeCodes.PROGRAM_SAVE}/${_id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        }
    }
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        selectedDay: userPrograms.get('selectedDay'),
        loading: userPrograms.get('loading'),
        workout: userPrograms.get('workout'),
    };
}

export default connect(
    mapStateToProps,
)(AddProgramScheduleWorkout);