import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../formValidation/validationRules';
import Autosuggest from 'react-autosuggest';
import FaSearch from 'react-icons/lib/fa/search';
import FaSpinner from 'react-icons/lib/fa/spinner';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import _ from 'lodash';
import cns from 'classnames';
import { mealSearchRequest, handleChnageSearchMeal } from '../../actions/meal';

const languages = [
  {
    name: 'C',
    year: 1972,
  },
  {
    name: 'Ca',
    year: 1972,
  },
  {
    name: 'Caa',
    year: 1972,
  },
  {
    name: 'Elm',
    year: 2012,
  },
];

class NutritionMealAddSearchForm extends Component {
  constructor(props) {
    super(props);
    this.searchDebounce = _.debounce(this.searchMeals, 1000);
    this.state = {
      searchValue: '',
      searchSuggestions: [],
      showSearchLoader: false,
      searchIsLoading: false,
      isSearch: false,
    };
  }

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
      dispatch(handleChnageSearchMeal(newValue));
    }
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.searchDebounce.cancel;
    if (value && value.trim() && value.trim() !== '') {
      this.searchDebounce(value.trim());
    }
  };

  searchMeals = value => {
    const { dispatch } = this.props;
    var requestData = {
      name: value,
      start: 0,
      offset: 50,
    };
    this.setState({ searchIsLoading: true });
    // dispatch(getUserNutritionPreferencesRequest(requestData));
    dispatch(mealSearchRequest(requestData));
  };

  handleSuggestionsClearRequested = () => {};

  getSuggestionValue = ({ suggestion }) => {
    const { dispatch, addTodayMeals } = this.props;
    console.log('getSuggestionValue => ', suggestion);
    addTodayMeals(suggestion);

    dispatch(handleChnageSearchMeal(suggestion.title));
    // let suggestion = suggestionn.suggestion;
    // const { searchMealValue } = this.props;
    // const { meal_suggestions } = this.state;

    // if (!(meal_suggestions.filter(e => e._id === suggestion._id).length > 0)) {
    //   // suggestion.serving_size = 0;
    //   // suggestion.unit = "";
    //   // suggestion.count = 0;
    //   // suggestion.gram_total = 0;

    //   // suggestion.totalKcl = 0;
    //   // suggestion.totalfat = 0;
    //   // suggestion.totalProtein = 0;
    //   // suggestion.totalCarbs = 0;
    //   // suggestion.totalSugar = 0;
    //   // suggestion.totalWater = 0;
    //   // suggestion.totalStarch = 0;
    //   // suggestion.totalCholesterol = 0;

    //   meal_ingredient.push(suggestion);
    //   this.setState({ meal_suggestions: meal_suggestions });
    // }
  };

  renderSuggestion = (suggestion, { query }) => {
    console.log('renderSuggestion', suggestion);
    var fullName = suggestion.title;
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
          {fullName !== 'No meals found' && (
            <span className="click-to-add-btn">Click to add</span>
          )}
        </div>
      </a>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchSuggestions, searchLoading } = this.props;
    const { searchIsLoading, showSearchLoader } = this.state;
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.log('searchSuggestions', searchSuggestions);
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
          title: 'No meals found',
        });
      }
      this.setState({
        searchIsLoading: false,
        showSearchLoader: false,
        searchSuggestions: suggestedUsers,
      });
    }
  }

  render() {
    const { handleSubmit, searchMealValue } = this.props;
    const { searchSuggestions, showSearchLoader, isSearch } = this.state;
    return (
      <div id="search-header" className="search meal-search">
        <div
          className={
            isSearch
              ? 'search-form header-search-form open'
              : 'search-form header-search-form'
          }
        >
          <span
            className="search-icon"
            onClick={() => {
              this.setState({ isSearch: !this.state.isSearch });
            }}
          >
            <FaSearch size={22} />
          </span>

          <Autosuggest
            suggestions={searchSuggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            getSuggestionValue={value => console.log(value)}
            onSuggestionSelected={(e, value) => this.getSuggestionValue(value)}
            renderSuggestion={this.renderSuggestion}
            inputProps={{
              id: 'header_search_users',
              name: 'header_search_users',
              value: searchMealValue,
              onChange: this.handleSearchChange,
              placeholder: 'Search Males',
            }}
          />
          {showSearchLoader && (
            <span className="loader-icon">
              <FaSpinner size={22} className="loader-spinner" />
            </span>
          )}
        </div>
      </div>
    );
  }
}

// NutritionMealAddSearchForm = reduxForm({
//   form: "nutritionMealAddSearchForm"
// })(NutritionMealAddSearchForm);

const mapStateToProps = state => {
  const { meal } = state;
  return {
    searchLoading: meal.get('searchLoading'),
    searchMealValue: meal.get('searchMealValue'),
    searchSuggestions: meal.get('searchMeals'),
  };
};

export default connect(mapStateToProps)(NutritionMealAddSearchForm);

// const InputField = props => {
//   const {
//     input,
//     meta,
//     wrapperClass,
//     className,
//     placeholder,
//     errorClass,
//     type,
//     disabled
//   } = props;
//   return (
//     <div
//       className={`${wrapperClass ? wrapperClass : ""} ${
//         meta.touched && meta.error ? "has-error" : ""
//       }`}
//     >
//       <input
//         {...input}
//         type={type ? type : "text"}
//         disabled={disabled ? disabled : false}
//         className={className}
//         placeholder={placeholder}
//         autoComplete="off"
//       />
//       {meta.touched &&
//         ((meta.error && <div className={errorClass}>{meta.error}</div>) ||
//           (meta.warning && (
//             <span className={warningClass}>{meta.warning}</span>
//           )))}
//     </div>
//   );
// };
