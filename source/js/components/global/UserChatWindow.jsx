import React, { Component } from 'react';
import { toggleSmallChatWindow } from '../../helpers/funs';

class UserChatWindow extends Component {
    render() {
        const { channelId, userDetails, style } = this.props;
        return (
            <div className="small-chat-window-wrapper" style={style}>
                <header className="clearfix" onClick={() => toggleSmallChatWindow(`live-chat-chat_${channelId}`)}>
                    <a href="#" className="chat-close">x</a>
                    <h4>{userDetails.firstName + ' ' + userDetails.lastName}</h4>
                    <span className="chat-message-counter">3</span>
                </header>
                <div id={`live-chat-chat_${channelId}`} className="chat">
                    <div className="chat-history">
                        <div className="chat-message clearfix">
                            <img src="" alt="" width="32" height="32" />
                            <div className="chat-message-content clearfix">
                                <span className="chat-time">13:35</span>
                                <h5>John Doe</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo quasi ratione odio dolorum harum.</p>
                            </div>
                        </div>
                        <hr />
                        <div className="chat-message clearfix">
                            <img src="" alt="" width="32" height="32" />
                            <div className="chat-message-content clearfix">
                                <span className="chat-time">13:37</span>
                                <h5>Marco Biedermann</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>
                            </div>
                        </div>
                        <hr />
                        <div className="chat-message clearfix">
                            <img src="" alt="" width="32" height="32" />
                            <div className="chat-message-content clearfix">
                                <span className="chat-time">13:38</span>
                                <h5>John Doe</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <p className="chat-feedback">Your partner is typing…</p>
                    <form action="#" method="post">
                        <fieldset>
                            <input type="text" placeholder="Type your message…" autoFocus={true} />
                            <input type="hidden" />
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserChatWindow;