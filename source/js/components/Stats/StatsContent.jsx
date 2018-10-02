import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { STATS_STRENGTH, STATS_CARDIO } from '../../constants/consts';
import { getUserStatsRequest, getUserGraphDataRequest, getUserSingleStatsRequest, setUserStatsState } from '../../actions/userStats';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import StatsIndividualCard from './StatsIndividualCard';
import NoRecordFound from '../Common/NoRecordFound';

class StatsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialDataLoaded: false,
            fieldsLoaded: false,
            singleGraphDataRequest: null,
        }
    }

    componentWillMount() {
        this.getInitialStatsData();
    }

    render() {
        const { loading, stats, error, selectedType } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="stats-wrapper strength-wrapper">
                {!loading && stats && stats.data && stats.data.length > 0 && (selectedType === STATS_STRENGTH || selectedType === STATS_CARDIO) &&
                    stats.data.map((o, i) => {
                        return (
                            <StatsIndividualCard
                                key={i}
                                o={o}
                                handleExerciseChange={this.handleExerciseChange}
                                handleShortCutCalendarBtn={this.handleShortCutCalendarBtn}
                                handleChangeFieldGraph={this.handleChangeFieldGraph}
                                handleDateRangeChange={this.handleDateRangeChange}
                            />
                        );
                    })
                }

                {!loading && (!stats || !stats.data || stats.data.length <= 0) && error && error.length <= 0 &&
                    <NoRecordFound title_class="fs-20" title="No records found! Please add some exercises and complete them to see your statistics." />
                }

                {!loading && error && error.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { initialDataLoaded, fieldsLoaded, singleGraphDataRequest } = this.state;
        const { loading, stats, selectedType, dispatch, loadingFields, match, regetStats } = this.props;
        if (match && match.params && match.params.type && prevProps.match && prevProps.match.params && prevProps.match.params.type && prevProps.match.params.type !== match.params.type) {
            this.getInitialStatsData();
        }
        if (!loading && initialDataLoaded) {
            let data = (stats && stats.data) ? stats.data : [];
            let requestData = [];
            data.map((o) => {
                let obj = {
                    type: selectedType,
                    subCategory: o.subCategory,
                    activeField: o.activeField,
                    start: o.dateRange.start,
                    end: o.dateRange.end,
                    exerciseId: o.exerciseId,
                };
                requestData.push(obj);
            });
            dispatch(getUserGraphDataRequest(requestData));
            this.setState({ initialDataLoaded: false });
        }
        if (!loadingFields && fieldsLoaded && singleGraphDataRequest) {
            let requestData = [singleGraphDataRequest];
            dispatch(getUserGraphDataRequest(requestData));
            this.setState({ fieldsLoaded: false, singleGraphDataRequest: null });
        }
        if (regetStats && prevProps.regetStats !== regetStats) {
            let stateData = { regetStats: false };
            dispatch(setUserStatsState(stateData));
            this.getInitialStatsData();
        }
    }

    getInitialStatsData = () => {
        const { dispatch, match, dateRange } = this.props;
        if (match && match.params && match.params.type) {
            let start = null;
            let end = null;
            if (dateRange) {
                start = dateRange.start;
                end = dateRange.end;
            } else {
                start = moment().startOf('day').utc().subtract(1, 'week');
                end = moment().startOf('day').utc();
            }
            let newdateRange = moment.range(
                start,
                end
            );
            let requestData = {
                type: match.params.type,
                dateRange: newdateRange,
                start,
                end
            }
            dispatch(getUserStatsRequest(requestData));
            this.setState({ initialDataLoaded: true });
        }
    }

    handleChangeFieldGraph = (o, activeField) => {
        const { selectedType, dispatch } = this.props;
        let requestData = [{
            type: selectedType,
            subCategory: o.subCategory,
            activeField,
            start: o.dateRange.start,
            end: o.dateRange.end,
            exerciseId: o.exerciseId,
        }];
        dispatch(getUserGraphDataRequest(requestData));
    }

    handleExerciseChange = (e, o) => {
        const { selectedType, dispatch } = this.props;
        let value = e.target.value;
        let requestData = {
            type: selectedType,
            subCategory: o.subCategory,
            activeField: o.activeField,
            start: o.dateRange.start,
            end: o.dateRange.end,
            exerciseId: value,
        };
        dispatch(getUserSingleStatsRequest(requestData));
        this.setState({ fieldsLoaded: true, singleGraphDataRequest: requestData });
    }

    handleShortCutCalendarBtn = (o, type) => {
        const { selectedType, dispatch } = this.props;
        let requestData = {
            type: selectedType,
            subCategory: o.subCategory,
            activeField: o.activeField,
            start: moment().startOf('day').utc().subtract(1, type),
            end: moment().startOf('day').utc(),
            exerciseId: o.exerciseId,
        };
        dispatch(getUserSingleStatsRequest(requestData));
        this.setState({ fieldsLoaded: true, singleGraphDataRequest: requestData });
    }

    handleDateRangeChange = (o, range) => {
        const { selectedType, dispatch } = this.props;
        let requestData = {
            type: selectedType,
            subCategory: o.subCategory,
            activeField: o.activeField,
            start: range.start,
            end: range.end,
            exerciseId: o.exerciseId,
        };
        dispatch(getUserSingleStatsRequest(requestData));
        this.setState({ fieldsLoaded: true, singleGraphDataRequest: requestData });
    }
}

const mapStateToProps = (state) => {
    const { userStats } = state;
    return {
        loading: userStats.get('loading'),
        loadingFields: userStats.get('loadingFields'),
        stats: userStats.get('stats'),
        selectedType: userStats.get('selectedType'),
        error: userStats.get('error'),
        dateRange: userStats.get('dateRange'),
        regetStats: userStats.get('regetStats'),
    };
}

export default connect(
    mapStateToProps,
)(StatsContent);