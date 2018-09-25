import React, { Component } from 'react';
import cns from "classnames";

class SmallBlock extends Component {
    render() {
        const { title, data } = this.props;
        return (
            <div className="dash-sm-block">
                <h2 className="title">{title ? title : 'Title'}</h2>
                <h2 className="counter">{data && data.total ? data.total : 0}</h2>
                <div className={cns("change-indi", { 'down': (data && typeof data.perChange !== 'undefined' && data.perChange < 0), 'up': (data && typeof data.perChange !== 'undefined' && data.perChange > 0) })}>
                    <span className="counter">{data && data.perChange ? (data.perChange > 0) ? `+${Math.abs(data.perChange)}%` : `-${Math.abs(data.perChange)}%` : 'NIL'}</span>
                    {data && typeof data.perChange !== 'undefined' && data.perChange < 0 &&
                        <i className="icon-arrow_downward"></i>
                    }
                    {data && typeof data.perChange !== 'undefined' && data.perChange > 0 &&
                        <i className="icon-arrow_upward"></i>
                    }
                </div>
                <p className="helper">vs last {data && data.days} day(s)</p>
            </div>
        );
    }
}

export default SmallBlock;