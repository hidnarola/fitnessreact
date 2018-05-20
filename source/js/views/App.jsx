import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom";
import { Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPeople } from 'actions/people';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import ScrollToTop from 'components/global/ScrollToTop';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import Stats from 'components/Stats/Stats';

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
import Exercises from './Admin/Exercises';
import AdminBadges from './Admin/Badges';
import Equipments from './Admin/Equipments';
import Body from './Body';
import { AUTH_CALLBACK_ROUTE } from '../auth/auth0-variables';
import Callback from '../auth/callback/Callback';
import ExerciseTypes from './Admin/ExerciseTypes';
import history from '../config/history';
import BadgeCategories from './Admin/BadgeCategories';
import BadgeTasks from './Admin/BadgeTasks';
import { ToastContainer } from "react-toastify";
import NutritionPreferences from '../components/Nutrition/NutritionPreferences'
import { publicPath } from '../constants/routes';
import { SESSION_EXPIRED_URL_TYPE } from '../constants/consts';
import { FaCircleONotch } from "react-icons/lib/fa";
import FitnessTests from './Admin/FitnessTests';
import NutritionRecipeDetails from '../components/Nutrition/NutritionRecipeDetails';
import cns from "classnames";

class App extends Component {
    render() {
        const { showPageLoader } = this.props;
        return (
            <div className="appWrapper">
                <div id="loader" className={cns({ 'display_none': !showPageLoader })}>
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
                <Router history={history}>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path={`${publicPath}${SESSION_EXPIRED_URL_TYPE}`} component={Login} />
                            <Route path={routeCodes.REGISTERUSER} component={RegisterUser} />

                            <PrivateRoute path={routeCodes.PEOPLE} component={People} />
                            <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} />

                            <PrivateRoute path={routeCodes.STATSPAGE} component={StatsPage} />

                            <PrivateRoute path={`${routeCodes.PROFILE}/:username`} component={ProfilePage} />

                            <PrivateRoute path={routeCodes.BODY} component={Body} />

                            <PrivateRoute exact path={routeCodes.EXERCISE} component={Exercise} />
                            <PrivateRoute path={routeCodes.EXERCISEFITNESS} component={ExerciseSettings} />
                            <PrivateRoute path={routeCodes.EXERCISEEQP} component={ExerciseSettings} />
                            <PrivateRoute path={routeCodes.EXERCISEPREFERENCE} component={ExerciseSettings} />

                            <PrivateRoute exact path={routeCodes.NUTRITION} component={NutritionMeal} />
                            <PrivateRoute path={`${routeCodes.NUTRITION_RECIPE_DETAILS}/:id`} component={NutritionRecipeDetails} />
                            <PrivateRoute path={routeCodes.NUTRITIONPREFERENCE} component={NutritionPreferences} />
                            <PrivateRoute path={routeCodes.NUTRITIONSHOP} component={NutritionShopping} />

                            <PrivateRoute path={routeCodes.CALENDAR} component={Calendar} />
                            <PrivateRoute path={routeCodes.BADGES} component={Badges} />
                            <PrivateRoute path={routeCodes.GOALS} component={Goals} />

                            <PrivateRoute path={routeCodes.RECEIP} component={Receip} />

                            <Route exact path={adminRootRoute} component={AdminLogin} />
                            <Route exact path={`${adminRootRoute}/${SESSION_EXPIRED_URL_TYPE}`} component={AdminLogin} />

                            <AdminPrivateRoute path={adminRouteCodes.DASHBOARD} component={AdminDashboard} />

                            <AdminPrivateRoute exact path={adminRouteCodes.USERS} component={Users} />
                            <AdminPrivateRoute path={`${adminRouteCodes.USERS_SAVE}/:id`} component={Users} />

                            <AdminPrivateRoute path={adminRouteCodes.EXERCISE_TYPE} component={ExerciseTypes} />

                            <AdminPrivateRoute path={adminRouteCodes.EXERCISE} component={Exercises} />

                            <AdminPrivateRoute path={adminRouteCodes.FITNESS_TESTS} component={FitnessTests} />

                            <AdminPrivateRoute path={adminRouteCodes.EQUIPMENTS} component={Equipments} />

                            <AdminPrivateRoute path={adminRouteCodes.BADGE_CATEGORIES} component={BadgeCategories} />

                            <AdminPrivateRoute path={adminRouteCodes.BADGE_TASKS} component={BadgeTasks} />

                            <AdminPrivateRoute path={adminRouteCodes.BADGES} component={AdminBadges} />

                            <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
                            
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </ScrollToTop>
                </Router>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { pageLoader } = state;
    return {
        showPageLoader: pageLoader.get("loading"),
    };
}

App = connect(mapStateToProps)(App);

export default hot(module)(App);