import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { InputField, SelectField_ReactSelect } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelectStatus } from '../../../formValidation/validationRules';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { badgeCategorySelectOneRequest } from '../../../actions/admin/badgeCategories';
import { STATUS_ACTIVE, STATUS_ACTIVE_STR, STATUS_INACTIVE_STR, STATUS_INACTIVE } from '../../../constants/consts';

const statusOptions = [
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

class BadgeCategorySaveForm extends Component {
    render() {
        const { show, handleClose, handleSubmit } = this.props;
        return (
            <div className="badge-category-save-form-wrapper">
                <div className="badge-category-save-modal-wrapper">
                    <Modal show={show}>
                        <form onSubmit={handleSubmit}>
                            <Modal.Header>
                                <Modal.Title>Save Badge Category</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
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
                                            validate={[required]}
                                        />
                                        <Field
                                            name="status"
                                            label="Status"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Status"
                                            errorClass="help-block"
                                            component={SelectField_ReactSelect}
                                            options={statusOptions}
                                            validate={[requiredReactSelectStatus]}
                                        />
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type="submit" bsStyle="primary">Save</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

BadgeCategorySaveForm = reduxForm({
    form: 'badgeCategorySave'
})(BadgeCategorySaveForm);

export default BadgeCategorySaveForm;