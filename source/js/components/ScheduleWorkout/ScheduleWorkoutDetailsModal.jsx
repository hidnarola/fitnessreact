import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactHtmlParser from "react-html-parser";

class ScheduleWorkoutDetailsModal extends Component {
    render() {
        const { show, handleClose, workout } = this.props;
        console.log('workout =< ', workout);
        if (workout) {
            var exercises = workout.exercises;
            return (
                <div className="recipe-details-modal-wrapper">
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

                                        <div className="body-content row recipe column-wrap d-flex">
                                            {workout.description && ReactHtmlParser(workout.description)}
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {exercises && exercises.length > 0 &&
                                                        exercises.map((e, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    <ul>
                                                                        <li>Exercise : {e.exercise.name}</li>
                                                                        <li>Reps : {(e.reps) ? e.reps : null}</li>
                                                                        <li>Sets : {(e.sets) ? e.sets : null}</li>
                                                                        <li>Weight : {(e.weight) ? e.weight : null}</li>
                                                                        <li>Distance : {(e.distance) ? e.distance : null}</li>
                                                                        <li>Rest Time : {(e.restTime) ? e.restTime : null}</li>
                                                                        <li>Time / Set : {e.oneSetTimer}</li>
                                                                        <li>Completed : <input type="checkbox" /></li>
                                                                    </ul>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
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