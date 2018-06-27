import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import ScrollToTop from 'components/global/ScrollToTop';
import NutritionShopping from 'components/Nutrition/NutritionShopping';
import NutritionMeal from 'components/Nutrition/NutritionMeal';
import Goals from 'components/Goals/Goals';
import Receip from '../components/Receip/Receip';
import Calendar from 'components/Calendar/Calendar';
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
import { publicPath, routeCodes } from '../constants/routes';
import { SESSION_EXPIRED_URL_TYPE, LOCALSTORAGE_ACCESS_TOKEN_KEY, SERVER_BASE_URL } from '../constants/consts';
import { FaCircleONotch } from "react-icons/lib/fa";
import FitnessTests from './Admin/FitnessTests';
import NutritionRecipeDetails from '../components/Nutrition/NutritionRecipeDetails';
import cns from "classnames";
import NutritionMealAdd from '../components/Nutrition/NutritionMealAdd';
import UpdateProfile from './UpdateProfile';
import { toggleSideMenu, getToken, scrollBottom } from '../helpers/funs';
import Auth from '../auth/Auth';
import socketClient from "socket.io-client";
import { openSocket, closeSocket } from '../actions/user';
import { receiveUserNotificationCount, receiveUsersConversationChannels, receiveUsersConversationByChannel, receiveSentNewMessageResponse, receiveNewMessage } from '../socket';
import { setUserNotificationCount } from '../actions/userNotifications';
import UserRightMenu from '../components/global/UserRightMenu';
import UserNotificationPanel from '../components/global/UserNotificationPanel';
import Notifications from './Notifications';
import UserMessagePanel from '../components/global/UserMessagePanel';
import ProfileSettings from './ProfileSettings';
import { getUserMessageChannelSuccess, openUserChatWindowSuccess, closeUserChatWindow, sendNewMessageRequest, sendNewMessageSuccess, receiveNewMessageResponse } from '../actions/userMessages';
import Messenger from './Messenger';
import $ from "jquery";
import UserChatWindow from '../components/global/UserChatWindow';

const auth = new Auth();

class App extends Component {

    componentWillMount() {
        const {
            dispatch
        } = this.props;
        let token = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_KEY);
        if (token) {
            const socket = socketClient(SERVER_BASE_URL);
            dispatch(openSocket(socket));
            socket.emit('join', getToken());
            receiveUserNotificationCount(socket, (data) => {
                var count = data.count;
                dispatch(setUserNotificationCount(count));
            });
            receiveUsersConversationChannels(socket, this.handleUsersConversationChannnels);
            receiveUsersConversationByChannel(socket, this.handleUsersConversationByChannel);
            receiveSentNewMessageResponse(socket, this.handleSentNewMessageResponse);
            receiveNewMessage(socket, this.handleReceiveNewMessage);
        }
    }

    render() {
        const {
            showPageLoader,
            loggedUserData,
            chatWindows,
        } = this.props;
        var chatWindowKeys = Object.keys(chatWindows);
        return (
            <div className="appWrapper">
                <div id="loader" className={cns({ 'display_none': !showPageLoader })}>
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
                <Router history={history}>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path={routeCodes.HOME} component={Login} />
                            <Route exact path={`${publicPath}${SESSION_EXPIRED_URL_TYPE}`} component={Login} />
                            <Route path={routeCodes.REGISTERUSER} component={RegisterUser} />

                            <PrivateRoute path={routeCodes.PEOPLE} component={People} />
                            <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} />

                            <PrivateRoute path={routeCodes.STATSPAGE} component={StatsPage} />

                            <PrivateRoute path={`${routeCodes.PROFILE}/:username`} component={ProfilePage} />
                            <PrivateRoute path={routeCodes.UPDATE_PROFILE} component={UpdateProfile} />
                            <PrivateRoute path={routeCodes.PROFILE_SETTINGS} component={ProfileSettings} />

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

                            <PrivateRoute path={routeCodes.ALL_NOTIFICATIONS} component={Notifications} />
                            <PrivateRoute path={routeCodes.MESSENGER} component={Messenger} />

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
                            <div>
                                <UserRightMenu
                                    loggedUserData={loggedUserData}
                                    handleLogout={this.handleLogout}
                                />

                                <UserNotificationPanel />

                                <UserMessagePanel />

                                {chatWindows && chatWindowKeys.length > 0 &&
                                    chatWindowKeys.map((key, index) => {
                                        var chatWindowWidth = $('.small-chat-window-wrapper').width();
                                        var right = (chatWindowWidth) ? ((chatWindowWidth + 10) * index) : 0;
                                        var style = { right };
                                        var chatWindow = chatWindows[key];
                                        var userDetails = chatWindow.userDetails;
                                        var loadingMessages = chatWindow.loading;
                                        var messages = chatWindow.messages;
                                        return (
                                            <UserChatWindow
                                                key={key}
                                                channelId={key}
                                                userDetails={userDetails}
                                                style={style}
                                                closeWindow={this.handleCloseUserChatWindow}
                                                messages={messages}
                                                loadingMessages={loadingMessages}
                                                handleSendButton={this.handleSendButton}
                                            />
                                        );
                                    })
                                }
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

    handleUsersConversationChannnels = (data) => {
        const { dispatch } = this.props;
        dispatch(getUserMessageChannelSuccess(data));
    }

    handleUsersConversationByChannel = (data) => {
        const { dispatch } = this.props;
        dispatch(openUserChatWindowSuccess(data));
    }

    handleCloseUserChatWindow = (channelId) => {
        const { dispatch } = this.props;
        dispatch(closeUserChatWindow(channelId));
    }

    handleSentNewMessageResponse = (data) => {
        const { dispatch } = this.props;
        dispatch(sendNewMessageSuccess(data));
    }

    handleSendButton = (data) => {
        const { loggedUserData, socket } = this.props;
        var requestData = Object.assign({}, data);
        data['loggedUser'] = loggedUserData.userDetails;
        const { dispatch } = this.props;
        dispatch(sendNewMessageRequest(data));
        socket.emit('send_new_message', requestData);
    }

    handleReceiveNewMessage = (data) => {
        const { dispatch } = this.props;
        dispatch(receiveNewMessageResponse(data));
    }

}

const mapStateToProps = (state) => {
    const { pageLoader, user, userMessages } = state;
    return {
        showPageLoader: pageLoader.get("loading"),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        chatWindows: userMessages.get('chatWindows'),
    };
}

App = connect(mapStateToProps)(App);

export default hot(module)(App);