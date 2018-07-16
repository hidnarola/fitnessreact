import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactHtmlParser from "react-html-parser";
import noImg from 'img/common/no-img.png'

class ScheduleWorkoutDetailsModal extends Component {
    render() {

        const { show, handleClose, workout } = this.props;
        if (workout) {
            var exercises = workout.exercises;
            return (
                <div className="exercise-details-modal-wrapper">
                    <Modal show={show} bsSize="large" className="progress-popup exercise-details-modal-main">
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">{workout.title}</h3>
                        </div>

                        <div className="progress-popup-body d-flex" style={{ height: 530 }}>
                            <Scrollbars autoHide>
                                <div className="width-100-per" style={{ height: "100%" }}>
                                    <section className="body-wrap">
                                        <div className="body-content recipe popup-view">
                                            <div className="p-wrap">
                                                {workout.description && ReactHtmlParser(workout.description)}
                                                <input type="checkbox" />
                                            </div>
                                            <div className="view-wrap" >
                                                <table className="table">
                                                    {exercises && exercises.length > 0 &&
                                                        exercises.map((e, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>
                                                                        <img
                                                                            src={''}
                                                                            alt="Image" className="exercise-table-img"
                                                                            onError={(e) => {
                                                                                e.target.src = noImg
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td className="exercise-name-td"><span>{e.exercise.name}</span></td>
                                                                    <td><span>4-12 Reps</span></td>
                                                                    <td><span>4 Sets</span></td>
                                                                    <td><span>40-60 kg</span></td>
                                                                    <td><span>4-5 miles</span></td>
                                                                    <td><span>40 Seconds Rest</span></td>
                                                                    <td><span>2 Seconds Rest</span></td>
                                                                    <td><span className="horizantly-ellipsis">...</span></td>
                                                                    <td className="close-td"><a href="javascript:void(0)"><i className="icon-cancel"></i></a></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </Scrollbars>
                        </div>
                    </Modal>
                </div>
            );
        }
        return null;
    }
}

export default ScheduleWorkoutDetailsModal;