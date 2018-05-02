import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';

class ProfileFriendBlock extends Component {
    render() {
        const { friend } = this.props;
        if (friend) {
            return (
                <div className="friend-box vertical-middle-r">
                    <div className="friend-box-img">
                        <NavLink to={`${routeCodes.PROFILE}/${friend.username}`}>
                            <img src={friend.avatar} alt="" />
                        </NavLink>
                    </div>
                    <div className="friend-box-info">
                        <h5 className="vertical-middle-c">
                            {(typeof friend.firstName !== 'undefined') ? friend.firstName : ''}
                            {(typeof friend.lastName !== 'undefined') ? friend.lastName : ''}
                            {/* {friend.mutualFriendsCount > 0 &&
                            <small>
                                {friend.mutualFriendsCount} Friend{friend.mutualFriendsCount > 1 && 's'}
                            </small>
                        }
                        {friend.mutualFriendsCount <= 0 &&
                            <small>No mutual friends</small>
                        } */}
                        </h5>
                    </div>
                    <div className="friend-box-status">
                        <h6 className="vertical-middle-c">
                            <i className="icon-check_circle"></i> Friends</h6>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default ProfileFriendBlock;