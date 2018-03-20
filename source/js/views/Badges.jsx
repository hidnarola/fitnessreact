import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


import { routeCodes } from 'constants/routes';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

import Complete from 'components/Badges/Complete';
import InComplete from 'components/Badges/InComplete';
import Tracking from 'components/Badges/Tracking';

export default class Badges extends Component {
    
    render() {        

        return (
            <div className='stat-page'>
                <FitnessHeader/>
                <FitnessNav/>
                
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l ">
                            <h2>Badges</h2>
                            <div className="body-head-l-btm">

                                 <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.BADGESTRACKING }
                                >
                                    Tracking
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.BADGESINCOMPLETE }
                                >
                                    Incomplete
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.BADGESCOMPLETE }
                                >
                                    Complete
                                </NavLink>
                                                                
                            </div>
                        </div>
                        <div className="body-head-r ml-auto">
                            <a href="" className="white-btn">Reset
                                <i className="icon-settings_backup_restore"></i>
                            </a>
                            <a href="" className="green-blue-btn">Update Changes
                                <i className="icon-restore"></i>
                            </a>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={ routeCodes.BADGESCOMPLETE } component={ Complete } />
                        <Route exact path={ routeCodes.BADGESINCOMPLETE } component={ InComplete } />
                        <Route exact path={ routeCodes.BADGESTRACKING } component={ Tracking } />                        
                    </Switch>
                </section>

            </div>
        );
    }
}