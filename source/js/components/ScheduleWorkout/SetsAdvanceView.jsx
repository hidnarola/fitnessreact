import React, { Component } from 'react';
import { Field } from "redux-form";
import WorkoutInputField from './WorkoutInputField';
import WorkoutDropdownField from './WorkoutDropdownField';
import _ from "lodash";
import { prepareFieldsOptions } from '../../helpers/funs';
import { EXE_REST_TIME_UNITS, SCHEDULED_WORKOUT_TYPE_EXERCISE } from '../../constants/consts';

class SetsAdvanceView extends Component {
    constructor(props) {
        super(props);
        props.fields.removeAll();
        props.fields.push({});
    }

    render() {
        const {
            fields,
            selectedSingleExerciseObj,
            exerciseMeasurements,
            totalSets,
            workoutType,
        } = this.props;
        let selectedExerciseMeasurementObj = null;
        let field1Options = [];
        let field2Options = [];
        let field3Options = [];
        if (exerciseMeasurements && exerciseMeasurements.length > 0 && selectedSingleExerciseObj) {
            let cat = (selectedSingleExerciseObj.cat) ? selectedSingleExerciseObj.cat : '';
            let subCat = (selectedSingleExerciseObj.subCat) ? selectedSingleExerciseObj.subCat : '';
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
            <div className="sets-advance-view-wrapper">
                {fields.map((field, index) => {
                    return (
                        <div key={index} className="sets-advance-view-block">
                            Set #{(index + 1)}
                            {index > 0 && (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <Field
                                    id={`${field}.rest_time`}
                                    name={`${field}.rest_time`}
                                    component={WorkoutInputField}
                                    placeholder="Rest Time"
                                    type="number"
                                    min={0}
                                />
                            }
                            {index > 0 && (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <Field
                                    id={`${field}.rest_time_unit`}
                                    name={`${field}.rest_time_unit`}
                                    component={WorkoutDropdownField}
                                    options={EXE_REST_TIME_UNITS}
                                    tabIndex={-1}
                                />
                            }
                            {field1Options && field1Options.length > 0 &&
                                <div>
                                    <Field
                                        id={`${field}.field1_value`}
                                        name={`${field}.field1_value`}
                                        component={WorkoutInputField}
                                        placeholder=""
                                        type="number"
                                        min={0}
                                    />
                                    <Field
                                        id={`${field}.field1_unit`}
                                        name={`${field}.field1_unit`}
                                        component={WorkoutDropdownField}
                                        options={field1Options}
                                        tabIndex={-1}
                                    />
                                </div>
                            }
                            {field2Options && field2Options.length > 0 &&
                                <div>
                                    <Field
                                        id={`${field}.field2_value`}
                                        name={`${field}.field2_value`}
                                        component={WorkoutInputField}
                                        placeholder=""
                                        type="number"
                                        min={0}
                                    />
                                    <Field
                                        id={`${field}.field2_unit`}
                                        name={`${field}.field2_unit`}
                                        component={WorkoutDropdownField}
                                        options={field2Options}
                                        tabIndex={-1}
                                    />
                                </div>
                            }
                            {field3Options && field3Options.length > 0 &&
                                <div>
                                    <Field
                                        id={`${field}.field3_value`}
                                        name={`${field}.field3_value`}
                                        component={WorkoutInputField}
                                        placeholder=""
                                        type="number"
                                        min={0}
                                    />
                                    <Field
                                        id={`${field}.field3_unit`}
                                        name={`${field}.field3_unit`}
                                        component={WorkoutDropdownField}
                                        options={field3Options}
                                        tabIndex={-1}
                                    />
                                </div>
                            }
                            {(index > 0) && (typeof totalSets === 'undefined' || totalSets === null || totalSets <= 0) &&
                                <button type="button" className="sets-advance-view-cBtn" onClick={() => fields.remove(index)} tabIndex={-1}><i className="icon-cancel"></i></button>
                            }
                        </div>
                    );
                })}
                {(typeof totalSets === 'undefined' || totalSets === null || totalSets <= 0) && (fields && fields.length <= 12) &&
                    <div className="pull-right">
                        <button type="button" className="" onClick={() => fields.push()}>Add Set<i className="icon-control_point"></i></button>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (typeof this.props.totalSets !== 'undefined') {
            this.props.fields.removeAll();
            for (let index = 0; index < this.props.totalSets; index++) {
                this.props.fields.push({});
            }
        }
    }
}

export default SetsAdvanceView;