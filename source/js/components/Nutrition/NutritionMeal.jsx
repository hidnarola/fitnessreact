import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import moment from 'moment';
import {
  getUserTodaysMealRequest,
  deleteUserRecipeRequest,
} from '../../actions/userNutritions';
import noImg from 'img/common/no-img.png';
import { capitalizeFirstLetter, ts, te } from '../../helpers/funs';
import {
  DAY_DRIVE_BREAKFAST,
  DAY_DRIVE_LUNCH,
  DAY_DRIVE_DINNER,
  DAY_DRIVE_PRE_LUNCH_SNACKS,
  DAY_DRIVE_SNACKS,
  DAY_DRIVE_POST_LUNCH_SNACKS,
} from '../../constants/consts';
import _ from 'lodash';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import { DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import { FaTrash } from 'react-icons/lib/fa';
import DeleteConfirmation from '../Admin/Common/DeleteConfirmation';
import AddMetaDescription from '../../components/global/AddMetaDescription';
import ReactCalender from 'react-calendar/dist/entry.nostyle';
import NutritionMealAddSearchForm from './NutritionMealAddSearchForm';
import NutritionMealItems from './NutritionMealItems';
import {
  userMealAddRequest,
  getUserMealsLogDatesRequest,
  getUserMealRequest,
} from '../../actions/user_meal';
import {
  recentMealRequest,
  addMealToFavouriteRequest,
} from '../../actions/meal';
import NutritionMealPlanStats from './NutritionMealPlanStats';

const dayDriveOptions = [
  {
    value: DAY_DRIVE_BREAKFAST,
    label: capitalizeFirstLetter(DAY_DRIVE_BREAKFAST.replace('_', ' ')),
  },
  {
    value: DAY_DRIVE_LUNCH,
    label: capitalizeFirstLetter(DAY_DRIVE_LUNCH.replace('_', ' ')),
  },
  {
    value: DAY_DRIVE_DINNER,
    label: capitalizeFirstLetter(DAY_DRIVE_DINNER.replace('_', ' ')),
  },
  {
    value: DAY_DRIVE_PRE_LUNCH_SNACKS,
    label: capitalizeFirstLetter(DAY_DRIVE_SNACKS.replace('_', ' ')),
  },
  {
    value: DAY_DRIVE_POST_LUNCH_SNACKS,
    label: capitalizeFirstLetter(DAY_DRIVE_SNACKS.replace('_', ' ')),
  },
];

class NutritionMeal extends Component {
  constructor(props) {
    super(props);
    var logDate = new Date();
    logDate.setHours(0, 0, 0, 0);
    this.state = {
      selectActionInit: false,
      todaysMeal: [],
      showDeleteModal: false,
      selectedMealId: null,
      deleteActionInit: false,
      logDate: logDate,
      today_meals: [],
      total_enerc_kal: 0,
      total_procnt: 0,
      total_fat: 0,
      total_chocdf: 0,
      total_sugar: 0,
      total_saturates: 0,
      total_cabs: 0,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { logDate } = this.state;
    let requestData = { logDate };

    var todaysDate = moment().startOf('day');
    var requestObj = {
      date: todaysDate,
    };
    this.setState({ selectActionInit: true });
    dispatch(showPageLoader());
    this.getUserMealsLogData(requestData);
    dispatch(getUserTodaysMealRequest(requestObj));
    dispatch(recentMealRequest());
  }

  addTodayMeals = obj => {
    console.log('OBJ====>', obj);

    let {
      today_meals,
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs,
    } = this.state;

    if (!(today_meals.filter(e => e._id === obj._id).length > 0)) {
      obj.total_enerc_kal = 0;
      obj.total_procnt = 0;
      obj.total_fat = 0;
      obj.total_chocdf = 0;
      obj.total_sugar = 0;
      obj.total_saturates = 0;
      obj.total_cabs = 0;
      obj.ingredientsIncluded.forEach(ingredient => {
        const {
          totalKcl,
          totalProtein,
          totalfat,
          totalCholesterol,
          totalSugar,
          totalStarch,
          totalCarbs,
        } = ingredient;
        obj.total_enerc_kal =
          totalKcl === 'NaN' || totalKcl === NaN
            ? 0
            : parseInt(totalKcl) + obj.total_enerc_kal;
        obj.total_procnt =
          totalProtein === 'NaN' || totalProtein === NaN
            ? 0
            : parseInt(totalProtein) + obj.total_procnt;
        obj.total_fat =
          totalfat === 'NaN' || totalfat === NaN
            ? 0
            : parseInt(totalfat) + obj.total_fat;
        obj.total_chocdf =
          totalCholesterol === 'NaN' || totalCholesterol === NaN
            ? 0
            : parseInt(totalCholesterol) + obj.total_chocdf;
        obj.total_sugar =
          totalSugar === 'NaN' || totalSugar === NaN
            ? 0
            : parseInt(totalSugar) + obj.total_sugar;
        obj.total_saturates =
          totalStarch === 'NaN' || totalStarch === NaN
            ? 0
            : parseInt(totalStarch) + obj.total_saturates;
        obj.total_cabs =
          totalCarbs === 'NaN' || totalCarbs === NaN
            ? 0
            : parseInt(totalCarbs) + obj.total_cabs;
      });
      today_meals.push(obj);
      console.log('ADDDDDD ====> ', today_meals);
      total_enerc_kal = _.sumBy(today_meals, 'total_enerc_kal');
      total_procnt = _.sumBy(today_meals, 'total_procnt');
      total_fat = _.sumBy(today_meals, 'total_fat');
      total_chocdf = _.sumBy(today_meals, 'total_chocdf');
      total_sugar = _.sumBy(today_meals, 'total_sugar');
      total_saturates = _.sumBy(today_meals, 'total_saturates');
      total_cabs = _.sumBy(today_meals, 'total_cabs');

      total_fat = total_fat === NaN ? 0 : total_fat;
      this.setState({
        today_meals,
        total_enerc_kal,
        total_procnt,
        total_fat,
        total_chocdf,
        total_sugar,
        total_saturates,
        total_cabs,
      });
      console.log('todaymeals', today_meals);
    }
  };

  handleRemoveMeals = index => {
    console.log('Delete MEALs', index);
    let { today_meals } = this.state;
    today_meals.splice(index, 1);
    this.countIngredient(today_meals);
    this.setState({ today_meals });
  };

  handleSearch = values => {
    console.log(values);
  };

  handleSaveMeals = async () => {
    const { dispatch } = this.props;
    console.log('PROPS=====>', this.props);
    const { today_meals, logDate } = this.state;
    if (today_meals.length > 0) {
      const filterMealsID = today_meals.map(item => {
        return { meal_id: item._id };
      });
      const { logDate } = this.state;
      const data = {
        meals: filterMealsID,
        date: logDate,
      };
      console.log(data);
      console.log(this.state.logDate);
      await dispatch(showPageLoader());
      await dispatch(
        userMealAddRequest(data, res => {
          let requestData = { logDate };
          this.getUserMealsLogData(requestData);
          dispatch(hidePageLoader());
        }),
      );
    } else {
      te('Please select meal plan');
    }
  };

  addToFavourite = (meal_id, add) => {
    const { dispatch } = this.props;
    console.log('addToFavourite if not', meal_id);
    dispatch(
      addMealToFavouriteRequest({
        meal_id: meal_id,
      }),
    );
  };

  render() {
    const {
      todaysMeal,
      showDeleteModal,
      logDate,
      today_meals,
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_cabs,
    } = this.state;
    const { loading, saveLoading, logDates, recentMeals } = this.props;

    return (
      <div className="fitness-nutrition">
        <AddMetaDescription>
          <title>Nutrition | Fitly</title>
        </AddMetaDescription>
        <FitnessHeader />
        <FitnessNav />
        <section className="body-wrap nutrition-todays-meal-section">
          <div className="body-head d-flex justify-content-start front-white-header">
            <div className="body-head-l">
              <h2>Nutrition</h2>
              <p>
                Your meal plan is balanced and tailored to provide the right mix
                for your goal. For your fitness assistant to provide the best
                meal plans make sure you rate recipes you like. You can further
                fine tune the meals selected for you by changing your nutrition
                settings.{' '}
              </p>
            </div>
            <div className="body-head-r ml-auto">
              <NavLink
                activeClassName="active"
                className="pink-btn"
                exact
                to={routeCodes.NUTRITIONSHOP}
              >
                <span>Shopping List</span>
                <i className="icon-shopping_cart" />
              </NavLink>

              <NavLink
                activeClassName="active"
                className="white-btn"
                exact
                to={routeCodes.NUTRITIONPREFERENCE}
              >
                <span>Nutrition Settings</span>
                <i className="icon-settings" />
              </NavLink>
            </div>
          </div>
          <div className="body-content d-flex row justify-content-start">
            <div className="col-md-3">
              <div className="new-log-date-wrap log-date-wrap">
                <button type="button" onClick={this.handleGoToToday}>
                  Go To Today
                </button>
                {/* minDate={new Date()} */}
                <ReactCalender
                  name="log_date"
                  onChange={this.onChangeLogDate}
                  onClickMonth={this.onMonthClick}
                  onActiveDateChange={this.onActiveDateChange}
                  value={logDate}
                  tileContent={({ date, view }) => {
                    if (view !== 'month') {
                      return '';
                    }
                    return _.map(logDates, (o, key) => {
                      let calDate = moment(date).format('YYYY-MM-DD');
                      let logDate = moment(o.date).format('YYYY-MM-DD');
                      if (calDate === logDate) {
                        return (
                          <span
                            key={key}
                            className="react-calendar__tile--highlight"
                          />
                        );
                      }
                      return '';
                    });
                  }}
                />
              </div>
              <NutritionMealPlanStats
                nutritation={this.state}
                handleSaveMeals={this.handleSaveMeals}
                saveLoading={saveLoading}
              />
            </div>
            <div className="col-md-7">
              <div className="white-box">
                <div className="whitebox-head d-flex profile-head">
                  <h3 className="title-h3">
                    {logDate.getDate() === new Date().getDate()
                      ? "Today's Meals"
                      : 'meal of ' +
                        (logDate
                          ? moment(logDate)
                              .local()
                              .format('DD/MM/YYYY')
                          : '')}
                  </h3>
                  <div className="whitebox-head-r">
                    <NavLink
                      to={routeCodes.NUTRITION_ADD}
                      className="green-blue"
                    >
                      Add new meal <i className="icon-control_point" />
                    </NavLink>
                  </div>
                </div>

                <NutritionMealAddSearchForm
                  onSubmit={this.handleSearch}
                  addTodayMeals={this.addTodayMeals}
                />

                <div className="whitebox-body">
                  {this.state.today_meals.map((item, index) => (
                    <NutritionMealItems
                      key={index}
                      meal={item}
                      mealDetails={this.state}
                      index={index}
                      addToFavourite={this.addToFavourite}
                      handleRemoveMeals={this.handleRemoveMeals}
                      recentMeals={recentMeals}
                    />
                  ))}

                  {/* {false && todaysMeal && todaysMeal.length <= 0 && (!loading) &&
                                        <span>No Records found</span>
                                    }
                                    {todaysMeal && todaysMeal.length > 0 &&
                                        todaysMeal.map((meal, index) => {
                                            var dayDriveType = _.find(dayDriveOptions, { value: meal.dayDriveType });
                                            var enerc_kal = (meal.totalNutrients['ENERC_KCAL']) ? meal.totalNutrients['ENERC_KCAL'].quantity : 0;
                                            var procnt = (meal.totalNutrients['PROCNT']) ? meal.totalNutrients['PROCNT'].quantity : 0;
                                            var fat = (meal.totalNutrients['FAT']) ? meal.totalNutrients['FAT'].quantity : 0;
                                            var chocdf = (meal.totalNutrients['CHOCDF']) ? meal.totalNutrients['CHOCDF'].quantity : 0;
                                            enerc_kal = Math.round((enerc_kal / meal.serving)).toFixed(0);
                                            procnt = Math.round((procnt / meal.serving)).toFixed(0);
                                            fat = Math.round((fat / meal.serving)).toFixed(0);
                                            chocdf = Math.round((chocdf / meal.serving)).toFixed(0);
                                            total_enerc_kal = parseInt(total_enerc_kal) + parseInt(enerc_kal);
                                            total_procnt = parseInt(total_procnt) + parseInt(procnt);
                                            total_fat = parseInt(total_fat) + parseInt(fat);
                                            total_chocdf = parseInt(total_chocdf) + parseInt(chocdf);
                                            return (
                                                <div className="meal-wrap d-flex" key={index}>
                                                    <div className="meal-img">
                                                        <img
                                                            src={meal.image}
                                                            alt="Recipe"
                                                            onError={(e) => {
                                                                e.target.src = noImg
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="meal-name">
                                                        <small>{(dayDriveType) ? dayDriveType.label : ''}</small>
                                                        <h5>
                                                            <NavLink to={`${routeCodes.NUTRITION_RECIPE_DETAILS}/${meal._id}`}>
                                                                {meal.name}
                                                            </NavLink>
                                                        </h5>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Cals</small>
                                                        <big>
                                                            {enerc_kal}
                                                            {(meal.totalNutrients['ENERC_KCAL']) ? meal.totalNutrients['ENERC_KCAL'].unit : ''}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Protein</small>
                                                        <big>
                                                            {procnt}
                                                            {(meal.totalNutrients['PROCNT']) ? meal.totalNutrients['PROCNT'].unit : ''}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Fat</small>
                                                        <big>
                                                            {fat}
                                                            {(meal.totalNutrients['FAT']) ? meal.totalNutrients['FAT'].unit : ''}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <small>Carbs</small>
                                                        <big>
                                                            {chocdf}
                                                            {(meal.totalNutrients['CHOCDF']) ? meal.totalNutrients['CHOCDF'].unit : ''}
                                                        </big>
                                                    </div>
                                                    <div className="meal-info">
                                                        <ButtonToolbar bsClass="">
                                                            <DropdownButton title="" className="icon-more_horiz no-border" id="dropdown-size-small" noCaret pullRight>
                                                                <MenuItem eventKey="1" onClick={() => this.handleShowDeleteModal(meal._id)}>
                                                                    <FaTrash className="v-align-sub" /> Delete
                                                                </MenuItem>
                                                            </DropdownButton>
                                                        </ButtonToolbar>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    } */}
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="blue_right_sidebar">
                <h2 className="h2_head_one">Favourite Meals</h2>
                <div className="recent-ingredient">
                  <ul>
                    {recentMeals &&
                      recentMeals.length > 0 &&
                      recentMeals.map((v, id) => (
                        <li key={id} onClick={e => this.addTodayMeals(v)}>
                          {v.title}
                          <div className="add_drag">
                            <i className="icon-control_point" /> Click to Add
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DeleteConfirmation
          show={showDeleteModal}
          handleClose={this.handleCloseDeleteModal}
          handleYes={this.handleDelete}
        />
      </div>
    );
  }
  countIngredient = today_meals => {
    let {
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs,
    } = this.state;
    total_enerc_kal = _.sumBy(today_meals, 'total_enerc_kal');
    total_procnt = _.sumBy(today_meals, 'total_procnt');
    total_fat = _.sumBy(today_meals, 'total_fat');
    total_chocdf = _.sumBy(today_meals, 'total_chocdf');
    total_sugar = _.sumBy(today_meals, 'total_sugar');
    total_saturates = _.sumBy(today_meals, 'total_saturates');
    total_cabs = _.sumBy(today_meals, 'total_cabs');
    this.setState({
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs,
    });
  };

  countIngredientValue = obj => {
    return obj.ingredientsIncluded.forEach(ingredient => {
      const {
        totalKcl,
        totalProtein,
        totalfat,
        totalCholesterol,
        totalSugar,
        totalStarch,
        totalCarbs,
      } = ingredient;
      obj.total_enerc_kal =
        totalKcl === 'NaN' || totalKcl === NaN
          ? 0
          : parseInt(totalKcl) + obj.total_enerc_kal;
      obj.total_procnt =
        totalProtein === 'NaN' || totalProtein === NaN
          ? 0
          : parseInt(totalProtein) + obj.total_procnt;
      obj.total_fat =
        totalfat === 'NaN' || totalfat === NaN
          ? 0
          : parseInt(totalfat) + obj.total_fat;
      obj.total_chocdf =
        totalCholesterol === 'NaN' || totalCholesterol === NaN
          ? 0
          : parseInt(totalCholesterol) + obj.total_chocdf;
      obj.total_sugar =
        totalSugar === 'NaN' || totalSugar === NaN
          ? 0
          : parseInt(totalSugar) + obj.total_sugar;
      obj.total_saturates =
        totalStarch === 'NaN' || totalStarch === NaN
          ? 0
          : parseInt(totalStarch) + obj.total_saturates;
      obj.total_cabs =
        totalCarbs === 'NaN' || totalCarbs === NaN
          ? 0
          : parseInt(totalCarbs) + obj.total_cabs;
    });
  };

  componentDidUpdate(prevProos, prevSate) {
    console.log('CALL COMPONENT UPDATE');
    let {
      loading,
      todaysMeal,
      dispatch,
      error,
      recentMealsError,
      addtoFavouriteError,
      addtoFavouriteLoading,
      addtoFavouriteSuccessMessage,
      user_meals,
      loading_user_meals,
    } = this.props;
    const { selectActionInit, deleteActionInit, logDate } = this.state;

    if (selectActionInit && !loading) {
      this.setState({ selectActionInit: false, todaysMeal });
      console.log('CALL RUN ====>');
      dispatch(hidePageLoader());
    } else if (deleteActionInit && !loading) {
      if (error && error.length > 0) {
        te(error[0]);
      } else {
        ts('Recipe deleted from your todays meal!');
      }
      var todaysDate = moment().startOf('day');
      var requestObj = {
        date: todaysDate,
      };
      this.setState({ deleteActionInit: false, selectActionInit: true });
      this.handleCloseDeleteModal();
      dispatch(getUserTodaysMealRequest(requestObj));
    }

    if (
      !addtoFavouriteLoading &&
      prevProos.addtoFavouriteLoading !== addtoFavouriteLoading &&
      addtoFavouriteError.length == 0 &&
      addtoFavouriteSuccessMessage !== ''
    ) {
      ts(addtoFavouriteSuccessMessage);
    }
    // let requestData = { logDate };
    // this.getUserMealsLogData(requestData);

    if (
      !loading_user_meals &&
      prevProos.loading_user_meals !== loading_user_meals
    ) {
      console.log('IF====>');
      let userMeals = user_meals;
      userMeals.forEach(obj => {
        obj.total_enerc_kal = 0;
        obj.total_enerc_kal = 0;
        obj.total_procnt = 0;
        obj.total_fat = 0;
        obj.total_chocdf = 0;
        obj.total_sugar = 0;
        obj.total_saturates = 0;
        obj.total_cabs = 0;
        obj = this.countIngredientValue(obj);
      });
      console.log('userMeals=====>', userMeals);
      this.countIngredient(userMeals);
      this.setState({ today_meals: userMeals });
    }
  }

  handleShowDeleteModal = _id => {
    this.setState({
      selectedMealId: _id,
      showDeleteModal: true,
    });
  };

  handleCloseDeleteModal = () => {
    this.setState({
      selectedMealId: null,
      showDeleteModal: false,
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    var _id = this.state.selectedMealId;
    dispatch(showPageLoader());
    dispatch(deleteUserRecipeRequest(_id));
    this.setState({ deleteActionInit: true });
  };

  handleGoToToday = () => {
    console.log('on Exercise.jsx handleGoToToday');
    const { logDate } = this.state;
    console.log('logDate => ', logDate);
    const { dispatch } = this.props;
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    if (
      moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')
    ) {
      this.setState({ logDate: date });
      let requestData = { logDate: date };
      // if (isOnline()) {
      this.getUserMealsLogData(requestData);
      // } else {
      // this.getDataFromIDB(requestData);
    }
  };

  onChangeLogDate = date => {
    console.log('Date====> ', date);
    const { logDate } = this.state;
    if (
      moment(logDate).format('YYYY-MM-DD') !== moment(date).format('YYYY-MM-DD')
    ) {
      this.setState({
        logDate: date,
      });

      let requestData = { logDate: date };
      // if (isOnline()) {
      this.getUserMealsLogData(requestData);
      // } else {
      // this.getDataFromIDB(requestData);
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
    this.getUserMealsLogData(requestData);
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
      this.getUserMealsLogData(requestData);
      // } else {
      // this.getDataFromIDB(requestData);
      // }
    }
  };

  getUserMealsLogData = requestData => {
    const { dispatch } = this.props;
    this.setState({
      selectActionInit: true,
    });
    dispatch(showPageLoader());
    // dispatch(getUserBodyMeasurementRequest(requestData));
    dispatch(getUserMealRequest(requestData));
    dispatch(getUserMealsLogDatesRequest(requestData));
    dispatch(hidePageLoader());
  };
}

const mapStateToProps = state => {
  const { userNutritions, userMeal, meal } = state;
  return {
    loading: userNutritions.get('loading'),
    error: userNutritions.get('error'),
    todaysMeal: userNutritions.get('todaysMeal'),

    saveLoading: userMeal.get('saveLoading'),
    logDates: userMeal.get('logDates'),
    user_meals: userMeal.get('user_meals'),
    loading_user_meals: userMeal.get('loading_user_meals'),

    recentMealsLoading: meal.get('recentMealsLoading'),
    recentMeals: meal.get('recentMeals'),
    recentMealsError: meal.get('recentMealsError'),

    addtoFavouriteLoading: meal.get('addtoFavouriteLoading'),
    addtoFavouriteError: meal.get('addtoFavouriteError'),
    addtoFavouriteSuccessMessage: meal.get('addtoFavouriteSuccessMessage'),
  };
};

export default connect(mapStateToProps)(NutritionMeal);
