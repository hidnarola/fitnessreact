import React, { Component } from 'react';
import FitnessHeader from 'components/global/FitnessHeader';
import FitnessNav from 'components/global/FitnessNav';
import { connect } from 'react-redux';
import { getToken, te } from '../helpers/funs';
import WidgetsListModal from '../components/Dashboard/WidgetsListModal';
import { getDashboardPageRequest, saveDashboardWidgetsDataRequest } from '../actions/dashboard';
import {
    DASHBOARD_WIDGET_TODAYS_WORKOUT,
    DASHBOARD_WIDGET_ACTIVITY_FEED,
    DASHBOARD_WIDGET_BADGES,
    DASHBOARD_WIDGET_BODY_FAT
} from '../constants/consts';
import moment from "moment";
import { initialize, reset } from "redux-form";
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import Badges from '../components/Dashboard/Badges';
import Workouts from '../components/Dashboard/Workouts';
import BodyFat from '../components/Dashboard/BodyFat';
import ActivityFeed from '../components/Dashboard/ActivityFeed';

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
            profileComplete
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
                            <button type="button" onClick={this.handleShowWidgetsModal} className="white-btn">
                                <i className="icon-control_point"></i>
                                <span>Add Widget</span>
                            </button>
                            <button type="button" className="pink-btn">
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
                            {userWidgets && typeof userWidgets[DASHBOARD_WIDGET_TODAYS_WORKOUT] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_TODAYS_WORKOUT] &&
                                <div className="col-md-4">
                                    <Workouts />
                                </div>
                            }

                            {userWidgets && typeof userWidgets[DASHBOARD_WIDGET_BODY_FAT] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_BODY_FAT] &&
                                <div className="col-md-4">
                                    <BodyFat />
                                </div>
                            }

                            {userWidgets && typeof userWidgets[DASHBOARD_WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_ACTIVITY_FEED] &&
                                <div className="col-md-4">
                                    <ActivityFeed />
                                </div>
                            }

                            {userWidgets && typeof userWidgets[DASHBOARD_WIDGET_BADGES] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_BADGES] &&
                                <div className="col-md-4">
                                    <Badges />
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
                    show={showWidgetsModal}
                    handleClose={this.handleCloseWidgetsModal}
                    onSubmit={this.handleSaveUserWidgets}
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
        var widgetsFormData = {
            [`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`]: false,
            [`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`]: false,
            [`dashboard_${DASHBOARD_WIDGET_BADGES}`]: false,
            [`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`]: false,
        };
        if (userWidgets && typeof userWidgets[DASHBOARD_WIDGET_TODAYS_WORKOUT] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_TODAYS_WORKOUT]) {
            widgetsFormData[`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`] = true;
        }
        if (userWidgets && typeof userWidgets[DASHBOARD_WIDGET_ACTIVITY_FEED] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_ACTIVITY_FEED]) {
            widgetsFormData[`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`] = true;
        }
        if (userWidgets && typeof userWidgets[DASHBOARD_WIDGET_BADGES] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_BADGES]) {
            widgetsFormData[`dashboard_${DASHBOARD_WIDGET_BADGES}`] = true;
        }
        if (userWidgets && typeof userWidgets[DASHBOARD_WIDGET_BODY_FAT] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_BODY_FAT]) {
            widgetsFormData[`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`] = true;
        }
        dispatch(initialize('dashboard_widgets_list_form', widgetsFormData));
        this.setState({ showWidgetsModal: true });
    }

    handleCloseWidgetsModal = () => {
        const { dispatch } = this.props;
        dispatch(reset('dashboard_widgets_list_form'));
        this.setState({ showWidgetsModal: false });
    }

    handleSaveUserWidgets = (data) => {
        const { userWidgets, dispatch } = this.props;
        let defaultDateRange = {
            start: moment().startOf('day').subtract(1, 'month').utc(),
            end: moment().startOf('day').utc(),
        };
        let requestData = {
            [DASHBOARD_WIDGET_TODAYS_WORKOUT]: 0,
            [DASHBOARD_WIDGET_ACTIVITY_FEED]: 0,
            [DASHBOARD_WIDGET_BADGES]: '',
            [DASHBOARD_WIDGET_BODY_FAT]: '',
        };
        if (typeof data[`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`] !== 'undefined' && data[`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`]) {
            requestData[DASHBOARD_WIDGET_TODAYS_WORKOUT] = (data[`dashboard_${DASHBOARD_WIDGET_TODAYS_WORKOUT}`]) ? 1 : 0;
        }
        if (typeof data[`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`] !== 'undefined' && data[`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`]) {
            requestData[DASHBOARD_WIDGET_ACTIVITY_FEED] = (data[`dashboard_${DASHBOARD_WIDGET_ACTIVITY_FEED}`]) ? 1 : 0;
        }
        if (typeof data[`dashboard_${DASHBOARD_WIDGET_BADGES}`] !== 'undefined' && data[`dashboard_${DASHBOARD_WIDGET_BADGES}`]) {
            requestData[DASHBOARD_WIDGET_BADGES] = (data[`dashboard_${DASHBOARD_WIDGET_BADGES}`]) ? 1 : 0;
        }
        if (typeof data[`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`] !== 'undefined' && data[`dashboard_${DASHBOARD_WIDGET_BODY_FAT}`]) {
            let data = {};
            if (userWidgets && typeof userWidgets[DASHBOARD_WIDGET_BODY_FAT] !== 'undefined' && userWidgets[DASHBOARD_WIDGET_BODY_FAT]) {
                data = userWidgets[DASHBOARD_WIDGET_BODY_FAT];
            } else {
                data = defaultDateRange;
            }
            requestData[DASHBOARD_WIDGET_BODY_FAT] = data;
        }
        dispatch(saveDashboardWidgetsDataRequest(requestData));
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
    };
};

export default connect(mapStateToProps)(Dashboard);