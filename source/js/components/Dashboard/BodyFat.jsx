import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from "recharts";

class BodyFat extends Component {
    render() {
        const { bodyFat } = this.props;
        return (
            <div className="white-box space-btm-30">
                <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Body Fat</h3>
                    <div className="whitebox-head-r">
                        <a href="" className="icon-settings"></a>
                    </div>
                </div>
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { dashboard } = state;
    return {
        bodyFat: dashboard.get('bodyFat'),
    };
}

export default connect(
    mapStateToProps,
)(BodyFat);

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