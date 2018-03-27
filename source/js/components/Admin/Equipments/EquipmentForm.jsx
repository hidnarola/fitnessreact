import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import Dropzone from 'react-dropzone'

class EquipmentForm extends Component {
    render() {
        const { handleSubmit } = this.props;
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
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Description</label>
                            <Field
                                name="description"
                                component="textarea"
                                placeholder="Description"
                                className="form-control"
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
                                    { value: '1', label: 'Active' },
                                    { value: '0', label: 'Inactive' },
                                ]}
                                initialValue='1'
                            />
                        </div>
                        <div className="col-md-12 mb-20">
                            <label htmlFor="">Categories</label>
                            <Field
                                name="equipmentCategory"
                                component={MySelect}
                                options={[
                                    { value: '1', label: 'Active' },
                                    { value: '0', label: 'Inactive' },
                                ]}
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
    const { input, options, removeSelected, initialValue } = props;
    return (
        <div className="select">
            <Select
                {...input}
                value={input.value || initialValue || ''}
                options={options}
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
                onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
            ></Dropzone>
        </div>
    );
}

export default reduxForm({
    form: 'equipmentSaveForm',
    multipartForm: true
})(EquipmentForm);