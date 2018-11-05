import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from "redux-form";
import { StarRating, TextAreaField } from '../../helpers/FormControlHelper';

class ProgramRatingModal extends Component {
    render() {
        const { show, handleSubmit, handleClose } = this.props;
        return (
            <div className="program-rating-modal-wrap">
                <Modal show={show} bsSize="large" className="progress-popup body-fat-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="progress-popup-head">
                            <button type="button" className="close-round" onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="title-h3">Provide your feedback</h3>
                        </div>

                        <div className="progress-popup-body">
                            <div className="col-md-12">
                                <Field
                                    id="rating"
                                    name="rating"
                                    component={StarRating}
                                    starCount={5}
                                    label="Rating"
                                    labelClass="display_block"
                                    wrapperClass="form-group"
                                    className="program-rating"
                                />
                            </div>
                            <div className="col-md-12">
                                <Field
                                    id="feedback"
                                    name="feedback"
                                    component={TextAreaField}
                                    label="Feedback"
                                    labelClass="display_block"
                                    wrapperClass="form-group"
                                    className="form-control min-height-80 resize-vertical"
                                />
                            </div>
                            <div className="add-log d-flex">
                                <button type="submit" className="ml-auto">Save</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

ProgramRatingModal = reduxForm({
    form: 'program_rating_form'
})(ProgramRatingModal);

export default connect(
    mapStateToProps,
)(ProgramRatingModal);