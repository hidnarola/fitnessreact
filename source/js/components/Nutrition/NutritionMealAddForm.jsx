import React, { Component } from 'react';
import { connect } from 'react-redux';
import FitnessHeader from '../global/FitnessHeader';
import FitnessNav from '../global/FitnessNav';
import { getUserNutritionPreferencesRequest } from '../../actions/userNutritionPreferences';
import { getHealthLabelsRequest } from '../../actions/healthLabels';
import { getDietLabelsRequest } from '../../actions/dietLabels';
import { getNutritionsRequest } from '../../actions/nutritions';
import {
  getIngridientsRequest,
  handleChangeIngridientsSearchFor,
  getRecentIngridientsRequest,
} from '../../actions/new_nutrition';

import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import WorkoutSelectField_ReactSelect from '../ScheduleWorkout/WorkoutSelectField_ReactSelect';
import FaSearch from 'react-icons/lib/fa/search';
import FaSpinner from 'react-icons/lib/fa/spinner';

import cns from 'classnames';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
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
import noProfileImg from 'img/common/no-profile-img.png';

import InfiniteScroll from 'react-infinite-scroller';
import { showPageLoader, hidePageLoader } from '../../actions/pageLoader';
import NutritionMealAddSearchForm from './NutritionMealAddSearchForm';
import NutritionSearchRecipeDetailsModal from './NutritionSearchRecipeDetailsModal';
import { DropdownButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import moment from 'moment';
import { ts, te, checkImageMagicCode } from '../../helpers/funs';
import { NavLink } from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import { FaCircleONotch } from 'react-icons/lib/fa';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  required,
  minLength,
  maxLength,
  requiredReactSelect,
} from '../../formValidation/validationRules';
import AddMetaDescription from '../global/AddMetaDescription';
import Dropzone from 'react-dropzone';
import { FileField_Dropzone_Single } from '../../helpers/FormControlHelper';
const dayDriveOptions = [
  { value: DAY_DRIVE_BREAKFAST, label: 'Breakfast' },
  { value: DAY_DRIVE_PRE_LUNCH_SNACKS, label: 'Pre Lunch Snacks' },
  { value: DAY_DRIVE_LUNCH, label: 'Lunch' },
  { value: DAY_DRIVE_POST_LUNCH_SNACKS, label: 'Post Lunch Snacks' },
  { value: DAY_DRIVE_DINNER, label: 'Dinner' },
];
import Star from 'svg/star.svg';
import { FILTER_BODY_PARTS_SUCCESS } from '../../actions/admin/bodyParts';
import { Alert } from 'react-bootstrap';
import { new_nutrition } from 'sagas/new_nutrition';
class NutritionMealAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      noImageError: null,
      invalidImage: [],
      cuurentTab: '#Ingredients',
      isPublic: false,
      ingredient_list: [
        { count: 1, foodname: 'temp', value: 2.5, unit: 'g/unit/cup/tsp/tbsp' },
        {
          count: 4,
          foodname: 'temp1',
          value: 1.5,
          unit: 'g/unit/cup/tsp/tbsp',
        },
      ],
      searchSuggestions: [],
      searchIsLoading: false,
      showSearchLoader: false,
      meal_ingredient: [],
    };
    this.searchDebounce = _.debounce(this.searchUsers, 1000);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getRecentIngridientsRequest());
  }

  render() {
    const {
      handleSubmit,
      searchValue,
      recent_ingredient,
      cuurentTab,
    } = this.props;
    const {
      images,
      noImageError,
      invalidImage,
      ingredient_list,
      searchSuggestions,
      showSearchLoader,
      meal_ingredient,
    } = this.state;
    let dropzoneRef;
    var loggedUserImage = '';
    return (
      <form method="POST" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className="body-content d-flex row justify-content-start nutrition-meal-add-wrapper add-receipy workouts-bg ml-0 mr-0 pl-0 pr-0">
          <div className="col-md-3 left-sidebar">
            <div className="white-box blue-box">
              <div className="whitebox-head d-flex profile-head">
                <h3 className="title-h3"> Details </h3>
              </div>
              <div className="sidebar-form">
                <Field
                  name="title"
                  className="form-control"
                  wrapperClass="form-group"
                  placeholder="Add a title"
                  component={InputField}
                  errorClass="help-block"
                  validate={[required]}
                />
                <Field
                  name="dropdown_meals_type"
                  wrapperClass="form-group"
                  placeholder="select meals"
                  component={WorkoutSelectField_ReactSelect}
                  options={MEAL_OPTIONS}
                  validate={[requiredReactSelect]}
                  errorClass="help-block"
                />
                {document.getElementById('react-select-3--value-item') &&
                  console.log(
                    '==>',
                    document.getElementById('react-select-3--value-item')
                      .innerText,
                  )}
                <Field
                  name="dropdown_meals_visibility"
                  wrapperClass="form-group"
                  placeholder="Meal visibility"
                  component={WorkoutSelectField_ReactSelect}
                  options={MEAL_VISIBILITY}
                  validate={[requiredReactSelect]}
                  errorClass="help-block"
                />

                <div className="add-log d-flex add-log_change">
                  <button type="submit" className="ml-auto">
                    Save Log <i className="icon-control_point" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 pr-0">
            <div className="row mr-0">
              <div className="col-md-8 pl-0 pr-0">
                <div className={'tab-content'}>
                  <div className="nutrition-list">
                    {cuurentTab === '#Ingredients' && (
                      <div
                        className={
                          cuurentTab === '#Ingredients'
                            ? 'content active'
                            : 'content'
                        }
                        id="Ingredients"
                      >
                        Content of Ingredients
                        {/* <div className="search search_Cstm">

                                            <Field
                                                name="search_term"
                                                className="form-control"
                                                placeholder="Search Meal"
                                                component={InputField}
                                                errorClass="help-block"
                                            />
                                        </div> */}
                        <div className="whitebox">
                          <div className="whitebox-body">
                            <div
                              id="search-header"
                              className="search meal-search"
                            >
                              <div className="search-form header-search-form">
                                <span className="search-icon">
                                  <FaSearch size={22} />
                                </span>
                                <Autosuggest
                                  suggestions={searchSuggestions}
                                  onSuggestionsFetchRequested={
                                    this.handleSuggestionsFetchRequested
                                  }
                                  onSuggestionsClearRequested={
                                    this.handleSuggestionsClearRequested
                                  }
                                  getSuggestionValue={value =>
                                    console.log(value)
                                  }
                                  onSuggestionSelected={(e, value) =>
                                    this.getSuggestionValue(value.suggestion)
                                  }
                                  renderSuggestion={this.renderSearchSuggestion}
                                  inputProps={{
                                    id: 'header_search_users',
                                    name: 'header_search_users',
                                    value: searchValue,
                                    onChange: this.handleSearchChange,
                                    placeholder: 'Search Ingredient',
                                  }}
                                />
                                {showSearchLoader && (
                                  <span className="loader-icon">
                                    <FaSpinner
                                      size={22}
                                      className="loader-spinner"
                                    />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* {console.log('searchSuggestions => ', searchSuggestions)}
                                        {searchSuggestions && searchSuggestions.length > 0 && searchSuggestions.map((v, id) =>
                                            <div key={id}>
                                                <p> Count : {v.count} </p>
                                                <p> Name: {v.foodName} </p>
                                                <p> Value : 2.5 </p>
                                                <p> Unit: g/unit/cup/tbsp/tsp</p>
                                            </div>
                                        ) */}
                        {meal_ingredient &&
                          meal_ingredient.length > 0 &&
                          meal_ingredient.map((v, id) => (
                            <div key={id} className="box_wrap_one">
                              <div className="head_wrap">
                                <h2>{v.foodName}</h2>
                                <div className="p_serve">
                                  <p>Serving Size:</p>
                                  <Field
                                    type="number"
                                    name={'serving-input' + id}
                                    className="form-control serving-input"
                                    wrapperClass=""
                                    placeholder="100.00"
                                    value={v.serving_size}
                                    component={InputField}
                                    errorClass="help-block"
                                    validate={[required]}
                                    onChange={(e, serving_size) =>
                                      this.changeServing(
                                        id,
                                        v,
                                        serving_size,
                                        null,
                                        null,
                                      )
                                    }
                                  />
                                  <Field
                                    name={'dropdown-ingredient-unit' + id}
                                    value={v.unit}
                                    wrapperClass="form_drop_cstm"
                                    placeholder="unit"
                                    component={WorkoutSelectField_ReactSelect}
                                    options={this.ingredientUnit(v)}
                                    validate={[requiredReactSelect]}
                                    errorClass="help-block"
                                    onChange={(e, unit) =>
                                      this.changeServing(
                                        id,
                                        v,
                                        null,
                                        unit.value,
                                        null,
                                      )
                                    }
                                  />
                                  {false && <p> Count:</p>}
                                  {false && (
                                    <Field
                                      name={'serving-unit' + id}
                                      className="form-control serving-input"
                                      wrapperClass=""
                                      parse={value => Number(value)}
                                      placeholder="1"
                                      value={v.count}
                                      component={InputField}
                                      type="number"
                                      errorClass="help-block"
                                      validate={[required]}
                                      onChange={(e, count) =>
                                        this.changeServing(
                                          id,
                                          v,
                                          null,
                                          null,
                                          count,
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                {/* <span className="star_one">
                                                        <Star />
                                                    </span> */}
                                <button
                                  type="button"
                                  className="timline-post-del-btn"
                                  onClick={e => this.removeFromMeal(v)}
                                >
                                  <i className="icon-cancel" />
                                </button>
                              </div>
                              <ul className="ul_six_wrap">
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      Kcal
                                      <span>
                                        {Number(v.totalKcl) !== NaN &&
                                        v.totalKcl !== 'NaN'
                                          ? v.totalKcl
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      fat
                                      <span>
                                        {Number(v.totalfat) !== NaN &&
                                        v.totalfat !== 'NaN'
                                          ? v.totalfat
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      Protin
                                      <span>
                                        {Number(v.totalProtein) !== NaN &&
                                        v.totalProtein !== 'NaN'
                                          ? v.totalProtein
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      Carbs
                                      <span>
                                        {Number(v.totalCarbs) !== NaN &&
                                        v.totalCarbs !== 'NaN'
                                          ? v.totalCarbs
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      Sugar
                                      <span>
                                        {Number(v.totalSugar) !== NaN &&
                                        v.totalSugar !== 'NaN'
                                          ? v.totalSugar
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="data_serve">
                                    <p>
                                      Cholesterol
                                      <span>
                                        {Number(v.totalCholesterol) !== NaN &&
                                        v.totalSugar !== 'NaN'
                                          ? v.totalCholesterol
                                          : 0}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>
                    )}

                    {cuurentTab === '#Photos' && (
                      <div
                        className={
                          cuurentTab === '#Photos'
                            ? 'content active'
                            : 'content'
                        }
                        id="Photos"
                      >
                        <div className="upload-gallery">
                          {/* {images && images.length > 0 &&
                                            images.map((img, i) => {
                                                return (
                                                    <span key={i}>
                                                        <div className="">
                                                            <button type="button" className="btn btn-danger no-margin" onClick={() => this.handleImageDelete(i)}>Delete</button>
                                                        </div>
                                                        <img src={img.preview} alt="" />
                                                    </span>
                                                )
                                            })
                                        } */}
                          {/* <Dropzone
                                            name="images"
                                            className="no-padding"
                                            accept={"image/jpeg, image/png, image/jpg"}
                                            onDrop={(filesToUpload, rejectedFiles) => {
                                                if (rejectedFiles && rejectedFiles.length > 0) {
                                                    let invalidImage = ['Invalid file(s). Please select jpg and png only'];
                                                    this.setState({ invalidImage });
                                                } else {
                                                    let noImageError = null;
                                                    let invalidImage = [];
                                                    this.setState({ invalidImage, noImageError });
                                                }
                                                this.handleImagesSelection(filesToUpload);
                                            }}
                                            multiple={true}
                                            ref={(node) => { dropzoneRef = node; }}
                                        >
                                            <span>
                                                <i className="icon-add_a_photo"></i>
                                            </span>
                                        </Dropzone> */}

                          <Field
                            name="images"
                            label="Meal Image"
                            labelClass="control-label display_block"
                            mainWrapperClass="image-form-main-wrapper ingredient-image"
                            wrapperClass="form-group"
                            placeholder="Images"
                            component={FileField_Dropzone_Single}
                            existingImages={images}
                            showExistingImageDeleteModel={path =>
                              this.handleDeleteImageModel(true, path)
                            }
                          />
                        </div>
                      </div>
                    )}

                    {cuurentTab === '#Instruction' && (
                      <div
                        className={
                          cuurentTab === '#Instruction'
                            ? 'content active'
                            : 'content'
                        }
                        id="Instruction"
                      >
                        Content of Instruction
                        <div className="progress-popup-body-m">
                          <Field
                            id="instruction"
                            name="instruction"
                            component={TextAreaField}
                            placeholder="Add instruction for the meal"
                            className="form-control"
                            errorClass="help-block"
                            validate={
                              document.getElementById(
                                'react-select-3--value-item',
                              ) &&
                              document.getElementById(
                                'react-select-3--value-item',
                              ).innerText &&
                              document.getElementById(
                                'react-select-3--value-item',
                              ).innerText === 'Public'
                                ? [required]
                                : []
                            }
                          />
                        </div>
                      </div>
                    )}
                    {cuurentTab === '#Notes' && (
                      <div
                        className={
                          cuurentTab === '#Notes' ? 'content active' : 'content'
                        }
                        id="Notes"
                      >
                        Content of Notes
                        <div className="">
                          <div className="progress-popup-body-m">
                            <Field
                              id="notes"
                              name="notes"
                              component={TextAreaField}
                              placeholder="Add notes for the meal"
                              className="form-control"
                              errorClass="help-block"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 pr-0 pl-0">
                <div className="blue_right_sidebar">
                  <h2 className="h2_head_one">Recent Ingredients</h2>
                  <div className="recent-ingredient">
                    {recent_ingredient && recent_ingredient.length > 0 && (
                      <ul>
                        {recent_ingredient.map((v, id) => (
                          <li
                            key={id}
                            onClick={e => this.getSuggestionValue(v)}
                          >
                            {v.foodName}
                            <div className="add_drag">
                              <i className="icon-control_point" /> Click to Add
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

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
    a['proximates'] = this.state.meal_ingredient;
    c.onSubmit(a);
    // return a;
  };

  changeServing = (id, _vobj, serving_size, unit, count) => {
    // console.log("value =>", id, vobj, serving_size, unit, typeof count);
    try {
      const { meal_ingredient } = this.state;
      let _array = meal_ingredient;
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
      this.setState({ meal_ingredient: _array });
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

  removeFromMeal = value => {
    const { meal_ingredient } = this.state;
    if (meal_ingredient.filter(e => e._id === value._id).length > 0) {
      var a = meal_ingredient.filter(e => e._id !== value._id);
      this.setState({
        meal_ingredient: meal_ingredient.filter(e => e._id !== value._id),
      });
    }
  };

  renderSearchSuggestion = (suggestion, { query }) => {
    // if (suggestion._id === 'view_all') {
    //     return (
    //         <NavLink to="">
    //             <span>{suggestion.text}</span>
    //         </NavLink>
    //     );
    // }
    // if (suggestion._id === 'no_result') {
    //     return (
    //         <a href="javascript:void(0)">
    //             <span>{suggestion.text}</span>
    //         </a>
    //     );
    // } else {
    var fullName = suggestion.foodName;
    // if (suggestion.lastName) {
    //     fullName += ' ' + suggestion.lastName;
    // }
    const matches = AutosuggestHighlightMatch(fullName, query);
    const parts = AutosuggestHighlightParse(fullName, matches);
    return (
      <a href="javascript:void(0)">
        {suggestion.avatar && (
          <img
            src={suggestion.avatar}
            onError={e => {
              e.target.src = noProfileImg;
            }}
          />
        )}
        <div className="search-text-wrapper">
          <span>
            {parts.map((part, i) => {
              return (
                <span
                  key={i}
                  className={cns({ 'search-word-highlight': part.highlight })}
                >
                  {part.text}
                </span>
              );
            })}
          </span>
          {fullName !== 'No ingridient found' && (
            <span className="click-to-add-btn">Click to add</span>
          )}
        </div>
      </a>
    );
    // }
  };

  searchUsers = value => {
    const { dispatch } = this.props;
    var requestData = {
      name: value,
      start: 0,
      offset: 50,
    };
    this.setState({ searchIsLoading: true });
    // dispatch(getUserNutritionPreferencesRequest(requestData));
    dispatch(getIngridientsRequest(requestData));
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.searchDebounce.cancel;
    if (value && value.trim() && value.trim() !== '') {
      this.searchDebounce(value.trim());
    }
  };

  handleImagesSelection = fileList => {
    for (const file of fileList) {
      checkImageMagicCode(file)
        .then(image => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, image],
            };
          });
        })
        .catch(error => {
          te(error.message);
        });
    }
  };

  handleImageDelete = index => {
    var images = this.state.images;
    images.splice(index, 1);
    this.setState({ images });
  };

  handleSuggestionsClearRequested = () => {
    // this.setState({
    //     searchSuggestions: []
    // });
  };

  getSuggestionValue = suggestionn => {
    console.log('getSuggestionValue => ', suggestion);
    // let suggestion = suggestionn.suggestion;
    let suggestion = suggestionn;
    const { searchValue } = this.props;
    const { meal_ingredient } = this.state;

    if (!(meal_ingredient.filter(e => e._id === suggestion._id).length > 0)) {
      suggestion.serving_size = 0;
      suggestion.unit = '';
      suggestion.count = 0;
      suggestion.gram_total = 0;

      suggestion.totalKcl = 0;
      suggestion.totalfat = 0;
      suggestion.totalProtein = 0;
      suggestion.totalCarbs = 0;
      suggestion.totalSugar = 0;
      suggestion.totalWater = 0;
      suggestion.totalStarch = 0;
      suggestion.totalCholesterol = 0;

      meal_ingredient.push(suggestion);
      this.setState({ meal_ingredient: meal_ingredient });
    }
  };

  //#region Common functions
  handleSearchChange = (event, { newValue }) => {
    const { dispatch } = this.props;
    if (
      newValue &&
      typeof newValue !== 'undefined' &&
      newValue !== '' &&
      newValue.trim() !== ''
    ) {
      this.setState({ showSearchLoader: true });
    }
    if (newValue !== undefined) {
      dispatch(handleChangeIngridientsSearchFor('searchValue', newValue));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchSuggestions, userSearchLoading, searchLoading } = this.props;
    const { searchIsLoading, showSearchLoader } = this.state;
    if (
      searchLoading !== prevProps.searchLoading ||
      (searchSuggestions.length !== prevProps.searchSuggestions.length ||
        searchSuggestions[searchSuggestions.length - 1] !==
          prevProps.searchSuggestions[searchSuggestions.length - 1])
    ) {
      let suggestedUsers = [];
      if (searchSuggestions.length > 0) {
        suggestedUsers = searchSuggestions;
        // suggestedUsers.push({
        //     _id: 'view_all',
        //     text: 'View All',
        // });
      } else {
        // suggestedUsers = [];
        suggestedUsers.push({
          _id: 'no_result',
          foodName: 'No ingridient found',
        });
      }
      this.setState({
        searchIsLoading: false,
        showSearchLoader: false,
        searchSuggestions: suggestedUsers,
      });
    }
  }

  componentWillUnmount() {
    const { searchSuggestions, dispatch } = this.props;
    if (searchSuggestions && searchSuggestions.length > 0) {
      var resetSearchUserState = {
        loading: false,
        // ingridients: [],
        error: [],
      };
      // dispatch(resetUserSearch(resetSearchUserState));
    }
  }
}

NutritionMealAddForm = reduxForm({
  form: 'nutrition_meal_add_form',
})(NutritionMealAddForm);

const selector = formValueSelector('nutrition_meal_add_form');

const mapStateToProps = state => {
  const {
    userNutritionPreferences,
    healthLabels,
    dietLabels,
    nutritions,
    userNutritions,
    new_nutrition,
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

    searchSuggestions: new_nutrition.get('ingridients'),
    searchValue: new_nutrition.get('searchValue'),
    searchLoading: new_nutrition.get('loading'),

    recent_ingredient: new_nutrition.get('recent_ingredient'),
    loading_recent: new_nutrition.get('loading_recent'),
    error_recent: new_nutrition.get('error_recent'),
  };
};

export default connect(mapStateToProps)(NutritionMealAddForm);

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
