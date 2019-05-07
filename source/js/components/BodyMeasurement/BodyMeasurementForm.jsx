import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import _ from 'lodash';
import moment from 'moment';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import bodyGraph from 'img/site/body-graph.png';
import { required, min, max, validNumber } from '../../formValidation/validationRules';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { getUserBodyMeasurementRequest, getUserBodyMeasurementLogDatesRequest, setUserBodyMeasurementState } from '../../actions/userBodyMeasurement';
import { getLoggedUserProfileSettingsRequest } from '../../actions/profile';
import { MEASUREMENT_UNIT_CENTIMETER, MEASUREMENT_UNIT_KILOGRAM, MEASUREMENT_UNIT_GRAM, MEASUREMENT_UNIT_BPM, SERVER_BASE_URL, PROGRESS_PHOTO_CATEGORIES, PROGRESS_PHOTO_BASICS, PROGRESS_PHOTO_POSED } from '../../constants/consts';
import { convertUnits, te, ts, connectIDB, isOnline } from '../../helpers/funs';
import CalculatorIcon from "svg/calculator.svg";
import { Alert } from "react-bootstrap";
import SlickSlider from '../Common/SlickSlider';
import NoRecordFound from '../Common/NoRecordFound';
import noImg from 'img/common/no-img.png';
import { IDB_TBL_BODY_MEASUREMENT, IDB_TBL_BODY_LOGDATES, IDB_READ_WRITE, IDB_READ, IDB_TBL_BODY_FAT, IDB_TBL_BODY_PP } from '../../constants/idb';

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
                body_fat: [validNumber, min0, max100],
            }
        }
        this.iDB;
    }

    componentWillMount() {
        const { logDate } = this.state;
        const { change, dispatch } = this.props;
        change('log_date', logDate);
        let requestData = { logDate }
        if (isOnline()) {
            this.getBodyMeasurementLogData(requestData);
            dispatch(getLoggedUserProfileSettingsRequest());
        }
    }

    render() {
        const { logDate, validationRules } = this.state;
        const {
            logDates,
            handleSubmit,
            profileSettings,
            error,
            handleShowBodyFatModal,
            handleShowAddProgressPhotoModal,
            userProgressPhotos,
            loadingProgressPhotos,
            bodyparts
        } = this.props;
        var bodyMeasurement = MEASUREMENT_UNIT_CENTIMETER;
        var weighUnit = MEASUREMENT_UNIT_KILOGRAM;
        var heartRateUnit = MEASUREMENT_UNIT_BPM;
        if (profileSettings) {
            bodyMeasurement = profileSettings.bodyMeasurement;
            weighUnit = profileSettings.weight;
        }
        let totalProgressPhotos = 0;
        if (userProgressPhotos) {
            userProgressPhotos.map((o) => {
                totalProgressPhotos += o.user_progress_photos ? o.user_progress_photos.length : 0;
            });
        }
        return (
            <form onSubmit={handleSubmit}>
                {error && error.length > 0 &&
                    <Alert bsStyle="danger">
                        {error.map((o, i) => (<p key={i}>{o}</p>))}
                    </Alert>
                }
                <div className="row">
                    <div className="col-md-8 col-sm-8 col-xs-12">
                        <ul className="common-ul common_ul_body body-log-upper-textbox">
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
                                    name="bodyfat"
                                    type="text"
                                    label="Body Fat"
                                    parentWrapper="body-fat-control-wrap"
                                    wrapperClass="grey-white"
                                    component={InputField}
                                    errorClass="help-block"
                                    placeholder="Body Fat"
                                    validate={(validationRules.body_fat) ? validationRules.body_fat : [validNumber]}
                                    unitValue={"%"}
                                    autoComplete="off"
                                >
                                    <span className="body-pg-calc cursor-pointer" onClick={handleShowBodyFatModal}><CalculatorIcon /></span>
                                </Field>
                                <Field name="age" type="hidden" component="input" />
                                <Field name="site1" type="hidden" component="input" />
                                <Field name="site2" type="hidden" component="input" />
                                <Field name="site3" type="hidden" component="input" />
                            </li>
                        </ul>
                        <div className="white-box">
                            <div className="whitebox-head">
                                <h3 className="title-h3">Measurements</h3>
                            </div>

                            <div className="row d-flex whitebox-body">
                                <div className="col-md-6 col-sm-6 measurements-wrap">
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
                                <div className="col-md-6 col-sm-6 measurements-img-wrap">
                                    <div className="whitebody-graph">
                                        <img src={bodyGraph} alt="Body" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="daily_img_wrapper">
                            <div className="whitebox-head"><h3 className="title-h3">Progress Photos</h3></div>
                            {!loadingProgressPhotos && userProgressPhotos && userProgressPhotos.length > 0 &&
                                <SlickSlider settings={{ slidesToShow: (totalProgressPhotos > 3) ? 3 : 1 }}>
                                    {
                                        userProgressPhotos.map((o) => {
                                            let photos = o.user_progress_photos ? o.user_progress_photos : [];
                                            return photos.map((co) => {
                                                let caption = co.caption ? co.caption : "";
                                                let category = co.category ? co.category : "";
                                                let selectedCategory = _.find(PROGRESS_PHOTO_CATEGORIES, ["value", category]);
                                                let selectedSubCategory = null;
                                                if (selectedCategory) {
                                                    switch (selectedCategory.value) {
                                                        case "basic":
                                                            selectedSubCategory = _.find(PROGRESS_PHOTO_BASICS, ["value", co.basic]);
                                                            break;
                                                        case "isolation":
                                                            let bodypartOptions = [];
                                                            if (bodyparts && bodyparts.length > 0) {
                                                                bodyparts.map((o) => {
                                                                    bodypartOptions.push({ value: o._id, label: o.bodypart });
                                                                });
                                                            }
                                                            selectedSubCategory = _.find(bodypartOptions, ["value", co.isolation]);
                                                            break;
                                                        case "posed":
                                                            selectedSubCategory = _.find(PROGRESS_PHOTO_POSED, ["value", co.posed]);
                                                            break;
                                                    }
                                                }
                                                let imgStyle = {};
                                                let liStyle = {};
                                                if (totalProgressPhotos <= 3) {
                                                    imgStyle['minWidth'] = 320;
                                                    liStyle['fontSize'] = 12;
                                                }
                                                return (
                                                    <div className="fitly-slick-slider-item" key={co._id}>
                                                        <a href="javascript:void(0)">
                                                            <img
                                                                src={`${SERVER_BASE_URL}${co.image}`}
                                                                alt="Progress Photo"
                                                                onError={(e) => {
                                                                    e.target.src = noImg
                                                                }}
                                                                style={imgStyle}
                                                            />
                                                            <ul className="uploade-data">
                                                                {selectedCategory ? <li className="sm-img" style={liStyle}>{selectedCategory.label}</li> : ""}
                                                                {selectedSubCategory ? <li className="sm-img" style={liStyle}>{selectedSubCategory.label}</li> : ""}
                                                                {caption && <li className="sm-img" style={liStyle}>{caption}</li>}
                                                            </ul>
                                                        </a>
                                                    </div>
                                                )
                                            });
                                        })
                                    }
                                </SlickSlider>
                            }
                            {!loadingProgressPhotos && userProgressPhotos && userProgressPhotos.length <= 0 &&
                                <NoRecordFound wrapper_class="mb-30" title_class="fs-20" title="No progress photos for the day" icon_class="fs-50 icon-error_outline" />
                            }
                            <div className="add-log d-flex"><button type="button" onClick={handleShowAddProgressPhotoModal} className="ml-auto">Add Photo</button></div>
                        </div>
                        <div className="log-date">
                            <div className="log-date-head d-flex">
                                <h4>Log Date</h4>
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
                        <div className="add-log d-flex add-log_change">
                            <button type="submit" className="ml-auto">Save Log <i className="icon-control_point"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    componentDidMount() {
        if (window.indexedDB) {
            connectIDB()().then((connection) => {
                this.handleIDBOpenSuccess(connection);
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectActionInit, logDate, loadingLogDates } = this.state;
        const { loading, measurement, userProgressPhotos, refreshBodyMeasurementForm, resetRefreshBodyMeasurementForm, dispatch, bodyFat } = this.props;
        if (selectActionInit && !loading) {
            this.setState({ selectActionInit: false });
            if (measurement && Object.keys(measurement).length > 0) {
                this.initializeBodyMeasurementFormData(measurement);
                this.storeBodyMeasurementInIDB(measurement);
            } else {
                this.initializeBodyMeasurementFormData();
                this.setState({ logDate: logDate });
            }
            if (bodyFat && Object.keys(bodyFat).length > 0) {
                this.initializeBodyFatFormData(bodyFat);
                this.storeBodyFatInIDB(bodyFat);
            } else {
                this.initializeBodyFatFormData(bodyFat);
            }
            if (userProgressPhotos && userProgressPhotos.length > 0) {
                for (const photo of userProgressPhotos) {
                    this.storeBodyProgressPhotosInIDB(photo);
                }
            }
            if (!loadingLogDates && prevProps.loadingLogDates !== loadingLogDates) {
                this.storeLogDates()
            }
            this.setValidationRules();
            dispatch(hidePageLoader());
        }
        if (refreshBodyMeasurementForm && !loading) {
            resetRefreshBodyMeasurementForm();
            let requestData = { logDate }
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
            this.setState({ logDate: date });
            this.props.change('log_date', date);
            let requestData = { logDate: date }
            if (isOnline()) {
                this.getBodyMeasurementLogData(requestData);
            } else {
                this.getDataFromIDB(requestData);
            }
        }
    }

    onMonthClick = (date) => {
        const { change } = this.props;
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        let requestData = {};
        if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
            this.setState({ logDate: now });
            change('log_date', now);
            requestData = { logDate: now }
        } else {
            this.setState({ logDate: date });
            change('log_date', date);
            requestData = { logDate: date }
        }
        if (isOnline()) {
            this.getBodyMeasurementLogData(requestData);
        } else {
            this.getDataFromIDB(requestData);
        }
    }

    onActiveDateChange = (obj) => {
        const { change } = this.props;
        if (obj.view === "month") {
            let date = obj.activeStartDate;
            let now = new Date();
            now.setHours(0, 0, 0, 0);
            let requestData = {};
            if (now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()) {
                this.setState({ logDate: now });
                change('log_date', now);
                requestData = { logDate: now }
            } else {
                this.setState({ logDate: date });
                change('log_date', date);
                requestData = { logDate: date }
            }
            if (isOnline()) {
                this.getBodyMeasurementLogData(requestData);
            } else {
                this.getDataFromIDB(requestData);
            }
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
            body_fat: [validNumber, min0, max100],
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

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            const { logDate } = this.state;
            let requestData = { logDate }
            this.getDataFromIDB(requestData);
        }
    }

    storeLogDates = () => {
        try {
            const { logDates } = this.props;
            const { logDate } = this.state;
            const transaction = this.iDB.transaction([IDB_TBL_BODY_LOGDATES], IDB_READ_WRITE);
            if (transaction) {
                const objectStore = transaction.objectStore(IDB_TBL_BODY_LOGDATES);
                if (objectStore) {
                    const iDBGetReq = objectStore.get(IDB_TBL_BODY_LOGDATES);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            objectStore.put({ type: IDB_TBL_BODY_LOGDATES, logDates: logDates });
                        } else {
                            // console.log("data to add => ",{ logDate: logDate.toISOString(), logDates: logDates } )
                            objectStore.add({ type: IDB_TBL_BODY_LOGDATES, logDates: logDates });
                        }
                    }
                }
            }
        } catch (e) {
            console.log('e => ', e);
        }
    }

    storeBodyMeasurementInIDB = (data) => {
        const transaction = this.iDB.transaction([IDB_TBL_BODY_MEASUREMENT], IDB_READ_WRITE);
        if (transaction) {
            const objectStore = transaction.objectStore(IDB_TBL_BODY_MEASUREMENT);
            if (objectStore) {
                const measurementId = data._id;
                const iDBGetReq = objectStore.get(measurementId);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        objectStore.put(data);
                    } else {
                        objectStore.add(data);
                    }
                }
            }
        }
    }

    storeBodyFatInIDB = (data) => {
        const transaction = this.iDB.transaction([IDB_TBL_BODY_FAT], IDB_READ_WRITE);
        if (transaction) {
            const objectStore = transaction.objectStore(IDB_TBL_BODY_FAT);
            if (objectStore) {
                const _id = data._id;
                const iDBGetReq = objectStore.get(_id);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        objectStore.put(data);
                    } else {
                        objectStore.add(data);
                    }
                }
            }
        }
    }

    storeBodyProgressPhotosInIDB = (data) => {
        const transaction = this.iDB.transaction([IDB_TBL_BODY_PP], IDB_READ_WRITE);
        if (transaction) {
            const objectStore = transaction.objectStore(IDB_TBL_BODY_PP);
            if (objectStore) {
                const _id = data._id;
                const iDBGetReq = objectStore.get(_id);
                iDBGetReq.onsuccess = (event) => {
                    const { target: { result } } = event;
                    if (result) {
                        objectStore.put(data);
                    } else {
                        objectStore.add(data);
                    }
                }
            }
        }
    }

    getDataFromIDB = (requestData) => {
        const { logDate } = requestData;
        const idbTbls = [
            IDB_TBL_BODY_MEASUREMENT,
            IDB_TBL_BODY_FAT,
            IDB_TBL_BODY_PP,
            IDB_TBL_BODY_LOGDATES
        ];
        try {
            const transaction = this.iDB.transaction(idbTbls, IDB_READ);
            if (transaction) {
                const osBodyMeas = transaction.objectStore(IDB_TBL_BODY_MEASUREMENT);
                const isoDate = logDate.toISOString();
                if (osBodyMeas) {
                    const logDateIndex = osBodyMeas.index('logDate');
                    const iDBGetReq = logDateIndex.get(isoDate);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        this.initializeBodyMeasurementFormData(result);
                    }
                }
                const osBodyFat = transaction.objectStore(IDB_TBL_BODY_FAT);
                if (osBodyFat) {
                    const logDateIndex = osBodyFat.index('logDate');
                    const iDBGetReq = logDateIndex.get(isoDate);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        this.initializeBodyFatFormData(result);
                    }
                }
                const osPP = transaction.objectStore(IDB_TBL_BODY_PP);
                if (osPP) {
                    const logDateIndex = osPP.index('date');
                    const iDBGetReq = logDateIndex.getAll(isoDate);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        const newState = { userProgressPhotos: result };
                        this.props.dispatch(setUserBodyMeasurementState(newState));
                    }
                }
                const oslogdates = transaction.objectStore(IDB_TBL_BODY_LOGDATES);
                if (oslogdates) {
                    // const logDatesdata = oslogdates.get(logDate.toISOString())
                    const logDatesdata = oslogdates.get(IDB_TBL_BODY_LOGDATES)
                    console.log("logDatesdata ===>", logDatesdata)
                    logDatesdata.onsuccess = (event) => {
                        const { target: { result } } = event;
                        const newState = { logDates: result.logDates };
                        this.props.dispatch(setUserBodyMeasurementState(newState));
                    }
                }
            }
        } catch (e) { }
    }

    initializeBodyMeasurementFormData = (measurement = {}) => {
        const { logDate } = this.state;
        const { initialize, profileSettings } = this.props;
        let bodyUnit = MEASUREMENT_UNIT_CENTIMETER;
        let weightUnit = MEASUREMENT_UNIT_KILOGRAM;
        if (profileSettings) {
            bodyUnit = profileSettings.bodyMeasurement;
            weightUnit = profileSettings.weight;
        }
        let measurementData = {
            neck: '',
            shoulders: '',
            chest: '',
            upper_arm: '',
            waist: '',
            forearm: '',
            hips: '',
            thigh: '',
            calf: '',
            heartRate: '',
            weight: '',
            height: '',
            log_date: logDate
        };
        if (measurement && Object.keys(measurement).length > 0) {
            measurementData = {
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
                log_date: new Date(measurement.logDate)
            }
        }
        initialize(measurementData);
    }

    initializeBodyFatFormData = (bodyFat = {}) => {
        const { change } = this.props;
        if (bodyFat && Object.keys(bodyFat).length > 0) {
            change('bodyfat', (bodyFat && bodyFat.bodyFatPer) ? bodyFat.bodyFatPer : '');
            change('age', (bodyFat && bodyFat.age) ? bodyFat.age : '');
            change('site1', (bodyFat && bodyFat.site1) ? bodyFat.site1 : '');
            change('site2', (bodyFat && bodyFat.site2) ? bodyFat.site2 : '');
            change('site3', (bodyFat && bodyFat.site3) ? bodyFat.site3 : '');
        } else {
            change('bodyfat', '');
            change('age', '');
            change('site1', '');
            change('site2', '');
            change('site3', '');
        }
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_BODY_MEASUREMENT, IDB_TBL_BODY_FAT, IDB_TBL_BODY_PP, IDB_TBL_BODY_LOGDATES];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osBodyMeas = transaction.objectStore(IDB_TBL_BODY_MEASUREMENT);
                    osBodyMeas.clear();
                    const osBodyFat = transaction.objectStore(IDB_TBL_BODY_FAT);
                    osBodyFat.clear();
                    const osPP = transaction.objectStore(IDB_TBL_BODY_PP);
                    osPP.clear();
                    const osLogdates = transaction.objectStore(IDB_TBL_BODY_LOGDATES);
                    osLogdates.clear();
                }
            }
            this.iDB.close();
            this.iDB = null;
        } catch (error) { }
    }
}

BodyMeasurementForm = reduxForm({
    form: 'userBodyMeasurement'
})(BodyMeasurementForm);

const mapStateToProps = (state) => {
    const { userBodyMeasurement, profile, userBodyparts } = state;
    return {
        loading: userBodyMeasurement.get('loading'),
        error: userBodyMeasurement.get('error'),
        measurement: userBodyMeasurement.get('measurement'),
        bodyFat: userBodyMeasurement.get('bodyFat'),
        userProgressPhotos: userBodyMeasurement.get('userProgressPhotos'),
        loadingProgressPhotos: userBodyMeasurement.get('loadingProgressPhotos'),
        loadingLogDates: userBodyMeasurement.get('loadingLogDates'),
        errorLogDates: userBodyMeasurement.get('errorLogDates'),
        logDates: userBodyMeasurement.get('logDates'),
        profileSettings: profile.get('settings'),
        bodyparts: userBodyparts.get('bodyparts'),
    }
}

export default connect(mapStateToProps)(BodyMeasurementForm);

const InputField = (props) => {
    const { label, input, meta, parentWrapper, wrapperClass, className, labelClass, placeholder, errorClass, type, unitValue, children, readOnly } = props;
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
                    readOnly={readOnly ? readOnly : false}
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