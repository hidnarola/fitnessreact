import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from "redux-form";
import { SelectField_ReactSelect, InputField } from '../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../formValidation/validationRules';
import { prepareDropdownOptionsData } from '../../helpers/funs';
import {
    MEASUREMENT_UNIT_METER,
    MEASUREMENT_UNIT_KILOMETER,
    MEASUREMENT_UNIT_MILE,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_POUND
} from '../../constants/consts';

const distanceUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOMETER, label: "Kilometers" },
    { value: MEASUREMENT_UNIT_MILE, label: "Miles" },
    { value: MEASUREMENT_UNIT_METER, label: "Meters" },
]

const weightUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOGRAM, label: "Kilograms" },
    { value: MEASUREMENT_UNIT_POUND, label: "Pounds" },
]

class WorkoutCooldownCard extends Component {
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
            <div className="workout-exercise-card-wrapper workout-exercise-card-for-cooldown-wrapper">
                <h4>Cool Downs {fields.length > 0 && `(${fields.length})`}</h4>
                {fields.map((field, index) => {
                    return (
                        <div key={index} className="workout-exercise-card-block-wrapper">
                            <div className="row">
                                <div className="col-md-8">
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
                                    <Field
                                        name={`${field}.reps`}
                                        className="form-control"
                                        label="Reps."
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Reps."
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.sets`}
                                        className="form-control"
                                        label="Sets."
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Sets."
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                    <button type="button" className="remove-workout-exercise-card-block-btn" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.weight`}
                                        className="form-control"
                                        label="Weight"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Weight"
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.weight_units`}
                                        label="Weight Units"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Weight Units"
                                        component={SelectField_ReactSelect}
                                        options={weightUnitsOptions}
                                        validate={[requiredReactSelect]}
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.distance`}
                                        className="form-control"
                                        label="Distance"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Distance"
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.distance_units`}
                                        label="Distance Units"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Distance Units"
                                        component={SelectField_ReactSelect}
                                        options={distanceUnitsOptions}
                                        validate={[requiredReactSelect]}
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.rest_time`}
                                        className="form-control"
                                        label="Rest Time (Mins)"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Rest Time"
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <Field
                                        name={`${field}.one_set_time`}
                                        className="form-control"
                                        label="Time/Set. (Mins)"
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder="Time/Set"
                                        component={InputField}
                                        type="number"
                                        errorClass="help-block"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="add-workout-exercise-card-block-wrapper pull-right">
                    <button type="button" className="green-blue-btn" onClick={() => fields.push()}>Add Cooldowns<i className="icon-control_point"></i></button>
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
)(WorkoutCooldownCard);