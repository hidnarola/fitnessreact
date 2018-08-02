import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import noImg from 'img/common/no-img.png'
import {
    SERVER_BASE_URL,
    EXERCISE_MECHANICS_COMPOUND,
    EXERCISE_MECHANICS_ISOLATION,
    EXERCISE_DIFFICULTY_BEGINNER,
    EXERCISE_DIFFICULTY_INTERMEDIATE,
    EXERCISE_DIFFICULTY_EXPERT
} from '../../constants/consts';
import ReactHtmlParser from "react-html-parser";
import _ from "lodash";
import { getUserBodypartsRequest } from '../../actions/userBodyparts';
import { getUserEquipmentsRequest } from '../../actions/userEquipments';
import { getUserExerciseTypesRequest } from '../../actions/userExerciseTypes';
import { prepareDropdownOptionsData } from '../../helpers/funs';

const mechanicsOptions = [
    { value: EXERCISE_MECHANICS_COMPOUND, label: 'Compound' },
    { value: EXERCISE_MECHANICS_ISOLATION, label: 'Isolation' }
];

const difficultyLevelOptions = [
    { value: EXERCISE_DIFFICULTY_BEGINNER, label: 'Beginner' },
    { value: EXERCISE_DIFFICULTY_INTERMEDIATE, label: 'Intermediate' },
    { value: EXERCISE_DIFFICULTY_EXPERT, label: 'Expert' },
];

class WorkoutDetailsModal extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserBodypartsRequest());
        dispatch(getUserEquipmentsRequest());
        dispatch(getUserExerciseTypesRequest());
    }

    render() {
        const {
            show,
            workout,
            handleClose,
            bodyparts,
            equipmentsByCategory,
            exerciseTypes,
        } = this.props;
        if (workout) {
            var equipments = [];
            _.forEach(equipmentsByCategory, (o, i) => {
                if (o.equipments && o.equipments.length > 0) {
                    equipments = _.concat(equipments, o.equipments);
                }
            });
            var bodypartOptions = prepareDropdownOptionsData(bodyparts, '_id', 'bodypart');
            var equipmentOptions = prepareDropdownOptionsData(equipments, '_id', 'name');
            var exerciseTypeOptions = prepareDropdownOptionsData(exerciseTypes, '_id', 'name');
            var mainMuscleObj = _.find(bodypartOptions, ['value', workout.exerciseId.mainMuscleGroup]);
            var otherMuscleArr = [];
            var detailedMuscleArr = [];
            var equipmentsArr = [];
            _.forEach(workout.exerciseId.otherMuscleGroup, (obj, index) => {
                var foundObj = _.find(bodypartOptions, ['value', obj]);
                if (foundObj) {
                    otherMuscleArr.push(foundObj);
                }
            });
            _.forEach(workout.exerciseId.detailedMuscleGroup, (obj, index) => {
                var foundObj = _.find(bodypartOptions, ['value', obj]);
                if (foundObj) {
                    detailedMuscleArr.push(foundObj);
                }
            });
            _.forEach(workout.exerciseId.equipments, (obj, index) => {
                var foundObj = _.find(equipments, ['_id', obj]);
                if (foundObj) {
                    equipmentsArr.push(foundObj);
                }
            });
            var exerciseTypeObj = _.find(exerciseTypes, ['_id', workout.exerciseId.type]);
            var diffLevelObj = _.find(difficultyLevelOptions, ['value', workout.exerciseId.difficltyLevel]);
            var mechLevelObj = _.find(mechanicsOptions, ['value', workout.exerciseId.mechanics]);
            return (
                <div className="workout-details-modal-wrapper">
                    <Modal id="workout-details-modal" show={show} className="benchpress-popup">
                        <div className="content-wrapper">
                            <button type="button" className="close-round" onClick={handleClose}><span aria-hidden="true">&times;</span></button>
                            <h3 className="title-h3">{workout.exerciseId.name}</h3>
                            <Scrollbars>
                                <div className="row d-flex width-100-per" style={{ height: "100%" }}>
                                    <div className="col-md-6">
                                        <div className="popup-big-img space-btm-20">
                                            <img
                                                src={SERVER_BASE_URL + workout.exerciseId.images[0]}
                                                alt="Exercise"
                                                onError={(e) => {
                                                    e.target.src = noImg
                                                }}
                                            />
                                        </div>
                                        <div className="dtl-format space-btm-20">
                                            <div className="dtl-format-head">
                                                <h3>Workout Details</h3>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Sets</h4>
                                                <h5>{(workout.sets) ? workout.sets : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Reps</h4>
                                                <h5>{(workout.reps) ? workout.reps : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Rest</h4>
                                                <h5>{(workout.restTime) ? workout.restTime + 'secs' : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Weight</h4>
                                                <h5>{(workout.weight) ? workout.weight + 'kg' : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Time</h4>
                                                <h5>{(workout.oneSetTimer) ? workout.oneSetTimer + 'mins' : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Distance</h4>
                                                <h5>{(workout.distance) ? workout.distance + 'km' : '-'}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="dtl-format space-btm-20">
                                            <div className="dtl-format-head">
                                                <h3>Details</h3>
                                                <a href="javascript:void(0)"><i className="icon-arrow_drop_down"></i></a>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Main Muscle Group</h4>
                                                <h5>{(mainMuscleObj) ? mainMuscleObj.label : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Other Muscle Group</h4>
                                                <h5>
                                                    {otherMuscleArr && otherMuscleArr.length <= 0 &&
                                                        <span>-</span>
                                                    }
                                                    {otherMuscleArr && otherMuscleArr.length > 0 &&
                                                        otherMuscleArr.map((m, i) => {
                                                            return (m.label)
                                                        }).join(',')
                                                    }
                                                </h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Detailed Muscle Group</h4>
                                                <h5>
                                                    {detailedMuscleArr && detailedMuscleArr.length <= 0 &&
                                                        <span>-</span>
                                                    }
                                                    {detailedMuscleArr && detailedMuscleArr.length > 0 &&
                                                        detailedMuscleArr.map((m, i) => {
                                                            return (m.label)
                                                        }).join(',')
                                                    }
                                                </h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Type</h4>
                                                <h5>{(exerciseTypeObj) ? exerciseTypeObj.name : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Mechanics</h4>
                                                <h5>{(mechLevelObj) ? mechLevelObj.label : '-'}</h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Equipments</h4>
                                                <h5>
                                                    {equipmentsArr && equipmentsArr.length <= 0 &&
                                                        <span>-</span>
                                                    }
                                                    {equipmentsArr && equipmentsArr.length > 0 &&
                                                        equipmentsArr.map((e, i) => {
                                                            return (e.name)
                                                        }).join(',')
                                                    }
                                                </h5>
                                            </div>
                                            <div className="dtl-format-inr">
                                                <h4>Difficulty</h4>
                                                <h5>
                                                    {(diffLevelObj) ? diffLevelObj.label : '-'}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="dtl-format space-btm-20">
                                            <div className="dtl-format-head">
                                                <h3>Instructions</h3>
                                                <a href="javascript:void(0)"><i className="icon-arrow_drop_down"></i></a>
                                            </div>
                                            <div className="general-format">
                                                {(workout.exerciseId.description) ? ReactHtmlParser(workout.exerciseId.description) : ''}
                                                {workout.exerciseId.steps && workout.exerciseId.steps.length > 0 &&
                                                    <div>
                                                        <p>Steps :</p>
                                                        {
                                                            workout.exerciseId.steps.map((step, index) => {
                                                                return (
                                                                    <p key={index}>
                                                                        {`${(index + 1)}.) ${step}`}
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                }
                                                {workout.exerciseId.tips && workout.exerciseId.tips.length > 0 &&
                                                    <div>
                                                        <p>Tips :</p>
                                                        {
                                                            workout.exerciseId.tips.map((tip, index) => {
                                                                return (
                                                                    <p key={index}>
                                                                        {`${(index + 1)}.) ${tip}`}
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                }
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                    </Modal>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    const { userBodyparts, userEquipments, userExerciseTypes } = state;
    return {
        bodyparts: userBodyparts.get('bodyparts'),
        equipmentsByCategory: userEquipments.get('equipments'),
        exerciseTypes: userExerciseTypes.get('exerciseTypes'),
    }
}

export default connect(mapStateToProps)(WorkoutDetailsModal);