import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { prepareFieldsOptions } from "../../helpers/funs";
import { EXE_CAT_STRENGTH } from "../../constants/consts";

class CustomDaySupersetExerciseList extends Component {
  render() {
    const { exerciseItems, exerciseMeasurements, exerciseIndex } = this.props;
    console.log("===========exerciseItems===========");
    console.log("exerciseItems", exerciseItems);
    console.log("==========================");
    const { exercises, setsDetails } = exerciseItems;
    let measObj = _.find(exerciseMeasurements, {
      category: exercises.category,
      subCategory: exercises.subCategory
    });
    let field1OptionsList =
      measObj && measObj.field1 ? prepareFieldsOptions(measObj.field1) : [];
    let field2OptionsList =
      measObj && measObj.field2 ? prepareFieldsOptions(measObj.field2) : [];
    console.log("exerciseItems meansObj", measObj);
    return (
      <React.Fragment>
        <div className="wp-exercise-box mb-1" style={{ borderRadius: "0px" }}>
          <div className="row no-gutters">
            <div className="col-md-1 col-sm-12 wp-exercise-leftsidebar">
              <h3>{String.fromCharCode(exerciseIndex)}.</h3>
            </div>
            <div className="col-md-11 col-sm-12 wp-exercise-rightsidebar">
              <div className="wp-exercise-box-header">
                <i className="fa fa-star star" />
                <h3>{exercises.name}</h3>
                <button className="btn btn-exchange ml-auto">
                  <i className="fad fa-exchange-alt" />
                </button>
              </div>
              {setsDetails &&
                setsDetails.length === 1 && (
                  <SupersetNormalView
                    setsDetails={setsDetails}
                    exercises={exercises}
                    field2OptionsList={field2OptionsList}
                    field1OptionsList={field1OptionsList}
                  />
                )}
              {setsDetails &&
                setsDetails.length > 1 && (
                  <SupersetAdvanceView
                    setsDetails={setsDetails}
                    exercises={exercises}
                    field2OptionsList={field2OptionsList}
                    field1OptionsList={field1OptionsList}
                  />
                )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomDaySupersetExerciseList;

class SupersetNormalView extends Component {
  render() {
    const {
      setsDetails,
      field1OptionsList,
      field2OptionsList,
      exercises
    } = this.props;
    const { field1, field2 } = setsDetails[0];
    return (
      <React.Fragment>
        <div className="row no-gutters border-down">
          <div className="col-md-4 border-right">
            <span className="wp-title">Times :</span>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="row no-gutters">
              <div className="col-md-6 border-right">
                <div className="serving-boxs width-100-per m-0">
                  <button className="btn btn-minus">
                    <FontAwesomeIcon icon="minus" />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={field1.value}
                  />
                  <button className="btn btn-plus">
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </div>
              </div>
              <div className="col-md-6 border-right">
                <div className="serving-select width-100-per">
                  <select className="form-control" defaultValue={field1.unit}>
                    {field2OptionsList.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters border-down">
          <div className="col-md-4 border-right">
            <span className="wp-title">
              {exercises.category === EXE_CAT_STRENGTH ? "Weight :" : "Speed :"}
            </span>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="row no-gutters">
              <div className="col-md-6 border-right">
                <div className="serving-boxs width-100-per m-0">
                  <button className="btn btn-minus">
                    <FontAwesomeIcon icon="minus" />
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={field2.value}
                  />
                  <button className="btn btn-plus">
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </div>
              </div>
              <div className="col-md-6 border-right">
                <div className="serving-select width-100-per">
                  <select className="form-control" defaultValue={field2.unit}>
                    {field2OptionsList.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class SupersetAdvanceView extends Component {
  render() {
    const {
      field1OptionsList,
      field2OptionsList,
      exercises,
      setsDetails
    } = this.props;
    const { field1, field2 } = setsDetails[0];
    return (
      <React.Fragment>
        <div className="row no-gutters border-down">
          <div className="col-md-2 border-right">
            <span className="wp-title">Sets</span>
          </div>
          <div className="col-md-5 border-right">
            <div className="serving-select width-100-per">
              <select className="form-control" defaultValue={field1.unit}>
                {field1OptionsList.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="serving-select width-100-per">
              <select className="form-control" defaultValue={field2.unit}>
                {field2OptionsList.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {setsDetails &&
          setsDetails.map((item, i) => (
            <SupersetAdvanceViewItemsList key={i} details={item} index={i} />
          ))}
      </React.Fragment>
    );
  }
}

class SupersetAdvanceViewItemsList extends Component {
  render() {
    const { details, index } = this.props;
    console.log("===========details===========");
    console.log("details", details);
    console.log("==========================");
    const { field1, field2 } = details;
    return (
      <React.Fragment>
        <div className="row no-gutters border-down">
          <div className="col-md-2 border-right">
            <span className="wp-title">{index + 1}.</span>
          </div>
          <div className="col-md-5 border-right">
            <div className="serving-boxs width-100-per m-0">
              <button className="btn btn-minus">
                <FontAwesomeIcon icon="minus" />
              </button>
              <input
                type="number"
                className="form-control"
                defaultValue={field1.value}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="serving-boxs width-100-per m-0">
              <button className="btn btn-minus">
                <FontAwesomeIcon icon="minus" />
              </button>
              <input
                type="number"
                className="form-control"
                defaultValue={field2.value}
              />
              <button className="btn btn-plus">
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
