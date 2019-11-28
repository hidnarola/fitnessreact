import React, { Component } from "react";
import AddMetaDescription from "../components/global/AddMetaDescription";
import FitnessHeader from "../components/global/FitnessHeader";
import FitnessNav from "../components/global/FitnessNav";
import { routeCodes } from "../constants/routes";
import { NavLink, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import LockerExerciseView from "../components/Locker/LockerExerciseView";
import LockerNutritionView from "../components/Locker/LockerNutritionView";
import WorkoutsCreate from "../components/Locker/ExerciseView/WorkoutsCreate";

class Locker extends Component {
  componentDidMount() {
    const { dispatch, match, history } = this.props;
    if (match.isExact) {
      history.push(routeCodes.LOCKER_EXERCISE);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Locker | Fitly</title>
          </AddMetaDescription>
          <FitnessHeader />
          <FitnessNav />

          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className={"tab-content"}>
              <div className="content active">
                <Switch>
                  <Route
                    exact
                    path={routeCodes.LOCKER_EXERCISE}
                    component={LockerExerciseView}
                  />
                  <Route
                    exact
                    path={routeCodes.LOCKER_NUTRITION}
                    component={LockerNutritionView}
                  />
                </Switch>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Locker);
