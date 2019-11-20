import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import BadgesSidebar from "./BadgesSidebar";
import BadgesContent from "./BadgesContent";
import { getUserBadgesByTypeRequest } from "../../../actions/userBadges";
import { BADGE_TYPE_TRACKING } from "../../../constants/consts";
import { showPageLoader, hidePageLoader } from "../../../actions/pageLoader";
import _replace from "lodash/replace";
import _lowerCase from "lodash/lowerCase";
import { te } from "../../../helpers/funs";
import { getUserPersonalGoalRequest } from "../../../actions/userPersonalGoals";
import { getUserFavouriteBadgesRequest } from "../../../actions/userFavouriteBadges";

class BadgesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserViewList: "you",
      selectedViewList: "all",
      badgesList: [],
      badges: [],
      personalGoalsList: []
    };
  }
  render() {
    const {
      badgesList,
      selectedViewList,
      selectedUserViewList,
      personalGoalsList
    } = this.state;
    console.log("===========badgesList===========");
    console.log(badgesList);
    console.log("==========================");
    return (
      <React.Fragment>
        <div className="body-content exerciseview badgesView h-100">
          <div
            className="whitebox-body exerciseview-body badges-body h-100"
            style={{ borderRadius: "5px", overflow: "hidden" }}
          >
            <div className="row no-gutters h-100">
              <div className="col-xs-12 col-md-3">
                <BadgesSidebar
                  badgesList={badgesList}
                  selectedViewList={selectedViewList}
                  selectedUserViewList={selectedUserViewList}
                  handleChangeState={this.handleChangeState}
                  handleChangeStatus={this.handleChangeStatus}
                  personalGoalsList={personalGoalsList}
                />
              </div>
              <div className="col-xs-12 col-md-9">
                <Scrollbars autoHide>
                  <BadgesContent
                    badgesList={badgesList}
                    selectedUserViewList={selectedUserViewList}
                    selectedViewList={selectedViewList}
                    personalGoalsList={personalGoalsList}
                  />
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserBadgesByTypeRequest(BADGE_TYPE_TRACKING));
    const isCompleted = 1;
    const start = 0;
    const offset = 20;
    dispatch(getUserPersonalGoalRequest(isCompleted, start, offset));
    dispatch(getUserFavouriteBadgesRequest());
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      dispatch,
      loading,
      badges,
      error,
      perGoalLoading,
      perGoals,
      perGoalError,
      goal,
      favouriteBadgesLoading,
      favouriteBadgesError,
      favouriteBadges
    } = this.props;
    const { badgesList } = this.state;

    if (prevState.badgesList !== badgesList) {
    }
    if (loading || perGoalLoading) {
      dispatch(showPageLoader());
    }
    if (!loading && prevProps.badges !== badges) {
      dispatch(hidePageLoader());
      let newBadgesList = [];
      badges.length > 0 &&
        badges.forEach(item =>
          newBadgesList.push({
            title: _lowerCase(_replace(item.category, "_", " ")),
            badges: item.badges,
            cat: item.category,
            checked: true
          })
        );

      this.setState({ badges, badgesList: newBadgesList });
    }
    if (!loading && prevProps.error !== error) {
      te();
      dispatch(hidePageLoader());
    }
    if (!loading && prevProps.goal !== goal) {
      const isCompleted = 1;
      const start = 0;
      const offset = 20;
      dispatch(getUserPersonalGoalRequest(isCompleted, start, offset));
    }
    if (!perGoalLoading && prevProps.perGoals !== perGoals) {
      let newPersonalGoalList = [];
      perGoals.length > 0 &&
        perGoals.forEach(item =>
          newPersonalGoalList.push({
            title: _lowerCase(_replace(item.category, "_", " ")),
            goals: item.goals,
            cat: item.category,
            checked: true
          })
        );
      this.setState({ personalGoalsList: newPersonalGoalList });
      dispatch(hidePageLoader());
    }
    if (!perGoalLoading && prevProps.perGoalError !== perGoalError) {
      te();
      dispatch(hidePageLoader());
    }
    if (
      !favouriteBadgesLoading &&
      prevProps.favouriteBadges !== favouriteBadges
    ) {
      dispatch(hidePageLoader());
    }
    if (
      !favouriteBadgesLoading &&
      prevProps.favouriteBadgesError !== favouriteBadgesError &&
      favouriteBadgesError.length > 0
    ) {
      dispatch(hidePageLoader());
      te();
    }
  }

  handleChangeStatus = (list, index) => {
    if (list === "badgesList") {
      let { badgesList } = this.state;
      var _badgesList = Object.create(badgesList);
      _badgesList[index].checked = !_badgesList[index].checked;
      this.setState({ badgesList: _badgesList });
    } else {
      let { personalGoalsList } = this.state;
      var _personalGoalsList = Object.create(personalGoalsList);
      _personalGoalsList[index].checked = !_personalGoalsList[index].checked;
      this.setState({ personalGoalsList: _personalGoalsList });
    }
  };
  handleChangeState = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };
}
const mapStateToProps = state => {
  const { userBadges, userPersonalGoals, userFavouriteBadges } = state;
  return {
    loading: userBadges.get("loading"),
    badges: userBadges.get("badges"),
    error: userBadges.get("error"),
    perGoalLoading: userPersonalGoals.get("loading"),
    perGoals: userPersonalGoals.get("goals"),
    goal: userPersonalGoals.get("goal"),
    perGoalError: userPersonalGoals.get("error"),
    favouriteBadgesLoading: userFavouriteBadges.get("loading"),
    favouriteBadges: userFavouriteBadges.get("badges"),
    favouriteBadgesError: userFavouriteBadges.get("error")
  };
};

export default connect(mapStateToProps)(BadgesView);
