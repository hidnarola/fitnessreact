import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CalendarNewWorkoutView = props => {
  const {
    setsDetails,
    sets,
    handelChange,
    handleChangeInput,
    handleChangeSetsDetails,
    workoutIndex,
    exerciseType,
    field1Options = [],
    field2Options = [],
    type
  } = props;
  console.log("===========VIEW===========");
  console.log(setsDetails);
  console.log("==========================");
  const { field1, field2, restTime, restTimeUnit } = setsDetails[0];
  const time = field1.value;
  const timeUnit = field1.unit;
  const speed = field2.value;
  const speedUnit = field2.unit;
  return (
    <React.Fragment>
      <div className="excercise-content  animated fadeIn">
        <div className="row no-gutters">
          <div className="col-xs-12 col-lg-3">
            <span className="warmup-title">Sets:</span>
          </div>
          <div className="col-xs-12 col-lg-4">
            <div className="serving-boxs">
              <button
                className="btn btn-minus"
                onClick={() =>
                  sets > 1 &&
                  handleChangeInput(
                    workoutIndex,
                    0,
                    "sets",
                    parseInt(sets) - 1,
                    type
                  )
                }
              >
                <FontAwesomeIcon icon="minus" />
              </button>
              <input
                type="number"
                className="form-control"
                value={sets}
                onChange={e =>
                  e.target.value > 0 &&
                  handleChangeInput(
                    workoutIndex,
                    0,
                    "sets",
                    e.target.value,
                    type
                  )
                }
              />
              <button
                className="btn btn-plus"
                onClick={() =>
                  handleChangeInput(
                    workoutIndex,
                    0,
                    "sets",
                    parseInt(sets) + 1,
                    type
                  )
                }
              >
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
        </div>
        {sets > 1 && (
          <div className="row no-gutters">
            <div className="col-xs-12 col-lg-3">
              <span className="warmup-title">Rest:</span>
            </div>
            <div className="col-xs-12 col-lg-4">
              <div className="serving-boxs">
                <button
                  className="btn btn-minus"
                  onClick={() =>
                    handleChangeSetsDetails(
                      workoutIndex,
                      0,
                      0,
                      "restTime",
                      parseInt(restTime) - 1,
                      type
                    )
                  }
                >
                  <FontAwesomeIcon icon="minus" />
                </button>
                <input
                  type="number"
                  className="form-control"
                  value={restTime}
                  onChange={e =>
                    handleChangeSetsDetails(
                      workoutIndex,
                      0,
                      0,
                      "restTime",
                      e.target.value,
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
                      0,
                      "restTime",
                      parseInt(restTime) + 1,
                      type
                    )
                  }
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
              </div>
            </div>
            <div className="col-xs-12 col-lg-4">
              <div className="serving-select">
                <select
                  className="form-control"
                  value={restTimeUnit}
                  onChange={e =>
                    handleChangeSetsDetails(
                      workoutIndex,
                      0,
                      0,
                      "restTimeUnit",
                      e.target.value,
                      type
                    )
                  }
                >
                  <option value="second">Seconds</option>
                  <option value="minute">Minutes</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="row no-gutters">
          <div className="col-xs-12 col-lg-3">
            <span className="warmup-title">Time:</span>
          </div>
          <div className="col-xs-12 col-lg-4">
            <div className="serving-boxs">
              <button
                className="btn btn-minus"
                onClick={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field1",
                    {
                      value: parseInt(time) - 1,
                      unit: timeUnit
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
                value={time}
                onChange={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field1",
                    {
                      value: parseInt(e.target.value),
                      unit: timeUnit
                    },
                    type
                  )
                }
              />
              <button
                className="btn btn-plus"
                onClick={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field1",
                    {
                      value: parseInt(time) + 1,
                      unit: timeUnit
                    },
                    type
                  )
                }
              >
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-4">
            <div className="serving-select">
              <select
                className="form-control"
                value={timeUnit}
                onChange={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field1",
                    {
                      value: parseInt(time),
                      unit: e.target.value
                    },
                    type
                  )
                }
              >
                <option value="">Select</option>
                {field1Options.map((item, i) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="col-xs-12 col-lg-3">
            <span className="warmup-title">
              {exerciseType === "cardio" ? "Speed" : "Weight"}:
            </span>
          </div>
          <div className="col-xs-12 col-lg-4">
            <div className="serving-boxs">
              <button
                className="btn btn-minus"
                onClick={() =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field2",
                    {
                      value: parseInt(speed) - 1,
                      unit: speedUnit
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
                value={speed}
                onChange={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field2",
                    {
                      value: parseInt(e.target.value),
                      unit: speedUnit
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
                    0,
                    "field2",
                    {
                      value: parseInt(speed) + 1,
                      unit: speedUnit
                    },
                    type
                  )
                }
              >
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-4">
            <div className="serving-select">
              <select
                className="form-control"
                value={speedUnit}
                onChange={e =>
                  handleChangeSetsDetails(
                    workoutIndex,
                    0,
                    0,
                    "field2",
                    {
                      value: parseInt(speed),
                      unit: e.target.value
                    },
                    type
                  )
                }
              >
                <option value="">Select</option>
                {field2Options.map((item, i) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarNewWorkoutView;
