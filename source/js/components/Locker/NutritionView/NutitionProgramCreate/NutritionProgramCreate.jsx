import React, { Component } from "react";
import AddMetaDescription from "../../../global/AddMetaDescription";
import FitnessHeader from "../../../global/FitnessHeader";
import { routeCodes } from "../../../../constants/routes";
import FitnessNav from "../../../global/FitnessNav";
import SaveNutritionProgramPageForm from "./SaveNutritionProgramPageForm";
import {
  PROGRAM_DIFFICULTY_LEVEL_OBJ,
  PROGRAM_PRIVATE,
  PROGRAM_PRIVATE_STR,
  PROGRAM_PUBLIC,
  PROGRAM_PUBLIC_STR,
  NUTRITION_CAT_LIST,
  USER_STR
} from "../../../../constants/consts";
import {
  capitalizeFirstLetter,
  ts,
  te,
  callbackResponse
} from "../../../../helpers/funs";
import {
  addUserNutritionProgramRequest,
  getUserNutritionProgramDetailsRequest,
  updateUserNutritionProgramRequest
} from "../../../../actions/userNutritionPrograms";
import { showPageLoader, hidePageLoader } from "../../../../actions/pageLoader";
import { connect } from "react-redux";
import { initialize } from "redux-form";

const privacyOptions = [
  { value: PROGRAM_PRIVATE, label: PROGRAM_PRIVATE_STR },
  { value: PROGRAM_PUBLIC, label: PROGRAM_PUBLIC_STR }
];

class NutritionProgramCreate extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    if (match && match.params && match.params.id) {
      dispatch(showPageLoader());
      dispatch(
        getUserNutritionProgramDetailsRequest(match.params.id, res => {
          dispatch(hidePageLoader());
          if (res && res.program) {
            console.log("RES", res);
            this.preparedProgramResponse(res);
          }
        })
      );
    }
  }
  render() {
    const { errorMaster, match } = this.props;
    let backUrl = routeCodes.LOCKER_NUTRITION;
    let workoutPlanUrl = null;
    let isEditPage = false;
    if (match && match.params && match.params.id) {
      backUrl = `${routeCodes.PROGRAM_SAVE}/${match.params.id}`;
      workoutPlanUrl = `${routeCodes.LOCKER_NUTRITION_PROGRAM_PLAN}/${
        match.params.id
      }`;
      isEditPage = true;
    }
    return (
      <React.Fragment>
        <div className="fitness-nutrition">
          <AddMetaDescription>
            <title>Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            enableBackLink={true}
            routes={routeCodes.LOCKER_NUTRITION}
            text="locker"
          />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className="tab-content">
              <div className="content active">
                <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
                  <div className="body-head-l p-3">
                    <div className="display-date">
                      <span className="date-text ml-4">Meal Plan Creation</span>
                    </div>
                  </div>
                </div>
                <div className="overview-navbar">
                  <div className="ov-tabs">
                    <div className="ov-tab active">
                      <a href="#">Overview</a>
                    </div>
                    <div className="ov-tab">
                      <a
                        href="javascript:void(0)"
                        onClick={() => this.handleChangePlan(workoutPlanUrl)}
                      >
                        Plan
                      </a>
                    </div>
                  </div>
                </div>
                <div className="body-content flex col-md-12 h-100 mt-3 locker">
                  <SaveNutritionProgramPageForm
                    onSubmit={this.handleSubmit}
                    levelOptions={PROGRAM_DIFFICULTY_LEVEL_OBJ}
                    privacyOptions={privacyOptions}
                    categoriesOption={NUTRITION_CAT_LIST}
                    isEditPage={isEditPage}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
  handleChangePlan = url => {
    if (url === null) {
      te("Please add first meal plan detail after you will set meal");
    } else {
      const { history } = this.props;
      history.push(url);
    }
  };
  handleSubmit = async values => {
    const { dispatch, match } = this.props;
    let categoriesList = [];
    if (values.category) {
      values.category.forEach(
        item => item.checked && categoriesList.push(item.value)
      );
    }
    const requestData = {
      name:
        values.title && values.title.trim()
          ? capitalizeFirstLetter(values.title.trim())
          : "",
      description: values.description ? values.description : null,
      privacy: values.privacy ? values.privacy.value : "public",
      level: values.level ? values.level.value : null,
      tags: values.tags ? values.tags : [],
      categories: categoriesList,
      type: USER_STR
    };
    console.log("===========Values requestData===========");
    console.log("Values requestData", values);
    console.log("Values requestData", requestData);
    console.log("==========================");
    dispatch(showPageLoader());
    if (match && match.params && match.params.id) {
      await dispatch(
        updateUserNutritionProgramRequest(match.params.id, requestData, res => {
          console.log("UPDATE DATA RESPONSE", res);
          dispatch(hidePageLoader());
          if (res && res.status === 1) {
            this.preparedProgramResponse(res);
            ts("Your program successfully updated");
          }
        })
      );
    } else {
      await dispatch(
        addUserNutritionProgramRequest(requestData, res => {
          dispatch(hidePageLoader());
          callbackResponse(res);
        })
      );
    }
  };
  preparedCategory = category => {
    let newCategoryList = [];
    NUTRITION_CAT_LIST.forEach(({ value, label }) => {
      newCategoryList.push({
        value,
        label,
        checked: category.indexOf(value) >= 0 ? true : false
      });
    });
    return newCategoryList;
  };
  preparedProgramResponse = res => {
    const { dispatch } = this.props;
    const { program } = res;
    let formData = {
      title: program.name ? program.name : undefined,
      privacy:
        typeof program.privacy !== "undefined"
          ? _.find(privacyOptions, ["value", program.privacy])
          : undefined,
      level: program.level
        ? _.find(PROGRAM_DIFFICULTY_LEVEL_OBJ, ["value", program.level])
        : undefined,
      description: program.description ? program.description : undefined,
      tags: program.tags ? program.tags : [],
      category: program.categories
        ? this.preparedCategory(program.categories)
        : []
    };
    dispatch(initialize("save_nutrition_program_master_form", formData));
  };
}

export default connect()(NutritionProgramCreate);
