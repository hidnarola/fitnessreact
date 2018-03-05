import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Strength from 'components/Stats/Strength';
import Cardio from 'components/Stats/Cardio';
import NutritionStats from 'components/Stats/NutritionStats';
import BodyStats from 'components/Stats/BodyStats';

import { routeCodes } from 'constants/routes';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

export default class StatsPage extends Component {
    
 
    render() {        

        return (
            <div className='stat-page'>
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap starts-body">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Cecilia Brown</h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.STATSTRENGTH }
                                >
                                    Strength
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.STATSCARDIO }
                                >
                                    Cardio
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.STATSNUTRITION }
                                >
                                    Nutrition
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.STATSBODY }
                                >
                                    Bodys
                                </NavLink>                                
                            </div>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={ routeCodes.STATSTRENGTH } component={ Strength } />
                        <Route exact path={ routeCodes.STATSCARDIO } component={ Cardio } />
                        <Route exact path={ routeCodes.STATSNUTRITION } component={ NutritionStats } />
                        <Route exact path={ routeCodes.STATSBODY } component={ BodyStats } />
                    </Switch>
                </section>
            </div>
        );
    }
}
