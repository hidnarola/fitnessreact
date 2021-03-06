import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getApprovedFriendsRequest,
    getPendingFriendsRequest,
    acceptFriendRequestRequest,
    cancelFriendRequestRequest,
    loadMoreApprovedFriendsRequest,
    loadMorePendingFriendsRequest,
    setUserFriendRequestData
} from '../../actions/friends';
import ProfileFriendBlock from './ProfileFriendBlock';
import { FRIENDSHIP_STATUS_SELF } from '../../constants/consts';
import ProfilePendingFriendBlock from './ProfilePendingFriendBlock';
import CancelFriendRequestModal from './CancelFriendRequestModal';
import { tw, ts, isOnline, connectIDB } from '../../helpers/funs';
import { getUserChannelRequest } from '../../actions/userMessages';
import SweetAlert from "react-bootstrap-sweetalert";
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import NoRecordFound from '../Common/NoRecordFound';
import { IDB_TBL_PROFILE, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

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
            loggedUserData,
            approvedLoading,
            approvedError,
            approvedLoadMoreLoading,
            pendingLoadMoreLoading,
            approvedNoMoreData,
            pendingNoMoreData,
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
                                {
                                    pendingFriends.map((friend, index) => (
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
                                {!pendingLoadMoreLoading && !pendingNoMoreData &&
                                    <button type="button" className="fithub-friends-load-more-btn" onClick={this.handleLoadMorePendingFriends}>
                                        <span>Load More</span>
                                    </button>
                                }
                                {pendingLoadMoreLoading &&
                                    <button type="button" className="fithub-friends-load-more-btn" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon mr-5" />
                                        <span>Loading...</span>
                                    </button>
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
                        {approvedLoading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!approvedLoading && (!approvedFriends || approvedFriends.length <= 0) && approvedError && approvedError.length <= 0 &&
                            <NoRecordFound />
                        }
                        {!approvedLoading && (!approvedFriends || approvedFriends.length <= 0) && approvedError && approvedError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                        {!approvedLoading && approvedFriends && approvedFriends.length > 0 &&
                            <div className="row d-flex">
                                {
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
                                {!approvedLoadMoreLoading && !approvedNoMoreData &&
                                    <button type="button" className="fithub-friends-load-more-btn" onClick={this.handleLoadMoreApprovedFriends}>
                                        <span>Load More</span>
                                    </button>
                                }
                                {approvedLoadMoreLoading &&
                                    <button type="button" className="fithub-friends-load-more-btn" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon mr-5" />
                                        <span>Loading...</span>
                                    </button>
                                }
                            </div>
                        }
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

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });

        const { profile, dispatch } = this.props;
        if (profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({ initApprovedFriendAction: true });
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username, 0, 12));
            }
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                if (isOnline()) {
                    dispatch(getPendingFriendsRequest(username, 0, 12));
                }
            }
        } else {
            this.setState({ doLoadApprovedFriends: true, doLoadPendingFriends: true });
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            // get data from IDB
            // this.getDataFromIDB()
            this.getApprovedFriendFromDb();
            this.getPendingFriendFromDb();
        }
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
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username));
            }
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                if (isOnline()) {
                    dispatch(getPendingFriendsRequest(username));
                }
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
            if (isOnline()) {
                this.setApprovedFriendDataInIdb();
            }
        }
        if (initPendingFriendAction && !pendingLoading && (pendingFriendsState !== pendingFriends)) {
            this.setState({
                initPendingFriendAction: false,
                pendingFriends,
                doLoadPendingFriends: false,
                pendingFriendsActionDisabled: {},
            });
            if (isOnline()) {
                this.setPendingFriendDataInIdb();
            }
        }
        if (acceptFriendRequestInit && !requestAcceptLoading) {
            this.setState({
                acceptFriendRequestInit: false,
                initApprovedFriendAction: true,
                initPendingFriendAction: true
            });
            var username = profile.username;
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username));
                dispatch(getPendingFriendsRequest(username));
            }
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
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username));
                dispatch(getPendingFriendsRequest(username));
            }
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
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username));
                dispatch(getPendingFriendsRequest(username));
            }
            ts('You are now no friends any more!');
        }
        if (forceUpdateChildComponents) {
            var username = profile.username;
            this.setState({ initApprovedFriendAction: true });
            if (isOnline()) {
                dispatch(getApprovedFriendsRequest(username));
            }
            if (profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) {
                this.setState({ initPendingFriendAction: true });
                if (isOnline()) {
                    dispatch(getPendingFriendsRequest(username));
                }
            }
            setForceUpdateChildComponents(false);
        }
    }

    setApprovedFriendDataInIdb = () => {

        const { approvedFriends } = this.props;
        try {
            const idbData = { type: 'approvedFriends', data: JSON.stringify(approvedFriends) };
            const transaction = this.iDB.transaction([IDB_TBL_PROFILE], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROFILE);
            const iDBGetReq = objectStore.get('approvedFriends');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
        }
    }

    setPendingFriendDataInIdb = () => {

        const { pendingFriends } = this.props;
        try {
            const idbData = { type: 'pendingFriends', data: JSON.stringify(pendingFriends) };
            const transaction = this.iDB.transaction([IDB_TBL_PROFILE], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROFILE);
            const iDBGetReq = objectStore.get('pendingFriends');
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) {
            console.log("error pendingFriends => ", error);
        }
    }

    getApprovedFriendFromDb = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_PROFILE];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osFriend = transaction.objectStore(IDB_TBL_PROFILE);
                const iDBGetReq = osFriend.get('approvedFriends');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { approvedFriends: resultObj }
                        dispatch(setUserFriendRequestData(data));
                    } else {
                        const data = { approvedFriends: [] }
                        dispatch(setUserFriendRequestData(data));
                    }
                }
            }
        } catch (error) {
            const data = { approvedFriends: [] }
            dispatch(setUserFriendRequestData(data));
        }

    }

    getPendingFriendFromDb = () => {
        const { dispatch } = this.props;
        const idbTbls = [IDB_TBL_PROFILE];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osFriend = transaction.objectStore(IDB_TBL_PROFILE);
                const iDBGetReq = osFriend.get('pendingFriends');
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        const resultObj = JSON.parse(result.data);
                        const data = { pendingFriends: resultObj }
                        dispatch(setUserFriendRequestData(data));
                    } else {
                        const data = { pendingFriends: [] }
                        dispatch(setUserFriendRequestData(data));
                    }
                }
            }
        } catch (error) {
            const data = { pendingFriends: [] }
            dispatch(setUserFriendRequestData(data));
        }

    }

    //#region funs
    handleAcceptFriendRequest = (friendshipId) => {
        if (isOnline()) {
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
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleShowRejectFriendRequest = (friendshipId) => {
        if (isOnline()) {
            this.setState({
                showPendingFriendsRejectRequestModal: true,
                selectedFriendshipId: friendshipId,
            });
        } else {
            tw("You are offline, please check your internet connection");
        }
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
        if (isOnline()) {
            dispatch(cancelFriendRequestRequest(selectedFriendshipId));
        }
    }

    handleHideRejectFriendRequest = () => {
        this.setState({
            showPendingFriendsRejectRequestModal: false,
            selectedFriendshipId: null,
        });
    }

    handleShowUnfriendRequest = (friendshipId) => {
        if (isOnline()) {
            this.setState({
                showUnfriendModal: true,
                selectedFriendshipId: friendshipId,
            });
        } else {
            tw("You are offline, please check your internet connection");
        }
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
        if (isOnline()) {
            dispatch(cancelFriendRequestRequest(selectedFriendshipId));
        }
    }

    handleHideUnfriendRequest = () => {
        this.setState({
            showUnfriendModal: false,
            selectedFriendshipId: null,
        });
    }

    handleRequestMessageChannel = (profile) => {
        if (isOnline()) {
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
                if (isOnline()) {
                    dispatch(getUserChannelRequest());
                }
                var requestData = {
                    friendId: profileId,
                    userId,
                };
                socket.emit('get_channel_id', requestData);
            }
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    handleLoadMoreApprovedFriends = () => {
        const { dispatch, profile, approvedSkip, approvedLimit } = this.props;
        let username = profile.username;
        this.setState({ initApprovedFriendAction: true });
        let newSkip = (parseInt(approvedSkip) + parseInt(approvedLimit));
        if (isOnline()) {
            dispatch(loadMoreApprovedFriendsRequest(username, newSkip, approvedLimit));
        }
    }

    handleLoadMorePendingFriends = () => {
        const { dispatch, profile, pendingSkip, pendingLimit } = this.props;
        let username = profile.username;
        this.setState({ initPendingFriendAction: true });
        let newSkip = (parseInt(pendingSkip) + parseInt(pendingLimit));
        if (isOnline()) {
            dispatch(loadMorePendingFriendsRequest(username, newSkip, pendingLimit));
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
        approvedError: friends.get('approvedError'),
        pendingError: friends.get('pendingError'),
        approvedSkip: friends.get('approvedSkip'),
        pendingSkip: friends.get('pendingSkip'),
        approvedLimit: friends.get('approvedLimit'),
        pendingLimit: friends.get('pendingLimit'),
        approvedLoadMoreLoading: friends.get('approvedLoadMoreLoading'),
        pendingLoadMoreLoading: friends.get('pendingLoadMoreLoading'),
        approvedNoMoreData: friends.get('approvedNoMoreData'),
        pendingNoMoreData: friends.get('pendingNoMoreData'),
        requestAcceptLoading: friends.get('requestAcceptLoading'),
        requestAcceptError: friends.get('requestAcceptError'),
        requestCancelLoading: friends.get('requestCancelLoading'),
        requestCancelError: friends.get('requestCancelError'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
    }
}

export default connect(mapStateToProps)(ProfileFriends)