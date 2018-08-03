import React, { Component } from 'react';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { connect } from 'react-redux';
import { getToken } from '../helpers/funs';


class Dashboard extends Component {
    componentWillMount() {
        const {
            socket,
        } = this.props;
        let token = getToken();
        if (socket && token) {
            socket.emit('join', token);
        }
    }

    render() {
        return (
            <div className="fitness-dashboard">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Dashboard</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r space-btm-20">
                            <a className="white-btn for_cursor">
                                Add Widget
                            </a>
                            <a className="pink-btn">
                                Profile Completion
                            </a>
                        </div>
                    </div>

                    <div className="body-content row d-flex">
                        <div className="col-md-4">
                            {/* <TodaysWorkout />
                            <GoalProgress />
                            <Badges /> */}
                        </div>
                        <div className="col-md-4">
                            {/* <NextMeal />
                            <BodyFatLoss />
                            <WeeksCalories /> */}
                        </div>
                        <div className="col-md-4">
                            {/* <ActivityFeed /> */}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        socket: user.get('socket'),
    };
};

export default connect(mapStateToProps)(Dashboard);