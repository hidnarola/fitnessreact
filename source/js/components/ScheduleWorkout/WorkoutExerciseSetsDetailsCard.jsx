import React, { Component } from 'react';
import { Field } from "redux-form";
import { InputField, SelectField_ReactSelect } from '../../helpers/FormControlHelper';
import {
    MEASUREMENT_UNIT_KILOMETER,
    MEASUREMENT_UNIT_MILE,
    MEASUREMENT_UNIT_METER,
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

class WorkoutExerciseSetsDetailsCard extends Component {
    render() {
        const {
            fields,
        } = this.props;
        return (
            <div className="workout-exercise-sets-details-card-wrapper">
                {fields.map((field, index) => {
                    return (
                        <div key={index} className="">
                            <div className="row">
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
                                    />
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
                                    />
                                </div>
                                <button type="button" className="" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                <button type="button" className="" onClick={() => this.handleDuplicate(index)} tabIndex="-1"><i className="icon-vertical_align_bottom"></i></button>
                            </div>
                        </div>
                    );
                })}
                <div className="add-workout-exercise-card-block-wrapper pull-right">
                    <button type="button" onClick={() => fields.push({})}>Add Sets.</button>
                </div>
            </div>
        );
    }

    handleDuplicate = (index) => {
        const { fields } = this.props;
        var data = fields.get(index);
        fields.push(data);
    }
}

export default WorkoutExerciseSetsDetailsCard;