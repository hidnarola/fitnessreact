import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';
import { EditorField, InputField } from '../../helpers/FormControlHelper';
import { required } from '../../formValidation/validationRules';

class UpdateAboutMeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutMe: '',
        }
    }

    render() {
        const { show, handleClose, handleSubmit } = this.props;
        const { aboutMe } = this.state;
        return (
            <div className="about-me-update-modal-save-form-wrapper">
                <div className="about-me-update-modal-save-modal-wrapper">
                    <Modal show={show}>
                        <form onSubmit={handleSubmit}>
                            <Modal.Header>
                                <Modal.Title>Update Details</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-12">
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
                                        <Field
                                            name="height"
                                            type="number"
                                            className="form-control"
                                            label="Height"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Height"
                                            component={InputField}
                                            errorClass="help-block"
                                            validate={[required]}
                                        />
                                        <Field
                                            name="weight"
                                            type="number"
                                            className="form-control"
                                            label="Weight"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Weight"
                                            component={InputField}
                                            errorClass="help-block"
                                            validate={[required]}
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

    handleChangeTextEditor = (editorText) => {
        this.props.change('about_me', editorText);
        this.setState({ aboutMe: editorText });
    }
}

UpdateAboutMeModal = reduxForm({
    form: 'aboutMeUpdateModalForm'
})(UpdateAboutMeModal);

export default UpdateAboutMeModal;