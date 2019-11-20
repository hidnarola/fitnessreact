import React, { Component } from "react";
import WidgetMuscleCardNew from "../../Common/WidgetMuscleCardNew";

class FithubExercise extends Component {
  render() {
    const exerciseData = {
      current: "25.00",
      difference: "-31.00",
      error: [],
      graphData: [
        { date: "05/08/2019", count: 56 },
        { date: "08/08/2019", count: 25 },
        { date: "11/08/2019", count: 25 },
        { date: "16/08/2019", count: 25 },
        { date: "22/08/2019", count: 25 },
        { date: "25/08/2019", count: 25 },
        { date: "28/08/2019", count: 25 },
        { date: "29/08/2019", count: 55 },
        { date: "20/09/2019", count: 25 },
        { date: "24/10/2019", count: 25 }
      ],
      loading: false,
      percentageChange: "-55.36",
      start: "56.00",
      unit: "cm"
    };
    return (
      <React.Fragment>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <WidgetMuscleCardNew
            graphData={exerciseData}
            title={"Bench Press"}
            cardKey={`exercise-1`}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FithubExercise;
