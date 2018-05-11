import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { InputField, EditorField, SelectField_ReactSelect } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelectStatus } from '../../../formValidation/validationRules';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { exerciseTypeSelectOneRequest } from '../../../actions/admin/exerciseTypes';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_ACTIVE_STR,
    STATUS_INACTIVE_STR
} from '../../../constants/consts';

const statusOptions = [
    { value: STATUS_ACTIVE, label: STATUS_ACTIVE_STR },
    { value: STATUS_INACTIVE, label: STATUS_INACTIVE_STR },
];

class ExerciseTypeSaveForm extends Component {
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
                    <Modal show={show} onHide={handleClose}>
                        <form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Save Exercise Type</Modal.Title>
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

ExerciseTypeSaveForm = reduxForm({
    form: 'exerciseTypeSave'
})(ExerciseTypeSaveForm);

export default ExerciseTypeSaveForm;