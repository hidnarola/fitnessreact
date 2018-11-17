import React, { Component } from 'react';
import moment from "moment";
import cns from "classnames";

class DateRangePickerCustomPeriod extends Component {
    render() {
        const { dateRange } = this.props;
        let rangeLiesInNo = 0;
        if (dateRange) {
            rangeLiesInNo = this.getRangeLiesIn(dateRange);
        }
        return (
            <ul className="custom-date-period">
                <li><button type="button" className={cns({ 'date_active': (rangeLiesInNo === 1) })} onClick={() => this.handleCustomDateRange(0, 'months', 1)}>This month</button></li>
                <li><button type="button" className={cns({ 'date_active': (rangeLiesInNo === 2) })} onClick={() => this.handleCustomDateRange(0, 'months', -1)}>Last month</button></li>
                <li><button type="button" className={cns({ 'date_active': (rangeLiesInNo === 3) })} onClick={() => this.handleCustomDateRange(3, 'months', -1)}>Last 3 months</button></li>
                <li><button type="button" className={cns({ 'date_active': (rangeLiesInNo === 4) })} onClick={() => this.handleCustomDateRange(6, 'months', -1)}>Last 6 months</button></li>
                <li><button type="button" className={cns({ 'date_active': (rangeLiesInNo === 5) })} onClick={() => this.handleCustomDateRange(1, 'years', -1)}>Last year</button></li>
            </ul>
        );
    }

    handleCustomDateRange = (frequency, duration = 'months', rangeFlag = 1) => {
        const { changeCallback } = this.props;
        let today = moment().startOf('day').utc();
        let start = today;
        let end = today;
        if (rangeFlag === 1) {
            start = moment().startOf('month').startOf('day').utc();
            if (frequency > 0) {
                end = moment().add((frequency - 1), duration).endOf('month').endOf('day').utc();
            } else {
                end = moment().endOf('month').endOf('day').utc();
            }
        } else if (rangeFlag === -1) {
            end = moment().subtract(1, 'months').endOf('month').endOf('day').utc();
            if (frequency > 0) {
                start = moment().startOf('month').startOf('day').subtract(frequency, duration).utc();
            } else {
                start = moment().startOf('month').startOf('day').subtract(1, 'months').utc();
            }
        }
        changeCallback(start, end);
    }

    getRangeLiesIn = (dateRange) => {
        const { start, end } = dateRange;
        let rangeLiesInNo = 0;
        if (start.local().format('YYYY-MM-DD') == moment().startOf('month').startOf('day').local().format('YYYY-MM-DD') && end.local().format('YYYY-MM-DD') == moment().endOf('month').endOf('day').local().format('YYYY-MM-DD')) {
            rangeLiesInNo = 1;
        } else if (start.local().format('YYYY-MM-DD') == moment().startOf('month').startOf('day').subtract(1, 'months').local().format('YYYY-MM-DD') && end.local().format('YYYY-MM-DD') == moment().subtract(1, 'months').endOf('month').endOf('day').local().format('YYYY-MM-DD')) {
            rangeLiesInNo = 2;
        } else if (start.local().format('YYYY-MM-DD') == moment().startOf('month').startOf('day').subtract(3, 'months').local().format('YYYY-MM-DD') && end.local().format('YYYY-MM-DD') == moment().subtract(1, 'months').endOf('month').endOf('day').local().format('YYYY-MM-DD')) {
            rangeLiesInNo = 3;
        } else if (start.local().format('YYYY-MM-DD') == moment().startOf('month').startOf('day').subtract(6, 'months').local().format('YYYY-MM-DD') && end.local().format('YYYY-MM-DD') == moment().subtract(1, 'months').endOf('month').endOf('day').local().format('YYYY-MM-DD')) {
            rangeLiesInNo = 4;
        } else if (start.local().format('YYYY-MM-DD') == moment().startOf('month').startOf('day').subtract(1, 'years').local().format('YYYY-MM-DD') && end.local().format('YYYY-MM-DD') == moment().subtract(1, 'months').endOf('month').endOf('day').local().format('YYYY-MM-DD')) {
            rangeLiesInNo = 5;
        }
        return rangeLiesInNo;
    }
};

export default DateRangePickerCustomPeriod;