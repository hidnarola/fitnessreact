import React from "react";
import { ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/lib/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CaledarDayWorkoutAdvanceView = props => {
  const {
    setsDetails = [],
    sets,
    handleAddSetDetails,
    handleChangeSetsDetails,
    workoutIndex,
    handleRemoveSetDetails,
    type,
    field1Options = [],
    field2Options = [],
    handleChangeAdvanceSetDetsils
  } = props;
  const { field1, field2 } = setsDetails[0];
  const timeUnit = field1.unit;
  const speedUnit = field2.unit;
  console.log("===========field1Options===========");
  console.log(field1Options);
  console.log("==========================");
  return (
    <React.Fragment>
      <div className="excercise-content animated fadeIn">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th width="70" className="text-center">
                  Set
                </th>
                <th>
                  <div className="serving-select">
                    <label>Time</label>
                    <select
                      className="form-control"
                      name="time"
                      value={timeUnit}
                      onChange={e =>
                        handleChangeAdvanceSetDetsils(
                          workoutIndex,
                          0,
                          "field1",
                          e.target.value,
                          type
                        )
                      }
                    >
                      <option value="">Select</option>
                      {field1Options.map((item, v) => (
                        <option value={item.value} key={v}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th>
                  <div className="serving-select">
                    <label>Speed</label>
                    <select
                      className="form-control"
                      value={speedUnit}
                      onChange={e =>
                        handleChangeAdvanceSetDetsils(
                          workoutIndex,
                          0,
                          "field2",
                          e.target.value,
                          type
                        )
                      }
                    >
                      <option value="">Select</option>
                      {field2Options.map((item, v) => (
                        <option value={item.value} key={v}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th>
                  <div className="serving-select">
                    <label>Rest</label>
                    <select className="form-control">
                      <option>Seconds</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                </th>
                <th width="50">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {setsDetails.map((item, k) => (
                <tr key={k}>
                  <td className="text-center">{k + 1}</td>
                  <td>
                    <div className="serving-boxs">
                      <button
                        className="btn btn-minus"
                        onClick={() =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field1",
                            {
                              value: parseInt(item.field1.value) - 1,
                              unit: item.field1.unit
                            },
                            type
                          )
                        }
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        value={item.field1.value}
                        onChange={e =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field1",
                            {
                              value: parseInt(e.target.value),
                              unit: item.field1.unit
                            },
                            type
                          )
                        }
                      />
                      <button
                        className="btn btn-plus"
                        onClick={() =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field1",
                            {
                              value: parseInt(item.field1.value) + 1,
                              unit: item.field1.unit
                            },
                            type
                          )
                        }
                      >
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="serving-boxs">
                      <button
                        className="btn btn-minus"
                        onClick={() =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field2",
                            {
                              value: parseInt(item.field2.value) - 1,
                              unit: item.field2.unit
                            },
                            type
                          )
                        }
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <input
                        type="number"
                        className="form-control"
                        value={item.field2.value}
                        onChange={e =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field2",
                            {
                              value: parseInt(e.target.value),
                              unit: item.field2.unit
                            },
                            type
                          )
                        }
                      />
                      <button
                        className="btn btn-plus"
                        onClick={() =>
                          handleChangeSetsDetails(
                            workoutIndex,
                            0,
                            k,
                            "field2",
                            {
                              value: parseInt(item.field2.value) + 1,
                              unit: item.field2.unit
                            },
                            type
                          )
                        }
                      >
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                  </td>
                  {setsDetails.length - 1 !== k ? (
                    <td>
                      <div className="serving-boxs">
                        <button
                          className="btn btn-minus"
                          onClick={() =>
                            handleChangeSetsDetails(
                              workoutIndex,
                              0,
                              k,
                              "restTime",
                              parseInt(item.restTime) - 1,
                              type
                            )
                          }
                        >
                          <FontAwesomeIcon icon="minus" />
                        </button>
                        <input
                          type="number"
                          className="form-control"
                          value={item.restTime}
                          onChange={() =>
                            handleChangeSetsDetails(
                              workoutIndex,
                              0,
                              k,
                              "restTime",
                              parseInt(e.target.value),
                              type
                            )
                          }
                        />
                        <button
                          className="btn btn-plus"
                          onClick={() =>
                            handleChangeSetsDetails(
                              workoutIndex,
                              0,
                              k,
                              "restTime",
                              parseInt(item.restTime) + 1,
                              type
                            )
                          }
                        >
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td />
                  )}
                  <td
                    className="text-center red"
                    onClick={() =>
                      handleRemoveSetDetails(workoutIndex, 0, "warmup", k)
                    }
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colspan="5">
                  <button
                    className="btn-addset"
                    onClick={() =>
                      handleAddSetDetails(
                        workoutIndex,
                        0,
                        type,
                        timeUnit,
                        speedUnit
                      )
                    }
                  >
                    <FontAwesomeIcon icon="plus" />
                    <span>Add Set</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CaledarDayWorkoutAdvanceView;
