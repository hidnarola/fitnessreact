import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from "moment";
import { routeCodes } from '../../constants/routes';
import AddScheduleWorkoutForm from './AddScheduleWorkoutForm';

class AddScheduleWorkout extends Component {
    componentWillMount() {
        const {
            selectedSlot,
            history,
        } = this.props;
        if (!selectedSlot) {
            history.push(routeCodes.SCHEDULE_WORKOUT);
        }
    }

    render() {
        const {
            selectedSlot,
        } = this.props;
        if (selectedSlot) {
            var selectedSlotStartDate = selectedSlot.start;
            return (
                <div className="fitness-body">
                    <FitnessHeader />
                    <FitnessNav />
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>{`Add Workout on ${moment(selectedSlotStartDate).format('MM/DD/YYYY')}`}</h2>
                                <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                            </div>
                        </div>
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        <AddScheduleWorkoutForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    const { userScheduleWorkouts } = state;
    return {
        selectedSlot: userScheduleWorkouts.get('slotInfo'),
    };
}

export default connect(
    mapStateToProps,
)(AddScheduleWorkout);