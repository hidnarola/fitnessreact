import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarDayWorkoutView from "../Workouts/CalendarDayWorkoutView";
import CalendarDayFitnessItemsList from "./CalendarDayFitnessItemsList";
import { Scrollbars } from "react-custom-scrollbars";

class CalendarDayFitnessTestList extends Component {
  render() {
    const { fitnessTestList } = this.props;
    return (
      <React.Fragment>
        <div className="fitnessTest-list" style={{ height: "73vh" }}>
          <Scrollbars autoHide>
            {fitnessTestList &&
              fitnessTestList.length > 0 &&
              fitnessTestList.map((item, k) => (
                <CalendarDayFitnessItemsList
                  fitnessTest={item}
                  key={k}
                  syncedUserFitnessTests={this.props.syncedUserFitnessTests}
                />
              ))}
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default CalendarDayFitnessTestList;
