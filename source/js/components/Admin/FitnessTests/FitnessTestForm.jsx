import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import { InputField, SelectField_ReactSelect, FileField_Dropzone_Single, TextAreaField } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect, requiredImage, requiredReactSelectStatus } from '../../../formValidation/validationRules';
import { FaTrash } from 'react-icons/lib/fa'
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
    FITNESS_TEST_FORMAT_MULTISELECT,
    FITNESS_TEST_FORMAT_A_OR_B,
    SERVER_BASE_URL,
    FITNESS_FORMAT_OPTIONS
} from '../../../constants/consts';
import { capitalizeFirstLetter, te } from '../../../helpers/funs';
import FitnessTestMaxRep from './FitnessTestMaxRep';
import FitnessTestMultiselect from './FitnessTestMultiselect';
import { fitnessTestsSelectOneRequest } from '../../../actions/admin/fitnessTests';
import noImg from 'img/common/no-img.png'

const categoryOptions = [
    { value: FITNESS_TEST_CAT_STRENGTH, label: capitalizeFirstLetter(FITNESS_TEST_CAT_STRENGTH.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_FLEXIBILITY, label: capitalizeFirstLetter(FITNESS_TEST_CAT_FLEXIBILITY.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_POSTURE, label: capitalizeFirstLetter(FITNESS_TEST_CAT_POSTURE.replace('_', ' ')) },
    { value: FITNESS_TEST_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_CAT_CARDIO.replace('_', ' ')) },
];

const subCategoryOptions = [
    { value: FITNESS_TEST_SUB_CAT_UPPER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_UPPER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_SIDE, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_SIDE.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_LOWER_BODY, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_LOWER_BODY.replace('_', ' ')) },
    { value: FITNESS_TEST_SUB_CAT_CARDIO, label: capitalizeFirstLetter(FITNESS_TEST_SUB_CAT_CARDIO.replace('_', ' ')) },
];

const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
];

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
            selectActionInit: false,
            existingFeatureImages: [],
            existingImageA: [],
            existingImageB: [],
            existingMultiselectData: [],
            deletedMultiselectIds: [],
            formatOptions: [],
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
            existingFeatureImages,
            existingImageA,
            existingImageB,
            existingMultiselectData,
            formatOptions,
        } = this.state;
        const {
            format,
            handleSubmit,
        } = this.props;
        return (
            <div className="fitness-test-form-data">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
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
                                        validate={this.validationRules.name}
                                        requiredAstrisk={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
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
                                        requiredAstrisk={true}
                                        onChange={this.handleChangeCategory}
                                    />
                                </div>
                                <div className="col-md-6">
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
                                        requiredAstrisk={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
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
                                        requiredAstrisk={true}
                                    />
                                </div>

                                <div className="col-md-6">
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
                                        requiredAstrisk={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 no-padding">
                            <div className="row">
                                <div className="col-md-12">
                                    <Field
                                        name="image"
                                        label="Featured Image"
                                        labelClass="control-label display_block"
                                        mainWrapperClass="image-form-main-wrapper"
                                        wrapperClass="form-group"
                                        placeholder="Image"
                                        component={FileField_Dropzone_Single}
                                        validate={this.validationRules.image}
                                        errorClass="help-block"
                                        existingImages={existingFeatureImages}
                                        requiredAstrisk={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                id="description"
                                name="description"
                                component={TextAreaField}
                                label="Description"
                                labelClass="display_block"
                                wrapperClass="form-group"
                                className="form-control min-height-242 resize-vertical"
                            />
                        </div>
                        <div className="col-md-6">
                            <Field
                                id="instructions"
                                name="instructions"
                                component={TextAreaField}
                                label="Instructions"
                                labelClass="display_block"
                                wrapperClass="form-group"
                                className="form-control min-height-242 resize-vertical"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {format && format.value === FITNESS_TEST_FORMAT_MAX_REP &&
                                <FieldArray
                                    name="max_rep"
                                    component={FitnessTestMaxRep}
                                    options={maxRepOptions}
                                    validationRules={this.validationRules.max_rep}
                                    validate={this.validateMaxRepsRequired}
                                    wrapperClass="form-group"
                                    errorClass="help-block"
                                />
                            }
                            {format && format.value === FITNESS_TEST_FORMAT_MULTISELECT &&
                                <div className="fitness-test-multiselect-wrapper">
                                    {existingMultiselectData && existingMultiselectData.length > 0 &&
                                        <div className="fitness-test-existing">
                                            <div className="multiselect-wrapper dynamic-control-generator-wrapper mb-10">
                                                <label className="control-label">Multiselect Options</label>
                                                <div className="row pull-left width-100-per step-fields-wrapper">
                                                    {existingMultiselectData.map((data, index) => {
                                                        return (
                                                            <div className="col-md-12 step-field" key={index}>
                                                                <div className="col-md-4 pull-left">
                                                                    {data.title}
                                                                </div>
                                                                <div className="col-md-7 pull-left">
                                                                    <img
                                                                        src={SERVER_BASE_URL + data.image}
                                                                        alt="Multiselect Image"
                                                                        className="avatar"
                                                                        onError={(e) => {
                                                                            e.target.src = noImg
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-1 text-vcenter no-padding pull-left">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn_remove"
                                                                        onClick={() => {
                                                                            this.handleDeleteExistingMultiselectData(index);
                                                                        }}
                                                                        tabIndex="-1"
                                                                    >
                                                                        <FaTrash />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <FieldArray
                                        name="multiselect"
                                        component={FitnessTestMultiselect}
                                        validationRules={this.validationRules.multiselect}
                                        validate={this.validateMultiselectRequired}
                                        wrapperClass="form-group"
                                        errorClass="help-block"
                                    />
                                    <Field
                                        id="deletedMultiselectIds"
                                        name="deletedMultiselectIds"
                                        type="hidden"
                                        component="input"
                                    />
                                </div>
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
                                            requiredAstrisk={true}
                                        />
                                        <Field
                                            name="imageA"
                                            label="Image A"
                                            labelClass="control-label display_block"
                                            mainWrapperClass="image-form-main-wrapper"
                                            wrapperClass="form-group"
                                            placeholder="Image A"
                                            component={FileField_Dropzone_Single}
                                            validate={this.validationRules.imageA}
                                            errorClass="help-block"
                                            existingImages={existingImageA}
                                            requiredAstrisk={true}
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
                                            requiredAstrisk={true}
                                        />
                                        <Field
                                            name="imageB"
                                            label="Image B"
                                            labelClass="control-label display_block"
                                            mainWrapperClass="image-form-main-wrapper"
                                            wrapperClass="form-group"
                                            placeholder="Image B"
                                            component={FileField_Dropzone_Single}
                                            validate={this.validationRules.imageB}
                                            errorClass="help-block"
                                            existingImages={existingImageB}
                                            requiredAstrisk={true}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="d-flex pull-right mt-10">
                        <div className="col-md-12">
                            <Link to={adminRouteCodes.FITNESS_TESTS} className="custom-medium-link-btn">
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
            </div >
        );
    }

    componentDidUpdate(prevProps) {
        const {
            selectActionInit,
        } = this.state;
        const {
            loading,
            fitnessTest,
            initialize,
            fitnessTestError,
            history,
            category,
            change,
        } = this.props;
        if (selectActionInit && !loading) {
            if (fitnessTestError && fitnessTestError.length > 0) {
                te('No fitness test found! Please try again');
                history.push(adminRouteCodes.FITNESS_TESTS);
            } else {
                let _formatOptions = [];
                if (fitnessTest && fitnessTest.category) {
                    _formatOptions = (FITNESS_FORMAT_OPTIONS[fitnessTest.category]) ? FITNESS_FORMAT_OPTIONS[fitnessTest.category] : [];
                }
                this.setState({ selectActionInit: false, formatOptions: _formatOptions });
                var maxRepsData = [];
                var formDataInit = {
                    category: _.find(categoryOptions, { value: fitnessTest.category }),
                    subCategory: _.find(subCategoryOptions, { value: fitnessTest.subCategory }),
                    name: fitnessTest.name,
                    format: _.find(_formatOptions, { value: fitnessTest.format }),
                    status: _.find(statusOptions, { value: fitnessTest.status }),
                    description: fitnessTest.description,
                    instructions: fitnessTest.instructions,
                }
                this.setState({
                    existingFeatureImages: (fitnessTest.featureImage) ? [fitnessTest.featureImage] : [],
                });
                if (fitnessTest.format === FITNESS_TEST_FORMAT_MAX_REP) {
                    _.forEach(fitnessTest.max_rep, (val) => {
                        maxRepsData.push({
                            value: val,
                            label: val,
                        });
                    });
                    formDataInit.max_rep = maxRepsData;
                }
                if (fitnessTest.format === FITNESS_TEST_FORMAT_MULTISELECT) {
                    this.setState({ existingMultiselectData: fitnessTest.multiselect });
                }
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
        if (category !== prevProps.category) {
            if (category && category.value) {
                let formatOptions = (FITNESS_FORMAT_OPTIONS[category.value]) ? FITNESS_FORMAT_OPTIONS[category.value] : [];
                this.setState({ formatOptions: formatOptions });
                if (prevProps.category && prevProps.category.value && prevProps.category.value !== category.value) {
                    change('format', null);
                }
            } else {
                this.setState({ formatOptions: [] });
                change('format', null);
            }
        }
    }

    handleDeleteExistingMultiselectData = (index) => {
        let data = this.state.existingMultiselectData;
        let deletedIds = this.state.deletedMultiselectIds;
        let deletedId = (data[index]) ? data[index]._id : null;
        if (deletedId) {
            deletedIds.push(deletedId);
        }
        data.splice(index, 1);
        this.setState({
            existingMultiselectData: data,
            deletedMultiselectIds: deletedIds,
        });
        this.props.change('deletedMultiselectIds', JSON.stringify(deletedIds));
    }

    validateMaxRepsRequired = (value, allValues, props) => {
        if (typeof value === 'undefined' || value === '' || value === null || value.length <= 0) {
            return "Atleast one max rep option is required";
        }
        return undefined;
    }

    validateMultiselectRequired = (value, allValues, props) => {
        const { existingMultiselectData } = this.state;
        const { match } = this.props;
        if (match.params.id) {
            if (existingMultiselectData.length <= 0) {
                if (typeof value === 'undefined' || value === '' || value === null || value.length <= 0) {
                    return "Atleast one multiselect option is required";
                }
                return undefined;
            } else {
                return undefined;
            }
        } else {
            if (typeof value === 'undefined' || value === '' || value === null || value.length <= 0) {
                return "Atleast one multiselect option is required";
            }
            return undefined;
        }
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
        category: formSelector(state, 'category'),
        format: formSelector(state, 'format'),
        loading: adminFitnessTests.get('loading'),
        fitnessTestError: adminFitnessTests.get('error'),
        fitnessTest: adminFitnessTests.get('fitnessTest'),
    };
}

export default connect(
    mapStateToProps,
)(FitnessTestForm);