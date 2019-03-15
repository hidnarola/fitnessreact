import React, { Component } from 'react';
import { toggleSideMenu } from '../../helpers/funs';
import noProfileImg from 'img/common/no-profile-img.png'
import { routeCodes } from '../../constants/routes';
import { Link } from 'react-router-dom';
import cns from "classnames";
import { NOTIFICATION_TYPE_FRIEND_REQUEST_APPROVED, NOTIFICATION_TYPE_BADGE_AWARDED, NOTIFICATION_TYPE_LIKE_POST, NOTIFICATION_TYPE_COMMENT_POST, NOTIFICATION_TYPE_SUBMIT_POST } from '../../constants/consts';
import BadgeIcon from "svg/badge-icon.svg";
import moment from "moment";

class NotificationCard extends Component {
    render() {
        const {
            notification,
        } = this.props;
        var type = notification.type;
        var isSeen = notification.isSeen;
        var sender = notification.sender;
        switch (type) {
            case NOTIFICATION_TYPE_FRIEND_REQUEST_APPROVED:
                var msg = '';
                msg = `<strong>${sender.firstName} ${(sender.lastName) ? sender.lastName : ''}</strong>`;
                msg += `<small>approved your friend request</small>`;
                return (
                    <Link
                        to={`${routeCodes.PROFILE}/${sender.username}`}
                        onClick={() => this.handleNotificationClick(notification._id)}
                    >
                        <div className={cns("notifications-box", { 'un-seen-notification': !isSeen })}>
                            <span>
                                <img
                                    src={sender.avatar}
                                    className="avatar"
                                    onError={(e) => {
                                        e.target.src = noProfileImg
                                    }}
                                />
                            </span>
                            <h4 className="time_under">
                                <small dangerouslySetInnerHTML={{ __html: msg }}></small>
                                {notification && notification.createdAt &&
                                    <span className="text-mute noti-time">{moment(notification.createdAt).local().format('Do MMM YYYY, HH:mm')}</span>
                                }
                            </h4>
                        </div>
                    </Link>
                )
            case NOTIFICATION_TYPE_BADGE_AWARDED:
                var msg = (notification.body) ? `<small>${notification.body}</small>` : 'Congratulations! You have received a new badge.';
                return (
                    <Link
                        to={`${routeCodes.BADGESTRACKING}`}
                        onClick={() => this.handleNotificationClick(notification._id)}
                    >
                        <div className={cns("notifications-box", { 'un-seen-notification': !isSeen })}>
                            <span className="badge-icon-wrapper">
                                <BadgeIcon />
                            </span>
                            <h4 className="time_under">
                                <small dangerouslySetInnerHTML={{ __html: msg }}></small>
                                {notification && notification.createdAt &&
                                    <span className="text-mute noti-time">{moment(notification.createdAt).local().format('Do MMM YYYY, HH:mm')}</span>
                                }
                            </h4>
                        </div>
                    </Link>
                )
            case NOTIFICATION_TYPE_LIKE_POST:
            case NOTIFICATION_TYPE_COMMENT_POST:
            case NOTIFICATION_TYPE_SUBMIT_POST:
                var msg = (notification.body) ? `<small>${notification.body}</small>` : 'Your post is being liked by your friends.';
                return (
                    <Link
                        to={`${routeCodes.POST}/${notification.receiver.username}/${notification.timelineId}`}
                        onClick={() => this.handleNotificationClick(notification._id)}
                    >
                        <div className={cns("notifications-box", { 'un-seen-notification': !isSeen })}>
                            <span>
                                <img
                                    src={sender.avatar}
                                    className="avatar"
                                    onError={(e) => {
                                        e.target.src = noProfileImg
                                    }}
                                />
                            </span>
                            <h4 className="time_under">
                                <small dangerouslySetInnerHTML={{ __html: msg }}></small>
                                {notification && notification.createdAt &&
                                    <span className="text-mute noti-time">{moment(notification.createdAt).local().format('Do MMM YYYY, HH:mm')}</span>
                                }
                            </h4>
                        </div>
                    </Link>
                )
            default:
                if (notification.body) {
                    return (
                        <div className={cns("notifications-box", { 'un-seen-notification': !isSeen })}>
                            <span>
                                <img
                                    src={sender.avatar}
                                    className="avatar"
                                    onError={(e) => {
                                        e.target.src = noProfileImg
                                    }}
                                />
                            </span>
                            <h4 className="time_under">
                                <small>{notification.body}</small>
                                {notification && notification.createdAt &&
                                    <span className="text-mute noti-time">{moment(notification.createdAt).local().format('Do MMM YYYY, HH:mm')}</span>
                                }
                            </h4>
                        </div>
                    );
                } else {
                    return null;
                }
        }
    }

    handleNotificationClick = (_id) => {
        const {
            readOneNotificaion,
            closeNotificationPanel,
        } = this.props;
        if (readOneNotificaion) {
            readOneNotificaion(_id);
        }
        if (closeNotificationPanel) {
            toggleSideMenu('user-notification-panel', false);
        }
    }
}

export default NotificationCard;