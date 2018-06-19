import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleSideMenu, getToken } from '../../helpers/funs';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactHtmlParser from "react-html-parser";
import noProfileImg from 'img/common/no-profile-img.png'
import { routeCodes } from '../../constants/routes';
import { readOneUserNotificationRequest, readAllUserNotificationRequest } from '../../actions/userNotifications';

class UserNotificationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readNotificationActionInit: false,
        }
    }

    render() {
        const {
            loading,
            notifications,
            error,
        } = this.props;
        return (
            <div id="user-notification-panel" className="notifications-wrap">
                <div className="notification-bg"></div>
                <div className="notifications">
                    <div className="notifications-head">
                        <h3><i className="icon-notifications"></i> <small>Notifications</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-notification-panel', false)}><i className="icon-close"></i></a>
                    </div>
                    <div className="notification-option">
                        <a href="javascript:void(0)"><small>Settings</small> <i className="icon-settings"></i></a>
                        {notifications && notifications.length > 0 &&
                            <a href="javascript:void(0)" onClick={this.handleMarkAll}><small>Mark as read</small></a>
                        }
                    </div>
                    {loading &&
                        <div className="notifications-box">
                            <h4><small>Loading...</small></h4>
                        </div>
                    }
                    {notifications && notifications.length > 0 &&
                        <Scrollbars autoHide style={{ height: 500 }}>
                            <div className="notifications-body" id="notification-box">
                                {
                                    notifications.map((noti, index) => {
                                        return (
                                            <NotificationCard
                                                key={index}
                                                notification={noti}
                                                readOneNotificaion={this.handleReadOneNotification}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </Scrollbars>
                    }
                    {(!notifications && !loading) || (notifications.length <= 0 && !loading) &&
                        <div className="notifications-box">
                            <h4><small>No recent notification</small></h4>
                        </div>
                    }
                    <div className="notifications-btm">
                        <NavLink to={routeCodes.ALL_NOTIFICATIONS} onClick={() => toggleSideMenu('user-notification-panel', false)}>See All</NavLink>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { loading, socket } = this.props;
        const { readNotificationActionInit } = this.state;
        if (readNotificationActionInit && !loading) {
            this.setState({ readNotificationActionInit: false });
            socket.emit('user_notifications_count', getToken());
        }
    }

    handleReadOneNotification = (_id) => {
        const { dispatch } = this.props;
        this.setState({
            readNotificationActionInit: true,
        });
        dispatch(readOneUserNotificationRequest(_id));
    }

    handleMarkAll = () => {
        const { dispatch } = this.props;
        this.setState({
            readNotificationActionInit: true,
        });
        dispatch(readAllUserNotificationRequest());
        toggleSideMenu('user-notification-panel', false);
    }
}

const mapStateToProps = (state) => {
    const { user, userNotifications } = state;
    return {
        socket: user.get('socket'),
        loading: userNotifications.get('loading'),
        notifications: userNotifications.get('notifications'),
        error: userNotifications.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(UserNotificationPanel);

class NotificationCard extends Component {
    render() {
        const {
            notification,
            readOneNotificaion,
        } = this.props;
        var type = notification.type;
        switch (type) {
            case 'friend_request_approved':
                var msg = '';
                var sender = notification.sender;
                msg = `<strong>${sender.firstName} ${(sender.lastName) ? sender.lastName : ''}</strong>`;
                msg += `<small>approved your request</small>`;
                return (
                    <NavLink
                        to={`${routeCodes.PROFILE}/${sender.username}`}
                        onClick={() => {
                            readOneNotificaion(notification._id);
                            toggleSideMenu('user-notification-panel', false);
                        }}
                    >
                        <div className="notifications-box">
                            <span>
                                <img
                                    src={sender.avatar}
                                    className="avatar"
                                    onError={(e) => {
                                        e.target.src = noProfileImg
                                    }}
                                />
                            </span>
                            <h4>{ReactHtmlParser(msg)}</h4>
                        </div>
                    </NavLink>
                )
            default:
                if (notification.body) {
                    return (
                        <div className="notifications-box">
                            <span>
                                <img
                                    src={SERVER_BASE_URL + sender.avatar}
                                    onError={(e) => {
                                        e.target.src = noProfileImg
                                    }}
                                />
                            </span>
                            <h4><small>{notification.body}</small></h4>
                        </div>
                    );
                } else {
                    return null;
                }
        }
    }
}