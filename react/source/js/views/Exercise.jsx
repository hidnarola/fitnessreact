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

export default class Exercise extends Component {


    render() {

        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />

                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Today's Workout <a href="" className="print-btn"><i className="icon-print"></i></a></h2>
                            <p>The workouts and meal plans created are tailored specifically to you; so to make your fitness assistant as effective as possible it’s important you let us know your current ability level. The more information you provide, the more accurate your fitness assistant will be.</p>
                        </div>
                        <div className="body-head-r">
                            <NavLink
                                activeClassName='pink-btn'
                                className='green-blue-btn'
                                to={routeCodes.EXERCISEFITNESS}>
                                Exercise Settings
                            </NavLink>
                            <div className="switch-wrap">
                                <small>Workout Completed</small>
                                <div className="material-switch">
                                    <input id="someSwitchOptionDefault" name="someSwitchOption001" type="checkbox" />
                                    <label for="someSwitchOptionDefault" className="label-default"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-9">
                            <div className="white-box space-btm-20 padding-none workout-wrap">
                                <div className="workout-head">
                                    <div className="workout-1">
                                        <h3>Warmup</h3>
                                        <a href=""><i className="icon-more_horiz"></i></a>
                                    </div>
                                    <div className="workout-2">Weight</div>
                                    <div className="workout-3">Reps</div>
                                    <div className="workout-4">Sets</div>
                                    <div className="workout-5">Reset</div>
                                </div>
                                <div className="workout-body">
                                    <div className="workout-1">
                                        <span><img src="images/img-13.jpg" alt="" /></span>
                                        <div className="workout-1-info">
                                            <h3><small>Medicine Ball Slam</small> <a href=""><i className="icon-more_horiz"></i></a></h3>
                                            <p>The medicine ball slam is an explosive exercise, put max effort into each repetition.</p>
                                        </div>
                                    </div>
                                    <div className="workout-2">20Kg</div>
                                    <div className="workout-3">12</div>
                                    <div className="workout-4">6</div>
                                    <div className="workout-5">30 sec</div>
                                </div>
                                <div className="workout-body">
                                    <div className="workout-1">
                                        <span><img src="images/img-13.jpg" alt="" /></span>
                                        <div className="workout-1-info">
                                            <h3><small>Medicine Ball Slam</small> <a href=""><i className="icon-more_horiz"></i></a></h3>
                                            <p>The medicine ball slam is an explosive exercise, put max effort into each repetition.</p>
                                        </div>
                                    </div>
                                    <div className="workout-2">20Kg</div>
                                    <div className="workout-3">12</div>
                                    <div className="workout-4">6</div>
                                    <div className="workout-5">30 sec</div>
                                </div>
                                <div className="workout-body">
                                    <div className="workout-1">
                                        <span><img src="images/img-13.jpg" alt="" /></span>
                                        <div className="workout-1-info">
                                            <h3><small>Medicine Ball Slam</small> <a href=""><i className="icon-more_horiz"></i></a></h3>
                                            <p>The medicine ball slam is an explosive exercise, put max effort into each repetition.</p>
                                        </div>
                                    </div>
                                    <div className="workout-2">20Kg</div>
                                    <div className="workout-3">12</div>
                                    <div className="workout-4">6</div>
                                    <div className="workout-5">30 sec</div>
                                </div>
                            </div>
                            <div className="white-box space-btm-20 padding-none workout-wrap">
                                <div className="workout-head">
                                    <div className="workout-1 bg-pink">
                                        <h3>Warmup</h3>
                                        <a href=""><i className="icon-more_horiz"></i></a>
                                    </div>
                                    <div className="workout-2">Weight</div>
                                    <div className="workout-3">Reps</div>
                                    <div className="workout-4">Sets</div>
                                    <div className="workout-5">Reset</div>
                                </div>
                                <div className="workout-body">
                                    <div className="workout-1">
                                        <span><img src="images/img-13.jpg" alt="" /></span>
                                        <div className="workout-1-info">
                                            <h3><small>Medicine Ball Slam</small> <a href=""><i className="icon-more_horiz"></i></a></h3>
                                            <p>The medicine ball slam is an explosive exercise, put max effort into each repetition.</p>
                                        </div>
                                    </div>
                                    <div className="workout-2">20Kg</div>
                                    <div className="workout-3">12</div>
                                    <div className="workout-4">6</div>
                                    <div className="workout-5">30 sec</div>
                                </div>
                                <div className="workout-body">
                                    <div className="workout-1">
                                        <span><img src="images/img-13.jpg" alt="" /></span>
                                        <div className="workout-1-info">
                                            <h3><small>Medicine Ball Slam</small> <a href=""><i className="icon-more_horiz"></i></a></h3>
                                            <p>The medicine ball slam is an explosive exercise, put max effort into each repetition.</p>
                                        </div>
                                    </div>
                                    <div className="workout-2">20Kg</div>
                                    <div className="workout-3">12</div>
                                    <div className="workout-4">6</div>
                                    <div className="workout-5">30 sec</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14 text-c">Workout Intensity</h3>
                                </div>
                                <div className="whitebox-body text-c">
                                    <img src="images/intensity.jpg" alt="" />
                                </div>
                            </div>

                            <div className="white-box space-btm-20 padding-20">
                                <div className="whitebox-head">
                                    <h3 className="title-h3 size-14 text-c">Workout Stats</h3>
                                </div>
                                <div className="whitebox-body">
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Exercises</h4>
                                            <h5>510</h5>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Exercises</h4>
                                            <h5>510</h5>
                                        </div>
                                        <div className="workoutstatus-btm">
                                            <p>Biceps, Triceps, Lats, Deltoids, Hamstrings, Forearms, Calves, Quads,  Abdominals, Lower Back</p>
                                        </div>
                                    </div>
                                    <div className="workout-status">
                                        <div className="workoutstatus-top">
                                            <h4>Total Exercises</h4>
                                            <h5>510</h5>
                                        </div>
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
