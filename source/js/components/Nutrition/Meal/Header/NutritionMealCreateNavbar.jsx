import React from 'react';

const NutritionMealCreateNavbar = props => {
  const { isActiveTab, handleChangeTab } = props;
  return (
    <React.Fragment>
      <div className="exercise-navbar">
        <div className="tabs sub-tab">
          <div
            className={isActiveTab === `#details` ? 'tab  active' : 'tab'}
            onClick={() => handleChangeTab('#details')}
          >
            <a href="#details">Details</a>
          </div>
          <div
            className={isActiveTab === `#instructions` ? 'tab  active' : 'tab'}
            onClick={() => handleChangeTab('#instructions')}
          >
            <a href="#instructions">Instructions</a>
          </div>
          <div
            className={isActiveTab === `#notes` ? 'tab  active' : 'tab'}
            onClick={() => handleChangeTab('#notes')}
          >
            <a href="#notes">Notes</a>
          </div>
          <div
            className={isActiveTab === `#photos` ? 'tab  active' : 'tab'}
            onClick={() => handleChangeTab('#photos')}
          >
            <a href="#photos">Photos</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionMealCreateNavbar;
