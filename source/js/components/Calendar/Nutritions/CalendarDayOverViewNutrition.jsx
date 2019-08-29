import React, { Component } from 'react';
import CalendarDayOverViewNutritionList from './CalendarDayOverViewNutritionList';

class CalendarDayOverViewNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal_list: [],
    };
  }
  componentDidMount() {
    let newMealList = this.props.mealsList;
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
  render() {
    const { meal_list } = this.state;
    const { mealsList, authuserId } = this.props;
    console.log('=========================');
    console.log('MealsList', meal_list);
    console.log('=========================');
    return (
      <React.Fragment>
        <div className="white-box" style={{ marginBottom: '2rem' }}>
          <div className="whitebox-body">
            {meal_list.map((meal, index) => (
              <CalendarDayOverViewNutritionList
                key={index}
                meal={meal}
                authuserId={authuserId}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayOverViewNutrition;
