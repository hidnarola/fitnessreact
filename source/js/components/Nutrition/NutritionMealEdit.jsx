import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getNutritionsRequest } from '../../actions/nutritions';
import WorkoutSelectField_ReactSelect from '../ScheduleWorkout/WorkoutSelectField_ReactSelect';
import _ from 'lodash';
import {
  RECIPE_API_SEARCH_URL,
  DAY_DRIVE_BREAKFAST,
  DAY_DRIVE_PRE_LUNCH_SNACKS,
  DAY_DRIVE_LUNCH,
  DAY_DRIVE_POST_LUNCH_SNACKS,
  DAY_DRIVE_DINNER,
  MEAL_OPTIONS,
  MEAL_VISIBILITY,
} from '../../constants/consts';
import {
  searchRecipesApiRequest,
  addUserRecipeRequest,
} from '../../actions/userNutritions';
import noImg from 'img/common/no-img.png';
import InfiniteScroll from 'react-infinite-scroller';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import NutritionMealAddSearchForm from './NutritionMealAddSearchForm';
import NutritionSearchRecipeDetailsModal from './NutritionSearchRecipeDetailsModal';
import NutritionMealEditForm from './NutritionMealEditForm';
import { DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import moment from 'moment';
import { ts, te, checkImageMagicCode } from '../../helpers/funs';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import { FaCircleONotch } from 'react-icons/lib/fa';
import { Field, reduxForm } from 'redux-form';
import {
  required,
  minLength,
  maxLength,
  requiredReactSelect,
} from '../../formValidation/validationRules';
import AddMetaDescription from '../../components/global/AddMetaDescription';
import Dropzone from 'react-dropzone';
import { mealAddRequest } from '../../actions/meal';

const dayDriveOptions = [
  { value: DAY_DRIVE_BREAKFAST, label: 'Breakfast' },
  { value: DAY_DRIVE_PRE_LUNCH_SNACKS, label: 'Pre Lunch Snacks' },
  { value: DAY_DRIVE_LUNCH, label: 'Lunch' },
  { value: DAY_DRIVE_POST_LUNCH_SNACKS, label: 'Post Lunch Snacks' },
  { value: DAY_DRIVE_DINNER, label: 'Dinner' },
];

class NutritionMealEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      selectPageDataActionInit: false,
      excludeIngredients: [],
      dietLabels: [],
      healthLabels: [],
      nutritionTargets: [],
      searchActionInit: false,
      searchRecipes: [],
      from: 0,
      offset: 10,
      to: 10,
      hasMoreData: true,
      selectedRecipe: {},
      showDetailedRecipeModal: false,
      addActionInit: false,

      images: [],
      noImageError: null,
      invalidImage: [],
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    this.setState({ selectPageDataActionInit: true });
    dispatch(getNutritionsRequest());
    dispatch(getDietLabelsRequest());
    dispatch(getHealthLabelsRequest());
    dispatch(getUserNutritionPreferencesRequest());
  }

  render() {
    const {
      searchTerm,
      searchRecipes,
      hasMoreData,
      selectedRecipe,
      showDetailedRecipeModal,
      images,
      noImageError,
      invalidImage,
    } = this.state;
    const { searchRecipeLoading } = this.props;
    let dropzoneRef;
    return (
      <div className="fitness-nutrition">
        <AddMetaDescription>
          <title>Edit Meal | Fitly</title>
        </AddMetaDescription>
        <FitnessHeader />
        <FitnessNav />
        <section className="body-wrap">
          <div className="body-head d-flex justify-content-start front-white-header">
            <div className="body-head-l">
              <h2>Edit Meal</h2>
              <p>
                Your meal plan is balanced and tailored to provide the right mix
                for your goal. For your fitness assistant to provide the best
                meal plans make sure you rate recipes you like. You can further
                fine tune the meals selected for you by changing your nutrition
                settings.{' '}
              </p>
            </div>
            <div className="body-head-r">
              <NavLink className="pink-btn" to={routeCodes.NUTRITION}>
                <i className="icon-arrow_back" />
                Back
              </NavLink>
            </div>
          </div>
          <NutritionMealEditForm onSubmit={this.handleSubmit} />
        </section>
        <NutritionSearchRecipeDetailsModal
          show={showDetailedRecipeModal}
          handleClose={this.handleCloseRecipeDetailesModal}
          recipe={selectedRecipe}
        />
      </div>
    );
  }

  handleSubmit = data => {
    console.log('data => ', data);
    console.log('this.state => ', this.state);
    const { dispatch } = this.props;

    var formData = new FormData();
    if (data.title) {
      formData.append('title', data.title);
    }
    if (
      data.dropdown_meals_visibility &&
      data.dropdown_meals_visibility.value
    ) {
      formData.append('meals_visibility', data.dropdown_meals_visibility.value);
    }
    if (data.dropdown_meals_type && data.dropdown_meals_type.value) {
      formData.append('meals_type', data.dropdown_meals_type.value);
    }
    if (data.proximates && data.proximates.length > 0) {
      formData.append('ingredientsIncluded', JSON.stringify(data.proximates));
    }
    if (data.notes) {
      formData.append('notes', data.notes);
    }
    if (data.instruction) {
      formData.append('instructions', data.instruction);
    }
    if (data.images) {
      formData.append('meal_img', data.images[0]);
    }

    if (
      data.dropdown_meals_visibility &&
      data.dropdown_meals_visibility.value === 'public' &&
      !data.instruction
    ) {
      te('Instruction required for public meals');
    } else {
      dispatch(mealAddRequest(formData));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      selectPageDataActionInit,
      searchActionInit,
      from,
      to,
      offset,
      addActionInit,
    } = this.state;
    const {
      userNutriPrefLoading,
      healthLabelLoading,
      dietLabelLoading,
      nutritionLoading,
      searchRecipeLoading,
      searchRecipes,
      dispatch,
      userNutritionsLoading,
      userNutritionsError,
      meal,
      saveLoading,
      saveError,
      history,
    } = this.props;

    if (
      !saveLoading &&
      meal &&
      prevProps.saveLoading !== saveLoading &&
      prevProps.meal !== meal
    ) {
      // this.handleCloseSaveModal();
      // let stateData = { saveLoading: false, meal: null, saveError: [] };
      // dispatch(setBodyPartState(stateData));
      ts('Meal saved!');
      // this.refreshDtData();
      history.push(routeCodes.NUTRITION);
    }

    if (
      !saveLoading &&
      prevProps.saveLoading !== saveLoading &&
      prevProps.saveError !== saveError &&
      saveError.length > 0
    ) {
      var error_msg = '';
      saveError.map((e, i) => {
        error_msg = error_msg + e;
      });

      te(error_msg);
    }

    if (
      selectPageDataActionInit &&
      !userNutriPrefLoading &&
      !healthLabelLoading &&
      !dietLabelLoading &&
      !nutritionLoading
    ) {
      this.setState({ selectPageDataActionInit: false });
      this.prepareNutriData();
    }
    if (searchActionInit && !searchRecipeLoading) {
      if (searchRecipes && searchRecipes.length > 0) {
        this.setState({
          searchActionInit: false,
          searchRecipes: _.concat(this.state.searchRecipes, searchRecipes),
          from: from + offset,
          to: to + offset,
        });
      } else {
        this.setState({
          searchActionInit: false,
          hasMoreData: false,
        });
      }
      dispatch(hidePageLoader());
    }
    if (addActionInit && !userNutritionsLoading) {
      this.setState({ addActionInit: false });
      dispatch(hidePageLoader());
      if (userNutritionsError && userNutritionsError.length > 0) {
        te(userNutritionsError[0]);
      } else {
        ts('Recipe added to your todays meal!');
      }
    }
  }

  prepareNutriData = () => {
    const {
      excludeIngredients,
      healthLabels,
      dietLabels,
      healthRestrictionLabels,
      dietRestrictionLabels,
      nutritionTargets,
      nutritions,
    } = this.props;
    var helthLbs = [];
    var dietLbs = [];
    var nutriTargets = [];
    _.forEach(healthLabels, (obj, index) => {
      var index = _.indexOf(healthRestrictionLabels, obj._id);
      if (index >= 0) {
        helthLbs.push(obj.parameter);
      }
    });
    _.forEach(dietLabels, (obj, index) => {
      var index = _.indexOf(dietRestrictionLabels, obj._id);
      if (index >= 0) {
        dietLbs.push(obj.parameter);
      }
    });
    _.forEach(nutritionTargets, (obj, index) => {
      var nutri = _.find(nutritions, ['_id', obj.nutritionId]);
      if (nutri) {
        var nutr = {
          start: obj.start,
          end: obj.end,
          type: nutri.type,
          name: nutri.name,
          ntrCode: nutri.ntrCode,
        };
        nutriTargets.push(nutr);
      }
    });
    this.setState({
      excludeIngredients,
      healthLabels: helthLbs,
      dietLabels: dietLbs,
      nutritionTargets: nutriTargets,
    });
  };

  handleSearch = data => {
    var searchTerm = data.search_term;
    const { dispatch } = this.props;
    const {
      dietLabels,
      healthLabels,
      excludeIngredients,
      nutritionTargets,
      from,
      to,
      searchActionInit,
    } = this.state;
    if (!searchActionInit) {
      this.setState(
        {
          searchTerm: searchTerm,
          searchRecipes: [],
          from: 0,
          offset: 10,
          to: 10,
          hasMoreData: true,
        },
        () => {
          var requestUrl = this.generateRequestUrl();
          this.setState({ searchActionInit: true });
          dispatch(showPageLoader());
          dispatch(searchRecipesApiRequest(requestUrl));
        },
      );
    }
  };

  loadMore = () => {
    const { dispatch } = this.props;
    const {
      searchTerm,
      dietLabels,
      healthLabels,
      excludeIngredients,
      nutritionTargets,
      from,
      to,
      searchActionInit,
    } = this.state;
    if (!searchActionInit) {
      var requestUrl = this.generateRequestUrl();
      this.setState({ searchActionInit: true });
      dispatch(searchRecipesApiRequest(requestUrl));
    }
  };

  generateRequestUrl = () => {
    const {
      searchTerm,
      dietLabels,
      healthLabels,
      excludeIngredients,
      nutritionTargets,
      from,
      to,
    } = this.state;
    var requestUrl = RECIPE_API_SEARCH_URL;
    requestUrl += `&q=${searchTerm}`;
    requestUrl += `&from=${from}`;
    requestUrl += `&to=${to}`;
    requestUrl += `&ingr=${10}`;
    _.forEach(dietLabels, (obj, index) => {
      requestUrl += `&diet=${obj}`;
    });
    _.forEach(healthLabels, (obj, index) => {
      requestUrl += `&health=${obj}`;
    });
    _.forEach(excludeIngredients, (obj, index) => {
      requestUrl += `&excluded=${obj}`;
    });
    _.forEach(nutritionTargets, (obj, index) => {
      if (obj.type === 'nutrient') {
        requestUrl += `&nutrients[${obj.ntrCode}]=${obj.start}-${obj.end}`;
      } else {
        requestUrl += `&calories=${obj.start}-${obj.end}`;
      }
    });
    return requestUrl;
  };

  getSelectedRecipeDetails = recipe => {
    this.setState({ selectedRecipe: recipe, showDetailedRecipeModal: true });
  };

  handleCloseRecipeDetailesModal = () => {
    this.setState({ selectedRecipe: {}, showDetailedRecipeModal: false });
  };

  handleAddRecipe = (dayDrive, recipe) => {
    const { dispatch } = this.props;
    var requestData = {
      user_recipe: {
        dayDrive: dayDrive,
        recipe: recipe,
        date: moment().startOf('day'),
      },
    };
    this.setState({ addActionInit: true });
    dispatch(showPageLoader());
    dispatch(addUserRecipeRequest(requestData));
  };
}

NutritionMealEdit = reduxForm({
  form: 'nutrition_add_form',
})(NutritionMealEdit);

const mapStateToProps = state => {
  const {
    userNutritionPreferences,
    healthLabels,
    dietLabels,
    nutritions,
    userNutritions,
    meal,
  } = state;
  return {
    userNutriPrefLoading: userNutritionPreferences.get('loading'),
    dietRestrictionLabels: userNutritionPreferences.get(
      'dietRestrictionLabels',
    ),
    excludeIngredients: userNutritionPreferences.get('excludeIngredients'),
    healthRestrictionLabels: userNutritionPreferences.get(
      'healthRestrictionLabels',
    ),
    maxRecipeTime: userNutritionPreferences.get('maxRecipeTime'),
    nutritionTargets: userNutritionPreferences.get('nutritionTargets'),
    healthLabelLoading: healthLabels.get('loading'),
    healthLabels: healthLabels.get('healthLabels'),
    dietLabelLoading: dietLabels.get('loading'),
    dietLabels: dietLabels.get('dietLabels'),
    nutritionLoading: nutritions.get('loading'),
    nutritions: nutritions.get('nutritions'),
    userNutritionsLoading: userNutritions.get('loading'),
    userNutritionsError: userNutritions.get('error'),
    searchRecipeLoading: userNutritions.get('searchRecipeLoading'),
    searchRecipes: userNutritions.get('searchRecipes'),
    searchRecipeError: userNutritions.get('searchRecipeError'),

    saveLoading: meal.get('saveLoading'),
    meal: meal.get('meal'),
    saveError: meal.get('saveError'),
  };
};

export default connect(mapStateToProps)(NutritionMealEdit);

const InputField = props => {
  const {
    input,
    meta,
    wrapperClass,
    className,
    placeholder,
    errorClass,
    type,
    disabled,
    properties,
  } = props;
  return (
    <div
      className={`${wrapperClass} ${
        meta.touched && meta.error ? 'has-error' : ''
      }`}
    >
      <input
        {...input}
        type={type ? type : 'text'}
        disabled={disabled ? disabled : false}
        className={className}
        placeholder={placeholder}
        {...properties}
        autoComplete="off"
      />
      {meta.touched &&
        ((meta.error && <div className={errorClass}>{meta.error}</div>) ||
          (meta.warning && (
            <span className={warningClass}>{meta.warning}</span>
          )))}
    </div>
  );
};

const TextAreaField = props => {
  const {
    input,
    meta,
    wrapperClass,
    className,
    placeholder,
    errorClass,
    type,
    disabled,
    properties,
  } = props;
  return (
    <div
      className={`${wrapperClass} ${
        meta.touched && meta.error ? 'has-error' : ''
      }`}
    >
      <textarea
        {...input}
        type={type ? type : 'text'}
        disabled={disabled ? disabled : false}
        className={className}
        placeholder={placeholder}
        {...properties}
        autoComplete="off"
      />
      {meta.touched &&
        ((meta.error && <div className={errorClass}>{meta.error}</div>) ||
          (meta.warning && (
            <span className={warningClass}>{meta.warning}</span>
          )))}
    </div>
  );
};
