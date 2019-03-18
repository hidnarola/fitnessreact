import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { PROGRESS_BODY_FAT } from '../../constants/consts';
import { getUserProgressByCategoryAndDateRequest, setUerProgressByCategoryAndDate } from '../../actions/userProgress';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import CustomTooltip1 from './CustomTooltip1';
import NoRecordFound from '../Common/NoRecordFound';
import { IDB_TBL_PROGRESS, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';
import { connectIDB, isOnline } from '../../helpers/funs';

class BodyFat extends Component {

    constructor(props) {
        super(props);
        this.iDB;
    }

    render() {
        const { loading, error, progress, selectedType } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="body-content progress-wrapper progress-body-fat">
                {!loading && typeof progress !== 'undefined' && progress && typeof progress.data !== 'undefined' && progress.data && selectedType === PROGRESS_BODY_FAT && progress.data.body_fat && Object.keys(progress.data.body_fat).length > 0 &&
                    <div className="tab-wrap">
                        <div className="tab-div"></div>
                        <div className="tab-wrap-body">
                            <div className="tab-wrap-body-inr">
                                <div className="progress-body-fat-content d-flex">
                                    <div className="progress-body-fat-small-box">
                                        <div className="head d-flex">
                                            <span className="title">At Start</span>
                                            <span className="icon-with-circle color-white"><i className="icon-event_note ml-5"></i></span>
                                        </div>
                                        <div className="body">
                                            <h1>{(progress.data.body_fat.start) ? progress.data.body_fat.start : '0'}%</h1>
                                        </div>
                                    </div>
                                    <div className="progress-body-fat-small-box">
                                        <div className="head d-flex">
                                            <span className="title">Current</span>
                                            <span className="icon-with-circle color-white"><i className="icon-event_note ml-5"></i></span>
                                        </div>
                                        <div className="body">
                                            <h1>{(progress.data.body_fat.current) ? progress.data.body_fat.current : '0'}%</h1>
                                        </div>
                                    </div>
                                    <div className="progress-body-fat-larget-box">
                                        <ResponsiveContainer>
                                            <AreaChart data={progress.data.body_fat.graph_data}>
                                                <defs>
                                                    <linearGradient id="bodyFatArea" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                                        <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                                <YAxis hide={true} />
                                                <Tooltip content={<CustomTooltip1 valueLabel="Body Fat" valueUnit="%" />} />
                                                <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!loading && (typeof progress === 'undefined' || (progress && progress.length <= 0)) && typeof error !== 'undefined' && error && error.length <= 0 &&
                    <NoRecordFound title="Body fat data are not available for these days" />
                }

                {!loading && typeof error !== 'undefined' && error && error.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }
            </div>
        );
    }

    componentDidMount() {

        connectIDB()().then((connection) => {
            this.handleIDBOpenSuccess(connection);
        });
        
        if (isOnline()) {
            const { dispatch, dateRange } = this.props;
            var requestDate = dateRange;
            if (!requestDate) {
                requestDate = moment.range(
                    moment().subtract(1, 'month').startOf('day').utc(),
                    moment().startOf('day').utc()
                )
            }
            var requestData = {
                dateRange: requestDate,
                start: requestDate.start,
                end: requestDate.end,
                category: PROGRESS_BODY_FAT,
            }
            dispatch(getUserProgressByCategoryAndDateRequest(requestData));
        }
    }

    handleIDBOpenSuccess = (connection) => {
        this.iDB = connection.result;
        if (!isOnline()) {
            this.getDataFromIDB();
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { loading, dateRange, dispatch, progress, selectedType } = this.props;
        if (dateRange && prevProps.dateRange !== dateRange) {
            var requestData = {
                dateRange: dateRange,
                start: dateRange.start,
                end: dateRange.end,
                category: PROGRESS_BODY_FAT,
            }
            dispatch(getUserProgressByCategoryAndDateRequest(requestData));
        }
        if (!loading && prevProps.loading !== loading) {
            this.storeProgressInIDB(selectedType, JSON.stringify(progress));
        }
    }

    storeProgressInIDB = (type, data) => {
        try {
            const idbData = { type, data };
            const transaction = this.iDB.transaction([IDB_TBL_PROGRESS], IDB_READ_WRITE);
            const objectStore = transaction.objectStore(IDB_TBL_PROGRESS);
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

    getDataFromIDB = () => {
        const { selectedType, dispatch} = this.props;
        if (selectedType) {
            const idbTbls = [IDB_TBL_PROGRESS];
            try {
                const transaction = this.iDB.transaction(idbTbls, IDB_READ);
                if (transaction) {
                    const osBadge = transaction.objectStore(IDB_TBL_PROGRESS);
                    const iDBGetReq = osBadge.get(PROGRESS_BODY_FAT);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { progress: resultObj, error: [], selectedType: PROGRESS_BODY_FAT }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        } else {
                            const data = { progress: [], error: [], selectedType: PROGRESS_BODY_FAT }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        }
                    }
                }
            } catch (error) {
                const data = { progress: [], error: [], selectedType: PROGRESS_BODY_FAT }
                dispatch(setUerProgressByCategoryAndDate(data));
            }
        }
    }

    componentWillUnmount() {
        try {
            this.iDB.close();
        } catch (error) { }
    }
    
}

const mapStateToProps = (state) => {
    const { userProgress } = state;
    return {
        loading: userProgress.get('loading'),
        selectedType: userProgress.get('selectedType'),
        progress: userProgress.get('progress'),
        dateRange: userProgress.get('dateRange'),
        error: userProgress.get('error')
    };
}

export default connect(
    mapStateToProps,
)(BodyFat);