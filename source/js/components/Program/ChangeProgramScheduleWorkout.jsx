import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import ChangeScheduleWorkoutForm from '../ScheduleWorkout/ChangeScheduleWorkoutForm';
import { MEASUREMENT_UNIT_KILOMETER, MEASUREMENT_UNIT_METER, MEASUREMENT_UNIT_MILE, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_POUND } from '../../constants/consts';

const distanceUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOMETER, label: "Kilometers" },
    { value: MEASUREMENT_UNIT_MILE, label: "Miles" },
    { value: MEASUREMENT_UNIT_METER, label: "Meters" },
]

const weightUnitsOptions = [
    { value: MEASUREMENT_UNIT_KILOGRAM, label: "Kilograms" },
    { value: MEASUREMENT_UNIT_POUND, label: "Pounds" },
]

class ChangeProgramScheduleWorkout extends Component {
    render() {
        const { selectedWorkoutForEdit } = this.props;
        if (selectedWorkoutForEdit) {
            return (
                <div className="fitness-body">
                    <FitnessHeader />
                    <FitnessNav />
                    <section className="body-wrap">
                        <div className="body-head d-flex justify-content-start">
                            <div className="body-head-l">
                                <h2>{selectedWorkoutForEdit.title}</h2>
                                <p>{selectedWorkoutForEdit.description}</p>
                            </div>
                        </div>
                        <div className="body-content d-flex row justify-content-start profilephoto-content">
                            <div className="col-md-12">
                                <div className="white-box space-btm-20">
                                    <div className="whitebox-body profile-body">
                                        {/* <ChangeScheduleWorkoutForm onSubmit={this.handleSubmit} /> */}
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

    handleSubmit = (data) => {}
}

const mapStateToProps = (state) => {
    const { userPrograms } = state;
    return {
        selectedWorkoutForEdit: userPrograms.get('selectedWorkoutForEdit'),
        exercises: userPrograms.get('exercises'),
    };
}

export default connect(
    mapStateToProps,
)(ChangeProgramScheduleWorkout);