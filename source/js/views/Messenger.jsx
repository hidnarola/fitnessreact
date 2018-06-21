import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getToken } from '../helpers/funs';
import { getUserMessageChannelRequest } from '../actions/userMessages';
import InfiniteScroll from "react-infinite-scroller";
import { FaCircleONotch } from "react-icons/lib/fa";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import cns from "classnames";

class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            limit: 10,
            hasMore: true,
            channels: [],
        }
    }

    render() {
        const {
            hasMore,
            channels,
        } = this.state;
        const {
            loggedUserData,
        } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Messenger</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadMore}
                                        hasMore={hasMore}
                                        className="margin-top-30"
                                        loader={
                                            <div className="loader" key={0}>
                                                <FaCircleONotch className="loader-spinner loader-spinner-icon" /> Loading ...
                                            </div>
                                        }
                                    >
                                        <div className="data">
                                            {channels && channels.length > 0 &&
                                                <div className="">
                                                    {
                                                        channels.map((channel, index) => {
                                                            return (
                                                                <ChannelMessageCard
                                                                    key={index}
                                                                    channel={channel}
                                                                    loggedUserData={loggedUserData}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            loading,
            channels,
        } = this.props;
        const {
            start,
            limit,
        } = this.state;
        if (!loading && prevProps.channels !== channels) {
            if (channels && channels.length > 0) {
                var newChannelsState = _.concat(this.state.channels, channels);
                this.setState({ start: (start + limit), channels: newChannelsState, hasMore: true });
            } else {
                this.setState({ hasMore: false });
            }
        }
    }

    loadMore = () => {
        const {
            start,
            limit,
        } = this.state;
        const {
            loading,
            socket,
            dispatch,
        } = this.props;
        if (socket) {
            var requestData = {
                token: getToken(),
                start,
                limit,
            }
            if (!loading) {
                dispatch(getUserMessageChannelRequest('messenger'));
                socket.emit('request_users_conversation_channels', requestData);
                this.setState({ hasMore: false });
            }
        } else {
            // redirect to an error page
        }
    }

}

const mapStateToProps = (state) => {
    const { user, userMessages } = state;
    return {
        socket: user.get('socket'),
        loading: userMessages.get('channelLoading'),
        channels: userMessages.get('channels'),
        error: userMessages.get('channelError'),
        loggedUserData: user.get('loggedUserData'),
    };
}

export default connect(
    mapStateToProps,
)(Messenger);

class ChannelMessageCard extends Component {
    render() {
        const { channel, loggedUserData } = this.props;
        var message = channel.conversation.message;
        var isSeen = channel.conversation.isSeen;
        var channelFor = null;
        if (channel.userData && channel.userData.authUserId !== loggedUserData.authId) {
            channelFor = channel.userData;
        } else if (channel.friendData && channel.friendData.authUserId !== loggedUserData.authId) {
            channelFor = channel.friendData;
        }
        if (channelFor) {
            return (
                <NavLink
                    to={''}
                >
                    <div className={cns("messenger-box", { 'un-seen-message': !isSeen })}>
                        <span>
                            <img
                                src={channelFor.avatar}
                                className="avatar"
                                onError={(e) => {
                                    e.target.src = noProfileImg
                                }}
                            />
                        </span>
                        <h4>
                            <strong>{`${channelFor.firstName} ${(channelFor.lastName) ? channelFor.lastName : ''}`}</strong>
                            <small>{message}</small>
                        </h4>
                    </div>
                </NavLink>
            );
        } else {
            return null;
        }
    }
}