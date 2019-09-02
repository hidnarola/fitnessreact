import React, { Component } from 'react';
import CalendarDayOverViewLogsList from './CalendarDayOverViewLogsList';

class CalendarDayOverViewLogs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="white-box" style={{ marginBottom: '2rem' }}>
          <div className="whitebox-head d-flex profile-head"></div>
          <CalendarDayOverViewLogsList measurement={this.props.measurement} />
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayOverViewLogs;
