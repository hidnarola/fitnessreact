import React, { Component } from "react";
import Collapse from "react-bootstrap/lib/Collapse";
import { Scrollbars } from "react-custom-scrollbars";
import cns from "classnames";
import _filter from "lodash/filter";
import _matches from "lodash/matches";

class PhotosViewSidebar extends Component {
  state = {
    toogleIsolation: false,
    isolation: [
      { title: "Neck", checked: true },
      { title: "Shoulders", checked: true },
      { title: "Biceps", checked: true },
      { title: "Triceps", checked: true },
      { title: "Forearm", checked: true }
    ]
  };
  handleChangeStatus = index => {
    let { isolation } = this.state;
    isolation[index].checked = !isolation[index].checked;
    this.setState({ isolation });
  };
  render() {
    const { toogleIsolation, isolation } = this.state;
    const filterIsolation = _filter(isolation, _matches({ checked: false }));
    const filterIsolation1 = _filter(isolation, _matches({ checked: true }));
    let displayIsolationStatus;
    if (filterIsolation.length === isolation.length) {
      displayIsolationStatus = "empty";
    } else if (filterIsolation1.length === isolation.length) {
      displayIsolationStatus = "all";
    } else {
      displayIsolationStatus = "selected";
    }
    console.log("===========displayIsolationStatus===========");
    console.log(displayIsolationStatus);
    console.log("==========================");
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
                <i
                  className={cns("mr-2", {
                    "fa fa-tilde": displayIsolationStatus === "selected",
                    "fad fa-times-circle": displayIsolationStatus === "empty",
                    "fad fa-check-circle": displayIsolationStatus === "all"
                  })}
                  style={
                    displayIsolationStatus === "selected"
                      ? { color: "#F6EF14" }
                      : displayIsolationStatus === "empty"
                        ? { color: "#FE858A" }
                        : { color: "#43F4E4" }
                  }
                />
                Isolation <i className="fad fa-caret-down ml-auto" />
              </li>
              <Collapse in={toogleIsolation}>
                <div className="display-list">
                  <div className="display-items-list">
                    <Scrollbars>
                      <ul className="toogle-dropdown">
                        {isolation.map((item, i) => (
                          <li key={i}>
                            {item.title}
                            <div className="custom_check">
                              <input
                                type="checkbox"
                                id={item.title}
                                name={item.title}
                                checked={item.checked}
                                onChange={() => this.handleChangeStatus(i)}
                              />
                              <label className="mb-0" htmlFor={item.title} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Scrollbars>
                  </div>
                </div>
              </Collapse>
              <li>
                <i
                  className="fad fa-times-circle mr-2"
                  style={{ color: "#FE858A" }}
                />
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
