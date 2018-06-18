import React, { Component } from 'react';
import { toggleSideMenu } from '../../helpers/funs';
import { Scrollbars } from 'react-custom-scrollbars';

class UserNotificationPanel extends Component {
    render() {
        return (
            <div id="user-notification-panel" class="notifications-wrap">
                <div class="notification-bg"></div>
                <div class="notifications">
                    <div class="notifications-head">
                        <h3><i class="icon-notifications"></i> <small>Notifications</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-notification-panel', false)}><i class="icon-close"></i></a>
                    </div>
                    <div class="notification-option">
                        <a href=""><small>Settings</small> <i class="icon-settings"></i> </a>
                        <a href=""><small>Mark as read</small> </a>
                    </div>
                    <Scrollbars autoHide style={{ height: 500 }}>
                        <div class="notifications-body" id="notification-box" >
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                            <div class="notifications-box">
                                <span><img src="images/img-02.jpg" alt="" /></span>
                                <h4><strong>Jeremiah Coleman</strong> <small> posted on your Fithub.</small></h4>
                            </div>
                        </div>
                    </Scrollbars>
                    <div class="notifications-btm">
                        <a href="">See All</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserNotificationPanel;