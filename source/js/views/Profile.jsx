import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileFithub from 'components/Profile/ProfileFithub';
import ProfileFriends from 'components/Profile/ProfileFriends';
import ProfilePhotos from 'components/Profile/ProfilePhotos';

import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';

import { routeCodes } from 'constants/routes';
import { getProfileDetailsRequest } from '../actions/profile';
import noProfileImg from 'img/common/no-profile-img.png'
import { FRIENDSHIP_STATUS_SELF, FRIENDSHIP_STATUS_REQUEST_PENDING, FRIENDSHIP_STATUS_UNKNOWN, FRIENDSHIP_STATUS_FRIEND } from '../constants/consts';

class Profile extends Component {
    constructor(props) {
        super(props);
        var username = props.match.params.username;
        this.state = {
            loadProfileActionInit: false,
            profile: {},
            username: (username) ? username : null,
        }
    }

    componentWillMount() {
        const { dispatch, match } = this.props;
        if (typeof match.params.username !== 'undefined') {
            var username = match.params.username;
            this.setState({
                loadProfileActionInit: true,
                username
            });
            dispatch(getProfileDetailsRequest(username));
        }
    }

    componentWillReceiveProps(nextProps) {
        var oldUsername = this.state.username;
        var match = nextProps.match;
        if (typeof match.params.username !== 'undefined') {
            var newUsername = match.params.username;
            if (newUsername !== oldUsername) {
                this.setState({
                    loadProfileActionInit: true,
                    username: newUsername,
                });
                nextProps.dispatch(getProfileDetailsRequest(newUsername));
            }
        }
    }

    render() {
        const { profile, username } = this.state;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex">
                        <div className="body-head-l">
                            <h2>
                                {profile && (typeof profile.firstName !== 'undefined') && (profile.firstName)}
                                {profile && (typeof profile.lastName !== 'undefined') && (profile.lastName)}
                            </h2>
                            <div className="body-head-l-btm">

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={`${routeCodes.PROFILE}/${username}`}
                                >
                                    Fithub
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROFILEPHOTOS.replace('{username}', username)}
                                >
                                    Photos
                                </NavLink>

                                <NavLink
                                    activeClassName='pink-btn'
                                    className='white-btn'
                                    exact
                                    to={routeCodes.PROFILEFRIENDS.replace('{username}', username)}
                                >
                                    Friends
                                </NavLink>
                            </div>
                        </div>
                        {profile && profile.friendshipStatus && profile.friendshipStatus !== '' && profile.friendshipStatus !== FRIENDSHIP_STATUS_SELF &&
                            <div className="body-head-r add-friend">
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_FRIEND &&
                                    <a href="" className="green-blue-btn active">
                                        Friend<i className="icon-check"></i>
                                    </a>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_REQUEST_PENDING &&
                                    <a href="" className="green-blue-btn active">
                                        Action <i className="icon-check"></i>
                                    </a>
                                }
                                {profile.friendshipStatus === FRIENDSHIP_STATUS_UNKNOWN &&
                                    <a href="" className="add-friend-btn active">
                                        Add Friend <i className="icon-person_add"></i>
                                    </a>
                                }
                            </div>
                        }
                    </div>

                    <div className="fitness-stats">
                        <div className="body-content d-flex row justify-content-start profilephoto-content">

                            <div className="col-md-9">
                                <Switch>
                                    <Route
                                        exact
                                        path={`${routeCodes.PROFILE}/:username`}
                                        render={() => {
                                            return <ProfileFithub
                                                {...this.state}
                                            />
                                        }}
                                    />
                                    <Route
                                        exact
                                        path={routeCodes.PROFILEFRIENDS.replace('{username}', username)}
                                        render={() => {
                                            return <ProfileFriends
                                                {...this.state}
                                            />
                                        }}
                                    />
                                    <Route
                                        exact
                                        path={routeCodes.PROFILEPHOTOS.replace('{username}', username)}
                                        render={() => {
                                            return <ProfilePhotos
                                                {...this.state}
                                            />
                                        }}
                                    />
                                </Switch>
                            </div>

                            <div className="col-md-3 ml-auto">
                                <div className="lavel-img">
                                    {profile &&
                                        <span>
                                            <img
                                                src={profile.avatar}
                                                alt="Profile image"
                                                onError={(e) => {
                                                    e.target.src = noProfileImg
                                                }}
                                            />
                                            <a href="">
                                                <i className="icon-add_a_photo"></i>
                                            </a>
                                        </span>
                                    }
                                    <a href="" data-toggle="modal" data-target="#level-gallery">Lavel 13</a>
                                </div>

                                <div className="white-box profile-about">
                                    <div className="whitebox-head d-flex profile-about-head">
                                        <h3 className="title-h3">About</h3>
                                        <div className="whitebox-head-r">
                                            <a href="">Edit</a>
                                        </div>
                                    </div>
                                    <div className="whitebox-body profile-about-body">
                                        {profile && profile.height > 0 &&
                                            <a href="" className="purple-btn">
                                                Height:{profile.height} cm
                                            </a>
                                        }
                                        {profile && profile.height <= 0 &&
                                            <a href="" className="purple-btn">
                                                Please add your height
                                            </a>
                                        }
                                        {profile && profile.weight > 0 &&
                                            <a href="" className="green-blue-btn">
                                                Weight:{profile.weight} kg
                                            </a>
                                        }
                                        {profile && profile.weight <= 0 &&
                                            <a href="" className="green-blue-btn">
                                                Please add your weight
                                            </a>
                                        }
                                        {profile && profile.aboutMe !== '' &&
                                            <p>{profile.aboutMe}</p>
                                        }
                                        {profile && profile.aboutMe === '' &&
                                            <p>Write something about yourself!</p>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            </div >
        );
    }

    componentDidUpdate() {
        const {
            profile,
            profileLoading,
            match
        } = this.props;
        const {
            loadProfileActionInit
        } = this.state;
        const stateProfile = this.state.profile;
        if (loadProfileActionInit && !profileLoading && (profile !== stateProfile)) {
            this.setState({
                loadProfileActionInit: false,
                profile
            });
        }
    }

}

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        profileLoading: profile.get('loading'),
        profile: profile.get('profile'),
    }
}

export default connect(mapStateToProps)(Profile);