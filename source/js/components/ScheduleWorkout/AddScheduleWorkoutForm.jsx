import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from "redux-form";
import { InputField, EditorField } from '../../helpers/FormControlHelper';
import WorkoutExerciseCard from './WorkoutExerciseCard';

class AddScheduleWorkoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }
    }

    render() {
        const { description } = this.state;
        return (
            <div className="add-schedule-workout-form-wrapper">
                <form onSubmit={() => console.log('')}>
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
                                name="exercises"
                                component={WorkoutExerciseCard}
                            />
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

AddScheduleWorkoutForm = reduxForm({
    form: 'add_schedule_workout_form',
})(AddScheduleWorkoutForm);

export default connect(
    mapStateToProps,
)(AddScheduleWorkoutForm);