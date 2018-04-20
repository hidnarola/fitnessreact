import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { InputField, SelectField_ReactSelect, EditorField } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelectStatus } from '../../../formValidation/validationRules';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { badgeTypeSelectOneRequest } from '../../../actions/admin/badgeTasks';
import {
    STATUS_ACTIVE,
    STATUS_ACTIVE_STR,
    STATUS_INACTIVE_STR,
    STATUS_INACTIVE,
    TASKS_UNITS_KGS,
    TASKS_UNITS_KMS,
    TASKS_UNITS_KMS_STR,
    TASKS_UNITS_KGS_STR
} from '../../../constants/consts';

const unitOptions = [
    { value: TASKS_UNITS_KGS, label: TASKS_UNITS_KGS_STR },
    { value: TASKS_UNITS_KMS, label: TASKS_UNITS_KMS_STR },
];

const statusOptions = [
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

class BadgeTaskSaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        }
    }

    render() {
        const { description } = this.state;
        const { show, handleClose, handleSubmit } = this.props;
        return (
            <div className="exercise-type-save-form-wrapper">
                <div className="exercise-type-save-modal-wrapper">
                    <Modal show={show}>
                        <form onSubmit={handleSubmit}>
                            <Modal.Header>
                                <Modal.Title>Save Badge Task</Modal.Title>
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
                                            name="unit"
                                            label="Unit"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Unit"
                                            errorClass="help-block"
                                            component={SelectField_ReactSelect}
                                            options={unitOptions}
                                            validate={[requiredReactSelectStatus]}
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

    // Start funs
    handleChangeTextEditor = (editorText) => {
        this.props.change('description', editorText);
        this.setState({ description: editorText });
    }
    // End funs
}

BadgeTaskSaveForm = reduxForm({
    form: 'badgeTaskSave'
})(BadgeTaskSaveForm);

export default BadgeTaskSaveForm;