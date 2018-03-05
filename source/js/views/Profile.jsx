import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileFithub from 'components/Profile/ProfileFithub';
import ProfileFriends from 'components/Profile/ProfileFriends';
import ProfilePhotos from 'components/Profile/ProfilePhotos';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

import { routeCodes } from 'constants/routes';

export default class Profile extends Component {    
    
    
    

    render() {        

        return (
            <div className='stat-page'>
                <FitnessHeader/>
                <FitnessNav/>
                <section className="body-wrap">
                    <div className="body-head d-flex">
                        <div className="body-head-l">
                            <h2>Cecilia Brown</h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.PROFILEFITHUB }
                                >
                                    Fithub
                                </NavLink>
                                
                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.PROFILEPHOTOS }
                                >
                                    Photos
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={ routeCodes.PROFILEFRIENDS }
                                >
                                    Friends
                                </NavLink>
                            </div>
                        </div>
                        <div className="body-head-r add-friend">
                            <a href="" className="add-friend-btn active">Add Friend
                                <i className="icon-person_add"></i>
                            </a>
                            <a href="" className="green-blue-btn active">Friend
                                <i className="icon-check"></i>
                            </a>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={ routeCodes.PROFILEFITHUB } component={ ProfileFithub } />
                        <Route exact path={ routeCodes.PROFILEFRIENDS } component={ ProfileFriends } />                        
                        <Route exact path={ routeCodes.PROFILEPHOTOS } component={ ProfilePhotos } />                        
                    </Switch>

                </section>
            </div>
        );
    }
}
