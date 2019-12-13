import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FitnessCardioList from "./FitnessCardioList";
import {
  FITNESS_TEST_CAT_STRENGTH,
  FITNESS_TEST_CAT_CARDIO,
  FITNESS_TEST_CAT_FLEXIBILITY,
  FITNESS_TEST_CAT_POSTURE
} from "../../../constants/consts";
import FitnessStrengthList from "./FitnessStrengthList";
import FitnessFlexibilityList from "./FitnessFlexibilityList";
import FitnessPostureList from "./FitnessPostureList";
import { connect } from "react-redux";
import { userFitnessTestsMaxRep } from "../../../actions/userFitnessTests";

class CalendarDayFitnessItemsList extends Component {
  render() {
    const { fitnessTest } = this.props;
    console.log("===========fitnessTest===========");
    console.log("fitnessTest", fitnessTest);
    console.log("==========================");
    return (
      <React.Fragment>
        {fitnessTest.category === FITNESS_TEST_CAT_CARDIO && (
          <FitnessCardioList
            test={fitnessTest}
            syncedUserFitnessTests={this.props.syncedUserFitnessTests}
          />
        )}
        {fitnessTest.category === FITNESS_TEST_CAT_STRENGTH && (
          <FitnessStrengthList
            test={fitnessTest}
            syncedUserFitnessTests={this.props.syncedUserFitnessTests}
            handleMaxRepChange={this.handleMaxRepChange}
          />
        )}
        {fitnessTest.category === FITNESS_TEST_CAT_FLEXIBILITY && (
          <FitnessFlexibilityList
            test={fitnessTest}
            syncedUserFitnessTests={this.props.syncedUserFitnessTests}
          />
        )}
        {fitnessTest.category === FITNESS_TEST_CAT_POSTURE && (
          <FitnessPostureList
            test={fitnessTest}
            syncedUserFitnessTests={this.props.syncedUserFitnessTests}
          />
        )}
      </React.Fragment>
    );
  }
  handleMaxRepChange = (_id, value, rep) => {
    const { dispatch } = this.props;
    var val = value;
    if (val > 9999) {
      val = 9999;
    }
    dispatch(userFitnessTestsMaxRep(_id, val, rep));
  };
}

export default connect()(CalendarDayFitnessItemsList);
