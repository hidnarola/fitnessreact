import React, { Component } from 'react';
import { Field } from 'redux-form';
import { SelectField_ReactSelect, InputField } from '../../../helpers/FormControlHelper';
import { prepareDropdownOptionsData } from '../../../helpers/funs';
import { requiredReactSelect, required } from '../../../formValidation/validationRules';
import { FaTrash } from 'react-icons/lib/fa';

class RecipesNutritions extends Component {
    render() {
        const { fields, nutritions } = this.props;
        const nutritionsOptions = prepareDropdownOptionsData(nutritions, '_id', 'name');
        return (
            <div className="recipes-nutritions-wrapper">
                {fields &&
                    fields.map((field, index) => {
                        let srNo = (index + 1);
                        return (
                            <div key={index}>
                                <div className="col-md-6">
                                    <Field
                                        name={`${field}_id`}
                                        label={`Nutrition ${srNo}`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Nutrition ${srNo}`}
                                        component={SelectField_ReactSelect}
                                        options={nutritionsOptions}
                                        validate={[requiredReactSelect]}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={`${field}_units`}
                                        className="form-control"
                                        label={`Units ${srNo}`}
                                        labelClass="control-label"
                                        wrapperClass="form-group"
                                        placeholder={`Units ${srNo}`}
                                        component={InputField}
                                        errorClass=""
                                        warningClass=""
                                        validate={[required]}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-danger" onClick={() => fields.remove(index)}><FaTrash /></button>
                                </div>
                            </div>
                        );
                    })
                }
                <button type="button" className="btn btn-primary" onClick={() => fields.push({})}>Add Nutrition</button>
            </div>
        );
    }
}

export default RecipesNutritions;