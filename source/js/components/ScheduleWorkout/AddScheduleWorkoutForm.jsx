import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from "redux-form";
import { InputField, TextAreaField } from '../../helpers/FormControlHelper';
import WorkoutExerciseCard from './WorkoutExerciseCard';
import WorkoutWarmupCard from './WorkoutWarmupCard';
import WorkoutCooldownCard from './WorkoutCooldownCard';

class AddScheduleWorkoutForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="add-schedule-workout-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="title"
                                className="form-control"
                                label="Title"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Title"
                                component={InputField}
                                errorClass="help-block"
                            />
                            <Field
                                name="description"
                                className="form-control resize-vertical min-height-80"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
                            />
                            <FieldArray
                                name="warmups"
                                component={WorkoutWarmupCard}
                            />
                            <FieldArray
                                name="exercises"
                                component={WorkoutExerciseCard}
                            />
                            <FieldArray
                                name="cooldowns"
                                component={WorkoutCooldownCard}
                            />
                            <div className="add-workout-exercise-card-block-wrapper pull-right">
                                <button type="submit" className="green-blue-btn">Save<i className="icon-control_point"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

AddScheduleWorkoutForm = reduxForm({
    form: 'add_schedule_workout_form',
})(AddScheduleWorkoutForm);

export default connect(
    mapStateToProps,
)(AddScheduleWorkoutForm);