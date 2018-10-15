import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import noProfileImg from 'img/common/no-profile-img.png'
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { ACCESS_LEVEL_PUBLIC } from '../../constants/consts';

class ProfilePendingFriendBlock extends Component {
    render() {
        const {
            friend,
            pendingFriendsActionDisabled,
            handleAcceptFriendRequest,
            handleShowRejectFriendRequest,
            handleRequestMessageChannel,
        } = this.props;
        if (friend) {
            return (
                <div className="friend-box vertical-middle-r">
                    <div className="friend-box-img">
                        <NavLink to={`${routeCodes.PROFILE}/${friend.username}`}>
                            <img
                                src={friend.avatar}
                                alt={friend.username}
                                onError={(e) => {
                                    e.target.src = noProfileImg
                                }}
                            />
                        </NavLink>
                    </div>
                    <div className="friend-box-info">
                        <NavLink to={`${routeCodes.PROFILE}/${friend.username}`}>
                            <h5 className="vertical-middle-c">
                                {(typeof friend.firstName !== 'undefined') ? friend.firstName : ''}
                                {(typeof friend.lastName !== 'undefined') ? ' ' + friend.lastName : ''}
                                {friend.friendsCount > 0 &&
                                    <small>
                                        {friend.friendsCount} Friend{friend.friendsCount > 1 && 's'}
                                    </small>
                                }
                                {friend.friendsCount <= 0 &&
                                    <small>No friends</small>
                                }
                            </h5>
                        </NavLink>
                    </div>
                    <div className="friend-box-status pending-friends">
                        <ButtonToolbar>
                            <Dropdown id={`friend_options_${friend._id}`} pullRight>
                                <Dropdown.Toggle>
                                    {(!pendingFriendsActionDisabled) &&
                                        <h6 className="vertical-middle-c"><i className="icon-cancel"></i> Pending</h6>
                                    }
                                    {pendingFriendsActionDisabled &&
                                        <h6 className="vertical-middle-c"><i className="icon-check_circle"></i> Please wait...</h6>
                                    }
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="">
                                    <MenuItem eventKey="1" href="javascript:void(0)" onClick={() => handleAcceptFriendRequest(friend.friendshipId)}>Accept</MenuItem>
                                    <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => handleShowRejectFriendRequest(friend.friendshipId)}>Reject</MenuItem>
                                    {friend.userSettings && friend.userSettings.messageAccessibility && (friend.userSettings.messageAccessibility == ACCESS_LEVEL_PUBLIC) &&
                                        <MenuItem eventKey="3" href="javascript:void(0)" onClick={() => handleRequestMessageChannel(friend)}>Send message</MenuItem>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default ProfilePendingFriendBlock;