import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WorkoutNav = props => {
  const {
    isActiveQuickTab,
    cuurentTab,
    index,
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
            className={cuurentTab === `#warmup${index}` ? 'tab active' : 'tab '}
            id={'warmup' + index}
          >
            <a
              onClick={e => handleChangeTab(`#warmup${index}`)}
              href={'#warmup' + index}
            >
              Warmup
            </a>
          </div>
          <div
            className={cuurentTab === `#workout${index}` ? 'tab active' : 'tab'}
            id={'workout' + index}
          >
            <a
              onClick={e => handleChangeTab(`#workout${index}`)}
              href={'#workout' + index}
            >
              Workout
            </a>
          </div>
          <div
            className={
              cuurentTab === `#cooldown${index}` ? 'tab active' : 'tab'
            }
            id={'cooldown' + index}
          >
            <a
              onClick={e => handleChangeTab(`#cooldown${index}`)}
              href={'#cooldown' + index}
            >
              Cooldown
            </a>
          </div>
          <div
            className={
              cuurentTab === `#fitnesstest${index}` ? 'tab  active' : 'tab'
            }
            id={'fitnesstest' + index}
          >
            <a
              onClick={e => handleChangeTab(`#fitnesstest${index}`)}
              href={'#fitnesstest' + index}
            >
              Fitness Tests
            </a>
          </div>
        </div>
        <div className="list-notes ml-auto">
          <ul>
            {!isActiveQuickTab && (
              <React.Fragment>
                <li>
                  <a
                    href={'#notes' + index}
                    onClick={e => handleChangeTab(`#notes${index}`)}
                  >
                    Notes
                  </a>
                </li>
                <li>
                  <a
                    href={'#stats' + index}
                    onClick={e => handleChangeTab(`#stats${index}`)}
                  >
                    Stats
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <Link
          to="#"
          className={
            isActiveQuickTab
              ? 'btn btn-danger plus-btn'
              : 'btn btn-success plus-btn'
          }
          onClick={() => handleSetActiveQuickTab(!isActiveQuickTab)}
        >
          <FontAwesomeIcon icon={isActiveQuickTab ? 'times' : 'plus'} />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default WorkoutNav;
