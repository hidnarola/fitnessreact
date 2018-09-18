import React, { Component } from 'react';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { connect } from 'react-redux';
import { getToken, te } from '../helpers/funs';
import { getDashboardPageRequest, saveDashboardWidgetsDataRequest, changeDashboardMuscleInnerDataRequest, changeDashboardBodyFatWidgetRequest } from '../actions/dashboard';
import {
    WIDGET_TODAYS_WORKOUT,
    WIDGET_ACTIVITY_FEED,
    WIDGET_BADGES,
    WIDGET_BODY_FAT,
    WIDGETS_TYPE_DASHBOARD,
    WIDGET_MUSCLE,
    WIDGET_PROGRESS_PHOTO,
    MUSCLE_WIDGET_NECK,
    MUSCLE_WIDGET_SHOULDER,
    MUSCLE_WIDGET_CHEST,
    MUSCLE_WIDGET_UPPER_ARM,
    MUSCLE_WIDGET_WAIST,
    MUSCLE_WIDGET_FOREARM,
    MUSCLE_WIDGET_HIPS,
    MUSCLE_WIDGET_THIGH,
    MUSCLE_WIDGET_CALF,
    MUSCLE_WIDGET_HEART_RATE,
    MUSCLE_WIDGET_WEIGHT,
    MUSCLE_WIDGET_HEIGHT
} from '../constants/consts';
import moment from "moment";
import { initialize, reset } from "redux-form";
import { FaCircleONotch, FaSpinner } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import Workouts from '../components/Dashboard/Workouts';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import cns from "classnames";
import WidgetsListModal from '../components/Common/WidgetsListModal';
import WidgetProgressPhotoCard from '../components/Common/WidgetProgressPhotoCard';
import WidgetMuscleCard from '../components/Common/WidgetMuscleCard';
import WidgetBodyFatCard from '../components/Common/WidgetBodyFatCard';
import WidgetBadgesCard from '../components/Common/WidgetBadgesCard';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWidgetsModal: false,
        }
    }

    componentWillMount() {
        const { socket, dispatch } = this.props;
        let token = getToken();
        if (socket && token) {
            socket.emit('join', token);
        }
        dispatch(getDashboardPageRequest());
    }

    render() {
        const {
            loading,
            error,
            userWidgets,
            profileComplete,
            saveWidgetsLoading,
            widgetProgressPhotos,
            widgetMuscle,
            widgetBodyFat,
            changeBodyFatLoading,
            changeBodyFatError,
            widgetBadges,
        } = this.props;
        const { showWidgetsModal } = this.state;
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
                            <button type="button" onClick={this.handleShowWidgetsModal} className="white-btn" disabled={loading}>
                                {loading && <FaSpinner className="loader-spinner" />}
                                {!loading && <i className="icon-widgets"></i>}
                                <span>Widget</span>
                            </button>
                            <button type="button" disabled={true} className="pink-btn cursor-default">
                                <span>Profile Completion</span>
                                <span className="pull-right">{(profileComplete) ? `${profileComplete}%` : ''}</span>
                            </button>
                        </div>
                    </div>

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading &&
                        <div className="body-content row d-flex col-md-12">
                            <div className="col-md-8">
                                <div className="row">
                                    {userWidgets && typeof userWidgets[WIDGET_TODAYS_WORKOUT] !== 'undefined' && userWidgets[WIDGET_TODAYS_WORKOUT] === 1 &&
                                        <div className={cns(
                                            { 'col-md-12': (typeof userWidgets[WIDGET_BODY_FAT] === 'undefined') || !userWidgets[WIDGET_BODY_FAT] },
                                            { 'col-md-6': (typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined') && userWidgets[WIDGET_BODY_FAT] }
                                        )}>
                                            <Workouts />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined' && userWidgets[WIDGET_BODY_FAT] &&
                                        <div className={cns(
                                            { 'col-md-12': (typeof userWidgets[WIDGET_TODAYS_WORKOUT] === 'undefined') || userWidgets[WIDGET_TODAYS_WORKOUT] === 0 },
                                            { 'col-md-6': (typeof userWidgets[WIDGET_TODAYS_WORKOUT] !== 'undefined') && userWidgets[WIDGET_TODAYS_WORKOUT] === 1 }
                                        )}>
                                            <WidgetBodyFatCard
                                                type={WIDGETS_TYPE_DASHBOARD}
                                                userWidgets={userWidgets}
                                                bodyFat={widgetBodyFat}
                                                changeBodyFatLoading={changeBodyFatLoading}
                                                changeBodyFatError={changeBodyFatError}
                                                requestBodyFatData={this.requestBodyFatData}
                                            />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[WIDGET_PROGRESS_PHOTO] === 1 &&
                                        <div className="col-md-6">
                                            <WidgetProgressPhotoCard
                                                progressPhoto={widgetProgressPhotos}
                                            />
                                        </div>
                                    }
                                    {userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0 &&
                                        <div className="col-md-12 row">
                                            <WidgetMuscleCard
                                                type={WIDGETS_TYPE_DASHBOARD}
                                                userWidgets={userWidgets}
                                                muscle={widgetMuscle}
                                                requestGraphData={this.requestGraphData}
                                                bodyWrapperClass="col-md-6"
                                            />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_BADGES] !== 'undefined' && userWidgets[WIDGET_BADGES] === 1 &&
                                        <div className="col-md-12">
                                            <WidgetBadgesCard
                                                badges={widgetBadges}
                                                bodyWrapperClass="d-flex flex-wrap badges-wrap badges-wrap-box2"
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                            {userWidgets && typeof userWidgets[WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[WIDGET_ACTIVITY_FEED] === 1 &&
                                <div className="col-md-4">
                                    <ActivityFeed />
                                </div>
                            }

                            {
                                (!userWidgets || typeof userWidgets[WIDGET_TODAYS_WORKOUT] === 'undefined' || userWidgets[WIDGET_TODAYS_WORKOUT] === 0 || userWidgets[WIDGET_TODAYS_WORKOUT] === null) &&
                                (!userWidgets || typeof userWidgets[WIDGET_BODY_FAT] === 'undefined' || !userWidgets[WIDGET_BODY_FAT]) &&
                                (!userWidgets || typeof userWidgets[WIDGET_ACTIVITY_FEED] === 'undefined' || userWidgets[WIDGET_ACTIVITY_FEED] === 0 || userWidgets[WIDGET_ACTIVITY_FEED] === null) &&
                                (!userWidgets || typeof userWidgets[WIDGET_BADGES] === 'undefined' || userWidgets[WIDGET_BADGES] === 0 || userWidgets[WIDGET_BADGES] === null) &&
                                (!userWidgets || typeof userWidgets[WIDGET_PROGRESS_PHOTO] === 'undefined' || userWidgets[WIDGET_PROGRESS_PHOTO] === 0 || userWidgets[WIDGET_PROGRESS_PHOTO] === null) &&
                                (!userWidgets || typeof userWidgets[WIDGET_MUSCLE] === 'undefined' || userWidgets[WIDGET_MUSCLE] === null || userWidgets[WIDGET_MUSCLE].length <= 0) &&
                                typeof error !== 'undefined' && error && error.length <= 0 &&
                                <div className="select-dashboard-widget-wrapper">
                                    <i className="icon-widgets"></i>
                                    <h3>Please add widgets on dashboard.</h3>
                                </div>
                            }
                        </div>
                    }

                    {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                        <div className="server-error-wrapper">
                            <ErrorCloud />
                            <h4>Something went wrong! please try again.</h4>
                        </div>
                    }
                </section>
                <WidgetsListModal
                    type={WIDGETS_TYPE_DASHBOARD}
                    show={showWidgetsModal}
                    handleClose={this.handleCloseWidgetsModal}
                    onSubmit={this.handleSaveUserWidgets}
                    saveLoading={saveWidgetsLoading}
                />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            dispatch,
            saveWidgetsLoading,
            saveWidgetsError,
        } = this.props;
        if (!saveWidgetsLoading && prevProps.saveWidgetsLoading !== saveWidgetsLoading) {
            if (saveWidgetsError && saveWidgetsError.length > 0) {
                te('Something went wrong! please try again later.');
            }
            this.handleCloseWidgetsModal();
            dispatch(getDashboardPageRequest());
        }
    }

    handleShowWidgetsModal = () => {
        const { userWidgets, dispatch } = this.props;
        var formData = {
            [`widget_list_${WIDGET_TODAYS_WORKOUT}`]: false,
            [`widget_list_${WIDGET_ACTIVITY_FEED}`]: false,
            [`widget_list_${WIDGET_BADGES}`]: false,
            [`widget_list_${WIDGET_BODY_FAT}`]: false,
            [`widget_list_${WIDGET_MUSCLE}`]: false,
            [`widget_list_${WIDGET_PROGRESS_PHOTO}`]: false,
            [`widget_list_${MUSCLE_WIDGET_NECK}`]: false,
            [`widget_list_${MUSCLE_WIDGET_SHOULDER}`]: false,
            [`widget_list_${MUSCLE_WIDGET_CHEST}`]: false,
            [`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`]: false,
            [`widget_list_${MUSCLE_WIDGET_WAIST}`]: false,
            [`widget_list_${MUSCLE_WIDGET_FOREARM}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HIPS}`]: false,
            [`widget_list_${MUSCLE_WIDGET_THIGH}`]: false,
            [`widget_list_${MUSCLE_WIDGET_CALF}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HEART_RATE}`]: false,
            [`widget_list_${MUSCLE_WIDGET_WEIGHT}`]: false,
            [`widget_list_${MUSCLE_WIDGET_HEIGHT}`]: false,
        };
        if (userWidgets && typeof userWidgets[WIDGET_TODAYS_WORKOUT] !== 'undefined' && userWidgets[WIDGET_TODAYS_WORKOUT] === 1) {
            formData[`widget_list_${WIDGET_TODAYS_WORKOUT}`] = true;
        }
        if (userWidgets && typeof userWidgets[WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[WIDGET_ACTIVITY_FEED] === 1) {
            formData[`widget_list_${WIDGET_ACTIVITY_FEED}`] = true;
        }
        if (userWidgets && typeof userWidgets[WIDGET_BADGES] !== 'undefined' && userWidgets[WIDGET_BADGES] === 1) {
            formData[`widget_list_${WIDGET_BADGES}`] = true;
        }
        if (userWidgets && typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined' && userWidgets[WIDGET_BODY_FAT]) {
            formData[`widget_list_${WIDGET_BODY_FAT}`] = true;
        }
        if (userWidgets && typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[WIDGET_PROGRESS_PHOTO] === 1) {
            formData[`widget_list_${WIDGET_PROGRESS_PHOTO}`] = true;
        }
        if (userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0) {
            userWidgets[WIDGET_MUSCLE].map((o, i) => {
                if (o.name === MUSCLE_WIDGET_NECK) {
                    formData[`widget_list_${MUSCLE_WIDGET_NECK}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_SHOULDER) {
                    formData[`widget_list_${MUSCLE_WIDGET_SHOULDER}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_CHEST) {
                    formData[`widget_list_${MUSCLE_WIDGET_CHEST}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_UPPER_ARM) {
                    formData[`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_WAIST) {
                    formData[`widget_list_${MUSCLE_WIDGET_WAIST}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_FOREARM) {
                    formData[`widget_list_${MUSCLE_WIDGET_FOREARM}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HIPS) {
                    formData[`widget_list_${MUSCLE_WIDGET_HIPS}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_THIGH) {
                    formData[`widget_list_${MUSCLE_WIDGET_THIGH}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_CALF) {
                    formData[`widget_list_${MUSCLE_WIDGET_CALF}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HEART_RATE) {
                    formData[`widget_list_${MUSCLE_WIDGET_HEART_RATE}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_WEIGHT) {
                    formData[`widget_list_${MUSCLE_WIDGET_WEIGHT}`] = true;
                }
                if (o.name === MUSCLE_WIDGET_HEIGHT) {
                    formData[`widget_list_${MUSCLE_WIDGET_HEIGHT}`] = true;
                }
            });
            formData[`widget_list_${WIDGET_MUSCLE}`] = true;
        }
        dispatch(initialize('widgets_list_form', formData));
        this.setState({ showWidgetsModal: true });
    }

    handleCloseWidgetsModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('widgets_list_form'));
        this.setState({ showWidgetsModal: false });
    }

    handleSaveUserWidgets = (data) => {
        const { userWidgets, dispatch } = this.props;
        let dateRange = {
            start: moment().startOf('day').subtract(1, 'month').utc(),
            end: moment().startOf('day').utc(),
        };
        let requestData = {
            [WIDGET_TODAYS_WORKOUT]: 0,
            [WIDGET_ACTIVITY_FEED]: 0,
            [WIDGET_BADGES]: 0,
            [WIDGET_BODY_FAT]: null,
            [WIDGET_PROGRESS_PHOTO]: 0,
            [WIDGET_MUSCLE]: null,
        };
        if (typeof data[`widget_list_${WIDGET_TODAYS_WORKOUT}`] !== 'undefined' && data[`widget_list_${WIDGET_TODAYS_WORKOUT}`]) {
            requestData[WIDGET_TODAYS_WORKOUT] = (data[`widget_list_${WIDGET_TODAYS_WORKOUT}`]) ? 1 : 0;
        }
        if (typeof data[`widget_list_${WIDGET_ACTIVITY_FEED}`] !== 'undefined' && data[`widget_list_${WIDGET_ACTIVITY_FEED}`]) {
            requestData[WIDGET_ACTIVITY_FEED] = (data[`widget_list_${WIDGET_ACTIVITY_FEED}`]) ? 1 : 0;
        }
        if (typeof data[`widget_list_${WIDGET_BADGES}`] !== 'undefined' && data[`widget_list_${WIDGET_BADGES}`]) {
            requestData[WIDGET_BADGES] = (data[`widget_list_${WIDGET_BADGES}`]) ? 1 : 0;
        }
        if (typeof data[`widget_list_${WIDGET_BODY_FAT}`] !== 'undefined' && data[`widget_list_${WIDGET_BODY_FAT}`]) {
            let data = {};
            if (userWidgets && typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined' && userWidgets[WIDGET_BODY_FAT]) {
                data = userWidgets[WIDGET_BODY_FAT];
            } else {
                data = dateRange;
            }
            requestData[WIDGET_BODY_FAT] = data;
        }
        if (typeof data[`widget_list_${WIDGET_PROGRESS_PHOTO}`] !== 'undefined' && data[`widget_list_${WIDGET_PROGRESS_PHOTO}`]) {
            requestData[WIDGET_PROGRESS_PHOTO] = 1;
        }
        if (typeof data[`widget_list_${WIDGET_MUSCLE}`] !== 'undefined' && data[`widget_list_${WIDGET_MUSCLE}`]) {
            let _data = [];
            let isDataAlreadyAvailable = false;
            if (userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0) {
                isDataAlreadyAvailable = true;
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_NECK}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_NECK}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_NECK) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_SHOULDER}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_SHOULDER}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_SHOULDER) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_CHEST}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_CHEST}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_CHEST) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_UPPER_ARM}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_UPPER_ARM) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_WAIST}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_WAIST}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_WAIST) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_FOREARM}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_FOREARM}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_FOREARM) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_HIPS}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_HIPS}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_HIPS) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_THIGH}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_THIGH}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_THIGH) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_CALF}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_CALF}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_CALF) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_HEART_RATE}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_HEART_RATE}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_HEART_RATE) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_WEIGHT}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_WEIGHT}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_WEIGHT) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end })
                }
            }
            if (typeof data[`widget_list_${MUSCLE_WIDGET_HEIGHT}`] !== 'undefined' && data[`widget_list_${MUSCLE_WIDGET_HEIGHT}`]) {
                if (isDataAlreadyAvailable) {
                    let isDataPushed = false;
                    userWidgets[WIDGET_MUSCLE].map((o, i) => {
                        if (o.name === MUSCLE_WIDGET_HEIGHT) {
                            _data.push(o);
                            isDataPushed = true;
                        }
                    });
                    if (!isDataPushed) {
                        _data.push({ name: MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end })
                    }
                } else {
                    _data.push({ name: MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end })
                }
            }
            requestData[WIDGET_MUSCLE] = _data;
        }
        dispatch(saveDashboardWidgetsDataRequest(requestData));
    }

    requestGraphData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeDashboardMuscleInnerDataRequest(requestData));
    }

    requestBodyFatData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeDashboardBodyFatWidgetRequest(requestData));
    }
}

const mapStateToProps = (state) => {
    const { dashboard, user } = state;
    return {
        socket: user.get('socket'),
        loading: dashboard.get('loading'),
        error: dashboard.get('error'),
        profileComplete: dashboard.get('profileComplete'),
        userWidgets: dashboard.get('userWidgets'),
        saveWidgetsError: dashboard.get('saveWidgetsError'),
        saveWidgetsLoading: dashboard.get('saveWidgetsLoading'),
        widgetProgressPhotos: dashboard.get('progressPhoto'),
        widgetMuscle: dashboard.get('muscle'),
        widgetBodyFat: dashboard.get('bodyFat'),
        changeBodyFatLoading: dashboard.get('changeBodyFatLoading'),
        changeBodyFatError: dashboard.get('changeBodyFatError'),
        widgetBadges: dashboard.get('badges'),
    };
};

export default connect(mapStateToProps)(Dashboard);