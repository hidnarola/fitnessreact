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
import { required } from '../../formValidation/validationRules';
import { changeUsersWorkoutFormAction } from '../../actions/userScheduleWorkouts';

class SaveScheduleWorkoutForm extends Component {
    render() {
        const {
            handleSubmit,
            selectedWorkoutType,
            workoutFormAction,
        } = this.props;
        return (
            <div className="add-workout-form">
                <form onSubmit={handleSubmit}>
                    <div className="select-workout-type-wrapper">
                        {workoutFormAction && workoutFormAction === 'add' &&
                            <strong>Add Exercise</strong>
                        }
                        {workoutFormAction && workoutFormAction === 'edit' &&
                            <strong>Update Exercise</strong>
                        }
                        <Field
                            id="workout_type"
                            name="workout_type"
                            component={WorkoutTypeSelection}
                            validationRules={[required]}
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
                    <button type="submit" className="add-workout-form-btm-btn">Save</button>
                    <button type="button" className="add-workout-form-btm-btn" onClick={this.handleResetForm}>Reset</button>
                </form>
            </div>
        );
    }

    handleResetForm = () => {
        const { dispatch, reset } = this.props;
        dispatch(changeUsersWorkoutFormAction('add', null));
        reset();
    }
}

SaveScheduleWorkoutForm = reduxForm({
    form: 'save_schedule_workout_form',
})(SaveScheduleWorkoutForm);

const selector = formValueSelector('save_schedule_workout_form');

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedWorkoutType: selector(state, 'workout_type'),
        selectedSingleExerciseObj: selector(state, 'single_exercise_id'),
        singleAdvanceView: selector(state, 'single_advance_view'),
        singleSets: selector(state, 'single_sets'),
        exercises: userScheduleWorkouts.get('exercises'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
        workoutFormAction: userScheduleWorkouts.get('workoutFormAction'),
    };
}

export default connect(
    mapStateToProps,
)(SaveScheduleWorkoutForm);

const WorkoutTypeSelection = (props) => {
    const {
        input,
        meta,
        validationRules,
    } = props;
    return (
        <div className="workout-type-radios">
            <ul className="radiobox">
                <li>
                    <Field
                        id="workout_type_single"
                        name={input.name}
                        component="input"
                        type="radio"
                        value={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                        validate={validationRules}
                    />
                    <label htmlFor="workout_type_single">Single</label>
                </li>
                <li>
                    <Field
                        id="workout_type_superset"
                        name={input.name}
                        component="input"
                        type="radio"
                        value={SCHEDULED_WORKOUT_TYPE_SUPERSET}
                        validate={validationRules}
                    />
                    <label htmlFor="workout_type_superset">Superset</label>
                </li>
                <li>
                    <Field
                        id="workout_type_circuit"
                        name={input.name}
                        component="input"
                        type="radio"
                        value={SCHEDULED_WORKOUT_TYPE_CIRCUIT}
                        validate={validationRules}
                    />
                    <label htmlFor="workout_type_circuit">Circuit</label>
                </li>
            </ul>
            {meta.touched &&
                (meta.error && <span>{meta.error}</span>)
            }
        </div>
    );
}                                                                                                                                                                                           