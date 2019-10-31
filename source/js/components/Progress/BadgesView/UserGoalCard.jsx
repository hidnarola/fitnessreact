import React, { Component } from "react";

class UserGoalCard extends Component {
  render() {
    const { goal } = this.props;
    const { title, isCompleted, description } = goal;
    return (
      <React.Fragment>
        <div className="badges-card">
          <div className="badges-title">
            {title}{" "}
            {isCompleted === 1 && <i className="fad fa-shield-check ml-auto" />}
          </div>
          <div className="badges-card-body">
            {description ? description : "Goal Description"}
          </div>
          <div className="badges-footer">
            {isCompleted === 1 && "Completed "}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserGoalCard;
