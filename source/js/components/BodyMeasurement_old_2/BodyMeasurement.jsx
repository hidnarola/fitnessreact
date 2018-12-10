import React, { Component } from 'react';
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { reset, Field, reduxForm, initialize } from "redux-form";
import BodyMeasurementForm from './BodyMeasurementForm';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { saveUserBodyMeasurementRequest, saveUserBodyFatRequest } from '../../actions/userBodyMeasurement';
import moment from 'moment';
import { ts } from '../../helpers/funs';
import { addUserProgressPhotoRequest } from '../../actions/userProgressPhotos';
import AddProgressPhotoModal from '../Common/AddProgressPhotoModal';
import BodyFatModal from './BodyFatModal';
import { LOCALSTORAGE_USER_DETAILS_KEY, FITASSIST_USER_DETAILS_TOKEN_KEY, GENDER_MALE } from '../../constants/consts';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import jwt from "jwt-simple";
import CalculatorIcon from "svg/calculator.svg";

class BodyMeasurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveActionInit: false,
            refreshBodyMeasurementForm: false,
            showAddProgressPhotoModal: false,
            saveProgressPhotoActionInit: false,
            showBodyFatModal: false,
            saveBodyFatInit: false,
        }
    }

    render() {
        const {
            refreshBodyMeasurementForm,
            showAddProgressPhotoModal,
            showBodyFatModal,
            saveProgressPhotoActionInit
        } = this.state;
        const { error } = this.props;
        return (
            <div className="body-measurement-list-section-wrapper">
                <div className="body-head d-flex justify-content-start">
                    <div className="body-head-l">
                        <h2>Your Body</h2>
                        <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                            you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                            on track and meeting the goals you’ve set out for yourself.</p>
                    </div>
                </div>
                <div className="body-content d-flex">
                    <div className="row">
                    <div className="col-md-8">
                        <ul className="common-ul common_ul_body">
                            <li>
                                <Field
                                    name="weight"
                                    type="text"
                                    label="Weight"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Weight"
                                    unitValue={"kg"}
                                    autoComplete="off"
                                />
                            </li>
                            <li>
                                <Field
                                    name="height"
                                    type="text"
                                    label="Body Fat"
                                    parentWrapper="body-fat-control-wrap"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Body Fat"
                                    unitValue={"%"}
                                    autoComplete="off"
                                >
                                    <span className="body-pg-calc"><CalculatorIcon /></span>
                                </Field>
                            </li>
                        </ul>
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Body measurements</h3>
                            </div>

                            {error && error.length > 0 &&
                                <Alert bsStyle="danger">
                                    {error.map((o, i) => (<p key={i}>{o}</p>))}
                                </Alert>
                            }

                            <BodyMeasurementForm
                                refreshBodyMeasurementForm={refreshBodyMeasurementForm}
                                onSubmit={this.handleSubmit}
                                resetRefreshBodyMeasurementForm={this.resetRefreshBodyMeasurementForm}
                            />

                            <AddProgressPhotoModal
                                onSubmit={this.handleProgressPhotoSubmit}
                                show={showAddProgressPhotoModal}
                                handleClose={this.handleCloseAddProgressPhotoModal}
                                isLoading={saveProgressPhotoActionInit}
                            />

                            <BodyFatModal
                                show={showBodyFatModal}
                                handleClose={this.handleCloseBodyFatModal}
                                onSubmit={this.handleBodyFatSubmit}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                           <div className="daily_img_wrapper">
                            <div className="whitebox-head"><h3 className="title-h3">Body measurements</h3></div>
                            <div className="add-log d-flex"><button type="submit" className="ml-auto">Add Photo</button></div>
                           </div> 
                        <div className="log-date">
                            <div className="log-date-head d-flex">
                                <h4>Log Date</h4>
                            </div>
                            <div className="log-date-wrap">
                                <ReactCalender
                                    name="log_date"
                                    onChange={() => this.onChangeLogDate}
                                    onActiveDateChange={() => this.onActiveDateChange}
                                    onClickMonth={() => this.onMonthClick}
                                />
                            </div>
                        </div>
                        <div className="add-log d-flex add-log_change">
                            <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { saveActionInit, saveProgressPhotoActionInit, saveBodyFatInit } = this.state;
        const { loading, dispatch, progressPhotoloading, error } = this.props;
        if (saveActionInit && !loading) {
            let newState = { saveActionInit: false };
            if (error && error.length <= 0) {
                newState.refreshBodyMeasurementForm = true;
                ts('Body measurement saved successfully!');
            }
            this.setState(newState);
            dispatch(hidePageLoader());
        }
        if (saveBodyFatInit && !loading) {
            let newState = { saveBodyFatInit: false };
            if (error && error.length <= 0) {
                newState.refreshBodyMeasurementForm = true;
                ts('Body fat saved successfully!');
            }
            this.setState(newState);
            this.handleCloseBodyFatModal();
            dispatch(hidePageLoader());
        }
        if (saveProgressPhotoActionInit && !progressPhotoloading) {
            this.setState({ saveProgressPhotoActionInit: false });
            if (error && error.length <= 0) {
                ts('Progress photo saved successfully!');
            }
            this.handleCloseAddProgressPhotoModal();
            dispatch(hidePageLoader());
        }
    }

    handleSubmit = (data) => {
        const { dispatch } = this.props;
        this.setState({ saveActionInit: true });
        let measurementData = {
            logDate: moment(data.log_date).startOf().utc(),
            neck: data.neck,
            shoulders: data.shoulders,
            chest: data.chest,
            upperArm: data.upper_arm,
            waist: data.waist,
            forearm: data.forearm,
            hips: data.hips,
            thigh: data.thigh,
            calf: data.calf,
            heartRate: data.heartRate,
            weight: data.weight,
            height: data.height,
        }
        dispatch(showPageLoader());
        dispatch(saveUserBodyMeasurementRequest(measurementData));
    }

    resetRefreshBodyMeasurementForm = () => {
        this.setState({ refreshBodyMeasurementForm: false });
    }

    handleShowAddProgressPhotoModal = () => {
        const { dispatch } = this.props;
        this.setState({
            showAddProgressPhotoModal: true
        });
        dispatch(reset('addProgressPhotoModalForm'));
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var initialFormData = {
            photo_date: now,
        }
        dispatch(initialize('addProgressPhotoModalForm', initialFormData));
    }

    handleCloseAddProgressPhotoModal = () => {
        const { dispatch } = this.props;
        this.setState({
            showAddProgressPhotoModal: false
        });
        dispatch(reset('addProgressPhotoModalForm'));
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var initialFormData = {
            photo_date: now,
        }
        dispatch(initialize('addProgressPhotoModalForm', initialFormData));
    }

    handleProgressPhotoSubmit = (data) => {
        const { dispatch } = this.props;
        this.setState({ saveProgressPhotoActionInit: true });
        var formData = new FormData();
        formData.append('description', (data.description) ? data.description : '');
        formData.append('date', data.photo_date);
        if (data.photo) {
            formData.append('image', data.photo[0]);
        }
        dispatch(showPageLoader());
        dispatch(addUserProgressPhotoRequest(formData));
    }

    handleShowBodyFatModal = () => {
        const { dispatch, bodyFat } = this.props;
        this.setState({ showBodyFatModal: true });
        let encUserDetails = localStorage.getItem(LOCALSTORAGE_USER_DETAILS_KEY);
        let userDetails = jwt.decode(encUserDetails, FITASSIST_USER_DETAILS_TOKEN_KEY);
        let dob = (userDetails.dateOfBirth) ? userDetails.dateOfBirth : null;
        let gender = (userDetails.gender) ? userDetails.gender : GENDER_MALE;
        let diff = moment().diff(dob, 'years');
        let formData = {};
        if (bodyFat) {
            formData.site1 = (bodyFat.site1) ? bodyFat.site1 : '';
            formData.site2 = (bodyFat.site2) ? bodyFat.site2 : '';
            formData.site3 = (bodyFat.site3) ? bodyFat.site3 : '';
            formData.bodyFat = (bodyFat.bodyFatPer) ? bodyFat.bodyFatPer : '';
        }
        if (diff) {
            formData.age = diff;
            formData.hidden_age = diff;
            formData.gender = gender;
        } else {
            formData.age = (bodyFat.age) ? bodyFat.age : '';;
            formData.gender = gender;
        }
        dispatch(initialize('saveBodyFatForm', formData));
    }

    handleCloseBodyFatModal = () => {
        const { dispatch } = this.props;
        this.setState({ showBodyFatModal: false });
        dispatch(reset('saveBodyFatForm'));
    }

    handleBodyFatSubmit = (data) => {
        const { dispatch } = this.props;
        this.setState({ saveBodyFatInit: true });
        let requestData = {
            logDate: moment(data.log_date).startOf('day').utc(),
            site1: data.site1,
            site2: data.site2,
            site3: data.site3,
            bodyFatPer: data.bodyFat,
            age: data.age,
        }
        dispatch(showPageLoader());
        dispatch(saveUserBodyFatRequest(requestData));
    }

}

const mapStateToProps = (state) => {
    const { userBodyMeasurement, userProgressPhotos } = state;
    return {
        loading: userBodyMeasurement.get('loading'),
        error: userBodyMeasurement.get('error'),
        bodyFat: userBodyMeasurement.get('bodyFat'),
        progressPhotoloading: userProgressPhotos.get('loading'),
    }
}

BodyMeasurement = reduxForm({
    form: "testing"
})(BodyMeasurement)

export default connect(mapStateToProps)(BodyMeasurement);

const InputField = (props) => {
    const { label, input, meta, parentWrapper, wrapperClass, className, labelClass, placeholder, errorClass, type, unitValue, children } = props;
    return (
        <div className={
            `${parentWrapper ? parentWrapper : ''}`
        }>
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
            {children}
        </div>
    );
}