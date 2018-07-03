import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../components/global/FitnessHeader';
import FitnessNav from '../components/global/FitnessNav';
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { setSelectedSlotFromCalendar } from '../actions/userScheduleWorkouts';
import { NavLink } from "react-router-dom";
import { routeCodes } from '../constants/routes';

BigCalendar.momentLocalizer(moment);

class ScheduleWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSelectEventAlert: false,
        }
    }

    render() {
        const {
            showSelectEventAlert,
        } = this.state;
        const {
            selectedSlot,
        } = this.props;
        var selectedSlotStateDate = null;
        if (selectedSlot) {
            selectedSlotStateDate = selectedSlot.start;
        }
        return (
            <div className="fitness-body">
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head d-flex justify-content-start">
                        <div className="body-head-l">
                            <h2>Workouts</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                    </div>
                    <div className="body-content d-flex row justify-content-start profilephoto-content">
                        <div className="col-md-12">
                            <div className="white-box space-btm-20">
                                <div className="whitebox-body profile-body">
                                    <BigCalendar
                                        selectable={true}
                                        defaultView={BigCalendar.Views.MONTH}
                                        className="workout-calender"
                                        events={[
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                            {
                                                title: 'My first event',
                                                start: new Date(),
                                                end: new Date(),
                                                allDay: true,
                                            },
                                        ]}
                                        onView={() => console.log('on View')}
                                        views={[BigCalendar.Views.MONTH]}
                                        onNavigate={(date) => {
                                            console.log('date => ', date);
                                        }}
                                        onSelectEvent={(event) => {
                                            console.log('event => ', event);
                                        }}
                                        onSelectSlot={this.onSelectSlot}
                                        popup={true}
                                        popupOffset={50}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <SweetAlert
                    type="default"
                    title={`Select event for - ${(selectedSlotStateDate) ? moment(selectedSlotStateDate).format('MM/DD/YYYY') : ''}`}
                    onCancel={this.cancelSelectedSlotAction}
                    onConfirm={() => { }}
                    btnSize="sm"
                    cancelBtnBsStyle="danger"
                    show={showSelectEventAlert}
                    showConfirm={false}
                    showCancel={true}
                    closeOnClickOutside={false}
                >
                    <SelectEventView />
                </SweetAlert>

            </div>
        );
    }

    onSelectSlot = (slotInfo) => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: true,
        });
        dispatch(setSelectedSlotFromCalendar(slotInfo));
    }

    cancelSelectedSlotAction = () => {
        const { dispatch } = this.props;
        this.setState({
            showSelectEventAlert: false,
        });
        dispatch(setSelectedSlotFromCalendar(null));
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
)(ScheduleWorkout);

class SelectEventView extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6 pull-left">
                        <NavLink
                            to={routeCodes.ADD_SCHEDULE_WORKOUT}
                            className="btn btn-primary"
                        >
                            Add Workout
                        </NavLink>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Make Rest Day</button>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Assign Program</button>
                    </div>
                    <div className="col-md-6 pull-left">
                        <button type="button" className="btn btn-primary">Paste Workout</button>
                    </div>
                </div>
            </div>
        );
    }
}