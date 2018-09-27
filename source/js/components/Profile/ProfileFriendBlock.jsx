import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import noProfileImg from 'img/common/no-profile-img.png'
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FRIENDSHIP_STATUS_SELF } from '../../constants/consts';

class ProfileFriendBlock extends Component {
    render() {
        const {
            friend,
            handleShowUnfriendRequest,
            friendsActionDisabled,
            friendshipStatus,
            handleRequestMessageChannel,
            loggedUserData,
        } = this.props;
        if (friend) {
            return (
                <div className="friend-box vertical-middle-r frd_fithub">
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
                    {friendshipStatus && friend.username !== loggedUserData.username &&
                        <div className="friend-box-status">
                            <ButtonToolbar>
                                <Dropdown id={`friend_options_${friend._id}`} pullRight>
                                    <Dropdown.Toggle>
                                        {(!friendsActionDisabled) &&
                                            <h6 className="vertical-middle-c"><i className="icon-check_circle"></i> Friend</h6>
                                        }
                                        {friendsActionDisabled &&
                                            <h6 className="vertical-middle-c"><i className="icon-check_circle"></i> Please wait...</h6>
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        {friendshipStatus && friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                            <MenuItem eventKey="1" href="javascript:void(0)" onClick={() => handleShowUnfriendRequest(friend.friendshipId)}>Unfriend</MenuItem>
                                        }
                                        <MenuItem eventKey="2" href="javascript:void(0)" onClick={() => handleRequestMessageChannel(friend)}>Send message</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonToolbar>
                        </div>
                    }
                    {!(friendshipStatus && friend.username !== loggedUserData.username) &&
                        <div className="friend-box-status">
                            <h6 className="vertical-middle-c"><i className="icon-check_circle"></i> Friend</h6>
                        </div>
                    }
                </div>
            );
        }
        return null;
    }
}

export default ProfileFriendBlock;