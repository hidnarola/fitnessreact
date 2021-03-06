import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import { toggleSmallChatWindow, getToken, scrollBottom, replaceStringWithEmos, sanitizeEditableContentValue } from '../../helpers/funs';
import moment from "moment";
import noProfileImg from 'img/common/no-profile-img.png';
import _ from "lodash";
import { ACCESS_LEVEL_NONE, ACCESS_LEVEL_PUBLIC, ACCESS_LEVEL_FRIENDS_OF_FRIENDS, ACCESS_LEVEL_PRIVATE, ACCESS_LEVEL_FRIENDS, FRIENDSHIP_STATUS_FRIEND } from '../../constants/consts';
import Emos from '../Common/Emos';
import ContentEditableTextbox from '../Common/ContentEditableTextbox';
import { Emoji } from "emoji-mart";
import $ from "jquery";

class UserChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: '',
        }
        this.messageTypingStopDebounce = _.debounce(this.handleTypeingStop, 1000);
        this.messageTypingStart = false;
        this.isMinimized = false;
        this.chatTextbox = React.createRef();
        this.emos = React.createRef();
    }

    render() {
        const {
            channelId,
            userDetails,
            userPreferences,
            friendshipStatus,
            loadingMessages,
            messages,
            style,
            closeWindow,
            isTyping,
            handleToggleChatWindowMinimize,
        } = this.props;
        const {
            newMsg,
        } = this.state;
        return (
            <div className="small-chat-window-wrapper" style={style}>
                <header
                    className="clearfix"
                    onClick={() => {
                        this.isMinimized = !this.isMinimized;
                        handleToggleChatWindowMinimize(channelId, userDetails.authUserId, this.isMinimized);
                        toggleSmallChatWindow(`live-chat-chat_${channelId}`);
                    }}
                >
                    <a href="javascript:void(0)" onClick={() => closeWindow(channelId)} className="chat-close">x</a>
                    <h4>{`${userDetails.firstName} ${(userDetails.lastName) ? userDetails.lastName : ''}`}</h4>
                    {/* <span className="chat-message-counter">3</span> */}
                </header>
                <div id={`live-chat-chat_${channelId}`} className="chat">
                    <div id={`chat-history_${channelId}`} className="chat-history">
                        {loadingMessages &&
                            <p>Loading...</p>
                        }
                        {messages && Object.keys(messages).length > 0 && !loadingMessages &&
                            messages.map((msg, index) => {
                                var dt = moment(msg.createdAt).format('Do MMM HH:mm');
                                let message = '';
                                if (msg.message && msg.message !== '') {
                                    message = replaceStringWithEmos(msg.message);
                                }
                                return (
                                    <div key={index}>
                                        <div className="chat-message clearfix">
                                            <img
                                                src={msg.avatar}
                                                width="32"
                                                height="32"
                                                onError={(e) => {
                                                    e.target.src = noProfileImg
                                                }}
                                            />
                                            <div className="chat-message-content clearfix">
                                                <span className="chat-time">{dt}</span>
                                                <h5>{`${msg.firstName} ${(msg.lastName) ? msg.lastName : ''}`}</h5>
                                                {message !== '' && <small dangerouslySetInnerHTML={{ __html: message }}></small>}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })
                        }
                        {messages && Object.keys(messages).length <= 0 && !loadingMessages &&
                            <p>No messages found...</p>
                        }
                    </div>
                    {isTyping &&
                        <p className="chat-feedback">{`${userDetails.firstName}`} is typing…</p>
                    }
                    {userPreferences && (userPreferences.messageAccessibility == ACCESS_LEVEL_NONE || userPreferences.messageAccessibility == ACCESS_LEVEL_FRIENDS_OF_FRIENDS || userPreferences.messageAccessibility == ACCESS_LEVEL_PRIVATE) &&
                        <div className="no-msg-allow">
                            <span>You are not able to send message.</span>
                        </div>
                    }
                    {userPreferences && userPreferences.messageAccessibility == ACCESS_LEVEL_FRIENDS && (!friendshipStatus || friendshipStatus !== FRIENDSHIP_STATUS_FRIEND) &&
                        <div className="no-msg-allow">
                            <span>You are not able to send message.</span>
                        </div>
                    }
                    {userPreferences && userPreferences.messageAccessibility == ACCESS_LEVEL_FRIENDS && friendshipStatus && friendshipStatus === FRIENDSHIP_STATUS_FRIEND &&
                        <div className="p-10 p-relative">
                            <Emos
                                ref={this.emos}
                                pickerProps={{
                                    color: "#ff337f",
                                    onClick: this.handleEmoClick,
                                    onSelect: this.handleEmoSelect,
                                }}
                                positionClass="top-right"
                                emosWrapClass="emotis-chat-window"
                                emojiBtnSize={18}
                            />
                            <form id={`chat-window-form_${channelId}`} method="POST" onSubmit={this.handleSend}>
                                <fieldset>
                                    <ContentEditableTextbox
                                        ref={this.chatTextbox}
                                        fieldProps={{
                                            className: ""
                                        }}
                                        html={newMsg}
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit">
                                        <i className="icon-send"></i>
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    }
                    {userPreferences && userPreferences.messageAccessibility == ACCESS_LEVEL_PUBLIC &&
                        <div className="p-10 p-relative">
                            <Emos
                                ref={this.emos}
                                pickerProps={{
                                    color: "#ff337f",
                                    onClick: this.handleEmoClick,
                                    onSelect: this.handleEmoSelect,
                                }}
                                positionClass="top-right"
                                emosWrapClass="emotis-chat-window"
                                emojiBtnSize={18}
                            />
                            <form method="POST" onSubmit={this.handleSend}>
                                <fieldset>
                                    <ContentEditableTextbox
                                        ref={this.chatTextbox}
                                        fieldProps={{
                                            className: "my-custom-textbox",
                                            placeholder: "Your message."
                                        }}
                                        html={newMsg}
                                        onChange={this.handleChange}
                                    />
                                    <button id={`chat-window-send-btn-${channelId}`} type="submit">
                                        <i className="icon-send"></i>
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        const { channelId } = this.props;
        document.getElementById(`live-chat-chat_${channelId}`).addEventListener('keyup', this.handleKeyUpOnChatWindow, true);
        document.getElementById(`live-chat-chat_${channelId}`).addEventListener('keydown', this.handleKeyDownOnChatWindow, true);
    }

    componentWillUnmount() {
        const { channelId } = this.props;
        document.getElementById(`live-chat-chat_${channelId}`).removeEventListener('keyup', this.handleKeyUpOnChatWindow, true);
        document.getElementById(`live-chat-chat_${channelId}`).removeEventListener('keydown', this.handleKeyDownOnChatWindow, true);
    }


    handleKeyUpOnChatWindow = (e) => {
        const { keyCode, shiftKey } = e;
        const { channelId } = this.props;
        if (!shiftKey && keyCode === 13) {
            const chatForm = $(`#chat-window-send-btn-${channelId}`);
            chatForm.trigger('click');
        }
    }

    handleKeyDownOnChatWindow = (e) => {
        const { keyCode, shiftKey } = e;
        if (!shiftKey && keyCode === 13) {
            e.preventDefault();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loadingMessages,
            channelId,
        } = this.props;
        if (loadingMessages !== prevProps.loadingMessages && !loadingMessages) {
            scrollBottom(`#chat-history_${channelId}`, 'slow');
        }
    }

    handleChange = (value, e) => {
        this.setState({ newMsg: value });
        if (!this.messageTypingStart) {
            this.messageTypingStart = true;
            this.handleTypeingStart();
        }
        this.messageTypingStopDebounce.cancel;
        this.messageTypingStopDebounce();
    }

    handleTypeingStart = () => {
        const { handleStartTyping, userDetails, channelId } = this.props;
        if (handleStartTyping) {
            var data = {
                friendId: userDetails.authUserId,
                channelId: channelId
            }
            handleStartTyping(data);
        }
    }

    handleTypeingStop = () => {
        const { handleStopTyping, userDetails, channelId } = this.props;
        if (handleStopTyping) {
            var data = {
                friendId: userDetails.authUserId,
                channelId: channelId
            }
            this.messageTypingStart = false;
            handleStopTyping(data);
        }
    }

    handleSend = (e) => {
        e.preventDefault();
        const { handleSendButton, userDetails, channelId } = this.props;
        const { newMsg } = this.state;
        console.log('newMsg => ', newMsg);
        const sanitizeNewMsg = sanitizeEditableContentValue(newMsg);
        console.log('sanitizeNewMsg => ', sanitizeNewMsg);
        if (sanitizeNewMsg && sanitizeNewMsg.trim()) {
            var data = {
                channelId: channelId,
                friendId: userDetails.authUserId,
                message: sanitizeNewMsg,
                token: getToken(),
                createdAt: moment(),
                timestamp: moment().valueOf(),
            };
            handleSendButton(data);
            this.setState({ newMsg: '' });
            scrollBottom(`#chat-history_${channelId}`, 'slow');
            this.emos.current.forceOpenClose(false);
        }
    }

    handleEmoClick = (emoji, event) => {
        const { id } = emoji;
        this.appendDescription(id);
        this.chatTextbox.current.focus();
    }

    handleEmoSelect = (emoji) => {
        const { id } = emoji;
        this.appendDescription(id);
        this.chatTextbox.current.focus();
    }

    appendDescription = (id) => {
        if (id) {
            const { newMsg } = this.state;
            const _newMsg = newMsg +
                ReactDOMServer.renderToString(<span contentEditable={false} dangerouslySetInnerHTML={{
                    __html: Emoji({ html: true, set: 'emojione', emoji: id, size: 16 })
                }}></span>) +
                ReactDOMServer.renderToString(<span>&nbsp;</span>);
            this.setState({ newMsg: _newMsg });
        }
    }
}

export default UserChatWindow;