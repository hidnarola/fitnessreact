import React, { Component } from 'react';
import { Field } from 'redux-form'
import { InputField } from '../../../helpers/FormControlHelper';
import { required } from '../../../formValidation/validationRules';
import { FaTrash } from 'react-icons/lib/fa';

class ExerciseSteps extends Component {
    render() {
        const { fields } = this.props;
        return (
            <div className="exercise-steps-wrapper">
                <label className="control-label display_block">Steps</label>
                <div className="add-step-wrapper-btn pull-right">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add Steps</button>
                    </div>
                </div>
                <div className="row pull-left width-100-per step-fields-wrapper">
                    {fields &&
                        fields.map((field, index) => (
                            <div className="col-md-12 step-field" key={index}>
                                <div className="col-md-11 pull-left">
                                    <Field
                                        name={`${field}.name`}
                                        className="form-control"
                                        label={`Step ${index + 1}`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Step ${index + 1}`}
                                        component={InputField}
                                        errorClass="help-block"
                                        warningClass=""
                                        validate={[required]}
                                    />
                                </div>
                                <div className="col-md-1 text-vcenter no-padding pull-left">
                                    <button type="button" className="btn btn-danger btn_remove" onClick={() => fields.remove(index)} tabIndex="-1"><FaTrash /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ExerciseSteps;