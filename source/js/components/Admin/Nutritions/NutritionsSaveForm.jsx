import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Modal, Button } from 'react-bootstrap';

class NutritionsSaveForm extends Component {
    // componentDidMount() {
    //     const { initialize, nutritionData } = this.props;
    //     console.log('sbbbb', nutritionData);
    //     initialize(nutritionData);
    // }

    // componentWillUpdate(){
    //     const { initialize, nutritionData } = this.props;
    //     initialize(nutritionData);
    // }

    render() {
        const { title, showModal, handleShowModal, handleSubmit, nutritionData } = this.props;
        return (
            <div className="nutritions-save-form-wrapper">
                <div className="nutritions-save-modal-wrapper">
                    <Modal show={showModal}>
                        <form onSubmit={handleSubmit}>
                            <Modal.Header>
                                {title &&
                                    <Modal.Title>{title}</Modal.Title>
                                }
                                {!title &&
                                    <Modal.Title>Save Nutrition</Modal.Title>
                                }
                            </Modal.Header>

                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-12 mb-20">
                                        <label htmlFor="">Name</label>
                                        <Field
                                            name="name"
                                            component="input"
                                            type="text"
                                            placeholder="Name"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-md-12 mb-20">
                                        <label htmlFor="">Description</label>
                                        <Field
                                            name="description"
                                            component="textarea"
                                            placeholder="Description"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={() => handleShowModal(false)}>Close</Button>
                                <Button type="submit" bsStyle="primary">Save</Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

NutritionsSaveForm = reduxForm({
    form: 'nutritionSave'
})(NutritionsSaveForm);

export default NutritionsSaveForm;