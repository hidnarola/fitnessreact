import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodaysMealBlock from './TodaysMealBlock';

class TodaysMeal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { todaysMeal } = this.props;
        return (
            <div className="white-box">
                <div className="whitebox-head d-flex profile-head">
                    <h3 className="title-h3 size-14">Today's Meals</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="green-blue">
                            Add meal<i className="icon-control_point"></i>
                        </a>
                    </div>
                </div>

                <div className="whitebox-body">
                    {!todaysMeal &&
                        <span>No meals found.</span>
                    }
                    {todaysMeal && todaysMeal.length <= 0 &&
                        <span>No meals found.</span>
                    }
                    {todaysMeal && todaysMeal.length > 0 &&
                        todaysMeal.map((meal, index) => (
                            <TodaysMealBlock key={index} meal={meal} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { nutrition } = state;
    return {
        loading: nutrition.get('loading'),
        error: nutrition.get('error'),
        todaysMeal: nutrition.get('todaysMeal'),
    }
}

export default connect(mapStateToProps)(TodaysMeal);