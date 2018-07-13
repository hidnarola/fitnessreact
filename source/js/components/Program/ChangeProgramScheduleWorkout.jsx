import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import ChangeScheduleWorkoutForm from '../ScheduleWorkout/ChangeScheduleWorkoutForm';
import {
    MEASUREMENT_UNIT_KILOMETER,
    MEASUREMENT_UNIT_METER,
    MEASUREMENT_UNIT_MILE,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_POUND,
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN
} from '../../constants/consts';
import { prepareDropdownOptionsData, te, ts } from '../../helpers/funs';
import _ from "lodash";
import { routeCodes } from '../../constants/routes';
import { initialize } from "redux-form";
import { changeUsersProgramWorkoutScheduleRequest } from '../../actions/userPrograms';

const distanceUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOMETER, label: "Kilometers" },
    { value: MEASUREMENT_UNIT_MILE, label: "Miles" },
    { value: MEASUREMENT_UNIT_METER, label: "Meters" },
]

const weightUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOGRAM, label: "Kilograms" },
    { value: MEASUREMENT_UNIT_POUND, label: "Pounds" },
]

class ChangeProgramScheduleWorkout extends Component {
    componentWillMount() {
        const {
            selectedWorkoutForEdit,
            history,
            dispatch,
            exercises,
            match,
        } = this.props;
        if (!selectedWorkoutForEdit) {
            if (match && match.params && match.params.id) {
                history.push(`${routeCodes.PROGRAM_SAVE}/${match.params.id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
        } else {
            var selectedExercises = selectedWorkoutForEdit.exercises;
            var warmups = [];
            var exers = [];
            var cooldowns = [];
            _.forEach(selectedExercises, (exer, index) => {
                var distanceUnits = _.find(distanceUnitsOptions, ['value', exer.distanceUnits])
                var weightUnits = _.find(weightUnitsOptions, ['value', exer.weightUnits])
                var exerciseOptions = prepareDropdownOptionsData(exercises, '_id', 'name');
                var exerciseId = _.find(exerciseOptions, ['value', exer.exercise._id]);
                var e = {
                    exercise_id: exerciseId,
                    reps: exer.reps,
                    sets: exer.sets,
                    weight: exer.weight,
                    weight_units: weightUnits,
                    distance: exer.distance,
                    distance_units: distanceUnits,
                    rest_time: exer.restTime,
                    one_set_time: exer.oneSetTimer,
                };
                if (exer.type === SCHEDULED_WORKOUT_TYPE_WARMUP) {
                    warmups.push(e);
                } else if (exer.type === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
                    exers.push(e);
                } else if (exer.type === SCHEDULED_WORKOUT_TYPE_COOLDOWN) {
                    cooldowns.push(e);
                }
            });
            var formData = {
                title: selectedWorkoutForEdit.title,
                description: selectedWorkoutForEdit.description,
                warmups: warmups,
                exercises: exers,
                cooldowns: cooldowns,
            };
            dispatch(initialize('change_schedule_workout_form', formData));
        }
    }

    render() {
        const { selectedWorkoutForEdit } = this.props;
        if (selectedWorkoutForEdit) {
            return (
                <div className="fitness-body">
                    <FitnessHeader />
                    <FitnessNav />
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>{selectedWorkoutForEdit.title}</h2>
                                <p>{selectedWorkoutForEdit.description}</p>
                            </div>
                        </div>
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        <ChangeScheduleWorkoutForm onSubmit={this.handleSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            workout,
            error,
            history,
            match,
        } = this.props;
        if (!loading && error && error.length > 0) {
            te(error[0]);
        }
        if (!loading && workout && prevProps.workout !== workout) {
            if (match && match.params && match.params.id) {
                history.push(`${routeCodes.PROGRAM_SAVE}/${match.params.id}`);
            } else {
                history.push(routeCodes.PROGRAMS);
            }
            ts('Workout changed successfully!');
        }
    }

    handleSubmit = (data) => {
        const { selectedWorkoutForEdit, dispatch, match } = this.props;
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
            day: selectedWorkoutForEdit.day,
            exercises: exercises,
        };
        var _id = selectedWorkoutForEdit._id;
        dispatch(changeUsersProgramWorkoutScheduleRequest(_id, requestData));
    }
}

const mapStateToProps = (state) => {
    const { userPrograms, userScheduleWorkouts } = state;
    return {
        loading: userPrograms.get('loading'),
        workout: userPrograms.get('workout'),
        error: userPrograms.get('error'),
        selectedWorkoutForEdit: userPrograms.get('selectedWorkoutForEdit'),
        exercises: userScheduleWorkouts.get('exercises'),
    };
}

export default connect(
    mapStateToProps,
)(ChangeProgramScheduleWorkout);