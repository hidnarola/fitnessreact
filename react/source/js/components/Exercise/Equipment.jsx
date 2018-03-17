import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExerciseEquipments } from '../../actions/exercise/equipments';
import EquipmentsContentItem from './EquipmentsContentItem';

class Equipment extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch, equipments } = this.props;
        dispatch(getExerciseEquipments());
    }

    render() {
        const { equipments } = this.props;
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
                                    <h3 className="title-h3 size-14">{equipment.title}</h3>
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
    const { exerciseEquipments } = state;
    return {
        loading: exerciseEquipments.get('loading'),
        error: exerciseEquipments.get('error'),
        equipments: exerciseEquipments.get('equipments'),
    }
}

export default connect(mapStateToProps)(Equipment);