import React, { Component } from "react";
import { connect } from "react-redux";
import FitnessHeader from "../global/FitnessHeader";
import FitnessNav from "../global/FitnessNav";
import { viewUserPublicProgramRequest } from "../../actions/userPrograms";
import { routeCodes } from "../../constants/routes";
import { te } from "../../helpers/funs";
import _ from "lodash";
import { FaEye } from "react-icons/lib/fa";
import { getProgramsNameRequest } from "../../actions/userScheduleWorkouts";
import {
  SCHEDULED_WORKOUT_TYPE_RESTDAY,
  SCHEDULED_WORKOUT_TYPE_EXERCISE
} from "../../constants/consts";
import cns from "classnames";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import AddMetaDescription from "../global/AddMetaDescription";
import { Scrollbars } from "react-custom-scrollbars";

class ProgramView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
      workouts: [],
      totalDays: 7,
      activeViewTab: "grid"
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    this.getProgramWorkoutSchedules();
    dispatch(getProgramsNameRequest());
  }

  render() {
    const { program, totalDays, workouts, activeViewTab } = this.state;
    return (
      <React.Fragment>
        <div className="fitness-body">
          <AddMetaDescription>
            <title>Fitly</title>
          </AddMetaDescription>
          <FitnessHeader
            enableBackLink={true}
            routes={routeCodes.LOCKER_EXERCISE}
            text="locker"
          />
          <FitnessNav />
          <section className="body-wrap nutrition-todays-meal-section locker-section">
            <div className="tab-content">
              <div className="content active">
                <div className="body-head d-flex justify-content-start front-white-header with-tabs custome_header">
                  <div className="body-head-l p-3">
                    <div className="display-date">
                      <span className="date-text ml-4">
                        Workout Plan{" "}
                        {program && program.name && ` - ${program.name}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overview-navbar overview-calendar-navbar">
                  <div className="ov-tabs">
                    <div className="ov-tab ml-auto active">
                      <a href="#">View</a>
                    </div>
                    <div className="ov-tab">
                      <div className="tabs ov-sub-tabs">
                        <div
                          className={cns("tab", {
                            active: activeViewTab === "columns"
                          })}
                          onClick={() =>
                            this.setState({ activeViewTab: "columns" })
                          }
                        >
                          <a href="#">
                            <i className="fad fa-bars" />
                          </a>
                        </div>
                        <div
                          className={cns("tab", {
                            active: activeViewTab === "grid"
                          })}
                          onClick={() =>
                            this.setState({ activeViewTab: "grid" })
                          }
                        >
                          <a href="#">
                            <i className="fad fa-th" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="ov-tab">
                      <div className="total-day-list">
                        {totalDays && `< Day 1 - ${totalDays} >`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body-content flex col-md-12 h-100 mt-3 locker">
                  <div className="p-unset">
                    <div
                      id="cal-panel-wrap"
                      className="space-btm-20 my-custom-calendar my-workoutplan-calendar"
                    >
                      <div
                        className="profile-body programs-table-wrapper workouts-programs-table"
                        data-for="custom-cut-workout-wrap "
                        data-tip
                      >
                        <Scrollbars autoHide>
                          <CustomDaysCalendarView
                            programId={program ? program._id : null}
                            totalDays={totalDays}
                            workouts={workouts}
                          />
                        </Scrollbars>
                      </div>

                      <div
                        id="custom-drag-workout-wrap"
                        style={{ position: "absolute", minWidth: 178 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
      // <div className="fitness-body">
      //     <FitnessHeader />
      //     <FitnessNav />
      //     <section className="body-wrap">
      //         <div className="body-head d-flex justify-content-start front-white-header">
      //             {program && program.name &&
      //                 <div className="body-head-l title_edit_pop">
      //                     <h2>{program.name}</h2>
      //                     {program && program.description &&
      //                         <small dangerouslySetInnerHTML={{ __html: program.description }}></small>
      //                     }
      //                 </div>
      //             }
      //             <div className="body-head-r">
      //                 <NavLink
      //                     className="white-btn"
      //                     to={routeCodes.PROGRAMS}
      //                 >
      //                     <span>Back</span>
      //                     <i className="icon-arrow_back"></i>
      //                 </NavLink>
      //             </div>
      //         </div>
      //         <div className="body-content d-flex row justify-content-start">
      //             <div className="col-md-12">
      //                 <div className="white-box space-btm-20">
      //                     <div className="whitebox-body profile-body programs-table-wrapper">
      //                         <CustomDaysCalendarView
      //                             programId={(program) ? program._id : null}
      //                             totalDays={totalDays}
      //                             workouts={workouts}
      //                         />
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     </section>
      // </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { loading, program, error, history } = this.props;
    if (!loading && error && error.length > 0) {
      te("Something went wrong! please try again later.");
      history.push(routeCodes.PROGRAMS);
    }
    if (!loading && program && prevProps.program !== program) {
      var prog = program.programDetails ? program.programDetails : null;
      var works = program.workouts ? program.workouts : [];
      var lastDay = 1;
      if (works && works.length > 0) {
        lastDay = works[works.length - 1].day;
        lastDay++;
        works = _.map(works, w => {
          return _.assignIn({}, w, { isSelectedForBulkAction: false });
        });
      }
      var getNumberOfWeek = Math.ceil(lastDay / 7);
      var totalDaysToGenerate = getNumberOfWeek * 7;
      if (prog) {
        this.setState({
          program: prog,
          workouts: works,
          totalDays: totalDaysToGenerate
        });
      } else {
        te("Something went wrong! please try again later.");
        history.push(routeCodes.PROGRAMS);
      }
    }
  }

  getProgramWorkoutSchedules = () => {
    const { match, dispatch } = this.props;
    if (match && match.params && match.params.id) {
      var _id = match.params.id;
      dispatch(viewUserPublicProgramRequest(_id));
    }
  };
}

const mapStateToProps = state => {
  const { userPrograms } = state;
  return {
    loading: userPrograms.get("loading"),
    program: userPrograms.get("program"),
    error: userPrograms.get("error")
  };
};

export default connect(mapStateToProps)(ProgramView);

class CustomDaysCalendarView extends Component {
  render() {
    const { totalDays, workouts } = this.props;
    var rows = totalDays / 7;
    var rowsObj = [];
    for (let index = 1; index <= rows; index++) {
      rowsObj.push(
        <CustomDaysCalendarRow
          rowNumber={index}
          key={index}
          workouts={workouts}
        />
      );
    }
    return (
      <div className="program-save-custom-days-wrapper">
        <div className="block-border-div" />
        <div className="block-border-div" />
        <div className="block-border-div" />
        <div className="block-border-div" />
        <div className="block-border-div" />
        <div className="block-border-div" />
        {rowsObj}
      </div>
    );
  }
}

class CustomDaysCalendarRow extends Component {
  render() {
    const { rowNumber, workouts } = this.props;
    var end = rowNumber * 7;
    var start = end - (7 - 1);
    var blockObj = [];
    for (let index = start; index <= end; index++) {
      blockObj.push(
        <CustomDaysCalendarBlock
          blockNumber={index}
          key={index}
          workouts={workouts}
        />
      );
    }
    return <div className="program-save-custom-days-row">{blockObj}</div>;
  }
}

class CustomDaysCalendarBlock extends Component {
  render() {
    const { blockNumber, workouts } = this.props;
    var findDay = blockNumber - 1;
    var events = _.filter(workouts, { day: findDay });
    return (
      <div className="program-save-custom-days-block">
        <div className="program-save-custom-days-block-title">
          Day {blockNumber}
        </div>
        <div className="program-save-custom-days-block-content">
          {events &&
            events.length > 0 && (
              <div className="program-event-block-main-wrapper">
                {events.map((e, i) => {
                  return (
                    <div
                      className={cns("program-event-block-wrapper", {
                        restday: e.type === SCHEDULED_WORKOUT_TYPE_RESTDAY
                      })}
                      key={i}
                    >
                      <div className="program-event-block-title">
                        <div className="pull-left custom_check">
                          <label>
                            <h5 className="">{e.title ? e.title : ""}</h5>
                          </label>
                        </div>
                      </div>
                      <div className="program-event-block-content">
                        <p>{e.description ? e.description : ""}</p>
                        {e.type === SCHEDULED_WORKOUT_TYPE_EXERCISE && (
                          <NavLink
                            to={routeCodes.VIEW_PROGRAM_SCHEDULE_WORKOUT.replace(
                              ":id",
                              e.programId
                            ).replace(":workout_id", e._id)}
                            data-tip="Details"
                            title=""
                          >
                            <FaEye />
                          </NavLink>
                        )}
                      </div>
                      <ReactTooltip place="top" type="dark" effect="solid" />
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    );
  }
}
