import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Setting from 'components/Exercise/Setting';
import Equipment from 'components/Exercise/Equipment';
import Fitness from 'components/Exercise/Fitness';


import { routeCodes } from 'constants/routes';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

function logUpdate() {
    console.log('Over here');
}

export default class ExerciseSettings extends Component {
    render() {
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />

                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Exercise Settings</h2>
                            <div className="body-head-l-btm space-btm-20">


                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEFITNESS}
                                >
                                    Fitness test
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEEQP}
                                >
                                    Equipment
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.EXERCISEPREFERENCE}
                                >
                                    Preferences
                                </NavLink>

                            </div>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and
                                effective structure of your training plan. Each test is designed to identify imbalances and weaknesses
                                that may lead to increased risk of injury or decreased performance - now and in the future. This may
                                also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div className="body-head-r">
                            <a className="white-btn">Reset
                                <i className="icon-print"></i>
                            </a>
                            <a className="green-blue-btn">Update
                                <i className="icon-control_point"></i>
                            </a>
                        </div>
                    </div>

                    <Switch>
                        <Route onChange={logUpdate} exact path={routeCodes.EXERCISEFITNESS} component={Fitness} />
                        <Route onChange={logUpdate} exact path={routeCodes.EXERCISEEQP} component={Equipment} />
                        <Route onChange={logUpdate} exact path={routeCodes.EXERCISEPREFERENCE} component={Setting} />
                    </Switch>
                </section>
            </div>
        );
    }
}
