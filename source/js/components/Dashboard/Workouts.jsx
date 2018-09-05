import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutsListCard from './WorkoutsListCard';
import NoDataFoundImg from "img/common/no_datafound.png";

class Workouts extends Component {
    render() {
        const { workouts, } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Today's Workout</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-print"></a>
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
                {workouts && workouts.length > 0 &&
                    workouts.map((o, i) =>
                        <WorkoutsListCard key={i} workout={o} />
                    )
                }
                {(!workouts || workouts.length <= 0) &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { dashboard } = state;
    return {
        workouts: dashboard.get('workouts'),
    };
}

export default connect(
    mapStateToProps,
)(Workouts);