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
                <Modal show={show} bsSize="large" className="gallery-popup add-personal-goal-modal small_modal">
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
                                <div className="col-md-12 no-padding block_task_field">
                                    <p className="p_name">Track my</p>
                                    <div className="col-md-12 pull-left">
                                        <Field
                                            name="task"
                                            wrapperClass="form-group"
                                            className="form-control"
                                            component={SelectField_ReactSelect}
                                            options={goals}
                                            placeholder="Task"
                                            validate={requiredReactSelect}
                                            errorClass="help-block"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="btn_right">
                                <button type="submit">Save</button>
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