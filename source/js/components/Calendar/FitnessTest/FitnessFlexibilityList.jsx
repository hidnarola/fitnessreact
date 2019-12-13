import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SERVER_BASE_URL,
  FITNESS_TEST_CAT_STRENGTH,
  FITNESS_TEST_CAT_FLEXIBILITY
} from "../../../constants/consts";
import noImg from "img/common/no-img.png";
import { connect } from "react-redux";
import { userFitnessTestsAOrB } from "../../../actions/userFitnessTests";

class FitnessFlexibilityList extends Component {
  render() {
    const { test, syncedUserFitnessTests } = this.props;
    console.log("===========test===========");
    console.log("test", test);
    console.log("==========================");
    let max_reps = {};
    void (
      typeof test.max_rep === "object" &&
      test.max_rep.forEach(i => (max_reps[`${i}`] = 0))
    );
    console.log("===========max_reps===========");
    console.log("max_reps", max_reps);
    console.log("==========================");
    var userVal = false;
    var userValue = syncedUserFitnessTests[test._id];
    return (
      <React.Fragment>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>1.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>
                {test.name} ({FITNESS_TEST_CAT_FLEXIBILITY})
              </h3>
              <div role="toolbar" className="btn-toolbar ml-auto">
                <button
                  className="btn btn-save border-left border-right"
                  onClick={() => console.log("")}
                >
                  Save
                  <i className="fad fa-save" />
                </button>
                <button type="button" className="timline-post-del-btn">
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            </div>
            <div className="excercise-content  animated fadeIn">
              <div className="row no-gutters">
                <div className="col-xs-12 col-md-7">
                  <div className="mr-1">
                    <div className="sub-category-body">
                      <h4>Upper Body</h4>
                    </div>
                    <div className="flexibility-box width-100-per align-items-center whitebox-body fitness-test-box d-flex h-100">
                      <div className="vertical-drop">
                        <ul>
                          {test.a_or_b &&
                            test.a_or_b.length > 0 &&
                            test.a_or_b.map((val, i) => {
                              userVal = false;
                              if (userValue.value === i) {
                                userVal = true;
                              }
                              return (
                                <li key={i}>
                                  <div className="custom_radio">
                                    <input
                                      type="radio"
                                      id={`${test._id}_a_or_b_${i}`}
                                      name={`${test._id}_a_or_b`}
                                      value={i}
                                      checked={userVal}
                                      onChange={e =>
                                        this.handleAOrBChange(test._id, e)
                                      }
                                    />
                                    <label htmlFor={`${test._id}_a_or_b_${i}`}>
                                      <img
                                        src={SERVER_BASE_URL + val.image}
                                        alt="Image"
                                        onError={e => {
                                          e.target.src = noImg;
                                        }}
                                      />
                                    </label>
                                  </div>
                                  <h6>{val.title}</h6>
                                </li>
                              );
                            })}
                        </ul>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: test.description
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-md-5">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-12">
                      <div className="display-fitnessimg-box d-flex width-100-per align-items-center">
                        <img
                          src={`${SERVER_BASE_URL}${test.featureImage}`}
                          alt="fitnessimg"
                          height="100%"
                          width="100%"
                          className="ml-auto mr-auto"
                          onError={e => {
                            e.target.src = noImg;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleAOrBChange = (_id, e) => {
    const { dispatch } = this.props;
    var val = e.target.value;
    dispatch(userFitnessTestsAOrB(_id, val));
  };
}

export default connect()(FitnessFlexibilityList);
