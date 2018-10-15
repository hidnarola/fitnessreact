import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, FieldArray, change } from "redux-form";
import _ from "lodash";
import WorkoutSelectField_ReactSelect from './WorkoutSelectField_ReactSelect';
import WorkoutAdvanceViewSwitch from './WorkoutAdvanceViewSwitch';
import WorkoutInputField from './WorkoutInputField';
import WorkoutDropdownField from './WorkoutDropdownField';
import SetsAdvanceView from './SetsAdvanceView';
import { prepareExerciseOptions, prepareFieldsOptions, getExeMeasurementValidationRules } from '../../helpers/funs';
import { EXE_REST_TIME_UNITS, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';
import { requiredReactSelect, required, max, min, validNumber } from '../../formValidation/validationRules';

const min0 = min(0);
const min1 = min(1);
const max12 = max(12);

class WorkoutTypeSingleCard extends Component {
    constructor(props) {
        super(props);
        props.fields.removeAll();
        props.fields.push({});
        this.state = {
            field1Validation: [required, validNumber, min0],
            field2Validation: [required, validNumber, min0],
            field3Validation: [required, validNumber, min0],
        };
    }

    render() {
        const {
            fields,
            exercises,
            exerciseMeasurements
        } = this.props;
        const { field1Validation, field2Validation, field3Validation } = this.state;
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
                    // let field1Validation = [];
                    // let field2Validation = [];
                    // let field3Validation = [];
                    if (exerciseMeasurements && exerciseMeasurements.length > 0 && selectedExerciseObj) {
                        let cat = (selectedExerciseObj.cat) ? selectedExerciseObj.cat : '';
                        let subCat = (selectedExerciseObj.subCat) ? selectedExerciseObj.subCat : '';
                        let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                        if (measObj) {
                            selectedExerciseMeasurementObj = measObj;
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                                field1Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field1);
                                // let selectedOption = (fieldData && fieldData.field1_unit) ? fieldData.field1_unit : selectedExerciseMeasurementObj.field1[0];
                                // let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                                // field1Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
                            }
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                                field2Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field2);
                                // let selectedOption = (fieldData && fieldData.field2_unit) ? fieldData.field2_unit : selectedExerciseMeasurementObj.field2[0];
                                // let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                                // field2Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
                            }
                            if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                                field3Options = prepareFieldsOptions(selectedExerciseMeasurementObj.field3);
                                // let selectedOption = (fieldData && fieldData.field3_unit) ? fieldData.field3_unit : selectedExerciseMeasurementObj.field3[0];
                                // let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                                // field3Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
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
                                        errorClass="help-block"
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
                                                            type="text"
                                                            errorClass="erro_msg_single"
                                                            validate={[required, validNumber, min1, max12]}
                                                        />
                                                        <div className="set-div single">Sets</div>
                                                    </li>
                                                    {field1Options && field1Options.length > 0 &&
                                                        <li>
                                                            <Field
                                                                id={`${field}.field1_value`}
                                                                name={`${field}.field1_value`}
                                                                component={WorkoutInputField}
                                                                placeholder=""
                                                                type="text"
                                                                errorClass="erro_msg_single"
                                                                validate={field1Validation}
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
                                                                type="text"
                                                                errorClass="erro_msg_single"
                                                                validate={field2Validation}
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
                                                                type="text"
                                                                errorClass="erro_msg_single"
                                                                validate={field3Validation}
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
                                                                type="text"
                                                                errorClass="erro_msg_single"
                                                                validate={[required, validNumber, min0]}
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

    componentDidUpdate(prevProps, prevState) {
        const { fields, exerciseMeasurements, dispatch } = this.props;
        const { field1Validation, field2Validation, field3Validation } = this.state;
        fields.map((field, index) => {
            let selectedExerciseObj = null;
            let field2_value = '';
            let fieldData = fields.get(index);
            if (fieldData) {
                selectedExerciseObj = (fieldData.exercise_id) ? fieldData.exercise_id : null;
                field2_value = (fieldData[`${field}.field2_value`]) ? fieldData[`${field}.field2_value`] : '';
            }
            let selectedExerciseMeasurementObj = null;
            let _field1Validation = [];
            let _field2Validation = [];
            let _field3Validation = [];
            if (exerciseMeasurements && exerciseMeasurements.length > 0 && selectedExerciseObj) {
                let cat = (selectedExerciseObj.cat) ? selectedExerciseObj.cat : '';
                let subCat = (selectedExerciseObj.subCat) ? selectedExerciseObj.subCat : '';
                let measObj = _.find(exerciseMeasurements, { 'category': cat, 'subCategory': subCat });
                if (measObj) {
                    selectedExerciseMeasurementObj = measObj;
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field1 && selectedExerciseMeasurementObj.field1.length > 0) {
                        let selectedOption = (fieldData && fieldData.field1_unit) ? fieldData.field1_unit : selectedExerciseMeasurementObj.field1[0];
                        let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                        _field1Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
                    }
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field2 && selectedExerciseMeasurementObj.field2.length > 0) {
                        let selectedOption = (fieldData && fieldData.field2_unit) ? fieldData.field2_unit : selectedExerciseMeasurementObj.field2[0];
                        let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                        _field2Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
                    }
                    if (selectedExerciseMeasurementObj && selectedExerciseMeasurementObj.field3 && selectedExerciseMeasurementObj.field3.length > 0) {
                        let selectedOption = (fieldData && fieldData.field3_unit) ? fieldData.field3_unit : selectedExerciseMeasurementObj.field3[0];
                        let selectedFieldUnit = getExeMeasurementValidationRules(selectedOption);
                        _field3Validation = (selectedFieldUnit && selectedFieldUnit.validation) ? selectedFieldUnit.validation : [required, validNumber, min0];
                    }
                }
            }
            if (field1Validation !== _field1Validation && prevState.field1Validation === field1Validation) {
                this.setState({ field1Validation: _field1Validation });
            }
            if (field2Validation !== _field2Validation && prevState.field2Validation === field2Validation) {
                this.setState({ field2Validation: _field2Validation });
            }
            if (field3Validation !== _field3Validation && prevState.field3Validation === field3Validation) {
                this.setState({ field3Validation: _field3Validation });
            }
        });
    }

};

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