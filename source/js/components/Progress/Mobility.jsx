import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { PROGRESS_MOBILITY } from '../../constants/consts';
import moment from "moment";
import { getUserProgressByCategoryAndDateRequest, setUerProgressByCategoryAndDate } from '../../actions/userProgress';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import { routeCodes } from '../../constants/routes';
import CustomTooltip1 from './CustomTooltip1';
import NoRecordFound from '../Common/NoRecordFound';
import { IDB_TBL_PROGRESS, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';
import { connectIDB, isOnline } from '../../helpers/funs';

class Mobility extends Component {

    constructor(props) {
        super(props);
        this.iDB;
    }

    render() {
        const { loading, progress, error, selectedType } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="body-content progress-wrapper progress-mobility">
                {!loading && progress && typeof progress.data !== 'undefined' && progress.data && selectedType === PROGRESS_MOBILITY &&
                    <div className="tab-wrap">
                        <div className="tab-div"></div>
                        <div className="tab-wrap-body">
                            <div className="tab-wrap-body-inr">

                                <div className="mobility-conntent">
                                    {progress.data && typeof progress.data.flexibility !== 'undefined' && progress.data.flexibility &&
                                        <div className="mobility-conntent-box d-flex">
                                            <div className="mobility-conntent-box-l">
                                                <div className="mobility-conntent-box-l-title d-flex"><h3>Flexibility</h3> <NavLink to={routeCodes.EXERCISEFITNESS}><i className="icon-navigate_next"></i></NavLink></div>
                                                {typeof progress.data.flexibility.start !== 'undefined' && progress.data.flexibility.start &&
                                                    <div className="mobility-conntent-box-l-content d-flex">
                                                        <strong>At Start</strong>
                                                        <h6>
                                                            {`${(progress.data.flexibility.start.passed) ? progress.data.flexibility.start.passed : '0'} / ${(progress.data.flexibility.start.total) ? progress.data.flexibility.start.total : '0'} tests passed`}
                                                        </h6>
                                                    </div>
                                                }
                                                {typeof progress.data.flexibility.current !== 'undefined' && progress.data.flexibility.current &&
                                                    <div className="mobility-conntent-box-l-content d-flex">
                                                        <strong>Current</strong>
                                                        <h6>{`${(progress.data.flexibility.current.passed) ? progress.data.flexibility.current.passed : '0'} / ${(progress.data.flexibility.current.total) ? progress.data.flexibility.current.total : '0'} tests passed`}</h6>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mobility-conntent-box-r">
                                                <div className="mobility-conntent-box-r-graph">
                                                    <ResponsiveContainer>
                                                        <AreaChart data={progress.data.flexibility.graph_data}>
                                                            <defs>
                                                                <linearGradient id="mobilityArea" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                                                    <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                                            <YAxis hide={true} />
                                                            <Tooltip content={<CustomTooltip1 valueLabel="Flexibility" />} />
                                                            <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#mobilityArea)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {progress.data && typeof progress.data.posture !== 'undefined' && progress.data.posture &&
                                        <div className="mobility-conntent-box d-flex">
                                            <div className="mobility-conntent-box-l">
                                                <div className="mobility-conntent-box-l-title d-flex"><h3>Posture</h3> <NavLink to={routeCodes.EXERCISEFITNESS}><i className="icon-navigate_next"></i></NavLink></div>
                                                {typeof progress.data.posture.start !== 'undefined' && progress.data.posture.start &&
                                                    <div className="mobility-conntent-box-l-content d-flex">
                                                        <strong>At Start</strong>
                                                        <h6>
                                                            {`${(progress.data.posture.start.passed) ? progress.data.posture.start.passed : '0'} / ${(progress.data.posture.start.total) ? progress.data.posture.start.total : '0'} tests passed`}
                                                        </h6>
                                                    </div>
                                                }
                                                {typeof progress.data.posture.current !== 'undefined' && progress.data.posture.current &&
                                                    <div className="mobility-conntent-box-l-content d-flex">
                                                        <strong>Current</strong>
                                                        <h6>{`${(progress.data.posture.current.passed) ? progress.data.posture.current.passed : '0'} / ${(progress.data.posture.current.total) ? progress.data.posture.current.total : '0'} tests passed`}</h6>
                                                    </div>
                                                }
                                            </div>
                                            <div className="mobility-conntent-box-r">
                                                <div className="mobility-conntent-box-r-graph">
                                                    <ResponsiveContainer>
                                                        <AreaChart data={progress.data.posture.graph_data}>
                                                            <defs>
                                                                <linearGradient id="postureArea" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                                                    <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                                                </linearGradient>
                                                            </defs>
                                                            <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                                            <YAxis hide={true} />
                                                            <Tooltip content={<CustomTooltip1 valueLabel="Posture" />} />
                                                            <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#postureArea)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!loading && (typeof progress === 'undefined' || (progress && progress.length <= 0) || !progress) && error && error.length <= 0 &&
                    <NoRecordFound title="Fitness test(s) data are not available for these dates" />
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
                category: PROGRESS_MOBILITY,
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
        const { dateRange, dispatch, loading, progress, selectedType } = this.props;
        if (dateRange && prevProps.dateRange !== dateRange) {
            var requestData = {
                dateRange: dateRange,
                start: dateRange.start,
                end: dateRange.end,
                category: PROGRESS_MOBILITY,
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
                    const iDBGetReq = osBadge.get(PROGRESS_MOBILITY);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { progress: resultObj, error: [], selectedType: PROGRESS_MOBILITY }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        } else {
                            const data = { progress: [], error: [], selectedType: PROGRESS_MOBILITY }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        }
                    }
                }
            } catch (error) {
                const data = { progress: [], error: [], selectedType: PROGRESS_MOBILITY }
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
)(Mobility);
