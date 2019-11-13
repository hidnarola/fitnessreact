import React, { Component } from "react";
import TrophyIcon from "svg/tropy-icon.svg";
import moment from "moment";
import NoRecordFound from "./NoRecordFound";

class WidgetBadgesCard extends Component {
  render() {
    const { badges, bodyWrapperClass } = this.props;
    return (
      <div className="white-box space-btm-30">
        {/* <div className="whitebox-head d-flex">
                    <h3 className="title-h3">Badges</h3>
                </div> */}
        <div className={bodyWrapperClass ? bodyWrapperClass : ""}>
          {badges &&
            badges.length > 0 &&
            badges.map((o, i) => <BadgesListCard key={i} badge={o} />)}
        </div>

        {(!badges || badges.length <= 0) && <NoRecordFound />}
      </div>
    );
  }
}

export default WidgetBadgesCard;

class BadgesListCard extends Component {
  render() {
    const { badge } = this.props;
    return (
      <div className="whitebox-body today-badges">
        <div className="customiser-box">
          <h3>
            <strong>Achievement</strong>{" "}
            {badge.point ? ` - ${badge.point}pts` : ""}
          </h3>
          <h5>{badge.name ? badge.name : ""}</h5>
          <p>{badge.descriptionCompleted ? badge.descriptionCompleted : ""}</p>
          <h4>
            <span>
              <i className="icon-check" />
            </span>
            <strong>Completed</strong>
            <small>
              {badge.createdAt
                ? moment(badge.createdAt).format("MMMM Do, YYYY")
                : ""}
            </small>
          </h4>
          <div className="tropy-icon-box">
            <TrophyIcon />
          </div>
        </div>
      </div>
    );
  }
}
