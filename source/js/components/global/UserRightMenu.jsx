import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toggleSideMenu } from '../../helpers/funs';
import { routeCodes } from '../../constants/routes';
import UserCircle from "svg/user-circle.svg";
import OpenLock from "svg/open-lock.svg";
import Cog from "svg/cog.svg";
import Logout from "svg/logout.svg";

class UserRightMenu extends Component {
    render() {
        const {
            loggedUserData,
            handleLogout,
        } = this.props;
        return (
            <div id="user-right-menu" className="chat-wrap user-right-menu-css">
                <div className="chat-bg"></div>
                <div className="chat-inr">
                    <div className="chat-head">
                        <h3><small>{loggedUserData.name}</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('user-right-menu', false)}><i className="icon-close"></i></a>
                    </div>
                    <div className="chat-body" id="chat-body">
                        <ul>
                            <li>
                                <Link
                                    to={routeCodes.UPDATE_PROFILE}
                                    onClick={() => toggleSideMenu('user-right-menu', false)}
                                >
                                    <UserCircle />
                                    Update Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={routeCodes.CHANGE_PASSWORD}
                                    onClick={() => toggleSideMenu('user-right-menu', false)}
                                >
                                    <OpenLock />
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={routeCodes.PROFILE_SETTINGS}
                                    onClick={() => toggleSideMenu('user-right-menu', false)}
                                >
                                    <Cog />
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    onClick={handleLogout}
                                >
                                    <Logout />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserRightMenu;