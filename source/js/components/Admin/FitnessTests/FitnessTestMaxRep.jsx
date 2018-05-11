import React, { Component } from 'react';
import { Field } from 'redux-form';
import { SelectField_ReactSelect } from '../../../helpers/FormControlHelper';
import { requiredReactSelect } from '../../../formValidation/validationRules';
import { FaTrash } from 'react-icons/lib/fa'

class FitnessTestMaxRep extends Component {
    render() {
        const { fields, options } = this.props;
        return (
            <div className="max-rep-wrapper">
                {fields.map((maxRep, index) => {
                    return (
                        <div>
                            <Field
                                name={`max_rep_${index}`}
                                label="Max Rep"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Max Rep"
                                component={SelectField_ReactSelect}
                                options={options}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                            />
                            <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    );
                })}
                <div className="col-md-12">
                    <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add option</button>
                </div>
            </div>
        );
    }
}

export default FitnessTestMaxRep;