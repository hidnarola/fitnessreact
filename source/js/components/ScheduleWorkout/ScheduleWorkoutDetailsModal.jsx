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
                <div className="recipe-details-modal-wrapper ">
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
                                        {/* <div className="body-head d-flex justify-content-start">
                                            <div className="body-head-l">
                                            <h2>Title</h2>
                                            </div>
                                        </div> */}

                                        <div className="body-content row recipe column-wrap d-flex popup-view">
                                            <div className="p-wrap d-flex">
                                                {workout.description && ReactHtmlParser(workout.description)}
                                                <input type="checkbox" />
                                            </div>    
                                                {exercises && exercises.length > 0 &&
                                                    exercises.map((e, i) => {
                                                        return (
                                                            <div className="view-wrap" key={i}>
                                                                <ul>
                                                                    <li className="col-md-9"><strong>Exercise :</strong> <span>{e.exercise.name}</span></li>
                                                                    <li className="col-md-3"><strong>Reps :</strong> <span>{(e.reps) ? e.reps : null}</span></li>
                                                                    <li className="col-md-2"><strong>Sets :</strong> <span>{(e.sets) ? e.sets : null}</span></li>
                                                                    <li className="col-md-2"><strong>Weight :</strong> <span>{(e.weight) ? e.weight : null}</span></li>
                                                                    <li className="col-md-2"><strong>Distance :</strong> <span>{(e.distance) ? e.distance : null}</span></li>
                                                                    <li className="col-md-2"><strong>Rest Time :</strong> <span>{(e.restTime) ? e.restTime : null}</span></li>
                                                                    <li className="col-md-2"><strong>Time / Set :</strong> <span>{e.oneSetTimer}</span></li>
                                                                    <li className="col-md-2"><strong>Completed :</strong> <span><input type="checkbox" /></span></li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    })
                                                }
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