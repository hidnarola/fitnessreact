import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { routeCodes } from '../../constants/routes';
import ReactHtmlParser from "react-html-parser";
import ChangeScheduleWorkoutForm from './ChangeScheduleWorkoutForm';
import { initialize } from "redux-form";
import _ from "lodash";
import {
    SCHEDULED_WORKOUT_TYPE_WARMUP,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_COOLDOWN,
    MEASUREMENT_UNIT_KILOMETER,
    MEASUREMENT_UNIT_MILE,
    MEASUREMENT_UNIT_METER,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_POUND
} from '../../constants/consts';
import { prepareDropdownOptionsData } from '../../helpers/funs';
import { changeUsersWorkoutScheduleRequest } from '../../actions/userScheduleWorkouts';
import moment from 'moment';

const distanceUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOMETER, label: "Kilometers" },
    { value: MEASUREMENT_UNIT_MILE, label: "Miles" },
    { value: MEASUREMENT_UNIT_METER, label: "Meters" },
]

const weightUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOGRAM, label: "Kilograms" },
    { value: MEASUREMENT_UNIT_POUND, label: "Pounds" },
]

class ChangeScheduleWorkout extends Component {
    componentWillMount() {
        const {
            selectedWorkoutForEdit,
            history,
            dispatch,
            exercises,
        } = this.props;
        if (!selectedWorkoutForEdit) {
            history.push(routeCodes.SCHEDULE_WORKOUT);
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
                                {selectedWorkoutForEdit.description && ReactHtmlParser(selectedWorkoutForEdit.description)}
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
            history,
        } = this.props;
        if (!loading && workout && prevProps.workout !== workout) {
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
    }

    handleSubmit = (data) => {
        const { selectedWorkoutForEdit, dispatch } = this.props;
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
        var startDay = moment(selectedWorkoutForEdit.date);
        var date = moment.utc(startDay);
        var requestData = {
            title: data.title,
            description: data.description,
            type: SCHEDULED_WORKOUT_TYPE_EXERCISE,
            date: date,
            exercises: exercises,
        };
        var _id = selectedWorkoutForEdit._id;
        dispatch(changeUsersWorkoutScheduleRequest(_id, requestData));
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        loading: userScheduleWorkouts.get('loading'),
        workout: userScheduleWorkouts.get('workout'),
        selectedWorkoutForEdit: userScheduleWorkouts.get('selectedWorkoutForEdit'),
        exercises: userScheduleWorkouts.get('exercises'),
    };
}

export default connect(
    mapStateToProps,
)(ChangeScheduleWorkout);