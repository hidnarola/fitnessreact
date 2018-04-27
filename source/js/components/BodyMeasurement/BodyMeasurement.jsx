import React, { Component } from 'react';
import { connect } from "react-redux";
import BodyMeasurementForm from './BodyMeasurementForm';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { saveUserBodyMeasurementRequest } from '../../actions/userBodyMeasurement';
import moment from 'moment';
import { ts } from '../../helpers/funs';

class BodyMeasurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
            refreshBodyMeasurementForm: false,
        }
    }

    render() {
        const { refreshBodyMeasurementForm } = this.state;
        return (
            <div className="body-measurement-list-section-wrapper">
                <div className="body-head d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Your Body</h2>
                        <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                            you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                    </div>
                    <div className="body-head-r">
                        <a href="" className="white-btn">Enter Body Fat</a>
                        <a href="" className="pink-btn">Add Progress Photo</a>
                    </div>
                </div>
                <div className="body-content">
                    <div className="white-box">
                        <div className="whitebox-head">
                            <h3 className="title-h3">Body measurements</h3>
                        </div>

                        <BodyMeasurementForm
                            refreshBodyMeasurementForm={refreshBodyMeasurementForm}
                            onSubmit={this.handleSubmit}
                            resetRefreshBodyMeasurementForm={this.resetRefreshBodyMeasurementForm}
                        />

                    </div>

                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { saveActionInit } = this.state;
        const { loading, dispatch } = this.props;
        if (saveActionInit && !loading) {
            this.setState({
                saveActionInit: false,
                refreshBodyMeasurementForm: true,
            });
            ts('Body measurement saved successfully!');
            dispatch(hidePageLoader());
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        this.setState({ saveActionInit: true });
        let measurementData = {
            logDate: data.log_date.toUTCString(),
            neck: data.neck,
            shoulders: data.shoulders,
            chest: data.chest,
            upperArm: data.upper_arm,
            waist: data.waist,
            forearm: data.forearm,
            hips: data.hips,
            thigh: data.thigh,
            calf: data.calf,
            weight: data.weight,
            height: data.height,
        }
        dispatch(showPageLoader());
        dispatch(saveUserBodyMeasurementRequest(measurementData));
    }

    resetRefreshBodyMeasurementForm = () => {
        this.setState({ refreshBodyMeasurementForm: false });
    }
}

const mapStateToProps = (state) => {
    const { userBodyMeasurement } = state;
    return {
        loading: userBodyMeasurement.get('loading'),
        error: userBodyMeasurement.get('error')
    }
}

export default connect()(BodyMeasurement);