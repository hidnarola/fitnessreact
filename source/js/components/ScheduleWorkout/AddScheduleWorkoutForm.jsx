import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
} from '../../constants/consts';
import WorkoutTypeSingleCard from './WorkoutTypeSingleCard';
import WorkoutTypeSupersetCard from './WorkoutTypeSupersetCard';
import WorkoutTypeCircuitCard from './WorkoutTypeCircuitCard';

class AddScheduleWorkoutForm extends Component {
    render() {
        const {
            handleSubmit,
            selectedWorkoutType,
        } = this.props;
        return (
            <div className="add-workout-form">
                <form onSubmit={handleSubmit}>
                    <div className="select-workout-type-wrapper">
                        <strong>Add Exercise</strong>
                        <Field
                            id="workout_type"
                            name="workout_type"
                            component={WorkoutTypeSelection}
                        />
                        {selectedWorkoutType && selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                            <FieldArray
                                name="workout_single"
                                component={WorkoutTypeSingleCard}
                                rerenderOnEveryChange={true}
                            />
                        }
                        {selectedWorkoutType && selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                            <FieldArray
                                name="workout_superset"
                                component={WorkoutTypeSupersetCard}
                                rerenderOnEveryChange={true}
                            />
                        }
                        {selectedWorkoutType && selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                            <FieldArray
                                name="workout_circuit"
                                component={WorkoutTypeCircuitCard}
                                rerenderOnEveryChange={true}
                            />
                        }
                    </div>
                    <button type="submit" className="">Save</button>
                </form>
            </div>
        );
    }
}

const selector = formValueSelector('add_schedule_workout_form');

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedWorkoutType: selector(state, 'workout_type'),
        selectedSingleExerciseObj: selector(state, 'single_exercise_id'),
        singleAdvanceView: selector(state, 'single_advance_view'),
        singleSets: selector(state, 'single_sets'),
        exercises: userScheduleWorkouts.get('exercises'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
    };
}

AddScheduleWorkoutForm = reduxForm({
    form: 'add_schedule_workout_form',
})(AddScheduleWorkoutForm);

export default connect(
    mapStateToProps,
)(AddScheduleWorkoutForm);

const WorkoutTypeSelection = (props) => {
    const {
        input,
    } = props;
    return (
        <div className="workout-type-radios">
            <ul>
                <li>
                    <input
                        type="radio"
                        {...input}
                        id="workout_type_single"
                        value={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                    />
                    <label htmlFor="workout_type_single">Single</label>
                </li>
                <li>
                    <input
                        type="radio"
                        {...input}
                        id="workout_type_superset"
                        value={SCHEDULED_WORKOUT_TYPE_SUPERSET}
                    />
                    <label htmlFor="workout_type_superset">Superset</label>
                </li>
                <li>
                    <input
                        type="radio"
                        {...input}
                        id="workout_type_circuit"
                        value={SCHEDULED_WORKOUT_TYPE_CIRCUIT}
                    />
                    <label htmlFor="workout_type_circuit">Circuit</label>
                </li>
            </ul>

        </div>
    );
}