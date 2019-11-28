import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import WorkoutPlanList from "./WorkoutPlanList";
import { connect } from "react-redux";
import { getUserProgramsRequest } from "../../../actions/userPrograms";
import { PROGRAM_PUBLIC } from "../../../constants/consts";
import { FaCircleONotch } from "react-icons/lib/fa";

class WorkoutPlanDisplayAllList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: {
        search: "",
        searchColumns: ["name"],
        sort: {},
        noOfRecords: 50,
        startFrom: 0,
        condition: props.condition
      }
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { filterData } = this.state;
    dispatch(getUserProgramsRequest(filterData));
  }
  render() {
    const { loading, programs } = this.props;
    return (
      <React.Fragment>
        <Scrollbars autoHide>
          <div className="locker-exercise-list">
            {loading && (
              <div className="loader ml-3 mr-3" key={0}>
                <FaCircleONotch className="loader-spinner loader-spinner-icon mr-1" />
                Loading ...
              </div>
            )}
            {!loading && (
              <ul className="locker-exercise-items">
                {programs &&
                  programs.length > 0 &&
                  programs.map((item, i) => (
                    <WorkoutPlanList program={item} key={i} />
                  ))}
              </ul>
            )}
          </div>
        </Scrollbars>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { userPrograms } = state;
  return {
    loading: userPrograms.get("loading"),
    programs: userPrograms.get("programs")
  };
};

export default connect(mapStateToProps)(WorkoutPlanDisplayAllList);
