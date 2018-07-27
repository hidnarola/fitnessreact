import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, formValueSelector } from "redux-form";
import WorkoutInputField from './WorkoutInputField';
import WorkoutDropdownField from './WorkoutDropdownField';
import _ from "lodash";
import { prepareFieldsOptions } from '../../helpers/funs';
import { EXE_REST_TIME_UNITS, SCHEDULED_WORKOUT_TYPE_EXERCISE, SCHEDULED_WORKOUT_TYPE_SUPERSET, SCHEDULED_WORKOUT_TYPE_CIRCUIT } from '../../constants/consts';
import { required } from '../../formValidation/validationRules';

class SetsAdvanceView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {
            workout_type,
            workout_single,
            workout_superset,
            superset_sets,
            workout_circuit,
            circuit_sets,
            fields,
            index,
        } = this.props;
        if (workout_type === SCHEDULED_WORKOUT_TYPE_EXERCISE) {
            fields.removeAll();
            if (workout_single && workout_single.length === 1 && workout_single[0].sets) {
                for (let i = 0; i < workout_single[0].sets; i++) {
                    var obj = {};
                    if (workout_single[0].field1_value) {
                        obj.field1_value = workout_single[0].field1_value;
                        obj.field1_unit = workout_single[0].field1_unit;
                    }
                    if (workout_single[0].field2_value) {
                        obj.field2_value = workout_single[0].field2_value;
                        obj.field2_unit = workout_single[0].field2_unit;
                    }
                    if (workout_single[0].field3_value) {
                        obj.field3_value = workout_single[0].field3_value;
                        obj.field3_unit = workout_single[0].field3_unit;
                    }
                    if (workout_single[0].rest_time && i < (workout_single[0].sets - 1)) {
                        obj.rest_time = workout_single[0].rest_time;
                        obj.rest_time = workout_single[0].rest_time;
                    }
                    fields.push(obj);
                }
            } else {
                fields.push({});
            }
        } else if (workout_type === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
            fields.removeAll();
            if (workout_superset && superset_sets) {
                var o = workout_superset[index];
                for (let i = 0; i < superset_sets; i++) {
                    var obj = {};
                    if (o.field1_value) {
                        obj.field1_value = o.field1_value;
                        obj.field1_unit = o.field1_unit;
                    }
                    if (o.field2_value) {
                        obj.field2_value = o.field2_value;
                        obj.field2_unit = o.field2_unit;
                    }
                    if (o.field3_value) {
                        obj.field3_value = o.field3_value;
                        obj.field3_unit = o.field3_unit;
                    }
                    fields.push(obj);
                }
            }
        } else if (workout_type === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
            fields.removeAll();
            if (workout_circuit && circuit_sets) {
                var o = workout_circuit[index];
                for (let i = 0; i < circuit_sets; i++) {
                    var obj = {};
                    if (o.field1_value) {
                        obj.field1_value = o.field1_value;
                        obj.field1_unit = o.field1_unit;
                    }
                    if (o.field2_value) {
                        obj.field2_value = o.field2_value;
                        obj.field2_unit = o.field2_unit;
                    }
                    if (o.field3_value) {
                        obj.field3_value = o.field3_value;
                        obj.field3_unit = o.field3_unit;
                    }
                    fields.push(obj);
                }
            }
        }
    }

    render() {
        const {
            fields,
            selectedSingleExerciseObj,
            exerciseMeasurements,
            allowAddRemoveSets,
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
                            <label>Set {(index + 1)}</label>
                            {field1Options && field1Options.length > 0 &&
                                <Field
                                    id={`${field}.field1_value`}
                                    name={`${field}.field1_value`}
                                    component={WorkoutInputField}
                                    placeholder=""
                                    type="number"
                                    min={0}
                                    validate={[required]}
                                />
                            }
                            {field1Options && field1Options.length > 0 &&
                                <Field
                                    id={`${field}.field1_unit`}
                                    name={`${field}.field1_unit`}
                                    component={WorkoutDropdownField}
                                    options={field1Options}
                                    tabIndex={-1}
                                />
                            }
                            {field2Options && field2Options.length > 0 &&
                                <Field
                                    id={`${field}.field2_value`}
                                    name={`${field}.field2_value`}
                                    component={WorkoutInputField}
                                    placeholder=""
                                    type="number"
                                    min={0}
                                    validate={[required]}
                                />
                            }
                            {field2Options && field2Options.length > 0 &&
                                <Field
                                    id={`${field}.field2_unit`}
                                    name={`${field}.field2_unit`}
                                    component={WorkoutDropdownField}
                                    options={field2Options}
                                    tabIndex={-1}
                                />
                            }
                            {field3Options && field3Options.length > 0 &&
                                <Field
                                    id={`${field}.field3_value`}
                                    name={`${field}.field3_value`}
                                    component={WorkoutInputField}
                                    placeholder=""
                                    type="number"
                                    min={0}
                                    validate={[required]}
                                />
                            }
                            {field3Options && field3Options.length > 0 &&
                                <Field
                                    id={`${field}.field3_unit`}
                                    name={`${field}.field3_unit`}
                                    component={WorkoutDropdownField}
                                    options={field3Options}
                                    tabIndex={-1}
                                />
                            }
                            {index < (fields.length - 1) && (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <Field
                                    id={`${field}.rest_time`}
                                    name={`${field}.rest_time`}
                                    component={WorkoutInputField}
                                    placeholder="Rest Time"
                                    type="number"
                                    min={0}
                                    validate={[required]}
                                />
                            }
                            {index < (fields.length - 1) && (workoutType && workoutType === SCHEDULED_WORKOUT_TYPE_EXERCISE) &&
                                <Field
                                    id={`${field}.rest_time_unit`}
                                    name={`${field}.rest_time_unit`}
                                    component={WorkoutDropdownField}
                                    options={EXE_REST_TIME_UNITS}
                                    tabIndex={-1}
                                />
                            }
                            {(index > 0) && (allowAddRemoveSets) &&
                                <button type="button" className="sets-advance-view-cBtn" onClick={() => fields.remove(index)} tabIndex={-1}><i className="icon-cancel"></i></button>
                            }
                        </div>
                    );
                })}
                {(allowAddRemoveSets) && (fields && fields.length < 12) &&
                    <div className="sets-advance-view-block-btn">
                        <button type="button" className="" onClick={() => fields.push()}>Add Set<i className="icon-control_point"></i></button>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { workout_type, superset_sets, circuit_sets, fields } = this.props;
        if (workout_type === SCHEDULED_WORKOUT_TYPE_SUPERSET) {
            if (superset_sets > fields.length) {
                var diff = superset_sets - fields.length;
                for (let i = 0; i < diff; i++) {
                    fields.push({});
                }
            } else if (superset_sets < fields.length) {
                var diff = fields.length - superset_sets;
                for (let i = 0; i < diff; i++) {
                    fields.pop();
                }
            }
        } else if (workout_type === SCHEDULED_WORKOUT_TYPE_CIRCUIT) {
            if (circuit_sets > fields.length) {
                var diff = circuit_sets - fields.length;
                for (let i = 0; i < diff; i++) {
                    fields.push({});
                }
            } else if (circuit_sets < fields.length) {
                var diff = fields.length - circuit_sets;
                for (let i = 0; i < diff; i++) {
                    fields.pop();
                }
            }
        }
    }
}

const selector = formValueSelector('save_schedule_workout_form');

const mapStateToProps = (state) => {
    return {
        workout_type: selector(state, 'workout_type'),
        workout_single: selector(state, 'workout_single'),
        workout_superset: selector(state, 'workout_superset'),
        superset_sets: selector(state, 'superset_sets'),
        workout_circuit: selector(state, 'workout_circuit'),
        circuit_sets: selector(state, 'circuit_sets'),
    };
}

export default connect(mapStateToProps)(SetsAdvanceView);