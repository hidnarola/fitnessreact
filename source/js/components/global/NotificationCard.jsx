import React, { Component } from 'react';
import { toggleSideMenu } from '../../helpers/funs';
import ReactHtmlParser from "react-html-parser";
import noProfileImg from 'img/common/no-profile-img.png'
import { routeCodes } from '../../constants/routes';
import { NavLink } from 'react-router-dom';
import cns from "classnames";

class NotificationCard extends Component {
    render() {
        const {
            notification,
        } = this.props;
        var type = notification.type;
        var isSeen = notification.isSeen;
        switch (type) {
            case 'friend_request_approved':
                var msg = '';
                var sender = notification.sender;
                msg = `<strong>${sender.firstName} ${(sender.lastName) ? sender.lastName : ''}</strong>`;
                msg += `<small>approved your request</small>`;
                return (
                    <NavLink
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
                            <h4>{ReactHtmlParser(msg)}</h4>
                        </div>
                    </NavLink>
                )
            default:
                if (notification.body) {
                    return (
                        <div className={cns("notifications-box", { 'un-seen-notification': !isSeen })}>
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