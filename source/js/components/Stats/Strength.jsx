import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { STATS_STRENGTH } from '../../constants/consts';
import { getUserStatsRequest } from '../../actions/userStats';
import { FaCircleONotch } from "react-icons/lib/fa";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";

class Strength extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        let requestData = {
            selectedType: STATS_STRENGTH,
            start: moment().startOf('day').utc().add(7, 'days'),
            end: moment().startOf('day').utc(),
        }
        dispatch(getUserStatsRequest(requestData));
    }

    render() {
        const data = [
            { date: '1', count1: 10, count2: 20, count3: 8 },
            { date: '2', count1: 8, count2: 19, count3: 18 },
            { date: '3', count1: 9, count2: 18, count3: 8 },
            { date: '4', count1: 14, count2: 17, count3: 18 },
            { date: '5', count1: 18, count2: 16, count3: 8 },
            { date: '6', count1: 20, count2: 15, count3: 18 },
            { date: '7', count1: 21, count2: 22, count3: 8 },
            { date: '8', count1: 5, count2: 21, count3: 18 },
            { date: '9', count1: 0, count2: 11, count3: 8 },
            { date: '10', count1: 5, count2: 10, count3: 18 },
            { date: '11', count1: 11, count2: 9, count3: 8 },
            { date: '12', count1: 16, count2: 29, count3: 18 },
            { date: '13', count1: 14, count2: 1, count3: 8 },
            { date: '14', count1: 16, count2: 0, count3: 18 },
            { date: '15', count1: 11, count2: 22, count3: 8 },
        ];
        const { loading } = this.props;
        if (loading) {
            return (
                <div className="no-content-loader">
                    <FaCircleONotch className="loader-spinner fs-100" />
                </div>
            );
        }
        return (
            <div className="stats-wrapper strength-wrapper">
                <div className="stats-content">
                    <div className="stats-content-head d-flex">
                        <div className="stats-content-head-l">
                            <h4>Overview</h4>
                        </div>
                        <div className="stats-content-head-r">
                            <button type="button" className="active">Week</button>
                            <button type="button" className="">Month</button>
                            <button type="button" className="calendar-toggle"><i className="icon-date_range"></i></button>
                        </div>
                    </div>
                    <div className="stats-content-body d-flex">
                        <div className="stats-content-body-l">
                            <button type="button" className="active">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                        </div>
                        <div className="stats-content-body-r">
                            <div className="stats-content-graph">
                                <ResponsiveContainer>
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="bodyFatArea_1" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#FF339A" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#FF3366" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <defs>
                                            <linearGradient id="bodyFatArea_2" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#46E9C5" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#3FFBFC" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <defs>
                                            <linearGradient id="bodyFatArea_3" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                        <YAxis hide={true} />
                                        <Tooltip />
                                        <Area type='monotone' dataKey='count1' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_1)" />
                                        <Area type='monotone' dataKey='count2' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_2)" />
                                        <Area type='monotone' dataKey='count3' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_3)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stats-content">
                    <div className="stats-content-head d-flex">
                        <div className="stats-content-head-l">
                            <h4>Overview</h4>
                        </div>
                        <div className="stats-content-head-r">
                            <button type="button" className="active">Week</button>
                            <button type="button" className="">Month</button>
                            <button type="button" className="calendar-toggle"><i className="icon-date_range"></i></button>
                        </div>
                    </div>

                    <div className="stats-content-body d-flex">
                        <div className="stats-content-body-l">
                            <button type="button" className="active">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                            <button type="button">
                                <div className="stats-btn-head">Weight lifted</div>
                                <div className="stats-btn-body"><h3>654 kg</h3></div>
                            </button>
                        </div>
                        <div className="stats-content-body-r">
                            <div className="stats-content-graph">
                                <ResponsiveContainer>
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="bodyFatArea_1" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#FF339A" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#FF3366" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <defs>
                                            <linearGradient id="bodyFatArea_2" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#46E9C5" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#3FFBFC" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <defs>
                                            <linearGradient id="bodyFatArea_3" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                        <YAxis hide={true} />
                                        <Tooltip />
                                        <Area type='monotone' dataKey='count1' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_1)" />
                                        <Area type='monotone' dataKey='count2' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_2)" />
                                        <Area type='monotone' dataKey='count3' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_3)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userStats } = state;
    return {
        loading: userStats.get('loading'),
        stats: userStats.get('stats'),
        selectedType: userStats.get('selectedType'),
        error: userStats.get('error'),
    };
}

export default connect(
    mapStateToProps,
)(Strength);