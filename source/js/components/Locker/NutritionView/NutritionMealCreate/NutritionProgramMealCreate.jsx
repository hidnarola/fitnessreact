import React, { Component } from "react";
import { routeCodes } from "../../../../constants/routes";
import AddMetaDescription from "../../../global/AddMetaDescription";
import FitnessHeader from "../../../global/FitnessHeader";
import FitnessNav from "../../../global/FitnessNav";
import NutritionMealCreateSidebar from "../../../Nutrition/Meal/Header/NutritionMealCreateSidebar";
import NutritionMealBodyContent from "../../../Nutrition/Meal/NutritionMealBodyContent";
import { connect } from "react-redux";
import { addUserProgramsMealRequest } from "../../../../actions/userNutritionPrograms";
import { hidePageLoader, showPageLoader } from "../../../../actions/pageLoader";
import { ts, te } from "../../../../helpers/funs";
import { withRouter } from "react-router-dom";

class NutritionProgramMealCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickTab: "#favrioutmeals",
      mealVisibility: "private",
      mealTitle: "",
      mealType: "breakfast",
      instructions: [],
      notes: [],
      logDate: new Date(),
      day: null,
      programId: null
    };
  }
  render() {
    const { quickTab, mealVisibility, instructions, mealTitle } = this.state;
    const { recentMeals, match } = this.props;
    let backUrl = null;
    if (match && match.params && match.params.id) {
      backUrl = `${routeCodes.LOCKER_NUTRITION_PROGRAM_PLAN}/${
        match.params.id
      }`;
    }
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Meal | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            text="Meal Plan"
            routes={backUrl}
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
                        handleChangeMealVisibility={
                          this.handleChangeMealVisibility
                        }
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
  componentDidMount() {
    console.log("URLS PARAMS", this.props.match);
    const { match } = this.props;
    if (match && match.params) {
      let day = match.params.day ? match.params.day : null;
      let programId = match.params.id ? match.params.id : null;
      let mealType = match.params.type ? match.params.type : null;
      this.setState({ day, programId, mealType });
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
      logDate,
      day,
      programId
    } = this.state;
    const { dispatch, history } = this.props;
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
    if (day) {
      formData.append("day", day);
    }
    if (programId) {
      formData.append("programId", programId);
    }
    dispatch(showPageLoader());
    await dispatch(
      addUserProgramsMealRequest(formData, res => {
        res && res.status === 1 && dispatch(hidePageLoader());
        res && res.status === 1 && ts("Meal successfully added");
        res && res.status === 0 && te();
        history.push(
          `${routeCodes.LOCKER_NUTRITION_PROGRAM_PLAN}/${programId}`
        );
      })
    );
    console.log("REQUEST FORM DATA", data, formData);
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

export default connect(mapStateToProps)(withRouter(NutritionProgramMealCreate));
