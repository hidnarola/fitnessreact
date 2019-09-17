import React, { Component } from 'react';
import CalendarDayOverViewWorkoutsList from './CalendarDayOverViewWorkoutsList';

import { completeUsersBulkWorkoutScheduleRequest } from '../../../actions/userScheduleWorkouts';
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

class CalendarDayOverViewWorkouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuurentTab: '#warmup0',
      completeWorkout: false,
      completeWorkoutActionInit: false,
      isActiveQuickTab: false,
    };
  }
  componentDidMount() {
    const { index, workout } = this.props;
    const complete = workout.isCompleted === 0 ? false : true;
    this.setState({ cuurentTab: `#warmup${index}`, completeWorkout: complete });
  }
  componentDidUpdate(prevProps, prevState) {
    const { completeWorkoutActionInit } = this.state;
    const { dispatch, workout, loading } = this.props;

    if (
      !loading &&
      prevProps.workout !== workout &&
      typeof workout.isCompleted !== 'undefined'
    ) {
      const complete = workout.isCompleted === 0 ? false : true;
      this.setState({ completeWorkout: complete });
      dispatch(hidePageLoader());
    }

    if (prevState.completeWorkoutActionInit !== completeWorkoutActionInit) {
      dispatch(hidePageLoader());
    }
  }

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
  render() {
    const { completeWorkout, isActiveQuickTab } = this.state;
    const { index } = this.props;
    const {
      title,
      warmup,
      exercise,
      cooldown,
      _id,
      isCompleted,
    } = this.props.workout;
    console.log('THIS.PROPS ===>', this.props.workout);

    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div
              className={
                isActiveQuickTab ? 'col-xs-12 col-md-7' : 'col-xs-12 col-md-9'
              }
            >
              <div className="white-box border-right width-100-per p-0">
                <WorkoutHeader
                  index={index}
                  completeWorkout={completeWorkout}
                  workout={this.props.workout}
                  handleCompleteWorkout={this.handleCompleteWorkout}
                />
                {this.state.cuurentTab !== `#stats${index}` ? (
                  <WorkoutNav
                    index={index}
                    cuurentTab={this.state.cuurentTab}
                    isActiveQuickTab={isActiveQuickTab}
                    handleChangeTab={this.handleChangeTab}
                    handleSetActiveQuickTab={this.handleSetActiveQuickTab}
                  />
                ) : (
                  ''
                )}

                <div className={'exercise-tabs tab-content'}>
                  {this.state.cuurentTab === `#warmup${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#warmup${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'warmup' + index}
                    >
                      {warmup.length > 0 ? (
                        warmup &&
                        warmup.map((warmup, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={warmup}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === `#workout${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#workout${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'workout' + index}
                    >
                      {exercise.length > 0 ? (
                        exercise &&
                        exercise.map((exercise, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={exercise}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === `#cooldown${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#cooldown${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'cooldown' + index}
                    >
                      {cooldown.length > 0 ? (
                        cooldown &&
                        cooldown.map((cooldown, index) => (
                          <CalendarDayOverViewWorkoutsList
                            workout={cooldown}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <h3>No records found</h3>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === `#notes${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#notes${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'notes' + index}
                    >
                      <CalendarDayNoteList />
                    </div>
                  )}
                  {this.state.cuurentTab === `#stats${index}` && (
                    <div
                      className={
                        this.state.cuurentTab === `#stats${index}`
                          ? 'content active'
                          : 'content'
                      }
                      id={'stats' + index}
                    >
                      <CalendarDayStatsList
                        index={index}
                        handleChangeTab={this.handleChangeTab}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={
                isActiveQuickTab
                  ? 'col-xs-12 col-md-5 d-flex'
                  : 'col-xs-12 col-md-3 d-flex'
              }
            >
              {isActiveQuickTab ? (
                <CalendarDayWorkoutRightSidebar />
              ) : (
                <CalendarDayRecentWorkoutList
                  isActiveQuickTab={isActiveQuickTab}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(CalendarDayOverViewWorkouts);
