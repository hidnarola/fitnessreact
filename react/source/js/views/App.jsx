import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom"; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeople } from 'actions/people';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import ScrollToTop from 'components/global/ScrollToTop';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Stats from 'components/Stats/Stats';

import FitnessBody from 'components/Body/FitnessBody';
import NutritionShopping from 'components/Nutrition/NutritionShopping';
import NutritionMeal from 'components/Nutrition/NutritionMeal';
import Goals from 'components/Goals/Goals';
import Receip from '../components/Receip/Receip';
import Calendar from 'components/Calendar/Calendar';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import StatsPage from 'views/StatsPage';
import Badges from 'views/Badges';
import Exercise from 'views/Exercise';
import Dashboard from 'views/Dashboard';
import ProfilePage from 'views/Profile';
import RegisterUser from 'views/RegisterUser';

class App extends Component {    
    
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ScrollToTop>                            
                            <Route path="/" component={ Home } />
                            <Route path={ routeCodes.PEOPLE } component={ People }  />                            
                            <Route path={ routeCodes.DASHBOARD } component={ Dashboard } />

                            <Route path={ routeCodes.STATSPAGE } component={ StatsPage }  />
                            
                            <Route path={ routeCodes.PROFILE } component={ ProfilePage }  />
                                                                                    
                            <Route path={ routeCodes.FITNESSBODY } component={ FitnessBody } />
                            <Route path={ routeCodes.EXERCISE } component={ Exercise } />
                            <Route path={ routeCodes.NUTRITIONMEAL } component={ NutritionMeal } />
                            <Route path={ routeCodes.NUTRITIONSHOP } component={ NutritionShopping } />

                            <Route path={ routeCodes.CALENDAR } component={Calendar} />
                            <Route path={ routeCodes.BADGES } component={Badges}/>                            
                            <Route path={ routeCodes.GOALS } component={ Goals } />
                            
                            <Route path={ routeCodes.RECEIP } component={ Receip } />


                            <Route path={ routeCodes.REGISTERUSER } component={ RegisterUser } />

                            {/* <Route path='*' component={ NotFound } /> */}
                        </ScrollToTop>
                    </div>
                </Router>                
            </div>            
        );
    }
}

export default hot(module)(App);