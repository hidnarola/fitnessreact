import React, { Component } from 'react';
import { Field } from 'redux-form';
import { FaTrash } from 'react-icons/lib/fa'
import { InputField, FileField_Dropzone_Single } from '../../../helpers/FormControlHelper';
import { required, requiredImage } from '../../../formValidation/validationRules';
import _ from "lodash";

class FitnessTestMultiselect extends Component {
    render() {
        const {
            fields,
            validationRules,
            meta,
            errorClass,
            warningClass,
            wrapperClass,
        } = this.props;
        return (
            <div
                className={
                    `${wrapperClass} ${((meta.submitFailed || meta.dirty) && meta.error) ? 'has-error' : ''}`
                }
            >
                <div className="multiselect-wrapper dynamic-control-generator-wrapper">
                    <label className="control-label">Multiselect Options</label>
                    <div className="row pull-left width-100-per step-fields-wrapper">
                        {fields &&
                            fields.map((field, index) => {
                                return (
                                    <div className="col-md-12 step-field" key={index}>
                                        <div className="col-md-4 pull-left">
                                            <Field
                                                name={`${field}.title`}
                                                className="form-control"
                                                label={`Title ${(index + 1)}`}
                                                labelClass="control-label"
                                                wrapperClass="form-group"
                                                placeholder={`Title ${(index + 1)}`}
                                                component={InputField}
                                                errorClass="help-block"
                                                validate={validationRules.title}
                                            />
                                        </div>
                                        <div className="col-md-7 pull-left">
                                            <Field
                                                name={`${field}.image`}
                                                label={`Image ${(index + 1)}`}
                                                labelClass="control-label display_block"
                                                mainWrapperClass="image-form-main-wrapper"
                                                wrapperClass="form-group"
                                                className="filefield-dropzone-wrapper"
                                                placeholder={`Image ${(index + 1)}`}
                                                component={FileField_Dropzone_Single}
                                                validate={validationRules.image}
                                                errorClass="help-block"
                                            />
                                        </div>
                                        <div className="col-md-1 text-vcenter no-padding pull-left">
                                            <button
                                                type="button"
                                                className="btn btn-danger btn_remove"
                                                onClick={() => {
                                                    fields.remove(index);
                                                }}
                                                tabIndex="-1"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="add-step-wrapper-btn pull-right">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add option</button>
                        </div>
                    </div>
                </div>
                {(meta.submitFailed || meta.dirty) &&
                    ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
                }
            </div>
        );
    }
}

export default FitnessTestMultiselect;