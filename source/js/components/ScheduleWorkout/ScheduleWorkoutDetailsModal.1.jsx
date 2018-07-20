import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactHtmlParser from "react-html-parser";

class ScheduleWorkoutDetailsModal extends Component {
    render() {

        const { show, handleClose, workout } = this.props;
        if (workout) {
            var exercises = workout.exercises;
            return (
                <div className="exercise-details-modal-wrapper">
                    <Modal show={show} bsSize="large" className="progress-popup recipe-details-modal-main">
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">{workout.title}</h3>
                        </div>

                        <div className="progress-popup-body d-flex" style={{ height: 530 }}>
                            <Scrollbars autoHide>
                                <div className="col-md-12 width-100-per" style={{ height: "100%" }}>
                                    <section className="body-wrap">
                                        <div className="body-content row recipe column-wrap d-flex popup-view">
                                            <div className="p-wrap d-flex">
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
                                                                        <img src={e.exercise.image} />
                                                                        <span>{e.exercise.name}</span>
                                                                    </td>
                                                                    <td><span>{(e.reps) ? e.reps : null}</span></td>
                                                                    <td><span>{(e.sets) ? e.sets : null}</span></td>
                                                                    <td><span>{(e.weight) ? e.weight : null}</span></td>
                                                                    <td><span>{(e.distance) ? e.distance : null}</span></td>
                                                                    <td><span>{(e.restTime) ? e.restTime : null}</span></td>
                                                                    <td><span>{e.oneSetTimer}</span></td>
                                                                    <td> <span><input type="checkbox" /></span></td>
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