import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { toggleSideMenu, getToken } from '../../helpers/funs';
import noProfileImg from 'img/common/no-profile-img.png'
import cns from "classnames";
import { routeCodes } from '../../constants/routes';
import { openUserChatWindowRequest } from '../../actions/userMessages';

class UserMessagePanel extends Component {
    render() {
        const {
            panelChannelLoading,
            panelChannels,
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
                    <div className="messenger-option">
                        <a href="">Start new chat</a>
                    </div>
                    <div className="messenger-body" id="messenger-box">
                        {!panelChannelLoading && panelChannels && panelChannels.length > 0 &&
                            <div className="">
                                {
                                    panelChannels.map((channel, index) => {
                                        return (
                                            <ChannelMessageCard
                                                key={index}
                                                channel={channel}
                                                loggedUserData={loggedUserData}
                                                handleOpenChatWindow={this.handleOpenChatWindow}
                                            />
                                        )
                                    })
                                }
                            </div>
                        }
                        {panelChannelLoading &&
                            <p>Loading...</p>
                        }
                    </div>

                    <div className="messenger-btm">
                        <NavLink to={routeCodes.MESSENGER} onClick={() => toggleSideMenu('user-message-panel', false)}>See All</NavLink>
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
}

const mapStateToProps = (state) => {
    const { userMessages, user } = state;
    return {
        panelChannelLoading: userMessages.get('panelChannelLoading'),
        panelChannels: userMessages.get('panelChannels'),
        panelChannelError: userMessages.get('panelChannelError'),
        loggedUserData: user.get('loggedUserData'),
        socket: user.get('socket'),
    };
}

export default connect(
    mapStateToProps,
)(UserMessagePanel);

class ChannelMessageCard extends Component {
    render() {
        const { channel, loggedUserData, handleOpenChatWindow } = this.props;
        var message = channel.conversation.message;
        var isSeen = channel.conversation.isSeen;
        var channelFor = null;
        if (channel.userData && channel.userData.authUserId !== loggedUserData.authId) {
            channelFor = channel.userData;
        } else if (channel.friendData && channel.friendData.authUserId !== loggedUserData.authId) {
            channelFor = channel.friendData;
        }
        if (channelFor) {
            return (
                <a href="javascript:void(0)" onClick={() => {
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