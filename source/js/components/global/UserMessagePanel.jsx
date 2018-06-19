import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSideMenu } from '../../helpers/funs';

function mapStateToProps(state) {
    return {

    };
}

class UserMessagePanel extends Component {
    render() {
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
                        <p>0 unread chats</p>
                    </div>
                    <div className="messenger-body" id="messenger-box">
                        <div className="messenger-box">
                            <span><img src="images/img-04.jpg" alt="" /></span>
                            <h4>
                                <strong>Jane Jackson and Robert Smith</strong>
                                <small>Quis nostrud exercitation ullamco laboris nisi ut …</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-07.jpg" alt="" /></span>
                            <h4>
                                <strong>Jane Jackson and Robert Smith</strong>
                                <small>Quis nostrud exercitation ullamco laboris nisi ut …</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-08.jpg" alt="" /></span>
                            <h4>
                                <strong>Robert Smith</strong>
                                <small>Exactly what i thought</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-09.jpg" alt="" /></span>
                            <h4>
                                <strong>Todd Timms</strong>
                                <small>When do you want to meet up for that workout?</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-04.jpg" alt="" /></span>
                            <h4>
                                <strong>Jane Jackson and Robert Smith</strong>
                                <small>Quis nostrud exercitation ullamco laboris nisi ut …</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-07.jpg" alt="" /></span>
                            <h4>
                                <strong>Jane Jackson and Robert Smith</strong>
                                <small>Quis nostrud exercitation ullamco laboris nisi ut …</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-08.jpg" alt="" /></span>
                            <h4>
                                <strong>Robert Smith</strong>
                                <small>Exactly what i thought</small>
                            </h4>
                        </div>
                        <div className="messenger-box">
                            <span><img src="images/img-09.jpg" alt="" /></span>
                            <h4>
                                <strong>Todd Timms</strong>
                                <small>When do you want to meet up for that workout?</small>
                            </h4>
                        </div>
                    </div>

                    <div className="messenger-srh">
                        <input type="text" name="" placeholder="Search Chats" />
                        <button type="submit"><i className="icon-search"></i></button>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UserMessagePanel);