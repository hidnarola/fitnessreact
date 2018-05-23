import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/lib/fa';
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
    SelectField_ReactSelect,
    SelectField_ReactSelectMulti,
    FileField_Dropzone_Multi,
    EditorField
} from '../../../helpers/FormControlHelper';
import {
    EXERCISE_MECHANICS_ISOLATION,
    EXERCISE_MECHANICS_COMPOUND,
    EXERCISE_DIFFICULTY_BEGINNER,
    EXERCISE_DIFFICULTY_INTERMEDIATE,
    EXERCISE_DIFFICULTY_EXPERT,
    SERVER_BASE_URL
} from '../../../constants/consts';
import ExerciseSteps from './ExerciseSteps';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { exerciseSelectOneRequest } from '../../../actions/admin/exercises';
import _ from 'lodash';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import ExerciseTips from './ExerciseTips';

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
            initPageDataLoad: false,
            selectDataInit: false,
            showDeleteImageModel: false,
            selectedImageToDelete: null,
            deletedImages: [],
            exerciseImages: [],
            description: '',
        };
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        this.setState({
            initPageDataLoad: true
        });
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(exerciseTypeListRequest());
        dispatch(equipmentListRequest());
        if (typeof match.params.id !== 'undefined') {
            this.setState({
                selectDataInit: true
            });
            dispatch(exerciseSelectOneRequest(match.params.id))
        }
    }

    render() {
        const { bodyParts, equipments, exerciseTypes, handleSubmit } = this.props;
        const { exerciseImages, showDeleteImageModel, description } = this.state;
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
                                errorClass="help-block"
                                warningClass=""
                                validate={[required, minLength2]}
                            />
                            <Field
                                name="description"
                                value={description}
                                handleChange={this.handleChangeTextEditor}
                                className="editor-min-height-200"
                                label="Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={EditorField}
                            />
                            <Field
                                name="main_muscle"
                                label="Main Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Main Muscle Group"
                                component={SelectField_ReactSelect}
                                options={bodyPartsOptions}
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                                errorClass="help-block"
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
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="images"
                                label="Images"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Images"
                                component={FileField_Dropzone_Multi}
                                existingImages={exerciseImages}
                                showExistingImageDeleteModel={(path) => this.handleDeleteImageModel(true, path)}
                            />
                            <Field
                                name="deleted_images"
                                component='input'
                                type='hidden'
                            />
                            <FieldArray
                                name="steps"
                                component={ExerciseSteps}
                            />
                            <FieldArray
                                name="tips"
                                component={ExerciseTips}
                            />
                            <div className="col-md-12 mb-20 clear-both text-center">
                                <div className="stepbox-b stepbox-b-center">
                                    <NavLink to={adminRouteCodes.EXERCISE} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <DeleteConfirmation
                    show={showDeleteImageModel}
                    handleClose={() => this.handleDeleteImageModel(false)}
                    handleYes={this.handleDeleteImage}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const { initPageDataLoad, selectDataInit, deletedImages } = this.state;
        const {
            bodyPartsLoading,
            equipmentsLoading,
            exerciseTypesLoading,
            loading,
            dispatch,
            match,
            initialize,
            exercise,
            bodyParts,
            equipments,
            exerciseTypes
        } = this.props;
        if (typeof match.params.id !== 'undefined') {
            if (selectDataInit && initPageDataLoad && !bodyPartsLoading && !equipmentsLoading && !exerciseTypesLoading && !loading) {
                const bodyPartsOptions = prepareDropdownOptionsData(bodyParts, '_id', 'bodypart');
                const equipmentsOptions = prepareDropdownOptionsData(equipments, '_id', 'name');
                const exerciseTypesOptions = prepareDropdownOptionsData(exerciseTypes, '_id', 'name');
                this.setState({
                    selectDataInit: false,
                    initPageDataLoad: false,
                });
                dispatch(hidePageLoader());
                let otherMuscle = _.map(exercise.otherMuscleGroup, (id) => {
                    return _.find(bodyPartsOptions, (o) => {
                        return (o.value === id);
                    })
                });
                let detailedMuscle = _.map(exercise.detailedMuscleGroup, (id) => {
                    return _.find(bodyPartsOptions, (o) => {
                        return (o.value === id);
                    })
                });
                let equips = _.map(exercise.equipments, (id) => {
                    return _.find(equipmentsOptions, (o) => {
                        return (o.value === id);
                    })
                });
                let steps = _.map(exercise.steps, (name) => {
                    return {
                        name
                    }
                });
                let tips = _.map(exercise.tips, (name) => {
                    return {
                        name
                    }
                });
                let exerciseData = {
                    name: exercise.name,
                    description: exercise.description,
                    main_muscle: _.find(bodyPartsOptions, (o) => { return (o.value === exercise.mainMuscleGroup) }),
                    other_muscle: otherMuscle,
                    detailed_muscle: detailedMuscle,
                    type: _.find(exerciseTypesOptions, (o) => { return (o.value === exercise.type) }),
                    mechanics: _.find(mechanicsOptions, (o) => { return (o.value === exercise.mechanics) }),
                    equipments: equips,
                    difficulty_level: _.find(difficultyLevelOptions, (o) => { return (o.value === exercise.difficltyLevel) }),
                    steps: steps,
                    tips: tips,
                    deleted_images: deletedImages
                };
                initialize(exerciseData);
                let exerciseImages = exercise.images;
                this.setState({
                    exerciseImages: exerciseImages,
                    description: exercise.description,
                });
            }
        } else {
            if (initPageDataLoad && !bodyPartsLoading && !equipmentsLoading && !exerciseTypesLoading) {
                this.setState({
                    selectDataInit: false,
                    initPageDataLoad: false,
                });
                dispatch(hidePageLoader());
            }
        }
    }

    // ----Start Methods----
    handleDeleteImageModel = (show, imageUrl = null) => {
        let state = {}
        if (show) {
            state = {
                showDeleteImageModel: true,
                selectedImageToDelete: imageUrl,
            }
        } else {
            state = {
                showDeleteImageModel: false,
                selectedImageToDelete: null,
            }
        }
        this.setState(state);
    }

    handleDeleteImage = () => {
        let { deletedImages, selectedImageToDelete, exerciseImages } = this.state;
        const { change } = this.props;
        _.remove(exerciseImages, (img) => {
            return img === selectedImageToDelete;
        });
        deletedImages.push(selectedImageToDelete);
        this.setState({
            deletedImages: deletedImages,
            exerciseImages: exerciseImages,
        });
        change('deleted_images', JSON.stringify(deletedImages));
        this.handleDeleteImageModel(false);
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('description', editorText);
        this.setState({ description: editorText });
    }
    // ----End Methods----
}

ExerciseForm = reduxForm({
    form: 'exerciseSaveForm',
    multipartForm: true
})(ExerciseForm)

const mapStateToProps = (state) => {
    const { adminBodyParts, adminEquipments, adminExerciseTypes, adminExercises } = state;
    return {
        loading: adminExercises.get('loading'),
        bodyPartsLoading: adminBodyParts.get('loading'),
        equipmentsLoading: adminEquipments.get('loading'),
        exerciseTypesLoading: adminExerciseTypes.get('loading'),
        error: adminExercises.get('error'),
        bodyPartsError: adminBodyParts.get('error'),
        equipmentsError: adminEquipments.get('error'),
        exerciseTypesError: adminExerciseTypes.get('error'),
        exercise: adminExercises.get('exercise'),
        bodyParts: adminBodyParts.get('bodyParts'),
        equipments: adminEquipments.get('equipments'),
        exerciseTypes: adminExerciseTypes.get('exerciseTypes'),
    };
}

ExerciseForm = withRouter(ExerciseForm);

export default connect(
    mapStateToProps,
)(ExerciseForm);