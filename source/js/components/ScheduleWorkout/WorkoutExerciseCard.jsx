import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from "redux-form";
import { SelectField_ReactSelect } from '../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../formValidation/validationRules';
import { prepareDropdownOptionsData } from '../../helpers/funs';
import {
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT
} from '../../constants/consts';
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import WorkoutExerciseSetsDetailsCard from './WorkoutExerciseSetsDetailsCard';
import WorkoutExerciseCuicuitCard from './WorkoutExerciseCuicuitCard';

class WorkoutExerciseCard extends Component {
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
            <div className="workout-exercise-card-wrapper workout-exercise-card-for-exercise-wrapper">
                <h4>Exercises {fields.length > 0 && `(${fields.length})`}</h4>
                {fields.map((field, index) => {
                    let fieldData = fields.get(index);
                    let selectedType = fieldData.selectedType;
                    if (selectedType === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
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
                                        <button type="button" className="remove-workout-exercise-card-block-btn" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                    </div>
                                    <FieldArray
                                        name={`${field}.sets_details`}
                                        component={WorkoutExerciseSetsDetailsCard}
                                    />
                                </div>
                            </div>
                        );
                    } else if (selectedType === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
                        return (
                            <div key={index} className="workout-exercise-card-block-wrapper">
                                <div className="row">
                                    <div className="col-md-10">
                                        <Field
                                            name={`${field}.superset_exercise_id_1`}
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
                                        <button type="button" className="remove-workout-exercise-card-block-btn" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                    </div>
                                    <FieldArray
                                        name={`${field}.superset_sets_details_1`}
                                        component={WorkoutExerciseSetsDetailsCard}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-10">
                                        <Field
                                            name={`${field}.superset_exercise_id_2`}
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
                                    <FieldArray
                                        name={`${field}.superset_sets_details_2`}
                                        component={WorkoutExerciseSetsDetailsCard}
                                    />
                                </div>
                            </div>
                        );
                    } else if (selectedType === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
                        return (
                            <div key={index} className="workout-exercise-card-block-wrapper">
                                <FieldArray
                                    name={`${field}.circuit`}
                                    component={WorkoutExerciseCuicuitCard}
                                />
                                <div className="col-md-2">
                                    <button type="button" className="remove-workout-exercise-card-block-btn" onClick={() => fields.remove(index)} tabIndex="-1"><i className="icon-close"></i></button>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
                <div className="add-workout-exercise-card-block-wrapper pull-right">
                    <ButtonToolbar>
                        <Dropdown id="add-workout-plan-exercises">
                            <Dropdown.Toggle noCaret>Exercise <i className="icon-add_circle"></i></Dropdown.Toggle>
                            <Dropdown.Menu className="super-colors">
                                <MenuItem
                                    eventKey="1"
                                    onClick={() => {
                                        let obj = {
                                            selectedType: SCHEDULED_WORKOUT_TYPE_EXERCISE,
                                            differSets: false,
                                            showDifferSets: false,
                                        }
                                        fields.push(obj);
                                    }}
                                >
                                    Exercise
                                </MenuItem>
                                <MenuItem
                                    eventKey="2"
                                    onClick={() => {
                                        let obj = {
                                            selectedType: SCHEDULED_WORKOUT_TYPE_SUPERSET,
                                            differSets: false,
                                            showDifferSets: false,
                                        }
                                        fields.push(obj);
                                    }}
                                >
                                    Superset
                                </MenuItem>
                                <MenuItem
                                    eventKey="3"
                                    onClick={() => {
                                        let obj = {
                                            selectedType: SCHEDULED_WORKOUT_TYPE_CIRCUIT,
                                            differSets: false,
                                            showDifferSets: false,
                                        }
                                        fields.push(obj);
                                    }}
                                >
                                    Circuit
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonToolbar>
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
)(WorkoutExerciseCard);