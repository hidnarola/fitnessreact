import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Setting from '../components/Exercise/Setting';

import { routeCodes } from 'constants/routes';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

export default class Exercise extends Component {
    
    render() {        

        return (
            <div className='stat-page'>
                <FitnessHeader/>
                <FitnessNav/>
                <section class="body-wrap">
                    <div class="body-head d-flex justify-content-start">
                        <div class="body-head-l">
                            <h2>Shopping List</h2>
                            <div class="body-head-l-btm space-btm-20">
                                <a href="" class="white-btn">Fitness tests</a>
                                <a href="" class="white-btn">Equipment</a>
                                <a href="" class="white-btn active">Preferences</a>
                            </div>
                            <p>Each fitness test feeds directly into our algorithm - every test is used to identify the most efficient and
                                effective structure of your training plan. Each test is designed to identify imbalances and weaknesses
                                that may lead to increased risk of injury or decreased performance - now and in the future. This may
                                also allow us to identify opportunities for rapid improvement.</p>
                        </div>
                        <div class="body-head-r">
                            <a href="" class="white-btn">Reset
                                <i class="icon-print"></i>
                            </a>
                            <a href="" class="green-blue-btn">Update
                                <i class="icon-control_point"></i>
                            </a>
                        </div>
                    </div>
                </section>

                <Setting/>


            </div>
        );
    }
}
