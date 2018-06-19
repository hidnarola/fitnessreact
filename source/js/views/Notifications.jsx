import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import { getAllUserNotificationRequest, readOneUserNotificationRequest } from '../actions/userNotifications';
import NotificationCard from '../components/global/NotificationCard';
import { getToken } from '../helpers/funs';

class Notifications extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getAllUserNotificationRequest());
    }

    render() {
        const {
            allLoading,
            allError,
            allNotifications,
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
                                        <p>Loading...</p>
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
                                        </div>
                                    }
                                    {(!allLoading && !allNotifications) || (!allLoading && allNotifications.length <= 0) &&
                                        <p>No notification found</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
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
    };
}

export default connect(
    mapStateToProps,
)(Notifications);