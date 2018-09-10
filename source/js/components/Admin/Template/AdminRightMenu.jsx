import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { toggleSideMenu } from '../../../helpers/funs';
import { adminRouteCodes } from '../../../constants/adminRoutes';
import UserCircle from "svg/user-circle.svg";
import OpenLock from "svg/open-lock.svg";
import Logout from "svg/logout.svg";

class AdminRightMenu extends Component {
    render() {
        const { handleLogout, loggedUserData } = this.props;
        return (
            <div id="admin-right-menu" className="chat-wrap user-right-menu-css">
                <div className="chat-bg"></div>
                <div className="chat-inr">
                    <div className="chat-head">
                        <h3><small>{(loggedUserData && loggedUserData.name) ? loggedUserData.name : 'Admin'}</small></h3>
                        <a href="javascript:void(0)" onClick={() => toggleSideMenu('admin-right-menu', false)}><i className="icon-close"></i></a>
                    </div>
                    <div className="chat-body" id="chat-body">
                        <ul>
                            <li>
                                <NavLink
                                    to={adminRouteCodes.PROFILE}
                                    onClick={() => toggleSideMenu('admin-right-menu', false)}
                                >
                                    <UserCircle />
                                    Update Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={adminRouteCodes.CHANGE_PASSWORD}
                                    onClick={() => toggleSideMenu('admin-right-menu', false)}
                                >
                                    <OpenLock />
                                    Change Password
                                </NavLink>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={handleLogout}>
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

const mapStateToProps = (state) => {
    const { admin } = state;
    return {
        loggedUserData: admin.get('loggedUserData'),
    };
}

export default connect(
    mapStateToProps,
)(AdminRightMenu);