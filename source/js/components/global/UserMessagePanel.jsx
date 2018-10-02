import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSideMenu, getToken } from '../../helpers/funs';
import noProfileImg from 'img/common/no-profile-img.png'
import cns from "classnames";
import { openUserChatWindowRequest, loadMoreUserMessageChannelRequest } from '../../actions/userMessages';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { Scrollbars } from 'react-custom-scrollbars';
import { loadMoreApprovedFriendsMessengerRequest } from '../../actions/friends';
import NoRecordFound from '../Common/NoRecordFound';

class UserMessagePanel extends Component {
    render() {
        const {
            panelChannelLoading,
            panelChannels,
            panelChannelError,
            loggedUserData,
            panelChannelDataOver,
            panelChannelLoadMoreLoading,

            approvedMessLoading,
            approvedMessFriends,
            approvedMessError,
            approvedMessLoadMoreLoading,
            approvedMessNoMoreData
        } = this.props;
        return (
            <div id="user-message-panel" className="messenger-wrap">
                <div className="messenger-bg"></div>
                <div className="messenger">
                    <div className="messenger-head">
                        <h3><i className="icon-mail_outline"></i> <small>Messenger</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-message-panel', false)}><i className="icon-close"></i></a>
                    </div>
                    <h3 className="h3_msg_box">Chats</h3>
                    <div className="messenger-body" id="messenger-box">
                        {panelChannelLoading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-25" />
                            </div>
                        }
                        {!panelChannelLoading && panelChannels && panelChannels.length > 0 &&
                            <Scrollbars autoHide>
                                {
                                    <div className="messenger-scroll-wrapper">
                                        {
                                            panelChannels.map((channel, index) => {
                                                return (
                                                    <ChannelMessageCard
                                                        key={index}
                                                        channel={channel}
                                                        loggedUserData={loggedUserData}
                                                        handleMessageSeen={this.handleMessageSeen}
                                                        handleOpenChatWindow={this.handleOpenChatWindow}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {!panelChannelLoadMoreLoading && !panelChannelDataOver &&
                                    <button type="button" className="btn-messages-loadmore" onClick={this.handleLoadMore}>
                                        <span>Load more</span>
                                    </button>
                                }
                                {panelChannelLoadMoreLoading &&
                                    <button type="button" className="btn-messages-loadmore" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon" />
                                        <span>Loading...</span>
                                    </button>
                                }
                            </Scrollbars>
                        }

                        {!panelChannelLoading && (typeof panelChannels === 'undefined' || !panelChannels || panelChannels.length <= 0) && typeof panelChannelError !== 'undefined' && panelChannelError && panelChannelError.length <= 0 &&
                            <NoRecordFound />
                        }

                        {!panelChannelLoading && typeof panelChannelError !== 'undefined' && panelChannelError && panelChannelError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                    </div>
                    <h3 className="h3_msg_box">Friends</h3>
                    <div className="messenger-body" id="friends-messenger-box">
                        {approvedMessLoading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-25" />
                            </div>
                        }
                        {!approvedMessLoading && approvedMessFriends && approvedMessFriends.length > 0 &&
                            <Scrollbars autoHide>
                                {
                                    <div className="messenger-scroll-wrapper">
                                        {
                                            approvedMessFriends.map((friend, index) => {
                                                return (
                                                    <UsersFriendCard
                                                        key={index}
                                                        friend={friend}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {!approvedMessLoadMoreLoading && !approvedMessNoMoreData &&
                                    <button type="button" className="btn-messages-loadmore" onClick={this.handleUsersLoadMore}>
                                        <span>Load more</span>
                                    </button>
                                }
                                {approvedMessLoadMoreLoading &&
                                    <button type="button" className="btn-messages-loadmore" disabled={true}>
                                        <FaCircleONotch className="loader-spinner loader-spinner-icon" />
                                        <span>Loading...</span>
                                    </button>
                                }
                            </Scrollbars>
                        }

                        {!approvedMessLoading && (typeof approvedMessFriends === 'undefined' || !approvedMessFriends || approvedMessFriends.length <= 0) && typeof approvedMessError !== 'undefined' && approvedMessError && approvedMessError.length <= 0 &&
                            <NoRecordFound />
                        }

                        {!approvedMessLoading && typeof approvedMessError !== 'undefined' && approvedMessError && approvedMessError.length > 0 &&
                            <div className="server-error-wrapper">
                                <ErrorCloud />
                                <h4>Something went wrong! please try again.</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleOpenChatWindow = (userDetails, channelId) => {
        const { dispatch, socket } = this.props;
        dispatch(openUserChatWindowRequest(userDetails, channelId));
        var requestData = {
            token: getToken(),
            channel_id: channelId,
            start: 0,
            limit: 10,
        }
        socket.emit('get_user_conversation_by_channel', requestData);
        toggleSideMenu('user-message-panel', false);
    }

    handleMessageSeen = (userDetails, channelId) => {
        const { socket } = this.props;
        var requestData = {
            channelId: channelId,
            friendId: userDetails.authUserId,
        }
        socket.emit('mark_message_as_read', requestData);
        socket.emit('user_messages_count', getToken());
    }

    handleLoadMore = () => {
        const { socket, dispatch, panelChannelStart, panelChannelLimit } = this.props;
        var requestData = {
            token: getToken(),
            start: (panelChannelStart + panelChannelLimit),
            limit: panelChannelLimit,
        }
        dispatch(loadMoreUserMessageChannelRequest(requestData));
        socket.emit('request_users_conversation_channels', requestData);
    }

    handleUsersLoadMore = () => {
        const { socket, dispatch, approvedMessSkip, approvedMessLimit } = this.props;
        var requestData = {
            token: getToken(),
            start: (approvedMessSkip + approvedMessLimit),
            limit: approvedMessLimit,
            sort: -1,
        }
        dispatch(loadMoreApprovedFriendsMessengerRequest(requestData));
        socket.emit('request_logged_user_friends', requestData);
    }
}

const mapStateToProps = (state) => {
    const { userMessages, user, friends } = state;
    return {
        panelChannelLoading: userMessages.get('panelChannelLoading'),
        panelChannels: userMessages.get('panelChannels'),
        panelChannelError: userMessages.get('panelChannelError'),
        panelChannelStart: userMessages.get('panelChannelStart'),
        panelChannelLimit: userMessages.get('panelChannelLimit'),
        panelChannelDataOver: userMessages.get('panelChannelDataOver'),
        panelChannelLoadMoreLoading: userMessages.get('panelChannelLoadMoreLoading'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),

        approvedMessLoading: friends.get('approvedMessLoading'),
        approvedMessFriends: friends.get('approvedMessFriends'),
        approvedMessError: friends.get('approvedMessError'),
        approvedMessSkip: friends.get('approvedMessSkip'),
        approvedMessLimit: friends.get('approvedMessLimit'),
        approvedMessLoadMoreLoading: friends.get('approvedMessLoadMoreLoading'),
        approvedMessNoMoreData: friends.get('approvedMessNoMoreData'),
    };
}

export default connect(
    mapStateToProps,
)(UserMessagePanel);

class ChannelMessageCard extends Component {
    render() {
        const { channel, loggedUserData, handleOpenChatWindow, handleMessageSeen } = this.props;
        var message = channel.conversation.message;
        var channelFor = null;
        if (channel.userData && channel.userData.authUserId !== loggedUserData.authId) {
            channelFor = channel.userData;
        } else if (channel.friendData && channel.friendData.authUserId !== loggedUserData.authId) {
            channelFor = channel.friendData;
        }
        var isSeen = true;
        if (channel.conversation.userId !== loggedUserData.authId && channel.conversation.isSeen === 0) {
            isSeen = false;
        }
        if (channelFor) {
            return (
                <a href="javascript:void(0)" onClick={() => {
                    handleMessageSeen(channelFor, channel._id);
                    handleOpenChatWindow(channelFor, channel._id);
                }}>
                    <div className={cns("messenger-box", { 'un-seen-message': !isSeen })}>
                        <span>
                            <img
                                src={channelFor.avatar}
                                className="avatar"
                                onError={(e) => {
                                    e.target.src = noProfileImg
                                }}
                            />
                        </span>
                        <h4>
                            <strong>{`${channelFor.firstName} ${(channelFor.lastName) ? channelFor.lastName : ''}`}</strong>
                            <small>{message}</small>
                        </h4>
                    </div>
                </a>
            );
        } else {
            return null;
        }
    }
}

class UsersFriendCard extends Component {
    render() {
        const { friend } = this.props;
        return (
            <a href="javascript:void(0)" className="messenger-box">
                <span className="p-relative">
                    <img
                        src={friend.avatar}
                        className="avatar"
                        onError={(e) => {
                            e.target.src = noProfileImg
                        }}
                    />
                    <div className={cns("online-dot", { 'offline': !friend.isOnline })}></div>
                </span>
                <h4>
                    <strong>{`${friend.firstName} ${(friend.lastName) ? friend.lastName : ''}`}</strong>
                </h4>
            </a>
        );
    }
}