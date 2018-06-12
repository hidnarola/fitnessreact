import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { SelectField_ReactSelect } from '../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../formValidation/validationRules';
import { capitalizeFirstLetter } from '../../helpers/funs';

class AddSecondaryGoal extends Component {
    render() {
        const {
            show,
            handleClose,
            handleSubmit,
            errors,
            goals,
        } = this.props;
        return (
            <div className="add-secondary-goal-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup">
                    <form onSubmit={handleSubmit}>
                        <div className="gallery-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Create secondary goal</h3>
                        </div>

                        <div className="progress-popup-body">
                            {errors && errors.length > 0 &&
                                <div className="row">
                                    <div className="col-md-12 no-padding">
                                        <div className="alert alert-danger">
                                            {
                                                errors.map((msg, i) => {
                                                    return (
                                                        <p key={i}>{capitalizeFirstLetter(msg)}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-md-12 no-padding">
                                    <div className="col-md-3 pull-left">
                                        <span>Track my</span>
                                    </div>
                                    <div className="col-md-3 pull-left">
                                        <Field
                                            name="task"
                                            wrapperClass="form-group"
                                            className="form-control"
                                            component={SelectField_ReactSelect}
                                            options={goals}
                                            placeholder="Task"
                                            validate={requiredReactSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 no-padding">
                                    <div className="col-md-4 col-md-offset-8">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

AddSecondaryGoal = reduxForm({
    form: 'addSecondaryGoalForm'
})(AddSecondaryGoal);

export default AddSecondaryGoal;