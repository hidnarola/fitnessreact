import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { SelectField_ReactSelect, InputField, EditorField } from '../../helpers/FormControlHelper';
import { required, requiredReactSelect, minLength, maxLength, requiredReactSelectNumberOptions } from '../../formValidation/validationRules';

const minLength2 = minLength(2);
const maxLength100 = maxLength(100);
const maxLength5000 = maxLength(5000);

class SaveProgramMasterPageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
    }

    render() {
        const { handleSubmit, privacyOptions, goalOptions, levelOptions, backUrl } = this.props;
        const { description } = this.state;
        return (
            <form method="POST" onSubmit={handleSubmit}>
                <div className="d-flex">
                    <div className="col-md-6">
                        <Field
                            name="title"
                            label="Name"
                            labelClass="control-label display_block"
                            className="form-control"
                            wrapperClass="form-group"
                            placeholder="Name"
                            component={InputField}
                            errorClass="help-block"
                            validate={[required, minLength2, maxLength100]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            id="privacy"
                            name="privacy"
                            label="Privacy"
                            labelClass="control-label display_block"
                            className=""
                            wrapperClass="form-group"
                            placeholder="Privacy"
                            component={SelectField_ReactSelect}
                            options={privacyOptions}
                            errorClass="help-block"
                            validate={[requiredReactSelectNumberOptions]}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-6">
                        <Field
                            id="goal"
                            name="goal"
                            label="Goal"
                            labelClass="control-label display_block"
                            className=""
                            wrapperClass="form-group"
                            placeholder="Goal"
                            component={SelectField_ReactSelect}
                            options={goalOptions}
                            errorClass="help-block"
                            validate={[requiredReactSelect]}
                        />
                    </div>
                    <div className="col-md-6">
                        <Field
                            id="level"
                            name="level"
                            label="Level"
                            labelClass="control-label display_block"
                            className=""
                            wrapperClass="form-group"
                            placeholder="Level"
                            component={SelectField_ReactSelect}
                            options={levelOptions}
                            errorClass="help-block"
                            validate={[requiredReactSelect]}
                        />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="col-md-12">
                        <Field
                            id="description"
                            name="description"
                            value={description}
                            handleChange={this.handleChangeTextEditor}
                            className="editor-min-height-200"
                            label="Description"
                            labelClass="control-label display_block"
                            wrapperClass="form-group"
                            placeholder="Description"
                            component={EditorField}
                            errorClass="help-block"
                            validate={[maxLength5000]}
                        />
                    </div>
                </div>
                <div className="d-flex pull-right mt-10">
                    <div className="col-md-12">
                        <Link to={backUrl} className="custom-medium-link-btn">
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
        );
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('description', editorText);
        this.setState({ description: editorText });
    }
}

SaveProgramMasterPageForm = reduxForm({
    form: 'save_program_master_form',
})(SaveProgramMasterPageForm);

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(SaveProgramMasterPageForm);