import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, FieldArray } from "redux-form";
import _ from "lodash";
import WorkoutSelectField_ReactSelect from './WorkoutSelectField_ReactSelect';
import WorkoutAdvanceViewSwitch from './WorkoutAdvanceViewSwitch';
import WorkoutInputField from './WorkoutInputField';
import WorkoutDropdownField from './WorkoutDropdownField';
import SetsAdvanceView from './SetsAdvanceView';
import { prepareExerciseOptions, prepareFieldsOptions } from '../../helpers/funs';
import { EXE_REST_TIME_UNITS, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import { requiredReactSelect, required } from '../../formValidation/validationRules';

class WorkoutTypeSingleCard extends Component {
    constructor(props) {
        super(props);
        props.fields.removeAll();
        props.fields.push({});
    }

    render() {
        const {
            fields,
            exercises,
            exerciseMeasurements
        } = this.props;
        var exerciseOptions = prepareExerciseOptions(exercises);
        return (
            <div className="workout-type-card-wrapper">
                {fields.map((field, index) => {
                    let selectedExerciseObj = null;
                    let advanceView = false;
                    let sets = 0;
                    let fieldData = fields.get(index);
                    if (fieldData) {
                        selectedExerciseObj = (fieldData.exercise_id) ? fieldData.exercise_id : null;
                        advanceView = (fieldData.advance_view) ? fieldData.advance_view : false;
                        sets = (fieldData.sets) ? fieldData.sets : 0;
                    }
                    let selectedExerciseMeasurementObj = null;
                    let field1Options = [];
                    let field2Options = [];
                    let field3Options = [];
                    if (exerciseMeasurements && exerciseMeasurements.length > 0 && selectedExerciseObj) {
                        let cat = (selectedExerciseObj.cat) ? selectedExerciseObj.cat : '';
                        let subCat = (selectedExerciseObj.subCat) ? selectedExerciseObj.subCat : '';
                        let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                        if (measObj) {
                            selectedExerciseMeasurementObj = measObj;
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                                field1Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field1);
                            }
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                                field2Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field2);
                            }
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                                field3Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field3);
                            }
                        }
                    }
                    return (
                        <div key={index} className="workout-type-card-block">
                            <div className="row workout-type-card-block-top">
                                <div className="col-md-10 single-exercise-selest">
                                    <Field
                                        name={`${field}.exercise_id`}
                                        wrapperClass="form-group"
                                        placeholder="Exercise"
                                        component={WorkoutSelectField_ReactSelect}
                                        options={exerciseOptions}
                                        validate={[requiredReactSelect]}
                                    />
                                </div>
                                <div className="col-md-2 single-exercise-switch">
                                    <Field
                                        id={`${field}.advance_view`}
                                        name={`${field}.advance_view`}
                                        component={WorkoutAdvanceViewSwitch}
                                        checked={advanceView}
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                            {selectedExerciseObj && Object.keys(selectedExerciseObj).length > 0 &&
                                <div className="">
                                    {!advanceView &&
                                        <div className="workout-normal-view">
                                            <div className="">
                                                <ul>
                                                    <li>
                                                        <Field
                                                            id={`${field}.sets`}
                                                            name={`${field}.sets`}
                                                            component={WorkoutInputField}
                                                            placeholder="Sets"
                                                            type="number"
                                                            min={1}
                                                            max={12}
                                                            validate={[required]}
                                                        />
                                                    </li>
                                                    {field1Options && field1Options.length > 0 &&
                                                        <li>
                                                            <Field
                                                                id={`${field}.field1_value`}
                                                                name={`${field}.field1_value`}
                                                                component={WorkoutInputField}
                                                                placeholder=""
                                                                type="number"
                                                                min={1}
                                                                validate={[required]}
                                                            />
                                                            <Field
                                                                id={`${field}.field1_unit`}
                                                                name={`${field}.field1_unit`}
                                                                component={WorkoutDropdownField}
                                                                options={field1Options}
                                                                tabIndex={-1}
                                                            />
                                                        </li>
                                                    }
                                                    {field2Options && field2Options.length > 0 &&
                                                        <li>
                                                            <Field
                                                                id={`${field}.field2_value`}
                                                                name={`${field}.field2_value`}
                                                                component={WorkoutInputField}
                                                                placeholder=""
                                                                type="number"
                                                                min={1}
                                                                validate={[required]}
                                                            />
                                                            <Field
                                                                id={`${field}.field2_unit`}
                                                                name={`${field}.field2_unit`}
                                                                component={WorkoutDropdownField}
                                                                options={field2Options}
                                                                tabIndex={-1}
                                                            />
                                                        </li>
                                                    }
                                                    {field3Options && field3Options.length > 0 &&
                                                        <li>
                                                            <Field
                                                                id={`${field}.field3_value`}
                                                                name={`${field}.field3_value`}
                                                                component={WorkoutInputField}
                                                                placeholder=""
                                                                type="number"
                                                                min={1}
                                                                validate={[required]}
                                                            />
                                                            <Field
                                                                id={`${field}.field3_unit`}
                                                                name={`${field}.field3_unit`}
                                                                component={WorkoutDropdownField}
                                                                options={field3Options}
                                                                tabIndex={-1}
                                                            />
                                                        </li>
                                                    }
                                                    {sets > 1 &&
                                                        <li>
                                                            <Field
                                                                id={`${field}.rest_time`}
                                                                name={`${field}.rest_time`}
                                                                component={WorkoutInputField}
                                                                placeholder="Rest Time"
                                                                type="number"
                                                                min={0}
                                                                validate={[required]}
                                                            />
                                                            <Field
                                                                id={`${field}.rest_time_unit`}
                                                                name={`${field}.rest_time_unit`}
                                                                component={WorkoutDropdownField}
                                                                options={EXE_REST_TIME_UNITS}
                                                                tabIndex={-1}
                                                            />
                                                        </li>
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    {advanceView &&
                                        <div className="workout-advance-view">
                                            <FieldArray
                                                id={`${field}.advance_details`}
                                                name={`${field}.advance_details`}
                                                component={SetsAdvanceView}
                                                allowAddRemoveSets={true}
                                                selectedSingleExerciseObj={selectedExerciseObj}
                                                exerciseMeasurements={exerciseMeasurements}
                                                workoutType={SCHEDULED_WORKOUT_TYPE_EXERCISE}
                                            />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        exercises: userScheduleWorkouts.get('exercises'),
        exerciseMeasurements: userScheduleWorkouts.get('exerciseMeasurements'),
    };
}

export default connect(
    mapStateToProps
)(WorkoutTypeSingleCard);