import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from "redux-form";
import _ from 'lodash';
import moment from 'moment';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import bodyGraph from 'img/site/body-graph.png';
import { required } from '../../formValidation/validationRules';
import { showPageLoader } from '../../actions/pageLoader';
import { getUserBodyMeasurementRequest, getUserBodyMeasurementLogDatesRequest } from '../../actions/userBodyMeasurement';

class BodyMeasurementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectActionInit: false,
            logDate: new Date(),
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
        const { logDate } = this.state;
        const { logDates, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="row d-flex whitebox-body">
                    <div className="col-md-4">
                        <ul className="common-ul">
                            <li>
                                <Field
                                    name="neck"
                                    type="number"
                                    label="Neck"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Neck"
                                    validate={[required]}
                                    unitValue="cm"
                                />

                            </li>
                            <li>
                                <Field
                                    name="shoulders"
                                    type="number"
                                    label="Shoulders"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Shoulders"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="chest"
                                    type="number"
                                    label="Chest"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Chest"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="upper_arm"
                                    type="number"
                                    label="Upper Arm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Upper Arm"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="waist"
                                    type="number"
                                    label="Waist"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Waist"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="forearm"
                                    type="number"
                                    label="Forearm"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Forearm"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="hips"
                                    type="number"
                                    label="Hips"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Hips"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="thigh"
                                    type="number"
                                    label="Thigh"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Thigh"
                                    validate={[required]}
                                    unitValue="cm"
                                />
                            </li>
                            <li>
                                <Field
                                    name="calf"
                                    type="number"
                                    label="Calf"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Calf"
                                    validate={[required]}
                                    unitValue="cm"
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
                                    type="number"
                                    label="Weight"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Weight"
                                    validate={[required]}
                                    unitValue="kg"
                                />
                            </li>
                            <li>
                                <Field
                                    name="height"
                                    type="number"
                                    label="Height"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Height"
                                    validate={[required]}
                                    unitValue="cm"
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
            logDate
        } = this.state;
        const {
            loading,
            loadingLogDates,
            measurement,
            initialize,
            change,
            refreshBodyMeasurementForm,
            resetRefreshBodyMeasurementForm
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