import React, { Component } from 'react';
import { toggleSmallChatWindow, getToken, scrollBottom } from '../../helpers/funs';
import moment from "moment";
import noProfileImg from 'img/common/no-profile-img.png';
import $ from "jquery";
import _ from "lodash";

class UserChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMsg: '',
        }
        this.scrollBottomInterval = null;
        this.messageTypingStopDebounce = _.debounce(this.handleTypeingStop, 1000);
        this.messageTypingStart = false;
    }

    render() {
        const {
            channelId,
            userDetails,
            loadingMessages,
            messages,
            style,
            closeWindow,
        } = this.props;
        const {
            newMsg,
        } = this.state;
        return (
            <div className="small-chat-window-wrapper" style={style}>
                <header className="clearfix" onClick={() => toggleSmallChatWindow(`live-chat-chat_${channelId}`)}>
                    <a href="javascript:void(0)" onClick={() => closeWindow(channelId)} className="chat-close">x</a>
                    <h4>{`${userDetails.firstName} ${(userDetails.lastName) ? userDetails.lastName : ''}`}</h4>
                    <span className="chat-message-counter">3</span>
                </header>
                <div id={`live-chat-chat_${channelId}`} className="chat">
                    <div id={`chat-history_${channelId}`} className="chat-history">
                        {loadingMessages &&
                            <p>Loading...</p>
                        }
                        {messages && Object.keys(messages).length > 0 && !loadingMessages &&
                            messages.map((msg, index) => {
                                var dt = moment(msg.createdAt).format('Do MMM HH:mm');
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
                                                <h5>{msg.fullName}</h5>
                                                <p>{(msg.message)}</p>
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
                    <p className="chat-feedback">Your partner is typing…</p>
                    <div className="p-10">
                        <fieldset>
                            <input type="text" name='newMsg' value={newMsg} onChange={this.handleChange} placeholder="Type your message…" autoFocus={true} />
                            <button
                                type="button"
                                onClick={this.handleSend}
                            >
                                <i className="icon-send"></i>
                            </button>
                        </fieldset>
                    </div>
                </div>
            </div>
        );
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


    componentDidMount = () => {
        const { channelId } = this.props;
        var elem = $(`#chat-history_${channelId}`);
        elem.scroll(() => {
            window.clearInterval(this.scrollBottomInterval);
            this.scrollBottomInterval = null;
            if (elem.scrollTop() + elem.innerHeight() >= elem[0].scrollHeight && this.scrollBottomInterval == null) {
                this.scrollBottomInterval = window.setInterval(() => {
                    scrollBottom(`#chat-history_${channelId}`, 'slow');
                }, 1500);
            }
        });
    }

    handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
        });
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

    handleSend = () => {
        const {
            handleSendButton,
            userDetails,
            channelId,
        } = this.props;
        const {
            newMsg,
        } = this.state;
        var data = {
            channelId: channelId,
            friendId: userDetails.authUserId,
            message: newMsg,
            token: getToken(),
            createdAt: moment(),
            timestamp: moment().valueOf(),
        };
        handleSendButton(data);
        this.setState({ newMsg: '' });
    }
}

export default UserChatWindow;