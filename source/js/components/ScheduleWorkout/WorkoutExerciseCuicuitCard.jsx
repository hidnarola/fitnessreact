import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from "redux-form";
import WorkoutExerciseSetsDetailsCard from './WorkoutExerciseSetsDetailsCard';
import { SelectField_ReactSelect } from '../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../formValidation/validationRules';
import { prepareDropdownOptionsData } from '../../helpers/funs';

class WorkoutExerciseCuicuitCard extends Component {
    render() {
        const {
            fields,
            exercises,
        } = this.props;
        var exerciseOptions = [];
        if (exercises && exercises.length > 0) {
            exerciseOptions = prepareDropdownOptionsData(exercises, '_id', 'name');
        }
        return (
            <div className="workout-exercise-circuit-card-wrapper">
                {fields.map((field, index) => {
                    return (
                        <div key={index} className="workout-exercise-card-block-wrapper">
                            <div className="row">
                                <div className="col-md-10">
                                    <Field
                                        name={`${field}.exercise_id`}
                                        label="Exercise"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Exercise"
                                        component={SelectField_ReactSelect}
                                        options={exerciseOptions}
                                        validate={[requiredReactSelect]}
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                </div>
                                <FieldArray
                                    name={`${field}.sets_details`}
                                    component={WorkoutExerciseSetsDetailsCard}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="add-workout-exercise-card-block-wrapper">
                    <button type="button" onClick={() => fields.push({})}>Add Exercise.</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        exercises: userScheduleWorkouts.get('exercises'),
    };
}

export default connect(
    mapStateToProps,
)(WorkoutExerciseCuicuitCard);