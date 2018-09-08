import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalizeFirstLetter } from '../../helpers/funs';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import CustomTooltip from '../Progress/CustomTooltip';
import { FRIENDSHIP_STATUS_SELF, TIMELINE_WIDGET_MUSCLE } from '../../constants/consts';
import DateRangePicker from 'react-daterange-picker';
import moment from "moment";
import _ from "lodash";
import { changeTimelineMuscleInnerDataRequest } from '../../actions/timelineWidgets';
import { FaCircleONotch } from "react-icons/lib/fa";
import NoDataFoundImg from "img/common/no_datafound.png";
import ErrorCloud from "svg/error-cloud.svg";

class ProfileFithubMuscleCardGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,
        }
    }

    render() {
        const { cardKey, data, profile, userWidgets } = this.props;
        const { showDatePicker } = this.state;
        let muscleWidget = userWidgets[TIMELINE_WIDGET_MUSCLE];
        let selectedWidget = _.find(muscleWidget, ['name', cardKey]);
        let dateRange = null;
        if (selectedWidget) {
            dateRange = moment.range(
                moment(selectedWidget.start),
                moment(selectedWidget.end)
            );
        }
        return (
            <div className="white-box space-btm-30 p-relative">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">{capitalizeFirstLetter(cardKey.replace(/([a-z])([A-Z])/g, '$1 $2').replace('_', ' '))}</h3>
                    {profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF &&
                        <div className="whitebox-head-r">
                            <button className="icon-settings no-border bg-transparent" onClick={this.toggleCalendar}></button>
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

                {data && data.loading &&
                    <div className="text-c">
                        <FaCircleONotch className="loader-spinner fs-50" />
                    </div>
                }

                {data && !data.loading && data.graphData && data.graphData.length > 0 &&
                    <div className="whitebox-body bodyfat-graph hyphen-30">
                        <ResponsiveContainer>
                            <AreaChart data={data.graphData}>
                                <defs>
                                    <linearGradient id={cardKey} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                        <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                <YAxis hide={true} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill={`url(#${cardKey})`} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                }

                {data && !data.loading && (!data.graphData || data.graphData.length <= 0) && (!data.error || data.error.length <= 0) &&
                    <div className="no-record-found-wrapper">
                        <img src={NoDataFoundImg} />
                    </div>
                }

                {data && !data.loading && data.error && data.error.length > 0 &&
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
        const { dispatch, cardKey } = this.props;
        let requestData = {
            bodypart: cardKey,
            start: range.start,
            end: range.end,
        };
        dispatch(changeTimelineMuscleInnerDataRequest(requestData));
        this.toggleCalendar();
    }
}

const mapStateToProps = (state) => {
    const { profile, timelineWidgets } = state;
    return {
        userWidgets: timelineWidgets.get('userWidgets'),
        profile: profile.get('profile'),
    };
}

export default connect(
    mapStateToProps,
)(ProfileFithubMuscleCardGraph);