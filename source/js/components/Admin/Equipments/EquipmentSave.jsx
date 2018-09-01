import React, { Component } from 'react';
import { connect } from 'react-redux';
import EquipmentForm from './EquipmentForm';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { equipmentAddRequest, equipmentUpdateRequest } from '../../../actions/admin/equipments';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import { equipmentCategoryListRequest } from '../../../actions/admin/equipmentCategories';

class EquipmentSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false
        };
    }

    handleSubmit = (data) => {
        const { dispatch, match } = this.props;

        var formData = new FormData();
        formData.append('name', (data.name) ? data.name.trim() : '');
        formData.append('category_id', (data.equipmentCategory.value) ? data.equipmentCategory.value : null);
        formData.append('description', (data.description) ? data.description : '<p></p>');
        if (data.image) {
            formData.append('equipment_img', data.image[0]);
        }
        formData.append('status', (data.status.value) ? data.status.value : 0);
        this.setState({
            saveActionInit: true
        });
        dispatch(showPageLoader());
        if (typeof match.params.id !== 'undefined') {
            dispatch(equipmentUpdateRequest(match.params.id, formData));
        } else {
            dispatch(equipmentAddRequest(formData));
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(showPageLoader());
        dispatch(equipmentCategoryListRequest());
    }

    render() {
        const { equipmentCategories } = this.props;
        let equipmentCats = [{ value: '', label: 'Select category' }];
        if (equipmentCategories) {
            for (let index = 0; index < equipmentCategories.length; index++) {
                const element = equipmentCategories[index];
                equipmentCats.push({ value: element._id, label: element.name });
            }
        }
        return (
            <div className="equipment-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipments</h2>
                    </div>
                </div>

                <div className="body-content">
                    <div className="white-box">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Save Equipment</h3>
                        </div>
                        <div className="whitebox-body">
                            <EquipmentForm
                                onSubmit={this.handleSubmit}
                                equipmentCats={equipmentCats}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, history, dispatch } = this.props;
        const { saveActionInit } = this.state;
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false
            });
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.EQUIPMENTS);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminEquipments, adminEquipmentCategories } = state;
    return {
        loading: adminEquipments.get('loading'),
        error: adminEquipments.get('error'),
        equipmentCategories: adminEquipmentCategories.get('equipmentCategories'),
    }
}

export default connect(mapStateToProps)(EquipmentSave);