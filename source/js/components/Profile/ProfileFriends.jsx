import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriendsData } from '../../actions/friends';
import ProfileFriendBlock from './ProfileFriendBlock';

class ProfileFriends extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getFriendsData());
    }

    render() {
        const { friends } = this.props;
        return (
            <div className="white-box space-btm-20">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Your Friends</h3>
                </div>
                <div className="whitebox-body profile-body">
                    <div className="row d-flex">
                        {!friends &&
                            <div className="col-md-12">
                                No friends found
                            </div>
                        }
                        {friends && friends.length <= 0 &&
                            <div className="col-md-12">
                                No friends found
                            </div>
                        }
                        {friends && friends.length > 0 &&
                            friends.map((friend, index) => (
                                <div className="col-md-6" key={index}>
                                    <ProfileFriendBlock friend={friend} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { friends } = state;
    return {
        loading: friends.get('loading'),
        error: friends.get('error'),
        friends: friends.get('friends'),
    }
}

export default connect(mapStateToProps)(ProfileFriends)