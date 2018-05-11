import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FaTrash } from 'react-icons/lib/fa'
import { InputField, FileField_Dropzone } from '../../../helpers/FormControlHelper';
import { required } from '../../../formValidation/validationRules';

class FitnessTestMultiselect extends Component {
    render() {
        const { fields } = this.props;
        return (
            <div className="max-rep-wrapper">
                {fields.map((maxRep, index) => {
                    return (
                        <div>
                            <Field
                                name={`title_${(index + 1)}`}
                                className="form-control"
                                label={`Title ${(index + 1)}`}
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder={`Title ${(index + 1)}`}
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name={`image_${(index + 1)}`}
                                label={`Image ${(index + 1)}`}
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder={`Image ${(index + 1)}`}
                                component={FileField_Dropzone}
                                existingImages={[]}
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

export default FitnessTestMultiselect;