import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileFithub from 'components/Profile/ProfileFithub';
import ProfileFriends from 'components/Profile/ProfileFriends';
import ProfilePhotos from 'components/Profile/ProfilePhotos';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { routeCodes } from 'constants/routes';
import { getProfileDetailsRequest, saveLoggedUserProfilePhotoRequest, getLoggedUserProfileSettingsRequest, showFollUserListRequest, setUserProfileState } from '../actions/profile';
import noProfileImg from 'img/common/no-profile-img.png'
import { FRIENDSHIP_STATUS_SELF, FRIENDSHIP_STATUS_UNKNOWN, FRIENDSHIP_STATUS_FRIEND, FRIENDSHIP_STATUS_REQUEST_RECEIVED, FRIENDSHIP_STATUS_REQUEST_SENT, LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY, MEASUREMENT_UNIT_CENTIMETER, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_GRAM, ACCESS_LEVEL_PUBLIC, ACCESS_LEVEL_FRIENDS } from '../constants/consts';
import { sendFriendRequestRequest, cancelFriendRequestRequest, acceptFriendRequestRequest } from '../actions/friends';
import { ts, te, convertUnits } from '../helpers/funs';
import ReactHtmlParser from 'react-html-parser';
import ChangeProfilePhotoModal from '../components/Profile/ChangeProfilePhotoModal';
import jwt from "jwt-simple";
import { setLoggedUserFromLocalStorage } from '../actions/user';
import { FaCircleONotch } from "react-icons/lib/fa";
import { getUserChannelRequest } from '../actions/userMessages';
import SweetAlert from "react-bootstrap-sweetalert";
import { getPrivacyOfTimelineUserRequest } from '../actions/userTimeline';
import { showPageLoader, hidePageLoader } from '../actions/pageLoader';
import Follower from "svg/follower.svg";
import Following from "svg/followers.svg";
import { startFollowingRequest, stopFollowingRequest } from '../actions/follows';
import ReactTooltip from "react-tooltip";
import unitize from "unitize";
import Lightbox from 'react-images';
import UsersListModal from '../components/Common/UsersListModal';
import ProfileCalendar from '../components/Profile/ProfileCalendar';

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
            showChangeProfilePicModal: false,
            updateProfilePhotoActionInit: false,
            updateLocalStorageData: false,
            showUnfollowModal: false,
            selectedFollowId: null,
            showProfilePicLightbox: false
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
            dispatch(getPrivacyOfTimelineUserRequest(username));
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
                nextProps.dispatch(getPrivacyOfTimelineUserRequest(newUsername));
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
            showChangeProfilePicModal,
            loadProfileActionInit,
            showUnfollowModal,
            showProfilePicLightbox
        } = this.state;
        const {
            requestChannelLoading,
            timelineUserPrivacy,
            startFollowingLoading,
            showFollModal,
            showFollModalFor,
            showFollModalUsers,
            showFollModalLoading
        } = this.props;
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
                        <div className="body-head profile-new-header d-flex">

                            <div className="profile-picture">
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
                                            <Lightbox images={[{ src: profile.avatar }]} isOpen={showProfilePicLightbox} onClose={() => this.setState({ showProfilePicLightbox: false })} />
                                            <div className="profile-overlay-wrap">
                                                <Fragment>
                                                    <a href="javascript:void(0)" className="view-img" onClick={() => this.setState({ showProfilePicLightbox: true })}>
                                                        <i className="icon-view_array"></i>
                                                    </a>
                                                    {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                                        <a href="javascript:void(0)" className="upload-img" onClick={this.handleShowChangeProfilePhotoModal}>
                                                            <i className="icon-add_a_photo"></i>
                                                        </a>
                                                    }
                                                </Fragment>
                                            </div>
                                        </span>
                                    }
                                    {/* <a href="" data-toggle="modal" data-target="#level-gallery">Level 13</a> */}
                                </div>
                            </div>

                            <div className="body-head-l">
                                <h2>
                                    {profile && (typeof profile.firstName !== 'undefined' && profile.firstName) && (profile.firstName)}
                                    {profile && (typeof profile.lastName !== 'undefined' && profile.lastName) && (' ' + profile.lastName)}
                                </h2>
                                <div className="user-meta-info">
                                    <div className="workout">
                                        <span>{unitize(profile.totalWorkouts).toString()}</span> workouts
                                    </div>
                                    <div className="followers">
                                        <a href="javascript:void(0)" onClick={() => this.showFollUserList("followers")} className="user-m-i-link"><span>{unitize(profile.totalFollowers).toString()}</span> followers</a>
                                    </div>
                                    <div className="following">
                                        <a href="javascript:void(0)" onClick={() => this.showFollUserList("followings")} className="user-m-i-link"><span>{unitize(profile.totalFollowings).toString()}</span> following</a>
                                    </div>
                                </div>
                                <div className="user-meta-text">
                                    {profile && profile.aboutMe !== '' &&
                                        ReactHtmlParser(profile.aboutMe)
                                    }
                                </div>

                            </div>
                            {profile && profile.friendshipStatus && profile.friendshipStatus !== '' && profile.friendshipStatus !== FRIENDSHIP_STATUS_SELF &&
                                <div className="body-head-r add-friend">
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && (!UnfriendRequestDisabled) &&
                                        <button
                                            className="bordered-circle default-bordered-circle"
                                            onClick={() => {
                                                this.handleShowUnfriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={UnfriendRequestDisabled}
                                            data-tip="Unfriend"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-remove_circle_outline"></i>
                                        </button>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_RECEIVED &&
                                        <button
                                            className="bordered-circle pink-bordered-circle"
                                            onClick={() => {
                                                this.handleAcceptRequest(profile.friendshipId)
                                            }}
                                            disabled={friendRequestReceivedDisabled}
                                            data-tip="Accept request"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-check_circle"></i>
                                        </button>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_RECEIVED &&
                                        <button
                                            className="bordered-circle default-bordered-circle"
                                            onClick={() => {
                                                this.handleShowRejectFriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={friendRequestReceivedDisabled}
                                            data-tip="Reject request"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-cancel"></i>
                                        </button>
                                    }
                                    {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_SENT &&
                                        <button
                                            className="bordered-circle default-bordered-circle"
                                            onClick={() => {
                                                this.handleShowCancelFriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={cancelFriendRequestDisabled}
                                            data-tip="Cancel request"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-cancel"></i>
                                        </button>
                                    }
                                    {
                                        timelineUserPrivacy &&
                                        typeof timelineUserPrivacy.friendRequestAccessibility !== 'undefined' &&
                                        timelineUserPrivacy.friendRequestAccessibility === parseInt(ACCESS_LEVEL_PUBLIC) &&
                                        profile.friendshipStatus === FRIENDSHIP_STATUS_UNKNOWN &&
                                        <button
                                            className="bordered-circle violet-bordered-circle"
                                            onClick={() => {
                                                this.setState({ sendFriendRequestDisabled: true });
                                                this.handleAddFriend(profile.authUserId)
                                            }}
                                            disabled={sendFriendRequestDisabled}
                                            data-tip="Friend request"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-person_add"></i>
                                        </button>
                                    }
                                    {!profile.followingStatus &&
                                        <button className="bordered-circle pink-bordered-circle" onClick={() => this.startFollowing(profile.authUserId)} disabled={startFollowingLoading} data-tip="Follow" data-for="profile-actions-tooltip">
                                            <Follower className="follower-icon" />
                                        </button>
                                    }
                                    {profile.followingStatus &&
                                        <button className="bordered-circle pink-bordered-circle" onClick={() => this.showUnfollowAlert(profile.followingId)} data-tip="Following" data-for="profile-actions-tooltip">
                                            <Following className="following-icon" />
                                        </button>
                                    }
                                    {
                                        timelineUserPrivacy &&
                                        typeof timelineUserPrivacy.messageAccessibility !== 'undefined' &&
                                        (
                                            (timelineUserPrivacy.messageAccessibility === parseInt(ACCESS_LEVEL_PUBLIC)) ||
                                            (profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && timelineUserPrivacy.messageAccessibility === parseInt(ACCESS_LEVEL_FRIENDS))
                                        ) &&
                                        <button
                                            className="bordered-circle cyan-bordered-circle"
                                            onClick={this.handleRequestMessageChannel}
                                            disabled={requestChannelLoading}
                                            data-tip="Send message"
                                            data-for="profile-actions-tooltip"
                                        >
                                            <i className="icon-mail_outline"></i>
                                        </button>
                                    }
                                    <ReactTooltip id="profile-actions-tooltip" place="left" type="light" effect="solid" />
                                </div>
                            }
                        </div>

                        <div className="body-head-l-btm profile-new-menu">
                            <NavLink activeClassName='pink-btn-new' exact to={`${routeCodes.PROFILE}/${username}`}>Fithub</NavLink>
                            <NavLink activeClassName='pink-btn-new' exact to={routeCodes.PROFILECALENDAR.replace('{username}', username)}>Calendar</NavLink>
                            <NavLink activeClassName='pink-btn-new' exact to={routeCodes.PROFILEPHOTOS.replace('{username}', username)}>Photos</NavLink>
                            <NavLink activeClassName='pink-btn-new' exact to={routeCodes.PROFILEFRIENDS.replace('{username}', username)}>Friends</NavLink>
                        </div>

                        <div className="fitness-stats">
                            <div className="body-content d-flex row justify-content-start profilephoto-content">

                                <div className="col-md-12">
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
                                        <Route
                                            exact
                                            path={routeCodes.PROFILECALENDAR.replace('{username}', username)}
                                            render={() => {
                                                return <ProfileCalendar
                                                    {...this.state}
                                                    setForceUpdateChildComponents={this.setForceUpdateChildComponents}
                                                />
                                            }}
                                        />
                                    </Switch>
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

                <SweetAlert
                    show={showUnfollowModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, Unfollow!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.stopFollowing}
                    onCancel={this.hideUnfollowAlert}
                >
                </SweetAlert>
                <ChangeProfilePhotoModal
                    ref={this.changeProfilePhotoRef}
                    show={showChangeProfilePicModal}
                    handleSubmit={this.saveProfilePhoto}
                    handleClose={this.handleHideChangeProfilePhotoModal}
                />
                <UsersListModal
                    show={showFollModal}
                    loading={showFollModalLoading}
                    title={showFollModalFor}
                    handleClose={this.hideFollUserList}
                    data={showFollModalUsers ? showFollModalUsers : []}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            profile,
            profileLoading,
            requestSendLoading,
            requestSendError,
            dispatch,
            requestCancelLoading,
            requestCancelError,
            requestAcceptLoading,
            requestAcceptError,
            error,
            settingsLoading,
            startFollowingLoading,
            startFollowingError,
            stopFollowingLoading,
            stopFollowingError,
        } = this.props;
        const {
            loadProfileActionInit,
            sendFriendRequestInit,
            username,
            cancelFriendRequestInit,
            UnfriendRequestInit,
            acceptFriendRequestReceivedInit,
            rejectFriendRequestInit,
            updateProfilePhotoActionInit,
            updateLocalStorageData,
        } = this.state;
        var stateProfile = this.state.profile;
        if (loadProfileActionInit && !profileLoading && (profile !== stateProfile) && !settingsLoading) {
            var newProfileState = this.formatAboutDetails(profile);
            this.setState({
                loadProfileActionInit: false,
                profile: newProfileState,
                sendFriendRequestDisabled: false,
                cancelFriendRequestDisabled: false,
                UnfriendRequestDisabled: false,
                friendRequestReceivedDisabled: false,
            });
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
                te('Something went wrong!');
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
                te('Something went wrong!');
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
                te('Something went wrong!');
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
                te('Something went wrong!');
            } else {
                ts('Friend request accepted!');
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
                te('Something went wrong!');
            } else {
                ts('Friend request canceled!');
            }
            this.setForceUpdateChildComponents(true);
        }
        if (updateProfilePhotoActionInit && !profileLoading) {
            this.setState({
                updateProfilePhotoActionInit: false,
                loadProfileActionInit: true,
                updateLocalStorageData: true,
            });
            if (error && error.length > 0) {
                te('Something went wrong!');
            } else {
                ts('Profile image updated!');
            }
            dispatch(hidePageLoader(username));
            dispatch(getProfileDetailsRequest(username));
            this.handleHideChangeProfilePhotoModal();
            this.setForceUpdateChildComponents(true);
        }
        if (!startFollowingLoading && prevProps.startFollowingLoading !== startFollowingLoading) {
            this.setState({ loadProfileActionInit: true });
            dispatch(getProfileDetailsRequest(username));
            if (startFollowingError && startFollowingError.length > 0) {
                te(startFollowingError[0]);
            }
        }
        if (!stopFollowingLoading && prevProps.stopFollowingLoading !== stopFollowingLoading) {
            this.setState({ loadProfileActionInit: true });
            dispatch(getProfileDetailsRequest(username));
            this.hideUnfollowAlert();
            if (stopFollowingError && stopFollowingError.length > 0) {
                te(stopFollowingError[0]);
            }
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
        var formData = {
            user_img: data.croppedImg,
        };
        dispatch(saveLoggedUserProfilePhotoRequest(formData));
        dispatch(showPageLoader());
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
        let height = '';
        let weight = '';
        if (settings) {
            heightUnit = (settings.bodyMeasurement) ? settings.bodyMeasurement : MEASUREMENT_UNIT_CENTIMETER;
            weightUnit = (settings.weight) ? settings.weight : MEASUREMENT_UNIT_KILOGRAM;
        }
        if (profile.height && profile.height > 0) {
            height = convertUnits(MEASUREMENT_UNIT_CENTIMETER, heightUnit, profile.height);
        }
        if (profile.weight && profile.weight > 0) {
            weight = convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, profile.weight);
        }
        profile.heightUnit = heightUnit;
        profile.weightUnit = weightUnit;
        profile.height = (height && height > 0) ? height.toFixed(2) : '';
        profile.weight = (weight && weight > 0) ? weight.toFixed(2) : '';
        return profile;
    }

    startFollowing = (followingId) => {
        const { dispatch } = this.props;
        let requestData = { followingId };
        dispatch(startFollowingRequest(requestData));
    }

    showUnfollowAlert = (_id) => {
        this.setState({ selectedFollowId: _id, showUnfollowModal: true });
    }

    hideUnfollowAlert = () => {
        this.setState({ selectedFollowId: null, showUnfollowModal: false });
    }

    stopFollowing = () => {
        const { dispatch } = this.props;
        const { selectedFollowId } = this.state;
        let requestData = { _id: selectedFollowId };
        dispatch(stopFollowingRequest(requestData));
    }

    showFollUserList = (_for) => {
        const { dispatch, match } = this.props;
        dispatch(showFollUserListRequest(_for, match.params.username));
    }

    hideFollUserList = (_for) => {
        const { dispatch } = this.props;
        const newState = {
            showFollModalLoading: false,
            showFollModal: false,
            showFollModalFor: null,
            showFollModalUsers: [],
            showFollModalError: [],
        };
        dispatch(setUserProfileState(newState));
    }
    //#endregion

}

const mapStateToProps = (state) => {
    const { profile, friends, user, userMessages, userTimeline, follows } = state;
    return {
        profileLoading: profile.get('loading'),
        profile: profile.get('profile'),
        error: profile.get('error'),
        settingsLoading: profile.get('settingsLoading'),
        settings: profile.get('settings'),
        settingsError: profile.get('settingsError'),
        requestSendLoading: friends.get('requestSendLoading'),
        requestSendError: friends.get('requestSendError'),
        requestCancelLoading: friends.get('requestCancelLoading'),
        requestCancelError: friends.get('requestCancelError'),
        requestAcceptLoading: friends.get('requestAcceptLoading'),
        requestAcceptError: friends.get('requestAcceptError'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
        requestChannelLoading: userMessages.get('requestChannelLoading'),
        timelineUserPrivacy: userTimeline.get('privacy'),
        startFollowingLoading: follows.get('startFollowingLoading'),
        startFollowingStatus: follows.get('startFollowingStatus'),
        startFollowingError: follows.get('startFollowingError'),
        stopFollowingLoading: follows.get('stopFollowingLoading'),
        stopFollowingStatus: follows.get('stopFollowingStatus'),
        stopFollowingError: follows.get('stopFollowingError'),

        showFollModalLoading: profile.get('showFollModalLoading'),
        showFollModal: profile.get('showFollModal'),
        showFollModalFor: profile.get('showFollModalFor'),
        showFollModalUsers: profile.get('showFollModalUsers'),
        showFollModalError: profile.get('showFollModalError')
    }
}

export default connect(mapStateToProps)(Profile);