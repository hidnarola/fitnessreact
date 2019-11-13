import React, { Component } from "react";

class BadgesCard extends Component {
  render() {
    const { badges, selectedViewList } = this.props;
    const {
      name,
      isCompleted,
      point,
      descriptionCompleted,
      descriptionInCompleted
    } = badges;

    return (
      <React.Fragment>
        <div className="badges-card">
          <div className="badges-title">
            {name}{" "}
            {isCompleted === 1 && <i className="fad fa-shield-check ml-auto" />}
          </div>
          <div className="badges-card-body">
            {isCompleted === 1
              ? descriptionCompleted
              : descriptionInCompleted
                ? descriptionInCompleted
                : "Badge Description."}
          </div>
          <div className="badges-footer">
            {isCompleted === 1 && "Completed "}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgesCard;