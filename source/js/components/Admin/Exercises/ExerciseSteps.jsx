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
                <div className="step-fields-wrapper">
                    {fields &&
                        fields.map((field, index) => (
                            <div className="row step-field" key={index}>
                                <div className="col-md-11">
                                    <Field
                                        name={`${field}.name`}
                                        className="form-control"
                                        label={`Step ${index + 1}`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Step ${index + 1}`}
                                        component={InputField}
                                        errorClass=""
                                        warningClass=""
                                        validate={[required]}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}><FaTrash /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="add-step-wrapper-btn pull-right">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add Steps</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExerciseSteps;