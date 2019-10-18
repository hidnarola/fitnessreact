import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route, Link } from "react-router-dom";
import FitnessHeader from "../components/global/FitnessHeader";
import FitnessNav from "../components/global/FitnessNav";
import { routeCodes } from "../constants/routes";
import ExerciseView from "../components/Progress/ExerciseView";
import BodyFat from "../components/Progress/BodyFat";
import Mobility from "../components/Progress/Mobility";
import Muscle from "../components/Progress/Muscle";
import Strength from "../components/Progress/Strength";
import Endurance from "../components/Progress/Endurance";
import DateRangePicker from "react-daterange-picker";
import moment from "moment";
import { setUserProgresDateRange } from "../actions/userProgress";
import DateRangePickerCustomPeriod from "../components/Common/DateRangePickerCustomPeriod";
import { IDB_TBL_PROGRESS, IDB_READ_WRITE } from "../constants/idb";
import { connectIDB, isOnline, tw } from "../helpers/funs";
import AddMetaDescription from "../components/global/AddMetaDescription";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    };
    this.iDB;
  }

  componentWillMount() {
    const { dispatch, match, history } = this.props;
    if (match.isExact) {
      history.push(routeCodes.PROGRESS_OVERVIEW);
    } else {
      var dateRange = moment.range(
        moment()
          .subtract(12, "month")
          .startOf("day")
          .utc(),
        moment()
          .startOf("day")
          .utc()
      );
      dispatch(setUserProgresDateRange(dateRange));
    }
  }

  render() {
    const { showSearch } = this.state;
    const { dateRange } = this.props;
    return (
      <div className="stat-page">
        <AddMetaDescription>
          <title>Progress | Fitly</title>
        </AddMetaDescription>
        <FitnessHeader />
        <FitnessNav />
        <section className="body-wrap nutrition-todays-meal-section">
          <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
            <div className="body-head-l p-3">
              <div className="display-date">
                <div className="tabs ml-4">
                  <div className="tab">
                    <NavLink to={routeCodes.PROGRESS_OVERVIEW}>
                      Overview
                    </NavLink>
                  </div>
                  <div className="tab">
                    <NavLink to={routeCodes.PROGRESS_EXERCISE}>
                      Exercise
                    </NavLink>
                  </div>
                  <div className="tab">
                    <NavLink to={routeCodes.PROGRESS_BODY}>Body</NavLink>
                  </div>
                  <div className="tab">
                    <NavLink to={routeCodes.PROGRESS_PHOTOS_VIEW}>
                      Photos
                    </NavLink>
                  </div>
                </div>
                <span className="date-text ml-auto mr-4">Progress</span>
              </div>
            </div>
            {/* {dateRange && (
              <div className="body-head-r">
                <a
                  href="javascript:void(0)"
                  onClick={this.handleOpenCalendar}
                  className="pink-btn"
                >
                  {`${dateRange.start
                    .local()
                    .format("DD/MM/YYYY")} - ${dateRange.end
                    .local()
                    .format("DD/MM/YYYY")}`}
                  <i className="icon-date_range" />
                </a>
              </div>
            )} */}
          </div>
          {/* <div className="body-head-l-btm profile-new-menu">
            <NavLink
              activeClassName="pink-btn-new"
              className="white-btn"
              exact
              to={routeCodes.PROGRESS_BODY_FAT}
            >
              Body Fat
            </NavLink>
            <NavLink
              activeClassName="pink-btn-new"
              className="white-btn"
              exact
              to={routeCodes.PROGRESS_MOBILITY}
            >
              Mobility
            </NavLink>
            <NavLink
              activeClassName="pink-btn-new"
              className="white-btn"
              exact
              to={routeCodes.PROGRESS_MUSCLE}
            >
              Muscle
            </NavLink>
            <NavLink
              activeClassName="pink-btn-new"
              className="white-btn"
              exact
              to={routeCodes.PROGRESS_STRENGTH}
            >
              Strength
            </NavLink>
            <NavLink
              activeClassName="pink-btn-new"
              className="white-btn"
              exact
              to={routeCodes.PROGRESS_ENDURANCE}
            >
              Endurance
            </NavLink>
          </div> */}

          {/* {showSearch &&
                        <div className="progress-date-range-picker custom_date_pdl">
                            <DateRangePickerCustomPeriod
                                dateRange={dateRange}
                                changeCallback={this.handleCustomDateRange}
                            />
                            <DateRangePicker
                                firstOfWeek={1}
                                numberOfCalendars={2}
                                selectionType='range'
                                value={dateRange}
                                onSelect={this.handleTimeDateRange}
                                className="progress-date-range"
                            />
                        </div>
                    } */}
          <div className="mt-3">

            <Switch>
              <Route
                exact
                path={routeCodes.PROGRESS_EXERCISE}
                component={ExerciseView}
              />
              <Route
                exact
                path={routeCodes.PROGRESS_BODY_FAT}
                component={BodyFat}
              />
              <Route
                exact
                path={routeCodes.PROGRESS_MOBILITY}
                component={Mobility}
              />
              <Route
                exact
                path={routeCodes.PROGRESS_MUSCLE}
                component={Muscle}
              />
              <Route
                exact
                path={routeCodes.PROGRESS_STRENGTH}
                component={Strength}
              />
              <Route
                exact
                path={routeCodes.PROGRESS_ENDURANCE}
                component={Endurance}
              />
            </Switch>
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {
    connectIDB()().then(connection => {
      this.handleIDBOpenSuccess(connection);
    });
  }

  handleIDBOpenSuccess = connection => {
    this.iDB = connection.result;
  };

  componentDidUpdate(prevProps, prevState) {
    const { match, history } = this.props;
    if (match.isExact) {
      history.push(routeCodes.PROGRESS_BODY_FAT);
    }
  }

  handleOpenCalendar = () => {
    const { showSearch } = this.state;
    if (isOnline()) {
      this.setState({ showSearch: !showSearch });
    } else {
      tw("You are offline, please check your internet connection");
    }
  };

  handleTimeDateRange = (range, state) => {
    const { dispatch } = this.props;
    dispatch(setUserProgresDateRange(range));
    this.setState({ showSearch: false });
  };

  handleCustomDateRange = (start, end) => {
    const { dispatch } = this.props;
    let range = moment.range(start, end);
    dispatch(setUserProgresDateRange(range));
    this.setState({ showSearch: false });
  };

  componentWillUnmount() {
    try {
      const idbs = [IDB_TBL_PROGRESS];
      if (isOnline()) {
        const transaction = this.iDB.transaction(idbs, IDB_READ_WRITE);
        if (transaction) {
          const osProgress = transaction.objectStore(IDB_TBL_PROGRESS);
          osProgress.clear();
        }
      }
      this.iDB.close();
    } catch (error) {}
  }
}

const mapStateToProps = state => {
  const { userProgress } = state;
  return {
    dateRange: userProgress.get("dateRange")
  };
};

export default connect(mapStateToProps)(Progress);
