import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { InputField } from '../../../helpers/FormControlHelper';
import { FaSpinner } from 'react-icons/lib/fa';
import { Alert } from "react-bootstrap";
import { required, minLength, maxLength } from '../../../formValidation/validationRules';

const min3 = minLength(3);
const max50 = maxLength(50);

class BodyPartsSave extends Component {
    render() {
        const { show, handleClose, handleSubmit, saveLoading, saveError } = this.props;
        return (
            <div className="save-body-part-modal-wrapper">
                <Modal show={show} className="gallery-popup body-part-save-modal">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="gallery-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Save Body Parts</h3>
                        </div>

                        <div className="progress-popup-body">

                            {saveError && saveError.length > 0 &&
                                <Alert bsStyle="danger">
                                    {
                                        saveError.map((e, i) => {
                                            return <p key={i}>{e}</p>
                                        })
                                    }
                                </Alert>
                            }

                            <Field
                                name="bodypart"
                                className="form-control"
                                label="Body Part"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Body Part"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required, min3, max50]}
                                requiredAstrisk={true}
                            />
                            <Field
                                name="id"
                                component="input"
                                type="hidden"
                            />
                            <div className="btn-wrap">
                                <button type="submit" className="pink-btn" disabled={saveLoading}>
                                    {!saveLoading && <i className="icon-save"></i>}
                                    {saveLoading && <FaSpinner className="loader-spinner" />}
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

BodyPartsSave = reduxForm({
    form: 'body_part_save_form'
})(BodyPartsSave);

const mapStateToProps = (state) => {
    const { adminBodyParts } = state;
    return {
        saveLoading: adminBodyParts.get('saveLoading'),
        saveError: adminBodyParts.get('saveError'),
    };
}

export default connect(
    mapStateToProps,
)(BodyPartsSave);