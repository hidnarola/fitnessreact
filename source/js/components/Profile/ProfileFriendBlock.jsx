import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../../constants/routes';
import noProfileImg from 'img/common/no-profile-img.png'
import { FRIENDSHIP_STATUS_SELF } from '../../constants/consts';

class ProfileFriendBlock extends Component {
    render() {
        const {
            friend,
            handleShowUnfriendRequest,
            friendsActionDisabled,
            friendshipStatus,
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
                        <h5 className="vertical-middle-c">
                            {(typeof friend.firstName !== 'undefined') ? friend.firstName : ''}
                            {(typeof friend.lastName !== 'undefined') ? ' ' + friend.lastName : ''}
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
                        {(!friendsActionDisabled) &&
                            <h6 className="vertical-middle-c">
                                {friendshipStatus && friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                                    <a href="javascript:void(0)" onClick={() => handleShowUnfriendRequest(friend.friendshipId)}>
                                        Unfriend
                                    </a>
                                }
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => handleRequestMessageChannel(friend)}
                                >
                                    Send Message
                                </a>
                                <i className="icon-check_circle"></i> Friends
                        </h6>
                        }
                        {friendsActionDisabled &&
                            <h6><span>Please wait...</span></h6>
                        }
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default ProfileFriendBlock;