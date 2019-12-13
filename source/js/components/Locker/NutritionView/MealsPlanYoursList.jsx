import React, { Component } from "react";
import { connect } from "react-redux";
import NutritionPlanList from "./NutritionPlanList";
import { getUserNutritionProgramRequest } from "../../../actions/userNutritionPrograms";
import {
  PROGRAM_PRIVATE,
  PROGRAM_PUBLIC,
  PROGRAM_PRIVATE_STR
} from "../../../constants/consts";

class MealsPlanYoursList extends Component {
  componentDidMount() {
    const { dispatch, loggedUserData } = this.props;
    let requestData = {
      condition: {
        userId: loggedUserData ? loggedUserData.authId : ""
      },
      start: 0,
      limit: 10
    };
    dispatch(getUserNutritionProgramRequest(requestData));
  }
  render() {
    const { loading, nutritionPrograms, loggedUserData } = this.props;
    return (
      <React.Fragment>
        <NutritionPlanList
          loading={loading}
          nutritionPrograms={nutritionPrograms}
          userId={loggedUserData ? loggedUserData.authId : ""}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { userNutritionPrograms, user } = state;
  return {
    loading: userNutritionPrograms.get("loading"),
    nutritionPrograms: userNutritionPrograms.get("nutritionPrograms"),
    error: userNutritionPrograms.get("error"),
    loggedUserData: user.get("loggedUserData")
  };
};

export default connect(mapStateToProps)(MealsPlanYoursList);
