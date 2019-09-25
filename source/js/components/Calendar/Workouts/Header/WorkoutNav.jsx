import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WorkoutNav = props => {
  const {
    isActiveQuickTab,
    cuurentTab,
    handleChangeTab,
    handleSetActiveQuickTab,
  } = props;
  return (
    <React.Fragment>
      <div
        className={
          isActiveQuickTab
            ? 'exercise-navbar exercise-navbar-active'
            : 'exercise-navbar'
        }
      >
        <div className="tabs sub-tab">
          <div
            className={cuurentTab === `#warmup` ? 'tab active' : 'tab '}
            id={'warmup'}
          >
            <a onClick={e => handleChangeTab(`#warmup`)} href={'#warmup'}>
              Warmup
            </a>
          </div>
          <div
            className={cuurentTab === `#workout` ? 'tab active' : 'tab'}
            id={'workout'}
          >
            <a onClick={e => handleChangeTab(`#workout`)} href={'#workout'}>
              Workout
            </a>
          </div>
          <div
            className={cuurentTab === `#cooldown` ? 'tab active' : 'tab'}
            id={'cooldown'}
          >
            <a onClick={e => handleChangeTab(`#cooldown`)} href={'#cooldown'}>
              Cooldown
            </a>
          </div>
          <div
            className={cuurentTab === `#fitnesstest` ? 'tab  active' : 'tab'}
            id={'fitnesstest'}
          >
            <a
              onClick={e => handleChangeTab(`#fitnesstest`)}
              href={'#fitnesstest'}
            >
              Fitness Tests
            </a>
          </div>
        </div>
        <div className="list-notes">
          <ul>
            <li>
              <a href={'#notes'} onClick={e => handleChangeTab(`#notes`)}>
                Notes
              </a>
            </li>
            <li>
              <a href={'#stats'} onClick={e => handleChangeTab(`#stats`)}>
                Stats
              </a>
            </li>
          </ul>
        </div>
        {/* <Link
          to="#"
          className={
            isActiveQuickTab
              ? 'btn btn-danger plus-btn'
              : 'btn btn-success plus-btn'
          }
          onClick={() => handleSetActiveQuickTab(!isActiveQuickTab)}
        >
          <FontAwesomeIcon icon={isActiveQuickTab ? 'times' : 'plus'} />
        </Link> */}
      </div>
    </React.Fragment>
  );
};

export default WorkoutNav;
