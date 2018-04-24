import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import EquipmentsContentItem from './EquipmentsContentItem';
import { getUserEquipmentsRequest, saveUserEquipmentsRequest } from '../../actions/userEquipments';
import _ from "lodash";

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
        }
    }

    componentWillMount() {
        const { dispatch, equipments } = this.props;
        dispatch(getUserEquipmentsRequest());
    }

    render() {
        const { equipments, userEquipments, handleSubmit } = this.props;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <form className="row">
                    {!equipments &&
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body">
                                    <span>No equipments found.</span>
                                </div>
                            </div>
                        </div>
                    }
                    {equipments && equipments.length <= 0 &&
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body">
                                    <span>No equipments found.</span>
                                </div>
                            </div>
                        </div>
                    }
                    {equipments && equipments.length > 0 &&
                        equipments.map((equipment, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-head">
                                        <h3 className="title-h3 size-14">{equipment.name}</h3>
                                    </div>
                                    <div className="whitebox-body">
                                        {equipment.equipments && equipment.equipments.length > 0 &&
                                            equipment.equipments.map((equip, i) => {
                                                var userEquipId = _.find(userEquipments, (val) => { return val === equip._id });
                                                if (userEquipId) {
                                                    equip.isAvailable = true;
                                                }
                                                return (
                                                    <EquipmentsContentItem data={equip} key={i} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </form>
            </div>

        );
    }

    componentDidUpdate() {
        const {
            saveActionInit,
            loading,
            setSaveAction,
            dispatch
        } = this.props;
        if (saveActionInit && !loading) {
            dispatch(getUserEquipmentsRequest());
            setSaveAction(false);
        }
    }

}

const handleSubmit = (data, dispatch, props) => {
    let equipments = [];
    _.forEach(data, (val, key) => {
        if (val) {
            equipments.push(key);
        }
    })
    let requestObj = {
        equipmentIds: equipments
    }
    dispatch(saveUserEquipmentsRequest(requestObj));
    props.setSaveAction(true);
}

const mapStateToProps = (state) => {
    const { userEquipments } = state;
    return {
        loading: userEquipments.get('loading'),
        error: userEquipments.get('error'),
        equipments: userEquipments.get('equipments'),
        userEquipments: userEquipments.get('userEquipments'),
    }
}

Equipment = reduxForm({
    form: 'userEquipmentsForm',
    onSubmit: (data, dispatch, props) => handleSubmit(data, dispatch, props)
})(Equipment);

export default connect(mapStateToProps)(Equipment);