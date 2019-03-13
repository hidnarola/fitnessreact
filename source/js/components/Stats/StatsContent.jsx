import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { STATS_STRENGTH, STATS_CARDIO } from '../../constants/consts';
import { getUserStatsRequest, getUserGraphDataRequest, getUserSingleStatsRequest, setUserStatsState } from '../../actions/userStats';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import StatsIndividualCard from './StatsIndividualCard';
import NoRecordFound from '../Common/NoRecordFound';
import { isOnline, connectIDB } from '../../helpers/funs';
import { IDB_TBL_STATS, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';

class StatsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialDataLoaded: false,
            fieldsLoaded: false,
            singleGraphDataRequest: null,
        }
        this.iDB;
        this.iDBOpenReq;
    }

    componentWillMount() {
        if (isOnline()) {
            this.getInitialStatsData();
        }
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
            <div className="body-content stats-wrapper strength-wrapper">
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

    componentDidMount() {
        connectIDB()(this.handleIDBOpenUpgrade).then((connection) => {
            this.iDBOpenReq = connection;
            this.handleIDBOpenSuccess(connection);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { initialDataLoaded, fieldsLoaded, singleGraphDataRequest } = this.state;
        const { loading, stats, selectedType, dispatch, loadingFields, match, regetStats, graphRawDataLoading } = this.props;
        if (match && match.params && match.params.type && prevProps.match && prevProps.match.params && prevProps.match.params.type && prevProps.match.params.type !== match.params.type) {
            if (isOnline()) {
                this.getInitialStatsData();
            } else {
                this.getDataFromIDB();
            }
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
            this.storeStatsInIDB(match.params.type, JSON.stringify(stats));
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
        if (!graphRawDataLoading && prevProps.graphRawDataLoading !== graphRawDataLoading) {
            this.storeStatsInIDB(match.params.type, JSON.stringify(stats));
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

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }

    handleIDBOpenUpgrade = (event) => {
        const db = event.target.result;
        db.createObjectStore(IDB_TBL_STATS, { keyPath: "type" });
    }

    getDataFromIDB = () => {
        const { match: { params: { type } }, dispatch } = this.props;
        if (type) {
            const idbTbls = [IDB_TBL_STATS];
            try {
                const transaction = this.iDB.transaction(idbTbls, IDB_READ);
                if (transaction) {
                    const osStats = transaction.objectStore(IDB_TBL_STATS);
                    const iDBGetReq = osStats.get(type);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.meta);
                            const newState = { stats: resultObj };
                            dispatch(setUserStatsState(newState));
                        } else {
                            const newState = { stats: null };
                            dispatch(setUserStatsState(newState));
                        }
                    }
                }
            } catch (error) { }
        }
    }

    storeStatsInIDB = (type, data) => {
        try {
            const idbData = { type, meta: data };
            const transaction = this.iDB.transaction([IDB_TBL_STATS], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_STATS);
            const iDBGetReq = objectStore.get(type);
            iDBGetReq.onsuccess = (event) => {
                const { target: { result } } = event;
                if (result) {
                    objectStore.put(idbData);
                } else {
                    objectStore.add(idbData);
                }
            }
        } catch (error) { }
    }

    componentWillUnmount() {
        try {
            const idbs = [IDB_TBL_STATS];
            if (isOnline()) {
                const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
                if (transaction) {
                    const osStats = transaction.objectStore(IDB_TBL_STATS);
                    osStats.clear();
                }
            }
            this.iDB.close();
            this.iDB = null;
            this.iDBOpenReq = null;
        } catch (error) { }
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
        graphRawDataLoading: userStats.get('graphRawDataLoading'),
    };
}

export default connect(
    mapStateToProps,
)(StatsContent);