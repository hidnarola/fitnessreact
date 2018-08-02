import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
} from '../../constants/consts';
import WorkoutTypeSingleCard from '../ScheduleWorkout/WorkoutTypeSingleCard';
import WorkoutTypeSupersetCard from '../ScheduleWorkout/WorkoutTypeSupersetCard';
import WorkoutTypeCircuitCard from '../ScheduleWorkout/WorkoutTypeCircuitCard';
import { required } from '../../formValidation/validationRules';
import { changeUsersProgramWorkoutFormAction } from '../../actions/userPrograms';

class SaveScheduleProgramWorkoutForm extends Component {
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
        dispatch(changeUsersProgramWorkoutFormAction('add', null));
        reset();
    }
}

SaveScheduleProgramWorkoutForm = reduxForm({
    form: 'save_schedule_workout_form',
})(SaveScheduleProgramWorkoutForm);

const selector = formValueSelector('save_schedule_workout_form');

const mapStateToProps = (state) => {
    return {
        selectedWorkoutType: selector(state, 'workout_type'),
    };
}

export default connect(
    mapStateToProps,
)(SaveScheduleProgramWorkoutForm);

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