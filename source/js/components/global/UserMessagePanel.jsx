import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSideMenu, getToken } from '../../helpers/funs';
import noProfileImg from 'img/common/no-profile-img.png'
import cns from "classnames";
import { openUserChatWindowRequest, getUserMessageChannelRequest } from '../../actions/userMessages';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import { Scrollbars } from 'react-custom-scrollbars';

class UserMessagePanel extends Component {
    render() {
        const {
            panelChannelLoading,
            panelChannels,
            panelChannelError,
            loggedUserData,
        } = this.props;
        return (
            <div id="user-message-panel" className="messenger-wrap">
                <div className="messenger-bg"></div>
                <div className="messenger">
                    <div className="messenger-head">
                        <h3><i className="icon-mail_outline"></i> <small>Messenger</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-message-panel', false)}><i className="icon-close"></i></a>
                    </div>
                    <div className="messenger-body" id="messenger-box">
                        {panelChannelLoading &&
                            <div className="text-c">
                                <FaCircleONotch className="loader-spinner fs-25" />
                            </div>
                        }
                        <Scrollbars autoHide>
                            {!panelChannelLoading && panelChannels && panelChannels.length > 0 &&
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
                            {!panelChannelLoading && panelChannels && panelChannels.length > 0 &&
                                <button type="button" onClick={this.handleLoadMore}>Load more</button>
                            }
                        </Scrollbars>

                        {!panelChannelLoading && (typeof panelChannels === 'undefined' || !panelChannels || panelChannels.length <= 0) && typeof panelChannelError !== 'undefined' && panelChannelError && panelChannelError.length <= 0 &&
                            <div className="no-record-found-wrapper">
                                <img src={NoDataFoundImg} />
                            </div>
                        }

                        {!panelChannelLoading && typeof panelChannelError !== 'undefined' && panelChannelError && panelChannelError.length > 0 &&
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
        dispatch(getUserMessageChannelRequest(requestData));
        socket.emit('request_users_conversation_channels', requestData);
    }
}

const mapStateToProps = (state) => {
    const { userMessages, user } = state;
    return {
        panelChannelLoading: userMessages.get('panelChannelLoading'),
        panelChannels: userMessages.get('panelChannels'),
        panelChannelError: userMessages.get('panelChannelError'),
        panelChannelStart: userMessages.get('panelChannelStart'),
        panelChannelLimit: userMessages.get('panelChannelLimit'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
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