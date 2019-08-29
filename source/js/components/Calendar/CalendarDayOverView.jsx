import React, { Component } from 'react';
import AddMetaDescription from '../global/AddMetaDescription';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import CalendarDayOverViewWorkouts from './Workouts/CalendarDayOverViewWorkouts';
import CalendarDayOverViewCounts from './CalendarDayOverViewCounts';
import moment from 'moment';
import {
  getUserFirstWorkoutByDateRequest,
  getUsersWorkoutScheduleRequest,
  getUsersWorkoutOverviewRequest,
} from '../../actions/userScheduleWorkouts';
import { connect } from 'react-redux';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { getUserMealRequest } from '../../actions/user_meal';
import CalendarDayOverViewNutrition from './Nutritions/CalendarDayOverViewNutrition';

class CalendarDayOverView extends Component {
  constructor(props) {
    super(props);
    var logDate = new Date();
    logDate.setHours(0, 0, 0, 0);
    this.state = {
      logDate: logDate,
      cuurentTab: '#Exercise',
      workoutsList: [],
      mealsList: [],
      logsList: [],
    };
  }

  componentWillMount = () => {
    const { dispatch } = this.props;
    let { logDate } = this.state;
    if (this.props.location.search) {
      let search = new URLSearchParams(
        decodeURIComponent(this.props.location.search),
      );
      let date = search.get('date');
      logDate = new Date(date);
      this.setState({ logDate });
    }
    var requestObj = {
      logDate: logDate,
    };
    // await dispatch(
    //   getUserFirstWorkoutByDateRequest(requestData, null, res => {
    //     const { workout_id } = res;
    //     dispatch(getUsersWorkoutScheduleRequest(workout_id));
    //   }),
    // );
    dispatch(getUsersWorkoutOverviewRequest(logDate));
    dispatch(getUserMealRequest(requestObj));
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      loading,
      loading_user_meals,
      user_meals,
      workoutsList,
      dispatch,
    } = this.props;

    if (loading || loading_user_meals) {
      dispatch(showPageLoader());
    }

    if (!loading && prevProps.workoutsList !== workoutsList) {
      this.setState({ workoutsList });
      dispatch(hidePageLoader());
    }
    if (!loading_user_meals && prevProps.user_meals !== user_meals) {
      this.setState({ mealsList: user_meals });
      dispatch(hidePageLoader());
    }
  }
  onChangeLogDate = date => {
    const { logDate } = this.state;
    const { dispatch } = this.props;
    if (
      moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')
    ) {
      this.setState({
        logDate: date,
      });
      let requestData = { logDate: date };
      dispatch(getUsersWorkoutOverviewRequest(date));
      dispatch(getUserMealRequest(requestData));
      //if (isOnline()) {
      //console.log('isOnline Call');
      //this.getUserMealsLogData(requestData);
      //} else {
      //this.getMealDetailLogDatesInIDB(date);
      //}
    }
  };
  onMonthClick = date => {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    let requestData = {};
    if (
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear()
    ) {
      this.setState({ logDate: now });
      requestData = { logDate: now };
    } else {
      this.setState({ logDate: date });
      requestData = { logDate: date };
    }
    // if (isOnline()) {
    //this.getUserMealsLogData(requestData);
    // } else {
    // this.getDataFromIDB(requestData);
    // }
  };
  onActiveDateChange = obj => {
    if (obj.view === 'month') {
      let date = obj.activeStartDate;
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      let requestData = {};
      if (
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear()
      ) {
        this.setState({ logDate: now });
        requestData = { logDate: now };
      } else {
        this.setState({ logDate: date });
        requestData = { logDate: date };
      }
      // if (isOnline()) {
      //this.getUserMealsLogData(requestData);
      // } else {
      // this.getDataFromIDB(requestData);
      // }
    }
  };
  handleGoToToday = () => {
    const { dispatch } = this.props;
    console.log('on Exercise.jsx handleGoToToday');
    const { logDate } = this.state;
    console.log('logDate => ', logDate);
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    if (
      moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')
    ) {
      this.setState({ logDate: date });
      let requestData = { logDate: date };
      dispatch(getUsersWorkoutOverviewRequest(date));
      dispatch(getUserMealRequest(requestData));
      // if (isOnline()) {
      //this.getUserMealsLogData(requestData);
      // } else {
      // this.getDataFromIDB(requestData);
    }
  };
  getDisplayDate() {
    const { logDate } = this.state;

    return (
      logDate &&
      moment(logDate)
        .local()
        .format('DD/MM/YYYY')
    );
  }

  render() {
    const { logDate, workoutsList, mealsList, logsList } = this.state;
    const { firstWorkoutId, loading, dispatch } = this.props;

    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Calendar | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section">
            <div className="body-head d-flex justify-content-start front-white-header custome_header">
              <div className="body-head-l">
                <div className="tabs">
                  <div
                    className={
                      this.state.cuurentTab === '#Exercise'
                        ? 'tab active'
                        : 'tab '
                    }
                    id="Exercise"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Exercise' });
                      }}
                      href="#Exercise"
                    >
                      Exercise
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Nutrition'
                        ? 'tab active'
                        : 'tab'
                    }
                    id="Nutrition"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Nutrition' });
                      }}
                      href="#Nutrition"
                    >
                      Nutrition
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Logs' ? 'tab active' : 'tab'
                    }
                    id="Logs"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Logs' });
                      }}
                      href="#Logs"
                    >
                      Logs
                    </a>
                  </div>

                  <div
                    className={
                      this.state.cuurentTab === '#Photos'
                        ? 'tab  active'
                        : 'tab'
                    }
                    id="Photos"
                  >
                    <a
                      onClick={e => {
                        this.setState({ cuurentTab: '#Photos' });
                      }}
                      href="#Photos"
                    >
                      Photos
                    </a>
                  </div>
                </div>
              </div>
              <div className="body-head-r">
                <NavLink className="pink-btn" to={routeCodes.CALENDAR}>
                  <i className="icon-arrow_back"></i>
                  Back to Calendar
                </NavLink>
              </div>
            </div>
            <div className="body-content d-flex row justify-content-start workouts-bg">
              <div className="col-md-3">
                <div className="new-log-date-wrap log-date-wrap">
                  <button type="button" onClick={this.handleGoToToday}>
                    Go To Today
                  </button>
                  <ReactCalender
                    name="log_date"
                    onChange={this.onChangeLogDate}
                    onClickMonth={this.onMonthClick}
                    onActiveDateChange={this.onActiveDateChange}
                    value={logDate}
                  />
                </div>
                <CalendarDayOverViewCounts
                  workoutsList={workoutsList}
                  logsList={logsList}
                  mealsList={mealsList}
                />
              </div>
              <div className="col-md-9">
                <div className={'tab-content'}>
                  {this.state.cuurentTab === '#Exercise' && (
                    <div
                      className={
                        this.state.cuurentTab === '#Exercise'
                          ? 'content active'
                          : 'content'
                      }
                      id="Exercise"
                    >
                      <h3 className="mb-5">
                        Workouts - {this.getDisplayDate()}
                      </h3>
                      {workoutsList.length > 0 ? (
                        workoutsList.map((workout, index) => (
                          <CalendarDayOverViewWorkouts
                            key={index}
                            workout={workout}
                            index={index}
                          />
                        ))
                      ) : (
                        <div
                          className="white-box"
                          style={{ marginBottom: '2rem' }}
                        >
                          <div className="whitebox-head d-flex profile-head">
                            <h3>No Workouts Found</h3>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {this.state.cuurentTab === '#Nutrition' && (
                    <div
                      className={
                        this.state.cuurentTab === '#Nutrition'
                          ? 'content active'
                          : 'content'
                      }
                      id="Nutrition"
                    >
                      <h3>Meals - {this.getDisplayDate()}</h3>
                      <CalendarDayOverViewNutrition
                        mealsList={mealsList}
                        authuserId={this.props.user.authId}
                      />
                    </div>
                  )}
                  {this.state.cuurentTab === '#Logs' && (
                    <div
                      className={
                        this.state.cuurentTab === '#Logs'
                          ? 'content active'
                          : 'content'
                      }
                      id="Logs"
                    >
                      <h3>Logs - {this.getDisplayDate()}</h3>
                    </div>
                  )}
                  {this.state.cuurentTab === '#Photos' && (
                    <div
                      className={
                        this.state.cuurentTab === '#Photos'
                          ? 'content active'
                          : 'content'
                      }
                      id="Photos"
                    >
                      <h3>Photos - {this.getDisplayDate()}</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { userScheduleWorkouts, userMeal, user } = state;
  return {
    user: user.get('loggedUserData'),

    firstWorkoutLoading: userScheduleWorkouts.get('firstWorkoutLoading'),
    firstWorkoutId: userScheduleWorkouts.get('firstWorkoutId'),
    firstWorkoutError: userScheduleWorkouts.get('firstWorkoutError'),
    workouts: userScheduleWorkouts.get('workouts'),
    workout: userScheduleWorkouts.get('workout'),
    workoutsList: userScheduleWorkouts.get('workoutsList'),
    loading: userScheduleWorkouts.get('loading'),

    user_meals: userMeal.get('user_meals'),
    loading_user_meals: userMeal.get('loading_user_meals'),
  };
};

export default connect(mapStateToProps)(CalendarDayOverView);
