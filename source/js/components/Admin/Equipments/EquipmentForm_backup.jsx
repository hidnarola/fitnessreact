import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { NavLink, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import Dropzone from 'react-dropzone'
import { required, requiredReactSelect } from '../../../formValidation/validationRules';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { equipmentSelectOneRequest } from '../../../actions/admin/equipments';
import _ from 'lodash';
import { SERVER_BASE_URL } from '../../../constants/consts';
import { InputField, TextAreaField, FileField_Dropzone_Single, SelectField_ReactSelect } from '../../../helpers/FormControlHelper';

const initialFormValues = {
    name: '',
    description: '',
    image: '',
    status: { value: true, label: 'Active' },
    equipmentCategory: { value: '', label: 'Select category' },
}

const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

class EquipmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDataInit: false,
        }
    }
    componentWillMount() {
        const { initialize, match, dispatch } = this.props;
        if (typeof match.params.id !== 'undefined') {
            this.setState({
                selectDataInit: true,
            });
            dispatch(showPageLoader());
            dispatch(equipmentSelectOneRequest(match.params.id));
        } else {
            initialize(Object.assign({}, initialFormValues));
        }
    }

    render() {
        const { handleSubmit, equipmentCats, equipment } = this.props;
        return (
            <div className="equipment-form-wrapper">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="name"
                                className="form-control"
                                label="Name"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Name"
                                component={InputField}
                                errorClass="help-block"
                                warningClass=""
                                validate={[required]}
                            />
                            <Field
                                name="description"
                                className="form-control"
                                label="Description"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={TextAreaField}
                            />
                            <Field
                                name="image"
                                label="Image"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Image"
                                component={FileField_Dropzone_Single}
                                existingImages={}
                            />
                            <div className="col-md-12 mb-20">
                                <label htmlFor="">Image</label>
                                <Field
                                    name=""
                                    component={MyDropzone}
                                />
                                {equipment &&
                                    <div className="image-preview-wrapper">
                                        <img src={SERVER_BASE_URL + equipment.image} />
                                    </div>
                                }
                            </div>
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={statusOptions}
                                validate={[requiredReactSelect]}
                                errorClass="help-block"
                            />
                            <Field
                                name="equipmentCategory"
                                label="Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Select category"
                                component={SelectField_ReactSelect}
                                options={equipmentCats}
                                validate={[requiredReactSelect]}
                                errorClass="help-block"
                            />
                            <div className="col-md-12 mb-20">
                                <div className="stepbox-b">
                                    <NavLink to={adminRouteCodes.EQUIPMENTS} className="continues-btn">Back</NavLink>
                                    <button type="submit" className="continues-btn"><span>Save</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        const { initialize, dispatch, loading, equipment, equipmentCats } = this.props;
        const { selectDataInit } = this.state;
        if (selectDataInit && !loading) {
            this.setState({
                selectDataInit: false,
            });
            dispatch(hidePageLoader());
            let equipData = {
                name: equipment.name,
                description: equipment.description,
                image: '',
                savedImage: equipment.image,
                status: _.find(statusOptions, (o) => (o.value === equipment.status)),
                equipmentCategory: _.find(equipmentCats, (o) => (o.value === equipment.category_id)),
            }
            initialize(equipData);
        }
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

const mapStateToProps = (state) => {
    const { adminEquipments } = state;
    return {
        loading: adminEquipments.get('loading'),
        error: adminEquipments.get('error'),
        equipment: adminEquipments.get('equipment'),
    }
}

EquipmentForm = withRouter(EquipmentForm);
EquipmentForm = connect(mapStateToProps)(EquipmentForm);

export default reduxForm({
    form: 'equipmentSaveForm',
    multipartForm: true
})(EquipmentForm);