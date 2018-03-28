import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import Dropzone from 'react-dropzone'
import { required } from '../../../formValidation/validationRules';

const initialFormValues = {
    name: '',
    description: '',
    image: '',
    status: { value: true, label: 'Active' },
    equipmentCategory: { value: '', label: 'Select category' },
}

class EquipmentForm extends Component {
    componentWillMount() {
        const { initialize } = this.props;
        initialize(Object.assign({}, initialFormValues));
    }

    render() {
        const { handleSubmit, equipmentCats } = this.props;
        return (
            <div className="equipment-form-wrapper">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="row">
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Name</label>
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                validate={required}
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Description</label>
                            <Field
                                name="description"
                                component="textarea"
                                placeholder="Description"
                                className="form-control"
                                validate={required}
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Image</label>
                            <Field
                                name="image"
                                component={MyDropzone}
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Status</label>
                            <Field
                                name="status"
                                component={MySelect}
                                options={[
                                    { value: true, label: 'Active' },
                                    { value: false, label: 'Inactive' },
                                ]}
                                initialValue={true}
                                validate={required}
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Categories</label>
                            <Field
                                name="equipmentCategory"
                                component={MySelect}
                                options={equipmentCats}
                                placeholder="Select category"
                                initialValue=''
                                validate={required}
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <div className="stepbox-b">
                                <NavLink to={adminRouteCodes.EQUIPMENTS} className="continues-btn">Back</NavLink>
                                <button type="submit" className="continues-btn"><span>Save</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const MySelect = (props) => {
    const { input, options, removeSelected, initialValue, placeholder } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className="select">
            <Select
                {...input}
                value={val}
                options={options}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
            />
        </div>
    );
}

const MyDropzone = (props) => {
    const { input } = props;
    return (
        <div>
            <Dropzone
                {...input}
                accept="image/jpeg, image/png, image/jpg, image/gif"
                onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                multiple={false}
            >
                <div className="dropzone-image-preview-wrapper">
                    {input.value &&
                        <img src={input.value[0].preview} />
                    }
                </div>
            </Dropzone>
        </div>
    );
}

export default reduxForm({
    form: 'equipmentSaveForm',
    multipartForm: true
})(EquipmentForm);