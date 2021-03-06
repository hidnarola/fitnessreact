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
import { change } from "redux-form";
import SweetAlert from "react-bootstrap-sweetalert";

class SaveScheduleProgramWorkoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutTypeSelect: null,
            showDataLossAlert: false,
        };
    }

    render() {
        const {
            handleSubmit,
            selectedWorkoutType,
        } = this.props;
        const {
            showDataLossAlert,
        } = this.state;
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
                            handleChange={this.handleChange}
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
                    {selectedWorkoutType && (selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE || selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_SUPERSET || selectedWorkoutType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) &&
                        <div>
                            <button type="submit" className="add-workout-form-btm-btn">Save</button>
                            <button type="button" className="add-workout-form-btm-btn" onClick={this.handleResetForm}>Reset</button>
                        </div>
                    }
                </form>
                <SweetAlert
                    show={showDataLossAlert}
                    danger
                    showCancel
                    confirmBtnText="Yes, change it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleConfirmDataLossAlert}
                    onCancel={this.handleCancelDataLossAlert}
                >
                    You will loss the changes and not be able to recover!
                </SweetAlert>
            </div>
        );
    }

    handleResetForm = () => {
        const { dispatch, reset } = this.props;
        dispatch(changeUsersProgramWorkoutFormAction('add', null));
        reset();
    }

    handleChange = (e) => {
        const { selectedWorkoutType } = this.props;
        if (selectedWorkoutType) {
            e.preventDefault();
            this.setState({ workoutTypeSelect: e.target.value, showDataLossAlert: true });
        }
    }

    handleConfirmDataLossAlert = () => {
        const { dispatch } = this.props;
        const { workoutTypeSelect } = this.state;
        dispatch(change('save_schedule_workout_form', 'workout_type', workoutTypeSelect));
        this.handleCancelDataLossAlert();
    }

    handleCancelDataLossAlert = () => {
        this.setState({ workoutTypeSelect: null, showDataLossAlert: false });
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
        handleChange
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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