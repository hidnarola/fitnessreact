import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import cns from "classnames";
import Star from "../../../../../assets/svg/star.svg";

class NutritionMealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "details"
    };
  }
  render() {
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <div
          className="np-meal-card pb-1 mb-3"
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div className="np-card-header">
            <h3>Ham Sandwich</h3>
            <ButtonToolbar className="boxing-icon ml-auto">
              <Dropdown id={`workout-actions-1`} pullRight>
                <Dropdown.Toggle noCaret>
                  <i className="fad fa-ellipsis-h" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <MenuItem
                    eventKey="1"
                    onClick={() => console.log("advanceView")}
                  >
                    Advance Display
                  </MenuItem>
                  <MenuItem
                    eventKey="2"
                    onClick={() => console.log("normalView")}
                  >
                    Move Exercise
                  </MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
            <button type="button" className="timline-post-del-btn ml-3">
              <i className="fad fa-trash" />
            </button>
          </div>
          <div className="np-card-body">
            <div className="np-tabs mb-1">
              <div
                className={cns("np-tab", { active: activeTab === "details" })}
                onClick={() => this.setState({ activeTab: "details" })}
              >
                <a href="#">Details</a>
              </div>
              <div
                className={cns("np-tab", {
                  active: activeTab === "ingredient"
                })}
                onClick={() => this.setState({ activeTab: "ingredient" })}
              >
                <a href="#">Ingredients</a>
              </div>
              <div
                className={cns("np-tab", {
                  active: activeTab === "nutrition"
                })}
                onClick={() => this.setState({ activeTab: "nutrition" })}
              >
                <a href="#">Nutrition</a>
              </div>
            </div>
            {activeTab === "details" && (
              <React.Fragment>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-6">
                      <div className="title">Serves</div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-boxs width-100-per m-0">
                        <button
                          type="button"
                          className="btn btn-minus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={"2"}
                        />
                        <button
                          type="button"
                          className="btn btn-plus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-6">
                      <div className="title">Difficulty</div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-select width-100-per">
                        <select
                          className="form-control"
                          defaultValue={"second"}
                        >
                          <option value="second">Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-12">
                      <div className="title">Prep Time</div>
                    </div>
                    <div className="col-xs-12 col-md-6 border-right">
                      <div className="serving-boxs width-100-per m-0">
                        <button
                          type="button"
                          className="btn btn-minus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={"2"}
                        />
                        <button
                          type="button"
                          className="btn btn-plus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-select width-100-per">
                        <select
                          className="form-control"
                          defaultValue={"second"}
                        >
                          <option value="second">Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-12">
                      <div className="title">Cook Time</div>
                    </div>
                    <div className="col-xs-12 col-md-6 border-right">
                      <div className="serving-boxs width-100-per m-0">
                        <button
                          type="button"
                          className="btn btn-minus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={"2"}
                        />
                        <button
                          type="button"
                          className="btn btn-plus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-select width-100-per">
                        <select
                          className="form-control"
                          defaultValue={"second"}
                        >
                          <option value="second">Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
            {activeTab === "ingredient" && (
              <React.Fragment>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-12">
                      <div className="d-flex flex-wrap align-items-center width-100-per">
                        <div className="display-star ml-3">
                          <i className="fa fa-star" />
                        </div>
                        <div className="title">Steak - Prime</div>
                        <ButtonToolbar className="boxing-icon ml-auto">
                          <Dropdown id={`workout-actions-1`} pullRight>
                            <Dropdown.Toggle noCaret>
                              <i className="fad fa-ellipsis-h" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <MenuItem
                                eventKey="1"
                                onClick={() => console.log("advanceView")}
                              >
                                Advance Display
                              </MenuItem>
                              <MenuItem
                                eventKey="2"
                                onClick={() => console.log("normalView")}
                              >
                                Move Exercise
                              </MenuItem>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ButtonToolbar>
                        <button
                          type="button"
                          className="timline-post-del-btn ml-3 mr-3"
                        >
                          <i className="fad fa-trash" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6 border-right">
                      <div className="serving-boxs width-100-per m-0">
                        <button
                          type="button"
                          className="btn btn-minus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={"2"}
                        />
                        <button
                          type="button"
                          className="btn btn-plus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-select width-100-per">
                        <select
                          className="form-control"
                          defaultValue={"second"}
                        >
                          <option value="second">Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="np-detail-box mb-1">
                  <div className="row no-gutters">
                    <div className="col-xs-12 col-md-12">
                      <div className="d-flex flex-wrap align-items-center width-100-per">
                        <div className="display-star ml-3">
                          <i className="fa fa-star" />
                        </div>
                        <div className="title">Eggs - Fried</div>
                        <ButtonToolbar className="boxing-icon ml-auto">
                          <Dropdown id={`workout-actions-1`} pullRight>
                            <Dropdown.Toggle noCaret>
                              <i className="fad fa-ellipsis-h" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <MenuItem
                                eventKey="1"
                                onClick={() => console.log("advanceView")}
                              >
                                Advance Display
                              </MenuItem>
                              <MenuItem
                                eventKey="2"
                                onClick={() => console.log("normalView")}
                              >
                                Move Exercise
                              </MenuItem>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ButtonToolbar>
                        <button
                          type="button"
                          className="timline-post-del-btn ml-3 mr-3"
                        >
                          <i className="fad fa-trash" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6 border-right">
                      <div className="serving-boxs width-100-per m-0">
                        <button
                          type="button"
                          className="btn btn-minus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={"2"}
                        />
                        <button
                          type="button"
                          className="btn btn-plus"
                          onClick={() => ""}
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <div className="serving-select width-100-per">
                        <select
                          className="form-control"
                          defaultValue={"second"}
                        >
                          <option value="second">Seconds</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
            {activeTab === "nutrition" && (
              <React.Fragment>
                <div className="np-nutrition-list">
                  <ul>
                    <li>
                      <span>Calories</span>
                      <span className="ml-auto">800kcl</span>
                    </li>
                    <li>
                      <span>Calories</span>
                      <span className="ml-auto">800kcl</span>
                    </li>
                    <li>
                      <span>Calories</span>
                      <span className="ml-auto">800kcl</span>
                    </li>
                  </ul>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NutritionMealCard;
