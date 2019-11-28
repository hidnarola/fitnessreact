import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, DropdownButton, MenuItem } from "react-bootstrap";
import RatingStarsDisplay from "../../Common/RatingStarsDisplay";
import {
  SECONDARY_GOALS,
  PROGRAM_DIFFICULTY_LEVEL_OBJ,
  PROGRAM_PRIVATE,
  PROGRAM_PRIVATE_STR,
  PROGRAM_PUBLIC,
  PROGRAM_PUBLIC_STR
} from "../../../constants/consts";
import { routeCodes } from "../../../constants/routes";
import { withRouter, Link } from "react-router-dom";

class WorkoutPlanList extends Component {
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
    const { program, history, isDisplayRating = true } = this.props;
    console.log("===========programs===========");
    console.log("programs", program);
    console.log("==========================");
    const { accessLavelList } = this.state;
    let frequencyLabel = 0;
    if (program.minWorkoutsCount === 0 && program.maxWorkoutsCount === 0) {
      frequencyLabel = 0;
    } else {
      frequencyLabel = `${program.minWorkoutsCount} - ${
        program.maxWorkoutsCount
      }`;
    }
    let selectedGoalOption = _.find(SECONDARY_GOALS, ["value", program.goal]);
    let selectedLevelOption = _.find(PROGRAM_DIFFICULTY_LEVEL_OBJ, [
      "value",
      program.level
    ]);
    let privacyStatus = _.find(accessLavelList, ["value", program.privacy]);
    return (
      <React.Fragment>
        <li>
          <div className="exercise-box-header">
            <div className="exercise-title cursor-pointer">
              <Link
                to={
                  privacyStatus.value === 1
                    ? `${routeCodes.PROGRAM_MASTER_SAVE}/${program._id}`
                    : `${routeCodes.PROGRAM_VIEW}/${program._id}`
                }
              >
                {program.name}
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
                    {program.description
                      ? program.description
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
                      {/* <span className="ml-auto">
                      <FontAwesomeIcon
                        icon="star"
                        className="star-orange active"
                      />
                      <FontAwesomeIcon icon="star" className="star-orange" />
                      <FontAwesomeIcon icon="star" className="star-orange" />
                      <FontAwesomeIcon icon="star" className="star-orange" />
                      <FontAwesomeIcon icon="star" className="star-orange" />
                    </span> */}
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
                  <span>Frequency</span>
                  <span className="ml-auto">{frequencyLabel}</span>
                </li>
                <li>
                  <span>Workouts</span>
                  <span className="ml-auto">{program.totalWorkouts}</span>
                </li>
                <li>
                  <span>Type</span>
                  <span className="ml-auto">{selectedGoalOption.label}</span>
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

export default withRouter(WorkoutPlanList);
