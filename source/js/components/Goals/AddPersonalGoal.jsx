import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { SelectField_ReactSelect, InputField } from '../../helpers/FormControlHelper';
import { GOALS_DETAILS, MEASUREMENT_UNITS } from '../../constants/consts';
import _ from "lodash";
import { requiredReactSelect, required } from '../../formValidation/validationRules';

class AddPersonalGoal extends Component {
    constructor(props) {
        super(props);
        this.units = [];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedTask !== nextProps.selectedTask) {
            if ((!this.props.selectedTask) || (this.props.selectedTask && nextProps.selectedTask && this.props.selectedTask.value !== nextProps.selectedTask.value)) {
                var unitsKey = (nextProps.selectedTask && nextProps.selectedTask.unitsKey) ? nextProps.selectedTask.unitsKey : '';
                var unitObj = _.find(MEASUREMENT_UNITS, ['key', unitsKey]);
                if (unitObj) {
                    this.units = unitObj.value;
                    nextProps.change('unit', null);
                } else {
                    this.units = [];
                    nextProps.change('unit', null);
                }
            }
        }
    }

    render() {
        const {
            show,
            handleClose,
            handleSubmit,
            errors
        } = this.props;
        return (
            <div className="add-personal-goal-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup add-personal-goal-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="gallery-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Create a personal goal</h3>
                        </div>

                        <div className="progress-popup-body">
                            {errors && errors.length > 0 &&
                                <div className="row">
                                    <div className="col-md-12 no-padding">
                                        <div className="alert alert-danger">
                                            {
                                                errors.map((msg, i) => {
                                                    return (
                                                        <p key={i}>{msg}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-md-12 no-padding block_task_field">
                                    
                                        <p className="p_name">I am going to</p>
                                    
                                    <div className="col-md-4 pull-left">
                                        <Field
                                            name="task"
                                            wrapperClass="form-group"
                                            className="form-control"
                                            component={SelectField_ReactSelect}
                                            options={GOALS_DETAILS}
                                            placeholder="Task"
                                            validate={requiredReactSelect}
                                        />
                                    </div>
                                    <div className="col-md-4 pull-left">
                                        <Field
                                            name="target"
                                            type="number"
                                            wrapperClass="form-group"
                                            className="form-control"
                                            component={InputField}
                                            placeholder="Target"
                                            validate={required}
                                        />
                                    </div>
                                    <div className="col-md-4 pull-left">
                                        <Field
                                            name="unit"
                                            wrapperClass="form-group"
                                            className="form-control"
                                            component={SelectField_ReactSelect}
                                            options={this.units}
                                            validate={requiredReactSelect}
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

const formSelector = formValueSelector('addPersonalGoalForm');

const mapStateToProps = (state) => {
    return {
        selectedTask: formSelector(state, 'task'),
    };
}

AddPersonalGoal = reduxForm({
    form: 'addPersonalGoalForm'
})(AddPersonalGoal);

export default connect(
    mapStateToProps,
)(AddPersonalGoal);