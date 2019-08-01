import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../formValidation/validationRules";
import Autosuggest from "react-autosuggest";
import FaSearch from "react-icons/lib/fa/search";
import FaSpinner from "react-icons/lib/fa/spinner";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import _ from "lodash";
import cns from "classnames";
import { mealSearchRequest, handleChnageSearchMeal } from "../../actions/meal";

const languages = [
  {
    name: "C",
    year: 1972
  },
  {
    name: "Ca",
    year: 1972
  },
  {
    name: "Caa",
    year: 1972
  },
  {
    name: "Elm",
    year: 2012
  }
];

class NutritionMealAddSearchForm extends Component {
  constructor(props) {
    super(props);
    this.searchDebounce = _.debounce(this.searchMeals, 1000);
    this.state = {
      searchValue: "",
      suggestions: [],
      showSearchLoader: false,
      searchIsLoading: false
    };
  }

  handleSearchChange = (event, { newValue }) => {
    this.setState({ searchValue: newValue });
    console.log("chage", newValue);
    const { dispatch } = this.props;
    dispatch(handleChnageSearchMeal(newValue));
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.searchDebounce.cancel;
    if (value && value.trim() && value.trim() !== "") {
      this.searchDebounce(value.trim());
    }
  };

  searchMeals = value => {
    const { dispatch } = this.props;
    var requestData = {
      name: value,
      start: 0,
      offset: 50
    };
    this.setState({ searchIsLoading: true });
    // dispatch(getUserNutritionPreferencesRequest(requestData));
    dispatch(mealSearchRequest(requestData));
  };

  handleSuggestionsClearRequested = () => {};

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  getSuggestionValue = suggestion => {
    console.log(suggestion);
    suggestion.name;
  };

  renderSuggestion = (suggestion, { query }) => {
    var fullName = suggestion.name;
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
                  className={cns({ "search-word-highlight": part.highlight })}
                >
                  {part.text}
                </span>
              );
            })}
          </span>
          {console.log("fullName =>", fullName)}
          {fullName !== "No ingridient found" && (
            <span className="click-to-add-btn">Click to add</span>
          )}
        </div>
      </a>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    const { suggestions, searchValue, showSearchLoader } = this.state;
    return (
      <div className="nutrition-meal-add-search-form-wrapper">
        <div className="row">
          <div id="search-header" className="search meal-search">
            <div className="search-form header-search-form">
              <span className="search-icon">
                <FaSearch size={22} />
              </span>

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={
                  this.handleSuggestionsFetchRequested
                }
                onSuggestionsClearRequested={
                  this.handleSuggestionsClearRequested
                }
                getSuggestionValue={value => this.getSuggestionValue(value)}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                  id: "header_search_users",
                  name: "header_search_users",
                  value: searchValue,
                  onChange: this.handleSearchChange,
                  placeholder: "Search Males"
                }}
              />
              {showSearchLoader && (
                <span className="loader-icon">
                  <FaSpinner size={22} className="loader-spinner" />
                </span>
              )}
            </div>
          </div>
          {/* <div className="search search_Cstm">
               <Field
                                name="search_term"
                                className="form-control"
                                placeholder="Search Meal"
                                component={InputField}
                                errorClass="help-block"
                                validate={[required]}
                            />
                            <button type="submit" className="btn btn-primary">
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="24" width="24" viewBox="0 0 40 40" style={{ "verticalAlign": "middle" }}><g><path d="m27.2 18.6q0-4.2-2.9-7.1t-7.1-2.9-7 2.9-3 7.1 2.9 7 7.1 3 7.1-3 2.9-7z m11.4 18.5q0 1.2-0.8 2.1t-2 0.8q-1.2 0-2-0.8l-7.7-7.7q-4 2.8-8.9 2.8-3.2 0-6.1-1.3t-5-3.3-3.4-5-1.2-6.1 1.2-6.1 3.4-5.1 5-3.3 6.1-1.2 6.1 1.2 5 3.3 3.4 5.1 1.2 6.1q0 4.9-2.7 8.9l7.6 7.6q0.8 0.9 0.8 2z"></path></g></svg>
                            </button>
            </div> */}
        </div>
      </div>
    );
  }
}

// NutritionMealAddSearchForm = reduxForm({
//   form: "nutritionMealAddSearchForm"
// })(NutritionMealAddSearchForm);

const mapStateToProps = state => ({});

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
