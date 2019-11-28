import React, { Component } from "react";
import Panel from "react-bootstrap/lib/Panel";
import cns from "classnames";
import { connect } from "react-redux";
import {
  MUSCLE_LIST,
  TRACKING_TIME_LIST,
  TRACKING_PHOTO_TYPE_LIST,
  EXE_SCATS
} from "../../../constants/consts";
import { reduxForm, Field } from "redux-form";
import {
  prepareExerciseOptions,
  getExeMeasurementValidationRules,
  getExercises
} from "../../../helpers/funs";
import { SelectField_ReactSelect } from "../../../helpers/FormControlHelper";

class AddTrackingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingTab: "body"
    };
  }
  render() {
    const {
      handleCloseAlert,
      goalsList = [],
      exerciseMeasurements
    } = this.props;
    const { trackingTab } = this.state;

    console.log("===========goalsList===========");
    console.log("goalsList", goalsList);
    console.log("==========================");
    const newExerciseList = getExercises();

    return (
      <React.Fragment>
        <div className="tracking-header">
          <h2>Add Tracking Item</h2>
          <button
            className="btn btn-cancel ml-auto"
            onClick={() => handleCloseAlert()}
          >
            Cancel
          </button>
        </div>
        <div className="exercise-navbar">
          <div className="tabs sub-tab">
            <div
              className={cns("tab", { active: trackingTab === "body" })}
              onClick={() => this.setState({ trackingTab: "body" })}
            >
              <a href="#">Body</a>
            </div>
            <div
              className={cns("tab", { active: trackingTab === "photos" })}
              onClick={() => this.setState({ trackingTab: "photos" })}
            >
              <a href="#">Photos</a>
            </div>
            <div
              className={cns("tab", { active: trackingTab === "exercise" })}
              onClick={() => this.setState({ trackingTab: "exercise" })}
            >
              <a href="#">Exercise</a>
            </div>
            <div
              className={cns("tab", { active: trackingTab === "goals" })}
              onClick={() => this.setState({ trackingTab: "goals" })}
            >
              <a href="#">Goals</a>
            </div>
          </div>
        </div>
        <div className="tracking-body-content">
          {trackingTab === "body" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Measurement</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        {/* <select className="form-control">
                          {MUSCLE_LIST.map((item, i) => (
                            <option value={item.value} key={i}>
                              {item.label}
                            </option>
                          ))}
                        </select> */}
                        <Field
                          name="muscle"
                          wrapperClass="tracking-fithub"
                          className="form-control p-0"
                          placeholder="Measurement"
                          component={SelectField_ReactSelect}
                          options={MUSCLE_LIST}
                          errorClass="help-block"
                          validate={[]}
                          requiredAstrisk={false}
                          clearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Time Period</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        {/* <select className="form-control">
                          <option>This month</option>
                          <option>Last month</option>
                          <option>Last 3 months</option>
                          <option>Last 6 months</option>
                          <option>Last year</option>
                        </select> */}
                        <Field
                          name="bodyTimePeriod"
                          wrapperClass="tracking-fithub"
                          className="form-control p-0"
                          placeholder="Time Period"
                          component={SelectField_ReactSelect}
                          options={TRACKING_TIME_LIST}
                          errorClass="help-block"
                          validate={[]}
                          requiredAstrisk={false}
                          clearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
          )}
          {trackingTab === "photos" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Photo Type</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        {/* <select className="form-control">
                          <option value="progress">Progress</option>
                          <option value="lifestyle">Life Style</option>
                        </select> */}
                        <Field
                          name="photoType"
                          wrapperClass="tracking-fithub"
                          className="form-control p-0"
                          placeholder="Photo Type"
                          component={SelectField_ReactSelect}
                          options={TRACKING_PHOTO_TYPE_LIST}
                          errorClass="help-block"
                          validate={[]}
                          requiredAstrisk={false}
                          clearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Filter By</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-6 border-right">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option value="progress">Muscle</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option value="progress">Bicep</option>
                          <option value="lifestyle">Hips</option>
                          <option value="lifestyle">Height</option>
                          <option value="lifestyle">Weight</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Time Period</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        {/* <select className="form-control">
                          <option>This month</option>
                          <option>Last month</option>
                          <option>Last 3 months</option>
                          <option>Last 6 months</option>
                          <option>Last year</option>
                        </select> */}
                        <Field
                          name="photoTimePeriod"
                          wrapperClass="tracking-fithub"
                          className="form-control p-0"
                          placeholder="Time Period"
                          component={SelectField_ReactSelect}
                          options={TRACKING_TIME_LIST}
                          errorClass="help-block"
                          validate={[]}
                          requiredAstrisk={false}
                          clearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
          )}
          {trackingTab === "exercise" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Exercise</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        {/* <select className="form-control">
                          <option value="all">All</option>
                          <option value="benchpress">BenchPress</option>
                        </select> */}
                        <Field
                          name="exerciseCategory"
                          wrapperClass="tracking-fithub"
                          className="form-control p-0"
                          placeholder="Exercise"
                          component={SelectField_ReactSelect}
                          options={newExerciseList}
                          errorClass="help-block"
                          validate={[]}
                          requiredAstrisk={false}
                          clearable={false}
                          onChange={value => this.getStatisticValue(value)}
                        />
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Statistic</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option value="distance">weight</option>
                          <option value="distance">time</option>
                          <option value="distance">speed</option>
                          <option value="distance">sets</option>
                          <option value="distance">setTime</option>
                          <option value="distance">restTime</option>
                          <option value="distance">reps</option>
                          <option value="distance">repTime</option>
                          <option value="distance">effort</option>
                          <option value="distance">distance</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Heading>Time Period</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option>This month</option>
                          <option>Last month</option>
                          <option>Last 3 months</option>
                          <option>Last 6 months</option>
                          <option>Last year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
          )}
          {trackingTab === "goals" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Goals</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option disabled selected>
                            Select
                          </option>
                          {goalsList &&
                            goalsList.length > 0 &&
                            goalsList.map((item, index) => {
                              console.log(
                                "===========item Goal List==========="
                              );
                              console.log("item Goal List", item);
                              console.log("==========================");
                              return (
                                item.isFavourite === true && (
                                  <option value={item.badge.name} key={index}>
                                    {item.badge.name}
                                  </option>
                                )
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                </Panel.Body>
              </Panel>
            </div>
          )}
        </div>
        <button className="btn btn-block btn-save">Save and add</button>
      </React.Fragment>
    );
  }
  getStatisticValue = obj => {
    const { exerciseMeasurements } = this.props;
    let measObj = _.find(exerciseMeasurements, {
      category: obj.cat,
      subCategory: obj.value
    });
    console.log("===========get Fields Options===========");
    console.log("get Fields Options", measObj);
    console.log("==========================");
  };
}

AddTrackingForm = reduxForm({
  form: "tracking_form"
})(AddTrackingForm);

const mapStateToProps = state => {
  const { userFavouriteBadges } = state;
  return {
    goalsList: userFavouriteBadges.get("badges")
  };
};

export default connect(mapStateToProps)(AddTrackingForm);
