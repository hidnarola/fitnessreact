import React from 'react';

const CalendarPreviousMeasurementList = props => {
  const { measurement, item } = props;

  return (
    <React.Fragment>
      <li className="measurement-items">
        <div className="left mr-auto">
          <span className="body-name">{item}</span>
          <span className="date-text">05/03/2019</span>
        </div>
        <div className="right ml-auto">
          <span className="body-text">{measurement[item]}</span>
          <span className="day-text">6 day ago</span>
        </div>
      </li>
    </React.Fragment>
  );
};

export default CalendarPreviousMeasurementList;
