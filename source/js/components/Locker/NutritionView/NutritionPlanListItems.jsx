import React, { Component } from "react";
import { routeCodes } from "../../../constants/routes";
import RatingStarsDisplay from "../../Common/RatingStarsDisplay";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import {
  PROGRAM_PRIVATE,
  PROGRAM_PRIVATE_STR,
  PROGRAM_PUBLIC,
  PROGRAM_PUBLIC_STR,
  NUTRITION_CAT_LIST,
  PROGRAM_DIFFICULTY_LEVEL_OBJ
} from "../../../constants/consts";
import { withRouter, Link } from "react-router-dom";

class NutritionPlanListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLavelList: [
        {
          value: PROGRAM_PRIVATE,
          label: PROGRAM_PRIVATE_STR,
          icon: "fa fa-user-shield mr-2"
        },
        {
          value: PROGRAM_PUBLIC,
          label: PROGRAM_PUBLIC_STR,
          icon: "fa fa-globe-europe mr-2"
        }
      ]
    };
  }
  render() {
    const { isDisplayRating = true, nutritionPlan, userId } = this.props;
    const { accessLavelList } = this.state;
    let privacyStatus = _.find(accessLavelList, [
      "value",
      nutritionPlan.privacy
    ]);
    let selectedLevelOption = _.find(PROGRAM_DIFFICULTY_LEVEL_OBJ, [
      "value",
      nutritionPlan.level
    ]);
    let minDay = nutritionPlan.min_day ? nutritionPlan.min_day : 0;
    let maxDay = nutritionPlan.max_day ? nutritionPlan.max_day : 0;

    let program = {
      description: "",
      rating: 3.5,
      _id: "5sadsa5dsad4dsa5",
      programsRatingCount: 4,
      totalWorkouts: 3
    };

    console.log("===========Nutriion Plan Details===========");
    console.log("Nutriion Plan Details", this.props.nutritionPlan);
    console.log("==========================");
    return (
      <React.Fragment>
        <li>
          <div className="exercise-box-header">
            <div className="exercise-title cursor-pointer">
              <Link
                to={
                  userId === nutritionPlan.userId
                    ? `${routeCodes.LOCKER_NUTRITION_PROGRAM_MASTER_SAVE}/${
                        nutritionPlan._id
                      }`
                    : `${routeCodes.LOCKER_NUTRITION_PROGRAM_VIEW}/${
                        nutritionPlan._id
                      }`
                }
              >
                {nutritionPlan.name}
              </Link>
            </div>
            <ButtonToolbar className="progress-toolbar ml-auto">
              <DropdownButton
                className="progress-btn d-flex align-items-center"
                title={<i className={privacyStatus.icon} />}
                id="dropdown-size-medium"
                pullRight
              >
                {accessLavelList.map((item, i) => (
                  <MenuItem eventKey={i + 1} key={i}>
                    <i className={item.icon} />
                    {item.label}
                  </MenuItem>
                ))}
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div className="exercise-box-body">
            <div className="exercise-content">
              <div className="row no-gutters width-100-per">
                <div className={isDisplayRating ? "col-md-8" : "col-md-12"}>
                  <p className="description">
                    {nutritionPlan.description
                      ? nutritionPlan.description
                      : "No description Added"}
                  </p>
                </div>
                {isDisplayRating && (
                  <div className="col-md-4">
                    <div className="d-flex width-100-per justify-content-end">
                      <RatingStarsDisplay
                        className="ml-auto"
                        rating={program.rating}
                        name={program._id}
                        ratedColor={"#FE676D"}
                        emptyColor={"#8298CA"}
                      />
                    </div>
                    <div className="d-flex width-100-per">
                      <span className="ml-auto">
                        {program.programsRatingCount} Reviews
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="summary-list width-100-per">
              <ul>
                <li>
                  <span>Total meals</span>
                  <span className="ml-auto">{nutritionPlan.total_meals}</span>
                </li>
                <li>
                  <span>Days</span>
                  <span className="ml-auto">{`${minDay} - ${maxDay}`}</span>
                </li>
                <li>
                  <span>Type</span>
                  <span className="ml-auto">
                    {nutritionPlan.categories.map((item, i) => {
                      return i === nutritionPlan.categories.length - 1 ? (
                        <span
                          className="text-capitalize"
                          key={i}
                        >{`${item}`}</span>
                      ) : (
                        <span
                          className="text-capitalize"
                          key={i}
                        >{`${item}, `}</span>
                      );
                    })}
                  </span>
                </li>
                <li>
                  <span>Difficulty</span>
                  <span className="ml-auto">{selectedLevelOption.label}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default NutritionPlanListItems;
