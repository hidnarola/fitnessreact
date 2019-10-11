import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NutritionMealCreateLeftSidebar from './NutritionMealCreateLeftSidebar';
import CommentBoxForm from '../../Profile/CommentBoxForm';
import NutritionMealDetails from './NutritionMealDetails';
import NutritionMealInstruction from './NutritionMealInstruction';
import NutritionMealNote from './NutritionMealNote';
import NutritionMealPhotoes from './NutritionMealPhotoes';
import NutritionMealCreateNavbar from './Header/NutritionMealCreateNavbar';
import NutritionQuickAdd from '../../Calendar/Nutritions/sidebar/NutritionQuickAdd';
import NutritionMealIngredientList from './NutritionMealIngredientList';
import NutritionMealCreateQuickAdd from './NutritionMealCreateQuickAdd';
import {
  getIngridientsRequest,
  getRecentIngridientsRequest,
} from '../../../actions/new_nutrition';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class NutritionMealBodyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: '#details',
      isActiveIngredientTab: false,
      searchIsLoading: false,
      selectedMealMode: 'All',
      ingredient_list: [],
      meal_proximates: [],
    };
    this.searchDebounce = _.debounce(this.searchIngredient, 1000);
  }

  render() {
    const {
      isActiveTab,
      isActiveIngredientTab,
      ingredient_list,
      meal_proximates,
      selectedMealMode,
    } = this.state;
    const { searchSuggestions, mealVisibility, recent_ingredient } = this.props;
    return (
      <React.Fragment>
        <form
          method="post"
          onSubmit={() => this.props.handleSubmit(this.handleSubmit)}
          className="width-100-per"
        >
          <div className="whitebox-body meals-bg nutrition-create border-left border-right">
            <div className="meal-input">
              <input
                type="text"
                className="form-control"
                placeholder="Add a title"
                name="mealTitle"
                value={this.props.mealTitle}
                onChange={this.props.handleChangeMealTitle}
                onKeyPress={e => {
                  e.key === 'Enter' && e.preventDefault();
                }}
              />
            </div>
            <div className="save-btn-group">
              <button type="submit" className="btn btn-save">
                Save and add
              </button>
              <DropdownButton
                title={
                  <i
                    className={
                      mealVisibility === 'private'
                        ? 'fad fa-user-shield'
                        : 'fad fa-users'
                    }
                  />
                }
                key={1}
                id={`dropdown-basic-${1}`}
                pullRight
              >
                <MenuItem
                  eventKey="1"
                  onClick={() => this.handleChangeMealVisibility('private')}
                >
                  <i className="fad fa-user-shield" /> Private
                </MenuItem>
                <MenuItem
                  eventKey="2"
                  onClick={() => this.handleChangeMealVisibility('public')}
                >
                  <i className="fad fa-users" /> Public
                </MenuItem>
              </DropdownButton>
            </div>
            <div className="row no-gutters">
              {!isActiveIngredientTab && (
                <React.Fragment>
                  <div className="col-md-4 border-right">
                    <NutritionMealCreateLeftSidebar
                      isActiveIngredientTab={isActiveIngredientTab}
                      handleChangeIngredientTab={this.handleChangeIngredientTab}
                      ingredient_list={ingredient_list}
                      meal_proximates={meal_proximates}
                      changeServing={this.changeServing}
                      ingredientUnit={this.ingredientUnit}
                      handleRemoveIngredient={this.handleRemoveIngredient}
                    />
                  </div>
                  <div className="col-md-8">
                    <NutritionMealCreateNavbar
                      isActiveTab={isActiveTab}
                      handleChangeTab={this.handleChangeTab}
                    />
                    <div className="tab-content nutrition-body">
                      {isActiveTab === `#details` && <NutritionMealDetails />}
                      {isActiveTab === `#instructions` && (
                        <NutritionMealInstruction
                          handleChangeInstructions={
                            this.props.handleChangeInstructions
                          }
                          instructions={this.props.instructions}
                        />
                      )}
                      {isActiveTab === `#notes` && (
                        <NutritionMealNote
                          handleChangeNotes={this.props.handleChangeNotes}
                        />
                      )}
                      {isActiveTab === `#photos` && <NutritionMealPhotoes />}
                    </div>
                  </div>
                </React.Fragment>
              )}
              {isActiveIngredientTab && (
                <React.Fragment>
                  <div className="col-md-8 border-right">
                    <NutritionMealIngredientList
                      handleChangeIngredientTab={this.handleChangeIngredientTab}
                      ingredient_list={ingredient_list}
                      meal_proximates={meal_proximates}
                      changeServing={this.changeServing}
                      ingredientUnit={this.ingredientUnit}
                      handleRemoveIngredient={this.handleRemoveIngredient}
                    />
                  </div>
                  <div className="col-md-4">
                    <NutritionMealCreateQuickAdd
                      key={654}
                      searchIsLoading={this.state.searchIsLoading}
                      quickTab={this.props.quickTab}
                      recentMeals={this.props.recentMeals}
                      addTodayMeals={this.props.addTodayMeals}
                      handleChangeQuickTab={this.props.handleChangeQuickTab}
                      selectedMealMode={selectedMealMode}
                      handleChangeMealMode={this.handleChangeMealMode}
                      handleSuggestionsFetchRequested={
                        this.handleSuggestionsFetchRequested
                      }
                      searchSuggestions={searchSuggestions}
                      handleAddIngredient={this.handleAddIngredient}
                      recent_ingredient={recent_ingredient}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
  handleChangeMealMode = action => {
    this.setState({ selectedMealMode: action });
  };
  handleChangeTab = tab => {
    this.setState({ isActiveTab: tab });
  };
  handleChangeIngredientTab = value => {
    this.setState({ isActiveIngredientTab: value });
  };
  handleSuggestionsFetchRequested = value => {
    this.searchDebounce.cancel;
    if (value && value.trim() && value.trim() !== '') {
      this.searchDebounce(value.trim());
    }
  };
  handleRemoveIngredient = index => {
    let { ingredient_list, meal_proximates } = this.state;
    ingredient_list.splice(index, 1);
    meal_proximates.splice(index, 1);
    this.setState({ ingredient_list, meal_proximates });
  };
  handleAddIngredient = obj => {
    let { ingredient_list, meal_proximates } = this.state;
    let ingredientObj = {};
    ingredientObj.serving_size = 0;
    ingredientObj.serving_input = 0;
    ingredientObj.ingredient_unit = 'g';
    ingredientObj.unit = '';
    ingredientObj.count = 0;
    ingredientObj.totalKcl = 0;
    ingredientObj.totalfat = 0;
    ingredientObj.totalProtein = 0;
    ingredientObj.totalCarbs = 0;
    ingredientObj.totalSugar = 0;
    ingredientObj.totalWater = 0;
    ingredientObj.totalStarch = 0;
    ingredientObj.totalCholesterol = 0;
    ingredientObj.ingredient_id = obj._id;
    ingredient_list.push(ingredientObj);
    meal_proximates.push(obj);
    this.setState({ ingredient_list, meal_proximates });
  };
  searchIngredient = value => {
    const { dispatch } = this.props;
    const { selectedMealMode } = this.state;
    var requestData = { name: value, start: 0, offset: 50 };
    this.setState({ searchIsLoading: true });
    selectedMealMode === 'All' && dispatch(getIngridientsRequest(requestData));
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchloading, searchSuggestions } = this.props;
    const { meal_proximates } = this.state;
    if (!searchloading && prevProps.searchSuggestions !== searchSuggestions) {
      this.setState({ searchIsLoading: false });
    }
    if (prevState.meal_proximates !== meal_proximates) {
      this.setState({ meal_proximates });
    }
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRecentIngridientsRequest());
  }

  changeServing = (id, _vobj, serving_size, unit, count) => {
    // console.log("value =>", id, vobj, serving_size, unit, typeof count);
    try {
      const { ingredient_list } = this.state;
      let _array = ingredient_list;
      let vobj = _vobj;
      console.log('vobj => ', vobj);
      if (serving_size) {
        vobj.serving_input = serving_size;
      }
      if (unit) {
        vobj.ingredient_unit = unit;
      }
      // if (count) {
      vobj.count = 1;
      // }
      if (vobj._id) {
        vobj.ingredient_id = vobj._id;
      }
      if (vobj.serving_input && vobj.ingredient_unit && vobj.count) {
        if (vobj.ingredient_unit !== 'g') {
          console.log(vobj.serving_input, vobj.ingredient_unit, vobj.count);
          // gram_total
          var _serving_size = vobj.serving_input * vobj[vobj.ingredient_unit];

          if (Number(vobj.energyKcal) !== NaN) {
            vobj.totalKcl = (
              ((_serving_size * Number(vobj.energyKcal)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.fat) !== NaN) {
            vobj.totalfat = (
              ((_serving_size * Number(vobj.fat)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.protein) !== NaN) {
            vobj.totalProtein = (
              ((_serving_size * Number(vobj.protein)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.carbohydrate) !== NaN) {
            vobj.totalCarbs = (
              ((_serving_size * Number(vobj.carbohydrate)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          console.log(
            'Number(vobj.totalSugars) => ',
            Number(vobj.totalSugars),
            NaN,
          );
          if (Number(vobj.totalSugars) !== NaN) {
            vobj.totalSugar = (
              ((_serving_size * Number(vobj.totalSugars)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.water) !== NaN) {
            vobj.totalWater = (
              ((_serving_size * Number(vobj.water)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.starch) !== NaN) {
            vobj.totalStarch = (
              ((_serving_size * Number(vobj.starch)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.cholesterol) !== NaN) {
            vobj.totalCholesterol = (
              ((_serving_size * Number(vobj.cholesterol)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
        } else {
          if (Number(vobj.energyKcal) !== NaN) {
            vobj.totalKcl = (
              ((vobj.serving_input * Number(vobj.energyKcal)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.fat) !== NaN) {
            vobj.totalfat = (
              ((vobj.serving_input * Number(vobj.fat)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.protein) !== NaN) {
            vobj.totalProtein = (
              ((vobj.serving_input * Number(vobj.protein)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.carbohydrate) !== NaN) {
            vobj.totalCarbs = (
              ((vobj.serving_input * Number(vobj.carbohydrate)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          // console.log('Number(vobj.totalSugars) => ', Number(vobj.totalSugars), NaN, Number(vobj.totalSugars) !== NaN, vobj.totalSugars);
          if (Number(vobj.totalSugars) !== NaN) {
            vobj.totalSugar = (
              ((vobj.serving_input * Number(vobj.totalSugars)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.water) !== NaN) {
            vobj.totalWater = (
              ((vobj.serving_input * Number(vobj.water)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.starch) !== NaN) {
            vobj.totalStarch = (
              ((vobj.serving_input * Number(vobj.starch)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
          if (Number(vobj.cholesterol) !== NaN) {
            vobj.totalCholesterol = (
              ((vobj.serving_input * Number(vobj.cholesterol)) / 100) *
              Number(vobj.count)
            ).toFixed(2);
          }
        }
      }
      delete vobj._id;
      _array[id] = vobj;
      this.setState({ ingredient_list: _array });
      console.log(
        'this.state.ingredient_list ======= >',
        this.state.ingredient_list,
      );
    } catch (error) {
      console.log('error => ', error);
    }
  };
  ingredientUnit = ingredient => {
    // return [];
    let a = [];
    a.push({ label: 'g', value: 'g' });
    for (let [key, value] of Object.entries(ingredient)) {
      // console.log('key => ', key);
      // console.log('value => ', value);
      if (value) {
        switch (key) {
          case '_1tsp':
            a.push({ label: 'tsp', value: '_1tsp' });
            break;
          case '_1tbsp':
            a.push({ label: 'tbsp', value: '_1tbsp' });
            break;
          case '_1cup':
            a.push({ label: 'cup', value: '_1cup' });
            break;
          case '_1leaf':
            a.push({ label: 'leaf', value: '_1leaf' });
            break;
          case '_1large':
            a.push({ label: 'large', value: '_1large' });
            break;
          case '_1medium':
            a.push({ label: 'medium', value: '_1medium' });
            break;
          case '_1root':
            a.push({ label: 'root', value: '_1root' });
            break;
          case '_1small':
            a.push({ label: 'small', value: '_1small' });
            break;
          case '_1extra_large':
            a.push({ label: 'extra large', value: '_1extra_large' });
            break;
          case '_1tip':
            a.push({ label: 'tip', value: '_1tip' });
            break;

          default:
            break;
        }
      }
    }
    return a;
  };
  handleSubmit = (a, b, c) => {
    console.log('a => ', a);
    console.log('b => ', b);
    console.log('c => ', c);
    // c.preventDefault();
    {
      /* console.log("~~~~~~~~~~~~~~~~>", e)
        console.log('data => ', data); */
    }
    // event.preventDefault();
    // const { handleSubmit } = this.props;
    // console.log('data => ', data);
    // handleSubmit(data);
    // const {
    //     meal_ingredient
    // } = this.state;
    const { ingredient_list } = this.state;
    let newIngredientList = [];
    ingredient_list.forEach(item => {
      newIngredientList.push({
        ingredient_id: item.ingredient_id,
        ingredient_unit: item.ingredient_unit,
        serving_input: item.serving_input,
        count: item.count,
        totalKcl: item.totalKcl,
        totalfat: item.totalfat,
        totalProtein: item.totalProtein,
        totalCarbs: item.totalCarbs,
        totalSugar: item.totalSugar,
        totalWater: item.totalWater,
        totalStarch: item.totalStarch,
        totalCholesterol: item.totalCholesterol,
        totalNitrogen: item.totalNitrogen,
      });
    });
    a['proximates'] = newIngredientList;
    c.onSubmit(a);
    // return a;
  };
}

NutritionMealBodyContent = reduxForm({
  form: 'nutrition_meal_add_form',
})(NutritionMealBodyContent);
const selector = formValueSelector('nutrition_meal_add_form');

const mapStateToProps = state => {
  const { new_nutrition } = state;
  return {
    searchSuggestions: new_nutrition.get('ingridients'),
    searchloading: new_nutrition.get('loading'),
    recent_ingredient: new_nutrition.get('recent_ingredient'),
  };
};

export default connect(mapStateToProps)(NutritionMealBodyContent);
