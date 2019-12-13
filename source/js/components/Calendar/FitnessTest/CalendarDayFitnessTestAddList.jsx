import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Star from "../../../../assets/svg/star.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import { getUserFitnessTestsRequest } from "../../../actions/userFitnessTests";
import { connect } from "react-redux";
import { te } from "../../../helpers/funs";
import moment from "moment";
import { FaCircleONotch } from "react-icons/lib/fa";

class CalendarDayFitnessTestAddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    var today = moment()
      .startOf("day")
      .utc();
    dispatch(getUserFitnessTestsRequest(today));
  }

  render() {
    const { searchResult } = this.state;
    const {
      isActiveQuickTab,
      allFitnessTest = [],
      userFitnessTestLoading,
      handleAddFitnessTest
    } = this.props;
    console.log("===========Hello===========");
    console.log("===========allFitnessTest===========");
    console.log("allFitnessTest", allFitnessTest, searchResult);
    console.log("==========================");
    const optionsList = allFitnessTest ? allFitnessTest : [];
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="blue_right_sidebar addfitnesstest-sidebar">
            <div className="d-flex width-100-per sidebar-header">
              <h2 className="h2_head_one pt-3 pb-3">Add Fitness Test</h2>

              <button
                className="btn bg-red btn-plus-right text-white ml-auto"
                onClick={() =>
                  this.props.handleSetActiveQuickTab(!isActiveQuickTab)
                }
              >
                <FontAwesomeIcon icon="times" />
              </button>
            </div>

            <div className="tab-content">
              <div className="recent-ingredient">
                <ul>
                  <li className="input-box-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search"
                      onChange={e =>
                        this.handleSearchExercise(e.target.value, optionsList)
                      }
                    />
                    <span className="search-icon">
                      <FontAwesomeIcon icon="search" />
                    </span>
                  </li>
                </ul>
                <Scrollbars autoHide>
                  <ul>
                    {userFitnessTestLoading && (
                      <li className="justify-content-center">
                        <h3 className="justify-content-center d-flex">
                          <FaCircleONotch
                            className="loader-spinner loader-spinner-icon mr-1"
                            style={{ top: "0px" }}
                          />
                          Loading...
                        </h3>
                      </li>
                    )}
                    {!userFitnessTestLoading && searchResult.length > 0
                      ? searchResult.map((item, k) => (
                          <li
                            onClick={() => handleAddFitnessTest(item)}
                            key={k}
                          >
                            <span className={"star_one active"}>
                              <Star />
                            </span>
                            <h3>{item.name}</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                        ))
                      : !userFitnessTestLoading &&
                        optionsList.length > 0 &&
                        optionsList.map((item, k) => (
                          <li
                            onClick={() => handleAddFitnessTest(item)}
                            key={k}
                          >
                            <span className={"star_one active"}>
                              <Star />
                            </span>
                            <h3>{item.name}</h3>
                            <div className="add_drag">
                              <FontAwesomeIcon icon="plus-circle" />
                            </div>
                          </li>
                        ))}
                  </ul>
                </Scrollbars>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { userFitnessTestLoading, fitnessTestError } = this.props;
    if (
      !userFitnessTestLoading &&
      prevProps.fitnessTestError !== fitnessTestError &&
      fitnessTestError.length > 0
    ) {
      te();
    }
  }

  handleSearchExercise = (search, array) => {
    var options = {
      keys: ["name"],
      threshold: 0.1,
      tokenize: true
    };
    var fuse = new Fuse(array, options);
    const result = fuse.search(search);
    this.setState({ searchResult: result });
  };
}
const mapStateToProps = state => {
  const { userFitnessTests } = state;
  return {
    userFitnessTestLoading: userFitnessTests.get("loading"),
    allFitnessTest: userFitnessTests.get("allFitnessTest"),
    fitnessTestError: userFitnessTests.get("error")
  };
};

export default connect(mapStateToProps)(CalendarDayFitnessTestAddList);
