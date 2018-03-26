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
import ExerciseSettings from 'views/ExerciseSettings';
import Login from './Login';
import AdminLogin from './Admin/AdminLogin';
import { adminRouteCodes, adminRootRoute } from '../constants/adminRoutes';
import AdminDashboard from './Admin/Dashboard';
import PrivateRoute from '../helpers/PrivateRoute';
import AdminPrivateRoute from '../helpers/AdminPrivateRoute';
import Users from './Admin/Users';
import Recipes from './Admin/Recipes';
import Exercises from './Admin/Exercises';
import Options from './Admin/Options';
import Budges from './Admin/Budges';
import Coupons from './Admin/Coupons';
import Nutritions from './Admin/Nutritions';

class App extends Component {

    render() {
        return (
            <div className="appWrapper">
                <Router>
                    <ScrollToTop>
                        <Route exact path="/" component={Login} />
                        <Route path={routeCodes.REGISTERUSER} component={RegisterUser} />

                        <PrivateRoute path={routeCodes.PEOPLE} component={People} />
                        <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} />

                        <PrivateRoute path={routeCodes.STATSPAGE} component={StatsPage} />

                        <PrivateRoute path={routeCodes.PROFILE} component={ProfilePage} />

                        <PrivateRoute path={routeCodes.FITNESSBODY} component={FitnessBody} />

                        <PrivateRoute exact path={routeCodes.EXERCISE} component={Exercise} />
                        <PrivateRoute path={routeCodes.EXERCISEFITNESS} component={ExerciseSettings} />
                        <PrivateRoute path={routeCodes.EXERCISEEQP} component={ExerciseSettings} />
                        <PrivateRoute path={routeCodes.EXERCISEPREFERENCE} component={ExerciseSettings} />

                        <PrivateRoute path={routeCodes.NUTRITIONMEAL} component={NutritionMeal} />
                        <PrivateRoute path={routeCodes.NUTRITIONSHOP} component={NutritionShopping} />

                        <PrivateRoute path={routeCodes.CALENDAR} component={Calendar} />
                        <PrivateRoute path={routeCodes.BADGES} component={Badges} />
                        <PrivateRoute path={routeCodes.GOALS} component={Goals} />

                        <PrivateRoute path={routeCodes.RECEIP} component={Receip} />

                        {/* Admin Routes */}

                        <Route exact path={adminRootRoute} component={AdminLogin} />

                        <AdminPrivateRoute path={adminRouteCodes.DASHBOARD} component={AdminDashboard} />

                        <AdminPrivateRoute path={adminRouteCodes.USERS} component={Users} />

                        <AdminPrivateRoute path={adminRouteCodes.NUTRITIONS} component={Nutritions} />

                        <AdminPrivateRoute path={adminRouteCodes.RECIPES} component={Recipes} />

                        <AdminPrivateRoute path={adminRouteCodes.EXERCISE} component={Exercises} />

                        <AdminPrivateRoute path={adminRouteCodes.OPTIONS} component={Options} />

                        <AdminPrivateRoute path={adminRouteCodes.BUDGES} component={Budges} />

                        <AdminPrivateRoute path={adminRouteCodes.COUPONS} component={Coupons} />

                        {/* <Route path={routeCodes.PEOPLE} component={People} /> */}
                        {/* <Route path={routeCodes.DASHBOARD} component={Dashboard} /> */}

                        {/* <Route path={routeCodes.STATSPAGE} component={StatsPage} /> */}

                        {/* <Route path={routeCodes.PROFILE} component={ProfilePage} /> */}

                        {/* <Route path={routeCodes.FITNESSBODY} component={FitnessBody} /> */}

                        {/* <Route exact path={routeCodes.EXERCISE} component={Exercise} /> */}
                        {/* <Route path={routeCodes.EXERCISEFITNESS} component={ExerciseSettings} /> */}
                        {/* <Route path={routeCodes.EXERCISEEQP} component={ExerciseSettings} /> */}
                        {/* <Route path={routeCodes.EXERCISEPREFERENCE} component={ExerciseSettings} /> */}

                        {/* <Route path={routeCodes.NUTRITIONMEAL} component={NutritionMeal} /> */}
                        {/* <Route path={routeCodes.NUTRITIONSHOP} component={NutritionShopping} /> */}

                        {/* <Route path={routeCodes.CALENDAR} component={Calendar} /> */}
                        {/* <Route path={routeCodes.BADGES} component={Badges} /> */}
                        {/* <Route path={routeCodes.GOALS} component={Goals} /> */}

                        {/* <Route path={routeCodes.RECEIP} component={Receip} /> */}

                        {/* <Route path={routeCodes.REGISTERUSER} component={RegisterUser} /> */}

                        {/* <Route path='*' component={NotFound} /> */}
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);