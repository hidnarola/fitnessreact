import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getAllUserNotificationRequest, readOneUserNotificationRequest, loadMoreAllUserNotificationRequest } from '../actions/userNotifications';
import NotificationCard from '../components/global/NotificationCard';
import { getToken } from '../helpers/funs';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import NoRecordFound from '../components/Common/NoRecordFound';

class Notifications extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAllUserNotificationRequest(0, 10));
    }

    render() {
        const {
            allLoading,
            allError,
            allNotifications,
            allNotificationsLoadMoreLoading,
            allNotificationsNoLoadMore,
        } = this.props;
        return (
            <div className='stat-page'>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Notifications</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    {allLoading &&
                                        <div className="text-c">
                                            <FaCircleONotch className="loader-spinner fs-100" />
                                        </div>
                                    }
                                    {!allLoading && allNotifications && allNotifications.length > 0 &&
                                        <div className="notifications-body" id="notification-box">
                                            {
                                                allNotifications.map((noti, index) => {
                                                    return (
                                                        <NotificationCard
                                                            key={index}
                                                            notification={noti}
                                                            closeNotificationPanel={false}
                                                            readOneNotificaion={this.handleReadOneNotification}
                                                        />
                                                    )
                                                })
                                            }
                                            {!allNotificationsLoadMoreLoading && !allNotificationsNoLoadMore &&
                                                <button type="button" className="photo-load-more-btn notifications" onClick={this.handleLoadMore}>
                                                    <span>Load More</span>
                                                </button>
                                            }

                                            {allNotificationsLoadMoreLoading &&
                                                <button type="button" className="photo-load-more-btn notifications" disabled={true}>
                                                    <FaCircleONotch className="loader-spinner loader-spinner-icon" />
                                                    <span>Loading...</span>
                                                </button>
                                            }
                                        </div>
                                    }

                                    {!allLoading && (!allNotifications || allNotifications.length <= 0) && allError && allError.length <= 0 &&
                                        <NoRecordFound />
                                    }

                                    {!allLoading && (!allNotifications || allNotifications.length <= 0) && allError && allError.length > 0 &&
                                        <div className="server-error-wrapper">
                                            <ErrorCloud />
                                            <h4>Something went wrong! please try again.</h4>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    handleLoadMore = () => {
        const { dispatch, allNotificationsSkip, allNotificationsLimit } = this.props;
        let newSkip = (parseInt(allNotificationsSkip) + parseInt(allNotificationsLimit));
        dispatch(loadMoreAllUserNotificationRequest(newSkip, allNotificationsLimit));
    }

    handleReadOneNotification = (_id) => {
        const { dispatch, socket } = this.props;
        dispatch(readOneUserNotificationRequest(_id));
        setTimeout(() => {
            socket.emit('user_notifications_count', getToken());
        }, 1000);
    }
}

const mapStateToProps = (state) => {
    const { user, userNotifications } = state;
    return {
        socket: user.get('socket'),
        allLoading: userNotifications.get('allLoading'),
        allError: userNotifications.get('allError'),
        allNotifications: userNotifications.get('allNotifications'),
        allNotificationsSkip: userNotifications.get('allNotificationsSkip'),
        allNotificationsLimit: userNotifications.get('allNotificationsLimit'),
        allNotificationsLoadMoreLoading: userNotifications.get('allNotificationsLoadMoreLoading'),
        allNotificationsNoLoadMore: userNotifications.get('allNotificationsNoLoadMore'),
    };
}

export default connect(
    mapStateToProps,
)(Notifications);