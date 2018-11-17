import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import _ from 'lodash';
import moment from 'moment';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import bodyGraph from 'img/site/body-graph.png';
import { required, min, max, validNumber } from '../../formValidation/validationRules';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { getUserBodyMeasurementRequest, getUserBodyMeasurementLogDatesRequest } from '../../actions/userBodyMeasurement';
import { getLoggedUserProfileSettingsRequest } from '../../actions/profile';
import {
    MEASUREMENT_UNIT_CENTIMETER,
    MEASUREMENT_UNIT_KILOGRAM,
    MEASUREMENT_UNIT_GRAM,
    MEASUREMENT_UNIT_BPM,
} from '../../constants/consts';
import { convertUnits } from '../../helpers/funs';

const min0 = min(0);
const min20 = min(20);
const min50 = min(50);
const min44 = min(44);
const max60 = max(60);
const max120 = max(120);
const max270 = max(270);
const max40 = max(40);
const max240 = max(240);
const max80 = max(80);
const max310 = max(310);
const max200 = max(200);
const max100 = max(100);
const max250 = max(250);
const max1000 = max(1000);
const max600 = max(600);
const max24 = max(24);
const max48 = max(48);
const max108 = max(108);
const max16 = max(16);
const max96 = max(96);
const max32 = max(32);
const max124 = max(124);
const max2200 = max(2200);

class BodyMeasurementForm extends Component {
    constructor(props) {
        super(props);
        var logDate = new Date();
        logDate.setHours(0, 0, 0, 0);
        this.state = {
            selectActionInit: false,
            logDate,
            validationRules: {
                neck: [required, validNumber, min0, max60],
                shoulders: [required, validNumber, min0, max120],
                chest: [required, validNumber, min0, max270],
                upper_arm: [required, validNumber, min0, max40],
                waist: [required, validNumber, min0, max240],
                forearm: [required, validNumber, min0, max80],
                hips: [required, validNumber, min0, max310],
                thigh: [required, validNumber, min0, max200],
                calf: [required, validNumber, min0, max100],
                heartRate: [required, validNumber, min0, max250],
                weight: [required, validNumber, min20, max1000],
                height: [required, validNumber, min50, max600],
            }
        }
    }

    componentWillMount() {
        const { logDate } = this.state;
        const { change, dispatch } = this.props;
        change('log_date', logDate);
        let requestData = {
            logDate
        }
        this.getBodyMeasurementLogData(requestData);
        dispatch(getLoggedUserProfileSettingsRequest());
    }

    render() {
        const { logDate, validationRules } = this.state;
        const { logDates, handleSubmit, profileSettings } = this.props;
        var bodyMeasurement = MEASUREMENT_UNIT_CENTIMETER;
        var weighUnit = MEASUREMENT_UNIT_KILOGRAM;
        var heartRateUnit = MEASUREMENT_UNIT_BPM;
        if (profileSettings) {
            bodyMeasurement = profileSettings.bodyMeasurement;
            weighUnit = profileSettings.weight;
        }
        return (
            <form onSubmit={handleSubmit}>
                <div className="row d-flex whitebox-body">
                    <div className="col-md-4">
                        <ul className="common-ul">
                            <li>
                                <Field
                                    name="neck"
                                    type="text"
                                    label="Neck"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Neck"
                                    validate={(validationRules.neck) ? validationRules.neck : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />

                            </li>
                            <li>
                                <Field
                                    name="shoulders"
                                    type="text"
                                    label="Shoulders"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Shoulders"
                                    validate={(validationRules.shoulders) ? validationRules.shoulders : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="chest"
                                    type="text"
                                    label="Chest"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Chest"
                                    validate={(validationRules.chest) ? validationRules.chest : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="upper_arm"
                                    type="text"
                                    label="Upper Arm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Upper Arm"
                                    validate={(validationRules.upper_arm) ? validationRules.upper_arm : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="waist"
                                    type="text"
                                    label="Waist"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Waist"
                                    validate={(validationRules.waist) ? validationRules.waist : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="forearm"
                                    type="text"
                                    label="Forearm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Forearm"
                                    validate={(validationRules.forearm) ? validationRules.forearm : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="hips"
                                    type="text"
                                    label="Hips"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Hips"
                                    validate={(validationRules.hips) ? validationRules.hips : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="thigh"
                                    type="text"
                                    label="Thigh"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Thigh"
                                    validate={(validationRules.thigh) ? validationRules.thigh : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="calf"
                                    type="text"
                                    label="Calf"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Calf"
                                    validate={(validationRules.calf) ? validationRules.calf : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="heartRate"
                                    type="text"
                                    label="Heart Rate"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Heart Rate"
                                    validate={(validationRules.heartRate) ? validationRules.heartRate : [required, validNumber]}
                                    unitValue={heartRateUnit}
                                    autoComplete="off"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <div className="whitebody-graph">
                            <img src={bodyGraph} alt="Body" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ul className="common-ul">
                            <li>
                                <Field
                                    name="weight"
                                    type="text"
                                    label="Weight"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Weight"
                                    validate={(validationRules.weight) ? validationRules.weight : [required, validNumber]}
                                    unitValue={weighUnit}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="height"
                                    type="text"
                                    label="Height"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Height"
                                    validate={(validationRules.height) ? validationRules.height : [required, validNumber]}
                                    unitValue={bodyMeasurement}
                                    autoComplete="off"
                                />
                            </li>
                        </ul>
                        <div className="log-date">
                            <div className="log-date-head d-flex">
                                <h4>Log Date</h4>
                                {/* <a href="" className="ml-auto">October</a> */}
                            </div>
                            <div className="log-date-wrap">
                                <ReactCalender
                                    name="log_date"
                                    onChange={this.onChangeLogDate}
                                    onActiveDateChange={this.onActiveDateChange}
                                    onClickMonth={this.onMonthClick}
                                    value={logDate}
                                    maxDate={new Date()}
                                    tileContent={({ date, view }) => {
                                        if (view !== 'month') {
                                            return '';
                                        }
                                        return _.map(logDates, (o, key) => {
                                            let calDate = moment(date).format('YYYY-MM-DD');
                                            let logDate = moment(o.logDate).format('YYYY-MM-DD');
                                            if (calDate === logDate) {
                                                return (<span key={key} className="react-calendar__tile--highlight"></span>)
                                            }
                                            return '';
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="add-log d-flex">
                            <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            selectActionInit,
            logDate
        } = this.state;
        const {
            loading,
            loadingLogDates,
            measurement,
            initialize,
            change,
            refreshBodyMeasurementForm,
            resetRefreshBodyMeasurementForm,
            dispatch,
            profileSettings,
        } = this.props;
        var bodyUnit = MEASUREMENT_UNIT_CENTIMETER;
        var weightUnit = MEASUREMENT_UNIT_KILOGRAM;
        if (profileSettings) {
            bodyUnit = profileSettings.bodyMeasurement;
            weightUnit = profileSettings.weight;
        }
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            if (measurement && Object.keys(measurement).length > 0) {
                let measurementData = {
                    neck: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.neck).toFixed(2),
                    shoulders: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.shoulders).toFixed(2),
                    chest: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.chest).toFixed(2),
                    upper_arm: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.upperArm).toFixed(2),
                    waist: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.waist).toFixed(2),
                    forearm: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.forearm).toFixed(2),
                    hips: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.hips).toFixed(2),
                    thigh: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.thigh).toFixed(2),
                    calf: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.calf).toFixed(2),
                    heartRate: (measurement.heartRate) ? measurement.heartRate : 0,
                    weight: convertUnits(MEASUREMENT_UNIT_GRAM, weightUnit, measurement.weight).toFixed(2),
                    height: convertUnits(MEASUREMENT_UNIT_CENTIMETER, bodyUnit, measurement.height).toFixed(2),
                    log_date: new Date(measurement.logDate),
                }
                initialize(measurementData);
            } else {
                initialize({});
                change('log_date', logDate);
                this.setState({ logDate: logDate });
            }
            this.setValidationRules();
            dispatch(hidePageLoader());
        }
        if (refreshBodyMeasurementForm && !loading) {
            resetRefreshBodyMeasurementForm();
            let requestData = {
                logDate,
            }
            this.getBodyMeasurementLogData(requestData);
        }
    }

    getBodyMeasurementLogData = (requestData) => {
        const { dispatch } = this.props;
        this.setState({
            selectActionInit: true
        });
        dispatch(showPageLoader());
        dispatch(getUserBodyMeasurementRequest(requestData));
        dispatch(getUserBodyMeasurementLogDatesRequest(requestData));
    }

    onChangeLogDate = (date) => {
        const { logDate } = this.state;
        if (moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')) {
            this.setState({
                logDate: date
            });
            this.props.change('log_date', date);
            let requestData = {
                logDate: date,
            }
            this.getBodyMeasurementLogData(requestData);
        }
    }

    onMonthClick = (date) => {
        const { change } = this.props;
        let now = new Date();
        let requestData = {};
        if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
            this.setState({ logDate: now });
            change('log_date', now);
            requestData = {
                logDate: now,
            }
        } else {
            this.setState({ logDate: date });
            change('log_date', date);
            requestData = {
                logDate: date,
            }
        }
        this.getBodyMeasurementLogData(requestData);
    }

    onActiveDateChange = (obj) => {
        const { change } = this.props;
        if (obj.view === "month") {
            let date = obj.activeStartDate;
            let now = new Date();
            let requestData = {};
            if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
                this.setState({ logDate: now });
                change('log_date', now);
                requestData = {
                    logDate: now,
                }
            } else {
                this.setState({ logDate: date });
                change('log_date', date);
                requestData = {
                    logDate: date,
                }
            }
            this.getBodyMeasurementLogData(requestData);
        }
    }

    setValidationRules = () => {
        const { profileSettings } = this.props;
        var validationRules = {
            neck: [required, validNumber, min0, max60],
            shoulders: [required, validNumber, min0, max120],
            chest: [required, validNumber, min0, max270],
            upper_arm: [required, validNumber, min0, max40],
            waist: [required, validNumber, min0, max240],
            forearm: [required, validNumber, min0, max80],
            hips: [required, validNumber, min0, max310],
            thigh: [required, validNumber, min0, max200],
            calf: [required, validNumber, min0, max100],
            heartRate: [required, validNumber, min0, max250],
            weight: [required, validNumber, min20, max1000],
            height: [required, validNumber, min50, max600],
        };
        if (profileSettings) {
            if (profileSettings.bodyMeasurement !== MEASUREMENT_UNIT_CENTIMETER) {
                validationRules.neck = [required, validNumber, min0, max24];
                validationRules.shoulders = [required, validNumber, min0, max48];
                validationRules.chest = [required, validNumber, min0, max108];
                validationRules.upper_arm = [required, validNumber, min0, max16];
                validationRules.waist = [required, validNumber, min0, max96];
                validationRules.forearm = [required, validNumber, min0, max32];
                validationRules.hips = [required, validNumber, min0, max124];
                validationRules.thigh = [required, validNumber, min0, max80];
                validationRules.calf = [required, validNumber, min0, max40];
                validationRules.height = [required, validNumber, min20, max240];
            }
            if (profileSettings.weight !== MEASUREMENT_UNIT_KILOGRAM) {
                validationRules.weight = [required, validNumber, min44, max2200];
            }
        }
        this.setState({ validationRules });
    }
}

BodyMeasurementForm = reduxForm({
    form: 'userBodyMeasurement'
})(BodyMeasurementForm);

const mapStateToProps = (state) => {
    const { userBodyMeasurement, profile } = state;
    return {
        loading: userBodyMeasurement.get('loading'),
        error: userBodyMeasurement.get('error'),
        measurement: userBodyMeasurement.get('measurement'),
        loadingLogDates: userBodyMeasurement.get('loadingLogDates'),
        errorLogDates: userBodyMeasurement.get('errorLogDates'),
        logDates: userBodyMeasurement.get('logDates'),
        profileSettings: profile.get('settings'),
    }
}

export default connect(mapStateToProps)(BodyMeasurementForm);

const InputField = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, type, unitValue } = props;
    return (
        <div>
            <div
                className={
                    `${wrapperClass} ${(meta.touched && meta.error) ? 'has-error' : ''}`
                }
            >
                <label htmlFor={input.name} className={labelClass}>{label}</label>
                <input
                    {...input}
                    type={type ? type : 'text'}
                    className={className}
                    placeholder={placeholder}
                />
                <div className="cm-kg">{unitValue}</div>
            </div>
            {meta.touched &&
                ((meta.error && <div className={errorClass}>{meta.error}</div>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}