import React, { Component } from 'react';
import { Field } from 'redux-form';
import { SelectField_ReactSelect } from '../../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../../formValidation/validationRules';
import { FaTrash } from 'react-icons/lib/fa'

class FitnessTestMaxRep extends Component {
    render() {
        const { fields, options } = this.props;
        return (
            <div className="max-rep-wrapper dynamic-control-generator-wrapper">
                <label className="control-label">Max Reps</label>
                <div className="row pull-left width-100-per step-fields-wrapper">
                    {fields &&
                        fields.map((field, index) => {
                            return (
                                <div className="col-md-4 step-field" key={index}>
                                    <div className="col-md-11 pull-left">
                                        <Field
                                            name={`${field}.max_rep`}
                                            label="Max Rep"
                                            labelClass="control-label"
                                            wrapperClass="form-group"
                                            placeholder="Max Rep"
                                            component={SelectField_ReactSelect}
                                            options={options}
                                            errorClass="help-block"
                                            validate={[requiredReactSelect]}
                                        />
                                    </div>
                                    <div className="col-md-1 text-vcenter no-padding pull-left">
                                        <button type="button" className="btn btn-danger btn_remove" onClick={() => fields.remove(index)} tabIndex="-1"><FaTrash /></button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="add-step-wrapper-btn pull-right">
                    <div className="col-md-12">
                        <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add Max Reps</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FitnessTestMaxRep;