import React, { Component } from "react";
import cns from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import FithubBody from "./FithubBody";
import FithubPhotos from "./FithubPhotos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FithubExercise from "./FithubExercise";
import FithubGoals from "./FithubGoals";
import SweetAlert from "react-bootstrap-sweetalert";
import AddTrackingForm from "./AddTrackingForm";
import { FaCircleONotch } from "react-icons/lib/fa";

class FithubActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fithubTab: "body",
      showTrackingAlert: false
    };
  }
  render() {
    const { fithubTab, showTrackingAlert } = this.state;
    const {
      loading,
      userWidgets,
      widgetBodyFat,
      changeBodyFatLoading,
      changeBodyFatError,
      widgetMuscle,
      widgetProgressPhotos,
      loggedUserData,
      widgetBadges,
      requestGraphData
    } = this.props;
    return (
      <React.Fragment>
        <div className="whitebox-body dashboard-body h-100 dashboard-sidebar">
          <div className="activity-title">
            <h2>Fithub</h2>
          </div>
          <div className="activity-header">
            <div className="exercise-navbar">
              <div className="tabs sub-tab">
                <div
                  className={cns("tab", {
                    active: fithubTab === "body"
                  })}
                  onClick={() => this.setState({ fithubTab: "body" })}
                >
                  <a href="#">Body</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "photos"
                  })}
                  onClick={() => this.setState({ fithubTab: "photos" })}
                >
                  <a href="#">Photos</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "exercise"
                  })}
                  onClick={() => this.setState({ fithubTab: "exercise" })}
                >
                  <a href="#">Exercise</a>
                </div>
                <div
                  className={cns("tab", {
                    active: fithubTab === "goals"
                  })}
                  onClick={() => this.setState({ fithubTab: "goals" })}
                >
                  <a href="#">Goals</a>
                </div>
              </div>
            </div>
          </div>
          <div className="activity-body fithub-body">
            {loading && (
              <div className="loader" key={0}>
                <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
                Loading ...
              </div>
            )}
            {!loading &&
              fithubTab === "body" && (
                <Scrollbars autoHide>
                  <FithubBody
                    userWidgets={userWidgets}
                    widgetBodyFat={widgetBodyFat}
                    changeBodyFatLoading={changeBodyFatLoading}
                    changeBodyFatError={changeBodyFatError}
                    requestBodyFatData={this.props.requestBodyFatData}
                    widgetMuscle={widgetMuscle}
                    requestGraphData={requestGraphData}
                  />
                </Scrollbars>
              )}

            {!loading &&
              fithubTab === "photos" && (
                <Scrollbars autoHide>
                  <FithubPhotos
                    userWidgets={userWidgets}
                    widgetProgressPhotos={widgetProgressPhotos}
                    loggedUserData={loggedUserData}
                  />
                </Scrollbars>
              )}

            {!loading &&
              fithubTab === "exercise" && (
                <Scrollbars autoHide>
                  <FithubExercise />
                </Scrollbars>
              )}

            {!loading &&
              fithubTab === "goals" && (
                <Scrollbars autoHide>
                  <FithubGoals
                    userWidgets={userWidgets}
                    widgetBadges={widgetBadges}
                  />
                </Scrollbars>
              )}
            {!loading && (
              <ul className="workout-list display-workout-btn">
                <li
                  className="workout-list-items-btn"
                  onClick={() => this.setState({ showTrackingAlert: true })}
                >
                  <a href="#" className="btn width-100-per">
                    <FontAwesomeIcon icon="plus" /> Tracking Items
                  </a>
                </li>
              </ul>
            )}
            <SweetAlert
              custom
              title={undefined}
              customClass={"alert-tracking-items-box"}
              type="default"
              onCancel={() => this.handleCloseAlert()}
              onConfirm={() => console.log("")}
              btnSize="sm"
              cancelBtnBsStyle="danger"
              show={showTrackingAlert}
              showConfirm={false}
              showCancel={false}
              closeOnClickOutside={true}
            >
              <AddTrackingForm
                handleCloseAlert={this.handleCloseAlert}
                exerciseMeasurements={this.props.exerciseMeasurements}
              />
            </SweetAlert>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleCloseAlert = () => {
    this.setState({ showTrackingAlert: false });
  };
}

export default FithubActivities;
