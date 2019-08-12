import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import ScrollToTop from 'components/global/ScrollToTop';
import NutritionShopping from 'components/Nutrition/NutritionShopping';
import NutritionMeal from 'components/Nutrition/NutritionMeal';
import Receip from '../components/Receip/Receip';
import NotFound from 'views/NotFound';
import StatsPage from 'views/StatsPage';
import Badges from 'views/Badges';
import Exercise from 'views/Exercise';
import Dashboard from 'views/Dashboard';
import ProfilePage from 'views/Profile';
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
import history from '../config/history';
import { ToastContainer, Flip } from "react-toastify";
import NutritionPreferences from '../components/Nutrition/NutritionPreferences'
import { publicPath, routeCodes } from '../constants/routes';
import { SESSION_EXPIRED_URL_TYPE, SERVER_BASE_URL, FRIENDSHIP_STATUS_UNKNOWN } from '../constants/consts';
import { FaCircleONotch } from "react-icons/lib/fa";
import FitnessTests from './Admin/FitnessTests';
import NutritionRecipeDetails from '../components/Nutrition/NutritionRecipeDetails';
import cns from "classnames";
import NutritionMealAdd from '../components/Nutrition/NutritionMealAdd';
import UpdateProfile from './UpdateProfile';
import { toggleSideMenu, getToken, scrollBottom, slideToBottomOfChatWindow, ts, connectIDB } from '../helpers/funs';
import Auth from '../auth/Auth';
import socketClient from "socket.io-client";
import { openSocket } from '../actions/user';
import {
    receiveUserNotificationCount,
    receiveUsersConversationChannels,
    receiveUsersConversationByChannel,
    receiveSentNewMessageResponse,
    receiveNewMessage,
    messageTypingStart,
    messageTypingStop,
    receiveUserMessagesCount,
    receiveChannelId,
    receiveUserFriendRequestsCount,
    receiveLoggedUserFriends,
    receiveOnlineFriendStatus
} from '../socket';
import { setUserNotificationCount } from '../actions/userNotifications';
import UserRightMenu from '../components/global/UserRightMenu';
import UserNotificationPanel from '../components/global/UserNotificationPanel';
import Notifications from './Notifications';
import UserMessagePanel from '../components/global/UserMessagePanel';
import ProfileSettings from './ProfileSettings';
import {
    getUserMessageChannelSuccess,
    openUserChatWindowSuccess,
    closeUserChatWindow,
    sendNewMessageRequest,
    sendNewMessageSuccess,
    receiveNewMessageResponse,
    messageTypingResponse,
    toggleChatWindowMinimize,
    setUserMessagesCount,
    getUserChannelResponse,
    openUserChatWindowRequest,
    loadMoreUserMessageChannelSuccess,
    moveToGroundUserChatWindow
} from '../actions/userMessages';
import $ from "jquery";
import UserChatWindow from '../components/global/UserChatWindow';
import ScheduleWorkout from './ScheduleWorkout';
import SaveScheduleWorkout from '../components/ScheduleWorkout/SaveScheduleWorkout';
import Programs from './Programs';
import ProgramSave from '../components/Program/ProgramSave';
import SaveScheduleProgramWorkout from '../components/Program/SaveScheduleProgramWorkout';
import ViewProgramScheduleWorkout from '../components/Program/ViewProgramScheduleWorkout';
import Progress from './Progress';
import ScheduleWorkoutCalendarPage from './ScheduleWorkoutCalendarPage';
import { setUserFriendRequestsCount, getApprovedFriendsMessengerSuccess, loadMoreApprovedFriendsMessengerSuccess, updateApprovedFriendsOnlineStatusMessenger } from '../actions/friends';
import AdminRightMenu from '../components/Admin/Template/AdminRightMenu';
import { logout } from '../actions/login';
import BodyParts from './Admin/BodyParts';
import EquipmentCategories from './Admin/EquipmentCategories';
import ChangePassword from './Admin/ChangePassword';
import UserChangePassword from './ChangePassword';
import Profile from './Admin/Profile';
import Post from './Post';
import ProgressPhotos from './ProgressPhotos';
import GalleryPhotos from './GalleryPhotos';
import UserChatOffGroundBubble from '../components/global/UserChatOffGroundBubble';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import SaveProgramMasterPage from '../components/Program/SaveProgramMasterPage';
import ProgramView from '../components/Program/ProgramView';
import RatingView from '../components/Program/RatingView';
import ViewScheduleWorkout from '../components/Profile/ViewScheduleWorkout';
import initIDBSchema from '../helpers/idbInitialiser';
import NutritionMealEdit from '../components/Nutrition/NutritionMealEdit';
import NutritionMealView from '../components/Nutrition/NutritionMealView';
JavascriptTimeAgo.locale(en);

const auth = new Auth();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initAdminLogoutAction: false,
        };
    }

    componentWillMount() {
        const {
            dispatch
        } = this.props;
        const socket = socketClient(SERVER_BASE_URL);
        dispatch(openSocket(socket));
        receiveUserNotificationCount(socket, this.handleUserNotificationCount);
        receiveUserFriendRequestsCount(socket, this.handleUserFriendRequestsCount);
        receiveUserMessagesCount(socket, this.handleUserMessagesCount);
        receiveUsersConversationChannels(socket, this.handleUsersConversationChannnels);
        receiveUsersConversationByChannel(socket, this.handleUsersConversationByChannel);
        receiveSentNewMessageResponse(socket, this.handleSentNewMessageResponse);
        receiveNewMessage(socket, this.handleReceiveNewMessage);
        messageTypingStart(socket, this.handleMessageTypingResponse);
        messageTypingStop(socket, this.handleMessageTypingResponse);
        receiveChannelId(socket, this.handleReceiveChannelId);
        receiveLoggedUserFriends(socket, this.handleLoggedUserFriends);
        receiveOnlineFriendStatus(socket, this.handleOnlineFriendsStatus);
        let token = getToken();
        if (token) {
            socket.emit('join', token);
        }
    }

    render() {
        const {
            showPageLoader,
            loggedUserData,
            chatWindows,
            loggedAdminData,
        } = this.props;
        var chatWindowKeys = Object.keys(chatWindows);
        let onGroundChatWindowsCounterFlag = 0;
        let chatWindowZIndex = 10;
        return (
            <div className="appWrapper">
                <div id="app-wrapper" className="app-wrapper-content">
                    <div id="loader" className={cns({ 'display_none': !showPageLoader })}>
                        <FaCircleONotch className="loader-spinner fs-100" />
                    </div>
                    <Router history={history}>
                        <ScrollToTop>
                            <Switch>
                                <Route exact path={routeCodes.HOME} component={Login} />
                                <Route exact path={`${publicPath}${SESSION_EXPIRED_URL_TYPE}`} component={Login} />

                                <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} />

                                <PrivateRoute path={`${routeCodes.STATSPAGE}`} component={StatsPage} />

                                <PrivateRoute exact path={routeCodes.PROFILE_WORKOUT_DETAILS} component={ViewScheduleWorkout} />
                                <PrivateRoute path={`${routeCodes.PROFILE}/:username`} component={ProfilePage} />
                                <PrivateRoute path={routeCodes.UPDATE_PROFILE} component={UpdateProfile} />
                                <PrivateRoute path={routeCodes.PROFILE_SETTINGS} component={ProfileSettings} />
                                <PrivateRoute path={routeCodes.CHANGE_PASSWORD} component={UserChangePassword} />

                                <PrivateRoute path={`${routeCodes.POST}/:username/:id`} component={Post} />

                                <PrivateRoute path={routeCodes.BODY} component={Body} />

                                <PrivateRoute exact path={routeCodes.EXERCISE} component={Exercise} />
                                <PrivateRoute path={routeCodes.EXERCISEFITNESS} component={ExerciseSettings} />
                                <PrivateRoute path={routeCodes.EXERCISEEQP} component={ExerciseSettings} />
                                <PrivateRoute path={routeCodes.EXERCISEPREFERENCE} component={ExerciseSettings} />

                                <PrivateRoute exact path={routeCodes.SCHEDULE_WORKOUT} component={ScheduleWorkout} />
                                <PrivateRoute exact path={routeCodes.SAVE_SCHEDULE_WORKOUT} component={SaveScheduleWorkout} />

                                <PrivateRoute exact path={routeCodes.PROGRAMS} component={Programs} />
                                <PrivateRoute exact path={routeCodes.PROGRAMS_PUBLIC} component={Programs} />
                                <PrivateRoute exact path={`${routeCodes.PROGRAMS_RATING_VIEW}/:id`} component={RatingView} />
                                <PrivateRoute exact path={`${routeCodes.PROGRAM_MASTER_SAVE}/:id?`} component={SaveProgramMasterPage} />
                                <PrivateRoute exact path={`${routeCodes.PROGRAM_SAVE}/:id`} component={ProgramSave} />
                                <PrivateRoute exact path={`${routeCodes.PROGRAM_VIEW}/:id`} component={ProgramView} />
                                <PrivateRoute exact path={routeCodes.SAVE_PROGRAM_SCHEDULE_WORKOUT} component={SaveScheduleProgramWorkout} />
                                <PrivateRoute exact path={routeCodes.VIEW_PROGRAM_SCHEDULE_WORKOUT} component={ViewProgramScheduleWorkout} />

                                <PrivateRoute exact path={routeCodes.NUTRITION} component={NutritionMeal} />
                                <PrivateRoute exact path={routeCodes.NUTRITION_ADD} component={NutritionMealAdd} />
                                <PrivateRoute exact path={`${routeCodes.NUTRITION_EDIT}/:id`} component={NutritionMealEdit} />
                                <PrivateRoute exact path={`${routeCodes.NUTRITION_VIEW}/:id`} component={NutritionMealView} />

                                <PrivateRoute path={`${routeCodes.NUTRITION_RECIPE_DETAILS}/:id`} component={NutritionRecipeDetails} />
                                <PrivateRoute path={routeCodes.NUTRITIONPREFERENCE} component={NutritionPreferences} />
                                <PrivateRoute path={routeCodes.NUTRITIONSHOP} component={NutritionShopping} />

                                <PrivateRoute exact path={routeCodes.CALENDAR} component={ScheduleWorkoutCalendarPage} />

                                <PrivateRoute path={routeCodes.BADGES} component={Badges} />

                                <PrivateRoute path={routeCodes.PROGRESS} component={Progress} />

                                <PrivateRoute path={routeCodes.RECEIP} component={Receip} />

                                <PrivateRoute path={routeCodes.USERS} component={FrontEndUsersList} />

                                <PrivateRoute path={routeCodes.ALL_NOTIFICATIONS} component={Notifications} />

                                <PrivateRoute path={`${routeCodes.PROGRESS_PHOTOS}/:username`} component={ProgressPhotos} />
                                <PrivateRoute path={`${routeCodes.GALLERY_PHOTOS}/:username`} component={GalleryPhotos} />

                                <Route exact path={adminRootRoute} component={AdminLogin} />
                                <Route exact path={`${adminRootRoute}/${SESSION_EXPIRED_URL_TYPE}`} component={AdminLogin} />

                                <AdminPrivateRoute path={adminRouteCodes.DASHBOARD} component={AdminDashboard} />

                                <AdminPrivateRoute exact path={adminRouteCodes.USERS} component={Users} />
                                <AdminPrivateRoute path={`${adminRouteCodes.USERS_SAVE}/:id`} component={Users} />

                                <AdminPrivateRoute path={adminRouteCodes.EXERCISE} component={Exercises} />

                                <AdminPrivateRoute path={adminRouteCodes.FITNESS_TESTS} component={FitnessTests} />

                                <AdminPrivateRoute path={adminRouteCodes.EQUIPMENTS} component={Equipments} />

                                <AdminPrivateRoute path={adminRouteCodes.EQUIPMENT_CATEGORIES} component={EquipmentCategories} />

                                <AdminPrivateRoute path={adminRouteCodes.BADGES} component={AdminBadges} />

                                <AdminPrivateRoute path={adminRouteCodes.BODY_PARTS} component={BodyParts} />

                                <AdminPrivateRoute path={adminRouteCodes.PROFILE} component={Profile} />
                                <AdminPrivateRoute path={adminRouteCodes.CHANGE_PASSWORD} component={ChangePassword} />

                                <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />

                                <Route path='*' component={NotFound} />
                            </Switch>


                            <ToastContainer
                                position="top-right"
                                className="fitassist-toast"
                                transition={Flip}
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
                                            var chatWindow = chatWindows[key];
                                            if (chatWindow && chatWindow.isOnGround) {
                                                var chatWindowWidth = $('.small-chat-window-wrapper').width();
                                                chatWindowZIndex -= index;
                                                var right = (chatWindowWidth) ? ((chatWindowWidth + 10) * onGroundChatWindowsCounterFlag) : 0;
                                                var style = { right, zIndex: chatWindowZIndex };
                                                var userDetails = chatWindow.userDetails;
                                                var userPreferences = chatWindow.userPreferences;
                                                var friendshipStatus = chatWindow.friendshipStatus;
                                                var isTyping = (typeof chatWindow.isTyping !== 'undefined') ? chatWindow.isTyping : false;
                                                var loadingMessages = chatWindow.loading;
                                                var messages = chatWindow.messages;
                                                onGroundChatWindowsCounterFlag++;
                                                return (
                                                    <UserChatWindow
                                                        key={key}
                                                        channelId={key}
                                                        userDetails={userDetails}
                                                        userPreferences={userPreferences}
                                                        friendshipStatus={friendshipStatus}
                                                        isTyping={isTyping}
                                                        style={style}
                                                        closeWindow={this.handleCloseUserChatWindow}
                                                        messages={messages}
                                                        loadingMessages={loadingMessages}
                                                        handleSendButton={this.handleSendButton}
                                                        handleStartTyping={this.handleStartTyping}
                                                        handleStopTyping={this.handleStopTyping}
                                                        handleToggleChatWindowMinimize={this.handleToggleChatWindowMinimize}
                                                    />
                                                );
                                            }
                                        })
                                    }

                                    {chatWindows && chatWindowKeys.length > 3 &&
                                        <UserChatOffGroundBubble
                                            chatWindows={chatWindows}
                                            chatWindowKeys={chatWindowKeys}
                                            handleMoveToGround={this.handleMoveToGround}
                                            closeWindow={this.handleCloseUserChatWindow}
                                        />
                                    }

                                </div>
                            }
                            {loggedAdminData &&
                                <div>
                                    <AdminRightMenu
                                        handleLogout={this.handleAdminLogout}
                                    />
                                </div>
                            }
                        </ScrollToTop>
                    </Router>
                </div>
                <div className="app-footer">
                    <p>&copy; Copyright <a href="http://fitly.co/">fitly.co</a>. All Right Reserved.</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        try {
            if (window.indexedDB) {
                connectIDB()(this.handleIDBUpgrade).then((connection) => {
                    connection.result.close();
                });
            }
        } catch (error) { console.log('Connection error of IDB : ', error); }
    }

    handleIDBUpgrade = (event) => {
        initIDBSchema(event);
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadingAdminLogin } = this.props;
        const { initAdminLogoutAction } = this.state;
        if (!loadingAdminLogin && initAdminLogoutAction) {
            this.setState({ initAdminLogoutAction: false });
            ts('Logout success!');
            history.push(adminRootRoute);
        }
    }

    handleLogout = () => {
        const { socket } = this.props;
        socket.emit('request_make_user_offline');
        toggleSideMenu('user-right-menu', false);
        auth.logout();
    }

    handleAdminLogout = () => {
        const { dispatch } = this.props;
        toggleSideMenu('admin-right-menu', false);
        dispatch(logout());
        this.setState({ initAdminLogoutAction: true });
    }

    handleUserNotificationCount = (data) => {
        const { dispatch } = this.props;
        var count = data.count;
        dispatch(setUserNotificationCount(count));
    }

    handleUserFriendRequestsCount = (data) => {
        const { dispatch } = this.props;
        var count = data.count;
        dispatch(setUserFriendRequestsCount(count));
    }

    handleUserMessagesCount = (data) => {
        const { dispatch } = this.props;
        var count = data.count;
        dispatch(setUserMessagesCount(count));
    }

    handleUsersConversationChannnels = (data) => {
        const { dispatch, panelChannelLoadMoreLoading } = this.props;
        if (panelChannelLoadMoreLoading) {
            dispatch(loadMoreUserMessageChannelSuccess(data));
        } else {
            dispatch(getUserMessageChannelSuccess(data));
        }
    }

    handleLoggedUserFriends = (data) => {
        const { dispatch, approvedMessLoadMoreLoading } = this.props;
        if (approvedMessLoadMoreLoading) {
            dispatch(loadMoreApprovedFriendsMessengerSuccess(data));
        } else {
            dispatch(getApprovedFriendsMessengerSuccess(data));
        }
    }

    handleUsersConversationByChannel = (data) => {
        const { dispatch } = this.props;
        const channelId = data && data.channel && data.channel._id ? data.channel._id : null;
        if (channelId) {
            dispatch(openUserChatWindowSuccess(data));
            scrollBottom(`#chat-history_${channelId}`, 'slow');
        }
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
        if (typeof data.channelId !== 'undefined') {
            slideToBottomOfChatWindow(data.channelId);
        }
    }

    handleReceiveNewMessage = (data) => {
        const { dispatch, socket, chatWindows } = this.props;
        dispatch(receiveNewMessageResponse(data));
        if (data && data.channel) {
            var channelId = data.channel._id;
            var isWindowOpen = chatWindows.hasOwnProperty(channelId);
            if (isWindowOpen) {
                var chatWindow = chatWindows[channelId];
                if (chatWindow && typeof chatWindow.isMinimized !== 'undefined' && !chatWindow.isMinimized) {
                    var messageObj = data.channel.message;
                    var friendId = messageObj.authUserId;
                    var requestData = {
                        channelId: channelId,
                        friendId: friendId,
                    }
                    socket.emit('mark_message_as_read', requestData);
                    slideToBottomOfChatWindow(channelId);
                } else {
                    socket.emit('user_messages_count', getToken());
                }
            } else {
                socket.emit('user_messages_count', getToken());
            }
        }
    }

    handleStartTyping = (data) => {
        const { socket } = this.props;
        socket.emit('request_typing_start', data);
    }

    handleStopTyping = (data) => {
        const { socket } = this.props;
        socket.emit('request_typing_stop', data);
    }

    handleMessageTypingResponse = (data) => {
        const { dispatch } = this.props;
        dispatch(messageTypingResponse(data));
    }

    handleToggleChatWindowMinimize = (channelId, friendId, minimize) => {
        const { dispatch, socket } = this.props;
        dispatch(toggleChatWindowMinimize(channelId, minimize));
        if (!minimize) {
            var requestData = {
                channelId: channelId,
                friendId: friendId,
            }
            socket.emit('mark_message_as_read', requestData);
            socket.emit('user_messages_count', getToken());
            $(`#chat-history_${channelId}`).animate({ scrollTop: 1000000 }, 'slow');
        }
    }

    handleMoveToGround = (channelId) => {
        const { dispatch } = this.props;
        dispatch(moveToGroundUserChatWindow(channelId));
    }

    handleReceiveChannelId = (data) => {
        const { dispatch, socket, loggedUserData } = this.props;
        dispatch(getUserChannelResponse());
        var loggedUser = loggedUserData.userDetails;
        var loggedUserId = loggedUser.authUserId;
        if (data && typeof data.resp_data !== 'undefined' && typeof data.resp_data.channel !== 'undefined' && data.resp_data.channel) {
            var channel = data.resp_data.channel;
            var channelId = channel._id;
            var friendData = channel.friendData;
            var userData = channel.userData;
            var userDetails = null;
            var channelForPreferences = null;
            var friendshipStatus = (channel.friendshipStatus) ? channel.friendshipStatus : FRIENDSHIP_STATUS_UNKNOWN;
            if (typeof friendData !== 'undefined' && friendData && friendData.authUserId !== loggedUserId) {
                userDetails = friendData;
                channelForPreferences = (channel.friendPreferences) ? channel.friendPreferences : null;
            } else if (typeof userData !== 'undefined' && userData && userData.authUserId !== loggedUserId) {
                userDetails = userData;
                channelForPreferences = (channel.userPreferences) ? channel.userPreferences : null;
            }
            if (channelId && userDetails) {
                dispatch(openUserChatWindowRequest(userDetails, channelId, channelForPreferences, friendshipStatus));
                var requestData = {
                    token: getToken(),
                    channel_id: channelId,
                    start: 0,
                    limit: 10,
                }
                socket.emit('get_user_conversation_by_channel', requestData);
            }
        }
    }

    handleOnlineFriendsStatus = (data) => {
        const { dispatch } = this.props;
        dispatch(updateApprovedFriendsOnlineStatusMessenger(data));
    }

}

const mapStateToProps = (state) => {
    const { pageLoader, user, userMessages, admin, login, friends } = state;
    return {
        showPageLoader: pageLoader.get("loading"),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        chatWindows: userMessages.get('chatWindows'),
        panelChannelLoadMoreLoading: userMessages.get('panelChannelLoadMoreLoading'),
        loadingAdminLogin: login.get('loading'),
        loggedAdminData: admin.get('loggedUserData'),
        approvedMessLoadMoreLoading: friends.get('approvedMessLoadMoreLoading'),
    };
}

App = connect(mapStateToProps)(App);

export default hot(module)(App);