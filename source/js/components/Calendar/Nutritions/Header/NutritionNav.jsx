import React from 'react';

const NutritionNav = props => {
  const { nutritionTab, handleChangeTab } = props;
  return (
    <React.Fragment>
      <div className="exercise-navbar">
        <div className="tabs sub-tab">
          <div
            className={nutritionTab === `#breakfast` ? 'tab active' : 'tab '}
            id={'breakfast'}
          >
            <a onClick={e => handleChangeTab(`#breakfast`)} href={'#breakfast'}>
              Breakfast
            </a>
          </div>
          <div
            className={nutritionTab === `#lunch` ? 'tab active' : 'tab'}
            id={'lunch'}
          >
            <a onClick={e => handleChangeTab(`#lunch`)} href={'#lunch'}>
              Lunch
            </a>
          </div>
          <div
            className={nutritionTab === `#dinner` ? 'tab active' : 'tab'}
            id={'dinner'}
          >
            <a onClick={e => handleChangeTab(`#dinner`)} href={'#dinner'}>
              Dinner
            </a>
          </div>
          <div
            className={nutritionTab === `#snacks` ? 'tab  active' : 'tab'}
            id={'snacks'}
          >
            <a onClick={e => handleChangeTab(`#snacks`)} href={'#snacks'}>
              Snacks
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NutritionNav;
