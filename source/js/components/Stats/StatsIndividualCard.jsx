import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import { capitalizeFirstLetter } from '../../helpers/funs';
import cns from "classnames";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import { EXE_SCATS } from '../../constants/consts';
import DateRangePicker from 'react-daterange-picker';

class StatsIndividualCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCalendar: false,
        }
    }

    render() {
        const { o, handleExerciseChange, handleChangeFieldGraph } = this.props;
        const { openCalendar } = this.state;
        let subCategory = _.find(EXE_SCATS, ['value', o.subCategory]);
        let subCategoryTitle = 'Overview';
        if (subCategory) {
            subCategoryTitle = subCategory.label;
        }
        return (
            <div className="stats-content">
                <div className="stats-content-head d-flex">
                    <div className="stats-content-head-l d-flex">
                        <h4>{subCategoryTitle}</h4>
                        {o.exercises && o.exercises.length > 0 &&
                            <select name={`exe_${o.subCategory}`} onChange={(e) => handleExerciseChange(e, o)} value={(o.exerciseId) ? o.exerciseId : 'all'}>
                                <option value="all">All Varient</option>
                                {
                                    o.exercises.map((e, ei) => {
                                        return (
                                            <option key={ei} value={e._id}>{e.name}</option>
                                        );
                                    })
                                }
                            </select>
                        }
                    </div>
                    <div className="stats-content-head-r">
                        <button type="button" className={cns({ 'active': (o.activeCalendarBtn && o.activeCalendarBtn === 'week') })} onClick={() => this.handleCalendarShortCutBtn('week')}>Week</button>
                        <button type="button" className={cns({ 'active': (o.activeCalendarBtn && o.activeCalendarBtn === 'month') })} onClick={() => this.handleCalendarShortCutBtn('month')}>Month</button>
                        <button type="button" className={cns('calendar-toggle', { 'active': (o.activeCalendarBtn && o.activeCalendarBtn === 'calendar') })} onClick={this.handleOpenCalendar}><i className="icon-date_range vertical-middle-c"></i></button>
                    </div>
                    {openCalendar &&
                        <div className="date-range-picker">
                            <DateRangePicker
                                firstOfWeek={1}
                                numberOfCalendars={2}
                                selectionType='range'
                                value={o.dateRange}
                                onSelect={this.handleDateRange}
                                className="progress-date-range"
                            />
                        </div>
                    }
                </div>
                <div className="stats-content-body d-flex">
                    <div className="stats-content-body-l">
                        {o.fieldsLoading &&
                            <div className="loader-block">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!o.fieldsLoading && o.fields && Object.keys(o.fields).length > 0 &&
                            Object.keys(o.fields).map((key, j) => {
                                let field = o.fields[key];
                                if (typeof field.total !== 'undefined' && field.total > 0) {
                                    return (
                                        <button
                                            key={j}
                                            type="button"
                                            className={cns({ 'active': o.activeField === key })}
                                            onClick={() => handleChangeFieldGraph(o, key)}
                                        >
                                            <div className="stats-btn-head">{`Total ${capitalizeFirstLetter(key.replace(/([a-z])([A-Z])/g, '$1 $2'))}`}</div>
                                            <div className="stats-btn-body"><h3>{`${field.total} ${field.unit}`}</h3></div>
                                        </button>
                                    );
                                }
                                return null;
                            })
                        }
                        {!o.fieldsLoading && (!o.fields || Object.keys(o.fields).length <= 0) && o.fieldsError && o.fieldsError.length <= 0 &&
                            <div className="no-record-block">
                                <img src={NoDataFoundImg} />
                            </div>
                        }
                        {!o.fieldsLoading && (!o.fields || Object.keys(o.fields).length <= 0) && o.fieldsError && o.fieldsError.length > 0 &&
                            <div className="error-block">
                                <ErrorCloud />
                                <h4>Try again later.</h4>
                            </div>
                        }
                    </div>
                    <div className="stats-content-body-r">
                        {o.graphLoading &&
                            <div className="loader-block">
                                <FaCircleONotch className="loader-spinner fs-50" />
                            </div>
                        }
                        {!o.graphLoading && o.graphData && o.graphData.length > 0 &&
                            <div className="stats-content-graph">
                                <ResponsiveContainer>
                                    <AreaChart data={o.graphData}>
                                        <defs>
                                            <linearGradient id={`graph_data_${o.subCategory}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="8%" stopColor="#FF339A" stopOpacity={1} />
                                                <stop offset="92%" stopColor="#FF3366" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        {/* <defs>
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
                                        </defs> */}
                                        <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                        <YAxis hide={true} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill={`url(#graph_data_${o.subCategory})`} />
                                        {/* <Area type='monotone' dataKey='count2' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_2)" />
                                        <Area type='monotone' dataKey='count3' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea_3)" /> */}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        }
                        {!o.graphLoading && (!o.graphData || o.graphData.length <= 0) && o.graphError && o.graphError.length <= 0 &&
                            <div className="no-record-block">
                                <img src={NoDataFoundImg} />
                            </div>
                        }
                        {!o.graphLoading && (!o.graphData || o.graphData.length <= 0) && o.graphError && o.graphError.length > 0 &&
                            <div className="error-block">
                                <ErrorCloud />
                                <h4>Try again later.</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleCalendarShortCutBtn = (type) => {
        const { o, handleShortCutCalendarBtn } = this.props;
        this.setState({ openCalendar: false });
        handleShortCutCalendarBtn(o, type);
    }

    handleOpenCalendar = () => {
        this.setState({ openCalendar: true });
    }

    handleDateRange = (range, state) => {
        const { o, handleDateRangeChange } = this.props;
        handleDateRangeChange(o, range);
        this.setState({ openCalendar: false });
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(StatsIndividualCard);

class CustomTooltip extends Component {
    render() {
        const { payload, label, active } = this.props;
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        {payload[0].payload && payload[0].payload.metaData && payload[0].payload.metaData.name &&
                            <li><strong>{`Total ${capitalizeFirstLetter(payload[0].payload.metaData.name.replace(/([a-z])([A-Z])/g, '$1 $2'))}`} : </strong> <span>{`${payload[0].value} ${payload[0].payload.metaData.unit}`}</span></li>
                        }
                    </ul>
                </div>
            );
        }
        return null;
    }
}