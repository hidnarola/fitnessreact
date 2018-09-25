import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { bodyPartListRequest } from '../../../actions/admin/bodyParts';
import { equipmentListRequest } from '../../../actions/admin/equipments';
import { prepareDropdownOptionsData } from '../../../helpers/funs';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import {
    required,
    maxLength,
    minLength,
    requiredReactSelect,
    requiredReactSelectMulti,
    requiredReactSelectStatus
} from '../../../formValidation/validationRules';
import {
    InputField,
    SelectField_ReactSelect,
    SelectField_ReactSelectMulti,
    EditorField,
    FileField_Dropzone_Single
} from '../../../helpers/FormControlHelper';
import {
    EXERCISE_MECHANICS_ISOLATION,
    EXERCISE_MECHANICS_COMPOUND,
    EXERCISE_DIFFICULTY_BEGINNER,
    EXERCISE_DIFFICULTY_INTERMEDIATE,
    EXERCISE_DIFFICULTY_EXPERT,
    EXE_CATS,
    EXE_CAT_SCAT,
    EXE_SCATS,
} from '../../../constants/consts';
import ExerciseSteps from './ExerciseSteps';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { exerciseSelectOneRequest } from '../../../actions/admin/exercises';
import _ from 'lodash';
import DeleteConfirmation from '../Common/DeleteConfirmation';
import ExerciseTips from './ExerciseTips';

const max150 = maxLength(150);
const min3 = minLength(3);
const mechanicsOptions = [
    { value: EXERCISE_MECHANICS_COMPOUND, label: 'Compound' },
    { value: EXERCISE_MECHANICS_ISOLATION, label: 'Isolation' }
];
const difficultyLevelOptions = [
    { value: EXERCISE_DIFFICULTY_BEGINNER, label: 'Beginner' },
    { value: EXERCISE_DIFFICULTY_INTERMEDIATE, label: 'Intermediate' },
    { value: EXERCISE_DIFFICULTY_EXPERT, label: 'Expert' },
];
const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
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
            subCategories: [],
            subCategoriesValidation: [],
        };
        this.allowChangeSubCategory = false;
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        this.setState({
            initPageDataLoad: true
        });
        dispatch(showPageLoader());
        dispatch(bodyPartListRequest());
        dispatch(equipmentListRequest());
        if (typeof match.params.id !== 'undefined') {
            this.setState({
                selectDataInit: true
            });
            dispatch(exerciseSelectOneRequest(match.params.id))
        }
    }

    render() {
        const { bodyParts, equipments, handleSubmit } = this.props;
        const { exerciseImages, showDeleteImageModel, description, subCategories, subCategoriesValidation } = this.state;
        const bodyPartsOptions = prepareDropdownOptionsData(bodyParts, '_id', 'bodypart');
        const equipmentsOptions = prepareDropdownOptionsData(equipments, '_id', 'name');
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <Field
                                name="category"
                                label="Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Category"
                                component={SelectField_ReactSelect}
                                options={EXE_CATS}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                                onChange={this.handleCategoryChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="sub_category"
                                label="Sub Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Sub Category"
                                component={SelectField_ReactSelect}
                                options={subCategories}
                                errorClass="help-block"
                                validate={subCategoriesValidation}
                            />
                        </div>
                        <div className="col-md-4">
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
                                validate={[required, min3, max150]}
                            />
                        </div>
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-2">
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={statusOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelectStatus]}
                            />
                        </div>
                        <div className="col-md-2">
                            <Field
                                name="mechanics"
                                label="Mechanics"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Mechanics"
                                component={SelectField_ReactSelect}
                                options={mechanicsOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelectStatus]}
                            />
                        </div>
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="other_muscle"
                                label="Other Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Other Muscle Group"
                                component={SelectField_ReactSelectMulti}
                                options={bodyPartsOptions}
                            />
                        </div>
                        <div className="col-md-4">
                            <Field
                                name="detailed_muscle"
                                label="Detailed Muscle Group"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Detailed Muscle Group"
                                component={SelectField_ReactSelectMulti}
                                options={bodyPartsOptions}
                            />
                        </div>
                        <div className="col-md-6">
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
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="images"
                                label="Images"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Images"
                                component={FileField_Dropzone_Single}
                                existingImages={exerciseImages}
                                showExistingImageDeleteModel={(path) => this.handleDeleteImageModel(true, path)}
                            />
                        </div>
                        <Field
                            name="deleted_images"
                            component='input'
                            type='hidden'
                        />
                        <div className="col-md-12 mb-20">
                            <FieldArray
                                name="steps"
                                component={ExerciseSteps}
                            />
                        </div>
                        <div className="col-md-12 mb-10">
                            <FieldArray
                                name="tips"
                                component={ExerciseTips}
                            />
                        </div>
                    </div>
                    <div className="d-flex pull-right mt-10">
                        <div className="col-md-12">
                            <Link to={adminRouteCodes.EXERCISE} className="custom-medium-link-btn">
                                <span>Back</span>
                                <i className="icon-arrow_back"></i>
                            </Link>
                            <button type="submit" className="custom-medium-btn">
                                <span>Save</span>
                                <i className="icon-save"></i>
                            </button>
                        </div>
                    </div>
                </form>

                <DeleteConfirmation
                    show={showDeleteImageModel}
                    handleClose={() => this.handleDeleteImageModel(false)}
                    handleYes={this.handleDeleteImage}
                />
            </div >
        );
    }

    componentDidUpdate(prevProps) {
        const { initPageDataLoad, selectDataInit, deletedImages } = this.state;
        const {
            bodyPartsLoading,
            equipmentsLoading,
            loading,
            dispatch,
            match,
            initialize,
            exercise,
            bodyParts,
            equipments,
            selectedCategory,
        } = this.props;
        if (typeof match.params.id !== 'undefined') {
            if (selectDataInit && initPageDataLoad && !bodyPartsLoading && !equipmentsLoading && !loading) {
                const bodyPartsOptions = prepareDropdownOptionsData(bodyParts, '_id', 'bodypart');
                const equipmentsOptions = prepareDropdownOptionsData(equipments, '_id', 'name');
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
                let subCats = _.find(EXE_CAT_SCAT, ['key', exercise.category]);
                let subCatsOptions = [];
                if (subCats) {
                    let validations = [];
                    if (subCats.value.length > 0) {
                        validations = [requiredReactSelect];
                    }
                    subCatsOptions = subCats.value;
                    this.setState({ subCategories: subCats.value, subCategoriesValidation: validations });
                }
                let exerciseData = {
                    category: _.find(EXE_CATS, (o) => { return (o.value === exercise.category) }),
                    sub_category: _.find(subCatsOptions, (o) => { return (o.value === exercise.subCategory) }),
                    name: exercise.name,
                    description: exercise.description,
                    main_muscle: _.find(bodyPartsOptions, (o) => { return (o.value === exercise.mainMuscleGroup) }),
                    other_muscle: otherMuscle,
                    detailed_muscle: detailedMuscle,
                    mechanics: _.find(mechanicsOptions, (o) => { return (o.value === exercise.mechanics) }),
                    equipments: equips,
                    difficulty_level: _.find(difficultyLevelOptions, (o) => { return (o.value === exercise.difficltyLevel) }),
                    steps: steps,
                    tips: tips,
                    deleted_images: deletedImages,
                    status: _.find(statusOptions, (o) => { return (o.value === exercise.status) }),
                };
                initialize(exerciseData);
                let exerciseImages = exercise.images;
                this.setState({
                    exerciseImages: exerciseImages,
                    description: exercise.description,
                });
            }
        } else {
            if (initPageDataLoad && !bodyPartsLoading && !equipmentsLoading) {
                this.setState({
                    selectDataInit: false,
                    initPageDataLoad: false,
                });
                dispatch(hidePageLoader());
            }
        }
        if (selectedCategory && prevProps.selectedCategory !== selectedCategory && this.allowChangeSubCategory) {
            this.allowChangeSubCategory = false;
            let subCats = _.find(EXE_CAT_SCAT, ['key', selectedCategory.value]);
            if (subCats) {
                let validations = [];
                if (subCats.value.length > 0) {
                    validations = [requiredReactSelect];
                }
                this.props.change('sub_category', '');
                this.setState({ subCategories: subCats.value, subCategoriesValidation: validations });
            }
        }
    }

    handleCategoryChange = () => {
        this.allowChangeSubCategory = true;
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

const exerciseSaveFormSelector = formValueSelector('exerciseSaveForm');

ExerciseForm = reduxForm({
    form: 'exerciseSaveForm',
    multipartForm: true
})(ExerciseForm)

const mapStateToProps = (state) => {
    const { adminBodyParts, adminEquipments, adminExercises } = state;
    return {
        loading: adminExercises.get('loading'),
        bodyPartsLoading: adminBodyParts.get('loading'),
        equipmentsLoading: adminEquipments.get('loading'),
        error: adminExercises.get('error'),
        bodyPartsError: adminBodyParts.get('error'),
        equipmentsError: adminEquipments.get('error'),
        exercise: adminExercises.get('exercise'),
        bodyParts: adminBodyParts.get('bodyParts'),
        equipments: adminEquipments.get('equipments'),
        selectedCategory: exerciseSaveFormSelector(state, 'category'),
    };
}

ExerciseForm = withRouter(ExerciseForm);

export default connect(
    mapStateToProps,
)(ExerciseForm);