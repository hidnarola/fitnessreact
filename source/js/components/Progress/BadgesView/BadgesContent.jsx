import React, { Component } from "react";
import BadgesCard from "./BadgesCard";
import CSSTransition from "react-transition-group/CSSTransition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SweetAlert from "react-bootstrap-sweetalert";
import CreateUserGoal from "./CreateUserGoal";
import { connect } from "react-redux";
import { badgeAddRequest } from "../../../actions/admin/badges";
import { ti, ts, te } from "../../../helpers/funs";
import {
  addUserPersonalGoalRequest,
  getUserPersonalGoalRequest
} from "../../../actions/userPersonalGoals";
import { showPageLoader, hidePageLoader } from "../../../actions/pageLoader";
import { FITLY_MANAGEMENT, YOU } from "../../../constants/consts";
import UserGoalCard from "./UserGoalCard";
import _filter from "lodash/filter";

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
      showAddGoalAlert: false,
      isInitSaveUserGoal: false
    };
  }

  render() {
    const { showAddGoalAlert } = this.state;
    const {
      badgesList = [],
      selectedViewList,
      selectedUserViewList,
      personalGoalsList = []
    } = this.props;
    let CompletedLength = 0;
    let InCompletedLength = 0;
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
              {badgesList.length > 0 &&
                selectedUserViewList === FITLY_MANAGEMENT &&
                badgesList.map((badge, index) => {
                  const countCompletedCard = _filter(badge.badges, {
                    isCompleted: 1
                  });
                  const countInCompletedCard = _filter(badge.badges, {
                    isCompleted: 0
                  });
                  CompletedLength =
                    CompletedLength + parseInt(countCompletedCard.length);
                  InCompletedLength =
                    InCompletedLength + parseInt(countInCompletedCard.length);

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
                })}
              {personalGoalsList.length > 0 &&
                selectedUserViewList === YOU &&
                personalGoalsList.map((userGoal, index) => {
                  const countCompletedCard = _filter(userGoal.goals, {
                    isCompleted: 1
                  });
                  const countInCompletedCard = _filter(userGoal.goals, {
                    isCompleted: 0
                  });
                  CompletedLength =
                    CompletedLength + parseInt(countCompletedCard.length);
                  InCompletedLength =
                    InCompletedLength + parseInt(countInCompletedCard.length);
                  return userGoal.goals.map((item, k) => (
                    <React.Fragment key={k}>
                      {selectedViewList === "all" && (
                        <CSSTransition
                          in={userGoal.checked}
                          {...cssTransitionProps}
                        >
                          <div key={`goal${index}${k}`}>
                            <UserGoalCard goal={item} />
                          </div>
                        </CSSTransition>
                      )}
                      {selectedViewList === "completed" &&
                        item.isCompleted === 1 && (
                          <CSSTransition
                            in={userGoal.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`goal${index}${k}`}>
                              <UserGoalCard goal={item} />
                            </div>
                          </CSSTransition>
                        )}
                      {selectedViewList === "inCompleted" &&
                        item.isCompleted === 0 && (
                          <CSSTransition
                            in={userGoal.checked}
                            {...cssTransitionProps}
                          >
                            <div key={`goal${index}${k}`}>
                              <UserGoalCard goal={item} />
                            </div>
                          </CSSTransition>
                        )}
                    </React.Fragment>
                  ));
                })}
              {((selectedViewList === "completed" && CompletedLength === 0) ||
                (selectedViewList === "inCompleted" &&
                  InCompletedLength === 0) ||
                (selectedUserViewList === FITLY_MANAGEMENT &&
                  badgesList.length === 0) ||
                (selectedUserViewList === YOU &&
                  personalGoalsList.length === 0)) && (
                <div className="col-md-12">
                  <div className="badges-card" style={{ height: "auto" }}>
                    <div className="badges-title">No Records Found</div>
                  </div>
                </div>
              )}
              {/* {((selectedUserViewList === FITLY_MANAGEMENT &&
                badgesList.length === 0) ||
                (selectedUserViewList === YOU &&
                  personalGoalsList.length === 0)) && (
                <div className="col-md-12">
                  <div className="badges-card" style={{ height: "auto" }}>
                    <div className="badges-title">No Records Found</div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <SweetAlert
          custom
          customClass={"add-user-goal animated slideInRight"}
          type="default"
          onCancel={this.handleCloseAddGoalAlert}
          onConfirm={() => console.log("")}
          btnSize="sm"
          cancelBtnBsStyle="danger"
          show={showAddGoalAlert}
          showConfirm={false}
          showCancel={false}
          closeOnClickOutside={false}
        >
          <CreateUserGoal
            handleCloseAddGoalAlert={this.handleCloseAddGoalAlert}
            onSubmit={this.handleSubmit}
          />
        </SweetAlert>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { loading, error, goal, dispatch } = this.props;
    const { isInitSaveUserGoal } = this.state;
    if (!loading && prevProps.error !== error) {
      dispatch(hidePageLoader());
      te();
    }
  }

  handleCloseAddGoalAlert = () => {
    this.setState({ showAddGoalAlert: false });
  };
  handleSubmit = async values => {
    const { dispatch } = this.props;
    const requestData = {
      title: values.title,
      target: values.target,
      unit: values.unit.value,
      task: values.task.value,
      timeScale: values.timeScale,
      timeUnit: values.timeUnit.value,
      description: values.motivation
    };
    dispatch(showPageLoader());
    await dispatch(
      addUserPersonalGoalRequest(requestData, res => {
        dispatch(hidePageLoader());
        ts("Your goal was successfully inserted.");
        this.setState({ showAddGoalAlert: false });
      })
    );
  };
}
const mapStateToProps = state => {
  const { userPersonalGoals } = state;
  return {
    loading: userPersonalGoals.get("loading"),
    error: userPersonalGoals.get("error")
  };
};

export default connect(mapStateToProps)(BadgesContent);
