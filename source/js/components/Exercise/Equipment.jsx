import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import EquipmentsContentItem from './EquipmentsContentItem';
import { getUserEquipmentsRequest, saveUserEquipmentsRequest } from '../../actions/userEquipments';
import _ from "lodash";
import { ts } from '../../helpers/funs';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadDataActionInit: false,
            equipments: [],
            userEquipments: [],
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({ loadDataActionInit: true });
        dispatch(showPageLoader());
        dispatch(getUserEquipmentsRequest());
    }

    render() {
        const { handleSubmit } = this.props;
        const { equipments, userEquipments } = this.state;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
                <form className="row width-100-per no-margin">
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
            resetActionInit,
            loading,
            setSaveAction,
            setResetAction,
            dispatch,
            equipments,
            userEquipments
        } = this.props;
        const { loadDataActionInit } = this.state;
        if (loadDataActionInit && !loading) {
            this.setState({
                loadDataActionInit: false,
                equipments,
                userEquipments
            });
            dispatch(hidePageLoader());
        } else if (saveActionInit && !loading) {
            dispatch(getUserEquipmentsRequest());
            ts('Equipments saved successfully!');
            this.setState({ loadDataActionInit: true });
            setSaveAction(false);
        } else if (resetActionInit && !loading) {
            dispatch(getUserEquipmentsRequest());
            ts('Equipments reset successfully!');
            this.setState({ loadDataActionInit: true });
            setResetAction(false);
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