import React, { Component } from 'react';
import CalendarDayOverViewNutritionList from './CalendarDayOverViewNutritionList';
import NutritionMealAddSearchForm from '../../Nutrition/NutritionMealAddSearchForm';
import { NavLink, Link } from 'react-router-dom';
import { routeCodes } from '../../../constants/routes';
import { showPageLoader, hidePageLoader } from '../../../actions/pageLoader';
import {
  getUserMealRequest,
  userMealAddRequest,
} from '../../../actions/user_meal';
import { connect } from 'react-redux';
import NutritionOverview from '../../Nutrition/NutritionOverview';
import {
  recentMealRequest,
  addMealToFavouriteRequest,
} from '../../../actions/meal';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CalendarDayOverViewCounts from '../CalendarDayOverViewCounts';
import { Scrollbars } from 'react-custom-scrollbars';
import Star from '../../../../assets/svg/star.svg';
import CalendarDayNutritionView from './CalendarDayNutritionView';
import CalendarDayNutritionTargetList from './CalendarDayNutritionTargetList';
import NutritionQuickAdd from './sidebar/NutritionQuickAdd';
import NutrientsList from './sidebar/NutrientsList';

class CalendarDayOverViewNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_list: [],
      storeMealIndex: null,
      showDeleteAlert: false,
      total_enerc_kal: 0,
      total_procnt: 0,
      total_fat: 0,
      total_chocdf: 0,
      total_sugar: 0,
      total_saturates: 0,
      total_cabs: 0,
      quickTab: '#favrioutmeals',
      isNutritionTargetTab: false,
    };
  }

  render() {
    const { meal_list, isNutritionTargetTab, quickTab } = this.state;
    const { mealsList, authuserId, recentMeals } = this.props;
    console.log('=========================');
    console.log('MealsList', meal_list);
    console.log('=========================');
    return (
      <React.Fragment>
        <div className="body-content workouts-bg">
          <div className="row justify-content-start no-gutters">
            <div className="col-xs-12 col-md-3 d-flex">
              <CalendarDayOverViewCounts
                isNutritionTargetTab={isNutritionTargetTab}
                handleChangeNutritionTarget={this.handleChangeNutritionTarget}
              />
            </div>
            <div className="col-xs-12 col-md-6 d-flex">
              {isNutritionTargetTab ? (
                <CalendarDayNutritionTargetList
                  setNutritionTab={this.props.setNutritionTab}
                  handleChangeNutritionTarget={this.handleChangeNutritionTarget}
                />
              ) : (
                <CalendarDayNutritionView
                  setNutritionTab={this.props.setNutritionTab}
                  handleRemoveMealsSubmit={this.handleRemoveMealsSubmit}
                  showDeleteAlert={this.state.showDeleteAlert}
                  meal_list={meal_list}
                  recentMeals={recentMeals}
                  addToFavourite={this.addToFavourite}
                  handleRemoveMeals={this.handleRemoveMeals}
                  authuserId={authuserId}
                />
              )}
            </div>
            <div className="col-xs-12 col-md-3 d-flex">
              {isNutritionTargetTab ? (
                <NutrientsList />
              ) : (
                <NutritionQuickAdd
                  quickTab={quickTab}
                  recentMeals={recentMeals}
                  addTodayMeals={this.addTodayMeals}
                  handleChangeQuickTab={this.handleChangeQuickTab}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    let newMealList = this.props.mealsList;
    const { dispatch } = this.props;
    newMealList.forEach(meal => {
      meal.total_enerc_kal = 0;
      meal.total_procnt = 0;
      meal.total_fat = 0;
      meal.total_chocdf = 0;
      meal.total_sugar = 0;
      meal.total_saturates = 0;
      meal.total_cabs = 0;
      meal = this.countIngredientValue(meal);
    });
    this.countIngredient(newMealList);
    this.setState({ meal_list: newMealList });
  }
  componentDidUpdate(prevProps, prevState) {
    const { mealsList } = this.props;
    if (mealsList && prevProps.mealsList !== mealsList) {
      let newMealList = mealsList;
      newMealList.forEach(meal => {
        meal.total_enerc_kal = 0;
        meal.total_procnt = 0;
        meal.total_fat = 0;
        meal.total_chocdf = 0;
        meal.total_sugar = 0;
        meal.total_saturates = 0;
        meal.total_cabs = 0;
        meal = this.countIngredientValue(meal);
      });
      this.countIngredient(newMealList);
      this.setState({ meal_list: newMealList });
    }
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
    return (
      obj.ingredientsIncluded &&
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
      })
    );
  };
  addTodayMeals = obj => {
    console.log('OBJ====>', obj);

    let {
      meal_list,
      total_enerc_kal,
      total_procnt,
      total_fat,
      total_chocdf,
      total_sugar,
      total_saturates,
      total_cabs,
    } = this.state;

    if (!(meal_list.filter(e => e._id === obj._id).length > 0)) {
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
      meal_list.push(obj);
      console.log('ADDDDDD ====> ', meal_list);
      total_enerc_kal = _.sumBy(meal_list, 'total_enerc_kal');
      total_procnt = _.sumBy(meal_list, 'total_procnt');
      total_fat = _.sumBy(meal_list, 'total_fat');
      total_chocdf = _.sumBy(meal_list, 'total_chocdf');
      total_sugar = _.sumBy(meal_list, 'total_sugar');
      total_saturates = _.sumBy(meal_list, 'total_saturates');
      total_cabs = _.sumBy(meal_list, 'total_cabs');

      total_fat = total_fat === NaN ? 0 : total_fat;
      this.setState({
        meal_list,
        total_enerc_kal,
        total_procnt,
        total_fat,
        total_chocdf,
        total_sugar,
        total_saturates,
        total_cabs,
      });
      console.log('todaymeals', meal_list);
    }
  };
  handleSaveMeals = async () => {
    const { dispatch, logDate } = this.props;
    console.log('PROPS=====>', this.props);
    const { meal_list } = this.state;
    if (meal_list.length > 0) {
      const filterMealsID = meal_list.map(item => {
        return { meal_id: item._id };
      });

      const data = {
        meals: filterMealsID,
        date: logDate,
      };
      console.log(data);
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

  handleRemoveMeals = index => {
    this.setState({ storeMealIndex: index, showDeleteAlert: true });
  };
  handleRemoveMealsSubmit = () => {
    const index = this.state.storeMealIndex;
    let { meal_list } = this.state;
    meal_list.splice(index, 1);
    this.countIngredient(meal_list);
    this.setState({
      today_meals: meal_list,
      storeMealIndex: null,
      showDeleteAlert: false,
    });
  };

  getUserMealsLogData = requestData => {
    const { dispatch } = this.props;
    this.setState({
      selectActionInit: true,
    });
    dispatch(showPageLoader());
    // dispatch(getUserBodyMeasurementRequest(requestData));
    dispatch(getUserMealRequest(requestData));
    //dispatch(getUserMealsLogDatesRequest(requestData));
    dispatch(hidePageLoader());
  };

  handleChangeNutritionTarget = () => {
    this.setState({ isNutritionTargetTab: !this.state.isNutritionTargetTab });
  };
  handleChangeQuickTab = action => {
    this.setState({ quickTab: action });
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CalendarDayOverViewNutrition);
