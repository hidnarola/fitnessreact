import React, { Component } from 'react';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { connect } from 'react-redux';
import { getToken, te, isOnline, connectIDB, tw } from '../helpers/funs';
import {
    getDashboardPageRequest,
    saveDashboardWidgetsDataRequest,
    changeDashboardMuscleInnerDataRequest,
    changeDashboardBodyFatWidgetRequest,
    setDashboardPage
} from '../actions/dashboard';
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
    MUSCLE_WIDGET_HEIGHT,
    WIDGET_USER_WIDGET,
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
import ReactTooltip from "react-tooltip";
import { IDB_TBL_DASHBOARD, IDB_READ_WRITE, IDB_READ } from '../constants/idb';
import AddMetaDescription from '../components/global/AddMetaDescription';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWidgetsModal: false,
        }
        this.iDB;
    }

    componentWillMount() {
        const { socket } = this.props;
        let token = getToken();
        if (socket && token) {
            socket.emit('join', token);
        }
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
            loggedUserData,
        } = this.props;
        const { showWidgetsModal } = this.state;
        return (
            <div className="fitness-dashboard">
                <AddMetaDescription>
                    <title>Dashboard | Fitly</title>
                </AddMetaDescription>
                <FitnessHeader />
                <FitnessNav />
                <section className="body-wrap">
                    <div className="body-head space-btm-45 d-flex justify-content-start front-white-header">
                        <div className="body-head-l">
                            <h2>Dashboard</h2>
                            <p>Your goal choice shapes how your fitness assistant will ceate your meal and exercise plans, it’s important that
                                you set goals which are achieveable. Keep updating your profile and your fitness assistant will keep you
                                on track and meeting the goals you’ve set out for yourself.</p>
                        </div>
                        <div className="body-head-r add-friend">
                            <button
                                type="button"
                                onClick={this.handleShowWidgetsModal}
                                className="bordered-circle default-bordered-circle"
                                data-tip="Widgets"
                                data-for="profile-actions-tooltip"
                            >
                                {loading && <FaSpinner className="loader-spinner" />}
                                {!loading && <i className="icon-widgets"></i>}
                            </button>
                            <ReactTooltip id="profile-actions-tooltip" place="left" type="light" effect="solid" />
                        </div>
                    </div>

                    {loading &&
                        <div className="no-content-loader">
                            <FaCircleONotch className="loader-spinner fs-100" />
                        </div>
                    }

                    {!loading &&
                        <div className="body-content row d-flex col-md-12">
                            <div className={cns(
                                { 'col-md-6': (userWidgets && typeof userWidgets[WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[WIDGET_ACTIVITY_FEED] === 1) },
                                { 'col-md-12': (!userWidgets || typeof userWidgets[WIDGET_ACTIVITY_FEED] === 'undefined' || userWidgets[WIDGET_ACTIVITY_FEED] === 0) },
                            )}>
                                <div className="row">
                                    {userWidgets && typeof userWidgets[WIDGET_TODAYS_WORKOUT] !== 'undefined' && userWidgets[WIDGET_TODAYS_WORKOUT] === 1 &&
                                        <div className="col-md-12">
                                            <Workouts />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_PROGRESS_PHOTO] !== 'undefined' && userWidgets[WIDGET_PROGRESS_PHOTO] === 1 &&
                                        <div className="col-md-12">
                                            <WidgetProgressPhotoCard progressPhoto={widgetProgressPhotos} username={loggedUserData && loggedUserData.username ? loggedUserData.username : ''} />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined' && userWidgets[WIDGET_BODY_FAT] &&
                                        <div className="col-md-12">
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
                                    {userWidgets && userWidgets[WIDGET_MUSCLE] && userWidgets[WIDGET_MUSCLE].length > 0 &&
                                        <div className="col-md-12 row dashboard-muscle-wrapper">
                                            <WidgetMuscleCard
                                                type={WIDGETS_TYPE_DASHBOARD}
                                                userWidgets={userWidgets}
                                                muscle={widgetMuscle}
                                                requestGraphData={this.requestGraphData}
                                                bodyWrapperClass="col-md-12"
                                            />
                                        </div>
                                    }
                                    {userWidgets && typeof userWidgets[WIDGET_BADGES] !== 'undefined' && userWidgets[WIDGET_BADGES] === 1 &&
                                        <div className="col-md-12">
                                            <WidgetBadgesCard
                                                badges={widgetBadges}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                            {userWidgets && typeof userWidgets[WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[WIDGET_ACTIVITY_FEED] === 1 &&
                                <div className="col-md-6">
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

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
        if (isOnline()) {
            this.requestDashboardData();
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const {
            dispatch,
            saveWidgetsLoading,
            saveWidgetsError,
            loading,
            likeLoading,
            commentLoading
        } = this.props;
        if (!saveWidgetsLoading && prevProps.saveWidgetsLoading !== saveWidgetsLoading) {
            if (saveWidgetsError && saveWidgetsError.length > 0) {
                te('Something went wrong! please try again later.');
            }
            this.handleCloseWidgetsModal();
            if (isOnline()) {
                this.requestDashboardData();
            }
            this.storeUserWidgetDashboardInIDB();
        }
        if ((!loading && !likeLoading && !commentLoading)) {
            this.storeDashboardInIDB();
        }
    }

    getDataFromIDB = () => {
        const { dispatch } = this.props;
        if (WIDGET_BADGES && WIDGET_BODY_FAT && WIDGET_MUSCLE && WIDGET_PROGRESS_PHOTO && WIDGET_USER_WIDGET && WIDGET_ACTIVITY_FEED) {
            const idbTbls = [IDB_TBL_DASHBOARD];
            try {
                const transaction = this.iDB.transaction(idbTbls, IDB_READ);
                if (transaction) {
                    const osDashboard = transaction.objectStore(IDB_TBL_DASHBOARD);

                    const iDBGetReqBadges = osDashboard.get(WIDGET_BADGES);
                    iDBGetReqBadges.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { badges: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { badges: [], loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetReqBodyfat = osDashboard.get(WIDGET_BODY_FAT);
                    iDBGetReqBodyfat.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { bodyFat: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { bodyFat: [], loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetReqMuscle = osDashboard.get(WIDGET_MUSCLE);
                    iDBGetReqMuscle.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { muscle: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { muscle: {}, loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetReqProgressPhoto = osDashboard.get(WIDGET_PROGRESS_PHOTO);
                    iDBGetReqProgressPhoto.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { progressPhoto: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { progressPhoto: {}, loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetRequserWidget = osDashboard.get(WIDGET_USER_WIDGET);
                    iDBGetRequserWidget.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { userWidgets: resultObj, workouts: [], loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { userWidgets: {}, workouts: [], loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetReqworkout = osDashboard.get(WIDGET_TODAYS_WORKOUT);
                    iDBGetReqworkout.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { workouts: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { workouts: [], loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }

                    const iDBGetReqactivityFeed = osDashboard.get(WIDGET_ACTIVITY_FEED);
                    iDBGetReqactivityFeed.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { activityFeed: resultObj, loading: false }
                            dispatch(setDashboardPage(data));
                        } else {
                            const data = { activityFeed: [], loading: false }
                            dispatch(setDashboardPage(data));
                        }
                    }


                }
            } catch (error) {
                const data = { badges: [], error: [], muscle: {}, progressPhoto: {}, bodyFat: [], userWidgets: {}, workouts: [], activityFeed: [], loading: false }
                dispatch(setDashboardPage(data));
            }
        }
    }

    storeDashboardInIDB = () => {
        const {
            dispatch,
            loading,
            widgetProgressPhotos,
            widgetMuscle,
            widgetBodyFat,
            widgetBadges,
            userWidgets,
            workouts,
            activityFeed
        } = this.props;
        try {
            const idbDataBedges = { type: WIDGET_BADGES, data: JSON.stringify(widgetBadges) };
            const idbDataBodyFat = { type: WIDGET_BODY_FAT, data: JSON.stringify(widgetBodyFat) };
            const idbDataMuscle = { type: WIDGET_MUSCLE, data: JSON.stringify(widgetMuscle) };
            const idbDataProgressPhotos = { type: WIDGET_PROGRESS_PHOTO, data: JSON.stringify(widgetProgressPhotos) };
            const idbDatauserWidget = { type: WIDGET_USER_WIDGET, data: JSON.stringify(userWidgets) };
            const idbDatatodayWorkout = { type: WIDGET_TODAYS_WORKOUT, data: JSON.stringify(workouts) };
            const idbDatatodayactivityFeed = { type: WIDGET_ACTIVITY_FEED, data: JSON.stringify(activityFeed) };


            const transaction = this.iDB.transaction([IDB_TBL_DASHBOARD], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_DASHBOARD);


            const iDBGetReqBedges = objectStore.get(WIDGET_BADGES);
            iDBGetReqBedges.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDataBedges);
                } else {
                    objectStore.add(idbDataBedges);
                }
            }


            const iDBGetReqBodyFat = objectStore.get(WIDGET_BODY_FAT);
            iDBGetReqBodyFat.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDataBodyFat);
                } else {
                    objectStore.add(idbDataBodyFat);
                }
            }


            const iDBGetReqMuscle = objectStore.get(WIDGET_MUSCLE);
            iDBGetReqMuscle.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDataMuscle);
                } else {
                    objectStore.add(idbDataMuscle);
                }
            }


            const iDBGetReqProgressPhotos = objectStore.get(WIDGET_PROGRESS_PHOTO);
            iDBGetReqProgressPhotos.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDataProgressPhotos);
                } else {
                    objectStore.add(idbDataProgressPhotos);
                }
            }

            const iDBGetRequserWidget = objectStore.get(WIDGET_USER_WIDGET);
            iDBGetRequserWidget.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDatauserWidget);
                } else {
                    objectStore.add(idbDatauserWidget);
                }
            }

            const iDBGetReqtodayWorkout = objectStore.get(WIDGET_TODAYS_WORKOUT);
            iDBGetReqtodayWorkout.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDatatodayWorkout);
                } else {
                    objectStore.add(idbDatatodayWorkout);
                }
            }

            const iDBGetReqtodayactivityFeed = objectStore.get(WIDGET_ACTIVITY_FEED);
            iDBGetReqtodayactivityFeed.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbDatatodayactivityFeed);
                } else {
                    objectStore.add(idbDatatodayactivityFeed);
                }
            }

        } catch (error) {
        }
    }

    storeUserWidgetDashboardInIDB = () => {
        const { saveWidgetsLoading,
            saveWidgetsError,
            userWidgets } = this.props;
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
            let _data = [
                { name: MUSCLE_WIDGET_NECK, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_SHOULDER, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_CHEST, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_UPPER_ARM, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_WAIST, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_FOREARM, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HIPS, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_THIGH, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_CALF, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HEART_RATE, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_WEIGHT, start: dateRange.start, end: dateRange.end },
                { name: MUSCLE_WIDGET_HEIGHT, start: dateRange.start, end: dateRange.end }
            ];
            requestData[WIDGET_MUSCLE] = _data;
        }
        if (isOnline()) {
            dispatch(saveDashboardWidgetsDataRequest(requestData));
        } else {
            tw("You are offline, please check your internet connection");
        }
    }

    requestGraphData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeDashboardMuscleInnerDataRequest(requestData));
    }

    requestBodyFatData = (requestData) => {
        const { dispatch } = this.props;
        dispatch(changeDashboardBodyFatWidgetRequest(requestData));
    }

    requestDashboardData = () => {
        const { dispatch } = this.props;
        let today = moment().startOf('day').utc();
        let prevMonth = moment.range(
            moment().startOf('month').startOf('day').subtract(3, 'months').utc(),
            moment().subtract(1, 'months').endOf('month').endOf('day').utc()
        );
        let requestData = {
            today,
            ...prevMonth
        };
        dispatch(getDashboardPageRequest(requestData));
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_DASHBOARD];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osDashboard = transaction.objectStore(IDB_TBL_DASHBOARD);
                    osDashboard.clear();
                }
            }
            this.iDB.close();
        } catch (error) { }
    }
}

const mapStateToProps = (state) => {
    const { dashboard, user, postLikes, postComments } = state;
    return {
        socket: user.get('socket'),
        loggedUserData: user.get('loggedUserData'),
        activityFeed: dashboard.get('activityFeed'),
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
        workouts: dashboard.get('workouts'),
        likeLoading: postLikes.get('loading'),
        commentLoading: postComments.get('loading'),
    };
};

export default connect(mapStateToProps)(Dashboard);