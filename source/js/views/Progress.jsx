import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch, Route } from "react-router-dom";
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { routeCodes } from '../constants/routes';
import BodyFat from '../components/Progress/BodyFat';
import Mobility from '../components/Progress/Mobility';
import Muscle from '../components/Progress/Muscle';
import Strength from '../components/Progress/Strength';
import Endurance from '../components/Progress/Endurance';

class Progress extends Component {
    render() {
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap starts-body">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Your Progress</h2>
                            <div className="body-head-l-btm">
                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_BODY_FAT}
                                >
                                    Body Fat
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_MOBILITY}
                                >
                                    Mobility
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_MUSCLE}
                                >
                                    Muscle
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_STRENGTH}
                                >
                                    Strength
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROGRESS_ENDURANCE}
                                >
                                    Endurance
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <Switch>
                    <Route exact path={routeCodes.PROGRESS_BODY_FAT} component={BodyFat} />
                    <Route exact path={routeCodes.PROGRESS_MOBILITY} component={Mobility} />
                    <Route exact path={routeCodes.PROGRESS_MUSCLE} component={Muscle} />
                    <Route exact path={routeCodes.PROGRESS_STRENGTH} component={Strength} />
                    <Route exact path={routeCodes.PROGRESS_ENDURANCE} component={Endurance} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(Progress);