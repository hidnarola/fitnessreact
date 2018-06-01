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
import FrontEndUsersList from './Users';
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
import NutritionMealAdd from '../components/Nutrition/NutritionMealAdd';
import { MenuItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UpdateProfile from './UpdateProfile';
import { toggleSideMenu } from '../helpers/funs';
import Auth from '../auth/Auth';

const auth = new Auth();

class App extends Component {
    render() {
        const {
            showPageLoader,
            loggedUserData,
        } = this.props;
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
                            <PrivateRoute path={`${routeCodes.UPDATE_PROFILE}`} component={UpdateProfile} />

                            <PrivateRoute path={routeCodes.BODY} component={Body} />

                            <PrivateRoute exact path={routeCodes.EXERCISE} component={Exercise} />
                            <PrivateRoute path={routeCodes.EXERCISEFITNESS} component={ExerciseSettings} />
                            <PrivateRoute path={routeCodes.EXERCISEEQP} component={ExerciseSettings} />
                            <PrivateRoute path={routeCodes.EXERCISEPREFERENCE} component={ExerciseSettings} />

                            <PrivateRoute exact path={routeCodes.NUTRITION} component={NutritionMeal} />
                            <PrivateRoute exact path={routeCodes.NUTRITION_ADD} component={NutritionMealAdd} />
                            <PrivateRoute path={`${routeCodes.NUTRITION_RECIPE_DETAILS}/:id`} component={NutritionRecipeDetails} />
                            <PrivateRoute path={routeCodes.NUTRITIONPREFERENCE} component={NutritionPreferences} />
                            <PrivateRoute path={routeCodes.NUTRITIONSHOP} component={NutritionShopping} />

                            <PrivateRoute path={routeCodes.CALENDAR} component={Calendar} />
                            <PrivateRoute path={routeCodes.BADGES} component={Badges} />
                            <PrivateRoute path={routeCodes.GOALS} component={Goals} />

                            <PrivateRoute path={routeCodes.RECEIP} component={Receip} />

                            <PrivateRoute path={routeCodes.USERS} component={FrontEndUsersList} />

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

                        {loggedUserData &&
                            <div id="user-right-menu" className="chat-wrap">
                                <div className="chat-bg"></div>
                                <div className="chat-inr">
                                    <div className="chat-head">
                                        <h3><small>{loggedUserData.name}</small></h3>
                                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-right-menu', false)}><i className="icon-close"></i></a>
                                    </div>
                                    <div className="chat-body" id="chat-body">
                                        <ul>
                                            <li>
                                                <NavLink
                                                    to={routeCodes.UPDATE_PROFILE}
                                                    onClick={() => toggleSideMenu('user-right-menu', false)}
                                                >
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 55 55"> <path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752 c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348 c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98 c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033 c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55 c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287 c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104 c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1 c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764 l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5 c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957 c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545 c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.519,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8 s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.345-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545 c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313 c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z M42.459,48.132c-0.35,0.254-0.706,0.5-1.067,0.735 c-0.166,0.108-0.331,0.216-0.5,0.321c-0.472,0.292-0.952,0.57-1.442,0.83c-0.108,0.057-0.217,0.111-0.326,0.167 c-1.126,0.577-2.291,1.073-3.488,1.476c-0.042,0.014-0.084,0.029-0.127,0.043c-0.627,0.208-1.262,0.393-1.904,0.552 c-0.002,0-0.004,0.001-0.006,0.001c-0.648,0.16-1.304,0.293-1.964,0.402c-0.018,0.003-0.036,0.007-0.054,0.01 c-0.621,0.101-1.247,0.174-1.875,0.229c-0.111,0.01-0.222,0.017-0.334,0.025C28.751,52.97,28.127,53,27.5,53 c-0.634,0-1.266-0.031-1.895-0.078c-0.109-0.008-0.218-0.015-0.326-0.025c-0.634-0.056-1.265-0.131-1.89-0.233 c-0.028-0.005-0.056-0.01-0.084-0.015c-1.322-0.221-2.623-0.546-3.89-0.971c-0.039-0.013-0.079-0.027-0.118-0.04 c-0.629-0.214-1.251-0.451-1.862-0.713c-0.004-0.002-0.009-0.004-0.013-0.006c-0.578-0.249-1.145-0.525-1.705-0.816 c-0.073-0.038-0.147-0.074-0.219-0.113c-0.511-0.273-1.011-0.568-1.504-0.876c-0.146-0.092-0.291-0.185-0.435-0.279 c-0.454-0.297-0.902-0.606-1.338-0.933c-0.045-0.034-0.088-0.07-0.133-0.104c0.032-0.018,0.064-0.036,0.096-0.054l7.907-4.313 c1.36-0.742,2.205-2.165,2.205-3.714l-0.001-3.602l-0.23-0.278c-0.022-0.025-2.184-2.655-3.001-6.216l-0.091-0.396l-0.341-0.221 c-0.481-0.311-0.769-0.831-0.769-1.392v-3.545c0-0.465,0.197-0.898,0.557-1.223l0.33-0.298v-5.57l-0.009-0.131 c-0.003-0.024-0.298-2.429,1.396-4.36C21.583,10.837,24.061,10,27.5,10c3.426,0,5.896,0.83,7.346,2.466 c1.692,1.911,1.415,4.361,1.413,4.381l-0.009,5.701l0.33,0.298c0.359,0.324,0.557,0.758,0.557,1.223v3.545 c0,0.713-0.485,1.36-1.181,1.575l-0.497,0.153l-0.16,0.495c-0.59,1.833-1.43,3.526-2.496,5.032c-0.262,0.37-0.517,0.698-0.736,0.949 l-0.248,0.283V39.8c0,1.612,0.896,3.062,2.338,3.782l8.467,4.233c0.054,0.027,0.107,0.055,0.16,0.083 C42.677,47.979,42.567,48.054,42.459,48.132z" /> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                                                    Update Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={''}>
                                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512"  > <g> <g> <path d="M256,276.673c-28.016,0-50.81,22.793-50.81,50.81c0,13.895,5.775,27.33,15.857,36.891v45.875 c0,19.273,15.68,34.953,34.953,34.953s34.953-15.68,34.953-34.953v-45.875c10.078-9.555,15.857-22.993,15.857-36.891 C306.81,299.466,284.017,276.673,256,276.673z M273.98,346.558c-4.851,4.571-7.633,10.96-7.633,17.53v46.161 c0,5.705-4.64,10.345-10.345,10.345c-5.705,0-10.345-4.64-10.345-10.345v-46.161c0-6.57-2.782-12.96-7.63-17.527 c-5.304-5.003-8.226-11.778-8.226-19.078c0-14.447,11.755-26.202,26.202-26.202s26.202,11.755,26.202,26.202 C282.202,334.783,279.28,341.558,273.98,346.558z" /> </g> </g> <g> <g> <path d="M404.978,209.876h-236.44v-97.804c0-48.227,39.234-87.464,87.462-87.464s87.463,39.237,87.463,87.464v44.268 c0,6.795,5.51,12.304,12.304,12.304s12.304-5.508,12.304-12.304v-44.268C368.071,50.275,317.796,0,256,0 S143.929,50.275,143.929,112.072v97.804h-36.908c-20.353,0-36.911,16.559-36.911,36.911v228.301 c0,20.353,16.558,36.911,36.911,36.911h297.957c20.353,0,36.911-16.558,36.911-36.911V246.788 C441.89,226.435,425.331,209.876,404.978,209.876z M417.282,475.089c0,6.784-5.519,12.304-12.304,12.304H107.022 c-6.784,0-12.304-5.519-12.304-12.304V246.788c0-6.784,5.52-12.304,12.304-12.304h297.957c6.784,0,12.304,5.519,12.304,12.304 V475.089z" /> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                                                    Change Password
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={''}>
                                                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 54 54" > <g> <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571 c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571 c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78 C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571 c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571 c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052 c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966 c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42 c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052 c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553 c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114 S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22 C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571 c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854 c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052 c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572 c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294 C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052 c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553 c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78 C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64 c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104 l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z" /> <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7 s7,3.141,7,7S30.859,34,27,34z" /> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg> Settings
                                                </NavLink>
                                            </li>
                                            <li>
                                                <a
                                                    href="javascript:void(0)"
                                                    onClick={this.handleLogout}
                                                >
                                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.989 511.989"> <g> <g> <g> <path d="M110.933,221.782c-4.71,0-8.533,3.823-8.533,8.533v51.2c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-51.2 	C119.467,225.605,115.644,221.782,110.933,221.782z" /> <path d="M111.855,2.304L31.172,34.586C8.448,43,0,54.418,0,76.715v358.477c0,22.298,8.448,33.715,30.959,42.061l81.058,32.427 	c4.011,1.519,8.038,2.287,11.981,2.287c17.152,0,29.602-14.336,29.602-34.091V34.049C153.6,9.78,134.246-6.126,111.855,2.304z 	 M136.533,477.876c0,10.18-5.035,17.024-12.535,17.024c-1.869,0-3.883-0.401-5.803-1.118L37.103,461.33 	c-16.102-5.965-20.036-11.102-20.036-26.138V76.715c0-15.036,3.934-20.164,20.241-26.206l80.725-32.29 	c2.082-0.785,4.087-1.186,5.956-1.186c7.501,0,12.544,6.835,12.544,17.016V477.876z" /> <path d="M178.133,51.115h120.533c14.114,0,25.6,11.486,25.6,25.6v128c0,4.71,3.814,8.533,8.533,8.533 	c4.719,0,8.533-3.823,8.533-8.533v-128c0-23.526-19.14-42.667-42.667-42.667H178.133c-4.71,0-8.533,3.823-8.533,8.533 	S173.423,51.115,178.133,51.115z" /> <path d="M332.8,298.582c-4.719,0-8.533,3.823-8.533,8.533v128c0,14.114-11.486,25.6-25.6,25.6H179.2 	c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467c23.526,0,42.667-19.14,42.667-42.667v-128 	C341.333,302.405,337.519,298.582,332.8,298.582z" /> <path d="M511.343,252.655c-0.435-1.05-1.058-1.988-1.852-2.782l-85.325-85.333c-3.337-3.336-8.73-3.336-12.066,0 	c-3.337,3.337-3.337,8.73,0,12.066l70.767,70.775H196.267c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533 	h286.601L412.1,335.215c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5 	l85.325-85.325c0.794-0.794,1.417-1.732,1.852-2.782C512.205,257.093,512.205,254.738,511.343,252.655z" /> </g> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </ScrollToTop>
                </Router>
            </div>
        );
    }

    handleLogout = () => {
        toggleSideMenu('user-right-menu', false);
        auth.logout();
    }
}

const mapStateToProps = (state) => {
    const { pageLoader, user } = state;
    return {
        showPageLoader: pageLoader.get("loading"),
        loggedUserData: user.get('loggedUserData'),
    };
}

App = connect(mapStateToProps)(App);

export default hot(module)(App);