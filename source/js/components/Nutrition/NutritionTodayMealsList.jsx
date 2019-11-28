import React from "react";

const NutritionTodayMealsList = props => {
  const { todayList } = props;
  console.log("TODAY ++++++++++++++++", todayList);
  return (
    <React.Fragment>
      <div className="overview whitebox-body">
        <div className="overview-header">
          <h3 className="title-h3 size-14">Today's Meals</h3>
        </div>
        <div className="overview-body">
          <ul className="today-meals-list">
            {todayList &&
              todayList.length > 0 &&
              todayList.map((meal, index) => (
                <li className="today-meals-items">{meal.title}</li>
              ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionTodayMealsList;
