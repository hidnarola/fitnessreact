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
import CalendarDayOverViewLogs from './Logs/CalendarDayOverViewLogs';
import { getUserBodyMeasurementRequest } from '../../actions/userBodyMeasurement';
import { recentMealRequest } from '../../actions/meal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarImage from '../../../assets/svg/calendar-alt.svg';
import NutritionMeal from '../Nutrition/NutritionMeal';

class CalendarDayOverView extends Component {
  constructor(props) {
    super(props);
    var logDate = new Date();
    logDate.setHours(0, 0, 0, 0);
    this.state = {
      logDate: logDate,
      cuurentTab: '#Exercise',
      nutritionTab: '#overview',
      workoutsList: [],
      mealsList: [],
      logsList: [],
      measurement: {},
      showCalendar: false,
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
    dispatch(getUserBodyMeasurementRequest(requestObj));
    dispatch(recentMealRequest());
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      loading,
      loading_user_meals,
      user_meals,
      workoutsList,
      measurement,
      measurementloading,
      recentMeals,
      recentMealsLoading,
      dispatch,
    } = this.props;
    let { logsList } = this.state;

    if (
      loading ||
      loading_user_meals ||
      measurementloading ||
      recentMealsLoading
    ) {
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
    if (
      !measurementloading &&
      prevProps.measurement !== measurement &&
      typeof prevProps.measurement != 'undefined'
    ) {
      this.setState({ measurement });
      dispatch(hidePageLoader());
    }

    if (!recentMealsLoading && prevProps.recentMeals !== recentMeals) {
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
      dispatch(getUserBodyMeasurementRequest(requestData));
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
  // handleGoToToday = () => {
  //   const { dispatch } = this.props;
  //   console.log('on Exercise.jsx handleGoToToday');
  //   const { logDate } = this.state;
  //   console.log('logDate => ', logDate);
  //   var date = new Date();
  //   date.setHours(0, 0, 0, 0);
  //   if (
  //     moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')
  //   ) {
  //     this.setState({ logDate: date });
  //     let requestData = { logDate: date };
  //     dispatch(getUsersWorkoutOverviewRequest(date));
  //     dispatch(getUserMealRequest(requestData));
  //     dispatch(getUserBodyMeasurementRequest(requestData));
  //     // if (isOnline()) {
  //     //this.getUserMealsLogData(requestData);
  //     // } else {
  //     // this.getDataFromIDB(requestData);
  //   }
  // };
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
    const {
      logDate,
      workoutsList,
      mealsList,
      logsList,
      measurement,
      nutritionTab,
    } = this.state;
    const { firstWorkoutId, loading, dispatch } = this.props;
    console.log('WORKOUTLIST', workoutsList);
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Calendar | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            text="Calendar"
            routes={routeCodes.CALENDAR}
            enableBackLink={true}
          />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section">
            <div className="body-head d-flex justify-content-start front-white-header custome_header">
              <div className="body-head-l">
                <div className="display-date">
                  <span className="display-calendar">
                    <CalendarImage />
                    <FontAwesomeIcon icon="chevron-down" />
                  </span>
                  <span className="date-arrow-left">
                    <FontAwesomeIcon icon="chevron-left" />
                  </span>
                  <span className="date-text">
                    {logDate
                      ? moment(logDate)
                          .local()
                          .format('Do MMMM YYYY')
                      : ''}
                  </span>
                  <span className="date-arrow-right">
                    <FontAwesomeIcon icon="chevron-right" />
                  </span>
                </div>
              </div>
            </div>
            <div className="body-sub-head">
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
                    this.state.cuurentTab === '#Photos' ? 'tab  active' : 'tab'
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
                  {workoutsList.map((workout, index) => (
                    <CalendarDayOverViewWorkouts
                      loading={loading}
                      key={index}
                      workout={workout}
                      index={index}
                    />
                  ))}
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
                  {
                    <React.Fragment>
                      {nutritionTab === '#overview' && mealsList && (
                        <CalendarDayOverViewNutrition
                          setNutritionTab={() => {
                            this.setState({ nutritionTab: '#list' });
                          }}
                          recentMeals={this.props.recentMeals}
                          logDate={this.state.logDate}
                          mealsList={mealsList}
                          authuserId={this.props.user.authId}
                        />
                      )}

                      {nutritionTab === '#list' && (
                        <NutritionMeal
                          mealsList={mealsList}
                          setNutritionTab={() => {
                            this.setState({ nutritionTab: '#overview' });
                          }}
                        />
                      )}
                    </React.Fragment>
                  }
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
                  {typeof measurement !== 'undefined' &&
                  measurement !== null &&
                  Object.keys(measurement).length > 0 ? (
                    <CalendarDayOverViewLogs measurement={measurement} />
                  ) : (
                    <div className="white-box" style={{ marginBottom: '2rem' }}>
                      <div className="whitebox-head d-flex profile-head">
                        <h3>No Logs Found</h3>
                      </div>
                    </div>
                  )}
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
          </section>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const {
    userScheduleWorkouts,
    userMeal,
    user,
    userBodyMeasurement,
    meal,
  } = state;
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

    measurement: userBodyMeasurement.get('measurement'),
    measurementloading: userBodyMeasurement.get('loading'),

    recentMealsLoading: meal.get('recentMealsLoading'),
    recentMeals: meal.get('recentMeals'),
    recentMealsError: meal.get('recentMealsError'),
  };
};

export default connect(mapStateToProps)(CalendarDayOverView);
