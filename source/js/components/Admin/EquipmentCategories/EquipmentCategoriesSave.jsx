import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { InputField, TextAreaField } from '../../../helpers/FormControlHelper';
import { FaSpinner } from 'react-icons/lib/fa';
import { Alert } from "react-bootstrap";

class EquipmentCategoriesSave extends Component {
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
                            <h3 className="title-h3">Save Equipment Category</h3>
                        </div>

                        <div className="progress-popup-body">

                            {saveError && saveError.length > 0 &&
                                <Alert bsStyle="danger">
                                    {
                                        saveError.map((e, i) => {
                                            return (
                                                <p key={i}>{e}</p>
                                            );
                                        })
                                    }
                                </Alert>
                            }

                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass="help-block"
                                />
                            <Field
                                name="description"
                                label="Description"
                                labelClass="control-label display_block"
                                className="form-control resize-vertical min-height-80"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
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

EquipmentCategoriesSave = reduxForm({
    form: 'equipment_category_save_form'
})(EquipmentCategoriesSave);

const mapStateToProps = (state) => {
    const { adminEquipmentCategories } = state;
    return {
        saveLoading: adminEquipmentCategories.get('saveLoading'),
        saveError: adminEquipmentCategories.get('saveError'),
    };
}

export default connect(
    mapStateToProps,
)(EquipmentCategoriesSave);