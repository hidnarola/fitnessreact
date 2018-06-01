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
import { getProfileDetailsRequest, saveAboutProfileDetailsRequest } from '../actions/profile';
import noProfileImg from 'img/common/no-profile-img.png'
import { FRIENDSHIP_STATUS_SELF, FRIENDSHIP_STATUS_UNKNOWN, FRIENDSHIP_STATUS_FRIEND, FRIENDSHIP_STATUS_REQUEST_RECEIVED, FRIENDSHIP_STATUS_REQUEST_SENT } from '../constants/consts';
import { sendFriendRequestRequest, cancelFriendRequestRequest, acceptFriendRequestRequest } from '../actions/friends';
import { ts, te } from '../helpers/funs';
import CancelFriendRequestModal from '../components/Profile/CancelFriendRequestModal';
import UnfriendRequestModal from '../components/Profile/UnfriendRequestModal';
import UpdateAboutMeModal from '../components/Profile/UpdateAboutMeModal';
import ReactHtmlParser from 'react-html-parser';

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
        }
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
        } = this.state;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
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
                                    <a
                                        href="javascript:void(0)"
                                        className="green-blue-btn active"
                                        onClick={() => {
                                            this.handleShowUnfriendRequestModal(profile.friendshipId)
                                        }}
                                        disabled={UnfriendRequestDisabled}
                                    >
                                        Unfriend<i className="icon-check"></i>
                                    </a>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND && (UnfriendRequestDisabled) &&
                                    <span>Please wait to unfriend...</span>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_RECEIVED && (!friendRequestReceivedDisabled) &&
                                    <div>
                                        <a
                                            href="javascript:void(0)"
                                            className="green-blue-btn active"
                                            onClick={() => {
                                                this.handleAcceptRequest(profile.friendshipId)
                                            }}
                                            disabled={friendRequestReceivedDisabled}
                                        >
                                            Accept <i className="icon-check"></i>
                                        </a>
                                        <a
                                            href="javascript:void(0)"
                                            className="green-blue-btn active"
                                            onClick={() => {
                                                this.handleShowRejectFriendRequestModal(profile.friendshipId)
                                            }}
                                            disabled={friendRequestReceivedDisabled}
                                        >
                                            Reject <i className="icon-check"></i>
                                        </a>
                                    </div>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_RECEIVED && (friendRequestReceivedDisabled) &&
                                    <span>Please wait...</span>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_SENT && (!cancelFriendRequestDisabled) &&
                                    <a
                                        href="javascript:void(0)"
                                        className="green-blue-btn active"
                                        onClick={() => {
                                            this.handleShowCancelFriendRequestModal(profile.friendshipId)
                                        }}
                                        disabled={cancelFriendRequestDisabled}
                                    >
                                        Cancel Request <i className="icon-check"></i>
                                    </a>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_SENT && (cancelFriendRequestDisabled) &&
                                    <span>Friend request canceling...</span>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_UNKNOWN && (!sendFriendRequestDisabled) &&
                                    <a
                                        href="javascript:void(0)"
                                        className="add-friend-btn active"
                                        onClick={() => {
                                            this.setState({ sendFriendRequestDisabled: true });
                                            this.handleAddFriend(profile.authUserId)
                                        }}
                                        disabled={sendFriendRequestDisabled}
                                    >
                                        Add Friend <i className="icon-person_add"></i>
                                    </a>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_UNKNOWN && (sendFriendRequestDisabled) &&
                                    <span>Friend request sending...</span>
                                }
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
                                                <a href="">
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
                                            <a href="" className="purple-btn">
                                                Height:{profile.height} cm
                                            </a>
                                        }
                                        {profile && profile.height <= 0 &&
                                            <a href="" className="purple-btn">
                                                Please add your height
                                            </a>
                                        }
                                        {profile && profile.weight > 0 &&
                                            <a href="" className="green-blue-btn">
                                                Weight:{profile.weight} kg
                                            </a>
                                        }
                                        {profile && profile.weight <= 0 &&
                                            <a href="" className="green-blue-btn">
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
                <CancelFriendRequestModal
                    show={showCancelFriendRequestModal}
                    handleYes={this.handleCancelFriendRequest}
                    handleClose={this.handleHideCancelFriendRequestModal}
                />
                <CancelFriendRequestModal
                    show={showRejectFriendRequestModal}
                    handleYes={this.handleRejectFriendRequest}
                    handleClose={this.handleHideRejectFriendRequestModal}
                />
                <UnfriendRequestModal
                    show={showUnfriendRequestModal}
                    handleYes={this.handleUnfriendRequest}
                    handleClose={this.handleHideUnfriendRequestModal}
                />
                <UpdateAboutMeModal
                    show={showUpdateAboutMeModal}
                    onSubmit={this.handleUpdateAboutMeSubmit}
                    handleClose={this.handleHideUpdateAboutMeModal}
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
        } = this.state;
        var stateProfile = this.state.profile;
        if (loadProfileActionInit && !profileLoading && (profile !== stateProfile)) {
            this.setState({
                loadProfileActionInit: false,
                profile,
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
    //#endregion

}

const mapStateToProps = (state) => {
    const { profile, friends } = state;
    return {
        profileLoading: profile.get('loading'),
        profile: profile.get('profile'),
        requestSendLoading: friends.get('requestSendLoading'),
        requestSendError: friends.get('requestSendError'),
        requestCancelLoading: friends.get('requestCancelLoading'),
        requestCancelError: friends.get('requestCancelError'),
        requestAcceptLoading: friends.get('requestAcceptLoading'),
        requestAcceptError: friends.get('requestAcceptError'),
    }
}

export default connect(mapStateToProps)(Profile);