import React, { Component } from 'react';
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
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex">
                        <div className="body-head-l">
                            <h2>Cecilia Brown</h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROFILEFITHUB}
                                >
                                    Fithub
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROFILEPHOTOS}
                                >
                                    Photos
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROFILEFRIENDS}
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

                    <div className="fitness-stats">
                        <div className="body-content d-flex row justify-content-start profilephoto-content">

                            <div className="col-md-9">
                                <Switch>
                                    <Route exact path={routeCodes.PROFILEFITHUB} component={ProfileFithub} />
                                    <Route exact path={routeCodes.PROFILEFRIENDS} component={ProfileFriends} />
                                    <Route exact path={routeCodes.PROFILEPHOTOS} component={ProfilePhotos} />
                                </Switch>
                            </div>

                            <div className="col-md-3 ml-auto">
                                <div className="lavel-img">
                                    <span>
                                        <img src="images/big-img.jpg" alt="" />
                                        <a href="">
                                            <i className="icon-add_a_photo"></i>
                                        </a>
                                    </span>
                                    <a href="" data-toggle="modal" data-target="#level-gallery">Lavel 13</a>
                                </div>

                                <div className="white-box profile-about">
                                    <div className="whitebox-head d-flex profile-about-head">
                                        <h3 className="title-h3">About</h3>
                                        <div className="whitebox-head-r">
                                            <a href="">Edit</a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body profile-about-body">
                                        <a href="" className="purple-btn">Height:150 cm</a>
                                        <a href="" className="green-blue-btn">Weight:62 kg</a>
                                        <p>I’m doing my best to really get into my health and fitness, I’ve got my goals set to lose some body fat and
                                    generally get healthier. Wish me luck!</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        );
    }
}