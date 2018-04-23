import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputField, EditorField, SelectField_ReactSelect, FileField_Dropzone_Single } from '../../../helpers/FormControlHelper';
import { required, requiredReactSelect, requiredReactSelectStatus } from '../../../formValidation/validationRules';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';
import { watchAdminEquipmentCategories } from '../../../sagas/admin/equipmentCategories';
import { prepareDropdownOptionsData } from '../../../helpers/funs';
import { equipmentSelectOneRequest } from '../../../actions/admin/equipments';

const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
];

class EquipmentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initPageDataLoad: false,
            description: '',
            exerciseImages: [],
            categoryOptions: [],
        }
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        this.setState({
            initPageDataLoad: true
        });
        dispatch(showPageLoader());
        dispatch(equipmentCategoryListRequest());
        if (typeof match.params.id !== 'undefined') {
            dispatch(equipmentSelectOneRequest(match.params.id));
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { exerciseImages, description, categoryOptions } = this.state;
        return (
            <div className="exercise-form-data">
                <form onSubmit={handleSubmit}>
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
                                name="equipmentCategory"
                                label="Category"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Category"
                                component={SelectField_ReactSelect}
                                options={categoryOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelect]}
                            />
                            <Field
                                name="description"
                                value={description}
                                handleChange={this.handleChangeTextEditor}
                                className="editor-min-height-200"
                                label="Description"
                                labelClass="control-label display_block"
                                wrapperClass="form-group"
                                placeholder="Description"
                                component={EditorField}
                            />
                            <Field
                                name="status"
                                label="Status"
                                labelClass="control-label"
                                wrapperClass="form-group"
                                placeholder="Status"
                                component={SelectField_ReactSelect}
                                options={statusOptions}
                                errorClass="help-block"
                                validate={[requiredReactSelectStatus]}
                            />
                            <Field
                                name="image"
                                label="Image"
                                labelClass="control-label display_block"
                                mainWrapperClass="image-form-main-wrapper"
                                wrapperClass="form-group"
                                placeholder="Image"
                                component={FileField_Dropzone_Single}
                                existingImages={exerciseImages}
                            />
                            <div className="col-md-12 mb-20 clear-both text-center">
                                <div className="stepbox-b stepbox-b-center">
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
        const {
            dispatch,
            equipmentCategoryLoading,
            match,
            initialize,
            equipment,
            equipmentCategories,
            loading
        } = this.props;
        const { initPageDataLoad } = this.state;
        if (typeof match.params.id !== 'undefined') {
            if (initPageDataLoad && !equipmentCategoryLoading && !loading) {
                const _categoryOptions = prepareDropdownOptionsData(equipmentCategories, '_id', 'name');
                const equipmentData = {
                    name: equipment.name,
                    description: equipment.description,
                    equipmentCategory: _.find(_categoryOptions, (o) => { return (o.value === equipment.category_id) }),
                    status: _.find(statusOptions, (o) => { return (o.value === equipment.status) }),
                };
                this.setState({
                    initPageDataLoad: false,
                    description: equipment.description,
                    exerciseImages: [equipment.image],
                    categoryOptions: _categoryOptions,
                });
                initialize(equipmentData);
                dispatch(hidePageLoader());
            }
        } else {
            if (initPageDataLoad && !equipmentCategoryLoading) {
                const _categoryOptions = prepareDropdownOptionsData(equipmentCategories, '_id', 'name');
                this.setState({
                    initPageDataLoad: false,
                    categoryOptions: _categoryOptions
                });
                dispatch(hidePageLoader());
            }
        }
    }

    // Start funs
    handleChangeTextEditor = (editorText) => {
        this.props.change('description', editorText);
        this.setState({ description: editorText });
    }
    // End funs
}

EquipmentForm = reduxForm({
    form: 'equipmentSaveForm',
    multipartForm: true
})(EquipmentForm)

const mapStateToProps = (state) => {
    const { adminEquipments, adminEquipmentCategories } = state;
    return {
        equipmentCategoryLoading: adminEquipmentCategories.get('loading'),
        loading: adminEquipments.get('loading'),
        equipmentCategories: adminEquipmentCategories.get('equipmentCategories'),
        equipment: adminEquipments.get('equipment'),
    };
}

EquipmentForm = withRouter(EquipmentForm);

export default connect(mapStateToProps)(EquipmentForm);