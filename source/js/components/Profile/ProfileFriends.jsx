import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getApprovedFriendsRequest,
    getPendingFriendsRequest,
    acceptFriendRequestRequest,
    cancelFriendRequestRequest
} from '../../actions/friends';
import ProfileFriendBlock from './ProfileFriendBlock';
import { SET_LOGGED_USER_FROM_LOCALSTORAGE } from '../../actions/user';
import _ from "lodash";
import { FRIENDSHIP_STATUS_SELF } from '../../constants/consts';
import ProfilePendingFriendBlock from './ProfilePendingFriendBlock';
import CancelFriendRequestModal from './CancelFriendRequestModal';
import { ts } from '../../helpers/funs';
import UnfriendRequestModal from './UnfriendRequestModal';
import { getUserChannelRequest } from '../../actions/userMessages';
import SweetAlert from "react-bootstrap-sweetalert";

class ProfileFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doLoadApprovedFriends: false,
            doLoadPendingFriends: false,
            initApprovedFriendAction: false,
            initPendingFriendAction: false,
            approvedFriends: [],
            pendingFriends: [],
            acceptFriendRequestInit: false,
            rejectFriendRequestInit: false,
            pendingFriendsActionDisabled: {},
            showPendingFriendsRejectRequestModal: false,
            selectedFriendshipId: null,
            showUnfriendModal: false,
            unfriendRequestInit: false,
            friendsActionDisabled: {},
        }
    }

    componentWillMount() {
        const {
            profile,
            dispatch,
        } = this.props;
        if (profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({ initApprovedFriendAction: true });
            dispatch(getApprovedFriendsRequest(username));
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                dispatch(getPendingFriendsRequest(username));
            }
        } else {
            this.setState({
                doLoadApprovedFriends: true,
                doLoadPendingFriends: true,
            });
        }
    }

    render() {
        const {
            approvedFriends,
            pendingFriends,
            pendingFriendsActionDisabled,
            showPendingFriendsRejectRequestModal,
            showUnfriendModal,
            friendsActionDisabled,
        } = this.state;
        const {
            profile,
            loggedUserData
        } = this.props;
        return (
            <div className="profile-friends-wrapper">
                {profile && profile.friendshipStatus && (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) && pendingFriends && pendingFriends.length > 0 &&
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Pending Friends Request</h3>
                        </div>
                        <div className="whitebox-body profile-body">
                            <div className="row d-flex">
                                {pendingFriends.map((friend, index) => (
                                    <div className="col-md-6" key={index}>
                                        <ProfilePendingFriendBlock
                                            friend={friend}
                                            handleAcceptFriendRequest={this.handleAcceptFriendRequest}
                                            pendingFriendsActionDisabled={
                                                (pendingFriendsActionDisabled[friend.friendshipId])
                                                    ? pendingFriendsActionDisabled[friend.friendshipId]
                                                    : false
                                            }
                                            handleShowRejectFriendRequest={this.handleShowRejectFriendRequest}
                                            handleRequestMessageChannel={this.handleRequestMessageChannel}
                                        />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                }

                <div className="white-box space-btm-20">
                    <div className="whitebox-head d-flex">
                        <h3 className="title-h3">
                            {`${(profile && profile.firstName) ? `${profile.firstName}'s friends` : 'Friends'}`}
                        </h3>
                    </div>
                    <div className="whitebox-body profile-body">
                        <div className="row d-flex">
                            {approvedFriends && approvedFriends.length > 0 &&
                                approvedFriends.map((friend, index) => (
                                    <div className="col-md-6" key={index}>
                                        <ProfileFriendBlock
                                            friend={friend}
                                            friendsActionDisabled={
                                                (friendsActionDisabled[friend.friendshipId])
                                                    ? friendsActionDisabled[friend.friendshipId]
                                                    : false
                                            }
                                            handleShowUnfriendRequest={this.handleShowUnfriendRequest}
                                            friendshipStatus={profile.friendshipStatus}
                                            handleRequestMessageChannel={this.handleRequestMessageChannel}
                                            loggedUserData={loggedUserData}
                                        />
                                    </div>
                                ))
                            }
                            {approvedFriends && approvedFriends.length <= 0 &&
                                <span>No friends...</span>
                            }
                        </div>
                    </div>
                </div>
                <CancelFriendRequestModal
                    show={showPendingFriendsRejectRequestModal}
                    handleYes={this.handleRejectFriendRequest}
                    handleClose={this.handleHideRejectFriendRequest}
                />
                <SweetAlert
                    show={showUnfriendModal}
                    danger
                    showCancel
                    confirmBtnText="Yes, unfriend us!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.handleUnfriendRequest}
                    onCancel={this.handleHideUnfriendRequest}
                >
                    You will not be able to recover it!
                </SweetAlert>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const {
            profile,
            dispatch,
        } = nextProps;
        const {
            doLoadApprovedFriends,
            doLoadPendingFriends,
        } = this.state;
        if ((doLoadApprovedFriends || doLoadPendingFriends) && profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({ initApprovedFriendAction: true });
            dispatch(getApprovedFriendsRequest(username));
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                dispatch(getPendingFriendsRequest(username));
            } else {
                this.setState({ doLoadPendingFriends: false });
            }
        }
    }

    componentDidUpdate() {
        const {
            initApprovedFriendAction,
            initPendingFriendAction,
            acceptFriendRequestInit,
            rejectFriendRequestInit,
            unfriendRequestInit,
        } = this.state;
        const {
            approvedLoading,
            approvedFriends,
            pendingLoading,
            pendingFriends,
            requestAcceptLoading,
            requestCancelLoading,
            dispatch,
            profile,
            forceUpdateChildComponents,
            setForceUpdateChildComponents,
        } = this.props;
        const approvedFriendsState = this.state.approvedFriends;
        const pendingFriendsState = this.state.pendingFriends;
        if (initApprovedFriendAction && !approvedLoading && (approvedFriendsState !== approvedFriends)) {
            this.setState({
                initApprovedFriendAction: false,
                approvedFriends,
                doLoadApprovedFriends: false,
                pendingFriendsActionDisabled: {},
            });
        }
        if (initPendingFriendAction && !pendingLoading && (pendingFriendsState !== pendingFriends)) {
            this.setState({
                initPendingFriendAction: false,
                pendingFriends,
                doLoadPendingFriends: false,
                pendingFriendsActionDisabled: {},
            });
        }
        if (acceptFriendRequestInit && !requestAcceptLoading) {
            this.setState({
                acceptFriendRequestInit: false,
                initApprovedFriendAction: true,
                initPendingFriendAction: true
            });
            var username = profile.username;
            dispatch(getApprovedFriendsRequest(username));
            dispatch(getPendingFriendsRequest(username));
            ts('Friend request accepted!')
        }
        if (rejectFriendRequestInit && !requestCancelLoading) {
            this.setState({
                rejectFriendRequestInit: false,
                initApprovedFriendAction: true,
                initPendingFriendAction: true
            });
            this.handleHideRejectFriendRequest();
            var username = profile.username;
            dispatch(getApprovedFriendsRequest(username));
            dispatch(getPendingFriendsRequest(username));
            ts('Friend request rejected!')
        }
        if (unfriendRequestInit && !requestCancelLoading) {
            this.setState({
                unfriendRequestInit: false,
                initApprovedFriendAction: true,
                initPendingFriendAction: true
            });
            this.handleHideUnfriendRequest();
            var username = profile.username;
            dispatch(getApprovedFriendsRequest(username));
            dispatch(getPendingFriendsRequest(username));
            ts('You are now no friends any more!');
        }
        if (forceUpdateChildComponents) {
            var username = profile.username;
            this.setState({ initApprovedFriendAction: true });
            dispatch(getApprovedFriendsRequest(username));
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                dispatch(getPendingFriendsRequest(username));
            }
            setForceUpdateChildComponents(false);
        }
    }

    //#region funs
    handleAcceptFriendRequest = (friendshipId) => {
        const {
            dispatch
        } = this.props;
        var actionDisabledObj = {
            [friendshipId]: true
        }
        this.setState({
            acceptFriendRequestInit: true,
            pendingFriendsActionDisabled: actionDisabledObj,
        });
        dispatch(acceptFriendRequestRequest(friendshipId));
    }

    handleShowRejectFriendRequest = (friendshipId) => {
        this.setState({
            showPendingFriendsRejectRequestModal: true,
            selectedFriendshipId: friendshipId,
        });
    }

    handleRejectFriendRequest = () => {
        const {
            dispatch
        } = this.props;
        const {
            selectedFriendshipId
        } = this.state;
        var actionDisabledObj = {
            [selectedFriendshipId]: true
        }
        this.setState({
            rejectFriendRequestInit: true,
            pendingFriendsActionDisabled: actionDisabledObj,
        });
        dispatch(cancelFriendRequestRequest(selectedFriendshipId));
    }

    handleHideRejectFriendRequest = () => {
        this.setState({
            showPendingFriendsRejectRequestModal: false,
            selectedFriendshipId: null,
        });
    }

    handleShowUnfriendRequest = (friendshipId) => {
        this.setState({
            showUnfriendModal: true,
            selectedFriendshipId: friendshipId,
        });
    }

    handleUnfriendRequest = () => {
        const {
            dispatch
        } = this.props;
        const {
            selectedFriendshipId
        } = this.state;
        var actionDisabledObj = {
            [selectedFriendshipId]: true
        }
        this.setState({
            unfriendRequestInit: true,
            friendsActionDisabled: actionDisabledObj,
        });
        dispatch(cancelFriendRequestRequest(selectedFriendshipId));
    }

    handleHideUnfriendRequest = () => {
        this.setState({
            showUnfriendModal: false,
            selectedFriendshipId: null,
        });
    }

    handleRequestMessageChannel = (profile) => {
        const { loggedUserData, dispatch, socket } = this.props;
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
    //#endregion
}

const mapStateToProps = (state) => {
    const { friends, user } = state;
    return {
        approvedLoading: friends.get('approvedLoading'),
        pendingLoading: friends.get('pendingLoading'),
        approvedFriends: friends.get('approvedFriends'),
        pendingFriends: friends.get('pendingFriends'),
        requestAcceptLoading: friends.get('requestAcceptLoading'),
        requestAcceptError: friends.get('requestAcceptError'),
        requestCancelLoading: friends.get('requestCancelLoading'),
        requestCancelError: friends.get('requestCancelError'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
    }
}

export default connect(mapStateToProps)(ProfileFriends)