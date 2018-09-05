import React, { Component } from 'react';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { connect } from 'react-redux';
import { getToken } from '../helpers/funs';
import WidgetsListModal from '../components/Dashboard/WidgetsListModal';

class Dashboard extends Component {
    componentWillMount() {
        const { socket, } = this.props;
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
                            <button type="button" className="white-btn">
                                <i className="icon-control_point"></i>
                                <span>Add Widget</span>
                            </button>
                            <button type="button" className="pink-btn">
                                <span>Profile Completion</span>
                            </button>
                        </div>
                    </div>

                    <div className="body-content row d-flex">
                    </div>
                </section>
                <WidgetsListModal
                    show={true}
                />
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