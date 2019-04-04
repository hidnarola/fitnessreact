import React, { Component } from 'react';
import moment from 'moment';
export default  class Custom extends Component {


    render () {
        console.log("props ==>", this.props)
        const {x, y, stroke, payload} = this.props;
           return (
            <g transform={`translate(${x},${y})`}>
            <text x={7} y={0} dy={16} textAnchor="end" fill="black">{moment(payload.value, 'DD/MM/YYYY').format('MMM')}</text>
          </g>
        );
      }
}