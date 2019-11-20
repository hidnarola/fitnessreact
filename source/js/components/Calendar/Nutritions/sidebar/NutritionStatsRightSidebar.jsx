import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapse from "react-bootstrap/lib/Collapse";
import { PieChart, Pie, Sector, Cell } from "recharts";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

const data = [
  { name: "Group A", value: 450 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];
const COLORS = ["#201f60", "#3e67ff", "#93e7e4"];

const RADIAN = Math.PI / 180;

class NutritionStatsRightSidebar extends Component {
  state = {
    quickTab: "#macro",
    isallMeal: true,
    selectedMeal: "All Meals"
  };
  render() {
    const { quickTab, isallMeal, selectedMeal } = this.state;

    return (
      <React.Fragment>
        <div className={"blue_right_sidebar white_right_sidebar h-100"}>
          <div className="d-flex width-100-per sidebar-header">
            <h2 className="h2_head_one pt-3 pb-3">Stats</h2>
          </div>
          <div className="quick-tabs">
            <div
              className={quickTab === "#macro" ? "tab active" : "tab"}
              onClick={() => {
                this.setState({ quickTab: "#macro" });
              }}
            >
              <a href="#">Macro</a>
            </div>
            <div
              className={quickTab === "#micro" ? "tab active" : "tab"}
              onClick={() => {
                this.setState({ quickTab: "#micro" });
              }}
            >
              <a href="#">Micro</a>
            </div>
          </div>
          <div className="tab-content">
            <div className="recent-ingredient">
              {quickTab === "#micro" && <ul />}
              {quickTab === "#macro" && (
                <React.Fragment>
                  <ul>
                    <li style={{ padding: "0" }}>
                      <div className="display-select-menu">
                        <DropdownButton
                          title={selectedMeal}
                          key={1}
                          id={`dropdown-basic-${1}`}
                        >
                          <MenuItem
                            eventKey="1"
                            onClick={() =>
                              this.handleChangeMealType("All Meals")
                            }
                          >
                            All Meals
                          </MenuItem>
                          <MenuItem
                            eventKey="2"
                            onClick={() =>
                              this.handleChangeMealType("Break Fast")
                            }
                          >
                            Break Fast
                          </MenuItem>
                          <MenuItem
                            eventKey="3"
                            onClick={() => this.handleChangeMealType("Lunch")}
                          >
                            Lunch
                          </MenuItem>
                          <MenuItem
                            eventKey="3"
                            onClick={() => this.handleChangeMealType("Dinner")}
                          >
                            Dinner
                          </MenuItem>
                          <MenuItem
                            eventKey="3"
                            onClick={() => this.handleChangeMealType("Snacks")}
                          >
                            Snacks
                          </MenuItem>
                        </DropdownButton>
                      </div>
                    </li>

                    <li className="d-flex width-100-per justify-content-center">
                      <div>Calories</div>
                      <div className="ml-auto">1350 kcal</div>
                      <div>
                        <PieChart
                          width={330}
                          height={249}
                          onMouseEnter={this.onPieEnter}
                        >
                          <Pie
                            dataKey="value"
                            data={data}
                            cx={150}
                            cy={120}
                            innerRadius={60}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={5}
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                      <div className="progress-wrap width-100-per">
                        <div className="d-flex flex-wrap width-100-per display-status">
                          <div className="nutrition-progress">
                            <div className="nutrition-title">
                              <span style={{ background: COLORS[0] }} />
                              <label>Carbohydrates</label>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{
                                  width: `60%`,
                                  background: COLORS[0]
                                }}
                                aria-valuenow={60}
                                aria-valuemin="0"
                                aria-valuemax={2000}
                              />
                            </div>
                          </div>
                          <div className="ml-auto d-flex align-items-center">
                            <p className="m-0">4/50g</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap width-100-per display-status">
                          <div className="nutrition-progress">
                            <div className="nutrition-title">
                              <span style={{ background: COLORS[1] }} />
                              <label>Fat</label>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{
                                  width: `60%`,
                                  background: COLORS[1]
                                }}
                                aria-valuenow={60}
                                aria-valuemin="0"
                                aria-valuemax={2000}
                              />
                            </div>
                          </div>
                          <div className="ml-auto d-flex align-items-center">
                            <p className="m-0">4/50g</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap width-100-per display-status">
                          <div className="nutrition-progress">
                            <div className="nutrition-title">
                              <span style={{ background: COLORS[2] }} />
                              <label>Sugar</label>
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{
                                  width: `60%`,
                                  background: COLORS[2]
                                }}
                                aria-valuenow={60}
                                aria-valuemin="0"
                                aria-valuemax={2000}
                              />
                            </div>
                          </div>
                          <div className="ml-auto d-flex align-items-center">
                            <p className="m-0">4/50g</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleChangeMealType = action => {
    this.setState({ selectedMeal: action });
  };
}

export default NutritionStatsRightSidebar;
