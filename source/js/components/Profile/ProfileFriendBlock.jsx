import React from 'react';

const ProfileFriendBlock = (props) => {
    const { friend } = props;
    if (friend) {
        return (
            <div className="friend-box vertical-middle-r">
                <div className="friend-box-img">
                    <a href="">
                        <img src={friend.profileImage} alt="" />
                    </a>
                </div>
                <div className="friend-box-info">
                    <h5 className="vertical-middle-c">
                        {friend.firstName + ' ' + friend.lastName}
                        {friend.mutualFriendsCount > 0 &&
                            <small>
                                {friend.mutualFriendsCount} Friend{friend.mutualFriendsCount > 1 && 's'}
                            </small>
                        }
                        {friend.mutualFriendsCount <= 0 &&
                            <small>No mutual friends</small>
                        }
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

export default ProfileFriendBlock;