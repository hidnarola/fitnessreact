import React, { Component } from 'react';

export class CustomizedAxisTick extends Component {
    render() {
      const {
        x, y, stroke, payload,
      } = this.props;
  
      return (
        <g>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >{payload.value}</text>
        </g>
      );
    }
  }