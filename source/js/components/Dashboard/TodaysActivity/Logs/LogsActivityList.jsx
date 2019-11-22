import React, { Component } from "react";
import { routeCodes } from "../../../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LogsActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servingSize: 0
    };
  }
  componentDidMount() {
    const { measurement } = this.props;
    let newSize = measurement ? parseInt(measurement) : 0;
    this.setState({ servingSize: newSize });
  }

  render() {
    const { history, measurementTitle, measurement } = this.props;
    const { servingSize = 0 } = this.state;
    return (
      <React.Fragment>
        <li className="workout-list-items active d-flex">
          <div className="workout-content width-100-per">
            <div
              className="d-flex flex-wrap width-100-per align-items-center p-3"
              style={{
                background: "#201f60",
                borderRadius: "5px 5px 0 0"
              }}
            >
              <div
                className="title cursor-pointer text-capitalize"
                onClick={() => history.push(routeCodes.CALENDAR_OVERVIEW)}
              >
                {measurementTitle}
              </div>
              <i
                className="fad fa-trash ml-auto"
                style={{ color: "#FE676D" }}
              />
            </div>
            <div className="is-complete p-2">
              <div className="row no-gutters">
                <div className="col-md-6">
                  <div className="serving-boxs width-100-per m-0 pr-1">
                    <button
                      className="btn btn-minus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize > 0 && servingSize < 999
                              ? servingSize - 1
                              : servingSize
                        })
                      }
                    >
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <input
                      type="number"
                      name="servingSize"
                      className="form-control"
                      value={servingSize}
                      onChange={e =>
                        this.setState({
                          servingSize:
                            e.target.value >= 0 && e.target.value <= 999
                              ? e.target.value
                              : servingSize
                        })
                      }
                      max={999}
                      min={1}
                    />
                    <button
                      className="btn btn-plus"
                      onClick={() =>
                        this.setState({
                          servingSize:
                            servingSize >= 0 && servingSize < 999
                              ? servingSize + 1
                              : servingSize
                        })
                      }
                    >
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="serving-select width-100-per m-0 pl-1">
                    <select className="form-control">
                      <option>cm</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default LogsActivityList;
