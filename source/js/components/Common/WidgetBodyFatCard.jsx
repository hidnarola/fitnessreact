import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import DateRangePicker from 'react-daterange-picker';
import { WIDGET_BODY_FAT } from '../../constants/consts';
import moment from 'moment';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";

class WidgetBodyFatCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
        }
    }

    render() {
        const { bodyFat, userWidgets, changeBodyFatLoading, changeBodyFatError } = this.props;
        const { showCalendar } = this.state;
        let dateRange = null;
        if (userWidgets && typeof userWidgets[WIDGET_BODY_FAT] !== 'undefined' && userWidgets[WIDGET_BODY_FAT]) {
            let start = userWidgets[WIDGET_BODY_FAT].start;
            let end = userWidgets[WIDGET_BODY_FAT].end;
            dateRange = moment.range(
                start,
                end
            );
        }
        return (
            <div className="white-box space-btm-30 dashboard-bodyfat-card min-height-373">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Body Fat</h3>
                    <div className="whitebox-head-r">
                        <a href="javascript:void(0)" onClick={this.toggleCalendar} className="icon-date_range"></a>
                    </div>
                </div>

                {changeBodyFatLoading &&
                    <div className="text-c">
                        <FaCircleONotch className="loader-spinner fs-50" />
                    </div>
                }
                {!changeBodyFatLoading && bodyFat && bodyFat.length > 0 &&
                    <div className="whitebox-body bodyfat-graph">
                        <ResponsiveContainer>
                            <AreaChart data={bodyFat}>
                                <defs>
                                    <linearGradient id="bodyFatArea" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                        <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                <YAxis hide={true} />
                                <Tooltip content={<CustomTooltip valueLabel="Body Fat" valueUnit="%" />} />
                                <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                }
                {!changeBodyFatLoading && (!bodyFat || bodyFat.length <= 0) && changeBodyFatError && changeBodyFatError.length <= 0 &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
                }
                {!changeBodyFatLoading && changeBodyFatError && changeBodyFatError.length > 0 &&
                    <div className="server-error-wrapper">
                        <ErrorCloud />
                        <h4>Something went wrong! please try again.</h4>
                    </div>
                }

                {showCalendar &&
                    <div className="bodyfat-date-range-picker">
                        <DateRangePicker
                            firstOfWeek={1}
                            numberOfCalendars={1}
                            selectionType='range'
                            value={dateRange}
                            onSelect={this.handleTimeDateRange}
                            className="progress-date-range"
                        />
                    </div>
                }
            </div>
        );
    }

    toggleCalendar = () => {
        const { showCalendar } = this.state;
        this.setState({ showCalendar: !showCalendar });
    }

    handleTimeDateRange = (range, state) => {
        const { requestBodyFatData } = this.props;
        let requestData = {
            start: range.start,
            end: range.end,
        };
        requestBodyFatData(requestData);
        this.toggleCalendar();
    }
}

export default WidgetBodyFatCard;

class CustomTooltip extends Component {
    render() {
        const { payload, label, active, valueLabel, valueUnit } = this.props;
        if (active) {
            return (
                <div className="custom-graph-tooltip-wrapper">
                    <ul>
                        <li><strong>Date : </strong> <span>{label}</span></li>
                        <li><strong>{(valueLabel) ? valueLabel : 'Data'} : </strong> <span>{payload[0].value}{(valueUnit) ? valueUnit : ""}</span></li>
                    </ul>
                </div>
            );
        }
        return null;
    }
}