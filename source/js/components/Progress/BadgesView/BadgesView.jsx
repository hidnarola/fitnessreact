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

class BadgesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedViewList: "all",
      badgesList: [],
      badges: []
    };
  }
  render() {
    const { badgesList, selectedViewList } = this.state;
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
                  handleChangeState={this.handleChangeState}
                  handleChangeStatus={this.handleChangeStatus}
                />
              </div>
              <div className="col-xs-12 col-md-9">
                <Scrollbars autoHide>
                  <BadgesContent
                    badgesList={badgesList}
                    selectedViewList={selectedViewList}
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
  }
  componentDidUpdate(prevProps, prevState) {
    const { dispatch, loading, badges, error } = this.props;
    if (loading) {
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
      te("Something went wrong! please try again later.");
      dispatch(hidePageLoader());
    }
  }

  handleChangeStatus = index => {
    let { badgesList } = this.state;
    badgesList[index].checked = !badgesList[index].checked;
    this.setState({ badgesList });
  };
  handleChangeState = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };
}
const mapStateToProps = state => {
  const { userBadges } = state;
  return {
    loading: userBadges.get("loading"),
    badges: userBadges.get("badges"),
    error: userBadges.get("error")
  };
};

export default connect(mapStateToProps)(BadgesView);
