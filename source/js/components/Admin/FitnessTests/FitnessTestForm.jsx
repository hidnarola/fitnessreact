import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import { InputField, EditorField, SelectField_ReactSelect, FileField_Dropzone_Single } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect, requiredImage } from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import {
    FITNESS_TEST_CAT_STRENGTH,
    FITNESS_TEST_CAT_FLEXIBILITY,
    FITNESS_TEST_CAT_POSTURE,
    FITNESS_TEST_CAT_CARDIO,
    FITNESS_TEST_SUB_CAT_UPPER_BODY,
    FITNESS_TEST_SUB_CAT_SIDE,
    FITNESS_TEST_SUB_CAT_LOWER_BODY,
    FITNESS_TEST_SUB_CAT_CARDIO,
    FITNESS_TEST_FORMAT_MAX_REP,
    FITNESS_TEST_FORMAT_MAX_REP_STR,
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_MULTISELECT_STR,
    FITNESS_TEST_FORMAT_TEXT_FIELD,
    FITNESS_TEST_FORMAT_TEXT_FIELD_STR,
    FITNESS_TEST_FORMAT_A_OR_B,
    FITNESS_TEST_FORMAT_A_OR_B_STR
} from '../../../constants/consts';
import { capitalizeFirstLetter } from '../../../helpers/funs';
import FitnessTestMaxRep from './FitnessTestMaxRep';
import FitnessTestMultiselect from './FitnessTestMultiselect';
import { fitnessTestsSelectOneRequest } from '../../../actions/admin/fitnessTests';

const categoryOptions = [
    { value: FITNESS_TEST_CAT_STRENGTH, label: capitalizeFirstLetter(FITNESS_TEST_CAT_STRENGTH.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_FLEXIBILITY, label: capitalizeFirstLetter(FITNESS_TEST_CAT_FLEXIBILITY.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_POSTURE, label: capitalizeFirstLetter(FITNESS_TEST_CAT_POSTURE.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_CAT_CARDIO.replace('_', ' ')) },
]

const subCategoryOptions = [
    { value: FITNESS_TEST_SUB_CAT_UPPER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_UPPER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_SIDE, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_SIDE.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_LOWER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_LOWER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_CARDIO.replace('_', ' ')) },
]

const formatOptions = [
    { value: FITNESS_TEST_FORMAT_TEXT_FIELD, label: FITNESS_TEST_FORMAT_TEXT_FIELD_STR },
    { value: FITNESS_TEST_FORMAT_MAX_REP, label: FITNESS_TEST_FORMAT_MAX_REP_STR },
    { value: FITNESS_TEST_FORMAT_MULTISELECT, label: FITNESS_TEST_FORMAT_MULTISELECT_STR },
    { value: FITNESS_TEST_FORMAT_A_OR_B, label: FITNESS_TEST_FORMAT_A_OR_B_STR },
]

const maxRepOptions = [];

for (let index = 1; index <= 30; index++) {
    maxRepOptions.push({
        value: index,
        label: index
    })
}

class FitnessTestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            instructions: '',
            selectActionInit: false,
            existingFeatureImages: [],
            existingImageA: [],
            existingImageB: [],
            existingMultiselectImages: [],
        }
        this.validationRules = {
            category: [requiredReactSelect],
            subCategory: [requiredReactSelect],
            name: [required],
            format: [requiredReactSelect],
            image: [requiredImage],
            titleA: [required],
            titleB: [required],
            imageA: [requiredImage],
            imageB: [requiredImage],
            max_rep: [requiredReactSelect],
            multiselect: {
                title: [required],
                image: [requiredImage],
            },
        };
    }

    componentWillMount() {
        const { match, dispatch } = this.props;
        if (match.params.id) {
            this.setState({ selectActionInit: true });
            dispatch(fitnessTestsSelectOneRequest(match.params.id));
            this.validationRules.image = [];
            this.validationRules.imageA = [];
            this.validationRules.imageB = [];
        }
    }

    render() {
        const {
            description,
            instructions,
            existingFeatureImages,
            existingImageA,
            existingImageB,
            existingMultiselectImages,
        } = this.state;
        const {
            format,
            handleSubmit,
        } = this.props;
        return (
            <div className="fitness-test-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="category"
                                label="Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Category"
                                component={SelectField_ReactSelect}
                                options={categoryOptions}
                                errorClass="help-block"
                                validate={this.validationRules.category}
                            />
                            <Field
                                name="subCategory"
                                label="Sub Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Sub Category"
                                component={SelectField_ReactSelect}
                                options={subCategoryOptions}
                                errorClass="help-block"
                                validate={this.validationRules.subCategory}
                            />
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass="help-block"
                                validate={this.validationRules.name}
                            />
                            <Field
                                name="format"
                                label="Format"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Format"
                                component={SelectField_ReactSelect}
                                options={formatOptions}
                                errorClass="help-block"
                                validate={this.validationRules.format}
                            />
                            <Field
                                name="image"
                                label="Featured Image"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Image"
                                className="filefield-dropzone-wrapper"
                                component={FileField_Dropzone_Single}
                                validate={this.validationRules.image}
                                errorClass="help-block"
                                existingImages={existingFeatureImages}
                            />
                            <Field
                                name="description"
                                value={description}
                                handleChange={(value) => this.handleChangeTextEditor('description', value)}
                                className="editor-min-height-200"
                                label="Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={EditorField}
                            />
                            <Field
                                name="instructions"
                                value={instructions}
                                handleChange={(value) => this.handleChangeTextEditor('instructions', value)}
                                className="editor-min-height-200"
                                label="Instructions"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Instructions"
                                component={EditorField}
                            />
                            {format && format.value === FITNESS_TEST_FORMAT_MAX_REP &&
                                <FieldArray
                                    name="max_rep"
                                    component={FitnessTestMaxRep}
                                    options={maxRepOptions}
                                    validationRules={this.validationRules.max_rep}
                                />
                            }
                            {format && format.value === FITNESS_TEST_FORMAT_MULTISELECT &&
                                <FieldArray
                                    name="multiselect"
                                    component={FitnessTestMultiselect}
                                    existingMultiselectImages={existingMultiselectImages}
                                    validationRules={this.validationRules.multiselect}
                                    handleDeleteExistingMultiselectImages={this.handleDeleteExistingMultiselectImages}
                                />
                            }
                            {format && format.value === FITNESS_TEST_FORMAT_A_OR_B &&
                                <div className="row">
                                    <div className="col-md-6">
                                        <Field
                                            name="titleA"
                                            className="form-control"
                                            label="Title A"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Title A"
                                            component={InputField}
                                            errorClass="help-block"
                                            warningClass=""
                                            validate={this.validationRules.titleA}
                                        />
                                        <Field
                                            name="imageA"
                                            label="Image A"
                                            labelClass="control-label display_block"
                                            mainWrapperClass="image-form-main-wrapper"
                                            wrapperClass="form-group"
                                            className="filefield-dropzone-wrapper"
                                            placeholder="Image A"
                                            component={FileField_Dropzone_Single}
                                            validate={this.validationRules.imageA}
                                            errorClass="help-block"
                                            existingImages={existingImageA}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Field
                                            name="titleB"
                                            className="form-control"
                                            label="Title B"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Title B"
                                            component={InputField}
                                            errorClass="help-block"
                                            warningClass=""
                                            validate={this.validationRules.titleB}
                                        />
                                        <Field
                                            name="imageB"
                                            label="Image B"
                                            labelClass="control-label display_block"
                                            mainWrapperClass="image-form-main-wrapper"
                                            wrapperClass="form-group"
                                            className="filefield-dropzone-wrapper"
                                            placeholder="Image B"
                                            component={FileField_Dropzone_Single}
                                            validate={this.validationRules.imageB}
                                            errorClass="help-block"
                                            existingImages={existingImageB}
                                        />
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 mb-20 clear-both text-center">
                                <div className="stepbox-b stepbox-b-center">
                                    <NavLink to={adminRouteCodes.FITNESS_TESTS} className="continues-btn">Back</NavLink>
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
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            fitnessTest,
            initialize,
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            var maxRepsData = [];
            var multiselectData = [];
            var formDataInit = {
                category: _.find(categoryOptions, { value: fitnessTest.category }),
                subCategory: _.find(subCategoryOptions, { value: fitnessTest.subCategory }),
                name: fitnessTest.name,
                format: _.find(formatOptions, { value: fitnessTest.format }),
                description: fitnessTest.description,
                instructions: fitnessTest.instructions,
            }
            this.setState({
                description: fitnessTest.description,
                instructions: fitnessTest.instructions,
                existingFeatureImages: (fitnessTest.image) ? [fitnessTest.image] : [],
            });
            if (fitnessTest.format === FITNESS_TEST_FORMAT_MAX_REP) {
                _.forEach(fitnessTest.max_rep, (val) => {
                    maxRepsData.push({
                        value: val,
                        label: val,
                    });
                });
            }
            formDataInit.max_rep = maxRepsData;
            if (fitnessTest.format === FITNESS_TEST_FORMAT_MULTISELECT) {
                var images = [];
                _.forEach(fitnessTest.multiselect, (obj) => {
                    multiselectData.push({
                        title: obj.title,
                    });
                    images.push(obj.image);
                });
                this.setState({ existingMultiselectImages: images });
            }
            formDataInit.multiselect = multiselectData;
            if (fitnessTest.format === FITNESS_TEST_FORMAT_A_OR_B) {
                formDataInit.titleA = fitnessTest.a_or_b[0].title;
                formDataInit.titleB = fitnessTest.a_or_b[1].title;
                this.setState({
                    existingImageA: [fitnessTest.a_or_b[0].image],
                    existingImageB: [fitnessTest.a_or_b[1].image],
                });
            }
            initialize(formDataInit);
        }
    }

    handleDeleteExistingMultiselectImages = (index) => {
        let images = this.state.existingMultiselectImages;
        images.splice(index, 1);
        this.setState({ existingMultiselectImages: images });
    }

    handleChangeTextEditor = (name, value) => {
        this.props.change(name, value);
        this.setState({ [name]: value });
    }
}

FitnessTestForm = reduxForm({
    form: 'fitnessTestForm'
})(FitnessTestForm)

FitnessTestForm = withRouter(FitnessTestForm);

const formSelector = formValueSelector('fitnessTestForm');

const mapStateToProps = (state) => {
    const { adminFitnessTests } = state;
    return {
        format: formSelector(state, 'format'),
        loading: adminFitnessTests.get('loading'),
        error: adminFitnessTests.get('error'),
        fitnessTest: adminFitnessTests.get('fitnessTest'),
    };
}

export default connect(
    mapStateToProps,
)(FitnessTestForm);