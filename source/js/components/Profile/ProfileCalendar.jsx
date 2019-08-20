import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {
  getUsersWorkoutSchedulesRequest,
  setDatainIdb,
} from '../../actions/userScheduleWorkouts';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import _ from 'lodash';
import {
  SCHEDULED_WORKOUT_TYPE_RESTDAY,
  SCHEDULED_WORKOUT_TYPE_EXERCISE,
  SCHEDULED_MEAL,
} from '../../constants/consts';
import { FaEye } from 'react-icons/lib/fa';
import cns from 'classnames';
import ReactTooltip from 'react-tooltip';
import { IDB_TBL_PROFILE, IDB_READ_WRITE, IDB_READ } from '../../constants/idb';
import { connectIDB, isOnline } from '../../helpers/funs';
import { getUserMealsLogDatesRequest } from '../../actions/user_meal';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';

class ProfileCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectEventAlert: false,
      workoutEvents: [],
      calendarViewDate: null,
    };
    this.iDB;
  }

  render() {
    const { workoutEvents } = this.state;
    const { mealLoading, dispatch } = this.props;
    mealLoading ? dispatch(showPageLoader()) : dispatch(hidePageLoader());
    return (
      <div className="white-box space-btm-20">
        <div className="whitebox-body profile-body">
          <BigCalendar
            selectable={true}
            localizer={BigCalendar.momentLocalizer(moment)}
            defaultView={BigCalendar.Views.MONTH}
            className="workout-calender"
            events={workoutEvents}
            onView={() => {}}
            views={[BigCalendar.Views.MONTH]}
            onNavigate={this.handleNavigation}
            onSelectEvent={event => {}}
            popup={true}
            popupOffset={50}
            components={{
              event: CustomEventCard,
            }}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    connectIDB()().then(connection => {
      this.handleIDBOpenSuccess(connection);
    });

    var today = moment()
      .startOf('day')
      .utc();
    this.setState({ calendarViewDate: today.local() });
    this.getWorkoutSchedulesByMonth(today);
  }

  handleIDBOpenSuccess = connection => {
    this.iDB = connection.result;
    if (!isOnline()) {
      // get data from idb
      this.getDataFromIDB();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { workouts, loading, profile, mealLoading, logDates } = this.props;
    const { workoutEvents } = this.state;
    if (!loading && prevProps.workouts !== workouts) {
      var newWorkoutss = [];
      _.forEach(workouts, workout => {
        var newWorkout = {
          id: workout._id,
          title: workout.title
            ? workout.title
            : `Workout on ${
                workout.date ? moment(workout.date).format('DD/MM/YYYY') : ''
              }`,
          start: workout.date,
          end: workout.date,
          isCompleted: workout.isCompleted ? workout.isCompleted : 0,
          exercises:
            workout.exercises && workout.exercises.length > 0
              ? workout.exercises
              : [],
          exerciseType: workout.type ? workout.type : null,
          totalExercises: workout.totalExercises ? workout.totalExercises : 0,
          meta: workout,
          description: workout.description ? workout.description : '',
          username: profile.username,
        };
        newWorkoutss.push(newWorkout);
      });
      this.setState({ workoutEvents: newWorkoutss });
      this.setCalenderDataInIdb();
    }
    if (!mealLoading && prevProps.logDates !== logDates) {
      var newWorkouts = workoutEvents;
      _.forEach(logDates, (mealsLog, index) => {
        _.forEach(mealsLog.meals, (meal, index) => {
          var mealDate = moment(mealsLog.date).format('DD/MM/YYYY');
          var todayDate = moment(new Date()).format('DD/MM/YYYY');
          var newMeal = {
            id: meal._id,
            title: mealDate === todayDate ? `Today Meals` : `Meals ${mealDate}`,
            start: mealsLog.date,
            end: mealsLog.date,
            allDay: true,
            isCompleted: 0,
            exercises: [],
            exerciseType: SCHEDULED_MEAL,
            totalExercises: 0,
            meta: meal,
            description: meal.title,
            username: profile.username,
          };
          newWorkouts.push(newMeal);
        });
      });
      this.setState({ workoutEvents: newWorkouts });
    }
  }

  setCalenderDataInIdb = () => {
    const { workouts } = this.props;
    try {
      const idbData = { type: 'calender', data: JSON.stringify(workouts) };
      const transaction = this.iDB.transaction(
        [IDB_TBL_PROFILE],
        IDB_READ_WRITE,
      );
      const objectStore = transaction.objectStore(IDB_TBL_PROFILE);
      const iDBGetReq = objectStore.get('calender');
      iDBGetReq.onsuccess = event => {
        const {
          target: { result },
        } = event;
        if (result) {
          objectStore.put(idbData);
        } else {
          objectStore.add(idbData);
        }
      };
    } catch (error) {}
  };

  getWorkoutSchedulesByMonth = (date = null) => {
    const { calendarViewDate } = this.state;
    const { dispatch, profile } = this.props;
    let _date = null;
    if (date) {
      _date = date;
      this.setState({ calendarViewDate: _date.local() });
    } else if (calendarViewDate) {
      _date = calendarViewDate;
    } else {
      _date = moment()
        .startOf('day')
        .utc();
      this.setState({ calendarViewDate: _date.local() });
    }
    var requestObj = { date: _date };
    if (isOnline()) {
      dispatch(
        getUsersWorkoutSchedulesRequest(requestObj, profile.username, res => {
          const requestData = {
            logDate: _date,
          };
          dispatch(getUserMealsLogDatesRequest(requestData));
        }),
      );
    }
  };

  getDataFromIDB = () => {
    const { dispatch } = this.props;
    // const data = { loadingIdbData: true }
    // dispatch(setDatainIdb(data));

    const idbTbls = [IDB_TBL_PROFILE];
    try {
      const transaction = this.iDB.transaction(idbTbls, IDB_READ);
      if (transaction) {
        const osPrivacy = transaction.objectStore(IDB_TBL_PROFILE);
        const iDBGetReq = osPrivacy.get('calender');
        iDBGetReq.onsuccess = event => {
          const {
            target: { result },
          } = event;
          if (result) {
            const resultObj = JSON.parse(result.data);
            const data = { calender: resultObj };
            this.successSaveData(data);
            dispatch(setDatainIdb(data));
          } else {
            const data = { calender: null };
            dispatch(setDatainIdb(data));
          }
        };
      }
    } catch (error) {
      const data = { calender: null };
      dispatch(setDatainIdb(data));
    }
  };

  successSaveData = workouts => {
    try {
      const { profile } = this.props;
      var newWorkouts = [];
      _.forEach(workouts.calender, workout => {
        var newWorkout = {
          id: workout._id,
          title: workout.title
            ? workout.title
            : `Workout on ${
                workout.date ? moment(workout.date).format('DD/MM/YYYY') : ''
              }`,
          start: workout.date,
          end: workout.date,
          isCompleted: workout.isCompleted ? workout.isCompleted : 0,
          exercises:
            workout.exercises && workout.exercises.length > 0
              ? workout.exercises
              : [],
          exerciseType: workout.type ? workout.type : null,
          totalExercises: workout.totalExercises ? workout.totalExercises : 0,
          meta: workout,
          description: workout.description ? workout.description : '',
          username: profile.username,
        };
        newWorkouts.push(newWorkout);
      });
      this.setState({ workoutEvents: newWorkouts });
    } catch (error) {}
  };

  handleNavigation = date => {
    var momentDate = moment(date).startOf('day');
    var day = moment.utc(momentDate);
    this.setState({ calendarViewDate: day.local() });
    this.getWorkoutSchedulesByMonth(day);
  };
}

const mapStateToProps = state => {
  const { userScheduleWorkouts, userMeal } = state;
  return {
    workouts: userScheduleWorkouts.get('workouts'),
    loading: userScheduleWorkouts.get('loading'),
    logDates: userMeal.get('logDates'),
    mealLoading: userMeal.get('loading'),
  };
};

export default connect(mapStateToProps)(ProfileCalendar);

class CustomEventCard extends Component {
  render() {
    const { event } = this.props;
    let today = moment().utc();
    let yesturday = moment().subtract('1', 'day');
    let eventDate = moment(event.start);
    let cardClassName = '';
    if (today > eventDate) {
      if (
        event.isCompleted === 1 &&
        event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
      ) {
        cardClassName = 'w-c-green';
      } else if (
        event.isCompleted === 0 &&
        yesturday > eventDate &&
        event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE
      ) {
        cardClassName = 'w-c-pink';
      } else if (
        event.isCompleted === 0 &&
        yesturday > eventDate &&
        event.exerciseType === SCHEDULED_MEAL
      ) {
        cardClassName = 'past-meal w-c-lightgreen';
      }
    }
    return (
      <div
        className={cns(
          `big-calendar-custom-month-event-view-card ${cardClassName}`,
          {
            'restday w-c-orange':
              event.exerciseType === SCHEDULED_WORKOUT_TYPE_RESTDAY,
            'w-c-darkgreen':
              event.exerciseType === SCHEDULED_MEAL && eventDate > today,
          },
        )}
      >
        <div className="big-calendar-custom-month-event-view-card-header">
          <div className="pull-left custom_check">
            <label>
              <h5>{event.title}</h5>
            </label>
          </div>
          <div className="big-calendar-custom-month-event-view-card-body w-c-brb">
            {event.description && (
              <div>
                <p>{event.description}</p>
              </div>
            )}
            {event.exerciseType === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
              <NavLink
                to={routeCodes.PROFILE_WORKOUT_DETAILS.replace(
                  ':username',
                  event.username,
                ).replace(':id', event.id)}
                data-tip="Details"
                title=""
              >
                <FaEye />
              </NavLink>
            )}
            {event.exerciseType === SCHEDULED_MEAL && (
              <NavLink
                to={`${routeCodes.NUTRITION_VIEW}/${event.id}`}
                data-tip="Details"
                title=""
              >
                <FaEye />
              </NavLink>
            )}
          </div>
        </div>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
    );
  }
}
