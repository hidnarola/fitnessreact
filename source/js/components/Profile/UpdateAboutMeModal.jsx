import React, { Component } from 'react';
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { EditorField, InputField } from '../../helpers/FormControlHelper';
import { MEASUREMENT_UNIT_POUND, MEASUREMENT_UNIT_INCH } from '../../constants/consts';
import { min, max, validNumber } from '../../formValidation/validationRules';

const min50 = min(50);
const min44 = min(44);
const min20 = min(20);
const max1000 = max(1000);
const max600 = max(600);
const max240 = max(240);
const max2200 = max(2200);

class UpdateAboutMeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutMe: '',
        }
    }

    render() {
        const { show, handleClose, handleSubmit, heightUnit, weightUnit } = this.props;
        const { aboutMe } = this.state;
        let validateWeight = (weightUnit !== MEASUREMENT_UNIT_POUND) ? [validNumber, min20, max1000] : [validNumber, min44, max2200];
        let validateHeight = (heightUnit !== MEASUREMENT_UNIT_INCH) ? [validNumber, min50, max600] : [validNumber, min20, max240];
        return (
            <div className="about-me-update-modal-save-modal-wrapper">
                <Modal show={show} bsSize="large" className="progress-popup update-prfl-dbt-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Update Details</h3>
                        </div>

                        <div className="progress-popup-body">
                            <ul className="common-ul">
                                <li>
                                    <Field
                                        name="about_me"
                                        value={aboutMe}
                                        handleChange={this.handleChangeTextEditor}
                                        className="editor-min-height-200"
                                        label="About me"
                                        labelClass="control-label display_block"
                                        wrapperClass="form-group"
                                        placeholder="Description"
                                        component={EditorField}
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="height"
                                        type="text"
                                        className="form-control"
                                        label={`Height (${heightUnit})`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Height (${heightUnit})`}
                                        component={InputField}
                                        errorClass="help-block"
                                        validate={validateHeight}
                                    />
                                    <Field
                                        name="heightUnit"
                                        component="input"
                                        type="hidden"
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="weight"
                                        type="text"
                                        className="form-control"
                                        label={`Weight (${weightUnit})`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Weight (${weightUnit})`}
                                        component={InputField}
                                        errorClass="help-block"
                                        validate={validateWeight}
                                    />
                                    <Field
                                        name="weightUnit"
                                        component="input"
                                        type="hidden"
                                    />
                                </li>
                                <li>
                                    <div className="add-log d-flex">
                                        <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
    }
}

const selector = formValueSelector('aboutMeUpdateModalForm')

UpdateAboutMeModal = reduxForm({
    form: 'aboutMeUpdateModalForm'
})(UpdateAboutMeModal);

const mapStateToProps = (state) => {
    return {
        heightUnit: selector(state, 'heightUnit'),
        weightUnit: selector(state, 'weightUnit'),
    };
}

export default connect(mapStateToProps)(UpdateAboutMeModal);