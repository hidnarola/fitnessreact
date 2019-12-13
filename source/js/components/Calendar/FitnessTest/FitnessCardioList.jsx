import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FITNESS_TEST_CAT_CARDIO,
  SERVER_BASE_URL
} from "../../../constants/consts";
import noImg from "img/common/no-img.png";

class FitnessCardioList extends Component {
  render() {
    const { test } = this.props;
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
    return (
      <React.Fragment>
        <div className="excercise-boxs">
          <div className="excercise-number">
            <span>1.</span>
          </div>
          <div className="excercise-right">
            <div className="topbar-title">
              <h3>
                {test.name} ({FITNESS_TEST_CAT_CARDIO})
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
                <div className="col-xs-12 col-lg-7">
                  <div className="row no-gutters mb-1" style={{ border: "0" }}>
                    <div className="col-xs-12 col-lg-12">
                      <div className="sub-category-body border-right">
                        <h4>Upper Body</h4>
                      </div>
                    </div>
                    <div className="col-xs-12 col-lg-5">
                      <span className="warmup-title mr-1">value :</span>
                    </div>
                    <div className="col-xs-12 col-lg-7">
                      <div className="serving-boxs m-0 ml-2 width-100-per border-right">
                        <button className="btn btn-minus">
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          style={{ borderRadius: "0", height: "48px" }}
                          defaultValue="0"
                        />
                        <button className="btn btn-plus">
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-lg-5">
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
}

export default FitnessCardioList;
