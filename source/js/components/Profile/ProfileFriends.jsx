import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getApprovedFriendsRequest,
    getPendingFriendsRequest
} from '../../actions/friends';
import ProfileFriendBlock from './ProfileFriendBlock';

class ProfileFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initApprovedFriendAction: false,
            initPendingFriendAction: false,
            approvedFriends: [],
            pendingFriends: [],
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        this.setState({
            initApprovedFriendAction: true,
            initPendingFriendAction: true,
        });
        dispatch(getApprovedFriendsRequest());
        dispatch(getPendingFriendsRequest());
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

    componentDidUpdate() {
        const {
            initApprovedFriendAction,
            initPendingFriendAction
        } = this.state;
        const {
            approvedLoading,
            approvedFriends,
            pendingLoading,
            pendingFriends,
        } = this.props;
        if (initApprovedFriendAction && !approvedLoading) {
            this.setState({
                initApprovedFriendAction: false,
                approvedFriends,
            });
        }
        if (initPendingFriendAction && !pendingLoading) {
            this.setState({
                initPendingFriendAction: false,
                pendingFriends,
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