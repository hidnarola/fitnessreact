import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cns from "classnames";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { SelectField_ReactSelect } from "../../helpers/FormControlHelper";
import _lowerCase from "lodash/lowerCase";

class LockerHeader extends Component {
  render() {
    const {
      exercisesTab,
      handleChangeTab,
      tabList,
      optionsList,
      handleSubmit
    } = this.props;
    return (
      <React.Fragment>
        <div className="activity-header">
          <form>
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                {tabList &&
                  tabList.map((item, index) => (
                    <div
                      className={cns("tab", {
                        active: exercisesTab === _lowerCase(item)
                      })}
                      onClick={() => handleChangeTab(_lowerCase(item))}
                      key={index}
                    >
                      <a href="javascript:void(0)">{item}</a>
                    </div>
                  ))}
              </div>
            </div>
            <div className="filter-locker">
              <Field
                name="task"
                wrapperClass="filter-exercise"
                className="form-control p-0"
                placeholder="Filter"
                component={SelectField_ReactSelect}
                options={optionsList}
                errorClass="help-block"
                validate={[]}
                requiredAstrisk={false}
                clearable={false}
              />
              <div className="search-icon">
                <FontAwesomeIcon icon="search" />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

LockerHeader = reduxForm({
  form: "workout_plans_exercises_form"
})(LockerHeader);

export default LockerHeader;
