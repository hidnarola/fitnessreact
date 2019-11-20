import React, { Component } from "react";
import Panel from "react-bootstrap/lib/Panel";
import cns from "classnames";
import { connect } from "react-redux";

class AddTrackingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingTab: "body"
    };
  }
  render() {
    const { handleCloseAlert, goalsList = [] } = this.props;
    const { trackingTab } = this.state;
    console.log("===========goalsList===========");
    console.log("goalsList", goalsList);
    console.log("==========================");
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
                        <select className="form-control">
                          <option value="chest">Chest</option>
                          <option value="weight">Weight</option>
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
          {trackingTab === "photos" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Photo Type</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option value="progress">Progress</option>
                          <option value="lifestyle">Life Style</option>
                        </select>
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
          {trackingTab === "exercise" && (
            <div className="panel-box">
              <Panel>
                <Panel.Heading>Exercise</Panel.Heading>
                <Panel.Body className="p-0">
                  <div className="row no-gutters">
                    <div className="col-md-12">
                      <div className="serving-select width-100-per">
                        <select className="form-control">
                          <option value="all">All</option>
                          <option value="benchpress">BenchPress</option>
                        </select>
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
                          <option value="Total Reps">Total Reps</option>
                          <option value="Weight loss">Weight loss</option>
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
}
const mapStateToProps = state => {
  const { userFavouriteBadges } = state;
  return {
    goalsList: userFavouriteBadges.get("badges")
  };
};

export default connect(mapStateToProps)(AddTrackingForm);
