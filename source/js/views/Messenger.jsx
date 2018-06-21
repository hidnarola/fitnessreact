import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getToken } from '../helpers/funs';
import { getUserMessageChannelRequest } from '../actions/userMessages';
import InfiniteScroll from "react-infinite-scroller";
import { FaCircleONotch } from "react-icons/lib/fa";

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
        } = this.state;
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
        console.log('prevProps => ', prevProps);
        console.log('this.props => ', this.props);
    }

    loadMore = () => {
        const {
            start,
            limit,
        } = this.state;
        const {
            socket,
            dispatch,
        } = this.props;
        if (socket) {
            var requestData = {
                token: getToken(),
                start,
                limit,
            }
            dispatch(getUserMessageChannelRequest('messenger'));
            socket.emit('request_users_conversation_channels', requestData);
            this.setState({ hasMore: false });
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
    };
}

export default connect(
    mapStateToProps,
)(Messenger);