import React, { Component } from "react";
import AddMetaDescription from "../../global/AddMetaDescription";
import { routeCodes } from "../../../constants/routes";
import FitnessHeader from "../../global/FitnessHeader";
import FitnessNav from "../../global/FitnessNav";
import NutritionMealBodyContent from "./NutritionMealBodyContent";
import { connect } from "react-redux";
import { showPageLoader, hidePageLoader } from "../../../actions/pageLoader";
import NutritionMealCreateSidebar from "./Header/NutritionMealCreateSidebar";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { mealAddRequest } from "../../../actions/meal";
import { userMealAddRequest } from "../../../actions/user_meal";
import moment from "moment";
import { Redirect, withRouter } from "react-router-dom";

class NutritionMealCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickTab: "#favrioutmeals",
      mealVisibility: "private",
      mealTitle: "",
      mealType: "breakfast",
      instructions: [],
      notes: [],
      logDate: new Date()
    };
  }
  render() {
    const { quickTab, mealVisibility, instructions, mealTitle } = this.state;
    const { recentMeals, location } = this.props;
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Meal | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            text="day"
            routes={routeCodes.CALENDAR_OVERVIEW}
            enableBackLink={true}
          />
          <FitnessNav />
          <div className="body-wrap nutrition-todays-meal-section">
            <div className="body-head d-flex justify-content-start front-white-header custome_header">
              <div className="body-head-l" style={{ padding: "15px" }}>
                <div className="display-date">
                  <span className="date-text">Create a Meal</span>
                  <div className="ml-auto" />
                </div>
              </div>
            </div>
            <div className="tab-content">
              <div className="content active">
                <div className="body-content workouts-bg mt-5">
                  <div className="row justify-content-start no-gutters">
                    <div className="col-xs-12 col-md-9 d-flex">
                      <NutritionMealBodyContent
                        quickTab={quickTab}
                        recentMeals={recentMeals}
                        addTodayMeals={this.addTodayMeals}
                        handleChangeQuickTab={this.handleChangeQuickTab}
                        onSubmit={this.handleSubmit}
                        handleChangeNotes={this.handleChangeNotes}
                        handleChangeInstructions={this.handleChangeInstructions}
                        instructions={instructions}
                        handleChangeNotes={this.handleChangeNotes}
                        mealTitle={mealTitle}
                        handleChangeMealTitle={this.handleChangeMealTitle}
                        mealVisibility={mealVisibility}
                      />
                    </div>
                    <div className="col-xs-12 col-md-3 d-flex">
                      <NutritionMealCreateSidebar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  addTodayMeals = () => {};
  handleChangeMealTitle = e => {
    this.setState({ mealTitle: e.target.value });
  };
  handleChangeQuickTab = action => {
    this.setState({ quickTab: action });
  };
  handleChangeMealVisibility = action => {
    this.setState({ mealVisibility: action });
  };
  componentDidMount() {
    let newDate;
    if (this.props.location.search) {
      let search = new URLSearchParams(this.props.location.search);
      let date = search.get("date");
      let type = search.get("type");
      newDate = new Date(date);
      console.log("date && Type", date, type);
      this.setState({ logDate: newDate, mealType: type });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, recentMealsLoading, recentMeals } = this.props;
    if (recentMealsLoading) {
      dispatch(showPageLoader());
    }
    if (!recentMealsLoading && prevProps.recentMeals !== recentMeals) {
      dispatch(hidePageLoader());
    }
  }
  handleChangeInstructions = action => {
    let data = action.map(item =>
      draftToHtml(convertToRaw(item.instruction.getCurrentContent()))
    );
    this.setState({ instructions: data });
  };
  handleChangeNotes = action => {
    let data = action.map(item =>
      draftToHtml(convertToRaw(item.note.getCurrentContent()))
    );
    this.setState({ notes: data });
  };
  handleSubmit = async data => {
    const {
      mealVisibility,
      mealTitle,
      mealType,
      notes,
      instructions,
      logDate
    } = this.state;
    const { dispatch } = this.props;
    const categories = {
      vegetarian: data.vegetarian,
      kosher: data.kosher,
      vegan: data.vegan,
      coelaic: data.coelaic,
      paleo: data.paleo,
      keto: data.keto
    };
    const cookingTime = {
      prep_time: data.prepTime,
      prep_time_unit: data.preptime_unit,
      cook_time: data.cookTime,
      cook_time_unit: data.cooktime_unit
    };
    var formData = new FormData();
    if (mealTitle) {
      formData.append("title", mealTitle);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (mealVisibility) {
      formData.append("meals_visibility", mealVisibility);
    }
    if (mealType) {
      formData.append("meals_type", mealType);
    }
    if (data.proximates && data.proximates.length > 0) {
      formData.append("ingredientsIncluded", JSON.stringify(data.proximates));
    }
    if (notes) {
      formData.append("notes", notes);
    }
    if (instructions) {
      formData.append("instructions", instructions);
    }
    if (data.serving_difficulty) {
      formData.append("serving_difficulty", data.serving_difficulty);
    }
    if (data.serves) {
      formData.append("serves", data.serves);
    }
    if (data.images) {
      formData.append("meal_img", data.images[0]);
    }
    if (categories) {
      formData.append("categories", JSON.stringify(categories));
    }
    if (cookingTime) {
      formData.append("cooking_time", JSON.stringify(cookingTime));
    }

    if (mealVisibility && mealVisibility === "private") {
      //   te('Instruction required for public meals');
      // } else {
      // console.log(new Date(logDate).toISOString());

      await dispatch(showPageLoader());
      await dispatch(
        mealAddRequest(formData, res => {
          if (res.meal._id) {
            const data = {
              meals: [{ meal_id: res.meal._id }],
              date: logDate
            };
            dispatch(
              userMealAddRequest(data, res => {
                dispatch(hidePageLoader());
                this.props.history.push(routeCodes.CALENDAR_OVERVIEW);
              })
            );
          }
        })
      );
    }
  };
}

const mapStateToProps = state => {
  const { meal } = state;
  return {
    recentMealsLoading: meal.get("recentMealsLoading"),
    recentMeals: meal.get("recentMeals"),
    recentMealsError: meal.get("recentMealsError")
  };
};

export default connect(mapStateToProps)(NutritionMealCreate);
