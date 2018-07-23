import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class WorkoutExercisesView extends Component {
    render() {
        const {
            exercises,
        } = this.props;
        return (
            <div className="workout-exercises-view-wrapper">
                {exercises && exercises.length > 0 &&
                    exercises.map((o, i) => {
                        return (
                            <div key={i} className="workout-exercises-view-block">
                                {o.subType === SCHEDULED_WORKOUT_TYPE_EXERCISE &&
                                    <WorkoutExerciseSingleView
                                        exercise={o.exercises[0]}
                                    />
                                }
                                {o.subType === SCHEDULED_WORKOUT_TYPE_SUPERSET &&
                                    <WorkoutExerciseSupersetView
                                        exercises={o.exercises}
                                    />
                                }
                                {o.subType === SCHEDULED_WORKOUT_TYPE_CIRCUIT &&
                                    <WorkoutExerciseCircuitView
                                        exercises={o.exercises}
                                    />
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

export default connect(
    mapStateToProps,
)(WorkoutExercisesView);

class WorkoutExerciseSingleView extends Component {
    render() {
        const { exercise } = this.props;
        return (
            <div className="workout-exercise-head-view">
                <img
                    src={SERVER_BASE_URL + exercise.exercises.images[0]}
                    width="50"
                    onError={(e) => {
                        e.target.src = noImg
                    }}
                />
                <strong>{exercise.exercises.name}</strong>
                {exercise.differentSets === 0 &&
                    <div className="workout-exercise-head-view-data-row">
                        {exercise.sets &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.sets}</strong>
                                <strong>{'Sets'}</strong>
                            </div>
                        }
                        {exercise.restTime &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.restTime}</strong>
                                <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercise.restTimeUnit]).label} Rest</strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field1.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field2.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field3.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                            </div>
                        }
                    </div>
                }
                {exercise.differentSets === 1 &&
                    <div className="workout-exercise-head-view-data-row">
                        {exercise.sets &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.sets}</strong>
                                <strong>{'Sets'}</strong>
                            </div>
                        }
                        {exercise.setsDetails[0].field1 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field1.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                    <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                                }
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                                }
                            </div>
                        }
                        {exercise.setsDetails[0].field2 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field2.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                    <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                                }
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                                }
                            </div>
                        }
                        {exercise.setsDetails[0].field3 &&
                            <div className="workout-exercise-head-view-data-col">
                                <strong>{exercise.setsDetails[0].field3.value}</strong>
                                <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                    <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                                }
                                {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                                }
                            </div>
                        }
                    </div>
                }
                <div className="workout-exercise-head-view-actions">...</div>
                <div className="workout-exercise-head-view-cancel"><i className="icon-cancel"></i></div>
            </div>
        );
    }
}

class WorkoutExerciseSupersetView extends Component {
    render() {
        const { exercises } = this.props;
        return (
            <div className="workout-exercise-head-view">
                <strong>{'Superset'}</strong>
                <div className="workout-exercise-head-view-data-row">
                    {exercises[0].sets &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercises[0].sets}</strong>
                            <strong>{'Sets'}</strong>
                        </div>
                    }
                    {exercises[0].restTime &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercises[0].restTime}</strong>
                            <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong>
                        </div>
                    }
                </div>
                <div className="workout-exercise-head-view-actions">...</div>
                <div className="workout-exercise-head-view-cancel"><i className="icon-cancel"></i></div>
                <div className="workout-exercise-body-view-wrapper">
                    {exercises && exercises.length > 0 &&
                        exercises.map((exercise, index) => {
                            return (
                                <div key={index} className="workout-exercise-body-view">
                                    <img
                                        src={SERVER_BASE_URL + exercise.exercises.images[0]}
                                        width="50"
                                        onError={(e) => {
                                            e.target.src = noImg
                                        }}
                                    />
                                    <strong>{exercise.exercises.name}</strong>
                                    {exercise.differentSets === 0 &&
                                        <div className="workout-exercise-body-view-data-row">
                                            {exercise.setsDetails[0].field1 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field1.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field2 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field2.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field3 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field3.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {exercise.differentSets === 1 &&
                                        <div className="workout-exercise-body-view-data-row">
                                            {exercise.setsDetails[0].field1 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field1.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field2 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field2.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field3 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field3.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="workout-exercise-body-view-actions">...</div>
                                    <div className="workout-exercise-body-view-cancel"><i className="icon-cancel"></i></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

class WorkoutExerciseCircuitView extends Component {
    render() {
        const { exercises } = this.props;
        return (
            <div className="workout-exercise-head-view">
                <strong>{'Circuit'}</strong>
                <div className="workout-exercise-head-view-data-row">
                    {exercises[0].sets &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercises[0].sets}</strong>
                            <strong>{'Sets'}</strong>
                        </div>
                    }
                    {exercises[0].restTime &&
                        <div className="workout-exercise-head-view-data-col">
                            <strong>{exercises[0].restTime}</strong>
                            <strong>{_.find(EXE_REST_TIME_UNITS, ['value', exercises[0].restTimeUnit]).label} Rest</strong>
                        </div>
                    }
                </div>
                <div className="workout-exercise-head-view-actions">...</div>
                <div className="workout-exercise-head-view-cancel"><i className="icon-cancel"></i></div>
                <div className="workout-exercise-body-view-wrapper">
                    {exercises && exercises.length > 0 &&
                        exercises.map((exercise, index) => {
                            return (
                                <div key={index} className="workout-exercise-body-view">
                                    <img
                                        src={SERVER_BASE_URL + exercise.exercises.images[0]}
                                        width="50"
                                        onError={(e) => {
                                            e.target.src = noImg
                                        }}
                                    />
                                    <strong>{exercise.exercises.name}</strong>
                                    {exercise.differentSets === 0 &&
                                        <div className="workout-exercise-body-view-data-row">
                                            {exercise.setsDetails[0].field1 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field1.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field2 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field2.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field3 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field3.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {exercise.differentSets === 1 &&
                                        <div className="workout-exercise-body-view-data-row">
                                            {exercise.setsDetails[0].field1 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field1.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field1.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field1 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field1.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field2 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field2.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field2.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field2 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field2.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                            {exercise.setsDetails[0].field3 &&
                                                <div className="workout-exercise-body-view-data-col">
                                                    <strong>{exercise.setsDetails[0].field3.value}</strong>
                                                    <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[0].field3.unit]).label}</strong>
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                                        <strong> - {exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.value}</strong>
                                                    }
                                                    {exercise.setsDetails.length > 1 && exercise.setsDetails[(exercise.setsDetails.length - 1)].field3 &&
                                                        <strong>{_.find(EXE_MEASUREMENT_UNITS, ['value', exercise.setsDetails[(exercise.setsDetails.length - 1)].field3.unit]).label}</strong>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="workout-exercise-body-view-actions">...</div>
                                    <div className="workout-exercise-body-view-cancel"><i className="icon-cancel"></i></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}