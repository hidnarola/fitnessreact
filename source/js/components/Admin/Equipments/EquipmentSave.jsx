import React, { Component } from 'react';
import { connect } from 'react-redux';
import EquipmentForm from './EquipmentForm';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import { equipmentAddRequest } from '../../../actions/admin/equipments';
import { adminRouteCodes } from '../../../constants/adminRoutes';

class EquipmentSave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveReqInit: false,
        }
    }

    handleSubmit = (data) => {
        var formData = new FormData();
        // for (var key in data) {
        //     formData.append(key, data[key]);
        // }
        formData.append('name', data.name);
        formData.append('category_id', data.equipmentCategory.value);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('equipment_img', data.image[0], data.image[0].name);
        }
        formData.append('status', data.status.value);
        const { dispatch } = this.props;
        // let equipmentData = {
        //     name: data.name,
        //     description: data.description,
        //     status: data.status.value,
        //     category_id: data.equipmentCategory.value,
        //     equipment_img: '',
        // }
        // this.setState({
        //     saveReqInit: true
        // });
        dispatch(showPageLoader());
        dispatch(equipmentAddRequest(formData));
    }

    render() {
        return (
            <div className="equipment-save-wrapper">
                <div className="body-head space-btm-45 d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Equipments</h2>
                    </div>
                </div>

                <div className="body-content row d-flex">
                    <div className="col-md-12">
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Save Equipment</h3>
                            </div>
                            <div className="row d-flex whitebox-body">
                                <div className="col-md-12">
                                    <EquipmentForm onSubmit={this.handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { dispatch, history, loading } = this.props;
        const saveReqInit = this.state;
        if (saveReqInit && !loading) {
            this.setState({
                saveReqInit: false
            });
            dispatch(hidePageLoader());
            history.push(adminRouteCodes.EQUIPMENTS);
        }
    }
}

const mapStateToProps = (state) => {
    const { adminEquipments } = state;
    return {
        loading: adminEquipments.get('loading'),
        error: adminEquipments.get('error'),
    }
}

export default connect()(EquipmentSave);