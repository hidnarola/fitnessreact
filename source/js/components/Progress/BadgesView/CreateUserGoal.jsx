import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/lib/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  InputField,
  SelectField_ReactSelect,
  SelectField,
  TextAreaField
} from "../../../helpers/FormControlHelper";
import {
  required,
  requiredReactSelect,
  minLength,
  maxLength,
  min,
  validNumber
} from "../../../formValidation/validationRules";
import {
  BADGES_TASKS,
  MEASUREMENT_UNITS,
  TIME_TYPE_TIME_WINDOW,
  TIME_WINDOW_TYPES,
  TIME_TYPE_STANDARD,
  STATUS_ACTIVE,
  STATUS_ACTIVE_STR,
  STATUS_INACTIVE_STR,
  STATUS_INACTIVE
} from "../../../constants/consts";
import _ from "lodash";
import { adminRouteCodes } from "../../../constants/adminRoutes";
import { capitalizeFirstLetter } from "../../../helpers/funs";
import ArrowDownImg from "../../../../assets/img/caret-down.svg";

const TimeList = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" }
];

const min1 = min(1);
const minLength0 = minLength(1);

class CreateUserGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeType: "",
      selectOneActionInit: false
    };
    this.taskUnits = [];
  }
  componentWillReceiveProps(nextProps) {
    console.log("===========this.props.selectedTask===========");
    console.log(this.props);
    console.log("==========================");
    if (nextProps.selectedTask) {
      if (
        !this.props.selectedTask ||
        (this.props.selectedTask &&
          nextProps.selectedTask &&
          this.props.selectedTask.value !== nextProps.selectedTask.value)
      ) {
        var units = _.find(MEASUREMENT_UNITS, [
          "key",
          nextProps.selectedTask.unitKey
        ]);
        if (units) {
          this.taskUnits = units.value;
        } else {
          this.taskUnits = [];
        }
        if (
          typeof nextProps.match.params.id !== "undefined" &&
          this.props.initialized
        ) {
          this.props.change("unit", null);
        } else if (
          typeof nextProps.match.params.id === "undefined" &&
          !this.props.initialized
        ) {
          this.props.change("unit", null);
        }
      }
    }
    console.log("===========this.taskUnits===========");
    console.log(this.taskUnits);
    console.log("==========================");
  }

  render() {
    const {
      handleCloseAddGoalAlert,
      handleSubmit,
      submitting,
      valid
    } = this.props;
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="create-user-goal-dialog">
            <div className="dialog-title">
              <h2>Add a goal</h2>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={() => handleCloseAddGoalAlert()}
              >
                cancel
              </button>
            </div>
            <div className="dialog-content">
              <div className="goalbox-panel">
                <div className="row no-gutters border-bottom">
                  <div className="col-md-12">
                    <div className="goalbox-title">Title</div>
                  </div>
                  <div className="col-md-12">
                    <div className="goalbox-body">
                      <Field
                        component={InputField}
                        type="text"
                        name="title"
                        className="form-control"
                        errorClass="help-block"
                        validate={[required]}
                        placeholder="Title"
                      />
                    </div>
                  </div>
                </div>
                <div className="row no-gutters border-bottom">
                  <div className="col-md-4 border-right">
                    <div className="goalbox-title bg-white">Objective</div>
                  </div>
                  <div className="col-md-8">
                    <div className="goalbox-body">
                      <div className="serving-select width-100-per">
                        <Field
                          name="task"
                          className="form-control p-0"
                          placeholder="Objective"
                          component={SelectField_ReactSelect}
                          options={BADGES_TASKS}
                          errorClass="help-block"
                          validate={[requiredReactSelect]}
                          requiredAstrisk={true}
                          clearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters border-bottom">
                  <div className="col-md-4 border-right">
                    <div className="goalbox-title bg-white">Target</div>
                  </div>
                  <div className="col-md-8 ">
                    <div className="row no-gutters">
                      <div className="col-md-6 border-right">
                        <div className="goalbox-body h-100">
                          <div className="serving-boxs width-100-per m-0">
                            <button
                              className="btn btn-minus"
                              type="button"
                              onClick={() => this.handleChangeTarget("sub")}
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <Field
                              component={InputField}
                              type="number"
                              wrapperClass="h-100"
                              name="target"
                              className="form-control h-100"
                              errorClass="help-block"
                              validate={[required, validNumber]}
                            />
                            <button
                              className="btn btn-plus"
                              type="button"
                              onClick={() => this.handleChangeTarget("add")}
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="goalbox-body">
                          <div className="serving-select width-100-per">
                            <Field
                              name="unit"
                              className="form-control p-0"
                              placeholder="Unit"
                              component={SelectField_ReactSelect}
                              options={this.taskUnits}
                              errorClass="help-block"
                              validate={[requiredReactSelect]}
                              requiredAstrisk={true}
                              clearable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters border-bottom">
                  <div className="col-md-4 border-right">
                    <div className="goalbox-title bg-white">Timescale</div>
                  </div>
                  <div className="col-md-8 ">
                    <div className="row no-gutters">
                      <div className="col-md-6 border-right">
                        <div className="goalbox-body h-100">
                          <div className="serving-boxs width-100-per m-0">
                            <button
                              className="btn btn-minus"
                              type="button"
                              onClick={() => this.handleChangeTimeScale("sub")}
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>
                            <Field
                              component={InputField}
                              wrapperClass="h-100"
                              type="number"
                              name="timeScale"
                              className="form-control h-100"
                              errorClass="help-block"
                              validate={[required, validNumber]}
                            />
                            <button
                              className="btn btn-plus"
                              type="button"
                              onClick={() => this.handleChangeTimeScale("add")}
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="goalbox-body">
                          <div className="serving-select width-100-per">
                            <Field
                              name="timeUnit"
                              className="form-control p-0"
                              placeholder="Duration"
                              component={SelectField_ReactSelect}
                              options={TimeList}
                              errorClass="help-block"
                              validate={[requiredReactSelect]}
                              requiredAstrisk={true}
                              clearable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters">
                  <div className="col-md-12">
                    <div className="goalbox-title">Motivation</div>
                  </div>
                  <div className="col-md-12">
                    <div className="goalbox-body">
                      {/* <textarea className="form-control" rows="4" /> */}
                      <Field
                        component={TextAreaField}
                        rows="4"
                        type="textarea"
                        name="motivation"
                        className="form-control"
                        errorClass="help-block"
                        placeholder="motivation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <Button
                type="submit"
                bsStyle="success"
                bsSize="large"
                block
                disabled={!valid ? true : false}
              >
                Save goal
              </Button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
  handleChangeTarget = action => {
    const { target } = this.props;
    action === "add" && this.props.change("target", parseInt(target) + 1);
    action === "sub" &&
      target > 0 &&
      this.props.change("target", parseInt(target) - 1);
  };
  handleChangeTimeScale = action => {
    const { timeScale } = this.props;
    action === "add" && this.props.change("timeScale", parseInt(timeScale) + 1);
    action === "sub" &&
      timeScale > 0 &&
      this.props.change("timeScale", parseInt(timeScale) - 1);
  };
}

const badgeSaveFormSelector = formValueSelector("Add_user_goal_form");

CreateUserGoal = withRouter(CreateUserGoal);

CreateUserGoal = reduxForm({
  form: "Add_user_goal_form",
  initialValues: {
    target: 1,
    timeScale: 1,
    motivation: "",
    timeUnit: "",
    unit: "",
    title: "",
    task: ""
  }
})(CreateUserGoal);

const mapStateToProps = state => {
  const target = badgeSaveFormSelector(state, "target");
  const timeScale = badgeSaveFormSelector(state, "timeScale");
  return {
    selectedTask: badgeSaveFormSelector(state, "task"),
    target: target,
    timeScale: timeScale
  };
};

export default connect(mapStateToProps)(CreateUserGoal);
