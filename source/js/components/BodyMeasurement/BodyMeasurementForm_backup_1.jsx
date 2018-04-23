import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import _ from 'lodash';
import moment from 'moment';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import bodyGraph from 'img/site/body-graph.png';
import { InputField } from '../../helpers/FormControlHelper';
import { required } from '../../formValidation/validationRules';
import { showPageLoader } from '../../actions/pageLoader';
import { getUserBodyMeasurementRequest, getUserBodyMeasurementLogDatesRequest } from '../../actions/userBodyMeasurement';

class BodyMeasurementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            logDate: new Date(),
            selectLogDatesActionInit: false,
            logDates: [],
        }
    }

    componentWillMount() {
        const { logDate } = this.state;
        const { change } = this.props;
        change('log_date', logDate);
        let requestData = {
            logDate
        }
        this.getBodyMeasurementLogData(requestData);
    }

    render() {
        const { logDate, logDates } = this.state;
        console.log(logDates);
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="row d-flex whitebox-body">
                    <div className="col-md-4">
                        <ul className="common-ul">
                            <li>
                                <Field
                                    name="neck"
                                    label="Neck"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Neck"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="shoulders"
                                    label="Shoulders"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Shoulders"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="chest"
                                    label="Chest"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Chest"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="upper_arm"
                                    label="Upper Arm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Upper Arm"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="waist"
                                    label="Waist"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Waist"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="forearm"
                                    label="Forearm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Forearm"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="hips"
                                    label="Hips"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Hips"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="thigh"
                                    label="Thigh"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Thigh"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="calf"
                                    label="Calf"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Calf"
                                    validate={[required]}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <div className="whitebody-graph">
                            <img src={bodyGraph} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ul className="common-ul">
                            <li>
                                <Field
                                    name="weight"
                                    label="Weight"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Weight"
                                    validate={[required]}
                                />
                            </li>
                            <li>
                                <Field
                                    name="height"
                                    label="Height"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Height"
                                    validate={[required]}
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
            logDate,
            selectLogDatesActionInit
        } = this.state;
        const {
            loading,
            loadingLogDates,
            measurement,
            initialize,
            change,
            refreshBodyMeasurementForm,
            resetRefreshBodyMeasurementForm,
            logDates
        } = this.props;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            if (measurement && Object.keys(measurement).length > 0) {
                let measurementData = {
                    neck: measurement.neck,
                    shoulders: measurement.shoulders,
                    chest: measurement.chest,
                    upper_arm: measurement.upperArm,
                    waist: measurement.waist,
                    forearm: measurement.forearm,
                    hips: measurement.hips,
                    thigh: measurement.thigh,
                    calf: measurement.calf,
                    weight: measurement.weight,
                    height: measurement.height,
                    log_date: new Date(measurement.logDate),
                }
                initialize(measurementData);
                this.setState({ logDate: new Date(measurement.logDate) });
            } else {
                initialize({});
                change('log_date', logDate);
                this.setState({ logDate: logDate });
            }
        }
        if (refreshBodyMeasurementForm && !loading) {
            resetRefreshBodyMeasurementForm();
            let requestData = {
                logDate,
            }
            this.getBodyMeasurementLogData(requestData);
        }
        if (selectLogDatesActionInit && !loadingLogDates) {
            this.setState({
                selectLogDatesActionInit: false,
                logDates: logDates,
            });
        }
    }

    getBodyMeasurementLogData = (requestData) => {
        const { dispatch } = this.props;
        this.setState({
            selectActionInit: true,
            selectLogDatesActionInit: true,
        });
        dispatch(showPageLoader());
        dispatch(getUserBodyMeasurementRequest(requestData));
        dispatch(getUserBodyMeasurementLogDatesRequest(requestData));
    }

    getBodyMeasurementLogDates = (requestData) => {
        const { dispatch } = this.props;
        this.setState({
            selectLogDatesActionInit: true,
        });
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
        let requestData = {
            logDate: date,
        }
        this.getBodyMeasurementLogDates(requestData);
    }

    onActiveDateChange = (obj) => {
        if (obj.view === "month") {
            let date = obj.activeStartDate;
            let requestData = {
                logDate: date,
            }
            this.getBodyMeasurementLogDates(requestData);
        }
    }
}

BodyMeasurementForm = reduxForm({
    form: 'userBodyMeasurement'
})(BodyMeasurementForm);

const mapStateToProps = (state) => {
    const { userBodyMeasurement } = state;
    return {
        loading: userBodyMeasurement.get('loading'),
        error: userBodyMeasurement.get('error'),
        measurement: userBodyMeasurement.get('measurement'),
        loadingLogDates: userBodyMeasurement.get('loadingLogDates'),
        errorLogDates: userBodyMeasurement.get('errorLogDates'),
        logDates: userBodyMeasurement.get('logDates'),
    }
}

export default connect(mapStateToProps)(BodyMeasurementForm);