import React, { Component } from "react";
import Collapse from "react-bootstrap/lib/Collapse";
import { Scrollbars } from "react-custom-scrollbars";

class PhotosViewSidebar extends Component {
  state = {
    toogleIsolation: false
  };
  render() {
    const { toogleIsolation } = this.state;
    return (
      <React.Fragment>
        <div className="exerciseview-sidebar h-100">
          <div className="serving-select p-2 width-100-per">
            <select className="form-control">
              <option>This month</option>
              <option>Last month</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="subtitle">Exercises with data for period:</div>
          <div className="progress-exercise-list">
            <ul>
              <li>
                Full Body{" "}
                <div className="custom_check">
                  <input
                    type="checkbox"
                    id={"display_all_nutrition"}
                    name={"display_all_nutrition"}
                    defaultChecked={false}
                    onChange={() => console.log("")}
                  />
                  <label className="mb-0" htmlFor="display_all_nutrition" />
                </div>
              </li>
              <li
                onClick={() =>
                  this.setState({ toogleIsolation: !toogleIsolation })
                }
              >
                <i className="fa fa-tilde mr-2" style={{ color: "#F6EF14" }} />{" "}
                Isolation <i className="fad fa-caret-down ml-auto" />
              </li>
              <Collapse in={toogleIsolation}>
                <div className="display-list">
                  <div className="display-items-list">
                    <Scrollbars>
                      <ul className="toogle-dropdown">
                        <li>
                          Neck{" "}
                          <div className="custom_check">
                            <input
                              type="checkbox"
                              id={"display_isolation1"}
                              name={"display_isolation1"}
                              defaultChecked={true}
                              onChange={() => console.log("")}
                            />
                            <label
                              className="mb-0"
                              htmlFor="display_isolation1"
                            />
                          </div>
                        </li>
                        <li>
                          Shoulders{" "}
                          <div className="custom_check">
                            <input
                              type="checkbox"
                              id={"display_isolation2"}
                              name={"display_isolation2"}
                              defaultChecked={true}
                              onChange={() => console.log("")}
                            />
                            <label
                              className="mb-0"
                              htmlFor="display_isolation2"
                            />
                          </div>
                        </li>
                        <li>
                          Biceps{" "}
                          <div className="custom_check">
                            <input
                              type="checkbox"
                              id={"display_isolation3"}
                              name={"display_isolation3"}
                              defaultChecked={false}
                              onChange={() => console.log("")}
                            />
                            <label
                              className="mb-0"
                              htmlFor="display_isolation3"
                            />
                          </div>
                        </li>
                        <li>
                          Triceps{" "}
                          <div className="custom_check">
                            <input
                              type="checkbox"
                              id={"display_isolation4"}
                              name={"display_isolation4"}
                              defaultChecked={true}
                              onChange={() => console.log("")}
                            />
                            <label
                              className="mb-0"
                              htmlFor="display_isolation4"
                            />
                          </div>
                        </li>
                        <li>
                          Forearm{" "}
                          <div className="custom_check">
                            <input
                              type="checkbox"
                              id={"display_isolation5"}
                              name={"display_isolation5"}
                              defaultChecked={false}
                              onChange={() => console.log("")}
                            />
                            <label
                              className="mb-0"
                              htmlFor="display_isolation5"
                            />
                          </div>
                        </li>
                      </ul>
                    </Scrollbars>
                  </div>
                </div>
              </Collapse>
              <li>
                <i className="fa fa-times mr-2" style={{ color: "#FE858A" }} />
                Posed <i className="fad fa-caret-right ml-auto" />
              </li>
              <li>
                Lifestyle{" "}
                <div className="custom_check">
                  <input
                    type="checkbox"
                    id={"display_lifestyle"}
                    name={"display_lifestyle"}
                    defaultChecked={true}
                    onChange={() => console.log("")}
                  />
                  <label className="mb-0" htmlFor="display_lifestyle" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PhotosViewSidebar;
