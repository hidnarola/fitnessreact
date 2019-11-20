import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routeCodes } from "../../../../constants/routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeCompleteStatusOfWorkoutRequest } from "../../../../actions/dashboard";
import { te, ts } from "../../../../helpers/funs";

class WorkoutActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false
    };
  }
  componentDidMount() {
    const { workout } = this.props;
    this.setState({ isCompleted: workout.isCompleted ? true : false });
  }

  render() {
    const { isCompleted } = this.state;
    const { workout, history } = this.props;
    console.log("===========workout Today===========");
    console.log("workout Today", workout);
    console.log("==========================");
    return (
      <React.Fragment>
        {workout && (
          <li className="workout-list-items active d-flex">
            <div className="workout-content width-100-per">
              <div
                className="d-flex flex-wrap width-100-per align-items-center p-3"
                style={{ background: "#201f60", borderRadius: "5px 5px 0 0" }}
              >
                <div
                  className="title cursor-pointer"
                  onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
                >
                  {workout.title}
                </div>
                <i className="fad fa-star ml-auto" />
              </div>
              <div className="is-complete">
                <div className="workout-switch-wrap">
                  <small>Workout complete</small>
                  <div className="material-switch ml-auto">
                    <input
                      id={"workout"}
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() =>
                        this.handleCompleteWorkout(workout._id, !isCompleted)
                      }
                    />
                    <label htmlFor={"workout"} className="label-default" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </React.Fragment>
    );
  }
  handleCompleteWorkout = (workoutId, isCompleted) => {
    const { dispatch } = this.props;
    let requestData = { workoutId, isCompleted };
    dispatch(
      changeCompleteStatusOfWorkoutRequest(requestData, res => {
        res &&
          res.workout &&
          this.setState({
            isCompleted: res.workout.isCompleted ? true : false
          });
        ts("Workout Successfully Updated");
      })
    );
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(WorkoutActivityList));
