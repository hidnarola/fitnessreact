import React from 'react';

const CalendarDayOverViewCounts = props => {
  const { mealsList, logsList, workoutsList, measurement } = props;
  let logCount =
    typeof measurement !== 'undefined' &&
    measurement !== null &&
    Object.keys(measurement).length > 0
      ? 1
      : 0;
  return (
    <React.Fragment>
      <div className="overview">
        <div className="overview-header">
          <h3
            className="title-h3 size-14"
            style={{
              textTransform: 'capitalize',
              color: '#fff',
              padding: '0 0 0 30px',
            }}
          >
            Day Overview
          </h3>
        </div>
        <div className="overview-body">
          <ul className="list-group">
            <li className="list-group-item">{workoutsList.length} Workouts</li>
            <li className="list-group-item">{mealsList.length} Meals</li>
            <li className="list-group-item">{logCount} Logs</li>
          </ul>
          {/* <ul className="common-ul">
            <li>
              <div>
                <h4>WorkOuts</h4>
                <h5>{workoutsList.length}</h5>
              </div>
            </li>
            <li>
              <div>
                <h4>Meals</h4>
                <h5>{mealsList.length}</h5>
              </div>
            </li>
            <li>
              <div>
                <h4>Logs</h4>
                <h5>{logCount}</h5>
              </div>
            </li>
          </ul> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewCounts;
