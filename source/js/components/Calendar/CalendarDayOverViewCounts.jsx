import React from 'react';

const CalendarDayOverViewCounts = props => {
  const { mealsList, logsList, workoutsList } = props;
  return (
    <React.Fragment>
      <div className="recipe-nutrition white-box">
        <div className="whitebox-head meal-paln">
          <h3
            className="title-h3 size-14"
            style={{ textTransform: 'capitalize' }}
          >
            Day Overview
          </h3>
        </div>
        <div className="whitebox-body">
          <div className="dtl-div">
            <ul className="common-ul">
              <li>
                <div className="grey-white">
                  <h4>WorkOuts</h4>
                  <h5>{workoutsList.length}</h5>
                </div>
              </li>
              <li>
                <div className="grey-white">
                  <h4>Meals</h4>
                  <h5>{mealsList.length}</h5>
                </div>
              </li>
              <li>
                <div className="grey-white">
                  <h4>Logs</h4>
                  <h5>{logsList.length}</h5>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarDayOverViewCounts;
