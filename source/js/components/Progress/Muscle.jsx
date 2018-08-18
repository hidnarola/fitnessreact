import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { PROGRESS_MUSCLE } from '../../constants/consts';
import { getUserProgressByCategoryAndDateRequest } from '../../actions/userProgress';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import { capitalizeFirstLetter } from '../../helpers/funs';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, LabelList } from "recharts";

class Muscle extends Component {
    componentWillMount() {
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
            <div className="progress-wrapper progress-muscle">
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

                {!loading && (typeof progress === 'undefined' || !progress) && typeof error !== 'undefined' && error && error.length <= 0 &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
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

    componentDidUpdate(prevProps, prevState) {
        const { dateRange, dispatch } = this.props;
        if (dateRange && prevProps.dateRange !== dateRange) {
            var requestData = {
                dateRange: dateRange,
                start: dateRange.start,
                end: dateRange.end,
                category: PROGRESS_MUSCLE,
            }
            dispatch(getUserProgressByCategoryAndDateRequest(requestData));
        }
    }
}

const mapStateToProps = (state) => {
    const { userProgress } = state;
    return {
        loading: userProgress.get('loading'),
        selectedType: userProgress.get('selectedType'),
        progress: userProgress.get('progress'),
        dateRange: userProgress.get('dateRange'),
        error: userProgress.get('error'),
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

class CustomTooltip extends Component {
    render() {
        const { payload, label, active } = this.props;
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        {payload[0].payload && payload[0].payload.metaData && payload[0].payload.metaData.name &&
                            <li><strong>{payload[0].payload.metaData.name} : </strong> <span>{`${payload[0].value} ${payload[0].payload.metaData.unit}`}</span></li>
                        }
                    </ul>
                </div>
            );
        }
        return null;
    }
}