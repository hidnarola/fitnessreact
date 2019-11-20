import React, { Component } from "react";
import { connect } from "react-redux";
import cns from "classnames";
import { addUserFavouriteBadgesRequest } from "../../../actions/userFavouriteBadges";
import _find from "lodash/find";

class BadgesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavourite: false
    };
  }
  componentDidMount() {
    const { badges } = this.props;
    this.checkHasFavourite(badges._id);
  }
  render() {
    const { isFavourite } = this.state;
    const { badges, selectedViewList, isDashboard = false } = this.props;
    const {
      _id,
      name,
      isCompleted,
      point,
      value,
      descriptionCompleted,
      descriptionInCompleted
    } = badges;

    return (
      <React.Fragment>
        <div className="badges-card">
          <div className="badges-title">
            {name}
            <div className="d-flex align-items-center ml-auto">
              <i
                className={cns("fa fa-star", { active: isFavourite })}
                onClick={() => this.handleAddFavouriteBadges(_id)}
              />
            </div>
          </div>
          <div className="badges-card-body">
            {isCompleted === 1
              ? descriptionCompleted
              : descriptionInCompleted
                ? descriptionInCompleted
                : "Badge Description."}
          </div>
          {!isDashboard && (
            <div className="badges-footer">
              {/* {isCompleted === 1 && <i className="fad fa-shield-check" />} */}
              {isCompleted === 1 && (
                <div className="d-flex align-items-center">
                  <i className="fad fa-shield-check check" /> Completed
                </div>
              )}
            </div>
          )}
          {isDashboard && (
            <div className="badges-footer">
              {value + "/" + point} workouts {isCompleted === 1 && "Completed "}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
  checkHasFavourite = badges_Id => {
    const { favouriteBadgesList } = this.props;
    if (favouriteBadgesList && favouriteBadgesList.length > 0) {
      var check = _find(favouriteBadgesList, { badgesId: badges_Id });
      if (check) {
        this.setState({ isFavourite: check.isFavourite });
      }
    }
  };

  handleAddFavouriteBadges = badgesID => {
    this.setState({ isFavourite: !this.state.isFavourite }, async () => {
      const { dispatch } = this.props;
      const requestData = {
        badges_Id: badgesID,
        isFavourite: this.state.isFavourite
      };
      await dispatch(addUserFavouriteBadgesRequest(requestData));
    });
  };
}
const mapStateToProps = state => {
  const { userFavouriteBadges } = state;
  return {
    favouriteBadgesList: userFavouriteBadges.get("badges")
  };
};

export default connect(mapStateToProps)(BadgesCard);
