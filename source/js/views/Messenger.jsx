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
                                    <div className="message-box-r d-flex">
                                        <div className="message-l">
                                            <div className="message-l-head">
                                                <input type="text" placeholder="Search in Message" />
                                            </div>
                                            <div className="message-l-body">
                                                <ul>
                                                    <li>
                                                        <div className="message-user">
                                                            <h3></h3>
                                                            <h4>Employee Benefit Trust - Question</h4>
                                                            <h5>Shanon Moore</h5>
                                                            <h6>12 Jan</h6>
                                                            <span><img src="images/ellipsis.png" alt="" /></span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="message-user">
                                                            <h3></h3>
                                                            <h4>Help in Assessment</h4>
                                                            <h5>James Cromwell</h5>
                                                            <h6>12 Jan</h6>
                                                            <span><img src="images/ellipsis.png" alt="" /></span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="message-user">
                                                            <h3></h3>
                                                            <h4>Risk Transfer for X</h4>
                                                            <h5>Sally Miles</h5>
                                                            <h6>12 Jan</h6>
                                                            <span><img src="images/ellipsis.png" alt="" /></span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="message-user">
                                                            <h3></h3>
                                                            <h4>Hello!</h4>
                                                            <h5>Lawrence Boyn</h5>
                                                            <h6>12 Jan</h6>
                                                            <span><img src="images/ellipsis.png" alt="" /></span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="message-user">
                                                            <h3></h3>
                                                            <h4>Conference in New Jork</h4>
                                                            <h5>Mark Scott</h5>
                                                            <h6>12 Jan</h6>
                                                            <span><img src="images/ellipsis.png" alt="" /></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="message-r">
                                            <div className="message-r-head d-flex">
                                                <h4 className="active"><span></span> James Cromwell</h4>
                                                <i className=""></i>
                                            </div>
                                            <div className="message-r-body">
                                                <div className="message-r-top">
                                                    <ul>
                                                        <li className="first-user">
                                                            <div className="message-chat">
                                                                <span></span>
                                                                <h3>James Cromwell</h3>
                                                                <h4>The specific terminal liability option provides three months of paid claim run-out protection on the specific</h4>
                                                                <h5>8:50 AM</h5>
                                                            </div>
                                                        </li>
                                                        <li className="secound-user">
                                                            <div className="message-chat">
                                                                <h4>Our Introduction to Self-Insurance includes information on how self-insurance works, considerations forbecoming self-insured, the advantages and disadvantages of self-insurance, how to limit risk and</h4>
                                                                <h5>9:00 AM</h5>
                                                            </div>
                                                        </li>
                                                        <li className="first-user">
                                                            <div className="message-chat">
                                                                <span></span>
                                                                <h3>James Cromwell</h3>
                                                                <h4>Our Introduction to Self-Insurance includes information on how self-insurance works, considerations for becoming self-insured, the advantages and disadvantages of self-insurance, how to limit risk and</h4>
                                                                <h5>11:00 AM</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="message-r-btm">
                                                    <textarea>Write here…</textarea>
                                                    <div className="message-r-btm-btm d-flex ">
                                                        <div className="message-r-btm-btm-l">
                                                            <i><img src="images/pin-icon.png" alt="" /></i>
                                                            <i><img src="images/img-icon.png" alt="" /></i>
                                                        </div>
                                                        <button type="submit">Send <i></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        var channelFor = null;
        if (channel.userData && channel.userData.authUserId !== loggedUserData.authId) {
            channelFor = channel.userData;
        } else if (channel.friendData && channel.friendData.authUserId !== loggedUserData.authId) {
            channelFor = channel.friendData;
        }
        var isSeen = true;
        if (channel.conversation.userId !== loggedUserData.authId && channel.conversation.isSeen === 0) {
            isSeen = false;
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