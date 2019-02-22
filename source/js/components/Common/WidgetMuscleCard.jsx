import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DateRangePicker from 'react-daterange-picker';
import DateRangePickerCustomPeriod from './DateRangePickerCustomPeriod';
import { WIDGETS_TYPE_TIMELINE, FRIENDSHIP_STATUS_SELF, WIDGETS_TYPE_DASHBOARD, WIDGET_MUSCLE } from '../../constants/consts';
import cns from "classnames";
import NoRecordFound from './NoRecordFound';
import { FaCircleONotch } from "react-icons/lib/fa";
import ErrorCloud from "svg/error-cloud.svg";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import CustomTooltip from '../Progress/CustomTooltip';
import _ from "lodash";
import moment from "moment";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";

class WidgetMuscleCard extends Component {
    constructor(props) {
        super(props);
        let initialSelectedMuscle = "";
        if (props.muscle && Object.keys(props.muscle).length > 0) {
            initialSelectedMuscle = Object.keys(props.muscle)[0];
        }
        this.state = {
            showDatePicker: false,
            selectedMuscle: initialSelectedMuscle
        }
    }

    render() {
        const { muscle, bodyWrapperClass, userWidgets, type, profile } = this.props;
        const { showDatePicker, selectedMuscle } = this.state;
        let data = null;
        let dateRange = null;
        if (muscle && Object.keys(muscle).length > 0 && selectedMuscle) {
            data = muscle[selectedMuscle];
            let muscleWidget = userWidgets[WIDGET_MUSCLE];
            let selectedWidget = _.find(muscleWidget, ['name', selectedMuscle]);
            if (selectedWidget) {
                dateRange = moment.range(
                    moment(selectedWidget.start),
                    moment(selectedWidget.end)
                );
            }
        }
        return (
            <div className={cns({ [bodyWrapperClass]: (bodyWrapperClass) ? true : false })}>
                <div className={cns('white-box space-btm-30 p-relative widget-graph-card-wrapper min-height-339')}>
                    <div className="whitebox-head d-flex">
                        <ButtonToolbar className="muscle-graph-btn-tool">
                            <Dropdown id="muscle-graph-dd" className="muscle-graph-dd">
                                <Dropdown.Toggle>{selectedMuscle}</Dropdown.Toggle>
                                <Dropdown.Menu className="muscle-graph-dd-menu">
                                    {muscle && Object.keys(muscle).map((k) => {
                                        return (
                                            <MenuItem className="muscle-graph-dd-menu-item" key={k} href="javascript:void(0)" onClick={() => this.handleMuscleChange(k)}>{k.replace(/([a-z])([A-Z])/g, '$1 $2').replace('_', ' ').toLowerCase()}</MenuItem>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                        {((type === WIDGETS_TYPE_TIMELINE && profile && profile.friendshipStatus && profile.friendshipStatus === FRIENDSHIP_STATUS_SELF) || (type === WIDGETS_TYPE_DASHBOARD)) &&
                            <Fragment>
                                <div className="whitebox-head-r">
                                    <button className="icon-date_range fs-20 no-border bg-transparent v-align-mid" onClick={this.toggleCalendar}></button>
                                    {showDatePicker &&
                                        <div className="fithub-widget-date-range custom_date_pdl">
                                            <DateRangePickerCustomPeriod
                                                dateRange={dateRange}
                                                changeCallback={this.handleCustomDateRange}
                                            />
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
                            </Fragment>
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
                                        <linearGradient id="muscle-graph-data" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="8%" stopColor="#9625a9" stopOpacity={1} />
                                            <stop offset="92%" stopColor="#1808b3" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey='date' axisLine={false} tickLine={false} mirror={false} interval="preserveStartEnd" tick={{ stroke: '#000', strokeWidth: 1 }} />
                                    <YAxis hide={true} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type='monotone' dataKey='count' activeDot={{ stroke: '#46E9C5', strokeWidth: 2, fill: "#fff" }} stroke="none" fill={`url(#muscle-graph-data)`} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    }

                    {data && !data.loading && (!data.graphData || data.graphData.length <= 0) && (!data.error || data.error.length <= 0) &&
                        <NoRecordFound />
                    }

                    {data && !data.loading && data.error && data.error.length > 0 &&
                        <div className="server-error-wrapper">
                            <ErrorCloud />
                            <h4>Something went wrong! please try again.</h4>
                        </div>
                    }
                </div>
            </div>
        );
    }

    toggleCalendar = () => {
        this.setState((prevState) => { return { showDatePicker: !prevState.showDatePicker } });
    }

    handleMuscleChange = (value) => {
        this.setState({ selectedMuscle: value });
    }

    handleTimeDateRange = (range, state) => {
        const { requestGraphData } = this.props;
        const { selectedMuscle } = this.state;
        let requestData = { bodypart: selectedMuscle, start: range.start, end: range.end };
        requestGraphData(requestData);
        this.toggleCalendar();
    }

    handleCustomDateRange = (start, end) => {
        const { requestGraphData } = this.props;
        const { selectedMuscle } = this.state;
        let requestData = { bodypart: selectedMuscle, start, end };
        requestGraphData(requestData);
        this.toggleCalendar();
    }
}

const mapStateToProps = (state) => {
    const { profile } = state;
    return {
        profile: profile.get('profile'),
    };
}

export default connect(
    mapStateToProps,
)(WidgetMuscleCard);