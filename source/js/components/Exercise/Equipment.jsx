import React, { Component } from 'react';
import { connect } from 'react-redux';
import EquipmentsContentItem from './EquipmentsContentItem';
import { getUserEquipmentsRequest } from '../../actions/userEquipments';

class Equipment extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, equipments } = this.props;
        dispatch(getUserEquipmentsRequest());
    }

    render() {
        const { equipments, userEqipments } = this.props;
        return (
            <div className="body-content d-flex row justify-content-start profilephoto-content">
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
                                    {equipment.items && equipment.items.length > 0 &&
                                        equipment.items.map((equip, i) => (
                                            <EquipmentsContentItem data={equip} key={i} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        );
    }
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

export default connect(mapStateToProps)(Equipment);