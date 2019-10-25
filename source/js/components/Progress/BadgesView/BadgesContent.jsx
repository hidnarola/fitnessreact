import React, { Component } from "react";
import BadgesCard from "./BadgesCard";
import CSSTransition from "react-transition-group/CSSTransition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetAlert from "react-bootstrap-sweetalert";
import CreateUserGoal from "./CreateUserGoal";
import { connect } from "react-redux";
import { badgeAddRequest } from "../../../actions/admin/badges";

const cssTransitionProps = {
  timeout: 450,
  className: "col-xs-12 col-md-4 animated",
  classNames: {
    enter: "fadeIn",
    exit: "fadeOut"
  },
  unmountOnExit: true
};

class BadgesContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddGoalAlert: false
    };
  }
  render() {
    const { showAddGoalAlert } = this.state;
    const { badgesList = [], selectedViewList } = this.props;
    return (
      <React.Fragment>
        <div className="exercise-content">
          <div className="content-title">
            <h3>Goals</h3>
            <button
              className="btn btn-plus"
              onClick={() => this.setState({ showAddGoalAlert: true })}
            >
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
          <div className="content-badges p-2" style={{ borderRadius: "5px" }}>
            <div className="row no-gutters">
              {badgesList.length > 0 ? (
                badgesList.map((badge, index) => {
                  return badge.badges.map((item, k) => (
                    <React.Fragment key={k}>
                      {selectedViewList === "all" && (
                        <CSSTransition
                          in={badge.checked}
                          {...cssTransitionProps}
                        >
                          <div key={`badge${index}${k}`}>
                            <BadgesCard badges={item} />
                          </div>
                        </CSSTransition>
                      )}
                      {selectedViewList === "completed" &&
                        item.isCompleted === 1 && (
                          <CSSTransition
                            in={badge.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`badge${index}${k}`}>
                              <BadgesCard badges={item} />
                            </div>
                          </CSSTransition>
                        )}
                      {selectedViewList === "inCompleted" &&
                        item.isCompleted === 0 && (
                          <CSSTransition
                            in={badge.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`badge${index}${k}`}>
                              <BadgesCard badges={item} />
                            </div>
                          </CSSTransition>
                        )}
                    </React.Fragment>
                  ));
                })
              ) : (
                <div className="col-md-12">
                  <div className="badges-card">
                    <div className="badges-title">No Records Found</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <SweetAlert
          customClass="add-user-goal"
          type="default"
          onCancel={this.handleCloseAddGoalAlert}
          onConfirm={() => console.log("")}
          btnSize="sm"
          cancelBtnBsStyle="danger"
          show={showAddGoalAlert}
          showConfirm={false}
          showCancel={false}
          closeOnClickOutside={true}
        >
          <CreateUserGoal
            handleCloseAddGoalAlert={this.handleCloseAddGoalAlert}
            onSubmit={this.handleSubmit}
          />
        </SweetAlert>
      </React.Fragment>
    );
  }
  handleCloseAddGoalAlert = () => {
    this.setState({ showAddGoalAlert: false });
  };
  handleSubmit = values => {
    const { dispatch } = this.props;
    console.log("===========Submit User Goal Form===========");
    console.log(values);
    console.log("==========================");
    // const requestData = {
    //   name: "abc"
    // };
    // dispatch(badgeAddRequest(requestData));
  };
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(BadgesContent);
