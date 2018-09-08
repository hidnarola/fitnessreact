import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import CustomTooltip1 from '../Progress/CustomTooltip1';
import { FRIENDSHIP_STATUS_SELF, TIMELINE_WIDGET_BODY_FAT } from '../../constants/consts';
import DateRangePicker from 'react-daterange-picker';
import moment from "moment";
import { changeTimelineBodyFatWidgetRequest } from '../../actions/timelineWidgets';

class ProfileFithubBodyFatCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,
        }
    }

    render() {
        const { bodyFat, profile, userWidgets, changeBodyFatLoading, changeBodyFatError } = this.props;
        const { showDatePicker } = this.state;
        let widgetBodyFat = userWidgets[TIMELINE_WIDGET_BODY_FAT];
        let dateRange = null;
        if (widgetBodyFat) {
            dateRange = moment.range(
                moment(widgetBodyFat.start),
                moment(widgetBodyFat.end)
            );
        }
        return (
            <div className="white-box space-btm-30 p-relative">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Body Fat</h3>
                    {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                        <div className="whitebox-head-r">
                            <button
                                className="icon-settings no-border bg-transparent"
                                onClick={this.toggleCalendar}
                            >
                            </button>
                        </div>
                    }
                    {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF && showDatePicker &&
                        <div className="fithub-widget-date-range">
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

                {changeBodyFatLoading &&
                    <div className="text-c">
                        <FaCircleONotch className="loader-spinner fs-50" />
                    </div>
                }

                {!changeBodyFatLoading && bodyFat && bodyFat.length > 0 &&
                    <div className="whitebox-body bodyfat-graph hyphen-30">
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
                                <Tooltip content={<CustomTooltip1 valueLabel="Body Fat" valueUnit="%" />} />
                                <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill="url(#bodyFatArea)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                }

                {!changeBodyFatLoading && (!bodyFat || bodyFat.length <= 0) && (!changeBodyFatError || changeBodyFatError.length <= 0) &&
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
            </div>
        );
    }

    toggleCalendar = () => {
        const { showDatePicker } = this.state;
        this.setState({ showDatePicker: !showDatePicker })
    }

    handleTimeDateRange = (range, state) => {
        const { dispatch } = this.props;
        let requestData = {
            start: range.start,
            end: range.end,
        };
        dispatch(changeTimelineBodyFatWidgetRequest(requestData));
        this.toggleCalendar();
    }
}

const mapStateToProps = (state) => {
    const { timelineWidgets, profile } = state;
    return {
        bodyFat: timelineWidgets.get('bodyFat'),
        changeBodyFatLoading: timelineWidgets.get('changeBodyFatLoading'),
        changeBodyFatError: timelineWidgets.get('changeBodyFatError'),
        userWidgets: timelineWidgets.get('userWidgets'),
        profile: profile.get('profile'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithubBodyFatCard);