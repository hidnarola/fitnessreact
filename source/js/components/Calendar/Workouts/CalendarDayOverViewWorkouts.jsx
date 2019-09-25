import React, { Component } from 'react';
import CalendarDayOverViewWorkoutsList from './CalendarDayOverViewWorkoutsList';

import {
  completeUsersBulkWorkoutScheduleRequest,
  getUserFirstWorkoutByDateRequest,
  getUsersWorkoutScheduleRequest,
} from '../../../actions/userScheduleWorkouts';
import { connect } from 'react-redux';
import { isOnline } from '../../../helpers/funs';
import { hidePageLoader, showPageLoader } from '../../../actions/pageLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from '../../../../assets/svg/star.svg';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import CalendarDayNoteList from './CalendarDayNoteList';
import CalendarDayWorkoutRightSidebar from './CalendarDayWorkoutRightSidebar';
import CalendarDayRecentWorkoutList from './CalendarDayRecentWorkoutList';
import CalendarDayStatsList from './CalendarDayStatsList';
import WorkoutHeader from './Header/WorkoutHeader';
import WorkoutNav from './Header/WorkoutNav';
import CalendarDayFitnessTestList from '../FitnessTest/CalendarDayFitnessTestList';
import CalendarDayFitnessTestQuickAdd from '../FitnessTest/CalendarDayFitnessTestQuickAdd';
import { createUserProgramFromCalendarError } from '../../../actions/userPrograms';
import CalendarDayFitnessTestAddList from '../FitnessTest/CalendarDayFitnessTestAddList';

class CalendarDayOverViewWorkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#warmup',
      completeWorkout: false,
      completeWorkoutActionInit: false,
      isActiveQuickTab: false,
      isActiveWorkoutTab: '#workout1',
      workout: null,
      workoutsList: [],
    };
  }

  render() {
    const {
      completeWorkout,
      isActiveQuickTab,
      cuurentTab,
      isActiveWorkoutTab,
      workout,
      workoutsList,
    } = this.state;
    let { index = 1 } = this.props;

    console.log('===========Workout State===========');
    console.log(this.state.workout);
    console.log('==========================');

    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3">
              <div className="overview white-box width-100-per p-0 border-right">
                <div className="overview-header d-flex align-items-center">
                  <h3 className="title-h3 size-14">Today's Workouts</h3>
                </div>
                <div className="workout-body">
                  <ul className="workout-list">
                    {workoutsList.map((workout, index) => (
                      <li
                        key={index}
                        className={
                          isActiveWorkoutTab === `#workout${index + 1}`
                            ? 'workout-list-items active d-flex'
                            : 'workout-list-items d-flex'
                        }
                      >
                        <div className="workout-content width-100-per">
                          <div
                            className="title"
                            onClick={() =>
                              this.handleChangeWorkoutTab(
                                `#workout${index + 1}`,
                                workout._id,
                              )
                            }
                          >
                            {workout.title}
                          </div>
                          <div className="is-complete">
                            <div className="workout-switch-wrap">
                              <small>Workout complete</small>
                              <div className="material-switch ml-auto">
                                <input
                                  id={'workout' + index}
                                  type="checkbox"
                                  checked={completeWorkout}
                                  onChange={() =>
                                    this.handleCompleteWorkout(workout)
                                  }
                                />
                                <label
                                  htmlFor={'workout' + index}
                                  className="label-default"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                    <li className="workout-list-items-btn">
                      <a href="#" className="btn width-100-per">
                        <FontAwesomeIcon icon="plus" /> Add Workout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div
              className={
                isActiveQuickTab ? 'col-xs-12 col-md-6' : 'col-xs-12 col-md-6'
              }
            > */}
            <div className="col-xs-12 col-md-9">
              <div className="white-box width-100-per p-0">
                {/* <WorkoutHeader
                  index={index}
                  completeWorkout={completeWorkout}
                  workout={this.props.workout}
                  handleCompleteWorkout={this.handleCompleteWorkout}
                /> */}
                {cuurentTab !== `#stats` ? (
                  <WorkoutNav
                    cuurentTab={cuurentTab}
                    isActiveQuickTab={isActiveQuickTab}
                    handleChangeTab={this.handleChangeTab}
                    handleSetActiveQuickTab={this.handleSetActiveQuickTab}
                  />
                ) : (
                  ''
                )}

                <div className="row no-gutters h-exercise">
                  <div
                    className={
                      isActiveQuickTab
                        ? 'col-xs-12 col-md-6'
                        : 'col-xs-12 col-md-8'
                    }
                  >
                    <div className={'exercise-tabs tab-content'}>
                      {cuurentTab === `#warmup` && (
                        <div
                          className={
                            cuurentTab === `#warmup`
                              ? 'content active'
                              : 'content'
                          }
                          id={'warmup'}
                        >
                          {workout &&
                            workout.warmup.map((warmup, index) => (
                              <CalendarDayOverViewWorkoutsList
                                workout={warmup}
                                key={index}
                                index={index}
                              />
                            ))}
                        </div>
                      )}
                      {cuurentTab === `#workout` && (
                        <div
                          className={
                            cuurentTab === `#workout`
                              ? 'content active'
                              : 'content'
                          }
                          id={'workout'}
                        >
                          {workout &&
                            workout.exercise.map((exercise, index) => (
                              <CalendarDayOverViewWorkoutsList
                                workout={exercise}
                                key={index}
                                index={index}
                              />
                            ))}
                        </div>
                      )}
                      {cuurentTab === `#cooldown` && (
                        <div
                          className={
                            cuurentTab === `#cooldown`
                              ? 'content active'
                              : 'content'
                          }
                          id={'cooldown'}
                        >
                          {workout &&
                            workout.cooldown.map((cooldown, index) => (
                              <CalendarDayOverViewWorkoutsList
                                workout={cooldown}
                                key={index}
                                index={index}
                              />
                            ))}
                        </div>
                      )}
                      {cuurentTab === `#fitnesstest` && (
                        <div
                          className={
                            cuurentTab === `#notes`
                              ? 'content active'
                              : 'content'
                          }
                          id={'fitnesstest'}
                        >
                          <CalendarDayFitnessTestList />
                        </div>
                      )}

                      {cuurentTab === `#notes` && (
                        <div
                          className={
                            cuurentTab === `#notes`
                              ? 'content active'
                              : 'content'
                          }
                          id={'notes'}
                        >
                          <CalendarDayNoteList />
                        </div>
                      )}
                      {cuurentTab === `#stats` && (
                        <div
                          className={
                            cuurentTab === `#stats`
                              ? 'content active'
                              : 'content'
                          }
                          id={'stats'}
                        >
                          <CalendarDayStatsList
                            index={index}
                            handleChangeTab={this.handleChangeTab}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      isActiveQuickTab
                        ? 'col-xs-12 col-md-6'
                        : 'col-xs-12 col-md-4'
                    }
                  >
                    {this.displayRightSidebar(cuurentTab, isActiveQuickTab)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { index, workout, logDate, dispatch } = this.props;
    // const complete = workout.isCompleted === 0 ? false : true;
    this.setState({ cuurentTab: `#warmup`, completeWorkout: false });
    const requestData = {
      date: logDate,
    };
    dispatch(
      getUserFirstWorkoutByDateRequest(requestData, null, res => {
        const { workout_id } = res;
        dispatch(getUsersWorkoutScheduleRequest(workout_id));
      }),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { completeWorkoutActionInit } = this.state;
    const { dispatch, workout, workoutsList, loading } = this.props;
    console.log('===========workoutList===========');
    console.log(workoutsList);
    console.log('==========================');
    if (!loading) {
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.workout !== workout) {
      this.setState({ workout });
    }
    if (!loading && prevProps.workoutsList !== workoutsList) {
      this.setState({ workoutsList });
    }
  }
  handleChangeWorkoutTab = (workoutTab, id) => {
    const { dispatch } = this.props;
    this.setState({ isActiveWorkoutTab: workoutTab });
    dispatch(getUsersWorkoutScheduleRequest(id));
  };

  handleCompleteWorkout = workout => {
    if (isOnline()) {
      const { dispatch, loading, workout } = this.props;
      if (workout && workout._id && !loading) {
        var isCompleted =
          typeof workout.isCompleted !== 'undefined'
            ? workout.isCompleted === 0
              ? 1
              : 0
            : 1;
        var requestData = {
          exerciseIds: [workout._id],
          isCompleted: isCompleted,
        };
        this.setState({
          completeWorkoutActionInit: true,
          completeWorkout: !this.state.completeWorkout,
        });

        dispatch(
          completeUsersBulkWorkoutScheduleRequest(requestData, res => {
            const { dispatch } = this.props;
            dispatch(hidePageLoader());
          }),
        );
      }
    } else {
      tw('You are offline, please check your internet connection');
    }
  };
  handleChangeTab = tab => {
    this.setState({ cuurentTab: tab });
  };
  handleSetActiveQuickTab = tab => {
    this.setState({ isActiveQuickTab: tab });
  };

  displayRightSidebar = (cuurentTab, isActiveQuickTab) => {
    var rightSidebar = null;
    if (isActiveQuickTab) {
      if (cuurentTab !== `#fitnesstest`) {
        rightSidebar = (
          <CalendarDayWorkoutRightSidebar
            isActiveQuickTab={isActiveQuickTab}
            handleSetActiveQuickTab={this.handleSetActiveQuickTab}
          />
        );
      } else {
        rightSidebar = <CalendarDayFitnessTestAddList />;
      }
    } else {
      if (cuurentTab === `#fitnesstest`) {
        rightSidebar = (
          <CalendarDayFitnessTestQuickAdd isActiveQuickTab={isActiveQuickTab} />
        );
      } else {
        rightSidebar = (
          <CalendarDayRecentWorkoutList
            isActiveQuickTab={isActiveQuickTab}
            handleSetActiveQuickTab={this.handleSetActiveQuickTab}
          />
        );
      }
    }
    return rightSidebar;
  };
}
const mapStateToProps = state => {
  const { userScheduleWorkouts } = state;
  return {
    workout: userScheduleWorkouts.get('workout'),
    workoutsList: userScheduleWorkouts.get('workoutsList'),
    loading: userScheduleWorkouts.get('loading'),
    error: userScheduleWorkouts.get('error'),
  };
};
export default connect(mapStateToProps)(CalendarDayOverViewWorkouts);
