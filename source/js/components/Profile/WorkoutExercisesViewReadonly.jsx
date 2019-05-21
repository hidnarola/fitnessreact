import React, { Component } from 'react';
import {
    SERVER_BASE_URL,
    SCHEDULED_WORKOUT_TYPE_EXERCISE,
    SCHEDULED_WORKOUT_TYPE_SUPERSET,
    SCHEDULED_WORKOUT_TYPE_CIRCUIT,
    EXE_MEASUREMENT_UNITS,
    EXE_REST_TIME_UNITS
} from '../../constants/consts';
import noImg from 'img/common/no-img.png'
import _ from "lodash";

class WorkoutExercisesViewReadonly extends Component {
    render() {
        const { exercises } = this.props;
        return (
            <div className="workout-exercises-view-wrapper default-cursor">
                <ul>
                    {exercises && exercises.length > 0 &&
                        exercises.map((o, i) => {
                            return (
                                <li key={i}>
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                        <WorkoutExerciseSingleView exercise={o.exercises[0]} />
                                    }
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                                        <WorkoutExerciseSupersetView exercises={o.exercises} />
                                    }
                                    {o.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                                        <WorkoutExerciseCircuitView exercises={o.exercises} />
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default WorkoutExercisesViewReadonly;

class WorkoutExerciseSingleView extends Component {
    constructor(props) {
        super(props);
        this.state = { showAdvance: false }
    }

    render() {
        const { exercise } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-view">
                <div className={exercise.differentSets === 1 ? "workout-exercise-head-view d-flex advance-switch-wrap" : "workout-exercise-head-view d-flex"}>
                    
                        <div className="workout-exercise-head-view-l">
                            <strong>{exercise.exercises.name}</strong>
                        </div>
                        <div className="workout-exercise-head-view-r">
                            {exercise.differentSets === 1 &&
                                <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                            }
                        </div>
                   
                </div>
                <div className="workout-exercise-body-view d-flex">
                    <div className="workout-exercise-body-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-view-r">
                        <div className="workout-exercise-body-view-desc">
                            <small dangerouslySetInnerHTML={{ __html: exercise.exercises.description }}></small>
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-head-view-data-row d-flex">
                                    {exercise.sets &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{'Sets'}</strong><strong>{exercise.sets}</strong>
                                        </div>
                                    }
                                    {typeof exercise.restTime !== 'undefined' &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.restTimeUnit]).label} Rest</strong><strong>{exercise.restTime}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-head-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseSingleAdvanceView exercise={exercise} showAdvance={showAdvance} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutExerciseSupersetView extends Component {
    render() {
        const { exercises } = this.props;
        return (
            <div className="workout-exercise-head-view-wrapper">
                <div className="workout-exercise-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{'Superset'}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        <div className="workout-exercise-head-view-data-row d-flex">
                            {exercises[0].sets &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{'Sets'}</strong><strong>{exercises[0].sets}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong><strong>{exercises[0].restTime}</strong>
                                </div>
                            }
                        </div>
                    </div>

                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <WorkoutExerciseSupersetNormalView key={index} exercise={exercise} />
                                    );
                                })
                            }
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

class WorkoutExerciseCircuitView extends Component {
    render() {
        const { exercises } = this.props;
        return (
            <div className="workout-exercise-head-view-wrapper">
                <div className="workout-exercise-head-view d-flex">
                    <div className="workout-exercise-head-view-l">
                        <strong>{'Circuit'}</strong>
                    </div>
                    <div className="workout-exercise-head-view-r">
                        <div className="workout-exercise-head-view-data-row d-flex">
                            {exercises[0].sets &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{'Sets'}</strong><strong>{exercises[0].sets}</strong>
                                </div>
                            }
                            {typeof exercises[0].restTime !== 'undefined' &&
                                <div className="workout-exercise-head-view-data-col">
                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong><strong>{exercises[0].restTime}</strong>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <ul className="workout-exercise-body-view-ul">
                    <li>
                        <div className="workout-exercise-body-view-wrapper">
                            {exercises && exercises.length > 0 &&
                                exercises.map((exercise, index) => {
                                    return (
                                        <WorkoutExerciseCircuitNormalView key={index} exercise={exercise} />
                                    );
                                })
                            }
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

class WorkoutExerciseSupersetNormalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvance: false,
        }
    }

    render() {
        const { exercise } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-body-view">
                <div className={exercise.differentSets === 1 ? "workout-exercise-head-view d-flex advance-switch-wrap" : "workout-exercise-head-view d-flex"}>
                    
                        <div className="workout-exercise-head-view-l">
                            <strong>{exercise.exercises.name}</strong>
                        </div>
                        <div className="workout-exercise-head-view-r">
                            {exercise.differentSets === 1 &&
                                <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                            }
                        </div>
                    
                </div>
                <div className="workout-exercise-body-content-view d-flex">
                    <div className="workout-exercise-body-content-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-content-view-r">
                        <div className="workout-exercise-body-view-desc">
                            <small dangerouslySetInnerHTML={{ __html: exercise.exercises.description }}></small>
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-body-view-data-row d-flex">
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseSupersetAdvanceView exercise={exercise} showAdvance={showAdvance} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutExerciseCircuitNormalView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvance: false,
        }
    }

    render() {
        const { exercise } = this.props;
        const { showAdvance } = this.state;
        return (
            <div className="workout-exercise-body-view">
                <div className={exercise.differentSets === 1 ? "workout-exercise-head-view d-flex advance-switch-wrap" : "workout-exercise-head-view d-flex"}>
                    
                        <div className="workout-exercise-head-view-l">
                            <strong>{exercise.exercises.name}</strong>
                        </div>

                        <div className="workout-exercise-head-view-r">
                            {exercise.differentSets === 1 &&
                                <ToggleAdvanceSwitch exercise={exercise} showAdvance={showAdvance} handleAdvanceViewChange={() => this.setState({ showAdvance: !showAdvance })} />
                            }
                        </div>
                    
                </div>
                <div className="workout-exercise-body-content-view d-flex">
                    <div className="workout-exercise-body-content-view-l">
                        <img
                            src={SERVER_BASE_URL + exercise.exercises.images[0]}
                            onError={(e) => {
                                e.target.src = noImg
                            }}
                        />
                    </div>
                    <div className="workout-exercise-body-content-view-r">
                        <div className="workout-exercise-body-view-desc">
                            <small dangerouslySetInnerHTML={{ __html: exercise.exercises.description }}></small>
                        </div>
                        <div className="d-flex">
                            {exercise.differentSets === 0 &&
                                <div className="workout-exercise-body-view-data-row d-flex">
                                    {exercise.setsDetails[0].field1 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong><strong>{exercise.setsDetails[0].field1.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field2 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong><strong>{exercise.setsDetails[0].field2.value}</strong>
                                        </div>
                                    }
                                    {exercise.setsDetails[0].field3 &&
                                        <div className="workout-exercise-body-view-data-col">
                                            <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                        </div>
                                    }
                                </div>
                            }
                            {exercise.differentSets === 1 &&
                                <WorkoutExerciseCircuitAdvanceView
                                    exercise={exercise}
                                    showAdvance={showAdvance}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WorkoutExerciseSingleAdvanceView extends Component {
    render() {
        const { exercise, showAdvance } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                {!showAdvance &&
                    <div className="workout-exercise-head-view-data-row d-flex">
                        {exercise.sets &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{'Sets'}</strong><strong>{exercise.sets}</strong>
                            </div>
                        }
                        {typeof exercise.setsDetails[0].restTime !== 'undefined' &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.setsDetails[0].restTimeUnit]).label} Rest</strong>
                                <strong>
                                    {exercise.setsDetails[0].restTime}
                                    {exercise.setsDetails.length > 2 && typeof exercise.setsDetails[(exercise.setsDetails.length - 2)].restTime !== 'undefined' &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].restTime
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong><strong>{exercise.setsDetails[0].field3.value}</strong>
                                {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                    <strong> - {_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.unit]).label}</strong>
                                }

                                {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                    <strong>{exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value}</strong>
                                }
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {typeof o.restTime !== 'undefined' &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_REST_TIME_UNITS, ['value', o.restTimeUnit]).label} Rest</strong><strong>{o.restTime}</strong>
                                                </div>
                                            }
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class WorkoutExerciseSupersetAdvanceView extends Component {
    render() {
        const {
            exercise,
            showAdvance,
        } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner ">
                {!showAdvance &&
                    <div className="workout-exercise-body-view-data-row d-flex">
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field3.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value
                                    }
                                </strong>
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class WorkoutExerciseCircuitAdvanceView extends Component {
    render() {
        const {
            exercise,
            showAdvance
        } = this.props;
        return (
            <div className="workout-exercise-head-view-data-row-inner">
                {!showAdvance &&
                    <div className="workout-exercise-body-view-data-row d-flex">
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field1.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field1 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field1.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field2.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field2 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field2.value
                                    }
                                </strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-body-view-data-col">
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                <strong>
                                    {exercise.setsDetails[0].field3.value}
                                    {exercise.setsDetails.length > 2 && exercise.setsDetails[(exercise.setsDetails.length - 2)].field3 &&
                                        ' - ' + exercise.setsDetails[(exercise.setsDetails.length - 2)].field3.value
                                    }
                                </strong>
                            </div>
                        }
                    </div>
                }
                {showAdvance &&
                    <div className="workout-exercise-head-view-data-row-ul">
                        <ul>
                            {exercise.setsDetails.map((o, i) => {
                                return (
                                    <li key={i}>
                                        <div className="workout-exercise-advance-set-view-wrapper d-flex">
                                            <div className="workout-exercise-head-view-data-col">
                                                <strong>{`Set #${(i + 1)}`}</strong>
                                            </div>
                                            {o.field1 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field1.unit]).label}</strong><strong>{o.field1.value}</strong>
                                                </div>
                                            }
                                            {o.field2 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field2.unit]).label}</strong><strong>{o.field2.value}</strong>
                                                </div>
                                            }
                                            {o.field3 &&
                                                <div className="workout-exercise-head-view-data-col">
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', o.field3.unit]).label}</strong><strong>{o.field3.value}</strong>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

class ToggleAdvanceSwitch extends Component {
    render() {
        const {
            exercise,
            showAdvance,
            handleAdvanceViewChange
        } = this.props;
        return (
            <div className="advance-toggle-switch-workout-view switch-wrap">
                <small>Advance View</small>
                <div className="material-switch">
                    <input
                        id={`advance_toggle_${exercise._id}`}
                        name={`advance_toggle_${exercise._id}`}
                        type="checkbox"
                        checked={showAdvance}
                        onChange={handleAdvanceViewChange}
                    />
                    <label htmlFor={`advance_toggle_${exercise._id}`} className="label-default"></label>
                </div>
            </div>
        );
    }
}