import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {
  CheckboxAdvanceField,
  SelectField_ReactSelect,
  TextAreaField,
  InputField
} from "../../../../helpers/FormControlHelper";
import {
  requiredReactSelect,
  requiredReactSelectNumberOptions,
  required,
  minLength,
  maxLength
} from "../../../../formValidation/validationRules";
import TagsInput from "react-tagsinput";
import _ from "lodash";
import { connect } from "react-redux";

const minLength2 = minLength(2);
const maxLength100 = maxLength(100);
const maxLength5000 = maxLength(5000);

class SaveNutritionProgramPageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesOptionList: [],
      tags: []
    };
  }
  componentDidMount() {
    const { categoriesOption, isEditPage } = this.props;
    let newOption = [];
    categoriesOption &&
      categoriesOption.length > 0 &&
      categoriesOption.forEach(({ value, label }) => {
        newOption.push({ value, label, checked: false });
      });
    this.setState({ categoriesOptionList: newOption });
  }

  render() {
    const {
      handleSubmit,
      levelOptions,
      privacyOptions,
      categoriesOption
    } = this.props;
    const { categoriesOptionList, tags } = this.state;
    return (
      <React.Fragment>
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
                    <div className="col-md-12">
                      <div className="workout-creation-box">
                        <div className="row no-gutters">
                          <div className="col-md-12">
                            <div className="box-title">Tags</div>
                          </div>
                          <div className="col-md-12">
                            <div className="box-content">
                              <TagsInput
                                type="text"
                                value={tags}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-lg-12 d-flex flex-wrep">
                            <h3 className="detail-sub-title">Recent Tags</h3>
                            <ul className="recent-tags-list">
                              <li
                                className="cursor-pointer"
                                onClick={() => this.handleAddHashTags("hello")}
                              >
                                #hello
                              </li>
                              <li
                                className="cursor-pointer"
                                onClick={() =>
                                  this.handleAddHashTags("fitness")
                                }
                              >
                                #fitness
                              </li>
                            </ul>
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
                            <div className="box-title">Categories</div>
                          </div>
                          <div className="col-md-12">
                            <div className="box-content pos-relative">
                              <ul className="muscles-list">
                                {categoriesOptionList &&
                                  categoriesOptionList.length > 0 &&
                                  categoriesOptionList.map((item, i) => (
                                    <li key={i}>
                                      <div className="d-flex flex-wrap align-items-center muscles-items pos-relative">
                                        <div className="muscles-title">
                                          {item.label}
                                        </div>
                                        <div className="custom-checkbox ml-auto pos-relative mr-5">
                                          <div className="custom_check mb-0 d-flex">
                                            <Field
                                              type="checkbox"
                                              id={`checkbox-categories-${i}`}
                                              name={"category"}
                                              checked={item.checked}
                                              component={CheckboxAdvanceField}
                                              handleClick={check =>
                                                this.handleChangeCategories(
                                                  check,
                                                  i
                                                )
                                              }
                                            />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { category, tags } = this.props;
    if (category && prevProps.category !== category) {
      this.setState({ categoriesOptionList: category });
    }
    if (tags && prevProps.tags !== tags) {
      this.setState({ tags });
    }
  }

  handleChangeCategories = (value, index) => {
    let { categoriesOptionList } = this.state;
    categoriesOptionList[index].checked = value;
    this.setState({ categoriesOptionList }, () => {
      this.props.change("category", categoriesOptionList);
      console.log("categoriesOptionList", categoriesOptionList);
    });
  };
  handleChange = tags => {
    this.setState({ tags: JSON.parse(_.toLower(JSON.stringify(tags))) }, () => {
      this.props.change("tags", this.state.tags);
    });
  };
  handleAddHashTags = tag => {
    let { tags } = this.state;
    tags.push(tag);
    this.setState({ tags }, () => {
      this.props.change("tags", this.state.tags);
    });
  };
}

SaveNutritionProgramPageForm = reduxForm({
  form: "save_nutrition_program_master_form"
})(SaveNutritionProgramPageForm);

const selector = formValueSelector("save_nutrition_program_master_form");

const mapStateToProps = state => {
  const category = selector(state, "category");
  const tags = selector(state, "tags");
  return {
    category: category,
    tags: tags
  };
};

export default connect(mapStateToProps)(SaveNutritionProgramPageForm);
