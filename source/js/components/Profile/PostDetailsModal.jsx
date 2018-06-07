import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from "react-html-parser";
import CommentBoxForm from './CommentBoxForm';
import { NavLink } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import cns from "classnames";

class PostDetailsModal extends Component {
    render() {
        const {
            show,
            handleClose,
            post,
        } = this.props;
        return (
            <div className="post-details-modal-wrapper">
                <Modal show={show} bsSize="large" className="gallery-popup post-details-popup">
                    <div className="gallery-popup-head">
                        <button type="button" className="close-round" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="title-h3">Post details</h3>
                    </div>

                    <div className="progress-popup-body d-flex">
                    
                    </div>
                </Modal>
            </div >
        );
    }
}

export default PostDetailsModal;