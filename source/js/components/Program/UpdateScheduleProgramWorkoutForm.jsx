import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, formValueSelector } from "redux-form";
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
} from '../../constants/consts';
import WorkoutTypeSingleCardUpdate from '../ScheduleWorkout/WorkoutTypeSingleCardUpdate';
import WorkoutTypeSupersetCardUpdate from '../ScheduleWorkout/WorkoutTypeSupersetCardUpdate';
import WorkoutTypeCircuitCardUpdate from '../ScheduleWorkout/WorkoutTypeCircuitCardUpdate';
import { changeUsersProgramWorkoutFormAction } from '../../actions/userPrograms';

class UpdateScheduleProgramWorkoutForm extends Component {
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
                                selectedWorkoutForEdit={selectedWorkoutForEdit}
                            />
                        }
                        {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                            <FieldArray
                                name="workout_superset"
                                component={WorkoutTypeSupersetCardUpdate}
                                rerenderOnEveryChange={true}
                                selectedWorkoutForEdit={selectedWorkoutForEdit}
                            />
                        }
                        {selectedWorkoutForEdit && selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                            <FieldArray
                                name="workout_circuit"
                                component={WorkoutTypeCircuitCardUpdate}
                                rerenderOnEveryChange={true}
                                selectedWorkoutForEdit={selectedWorkoutForEdit}
                            />
                        }
                    </div>
                    {selectedWorkoutForEdit && (selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE || selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET || selectedWorkoutForEdit.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) &&
                        <div>
                            <button type="submit" className="add-workout-form-btm-btn">Save</button>
                            <button type="button" className="add-workout-form-btm-btn" onClick={this.handleResetForm}>Reset</button>
                        </div>
                    }
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

UpdateScheduleProgramWorkoutForm = reduxForm({
    form: 'update_schedule_workout_form',
})(UpdateScheduleProgramWorkoutForm);

const selector = formValueSelector('update_schedule_workout_form');

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedSingleExerciseObj: selector(state, 'single_exercise_id'),
        singleAdvanceView: selector(state, 'single_advance_view'),
        singleSets: selector(state, 'single_sets'),
        exercises: userScheduleWorkouts.get('exercises'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
    };
}

export default connect(
    mapStateToProps,
)(UpdateScheduleProgramWorkoutForm);