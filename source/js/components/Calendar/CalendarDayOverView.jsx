import React, { Component } from "react";
import AddMetaDescription from "../global/AddMetaDescription";
import FitnessHeader from "../global/FitnessHeader";
import FitnessNav from "../global/FitnessNav";
import { NavLink } from "react-router-dom";
import { routeCodes } from "../../constants/routes";
import ReactCalender from "react-calendar/dist/entry.nostyle";
import CalendarDayOverViewWorkouts from "./Workouts/CalendarDayOverViewWorkouts";
import CalendarDayOverViewCounts from "./CalendarDayOverViewCounts";
import moment from "moment";
import {
  getUserFirstWorkoutByDateRequest,
  getUsersWorkoutScheduleRequest,
  getUsersWorkoutOverviewRequest,
  getExercisesNameRequest,
  getExerciseMeasurementRequest
} from "../../actions/userScheduleWorkouts";
import { connect } from "react-redux";
import { showPageLoader, hidePageLoader } from "../../actions/pageLoader";
import { getUserMealRequest } from "../../actions/user_meal";
import CalendarDayOverViewNutrition from "./Nutritions/CalendarDayOverViewNutrition";
import CalendarDayOverViewLogs from "./Logs/CalendarDayOverViewLogs";
import {
  getUserBodyMeasurementRequest,
  getProgressPhotosByDateRequest
} from "../../actions/userBodyMeasurement";
import { recentMealRequest } from "../../actions/meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarImage from "../../../assets/svg/calendar-alt.svg";
import NutritionMeal from "../Nutrition/NutritionMeal";
import DatePicker from "react-datepicker";
import Photos from "../Photos/Photos";
import { te } from "../../helpers/funs";
import { getUserFitnessTestsRequest } from "../../actions/userFitnessTests";

class CalendarDayOverView extends Component {
  constructor(props) {
    super(props);
    var logDate = new Date();
    logDate.setHours(0, 0, 0, 0);
    this.state = {
      logDate: logDate,
      cuurentTab: "#Exercise",
      nutritionTab: "#overview",
      workoutsList: [],
      mealsList: [],
      logsList: [],
      measurement: {},
      showCalendar: false
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    let { logDate } = this.state;
    if (this.props.location.search) {
      let search = new URLSearchParams(
        decodeURIComponent(this.props.location.search)
      );
      let date = search.get("date");
      logDate = new Date(date);
      this.setState({ logDate });
    }
    var requestObj = {
      logDate: logDate
    };

    // await dispatch(
    //   getUserFirstWorkoutByDateRequest(requestData, null, res => {
    //     const { workout_id } = res;
    //     dispatch(getUsersWorkoutScheduleRequest(workout_id));
    //   }),
    // );
    // dispatch(getUsersWorkoutOverviewRequest(logDate));
    dispatch(getUserMealRequest(requestObj));
    dispatch(getUserBodyMeasurementRequest(requestObj));
    dispatch(recentMealRequest());
    dispatch(getExercisesNameRequest());
    dispatch(getExerciseMeasurementRequest());
    dispatch(getProgressPhotosByDateRequest(requestObj));
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
      exercises,
      exerciseMeasurements,
      loadingProgressPhotos,
      todayProgressPhotos,
      progressPhotosError,
      dispatch
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

    // if (!loading && prevProps.workoutsList !== workoutsList) {
    //   this.setState({ workoutsList });
    //   dispatch(hidePageLoader());
    // }
    if (!loading_user_meals && prevProps.user_meals !== user_meals) {
      this.setState({ mealsList: user_meals });
      dispatch(hidePageLoader());
    }
    if (
      !measurementloading &&
      prevProps.measurement !== measurement &&
      typeof prevProps.measurement != "undefined"
    ) {
      this.setState({ measurement });
      dispatch(hidePageLoader());
    }

    if (!recentMealsLoading && prevProps.recentMeals !== recentMeals) {
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.exercises !== exercises) {
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.exerciseMeasurements !== exerciseMeasurements) {
      dispatch(hidePageLoader());
    }
    if (
      !loadingProgressPhotos &&
      prevProps.todayProgressPhotos !== todayProgressPhotos
    ) {
      console.log("===========todayProgressPhotos===========");
      console.log("todayProgressPhotos", todayProgressPhotos);
      console.log("==========================");
      dispatch(hidePageLoader());
    }
    if (
      !loadingProgressPhotos &&
      prevProps.progressPhotosError !== progressPhotosError &&
      progressPhotosError.length > 0
    ) {
      dispatch(hidePageLoader());
    }
  }
  onChangeLogDate = date => {
    const { logDate } = this.state;
    const { dispatch } = this.props;
    if (
      moment(logDate).format("YYYY-MM-DD") !== moment(date).format("YYYY-MM-DD")
    ) {
      this.setState({
        logDate: date
      });
      let requestData = { logDate: date };
      // dispatch(getUsersWorkoutOverviewRequest(date));
      dispatch(getUserMealRequest(requestData));
      dispatch(getUserBodyMeasurementRequest(requestData));
      dispatch(getProgressPhotosByDateRequest(requestData));
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
    if (obj.view === "month") {
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
        .format("DD/MM/YYYY")
    );
  }
  getNextDate = () => {
    let { logDate } = this.state;
    const { dispatch } = this.props;
    var currentDate = new Date(logDate);
    var day = new Date(currentDate.setDate(currentDate.getDate() + 1));
    this.setState({ logDate: day });
    let requestData = { logDate: day };
    dispatch(getUsersWorkoutOverviewRequest(logDate));
    dispatch(getUserMealRequest(requestData));
    dispatch(getUserBodyMeasurementRequest(requestData));
    dispatch(getProgressPhotosByDateRequest(requestData));
  };
  getPrevDate = () => {
    let { logDate } = this.state;
    const { dispatch } = this.props;
    var currentDate = new Date(logDate);
    var day = new Date(currentDate.setDate(currentDate.getDate() - 1));
    this.setState({ logDate: day });
    let requestData = { logDate: day };
    dispatch(getUsersWorkoutOverviewRequest(logDate));
    dispatch(getUserMealRequest(requestData));
    dispatch(getUserBodyMeasurementRequest(requestData));
    dispatch(getProgressPhotosByDateRequest(requestData));
  };

  render() {
    const {
      logDate,
      workoutsList,
      mealsList,
      logsList,
      measurement,
      nutritionTab
    } = this.state;
    const {
      firstWorkoutId,
      loading,
      exercises,
      exerciseMeasurements,
      dispatch
    } = this.props;
    console.log("WORKOUTLIST", workoutsList);
    const ExampleCustomInput = ({ value, onClick }) => (
      <span className="display-calendar" onClick={onClick}>
        <CalendarImage />
        <FontAwesomeIcon icon="chevron-down" />
      </span>
    );
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
                  <div className="tabs ml-4">
                    <div
                      className={
                        this.state.cuurentTab === "#Exercise"
                          ? "tab active"
                          : "tab "
                      }
                      id="Exercise"
                    >
                      <a
                        onClick={e => {
                          this.setState({ cuurentTab: "#Exercise" });
                        }}
                        href="#Exercise"
                      >
                        Exercise
                      </a>
                    </div>

                    <div
                      className={
                        this.state.cuurentTab === "#Nutrition"
                          ? "tab active"
                          : "tab"
                      }
                      id="Nutrition"
                    >
                      <a
                        onClick={e => {
                          this.setState({ cuurentTab: "#Nutrition" });
                        }}
                        href="#Nutrition"
                      >
                        Nutrition
                      </a>
                    </div>

                    <div
                      className={
                        this.state.cuurentTab === "#Logs" ? "tab active" : "tab"
                      }
                      id="Logs"
                    >
                      <a
                        onClick={e => {
                          this.setState({ cuurentTab: "#Logs" });
                        }}
                        href="#Logs"
                      >
                        Logs
                      </a>
                    </div>

                    <div
                      className={
                        this.state.cuurentTab === "#Photos"
                          ? "tab  active"
                          : "tab"
                      }
                      id="Photos"
                    >
                      <a
                        onClick={e => {
                          this.setState({ cuurentTab: "#Photos" });
                        }}
                        href="#Photos"
                      >
                        Photos
                      </a>
                    </div>
                  </div>
                  <span
                    className="date-arrow-left  ml-auto"
                    onClick={() => this.getPrevDate()}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon="chevron-left" />
                  </span>
                  <span className="date-text">
                    {logDate
                      ? moment(logDate)
                          .local()
                          .format("Do MMMM YYYY")
                      : ""}
                  </span>
                  <span
                    className="date-arrow-right"
                    onClick={() => this.getNextDate()}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon="chevron-right" />
                  </span>
                  <DatePicker
                    selected={moment(logDate)}
                    onChange={this.onChangeLogDate}
                    customInput={<ExampleCustomInput />}
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        behavior: ["bottom-end"] // don't allow it to flip to be above
                      },
                      preventOverflow: {
                        enabled: true // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                      },
                      hide: {
                        enabled: false // turn off since needs preventOverflow to be enabled
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="body-sub-head" />

            <div className={"tab-content"}>
              {this.state.cuurentTab === "#Exercise" && (
                <div
                  className={
                    this.state.cuurentTab === "#Exercise"
                      ? "content active"
                      : "content"
                  }
                  id="Exercise"
                >
                  <CalendarDayOverViewWorkouts
                    logDate={logDate}
                    exercises={exercises}
                    exerciseMeasurements={exerciseMeasurements}
                  />
                </div>
              )}
              {this.state.cuurentTab === "#Nutrition" && (
                <div
                  className={
                    this.state.cuurentTab === "#Nutrition"
                      ? "content active"
                      : "content"
                  }
                  id="Nutrition"
                >
                  {
                    <React.Fragment>
                      {nutritionTab === "#overview" &&
                        mealsList && (
                          <CalendarDayOverViewNutrition
                            setNutritionTab={() => {
                              this.setState({ nutritionTab: "#list" });
                            }}
                            recentMeals={this.props.recentMeals}
                            logDate={this.state.logDate}
                            mealsList={mealsList}
                            authuserId={this.props.user.authId}
                            meals_proximates={this.props.meals_proximates}
                          />
                        )}

                      {nutritionTab === "#list" && (
                        <NutritionMeal
                          mealsList={mealsList}
                          setNutritionTab={() => {
                            this.setState({ nutritionTab: "#overview" });
                          }}
                        />
                      )}
                    </React.Fragment>
                  }
                </div>
              )}
              {this.state.cuurentTab === "#Logs" && (
                <div
                  className={
                    this.state.cuurentTab === "#Logs"
                      ? "content active"
                      : "content"
                  }
                  id="Logs"
                >
                  {typeof measurement !== "undefined" &&
                  measurement !== null &&
                  Object.keys(measurement).length > 0 ? (
                    <CalendarDayOverViewLogs measurement={measurement} />
                  ) : (
                    <div className="white-box" style={{ marginBottom: "2rem" }}>
                      <div className="whitebox-head d-flex profile-head">
                        <h3>No Logs Found</h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {this.state.cuurentTab === "#Photos" && (
                <div
                  className={
                    this.state.cuurentTab === "#Photos"
                      ? "content active"
                      : "content"
                  }
                  id="Photos"
                >
                  <Photos
                    logDate={logDate}
                    todayProgressPhotos={this.props.todayProgressPhotos}
                  />
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
    userFitnessTests
  } = state;
  return {
    user: user.get("loggedUserData"),

    firstWorkoutLoading: userScheduleWorkouts.get("firstWorkoutLoading"),
    firstWorkoutId: userScheduleWorkouts.get("firstWorkoutId"),
    firstWorkoutError: userScheduleWorkouts.get("firstWorkoutError"),
    workouts: userScheduleWorkouts.get("workouts"),
    workout: userScheduleWorkouts.get("workout"),
    workoutsList: userScheduleWorkouts.get("workoutsList"),
    exercises: userScheduleWorkouts.get("exercises"),
    exerciseMeasurements: userScheduleWorkouts.get("exerciseMeasurements"),
    loading: userScheduleWorkouts.get("loading"),

    user_meals: userMeal.get("user_meals"),
    meals_proximates: userMeal.get("meals_proximates"),
    loading_user_meals: userMeal.get("loading_user_meals"),

    measurement: userBodyMeasurement.get("measurement"),
    measurementloading: userBodyMeasurement.get("loading"),
    loadingProgressPhotos: userBodyMeasurement.get("loadingProgressPhotos"),
    todayProgressPhotos: userBodyMeasurement.get("userProgressPhotos"),
    progressPhotosError: userBodyMeasurement.get("error"),

    recentMealsLoading: meal.get("recentMealsLoading"),
    recentMeals: meal.get("recentMeals"),
    recentMealsError: meal.get("recentMealsError")
  };
};

export default connect(mapStateToProps)(CalendarDayOverView);
