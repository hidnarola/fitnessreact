import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset, initialize } from 'redux-form';
import ProfileFithub from 'components/Profile/ProfileFithub';
import ProfileFriends from 'components/Profile/ProfileFriends';
import ProfilePhotos from 'components/Profile/ProfilePhotos';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { routeCodes } from 'constants/routes';
import { getProfileDetailsRequest, saveAboutProfileDetailsRequest, saveLoggedUserProfilePhotoRequest, getLoggedUserProfileSettingsRequest } from '../actions/profile';
import noProfileImg from 'img/common/no-profile-img.png'
import { FRIENDSHIP_STATUS_SELF, FRIENDSHIP_STATUS_UNKNOWN, FRIENDSHIP_STATUS_FRIEND, FRIENDSHIP_STATUS_REQUEST_RECEIVED, FRIENDSHIP_STATUS_REQUEST_SENT, LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY, MEASUREMENT_UNIT_CENTIMETER, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_GRAM } from '../constants/consts';
import { sendFriendRequestRequest, cancelFriendRequestRequest, acceptFriendRequestRequest } from '../actions/friends';
import { ts, te, convertUnits } from '../helpers/funs';
import UpdateAboutMeModal from '../components/Profile/UpdateAboutMeModal';
import ReactHtmlParser from 'react-html-parser';
import ChangeProfilePhotoModal from '../components/Profile/ChangeProfilePhotoModal';
import jwt from "jwt-simple";
import { setLoggedUserFromLocalStorage } from '../actions/user';
import { FaCircleONotch } from "react-icons/lib/fa";
import { getUserChannelRequest } from '../actions/userMessages';
import SweetAlert from "react-bootstrap-sweetalert";

class Profile extends Component {
    constructor(props) {
        super(props);
        var username = props.match.params.username;
        this.state = {
            loadProfileActionInit: false,
            profile: {},
            username: (username) ? username : null,
            sendFriendRequestInit: false,
            sendFriendRequestDisabled: false,
            showCancelFriendRequestModal: false,
            cancelFriendRequestInit: false,
            cancelFriendRequestDisabled: false,
            showUnfriendRequestModal: false,
            UnfriendRequestInit: false,
            UnfriendRequestDisabled: false,
            forceUpdateChildComponents: false,
            acceptFriendRequestReceivedInit: false,
            friendRequestReceivedDisabled: false,
            showRejectFriendRequestModal: false,
            rejectFriendRequestInit: false,
            selectFriendshipId: null,
            showUpdateAboutMeModal: false,
            updateAboutMeDetailsActionInit: false,
            showChangeProfilePicModal: false,
            updateProfilePhotoActionInit: false,
            updateLocalStorageData: false,
        }
        this.changeProfilePhotoRef = React.createRef();
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        if (typeof match.params.username !== 'undefined') {
            var username = match.params.username;
            this.setState({
                loadProfileActionInit: true,
                username
            });
            dispatch(getProfileDetailsRequest(username));
        }
        dispatch(getLoggedUserProfileSettingsRequest());
    }

    componentWillReceiveProps(nextProps) {
        var oldUsername = this.state.username;
        var match = nextProps.match;
        if (typeof match.params.username !== 'undefined') {
            var newUsername = match.params.username;
            if (newUsername !== oldUsername) {
                this.setState({
                    loadProfileActionInit: true,
                    username: newUsername,
                });
                nextProps.dispatch(getProfileDetailsRequest(newUsername));
            }
        }
    }

    render() {
        const {
            profile,
            username,
            sendFriendRequestDisabled,
            showCancelFriendRequestModal,
            cancelFriendRequestDisabled,
            UnfriendRequestDisabled,
            showUnfriendRequestModal,
            friendRequestReceivedDisabled,
            showRejectFriendRequestModal,
            showUpdateAboutMeModal,
            showChangeProfilePicModal,
            loadProfileActionInit,
        } = this.state;
        const { requestChannelLoading } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                {loadProfileActionInit &&
                    <div className="no-content-loader">
                        <FaCircleONotch className="loader-spinner fs-100" />
                    </div>
                }
                {!loadProfileActionInit && profile && Object.keys(profile).length > 0 &&
                    <section className="body-wrap">
                        <div className="body-head d-flex">
                            <div className="body-head-l">
                                <h2>
                                    {profile && (typeof profile.firstName !== 'undefined') && (profile.firstName)}
                                    {profile && (typeof profile.lastName !== 'undefined') && (' ' + profile.lastName)}
                                </h2>
                                <div className="body-head-l-btm">

                                    <NavLink
                                        activeClassName='pink-btn'
                                        className='white-btn'
                                        exact
                                        to={`${routeCodes.PROFILE}/${username}`}
                                    >
                                        Fithub
                                </NavLink>

                                    <NavLink
                                        activeClassName='pink-btn'
                                        className='white-btn'
                                        exact
                                        to={routeCodes.PROFILEPHOTOS.replace('{username}', username)}
                                    >
                                        Photos
                                </NavLink>

                                    <NavLink
                                        activeClassName='pink-btn'
                                        className='white-btn'
                                        exact
                                        to={routeCodes.PROFILEFRIENDS.replace('{username}', username)}
                                    >
                                        Friends
                                </NavLink>
                                </div>
                            </div>
                            {profile && profile.friendshipStatus && profile.friendshipStatus !== '' && profile.friendshipStatus !== FRIENDSHIP_STATUS_SELF &&
                                <div className="body-head-r add-friend">
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && (!UnfriendRequestDisabled) &&
                                        <button
                                            className="active white-btn"
                                            onClick={() => {
                                                this.handleShowUnfriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={UnfriendRequestDisabled}
                                        >
                                            {(!UnfriendRequestDisabled) ? 'Unfriend' : 'Please wait...'}
                                            <i className="icon-remove_circle_outline"></i>
                                        </button>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_RECEIVED &&
                                        <div>
                                            <button
                                                className="active color-white gradient-color-1 white-btn"
                                                onClick={() => {
                                                    this.handleAcceptRequest(profile.friendshipId)
                                                }}
                                                disabled={friendRequestReceivedDisabled}
                                            >
                                                {(!friendRequestReceivedDisabled) ? 'Accept' : 'Please wait...'}
                                                <i className="icon-check_circle"></i>
                                            </button>
                                            <button
                                                className="active white-btn"
                                                onClick={() => {
                                                    this.handleShowRejectFriendRequestModal(profile.friendshipId)
                                                }}
                                                disabled={friendRequestReceivedDisabled}
                                            >
                                                {(!friendRequestReceivedDisabled) ? 'Reject' : 'Please wait...'}
                                                <i className="icon-cancel"></i>
                                            </button>
                                        </div>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_SENT &&
                                        <button
                                            className="active white-btn"
                                            onClick={() => {
                                                this.handleShowCancelFriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={cancelFriendRequestDisabled}
                                        >
                                            {(!cancelFriendRequestDisabled) ? 'Cancel Request' : 'Please wait...'}
                                            <i className="icon-cancel"></i>
                                        </button>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_UNKNOWN &&
                                        <button
                                            className="add-friend-btn active"
                                            onClick={() => {
                                                this.setState({ sendFriendRequestDisabled: true });
                                                this.handleAddFriend(profile.authUserId)
                                            }}
                                            disabled={sendFriendRequestDisabled}
                                        >
                                            {(!sendFriendRequestDisabled) ? 'Add Friend' : 'Please wait...'}
                                            <i className="icon-person_add"></i>
                                        </button>
                                    }
                                    <button
                                        className="white-btn gradient-color-2 color-white active"
                                        onClick={this.handleRequestMessageChannel}
                                        disabled={requestChannelLoading}
                                    >
                                        {(!requestChannelLoading) ? 'Send message' : 'Please wait...'}
                                        <i className="icon-mail_outline"></i>
                                    </button>
                                </div>
                            }
                        </div>

                        <div className="fitness-stats">
                            <div className="body-content d-flex row justify-content-start profilephoto-content">

                                <div className="col-md-9">
                                    <Switch>
                                        <Route
                                            exact
                                            path={`${routeCodes.PROFILE}/:username`}
                                            render={() => {
                                                return <ProfileFithub
                                                    {...this.state}
                                                    setForceUpdateChildComponents={this.setForceUpdateChildComponents}
                                                />
                                            }}
                                        />
                                        <Route
                                            exact
                                            path={routeCodes.PROFILEFRIENDS.replace('{username}', username)}
                                            render={() => {
                                                return <ProfileFriends
                                                    {...this.state}
                                                    setForceUpdateChildComponents={this.setForceUpdateChildComponents}
                                                />
                                            }}
                                        />
                                        <Route
                                            exact
                                            path={routeCodes.PROFILEPHOTOS.replace('{username}', username)}
                                            render={() => {
                                                return <ProfilePhotos
                                                    {...this.state}
                                                    setForceUpdateChildComponents={this.setForceUpdateChildComponents}
                                                />
                                            }}
                                        />
                                    </Switch>
                                </div>

                                <div className="col-md-3 ml-auto">
                                    <div className="lavel-img">
                                        {profile &&
                                            <span className="height-auto">
                                                <img
                                                    src={profile.avatar}
                                                    alt="Profile image"
                                                    className="width-100-per"
                                                    onError={(e) => {
                                                        e.target.src = noProfileImg
                                                    }}
                                                />
                                                {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                                    <a href="javascript:void(0)" onClick={this.handleShowChangeProfilePhotoModal}>
                                                        <i className="icon-add_a_photo"></i>
                                                    </a>
                                                }
                                            </span>
                                        }
                                        <a href="" data-toggle="modal" data-target="#level-gallery">Lavel 13</a>
                                    </div>

                                    <div className="white-box profile-about">
                                        <div className="whitebox-head d-flex profile-about-head">
                                            <h3 className="title-h3">About</h3>
                                            {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                                <div className="whitebox-head-r">
                                                    <a href="javascript:void(0)" onClick={this.showUpdateAboutMeModal}>Edit</a>
                                                </div>
                                            }
                                        </div>
                                        <div className="whitebox-body profile-about-body">
                                            {profile && profile.height > 0 &&
                                                <a href="javascript:void(0)" className="purple-btn">
                                                    Height: {profile.height} {(profile.heightUnit) ? profile.heightUnit : MEASUREMENT_UNIT_CENTIMETER}
                                                </a>
                                            }
                                            {profile && profile.height <= 0 &&
                                                <a href="javascript:void(0)" className="purple-btn">
                                                    Please add your height
                                            </a>
                                            }
                                            {profile && profile.weight > 0 &&
                                                <a href="javascript:void(0)" className="green-blue-btn">
                                                    Weight: {profile.weight} {(profile.weightUnit) ? profile.weightUnit : MEASUREMENT_UNIT_KILOGRAM}
                                                </a>
                                            }
                                            {profile && profile.weight <= 0 &&
                                                <a href="javascript:void(0)" className="green-blue-btn">
                                                    Please add your weight
                                            </a>
                                            }
                                            {profile && profile.aboutMe !== '' &&
                                                <div>{ReactHtmlParser(profile.aboutMe)}</div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>
                }
                <SweetAlert
                    show={showCancelFriendRequestModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, cancel it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleCancelFriendRequest}
                    onCancel={this.handleHideCancelFriendRequestModal}
                >
                    You will not be able to recover it!
                </SweetAlert>
                <SweetAlert
                    show={showRejectFriendRequestModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, reject it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleRejectFriendRequest}
                    onCancel={this.handleHideRejectFriendRequestModal}
                >
                    You will not be able to recover it!
                </SweetAlert>
                <SweetAlert
                    show={showUnfriendRequestModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, unfriend us!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleUnfriendRequest}
                    onCancel={this.handleHideUnfriendRequestModal}
                >
                    You will not be able to recover it!
                </SweetAlert>
                <UpdateAboutMeModal
                    show={showUpdateAboutMeModal}
                    onSubmit={this.handleUpdateAboutMeSubmit}
                    handleClose={this.handleHideUpdateAboutMeModal}
                />
                <ChangeProfilePhotoModal
                    ref={this.changeProfilePhotoRef}
                    show={showChangeProfilePicModal}
                    handleSubmit={this.saveProfilePhoto}
                    handleClose={this.handleHideChangeProfilePhotoModal}
                />
            </div>
        );
    }

    componentDidUpdate() {
        const {
            profile,
            profileLoading,
            match,
            requestSendLoading,
            requestSendError,
            dispatch,
            requestCancelLoading,
            requestCancelError,
            requestAcceptLoading,
            requestAcceptError,
        } = this.props;
        const {
            loadProfileActionInit,
            sendFriendRequestInit,
            username,
            cancelFriendRequestInit,
            UnfriendRequestInit,
            acceptFriendRequestReceivedInit,
            rejectFriendRequestInit,
            updateAboutMeDetailsActionInit,
            updateProfilePhotoActionInit,
            updateLocalStorageData,
        } = this.state;
        var stateProfile = this.state.profile;
        if (loadProfileActionInit && !profileLoading && (profile !== stateProfile)) {
            var newProfileState = this.formatAboutDetails(profile);
            this.setState({
                loadProfileActionInit: false,
                profile: newProfileState,
                sendFriendRequestDisabled: false,
                cancelFriendRequestDisabled: false,
                UnfriendRequestDisabled: false,
                friendRequestReceivedDisabled: false,
            });
            const updateAboutMeFormData = {
                about_me: profile.aboutMe,
                height: profile.height,
                weight: profile.weight,
            }
            dispatch(initialize('aboutMeUpdateModalForm', updateAboutMeFormData));
            if (updateLocalStorageData) {
                this.setState({ updateLocalStorageData: false });
                localStorage.setItem(LOCALSTORAGE_USER_DETAILS_KEY, jwt.encode(profile, FITASSIST_USER_DETAILS_TOKEN_KEY));
                dispatch(setLoggedUserFromLocalStorage());
            }
        }
        if (sendFriendRequestInit && !requestSendLoading) {
            this.setState({
                sendFriendRequestInit: false,
                loadProfileActionInit: true
            });
            dispatch(getProfileDetailsRequest(username));
            if ((requestSendError && requestSendError.length > 0)) {
                te(requestSendError[0]);
            } else {
                ts('Friend request send!');
            }
        }
        if (cancelFriendRequestInit && !requestCancelLoading) {
            this.setState({
                cancelFriendRequestInit: false,
                loadProfileActionInit: true,
            });
            this.handleHideCancelFriendRequestModal();
            dispatch(getProfileDetailsRequest(username));
            if ((requestCancelError && requestCancelError.length > 0)) {
                te(requestCancelError[0]);
            } else {
                ts('Friend request canceled!');
            }
        }
        if (UnfriendRequestInit && !requestCancelLoading) {
            this.setState({
                UnfriendRequestInit: false,
                loadProfileActionInit: true,
            });
            dispatch(getProfileDetailsRequest(username));
            if ((requestCancelError && requestCancelError.length > 0)) {
                te(requestCancelError[0]);
            } else {
                ts('You are now no friends any more!');
            }
            this.handleHideUnfriendRequestModal();
            this.setForceUpdateChildComponents(true);
        }
        if (acceptFriendRequestReceivedInit && !requestAcceptLoading) {
            this.setState({
                acceptFriendRequestReceivedInit: false,
                loadProfileActionInit: true,
            });
            dispatch(getProfileDetailsRequest(username));
            if ((requestAcceptError && requestAcceptError.length > 0)) {
                te(requestAcceptError[0]);
            } else {
                ts('Friend request accepted!');
                // emit socket for sending notification
            }
            this.setForceUpdateChildComponents(true);
        }
        if (rejectFriendRequestInit && !requestCancelLoading) {
            this.setState({
                rejectFriendRequestInit: false,
                loadProfileActionInit: true,
            });
            this.handleHideRejectFriendRequestModal();
            dispatch(getProfileDetailsRequest(username));
            if ((requestCancelError && requestCancelError.length > 0)) {
                te(requestCancelError[0]);
            } else {
                ts('Friend request canceled!');
            }
            this.setForceUpdateChildComponents(true);
        }
        if (updateAboutMeDetailsActionInit && !profileLoading) {
            this.setState({
                updateAboutMeDetailsActionInit: false,
                loadProfileActionInit: true
            });
            dispatch(getProfileDetailsRequest(username));
            this.handleHideUpdateAboutMeModal();
            // error and success message handling is remaining
        }
        if (updateProfilePhotoActionInit && !profileLoading) {
            this.setState({
                updateProfilePhotoActionInit: false,
                loadProfileActionInit: true,
                updateLocalStorageData: true,
            });
            dispatch(getProfileDetailsRequest(username));
            this.handleHideChangeProfilePhotoModal();
            this.setForceUpdateChildComponents(true);
            // error and success message handling is remaining
        }
    }

    //#region funs
    handleAddFriend = (authId) => {
        const { dispatch } = this.props;
        var requestObj = {
            friendId: authId
        }
        this.setState({ sendFriendRequestInit: true });
        dispatch(sendFriendRequestRequest(requestObj));
    }

    handleShowCancelFriendRequestModal = (friendshipId) => {
        this.setState({
            showCancelFriendRequestModal: true,
            selectFriendshipId: friendshipId
        });
    }

    handleCancelFriendRequest = () => {
        const { dispatch } = this.props;
        const { selectFriendshipId } = this.state;
        this.setState({
            cancelFriendRequestInit: true,
            cancelFriendRequestDisabled: true
        });
        dispatch(cancelFriendRequestRequest(selectFriendshipId));
    }

    handleHideCancelFriendRequestModal = () => {
        this.setState({
            showCancelFriendRequestModal: false,
            selectFriendshipId: null
        });
    }

    handleShowUnfriendRequestModal = (friendshipId) => {
        this.setState({
            showUnfriendRequestModal: true,
            selectFriendshipId: friendshipId
        });
    }

    handleUnfriendRequest = () => {
        const { dispatch } = this.props;
        const { selectFriendshipId } = this.state;
        this.setState({
            UnfriendRequestInit: true,
            UnfriendRequestDisabled: true
        });
        dispatch(cancelFriendRequestRequest(selectFriendshipId));
    }

    handleHideUnfriendRequestModal = () => {
        this.setState({
            showUnfriendRequestModal: false,
            selectFriendshipId: null
        });
    }

    setForceUpdateChildComponents = (flag) => {
        this.setState({ forceUpdateChildComponents: flag });
    }

    handleAcceptRequest = (friendshipId) => {
        const {
            dispatch
        } = this.props;
        this.setState({
            acceptFriendRequestReceivedInit: true,
            friendRequestReceivedDisabled: true,
            selectFriendshipId: friendshipId,
        });
        dispatch(acceptFriendRequestRequest(friendshipId));
    }

    handleShowRejectFriendRequestModal = (friendshipId) => {
        this.setState({
            showRejectFriendRequestModal: true,
            selectFriendshipId: friendshipId
        });
    }

    handleRejectFriendRequest = () => {
        const { dispatch } = this.props;
        const { selectFriendshipId } = this.state;
        this.setState({
            rejectFriendRequestInit: true,
            friendRequestReceivedDisabled: true
        });
        dispatch(cancelFriendRequestRequest(selectFriendshipId));
    }

    handleHideRejectFriendRequestModal = () => {
        this.setState({
            showRejectFriendRequestModal: false,
            selectFriendshipId: null
        });
    }

    showUpdateAboutMeModal = () => {
        this.setState({ showUpdateAboutMeModal: true });
    }

    handleHideUpdateAboutMeModal = () => {
        this.setState({ showUpdateAboutMeModal: false });
    }

    handleUpdateAboutMeSubmit = (data) => {
        const { dispatch } = this.props;
        var requestObj = {
            aboutMe: data.about_me,
            height: data.height,
            weight: data.weight,
        }
        this.setState({ updateAboutMeDetailsActionInit: true });
        dispatch(saveAboutProfileDetailsRequest(requestObj));
    }

    handleShowChangeProfilePhotoModal = () => {
        this.changeProfilePhotoRef.current.setState({ croppedImg: null, selectedImage: null });
        this.setState({ showChangeProfilePicModal: true });
    }

    handleHideChangeProfilePhotoModal = () => {
        this.changeProfilePhotoRef.current.setState({ croppedImg: null, selectedImage: null });
        this.setState({ showChangeProfilePicModal: false });
    }

    saveProfilePhoto = (data) => {
        const { dispatch } = this.props;
        var formData = new FormData();
        formData.append('user_img', data.croppedImg);
        dispatch(saveLoggedUserProfilePhotoRequest(formData));
        this.setState({ updateProfilePhotoActionInit: true });
    }

    handleRequestMessageChannel = () => {
        const { profile, loggedUserData, dispatch, socket } = this.props;
        var profileId = '';
        var userId = '';
        if (profile && profile.authUserId) {
            profileId = profile.authUserId;
        }
        if (loggedUserData && loggedUserData.userDetails && loggedUserData.userDetails.authUserId) {
            userId = loggedUserData.userDetails.authUserId;
        }
        if (profileId && userId) {
            dispatch(getUserChannelRequest());
            var requestData = {
                friendId: profileId,
                userId,
            };
            socket.emit('get_channel_id', requestData);
        }
    }

    formatAboutDetails = (profile) => {
        const { settings } = this.props;
        let heightUnit = MEASUREMENT_UNIT_CENTIMETER;
        let weightUnit = MEASUREMENT_UNIT_KILOGRAM;
        let height = 0;
        let weight = 0;
        if (settings) {
            heightUnit = (settings.bodyMeasurement) ? settings.bodyMeasurement : MEASUREMENT_UNIT_CENTIMETER;
            weightUnit = (settings.weight) ? settings.weight : MEASUREMENT_UNIT_KILOGRAM;
        }
        if (profile.height) {
            height = convertUnits(MEASUREMENT_UNIT_CENTIMETER, heightUnit, profile.height);
        }
        if (profile.weight) {
            weight = convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, profile.weight);
        }
        profile.heightUnit = heightUnit;
        profile.weightUnit = weightUnit;
        profile.height = height.toFixed(2);
        profile.weight = weight.toFixed(2);
        return profile;
    }
    //#endregion

}

const mapStateToProps = (state) => {
    const { profile, friends, user, userMessages } = state;
    return {
        profileLoading: profile.get('loading'),
        profile: profile.get('profile'),
        settings: profile.get('settings'),
        requestSendLoading: friends.get('requestSendLoading'),
        requestSendError: friends.get('requestSendError'),
        requestCancelLoading: friends.get('requestCancelLoading'),
        requestCancelError: friends.get('requestCancelError'),
        requestAcceptLoading: friends.get('requestAcceptLoading'),
        requestAcceptError: friends.get('requestAcceptError'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        requestChannelLoading: userMessages.get('requestChannelLoading'),
    }
}

export default connect(mapStateToProps)(Profile);