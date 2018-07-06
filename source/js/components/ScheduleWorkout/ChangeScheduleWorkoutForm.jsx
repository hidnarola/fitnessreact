import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from "redux-form";
import { InputField, EditorField } from '../../helpers/FormControlHelper';
import WorkoutExerciseCard from './WorkoutExerciseCard';
import WorkoutWarmupCard from './WorkoutWarmupCard';
import WorkoutCooldownCard from './WorkoutCooldownCard';

class ChangeScheduleWorkoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }
    }

    render() {
        const { description } = this.state;
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
                                value={description}
                                handleChange={this.handleChangeTextEditor}
                                className="editor-height-60"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={EditorField}
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

    handleChangeTextEditor = (editorText) => {
        this.props.change('description', editorText);
        this.setState({ description: editorText });
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

ChangeScheduleWorkoutForm = reduxForm({
    form: 'change_schedule_workout_form',
})(ChangeScheduleWorkoutForm);

export default connect(
    mapStateToProps,
)(ChangeScheduleWorkoutForm);