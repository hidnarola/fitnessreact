import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import { exerciseTypeListRequest } from '../../../actions/admin/exerciseTypes';
import { equipmentListRequest } from '../../../actions/admin/equipments';
import { prepareDropdownOptionsData } from '../../../helpers/funs';
import { reduxForm, Field, FieldArray } from 'redux-form';
import {
    required,
    maxLength,
    minLength,
    requiredReactSelect,
    requiredReactSelectMulti
} from '../../../formValidation/validationRules';
import {
    InputField,
    TextAreaField,
    SelectField_ReactSelect,
    SelectField_ReactSelectMulti,
    FileField_Dropzone
} from '../../../helpers/FormControlHelper';
import {
    EXERCISE_MECHANICS_ISOLATION,
    EXERCISE_MECHANICS_COMPOUND,
    EXERCISE_DIFFICULTY_BEGINNER,
    EXERCISE_DIFFICULTY_INTERMEDIATE,
    EXERCISE_DIFFICULTY_EXPERT
} from '../../../constants/consts';
import ExerciseSteps from './ExerciseSteps';
import { adminRouteCodes } from '../../../constants/adminRoutes';

const maxLength15 = maxLength(15);
const minLength2 = minLength(2);
const mechanicsOptions = [
    { value: EXERCISE_MECHANICS_COMPOUND, label: 'Compound' },
    { value: EXERCISE_MECHANICS_ISOLATION, label: 'Isolation' }
];
const difficultyLevelOptions = [
    { value: EXERCISE_DIFFICULTY_BEGINNER, label: 'Beginner' },
    { value: EXERCISE_DIFFICULTY_INTERMEDIATE, label: 'Intermediate' },
    { value: EXERCISE_DIFFICULTY_EXPERT, label: 'Expert' },
];

class ExerciseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initPageDataLoad: false
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({
            initPageDataLoad: true
        });
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(exerciseTypeListRequest());
        dispatch(equipmentListRequest());
    }

    render() {
        const { bodyParts, equipments, exerciseTypes, handleSubmit } = this.props;
        const bodyPartsOptions = prepareDropdownOptionsData(bodyParts, '_id', 'bodypart');
        const equipmentsOptions = prepareDropdownOptionsData(equipments, '_id', 'name');
        const exerciseTypesOptions = prepareDropdownOptionsData(exerciseTypes, '_id', 'name');
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass=""
                                warningClass=""
                                validate={[required, maxLength15, minLength2]}
                            />
                            <Field
                                name="description"
                                className="form-control"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
                            />
                            <Field
                                name="main_muscle"
                                label="Main Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Main Muscle Group"
                                component={SelectField_ReactSelect}
                                options={bodyPartsOptions}
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="other_muscle"
                                label="Other Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Other Muscle Group"
                                component={SelectField_ReactSelectMulti}
                                options={bodyPartsOptions}
                                validate={[requiredReactSelectMulti]}
                            />
                            <Field
                                name="detailed_muscle"
                                label="Detailed Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Detailed Muscle Group"
                                component={SelectField_ReactSelectMulti}
                                options={bodyPartsOptions}
                                validate={[requiredReactSelectMulti]}
                            />
                            <Field
                                name="type"
                                label="Type"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Type"
                                component={SelectField_ReactSelect}
                                options={exerciseTypesOptions}
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="mechanics"
                                label="Mechanics"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Mechanics"
                                component={SelectField_ReactSelect}
                                options={mechanicsOptions}
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="equipments"
                                label="Equipments"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Equipments"
                                component={SelectField_ReactSelectMulti}
                                options={equipmentsOptions}
                                validate={[requiredReactSelectMulti]}
                            />
                            <Field
                                name="difficulty_level"
                                label="Difficulty Level"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Difficulty Level"
                                component={SelectField_ReactSelect}
                                options={difficultyLevelOptions}
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="images"
                                label="Images"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Images"
                                component={FileField_Dropzone}
                                multiple={true}
                            />
                            <FieldArray
                                name="steps"
                                component={ExerciseSteps}
                            />
                            <div className="col-md-12 mb-20 clear-both">
                                <div className="stepbox-b">
                                    <NavLink to={adminRouteCodes.EXERCISE} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const { initPageDataLoad } = this.state;
        const { bodyPartsLoading, equipmentsLoading, exerciseTypesLoading, dispatch } = this.props;
        if (initPageDataLoad && !bodyPartsLoading && !equipmentsLoading && !exerciseTypesLoading) {
            this.setState({
                initPageDataLoad: false
            });
            dispatch(hidePageLoader());
        }
    }
}

ExerciseForm = reduxForm({
    form: 'exerciseSaveForm',
    multipartForm: true
})(ExerciseForm)

const mapStateToProps = (state) => {
    const { adminBodyParts, adminEquipments, adminExerciseTypes } = state;
    return {
        bodyPartsLoading: adminBodyParts.get('loading'),
        equipmentsLoading: adminEquipments.get('loading'),
        exerciseTypesLoading: adminExerciseTypes.get('loading'),
        bodyPartsError: adminBodyParts.get('error'),
        equipmentsError: adminEquipments.get('error'),
        exerciseTypesError: adminExerciseTypes.get('error'),
        bodyParts: adminBodyParts.get('bodyParts'),
        equipments: adminEquipments.get('equipments'),
        exerciseTypes: adminExerciseTypes.get('exerciseTypes'),
    };
}

export default connect(
    mapStateToProps,
)(ExerciseForm);