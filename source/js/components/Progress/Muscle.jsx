import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { PROGRESS_MUSCLE } from '../../constants/consts';
import { getUserProgressByCategoryAndDateRequest, setUerProgressByCategoryAndDate } from '../../actions/userProgress';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { capitalizeFirstLetter } from '../../helpers/funs';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, LabelList } from "recharts";
import CustomTooltip from './CustomTooltip';
import NoRecordFound from '../Common/NoRecordFound';
import { IDB_TBL_PROGRESS, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';
import { connectIDB, isOnline } from '../../helpers/funs';

class Muscle extends Component {

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
            <div className="body-content progress-wrapper progress-muscle">
                {!loading && typeof progress !== 'undefined' && progress && typeof progress.data !== 'undefined' && progress.data && selectedType === PROGRESS_MUSCLE &&
                    <div className="tab-wrap">
                        <div className="tab-div"></div>
                        <div className="tab-wrap-body">
                            <div className="tab-wrap-body-inr">
                                <table className="table head-table-data">
                                    <tbody>
                                        <tr>
                                            <td>Muscle Group</td>
                                            <td>At Start <span className="icon-with-circle color-white"><i className="icon-event_note"></i></span></td>
                                            <td>Current <span className="icon-with-circle color-white"><i className="icon-event_note"></i></span></td>
                                            <td>Change</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {Object.keys(progress.data).map((k, i) => {
                                    return <MuscleCard key={i} set={k} data={progress.data[k]} />;
                                })}
                            </div>
                        </div>
                    </div>
                }

                {!loading && (typeof progress === 'undefined' || (progress && progress.length <= 0) || !progress) && typeof error !== 'undefined' && error && error.length <= 0 &&
                    <NoRecordFound title="Body data are not available for these days" />
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
                category: PROGRESS_MUSCLE,
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
                category: PROGRESS_MUSCLE,
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
        const { selectedType, dispatch } = this.props;
        if (selectedType) {
            const idbTbls = [IDB_TBL_PROGRESS];
            try {
                const transaction = this.iDB.transaction(idbTbls, IDB_READ);
                if (transaction) {
                    const osBadge = transaction.objectStore(IDB_TBL_PROGRESS);
                    const iDBGetReq = osBadge.get(PROGRESS_MUSCLE);
                    iDBGetReq.onsuccess = (event) => {
                        const { target: { result } } = event;
                        if (result) {
                            const resultObj = JSON.parse(result.data);
                            const data = { progress: resultObj, error: [], selectedType: PROGRESS_MUSCLE }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        } else {
                            const data = { progress: [], error: [], selectedType: PROGRESS_MUSCLE }
                            dispatch(setUerProgressByCategoryAndDate(data));
                        }
                    }
                }
            } catch (error) {
                const data = { progress: [], error: [], selectedType: PROGRESS_MUSCLE }
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
)(Muscle);

class MuscleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGraph: false,
        }
    }


    render() {
        const { showGraph } = this.state;
        const { data, set } = this.props;
        return (
            <div className="toggl-tab-div">
                <div className="toggl-tab-div-body">
                    <table className="table progress-muscle-body-table">
                        <tbody>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => this.setState({ showGraph: !showGraph })}>
                                        {showGraph && <span className="icon-with-circle-left gradient-color-2"><i className="icon-remove"></i></span>}
                                        {!showGraph && <span className="icon-with-circle-left gradient-color-1"><i className="icon-equalizer"></i></span>}
                                    </button>
                                    {(set) ? capitalizeFirstLetter(set.replace(/([a-z])([A-Z])/g, '$1 $2')) : 'Body Muscle'}
                                </td>
                                <td>{(data.start) ? `${data.start} ${(data.unit) ? data.unit : ''}` : '0'}</td>
                                <td>{(data.current) ? `${data.current} ${(data.unit) ? data.unit : ''}` : '0'}</td>
                                <td className="muscle-strength-last-td">
                                    <span>{(data.difference) ? `${data.difference} ${(data.unit) ? data.unit : ''}` : '0'}</span>
                                    {typeof data.percentageChange !== 'undefined' && data.percentageChange > 0 &&
                                        <span className="btn-change-span"><i className="icon-arrow_upward"></i> {data.percentageChange}%</span>
                                    }
                                    {typeof data.percentageChange !== 'undefined' && data.percentageChange < 0 &&
                                        <span className="btn-change-span gradient-color-2"><i className="icon-arrow_downward"></i> {data.percentageChange}%</span>
                                    }
                                    {typeof data.percentageChange !== 'undefined' && (data.percentageChange == 0 || data.percentageChange == null) &&
                                        <span className="btn-change-span gradient-color-1">0%</span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {showGraph && typeof data.graphData !== 'undefined' && data.graphData &&
                        <div className="tab-graph">
                            <ResponsiveContainer>
                                <AreaChart data={data.graphData}>
                                    <defs>
                                        <linearGradient id={`${set}Area`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                            <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                    <YAxis hide={true} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill={`url(#${set}Area)`} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    }
                </div>
            </div>
        );
    }
}