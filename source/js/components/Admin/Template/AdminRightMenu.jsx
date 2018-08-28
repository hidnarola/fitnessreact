import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { toggleSideMenu } from '../../../helpers/funs';
import { FaSignOut } from "react-icons/lib/fa";

class AdminRightMenu extends Component {
    render() {
        const { handleLogout, loggedUserData } = this.props;
        return (
            <div id="admin-right-menu" className="chat-wrap">
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
                                    to={''}
                                    onClick={() => toggleSideMenu('admin-right-menu', false)}
                                >
                                    <i className="icon-account_circle"></i>
                                    Update Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={''}>
                                    <i className="icon-lock_open"></i>
                                    Change Password
                                </NavLink>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={handleLogout}>
                                    <FaSignOut />
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