import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getApprovedFriendsRequest,
    getPendingFriendsRequest
} from '../../actions/friends';
import ProfileFriendBlock from './ProfileFriendBlock';
import { SET_LOGGED_USER_FROM_LOCALSTORAGE } from '../../actions/user';
import _ from "lodash";

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
        }
    }

    componentWillMount() {
        const {
            profile,
            dispatch,
        } = this.props;
        if (profile && Object.keys(profile).length > 0) {
            var username = profile.username;
            this.setState({
                initApprovedFriendAction: true,
                initPendingFriendAction: true,
            });
            dispatch(getApprovedFriendsRequest(username));
            dispatch(getPendingFriendsRequest(username));
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
            pendingFriends
        } = this.state;
        return (
            <div className="profile-friends-wrapper">
                {pendingFriends && pendingFriends.length > 0 &&
                    <div className="white-box space-btm-20">
                        <div className="whitebox-head d-flex">
                            <h3 className="title-h3">Pending Friends Request</h3>
                        </div>
                        <div className="whitebox-body profile-body">
                            <div className="row d-flex">
                                {pendingFriends.map((friend, index) => (
                                    <div className="col-md-6" key={index}>
                                        <ProfileFriendBlock friend={friend} />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                }

                <div className="white-box space-btm-20">
                    <div className="whitebox-head d-flex">
                        <h3 className="title-h3">Your Friends</h3>
                    </div>
                    <div className="whitebox-body profile-body">
                        <div className="row d-flex">
                            {approvedFriends && approvedFriends.length > 0 &&
                                approvedFriends.map((friend, index) => (
                                    <div className="col-md-6" key={index}>
                                        <ProfileFriendBlock friend={friend} />
                                    </div>
                                ))
                            }
                            {approvedFriends && approvedFriends.length <= 0 &&
                                <span>No friends...</span>
                            }
                        </div>
                    </div>
                </div>
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
            this.setState({
                initApprovedFriendAction: true,
                initPendingFriendAction: true,
            });
            dispatch(getApprovedFriendsRequest(username));
            dispatch(getPendingFriendsRequest(username));
        }
    }

    componentDidUpdate() {
        const {
            initApprovedFriendAction,
            initPendingFriendAction,
        } = this.state;
        const {
            approvedLoading,
            approvedFriends,
            pendingLoading,
            pendingFriends,
        } = this.props;
        const approvedFriendsState = this.state.approvedFriends;
        const pendingFriendsState = this.state.pendingFriends;
        if (initApprovedFriendAction && !approvedLoading && (approvedFriendsState !== approvedFriends)) {
            this.setState({
                initApprovedFriendAction: false,
                approvedFriends,
                doLoadApprovedFriends: false,
            });
        }
        if (initPendingFriendAction && !pendingLoading && (pendingFriendsState !== pendingFriends)) {
            this.setState({
                initPendingFriendAction: false,
                pendingFriends,
                doLoadPendingFriends: false
            });
        }
    }

}

const mapStateToProps = (state) => {
    const { friends } = state;
    return {
        approvedLoading: friends.get('approvedLoading'),
        pendingLoading: friends.get('pendingLoading'),
        approvedFriends: friends.get('approvedFriends'),
        pendingFriends: friends.get('pendingFriends'),
    }
}

export default connect(mapStateToProps)(ProfileFriends)