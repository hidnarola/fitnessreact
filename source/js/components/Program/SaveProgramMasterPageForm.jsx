import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {
  SelectField_ReactSelect,
  InputField,
  TextAreaField,
  CheckboxAdvanceField
} from "../../helpers/FormControlHelper";
import {
  required,
  requiredReactSelect,
  minLength,
  maxLength,
  requiredReactSelectNumberOptions
} from "../../formValidation/validationRules";

const minLength2 = minLength(2);
const maxLength100 = maxLength(100);
const maxLength5000 = maxLength(5000);

class SaveProgramMasterPageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalOptionList: []
    };
  }
  render() {
    const { goalOptionList } = this.state;
    const {
      handleSubmit,
      privacyOptions,
      goalOptions,
      levelOptions,
      backUrl
    } = this.props;
    return (
      <div className="body-content whitebox-body flex col-md-12 h-100 mt-3 p-0">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="workout-submit-button">
            <button type="submit" className="btn btn-workouts-creation">
              Save Plan
            </button>
          </div>
          <div className="row no-gutters">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="nutrition-create">
                <div className="meal-input">
                  <Field
                    name="title"
                    labelClass="control-label display_block"
                    className="form-control"
                    wrapperClass="form-group"
                    placeholder="Name"
                    component={InputField}
                    errorClass="help-block"
                    validate={[required, minLength2, maxLength100]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="workoutplan-wrapper">
            <div className="row">
              <div className="col-md-12">
                <div className="workout-creation-box">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="box-title">Description</div>
                    </div>
                    <div className="col-md-12">
                      <div className="box-content">
                        <Field
                          id="description"
                          name="description"
                          component={TextAreaField}
                          rows={"4"}
                          labelClass="display_block"
                          className="form-control resize-vertical"
                          errorClass="help-block"
                          validate={[maxLength5000]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="row flex-column">
                  <div className="col-md-12">
                    <div className="workout-creation-box">
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <div className="box-title">Privacy</div>
                        </div>
                        <div className="col-md-6">
                          <div className="box-content">
                            <Field
                              id="privacy"
                              name="privacy"
                              labelClass="control-label display_block"
                              className=""
                              placeholder="Privacy"
                              component={SelectField_ReactSelect}
                              options={privacyOptions}
                              errorClass="help-block"
                              validate={[requiredReactSelectNumberOptions]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="workout-creation-box">
                      <div className="row no-gutters">
                        <div className="col-md-6">
                          <div className="box-title">Level</div>
                        </div>
                        <div className="col-md-6">
                          <div className="box-content">
                            <Field
                              id="level"
                              name="level"
                              labelClass="control-label display_block"
                              className=""
                              placeholder="Level"
                              component={SelectField_ReactSelect}
                              options={levelOptions}
                              errorClass="help-block"
                              validate={[requiredReactSelect]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="workout-creation-box pos-relative">
                      <div className="row no-gutters">
                        <div className="col-md-12">
                          <div className="box-title">Goal</div>
                        </div>
                        <div className="col-md-12">
                          <div className="box-content pos-relative">
                            <ul className="muscles-list">
                              {goalOptionList &&
                                goalOptionList.length > 0 &&
                                goalOptionList.map((item, i) => (
                                  <li>
                                    <div className="d-flex flex-wrap align-items-center muscles-items pos-relative">
                                      <div className="muscles-title">
                                        {item.label}
                                      </div>
                                      <div className="custom-checkbox ml-auto pos-relative mr-5">
                                        <div className="custom_check mb-0 d-flex">
                                          <Field
                                            type="checkbox"
                                            id={`checkbox-posed-${i}`}
                                            name={"goal"}
                                            checked={item.checked}
                                            component={CheckboxAdvanceField}
                                            handleClick={check =>
                                              this.handleChangeGoal(i, check)
                                            }
                                          />
                                          {/* <input
                                            type="checkbox"
                                            id={`checkbox-posed-${i}`}
                                            name={"goal"}
                                            defaultChecked={false}
                                            onClick={() =>
                                              this.handleChangePosedList(
                                                i,
                                                item.checked
                                              )
                                            }
                                          />
                                          <label
                                            className="mb-0"
                                            htmlFor={`checkbox-posed-${i}`}
                                            name={"goal"}
                                          /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Field
                      id="goal"
                      name="goal"
                      label="Goal"
                      labelClass="control-label display_block"
                      className=""
                      wrapperClass="form-group"
                      placeholder="Goal"
                      component={SelectField_ReactSelect}
                      options={goalOptions}
                      errorClass="help-block"
                      validate={[requiredReactSelect]}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <Field
                  name="title"
                  label="Name"
                  labelClass="control-label display_block"
                  className="form-control"
                  wrapperClass="form-group"
                  placeholder="Name"
                  component={InputField}
                  errorClass="help-block"
                  validate={[required, minLength2, maxLength100]}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <Field
                  id="privacy"
                  name="privacy"
                  label="Privacy"
                  labelClass="control-label display_block"
                  className=""
                  wrapperClass="form-group"
                  placeholder="Privacy"
                  component={SelectField_ReactSelect}
                  options={privacyOptions}
                  errorClass="help-block"
                  validate={[requiredReactSelectNumberOptions]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <Field
                  id="goal"
                  name="goal"
                  label="Goal"
                  labelClass="control-label display_block"
                  className=""
                  wrapperClass="form-group"
                  placeholder="Goal"
                  component={SelectField_ReactSelect}
                  options={goalOptions}
                  errorClass="help-block"
                  validate={[requiredReactSelect]}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <Field
                  id="level"
                  name="level"
                  label="Level"
                  labelClass="control-label display_block"
                  className=""
                  wrapperClass="form-group"
                  placeholder="Level"
                  component={SelectField_ReactSelect}
                  options={levelOptions}
                  errorClass="help-block"
                  validate={[requiredReactSelect]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Field
                  id="description"
                  name="description"
                  component={TextAreaField}
                  label="Description"
                  labelClass="display_block"
                  wrapperClass="form-group"
                  className="form-control min-height-242 resize-vertical"
                  errorClass="help-block"
                  validate={[maxLength5000]}
                />
              </div>
            </div> */}
            {/* <div className="d-flex pull-right mt-10">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Link to={backUrl} className="custom-medium-link-btn">
                  <span>Back</span>
                  <i className="icon-arrow_back" />
                </Link>
                <button type="submit" className="custom-medium-btn">
                  <span>Save</span>
                  <i className="icon-save" />
                </button>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    const { goalOptions, isEditPage, goal } = this.props;
    if (!isEditPage) {
      let newGoalOptionsList = [];
      goalOptions &&
        goalOptions.length > 0 &&
        goalOptions.forEach(item => {
          newGoalOptionsList.push({ ...item, checked: false });
        });
      this.setState({ goalOptionList: newGoalOptionsList });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { goal, goalOptions } = this.props;
    if (goal && prevProps.goal !== goal) {
      let newGoalOptionsList = [];
      let goalValue = this.props.goal ? this.props.goal.value : "";
      goalOptions &&
        goalOptions.length > 0 &&
        goalOptions.forEach(item => {
          newGoalOptionsList.push({
            ...item,
            checked: item.value === goalValue
          });
        });
      this.setState({ goalOptionList: newGoalOptionsList });
    }
  }

  handleChangeGoal = (index, check) => {
    let { goalOptionList } = this.state;
    for (let n = 0; n < goalOptionList.length; n++) {
      goalOptionList[n].checked = index === n;
    }
    this.setState({ goalOptionList }, () => {
      let data = {
        value: goalOptionList[index].value,
        label: goalOptionList[index].label
      };
      this.props.change("goal", data);
    });
  };
}

SaveProgramMasterPageForm = reduxForm({
  form: "save_program_master_form"
})(SaveProgramMasterPageForm);

const selector = formValueSelector("save_program_master_form");

const mapStateToProps = state => {
  const goal = selector(state, "goal");
  return {
    goal: goal
  };
};

export default connect(mapStateToProps)(SaveProgramMasterPageForm);
