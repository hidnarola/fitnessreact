import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import { InputField, EditorField, SelectField_ReactSelect, FileField_Dropzone } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect } from '../../../formValidation/validationRules';
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
        }
    }

    render() {
        const {
            description,
            instructions,
        } = this.state;
        const {
            format,
        } = this.props;
        return (
            <div className="fitness-test-form-data">
                <form>
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
                                validate={[requiredReactSelect]}
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
                                validate={[requiredReactSelect]}
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
                                warningClass=""
                                validate={[required]}
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
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="image"
                                label="Featured Image"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Image"
                                component={FileField_Dropzone}
                                existingImages={[]}
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
                                />
                            }
                            {format && format.value === FITNESS_TEST_FORMAT_MULTISELECT &&
                                <FieldArray
                                    name="multiselect"
                                    component={FitnessTestMultiselect}
                                />
                            }
                            {format && format.value === FITNESS_TEST_FORMAT_A_OR_B &&
                                <div>
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
                                        validate={[required]}
                                    />
                                    <Field
                                        name="imageA"
                                        label="Image A"
                                        labelClass="control-label display_block"
                                        mainWrapperClass="image-form-main-wrapper"
                                        wrapperClass="form-group"
                                        placeholder="Image A"
                                        component={FileField_Dropzone}
                                        existingImages={[]}
                                    />
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
                                        validate={[required]}
                                    />
                                    <Field
                                        name="imageB"
                                        label="Image B"
                                        labelClass="control-label display_block"
                                        mainWrapperClass="image-form-main-wrapper"
                                        wrapperClass="form-group"
                                        placeholder="Image B"
                                        component={FileField_Dropzone}
                                        existingImages={[]}
                                    />
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

    handleChangeTextEditor = (name, value) => {
        this.props.change(name, value);
        this.setState({ [name]: value });
    }
}

FitnessTestForm = reduxForm({
    form: 'fitnessTestForm'
})(FitnessTestForm)

const formSelector = formValueSelector('fitnessTestForm');

const mapStateToProps = (state) => {
    return {
        format: formSelector(state, 'format'),
    };
}

export default connect(
    mapStateToProps,
)(FitnessTestForm);