import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from "redux-form";
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
} from '../../constants/consts';
import { changeUsersWorkoutFormAction } from '../../actions/userScheduleWorkouts';
import WorkoutTypeSingleCardUpdate from './WorkoutTypeSingleCardUpdate';
import WorkoutTypeSupersetCardUpdate from './WorkoutTypeSupersetCardUpdate';
import WorkoutTypeCircuitCardUpdate from './WorkoutTypeCircuitCardUpdate';

class UpdateScheduleWorkoutForm extends Component {
    render() {
        const {
            handleSubmit,
            selectedWorkoutForEdit,
        } = this.props;
        return (
            <div className="add-workout-form">
                <form onSubmit={handleSubmit}>
                    <div className="select-workout-type-wrapper">
                        <strong>Update Exercise</strong>
                        <div className="update-exercise-workout-type">
                            {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                <label>Single</label>
                            }
                            {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                                <label>Superset</label>
                            }
                            {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                                <label>Circuit</label>
                            }
                        </div>
                        {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                            <FieldArray
                                name="workout_single"
                                component={WorkoutTypeSingleCardUpdate}
                                rerenderOnEveryChange={true}
                            />
                        }
                        {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                            <FieldArray
                                name="workout_superset"
                                component={WorkoutTypeSupersetCardUpdate}
                                rerenderOnEveryChange={true}
                            />
                        }
                        {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                            <FieldArray
                                name="workout_circuit"
                                component={WorkoutTypeCircuitCardUpdate}
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

UpdateScheduleWorkoutForm = reduxForm({
    form: 'update_schedule_workout_form',
})(UpdateScheduleWorkoutForm);

const selector = formValueSelector('update_schedule_workout_form');

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedSingleExerciseObj: selector(state, 'single_exercise_id'),
        singleAdvanceView: selector(state, 'single_advance_view'),
        singleSets: selector(state, 'single_sets'),
        exercises: userScheduleWorkouts.get('exercises'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
        selectedWorkoutForEdit: userScheduleWorkouts.get('selectedWorkoutForEdit'),
    };
}

export default connect(
    mapStateToProps,
)(UpdateScheduleWorkoutForm);